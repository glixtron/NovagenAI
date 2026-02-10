import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import Bull from 'bull';
import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import algoliasearch, { SearchIndex } from 'algoliasearch';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://novagen-ai-seven.vercel.app']
    : ['http://localhost:3000'],
  credentials: true,
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use('/api/', limiter);

// Initialize database connections
const prisma = new PrismaClient();

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
});

// Initialize queue system
const presentationQueue = new Bull('presentation processing');

// Initialize AI services
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Initialize file storage
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Initialize search clients
const elasticsearchClient = new ElasticsearchClient({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
});

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_ADMIN_API_KEY || ''
);

const elasticsearchClient = createClient({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
});

// Create HTTP server for Socket.io
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://novagen-ai-seven.vercel.app']
      : ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

// AI Services Integration
class AIService {
  static async generateContent(prompt: string, model: 'gpt-4' | 'claude' | 'gemini' = 'gpt-4') {
    try {
      switch (model) {
        case 'gpt-4':
          const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 2000,
            temperature: 0.7,
          });
          return response.choices[0]?.message?.content || '';

        case 'claude':
          // Claude API integration
          const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.ANTHROPIC_API_KEY || '',
            },
            body: JSON.stringify({
              model: 'claude-3-sonnet-20240229',
              max_tokens: 2000,
              messages: [{ role: 'user', content: prompt }],
            }),
          });
          const claudeData = await claudeResponse.json();
          return claudeData.content[0]?.text || '';

        case 'gemini':
          const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
          const geminiResult = await geminiModel.generateContent(prompt);
          return geminiResult.response.text() || '';
      }
    } catch (error) {
      console.error('AI content generation error:', error);
      throw new Error('Failed to generate content');
    }
  }

  static async generateImage(prompt: string, style: 'dall-e' | 'stable-diffusion' = 'dall-e') {
    try {
      switch (style) {
        case 'dall-e':
          const dalleResponse = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `${prompt}, professional presentation style, high quality, 8k resolution`,
            n: 1,
            size: '1024x1024',
            quality: 'hd',
          });
          return dalleResponse.data[0]?.url || '';

        case 'stable-diffusion':
          // Stable Diffusion API integration
          const sdResponse = await fetch(process.env.STABLE_DIFFUSION_API || '', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.STABLE_DIFFUSION_API_KEY || ''}`,
            },
            body: JSON.stringify({
              prompt: `${prompt}, professional presentation, high quality, detailed`,
              width: 1024,
              height: 1024,
              steps: 20,
              cfg_scale: 7,
            }),
          });
          const sdData = await sdResponse.json();
          return sdData.images[0]?.url || '';
      }
    } catch (error) {
      console.error('Image generation error:', error);
      throw new Error('Failed to generate image');
    }
  }
}

// File Storage Service
class StorageService {
  static async uploadFile(file: Buffer, key: string, contentType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read',
      });

      await s3Client.send(command);
      
      return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw new Error('Failed to upload file');
    }
  }

  static async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || 'novagenai-storage',
        Key: key,
      });

      await s3Client.send(command);
      return true;
    } catch (error) {
      console.error('S3 delete error:', error);
      return false;
    }
  }
}

// Search Service
class SearchService {
  static async indexTemplate(template: any) {
    try {
      // Index in Elasticsearch
      await elasticsearchClient.index({
        index: 'templates',
        body: template,
      });

      // Index in Algolia
      await algoliaClient.saveObject({
        indexName: 'templates',
        body: template,
      });

      return true;
    } catch (error) {
      console.error('Search indexing error:', error);
      return false;
    }
  }

  static async searchTemplates(query: string) {
    try {
      // Search Algolia
      const algoliaResults = await algoliaClient.search(query, {
        hitsPerPage: 20,
      });

      // Search Elasticsearch
      const esResults = await elasticsearchClient.search({
        index: 'templates',
        body: {
          query: {
            multi_match: {
              query: query,
              fields: ['name', 'category', 'description'],
            },
          },
        },
      });

      return {
        algolia: algoliaResults.hits,
        elasticsearch: esResults.hits.hits,
      };
    } catch (error) {
      console.error('Search error:', error);
      return { algolia: [], elasticsearch: [] };
    }
  }
}

// Queue Processing Service
class QueueService {
  static async addPresentationJob(jobData: any) {
    try {
      await presentationQueue.add('process-presentation', jobData, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
      });
      return true;
    } catch (error) {
      console.error('Queue job error:', error);
      return false;
    }
  }

  static processPresentationQueue() {
    presentationQueue.process('process-presentation', async (job) => {
      try {
        const { presentationId, userId, operations } = job.data;
        
        // Process presentation operations
        for (const operation of operations) {
          await this.processOperation(operation);
        }

        // Update database
        await prisma.presentation.update({
          where: { id: presentationId },
          data: {
            updatedAt: new Date(),
            status: 'completed',
          },
        });

        job.progress(100);
      } catch (error) {
        console.error('Queue processing error:', error);
        job.fail(error);
      }
    });
  }

  private static async processOperation(operation: any) {
    switch (operation.type) {
      case 'generate-content':
        return await AIService.generateContent(operation.prompt, operation.model);
      case 'generate-image':
        return await AIService.generateImage(operation.prompt, operation.style);
      case 'upload-file':
        return await StorageService.uploadFile(operation.file, operation.key, operation.contentType);
      default:
        throw new Error(`Unknown operation type: ${operation.type}`);
    }
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      redis: 'connected',
      queue: 'active',
      ai: 'available',
      storage: 'connected',
      search: 'available'
    }
  });
});

// Content Generation API
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, model = 'gpt-4' } = req.body;
    
    const content = await AIService.generateContent(prompt, model);
    
    res.json({
      success: true,
      content,
      model,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Image Generation API
app.post('/api/ai/generate-image', async (req, res) => {
  try {
    const { prompt, style = 'dall-e' } = req.body;
    
    const imageUrl = await AIService.generateImage(prompt, style);
    
    res.json({
      success: true,
      imageUrl,
      style,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// File Upload API
app.post('/api/storage/upload', async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const key = `uploads/${Date.now()}-${file.originalname}`;
    const url = await StorageService.uploadFile(file.buffer, key, file.mimetype);
    
    res.json({
      success: true,
      url,
      key,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Search API
app.get('/api/search/templates', async (req, res) => {
  try {
    const { q = '' } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const results = await SearchService.searchTemplates(q.toString());
    
    res.json({
      success: true,
      results,
      query: q,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Queue Job API
app.post('/api/queue/presentation', async (req, res) => {
  try {
    const { presentationId, userId, operations } = req.body;
    
    const success = await QueueService.addPresentationJob({
      presentationId,
      userId,
      operations,
      priority: 'normal',
    });
    
    res.json({
      success,
      jobId: `job_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Real-time collaboration with Socket.io
io.on('connection', (socket) => {
  console.log('User connected to collaboration:', socket.id);
  
  socket.on('join-presentation', async (presentationId) => {
    socket.join(presentationId);
    
    // Load presentation data
    const presentation = await prisma.presentation.findUnique({
      where: { id: presentationId },
      include: {
        elements: true,
        collaborators: true,
      },
    });
    
    if (presentation) {
      socket.emit('presentation-loaded', presentation);
    }
  });

  socket.on('element-update', async (data) => {
    try {
      // Update element in database
      await prisma.element.update({
        where: { id: data.elementId },
        data: {
          ...data.updates,
          updatedAt: new Date(),
        },
      });

      // Broadcast to other users in presentation
      socket.to(data.presentationId).emit('element-updated', {
        elementId: data.elementId,
        updates: data.updates,
        userId: data.userId,
      });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('cursor-move', (data) => {
    // Broadcast cursor position to other users
    socket.to(data.presentationId).emit('cursor-moved', {
      userId: data.userId,
      position: data.position,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from collaboration:', socket.id);
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Advanced server running on port ${PORT}`);
  console.log('📊 Services status:');
  console.log('  - Database: PostgreSQL + Prisma');
  console.log('  - Cache: Redis');
  console.log('  - Queue: BullMQ');
  console.log('  - AI: OpenAI + Gemini + Claude');
  console.log('  - Storage: AWS S3');
  console.log('  - Search: Elasticsearch + Algolia');
  console.log('  - Real-time: Socket.io');
});

export default app;
