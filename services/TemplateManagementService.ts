import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import algoliasearch from 'algoliasearch';
import Redis from 'ioredis';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  data: any;
  tags: string[];
  isPublic: boolean;
  downloads: number;
  rating: number;
  ratingCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    slideCount: number;
    features: string[];
    compatibility: string[];
    version: string;
  };
}

export interface TemplateRequest {
  name: string;
  description: string;
  category: string;
  data: any;
  tags: string[];
  isPublic: boolean;
  thumbnail?: string;
  metadata?: any;
}

export interface TemplateSearchRequest {
  query?: string;
  category?: string;
  tags?: string[];
  difficulty?: string;
  isPublic?: boolean;
  createdBy?: string;
  sortBy?: 'name' | 'downloads' | 'rating' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface TemplateResponse {
  templates: Template[];
  total: number;
  facets?: {
    categories: Array<{ name: string; count: number }>;
    tags: Array<{ name: string; count: number }>;
    difficulties: Array<{ name: string; count: number }>;
  };
}

export class TemplateManagementService {
  private prisma: PrismaClient;
  private redis: Redis;
  private s3Client: S3Client;
  private elasticsearchClient: ElasticsearchClient;
  private algoliaClient: any;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    this.elasticsearchClient = new ElasticsearchClient({
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    });

    this.algoliaClient = algoliasearch(
      process.env.ALGOLIA_APP_ID || '',
      process.env.ALGOLIA_ADMIN_API_KEY || ''
    );
  }

  // TEMPLATE CRUD OPERATIONS
  async createTemplate(request: TemplateRequest, userId: string): Promise<Template> {
    try {
      // Validate template data
      this.validateTemplateData(request);

      // Generate thumbnail if not provided
      const thumbnail = request.thumbnail || await this.generateThumbnail(request.data);

      // Create template in database
      const template = await this.prisma.template.create({
        data: {
          name: request.name,
          description: request.description,
          category: request.category,
          thumbnail,
          data: request.data,
          tags: request.tags,
          isPublic: request.isPublic,
          downloads: 0,
          rating: 0,
          ratingCount: 0,
          createdBy: userId,
          metadata: request.metadata || {},
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Index in search engines
      await this.indexTemplate(template);

      // Cache popular templates
      if (request.isPublic) {
        await this.cachePopularTemplates();
      }

      return this.mapToTemplate(template);
    } catch (error) {
      console.error('Failed to create template:', error);
      throw error;
    }
  }

  async getTemplate(id: string, userId?: string): Promise<Template | null> {
    try {
      // Check cache first
      const cacheKey = `template:${id}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      const template = await this.prisma.template.findUnique({
        where: { id }
      });

      if (!template) {
        return null;
      }

      // Check access permissions
      if (!template.isPublic && template.createdBy !== userId) {
        throw new Error('Access denied');
      }

      const mappedTemplate = this.mapToTemplate(template);

      // Cache for 1 hour
      await this.redis.setex(cacheKey, 3600, JSON.stringify(mappedTemplate));

      return mappedTemplate;
    } catch (error) {
      console.error('Failed to get template:', error);
      throw error;
    }
  }

  async updateTemplate(id: string, request: Partial<TemplateRequest>, userId: string): Promise<Template> {
    try {
      const existingTemplate = await this.prisma.template.findUnique({
        where: { id }
      });

      if (!existingTemplate) {
        throw new Error('Template not found');
      }

      // Check permissions
      if (existingTemplate.createdBy !== userId) {
        throw new Error('Access denied');
      }

      // Update template
      const updatedTemplate = await this.prisma.template.update({
        where: { id },
        data: {
          ...request,
          updatedAt: new Date()
        }
      });

      // Re-index in search engines
      await this.indexTemplate(updatedTemplate);

      // Update cache
      const cacheKey = `template:${id}`;
      await this.redis.del(cacheKey);

      return this.mapToTemplate(updatedTemplate);
    } catch (error) {
      console.error('Failed to update template:', error);
      throw error;
    }
  }

  async deleteTemplate(id: string, userId: string): Promise<void> {
    try {
      const template = await this.prisma.template.findUnique({
        where: { id }
      });

      if (!template) {
        throw new Error('Template not found');
      }

      // Check permissions
      if (template.createdBy !== userId) {
        throw new Error('Access denied');
      }

      // Delete from database
      await this.prisma.template.delete({
        where: { id }
      });

      // Remove from search indices
      await this.removeFromSearchIndices(id);

      // Delete thumbnail from S3
      if (template.thumbnail) {
        await this.deleteFromS3(template.thumbnail);
      }

      // Remove from cache
      await this.redis.del(`template:${id}`);

      // Update popular templates cache
      await this.cachePopularTemplates();
    } catch (error) {
      console.error('Failed to delete template:', error);
      throw error;
    }
  }

  // TEMPLATE SEARCH AND DISCOVERY
  async searchTemplates(request: TemplateSearchRequest): Promise<TemplateResponse> {
    try {
      const cacheKey = `template-search:${JSON.stringify(request)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      let templates: Template[];
      let total: number;

      // Use Algolia for public templates search
      if (request.isPublic !== false) {
        const algoliaResults = await this.searchWithAlgolia(request);
        templates = algoliaResults.hits;
        total = algoliaResults.nbHits;
      } else {
        // Use database search for private templates
        const dbResults = await this.searchWithDatabase(request);
        templates = dbResults.templates;
        total = dbResults.total;
      }

      // Get facets
      const facets = await this.getSearchFacets();

      const response: TemplateResponse = {
        templates,
        total,
        facets
      };

      // Cache for 5 minutes
      await this.redis.setex(cacheKey, 300, JSON.stringify(response));

      return response;
    } catch (error) {
      console.error('Failed to search templates:', error);
      throw error;
    }
  }

  async getPopularTemplates(limit: number = 20): Promise<Template[]> {
    try {
      const cacheKey = `popular-templates:${limit}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      const templates = await this.prisma.template.findMany({
        where: { isPublic: true },
        orderBy: [
          { downloads: 'desc' },
          { rating: 'desc' },
          { createdAt: 'desc' }
        ],
        take: limit,
        include: {
          user: {
            select: { name: true, avatar: true }
          }
        }
      });

      const mappedTemplates = templates.map(t => this.mapToTemplate(t));

      // Cache for 10 minutes
      await this.redis.setex(cacheKey, 600, JSON.stringify(mappedTemplates));

      return mappedTemplates;
    } catch (error) {
      console.error('Failed to get popular templates:', error);
      throw error;
    }
  }

  async getRecommendedTemplates(userId: string, limit: number = 10): Promise<Template[]> {
    try {
      // Get user's usage history and preferences
      const userHistory = await this.getUserTemplateHistory(userId);
      const userPreferences = await this.getUserPreferences(userId);

      // Find similar templates based on history and preferences
      const recommendedTemplates = await this.prisma.template.findMany({
        where: {
          isPublic: true,
          id: { notIn: userHistory.usedTemplates },
          OR: [
            { category: { in: userPreferences.categories } },
            { tags: { hasSome: userPreferences.tags } },
            { createdBy: { in: userPreferences.favoriteCreators } }
          ]
        },
        orderBy: { rating: 'desc' },
        take: limit
      });

      return recommendedTemplates.map(t => this.mapToTemplate(t));
    } catch (error) {
      console.error('Failed to get recommended templates:', error);
      throw error;
    }
  }

  async getTemplatesByCategory(category: string, limit: number = 20): Promise<Template[]> {
    try {
      const templates = await this.prisma.template.findMany({
        where: { 
          isPublic: true,
          category 
        },
        orderBy: { rating: 'desc' },
        take: limit
      });

      return templates.map(t => this.mapToTemplate(t));
    } catch (error) {
      console.error('Failed to get templates by category:', error);
      throw error;
    }
  }

  async getTemplatesByUser(userId: string, includePrivate: boolean = true): Promise<Template[]> {
    try {
      const whereClause: any = { createdBy: userId };
      
      if (!includePrivate) {
        whereClause.isPublic = true;
      }

      const templates = await this.prisma.template.findMany({
        where: whereClause,
        orderBy: { updatedAt: 'desc' }
      });

      return templates.map(t => this.mapToTemplate(t));
    } catch (error) {
      console.error('Failed to get templates by user:', error);
      throw error;
    }
  }

  // TEMPLATE RATING AND REVIEWS
  async rateTemplate(templateId: string, userId: string, rating: number): Promise<void> {
    try {
      // Check if user has already rated this template
      const existingRating = await this.prisma.templateRating.findFirst({
        where: {
          templateId,
          userId
        }
      });

      if (existingRating) {
        // Update existing rating
        await this.prisma.templateRating.update({
          where: { id: existingRating.id },
          data: { rating }
        });
      } else {
        // Create new rating
        await this.prisma.templateRating.create({
          data: {
            templateId,
            userId,
            rating,
            createdAt: new Date()
          }
        });
      }

      // Update template's average rating
      await this.updateTemplateRating(templateId);

      // Clear cache
      await this.redis.del(`template:${templateId}`);
    } catch (error) {
      console.error('Failed to rate template:', error);
      throw error;
    }
  }

  async addTemplateReview(templateId: string, userId: string, review: string, rating: number): Promise<void> {
    try {
      await this.prisma.templateReview.create({
        data: {
          templateId,
          userId,
          review,
          rating,
          createdAt: new Date()
        }
      });

      // Update template's average rating
      await this.updateTemplateRating(templateId);

      // Clear cache
      await this.redis.del(`template:${templateId}`);
    } catch (error) {
      console.error('Failed to add template review:', error);
      throw error;
    }
  }

  // TEMPLATE USAGE AND ANALYTICS
  async downloadTemplate(templateId: string, userId: string): Promise<string> {
    try {
      // Increment download count
      await this.prisma.template.update({
        where: { id: templateId },
        data: {
          downloads: { increment: 1 }
        }
      });

      // Log download event
      await this.prisma.templateUsage.create({
        data: {
          templateId,
          userId,
          action: 'download',
          createdAt: new Date()
        }
      });

      // Get template data
      const template = await this.getTemplate(templateId);
      
      if (!template) {
        throw new Error('Template not found');
      }

      // Return download URL (would be generated from S3)
      return `https://templates.novagenai.com/downloads/${templateId}`;
    } catch (error) {
      console.error('Failed to download template:', error);
      throw error;
    }
  }

  async useTemplate(templateId: string, userId: string, presentationId: string): Promise<void> {
    try {
      // Log template usage
      await this.prisma.templateUsage.create({
        data: {
          templateId,
          userId,
          presentationId,
          action: 'use',
          createdAt: new Date()
        }
      });

      // Update user preferences based on usage
      await this.updateUserPreferences(userId, templateId);

      // Clear relevant caches
      await this.redis.del(`user-preferences:${userId}`);
    } catch (error) {
      console.error('Failed to use template:', error);
      throw error;
    }
  }

  async getTemplateAnalytics(templateId: string): Promise<any> {
    try {
      const analytics = await this.prisma.templateUsage.groupBy({
        by: ['action'],
        where: { templateId },
        _count: true
      });

      const ratings = await this.prisma.templateRating.aggregate({
        where: { templateId },
        _avg: { rating: true },
        _count: true
      });

      const reviews = await this.prisma.templateReview.count({
        where: { templateId }
      });

      return {
        usage: analytics,
        ratings: {
          average: ratings._avg.rating || 0,
          count: ratings._count
        },
        reviews: reviews,
        trends: await this.getTemplateTrends(templateId)
      };
    } catch (error) {
      console.error('Failed to get template analytics:', error);
      throw error;
    }
  }

  // HELPER METHODS
  private validateTemplateData(request: TemplateRequest): void {
    if (!request.name || request.name.trim().length === 0) {
      throw new Error('Template name is required');
    }

    if (!request.description || request.description.trim().length === 0) {
      throw new Error('Template description is required');
    }

    if (!request.category || request.category.trim().length === 0) {
      throw new Error('Template category is required');
    }

    if (!request.data || typeof request.data !== 'object') {
      throw new Error('Template data is required');
    }

    if (!Array.isArray(request.tags)) {
      throw new Error('Template tags must be an array');
    }
  }

  private async generateThumbnail(templateData: any): Promise<string> {
    // This would generate a thumbnail image from the template data
    // For now, return a placeholder URL
    return `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(templateData.title || 'Template')}`;
  }

  private async indexTemplate(template: any): Promise<void> {
    try {
      // Index in Elasticsearch
      await this.elasticsearchClient.index({
        index: 'templates',
        body: {
          id: template.id,
          name: template.name,
          description: template.description,
          category: template.category,
          tags: template.tags,
          isPublic: template.isPublic,
          downloads: template.downloads,
          rating: template.rating,
          createdBy: template.createdBy,
          createdAt: template.createdAt
        }
      });

      // Index in Algolia
      await this.algoliaClient.saveObject({
        indexName: 'templates',
        body: {
          objectID: template.id,
          name: template.name,
          description: template.description,
          category: template.category,
          tags: template.tags,
          isPublic: template.isPublic,
          downloads: template.downloads,
          rating: template.rating,
          createdBy: template.createdBy,
          createdAt: template.createdAt,
          thumbnail: template.thumbnail
        }
      });
    } catch (error) {
      console.error('Failed to index template:', error);
    }
  }

  private async removeFromSearchIndices(templateId: string): Promise<void> {
    try {
      // Remove from Elasticsearch
      await this.elasticsearchClient.delete({
        index: 'templates',
        id: templateId
      });

      // Remove from Algolia
      await this.algoliaClient.deleteObject({
        indexName: 'templates',
        objectID: templateId
      });
    } catch (error) {
      console.error('Failed to remove template from search indices:', error);
    }
  }

  private async searchWithAlgolia(request: TemplateSearchRequest): Promise<any> {
    const index = this.algoliaClient.initIndex('templates');
    
    const searchParams: any = {
      hitsPerPage: request.limit || 20,
      page: Math.floor((request.offset || 0) / (request.limit || 20)),
      filters: 'isPublic:true'
    };

    if (request.query) {
      searchParams.query = request.query;
    }

    if (request.category) {
      searchParams.filters += ` AND category:${request.category}`;
    }

    if (request.tags && request.tags.length > 0) {
      const tagFilters = request.tags.map(tag => `tags:${tag}`).join(' OR ');
      searchParams.filters += ` AND (${tagFilters})`;
    }

    if (request.difficulty) {
      searchParams.filters += ` AND metadata.difficulty:${request.difficulty}`;
    }

    if (request.sortBy) {
      switch (request.sortBy) {
        case 'name':
          searchParams.sortBy = ['name_asc'];
          break;
        case 'downloads':
          searchParams.sortBy = ['downloads_desc'];
          break;
        case 'rating':
          searchParams.sortBy = ['rating_desc'];
          break;
        case 'createdAt':
          searchParams.sortBy = ['createdAt_desc'];
          break;
        case 'popularity':
          searchParams.sortBy = ['popularity_desc'];
          break;
      }
    }

    return await index.search(searchParams.query || '', searchParams);
  }

  private async searchWithDatabase(request: TemplateSearchRequest): Promise<{ templates: Template[]; total: number }> {
    const whereClause: any = {};

    if (request.category) {
      whereClause.category = request.category;
    }

    if (request.tags && request.tags.length > 0) {
      whereClause.tags = { hasSome: request.tags };
    }

    if (request.isPublic !== undefined) {
      whereClause.isPublic = request.isPublic;
    }

    if (request.createdBy) {
      whereClause.createdBy = request.createdBy;
    }

    const orderBy: any = {};
    if (request.sortBy) {
      orderBy[request.sortBy] = request.sortOrder || 'desc';
    } else {
      orderBy.updatedAt = 'desc';
    }

    const [templates, total] = await Promise.all([
      this.prisma.template.findMany({
        where: whereClause,
        orderBy,
        take: request.limit || 20,
        skip: request.offset || 0
      }),
      this.prisma.template.count({ where: whereClause })
    ]);

    return {
      templates: templates.map(t => this.mapToTemplate(t)),
      total
    };
  }

  private async getSearchFacets(): Promise<any> {
    try {
      const [categories, tags, difficulties] = await Promise.all([
        this.prisma.template.groupBy({
          by: ['category'],
          where: { isPublic: true },
          _count: true
        }),
        this.prisma.template.findMany({
          where: { isPublic: true },
          select: { tags: true }
        }),
        this.prisma.template.groupBy({
          by: ['metadata'],
          where: { isPublic: true },
          _count: true
        })
      ]);

      // Flatten tags
      const allTags = tags.reduce((acc: string[], template) => {
        return acc.concat(template.tags);
      }, []);

      const tagCounts = allTags.reduce((acc: Record<string, number>, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});

      return {
        categories: categories.map(c => ({ name: c.category, count: c._count })),
        tags: Object.entries(tagCounts).map(([name, count]) => ({ name, count })),
        difficulties: difficulties.map(d => ({ 
          name: d.metadata?.difficulty || 'unknown', 
          count: d._count 
        }))
      };
    } catch (error) {
      console.error('Failed to get search facets:', error);
      return { categories: [], tags: [], difficulties: [] };
    }
  }

  private async getUserTemplateHistory(userId: string): Promise<any> {
    const usage = await this.prisma.templateUsage.findMany({
      where: { userId },
      select: { templateId: true },
      distinct: ['templateId']
    });

    return {
      usedTemplates: usage.map(u => u.templateId)
    };
  }

  private async getUserPreferences(userId: string): Promise<any> {
    const preferences = await this.redis.get(`user-preferences:${userId}`);
    
    if (preferences) {
      return JSON.parse(preferences);
    }

    // Calculate preferences from usage history
    const history = await this.prisma.templateUsage.findMany({
      where: { userId },
      include: {
        template: {
          select: { category: true, tags: true, createdBy: true }
        }
      },
      take: 50
    });

    const categories = history.map(h => h.template.category);
    const tags = history.flatMap(h => h.template.tags);
    const creators = history.map(h => h.template.createdBy);

    const userPrefs = {
      categories: this.getMostFrequent(categories, 5),
      tags: this.getMostFrequent(tags, 10),
      favoriteCreators: this.getMostFrequent(creators, 5)
    };

    // Cache preferences
    await this.redis.setex(`user-preferences:${userId}`, 3600, JSON.stringify(userPrefs));

    return userPrefs;
  }

  private getMostFrequent(items: string[], limit: number): string[] {
    const counts = items.reduce((acc: Record<string, number>, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([item]) => item);
  }

  private async updateUserPreferences(userId: string, templateId: string): Promise<void> {
    const template = await this.prisma.template.findUnique({
      where: { id: templateId },
      select: { category: true, tags: true, createdBy: true }
    });

    if (!template) return;

    // Update user preferences based on template usage
    const currentPrefs = await this.getUserPreferences(userId);
    
    // Add template properties to preferences
    const updatedPrefs = {
      categories: this.updateFrequentList(currentPrefs.categories, template.category, 5),
      tags: this.updateFrequentList(currentPrefs.tags, ...template.tags, 10),
      favoriteCreators: this.updateFrequentList(currentPrefs.favoriteCreators, template.createdBy, 5)
    };

    // Cache updated preferences
    await this.redis.setex(`user-preferences:${userId}`, 3600, JSON.stringify(updatedPrefs));
  }

  private updateFrequentList(currentList: string[], ...newItems: string[]): string[] {
    const updated = [...currentList, ...newItems];
    return this.getMostFrequent(updated, currentList.length);
  }

  private async updateTemplateRating(templateId: string): Promise<void> {
    const ratings = await this.prisma.templateRating.aggregate({
      where: { templateId },
      _avg: { rating: true },
      _count: true
    });

    await this.prisma.template.update({
      where: { id: templateId },
      data: {
        rating: ratings._avg.rating || 0,
        ratingCount: ratings._count
      }
    });
  }

  private async getTemplateTrends(templateId: string): Promise<any> {
    // Get usage trends over time
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const dailyUsage = await this.prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('day', created_at) as date,
        COUNT(*) as usage_count
      FROM template_usage 
      WHERE template_id = ${templateId}
      AND created_at >= ${thirtyDaysAgo}
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY date DESC
    `;

    return {
      dailyUsage,
      weeklyGrowth: this.calculateGrowthRate(dailyUsage, 7),
      monthlyGrowth: this.calculateGrowthRate(dailyUsage, 30)
    };
  }

  private calculateGrowthRate(dailyData: any[], days: number): number {
    if (dailyData.length < days) return 0;

    const recent = dailyData.slice(0, Math.ceil(days / 2));
    const older = dailyData.slice(Math.ceil(days / 2), days);

    const recentSum = recent.reduce((sum: number, day: any) => sum + day.usage_count, 0);
    const olderSum = older.reduce((sum: number, day: any) => sum + day.usage_count, 0);

    return olderSum > 0 ? ((recentSum - olderSum) / olderSum) * 100 : 0;
  }

  private mapToTemplate(template: any): Template {
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category,
      thumbnail: template.thumbnail,
      data: template.data,
      tags: template.tags,
      isPublic: template.isPublic,
      downloads: template.downloads,
      rating: template.rating,
      ratingCount: template.ratingCount,
      createdBy: template.createdBy,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
      metadata: template.metadata
    };
  }

  private async uploadToS3(content: Buffer, filename: string, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `templates/${filename}`,
        Body: content,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await this.s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/templates/${filename}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }

  private async deleteFromS3(url: string): Promise<void> {
    try {
      const key = url.split('/').pop();
      if (!key) return;

      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: `templates/${key}`
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error('S3 delete error:', error);
    }
  }

  private async cachePopularTemplates(): Promise<void> {
    try {
      const templates = await this.getPopularTemplates(50);
      await this.redis.setex('popular-templates:50', 600, JSON.stringify(templates));
    } catch (error) {
      console.error('Failed to cache popular templates:', error);
    }
  }

  // BATCH OPERATIONS
  async batchUpdateTemplates(updates: Array<{ id: string; data: Partial<TemplateRequest> }>, userId: string): Promise<Template[]> {
    const results = await Promise.all(
      updates.map(update => this.updateTemplate(update.id, update.data, userId))
    );

    return results;
  }

  async batchDeleteTemplates(ids: string[], userId: string): Promise<void> {
    await Promise.all(
      ids.map(id => this.deleteTemplate(id, userId))
    );
  }

  // TEMPLATE VALIDATION
  async validateTemplate(templateData: any): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Basic structure validation
    if (!templateData.slides || !Array.isArray(templateData.slides)) {
      errors.push('Template must have a slides array');
    }

    if (templateData.slides && templateData.slides.length === 0) {
      errors.push('Template must have at least one slide');
    }

    // Slide validation
    if (templateData.slides) {
      templateData.slides.forEach((slide: any, index: number) => {
        if (!slide.title) {
          errors.push(`Slide ${index + 1} must have a title`);
        }

        if (!slide.elements || !Array.isArray(slide.elements)) {
          errors.push(`Slide ${index + 1} must have elements array`);
        }
      });
    }

    // Element validation
    if (templateData.slides) {
      templateData.slides.forEach((slide: any, slideIndex: number) => {
        if (slide.elements) {
          slide.elements.forEach((element: any, elementIndex: number) => {
            if (!element.type) {
              errors.push(`Element ${elementIndex + 1} in slide ${slideIndex + 1} must have a type`);
            }

            if (!element.content) {
              errors.push(`Element ${elementIndex + 1} in slide ${slideIndex + 1} must have content`);
            }
          });
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
