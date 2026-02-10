import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

export interface AnalyticsEvent {
  userId?: string;
  sessionId?: string;
  event: string;
  properties: Record<string, any>;
  value?: number;
  timestamp: string;
  context?: {
    userAgent?: string;
    ip?: string;
    referrer?: string;
    page?: string;
  };
}

export interface AnalyticsQuery {
  userId?: string;
  event?: string;
  startDate?: string;
  endDate?: string;
  properties?: Record<string, any>;
  groupBy?: string;
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max';
  limit?: number;
  offset?: number;
}

export interface AnalyticsResponse {
  data: any[];
  total: number;
  metadata: {
    queryTime: number;
    cached: boolean;
    timestamp: string;
  };
}

export interface DashboardMetrics {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalPresentations: number;
    totalExports: number;
    totalAIGenerations: number;
  };
  engagement: {
    avgSessionDuration: number;
    bounceRate: number;
    pagesPerSession: number;
    retentionRate: number;
  };
  performance: {
    avgResponseTime: number;
    errorRate: number;
    uptime: number;
    apiCalls: number;
  };
  revenue: {
    totalRevenue: number;
    revenuePerUser: number;
    conversionRate: number;
    subscriptionGrowth: number;
  };
}

export class AnalyticsService {
  private prisma: PrismaClient;
  private redis: Redis;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });
  }

  // EVENT TRACKING
  async trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Store in database
      await this.prisma.analytics.create({
        data: {
          userId: event.userId,
          sessionId: event.sessionId,
          event: event.event,
          properties: event.properties,
          value: event.value,
          timestamp: new Date(event.timestamp),
          context: event.context
        }
      });

      // Update real-time metrics in Redis
      await this.updateRealtimeMetrics(event);

      // Trigger any real-time alerts
      await this.checkAlerts(event);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  async trackBatchEvents(events: AnalyticsEvent[]): Promise<void> {
    try {
      // Batch insert events
      await this.prisma.analytics.createMany({
        data: events.map(event => ({
          userId: event.userId,
          sessionId: event.sessionId,
          event: event.event,
          properties: event.properties,
          value: event.value,
          timestamp: new Date(event.timestamp),
          context: event.context
        }))
      });

      // Update real-time metrics for each event
      for (const event of events) {
        await this.updateRealtimeMetrics(event);
      }
    } catch (error) {
      console.error('Failed to track batch events:', error);
    }
  }

  // QUERY AND ANALYSIS
  async queryEvents(query: AnalyticsQuery): Promise<AnalyticsResponse> {
    const startTime = Date.now();
    
    try {
      // Check cache first
      const cacheKey = `analytics-query:${JSON.stringify(query)}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return {
          ...JSON.parse(cached),
          metadata: {
            ...JSON.parse(cached).metadata,
            cached: true,
            queryTime: Date.now() - startTime
          }
        };
      }

      // Build query
      const whereClause: any = {};
      
      if (query.userId) whereClause.userId = query.userId;
      if (query.event) whereClause.event = query.event;
      if (query.startDate || query.endDate) {
        whereClause.timestamp = {};
        if (query.startDate) whereClause.timestamp.gte = new Date(query.startDate);
        if (query.endDate) whereClause.timestamp.lte = new Date(query.endDate);
      }
      if (query.properties) {
        whereClause.properties = {
          path: Object.keys(query.properties),
          equals: query.properties
        };
      }

      // Execute query
      let queryBuilder = this.prisma.analytics.findMany({
        where: whereClause,
        orderBy: { timestamp: 'desc' },
        take: query.limit || 100,
        skip: query.offset || 0
      });

      // Apply aggregation if specified
      if (query.aggregation) {
        queryBuilder = this.applyAggregation(queryBuilder, query.aggregation, query.groupBy);
      }

      const data = await queryBuilder;
      const total = await this.prisma.analytics.count({ where: whereClause });

      const response: AnalyticsResponse = {
        data,
        total,
        metadata: {
          queryTime: Date.now() - startTime,
          cached: false,
          timestamp: new Date().toISOString()
        }
      };

      // Cache the result
      await this.redis.setex(cacheKey, 300, JSON.stringify(response)); // 5 minutes cache
      
      return response;
    } catch (error) {
      console.error('Failed to query events:', error);
      throw error;
    }
  }

  async getDashboardMetrics(timeRange: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<DashboardMetrics> {
    const cacheKey = `dashboard-metrics:${timeRange}`;
    const cached = await this.redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const now = new Date();
    const startDate = this.getStartDate(timeRange, now);

    try {
      // Overview metrics
      const totalUsers = await this.prisma.user.count();
      const activeUsers = await this.prisma.user.count({
        where: {
          updatedAt: {
            gte: startDate
          }
        }
      });
      const totalPresentations = await this.prisma.presentation.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      });
      const totalExports = await this.prisma.export.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      });
      const totalAIGenerations = await this.prisma.aIGeneration.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      });

      // Engagement metrics
      const avgSessionDuration = await this.calculateAvgSessionDuration(startDate);
      const bounceRate = await this.calculateBounceRate(startDate);
      const pagesPerSession = await this.calculatePagesPerSession(startDate);
      const retentionRate = await this.calculateRetentionRate(startDate);

      // Performance metrics
      const avgResponseTime = await this.calculateAvgResponseTime(startDate);
      const errorRate = await this.calculateErrorRate(startDate);
      const uptime = await this.calculateUptime(startDate);
      const apiCalls = await this.countApiCalls(startDate);

      // Revenue metrics (placeholder calculations)
      const totalRevenue = await this.calculateTotalRevenue(startDate);
      const revenuePerUser = totalUsers > 0 ? totalRevenue / totalUsers : 0;
      const conversionRate = await this.calculateConversionRate(startDate);
      const subscriptionGrowth = await this.calculateSubscriptionGrowth(startDate);

      const metrics: DashboardMetrics = {
        overview: {
          totalUsers,
          activeUsers,
          totalPresentations,
          totalExports,
          totalAIGenerations
        },
        engagement: {
          avgSessionDuration,
          bounceRate,
          pagesPerSession,
          retentionRate
        },
        performance: {
          avgResponseTime,
          errorRate,
          uptime,
          apiCalls
        },
        revenue: {
          totalRevenue,
          revenuePerUser,
          conversionRate,
          subscriptionGrowth
        }
      };

      // Cache for 10 minutes
      await this.redis.setex(cacheKey, 600, JSON.stringify(metrics));
      
      return metrics;
    } catch (error) {
      console.error('Failed to get dashboard metrics:', error);
      throw error;
    }
  }

  async getFunnelAnalysis(): Promise<any> {
    const cacheKey = 'funnel-analysis';
    const cached = await this.redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      const funnelSteps = [
        'USER_LOGIN',
        'PRESENTATION_CREATED',
        'AI_GENERATION_REQUESTED',
        'PRESENTATION_UPDATED',
        'PRESENTATION_SHARED',
        'EXPORT_REQUESTED'
      ];

      const funnelData = await Promise.all(
        funnelSteps.map(async (step) => {
          const count = await this.prisma.analytics.count({
            where: {
              event: step,
              timestamp: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
              }
            }
          });

          return {
            step,
            count,
            conversionRate: 0 // Will be calculated below
          };
        })
      );

      // Calculate conversion rates
      const totalUsers = funnelData[0].count;
      funnelData.forEach((step, index) => {
        step.conversionRate = totalUsers > 0 ? (step.count / totalUsers) * 100 : 0;
      });

      await this.redis.setex(cacheKey, 600, JSON.stringify(funnelData));
      return funnelData;
    } catch (error) {
      console.error('Failed to get funnel analysis:', error);
      throw error;
    }
  }

  async getCohortAnalysis(): Promise<any> {
    const cacheKey = 'cohort-analysis';
    const cached = await this.redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // Get user cohorts by signup date
      const cohorts = await this.prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('week', created_at) as cohort_week,
          COUNT(*) as cohort_size
        FROM users 
        WHERE created_at >= NOW() - INTERVAL '12 weeks'
        GROUP BY DATE_TRUNC('week', created_at)
        ORDER BY cohort_week DESC
      `;

      // Calculate retention for each cohort
      const cohortAnalysis = await Promise.all(
        cohorts.map(async (cohort: any) => {
          const cohortWeek = new Date(cohort.cohort_week);
          const retentionData = [];

          for (let week = 0; week < 12; week++) {
            const weekStart = new Date(cohortWeek.getTime() + week * 7 * 24 * 60 * 60 * 1000);
            const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);

            const activeUsers = await this.prisma.$queryRaw`
              SELECT COUNT(*) as active_count
              FROM users u
              WHERE DATE_TRUNC('week', u.created_at) = ${cohortWeek}
              AND EXISTS (
                SELECT 1 FROM analytics a 
                WHERE a.user_id = u.id 
                AND a.timestamp >= ${weekStart}
                AND a.timestamp < ${weekEnd}
              )
            `;

            retentionData.push({
              week: week + 1,
              activeUsers: activeUsers[0]?.active_count || 0,
              retentionRate: cohort.cohort_size > 0 ? ((activeUsers[0]?.active_count || 0) / cohort.cohort_size) * 100 : 0
            });
          }

          return {
            cohortWeek: cohort.cohort_week,
            cohortSize: cohort.cohort_size,
            retentionData
          };
        })
      );

      await this.redis.setex(cacheKey, 1800, JSON.stringify(cohortAnalysis)); // 30 minutes cache
      return cohortAnalysis;
    } catch (error) {
      console.error('Failed to get cohort analysis:', error);
      throw error;
    }
  }

  async getRealtimeMetrics(): Promise<any> {
    try {
      const metrics = await this.redis.mget([
        'realtime:active_users',
        'realtime:api_calls',
        'realtime:error_rate',
        'realtime:response_time',
        'realtime:ai_generations',
        'realtime:exports'
      ]);

      return {
        activeUsers: parseInt(metrics[0] || '0'),
        apiCalls: parseInt(metrics[1] || '0'),
        errorRate: parseFloat(metrics[2] || '0'),
        avgResponseTime: parseFloat(metrics[3] || '0'),
        aiGenerations: parseInt(metrics[4] || '0'),
        exports: parseInt(metrics[5] || '0'),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get realtime metrics:', error);
      return {};
    }
  }

  // HELPER METHODS
  private async updateRealtimeMetrics(event: AnalyticsEvent): Promise<void> {
    const now = Date.now();
    const today = new Date().toDateString();

    // Update daily counters
    await this.redis.incr(`daily:${today}:${event.event}`);
    await this.redis.expire(`daily:${today}:${event.event}`, 24 * 60 * 60);

    // Update realtime metrics
    if (event.event === 'USER_LOGIN') {
      await this.redis.incr('realtime:active_users');
      await this.redis.expire('realtime:active_users', 300); // 5 minutes
    }

    if (event.event.startsWith('API_')) {
      await this.redis.incr('realtime:api_calls');
      await this.redis.expire('realtime:api_calls', 60); // 1 minute
    }

    if (event.event === 'ERROR_OCCURRED') {
      await this.redis.incr('realtime:error_count');
      await this.redis.expire('realtime:error_count', 60);
    }

    if (event.event === 'AI_GENERATION_REQUESTED') {
      await this.redis.incr('realtime:ai_generations');
      await this.redis.expire('realtime:ai_generations', 60);
    }

    if (event.event === 'EXPORT_REQUESTED') {
      await this.redis.incr('realtime:exports');
      await this.redis.expire('realtime:exports', 60);
    }
  }

  private async checkAlerts(event: AnalyticsEvent): Promise<void> {
    // Check for critical events that need immediate attention
    if (event.event === 'ERROR_OCCURRED' && event.properties?.severity === 'critical') {
      // Send alert to monitoring system
      console.warn('Critical error detected:', event.properties);
    }

    if (event.event === 'PERFORMANCE_ISSUE' && event.properties?.responseTime > 5000) {
      // Send performance alert
      console.warn('Performance issue detected:', event.properties);
    }

    // Check for unusual activity patterns
    const recentEvents = await this.getRecentEventCount(event.userId, 5); // Last 5 minutes
    if (recentEvents > 100) {
      // Potential bot activity
      console.warn('Unusual activity detected for user:', event.userId);
    }
  }

  private async getRecentEventCount(userId?: string, minutes: number = 5): Promise<number> {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    
    return await this.prisma.analytics.count({
      where: {
        userId,
        timestamp: {
          gte: since
        }
      }
    });
  }

  private getStartDate(timeRange: string, now: Date): Date {
    switch (timeRange) {
      case 'day':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case 'year':
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
  }

  private applyAggregation(query: any, aggregation: string, groupBy?: string): any {
    // This would implement SQL aggregation logic
    // For now, return the base query
    return query;
  }

  // METRIC CALCULATION METHODS
  private async calculateAvgSessionDuration(startDate: Date): Promise<number> {
    // Calculate average session duration from login/logout events
    const sessions = await this.prisma.$queryRaw`
      SELECT 
        user_id,
        MIN(timestamp) as login_time,
        MAX(timestamp) as logout_time
      FROM analytics 
      WHERE event IN ('USER_LOGIN', 'USER_LOGOUT')
      AND timestamp >= ${startDate}
      GROUP BY user_id, DATE_TRUNC('day', timestamp)
    `;

    if (sessions.length === 0) return 0;

    const totalDuration = sessions.reduce((sum: number, session: any) => {
      const duration = new Date(session.logout_time).getTime() - new Date(session.login_time).getTime();
      return sum + duration;
    }, 0);

    return totalDuration / sessions.length / 1000 / 60; // Convert to minutes
  }

  private async calculateBounceRate(startDate: Date): Promise<number> {
    const totalSessions = await this.prisma.analytics.count({
      where: {
        event: 'USER_LOGIN',
        timestamp: { gte: startDate }
      }
    });

    const bouncedSessions = await this.prisma.$queryRaw`
      SELECT COUNT(DISTINCT user_id) as bounced_count
      FROM analytics a1
      WHERE a1.event = 'USER_LOGIN'
      AND a1.timestamp >= ${startDate}
      AND NOT EXISTS (
        SELECT 1 FROM analytics a2 
        WHERE a2.user_id = a1.user_id 
        AND a2.event IN ('PRESENTATION_CREATED', 'AI_GENERATION_REQUESTED')
        AND a2.timestamp >= a1.timestamp
        AND a2.timestamp <= a1.timestamp + INTERVAL '5 minutes'
      )
    `;

    return totalSessions > 0 ? (bouncedSessions[0]?.bounced_count || 0) / totalSessions * 100 : 0;
  }

  private async calculatePagesPerSession(startDate: Date): Promise<number> {
    const sessions = await this.prisma.$queryRaw`
      SELECT 
        user_id,
        DATE_TRUNC('day', timestamp) as session_date,
        COUNT(*) as page_views
      FROM analytics 
      WHERE event LIKE '%_VIEW%'
      AND timestamp >= ${startDate}
      GROUP BY user_id, DATE_TRUNC('day', timestamp)
    `;

    if (sessions.length === 0) return 0;

    const totalPageViews = sessions.reduce((sum: number, session: any) => sum + session.page_views, 0);
    return totalPageViews / sessions.length;
  }

  private async calculateRetentionRate(startDate: Date): Promise<number> {
    const activeUsers = await this.prisma.user.count({
      where: {
        updatedAt: { gte: startDate }
      }
    });

    const returningUsers = await this.prisma.$queryRaw`
      SELECT COUNT(DISTINCT a1.user_id) as returning_count
      FROM analytics a1
      WHERE a1.event = 'USER_LOGIN'
      AND a1.timestamp >= ${startDate}
      AND EXISTS (
        SELECT 1 FROM analytics a2 
        WHERE a2.user_id = a1.user_id 
        AND a2.event = 'USER_LOGIN'
        AND a2.timestamp < a1.timestamp - INTERVAL '7 days'
      )
    `;

    return activeUsers > 0 ? (returningUsers[0]?.returning_count || 0) / activeUsers * 100 : 0;
  }

  private async calculateAvgResponseTime(startDate: Date): Promise<number> {
    const responseTimes = await this.prisma.analytics.aggregate({
      where: {
        event: 'API_RESPONSE_TIME',
        timestamp: { gte: startDate }
      },
      _avg: {
        value: true
      }
    });

    return responseTimes._avg.value || 0;
  }

  private async calculateErrorRate(startDate: Date): Promise<number> {
    const totalRequests = await this.prisma.analytics.count({
      where: {
        event: 'API_REQUEST',
        timestamp: { gte: startDate }
      }
    });

    const errorRequests = await this.prisma.analytics.count({
      where: {
        event: 'ERROR_OCCURRED',
        timestamp: { gte: startDate }
      }
    });

    return totalRequests > 0 ? (errorRequests / totalRequests) * 100 : 0;
  }

  private async calculateUptime(startDate: Date): Promise<number> {
    // This would typically come from monitoring service
    // For now, return a placeholder
    return 99.9;
  }

  private async countApiCalls(startDate: Date): Promise<number> {
    return await this.prisma.analytics.count({
      where: {
        event: 'API_REQUEST',
        timestamp: { gte: startDate }
      }
    });
  }

  private async calculateTotalRevenue(startDate: Date): Promise<number> {
    // This would integrate with payment service
    // For now, return a placeholder
    return 10000;
  }

  private async calculateConversionRate(startDate: Date): Promise<number> {
    const totalUsers = await this.prisma.user.count({
      where: {
        createdAt: { gte: startDate }
      }
    });

    const payingUsers = await this.prisma.user.count({
      where: {
        createdAt: { gte: startDate },
        role: 'PREMIUM'
      }
    });

    return totalUsers > 0 ? (payingUsers / totalUsers) * 100 : 0;
  }

  private async calculateSubscriptionGrowth(startDate: Date): Promise<number> {
    const previousPeriod = new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const currentSubscriptions = await this.prisma.user.count({
      where: {
        role: 'PREMIUM',
        createdAt: { gte: startDate }
      }
    });

    const previousSubscriptions = await this.prisma.user.count({
      where: {
        role: 'PREMIUM',
        createdAt: { gte: previousPeriod, lt: startDate }
      }
    });

    return previousSubscriptions > 0 ? ((currentSubscriptions - previousSubscriptions) / previousSubscriptions) * 100 : 0;
  }

  // DATA EXPORT AND REPORTING
  async exportAnalytics(query: AnalyticsQuery, format: 'csv' | 'json' | 'xlsx'): Promise<string> {
    const data = await this.queryEvents(query);
    
    switch (format) {
      case 'csv':
        return this.convertToCSV(data.data);
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'xlsx':
        return this.convertToXLSX(data.data);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }

  private convertToXLSX(data: any[]): string {
    // This would use a library like xlsx
    // For now, return a placeholder
    return 'XLSX export placeholder';
  }

  // CLEANUP AND MAINTENANCE
  async cleanupOldData(): Promise<void> {
    try {
      // Delete analytics data older than 1 year
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      
      await this.prisma.analytics.deleteMany({
        where: {
          timestamp: {
            lt: oneYearAgo
          }
        }
      });

      console.log('Cleaned up old analytics data');
    } catch (error) {
      console.error('Failed to cleanup old data:', error);
    }
  }

  async generateReport(reportType: 'daily' | 'weekly' | 'monthly'): Promise<any> {
    const metrics = await this.getDashboardMetrics(reportType);
    const funnel = await this.getFunnelAnalysis();
    const cohorts = await this.getCohortAnalysis();

    return {
      reportType,
      generatedAt: new Date().toISOString(),
      metrics,
      funnel,
      cohorts
    };
  }
}
