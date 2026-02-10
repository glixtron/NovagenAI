import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { Server } from 'socket.io';
import { createServer } from 'http';

// Import all services
import { AIService } from './services/AIService';
import { ImageSourcesService } from './services/ImageSourcesService';
import { DataVisualizationService } from './services/DataVisualizationService';
import { ExportServicesService } from './services/ExportServicesService';
import { CollaborationServicesService } from './services/CollaborationServicesService';
import { PPTGeneratorService } from './services/PPTGeneratorService';
import { SecurityService } from './services/SecurityService';
import { PerformanceService } from './services/PerformanceService';
import { LegalComplianceService } from './services/LegalComplianceService';
import { MonitoringService } from './services/MonitoringService';

class NovagenAIApp {
  private app: express.Application;
  private server: any;
  private io: Server;
  private prisma: PrismaClient;
  private redis: Redis;
  
  // Services
  private aiService: AIService;
  private imageSourcesService: ImageSourcesService;
  private dataVisualizationService: DataVisualizationService;
  private exportServicesService: ExportServicesService;
  private collaborationServicesService: CollaborationServicesService;
  private pptGeneratorService: PPTGeneratorService;
  private securityService: SecurityService;
  private performanceService: PerformanceService;
  private legalComplianceService: LegalComplianceService;
  private monitoringService: MonitoringService;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true
      }
    });

    this.prisma = new PrismaClient();
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    this.initializeServices();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupSocketIO();
    this.setupErrorHandling();
  }

  private initializeServices(): void {
    // Initialize all services
    this.aiService = new AIService();
    this.imageSourcesService = new ImageSourcesService();
    this.dataVisualizationService = new DataVisualizationService();
    this.exportServicesService = new ExportServicesService();
    this.collaborationServicesService = new CollaborationServicesService();
    this.pptGeneratorService = new PPTGeneratorService();
    this.securityService = new SecurityService();
    this.performanceService = new PerformanceService();
    this.legalComplianceService = new LegalComplianceService();
    this.monitoringService = new MonitoringService();
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:", "blob:"],
          scriptSrc: ["'self'", "'unsafe-eval'"],
          connectSrc: ["'self'", "ws:", "wss:", "https://api.openai.com", "https://generativelanguage.googleapis.com"],
        },
      },
    }));

    // CORS
    this.app.use(cors(this.securityService.getCorsConfig()));

    // Compression
    this.app.use(compression());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // Limit each IP to 1000 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use('/api/', limiter);

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request validation
    this.app.use((req, res, next) => {
      const validation = this.securityService.validateRequest(req);
      if (!validation.valid) {
        return res.status(400).json({ 
          error: 'Invalid request', 
          details: validation.errors 
        });
      }
      next();
    });
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', async (req, res) => {
      try {
        const health = await this.monitoringService.performHealthCheck();
        res.json(health);
      } catch (error) {
        res.status(500).json({ status: 'unhealthy', error: error.message });
      }
    });

    // AI Services Routes
    this.app.post('/api/ai/generate-content', async (req, res) => {
      try {
        const result = await this.aiService.generateContent(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'ai-service', action: 'generate-content' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/ai/generate-image', async (req, res) => {
      try {
        const result = await this.aiService.generateImage(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'ai-service', action: 'generate-image' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Image Sources Routes
    this.app.post('/api/images/search', async (req, res) => {
      try {
        const result = await this.imageSourcesService.searchImages(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'image-sources', action: 'search' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Data Visualization Routes
    this.app.post('/api/charts/generate', async (req, res) => {
      try {
        const result = await this.dataVisualizationService.generateChart(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'data-visualization', action: 'generate-chart' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Export Services Routes
    this.app.post('/api/export/generate', async (req, res) => {
      try {
        const result = await this.exportServicesService.generateExport(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'export-services', action: 'generate' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Collaboration Routes
    this.app.post('/api/collaboration/join', async (req, res) => {
      try {
        const result = await this.collaborationServicesService.joinSession(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'collaboration', action: 'join-session' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // PPT Generator Routes
    this.app.post('/api/ppt/create', async (req, res) => {
      try {
        const result = await this.pptGeneratorService.createPresentation(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'ppt-generator', action: 'create' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Security Routes
    this.app.post('/api/auth/login', async (req, res) => {
      try {
        const result = await this.securityService.authenticate({
          type: 'login',
          credentials: req.body,
          metadata: {
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip
          }
        });
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'security', action: 'login' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Performance Routes
    this.app.post('/api/performance/cache', async (req, res) => {
      try {
        const result = await this.performanceService.cache(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'performance', action: 'cache' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Legal Compliance Routes
    this.app.post('/api/legal/privacy-policy', async (req, res) => {
      try {
        const result = await this.legalComplianceService.generatePrivacyPolicy(req.body);
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'legal', action: 'privacy-policy' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Monitoring Routes
    this.app.get('/api/monitoring/dashboard', async (req, res) => {
      try {
        const result = await this.monitoringService.getMonitoringDashboard();
        res.json(result);
      } catch (error) {
        await this.monitoringService.trackError({
          error: error.message,
          context: { component: 'monitoring', action: 'dashboard' },
          metadata: { timestamp: new Date().toISOString() }
        });
        res.status(500).json({ error: error.message });
      }
    });

    // Static files and Next.js handling will be added here
    this.app.use(express.static('public'));
  }

  private setupSocketIO(): void {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Handle collaboration events
      socket.on('join-presentation', async (data) => {
        try {
          await this.collaborationServicesService.handleSocketJoin(socket, data);
        } catch (error) {
          socket.emit('error', { message: error.message });
        }
      });

      socket.on('presentation-update', async (data) => {
        try {
          await this.collaborationServicesService.handleSocketUpdate(socket, data);
        } catch (error) {
          socket.emit('error', { message: error.message });
        }
      });

      socket.on('cursor-move', async (data) => {
        try {
          await this.collaborationServicesService.handleCursorMove(socket, data);
        } catch (error) {
          socket.emit('error', { message: error.message });
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        this.collaborationServicesService.handleSocketLeave(socket.id);
      });
    });
  }

  private setupErrorHandling(): void {
    // Global error handler
    this.app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Track error
      this.monitoringService.trackError({
        error: error.message,
        context: {
          component: 'global-error-handler',
          action: req.path,
          userId: req.headers['x-user-id'] as string
        },
        metadata: {
          timestamp: new Date().toISOString(),
          stackTrace: error.stack
        }
      });

      // Send error response
      res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    });

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });
  }

  public async start(): Promise<void> {
    const port = process.env.PORT || 3001;
    
    try {
      // Test database connection
      await this.prisma.$connect();
      console.log('✅ Database connected successfully');

      // Test Redis connection
      await this.redis.ping();
      console.log('✅ Redis connected successfully');

      // Start server
      this.server.listen(port, () => {
        console.log(`🚀 NovagenAI server running on port ${port}`);
        console.log(`📊 Monitoring dashboard available at http://localhost:${port}/api/monitoring/dashboard`);
        console.log(`🏥 Health check available at http://localhost:${port}/health`);
      });

      // Track startup
      await this.monitoringService.trackPerformance({
        metric: 'application.startup',
        value: 1,
        context: { service: 'novagenai-api' },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    console.log('🛑 Shutting down server...');
    
    this.server.close(async () => {
      await this.prisma.$disconnect();
      await this.redis.disconnect();
      console.log('✅ Server shut down successfully');
      process.exit(0);
    });
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📡 SIGTERM received');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('📡 SIGINT received');
  process.exit(0);
});

// Start the application
const app = new NovagenAIApp();
app.start().catch(console.error);

export default NovagenAIApp;
