import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import * as Sentry from '@sentry/node';
import * as Bugsnag from '@bugsnag/js';
import * as Datadog from 'datadog-api-client';
import * as NewRelic from 'newrelic';
import * as Mixpanel from 'mixpanel';
import * as Amplitude from 'amplitude';
import { Winston } from 'winston';
import { CloudWatchLogs, ELKStack } from 'log-management';
import { Pingdom, UptimeRobot } from 'uptime-monitoring';

export interface ErrorTrackingRequest {
  error: Error | string;
  context?: {
    userId?: string;
    sessionId?: string;
    presentationId?: string;
    slideId?: string;
    component?: string;
    action?: string;
    userAgent?: string;
    ipAddress?: string;
    tags?: string[];
    level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  };
  metadata?: {
    timestamp: string;
    stackTrace?: string;
    breadcrumbs?: Breadcrumb[];
    release?: string;
    environment?: string;
  };
}

export interface ErrorTrackingResponse {
  eventId: string;
  platform: 'sentry' | 'bugsnag';
  severity: string;
  status: 'captured' | 'filtered' | 'rate_limited';
  metadata: {
    timestamp: string;
    fingerprint: string;
    issueId?: string;
    groupId?: string;
  };
}

export interface PerformanceMonitoringRequest {
  metric: string;
  value: number;
  tags?: Record<string, string>;
  context?: {
    userId?: string;
    sessionId?: string;
    presentationId?: string;
    operation?: string;
    service?: string;
    environment?: string;
  };
  timestamp?: string;
  unit?: 'milliseconds' | 'seconds' | 'bytes' | 'count' | 'percent';
}

export interface PerformanceMonitoringResponse {
  metricId: string;
  platform: 'datadog' | 'newrelic';
  status: 'submitted' | 'filtered' | 'aggregated';
  metadata: {
    timestamp: string;
    aggregation?: string;
    retention?: string;
    alertTriggered?: boolean;
  };
}

export interface UserAnalyticsRequest {
  event: string;
  userId?: string;
  anonymousId?: string;
  properties?: Record<string, any>;
  context?: {
    ip?: string;
    userAgent?: string;
    page?: string;
    referrer?: string;
    campaign?: string;
    device?: DeviceInfo;
    location?: LocationInfo;
  };
  timestamp?: string;
  platform: 'mixpanel' | 'amplitude';
}

export interface UserAnalyticsResponse {
  eventId: string;
  platform: string;
  status: 'tracked' | 'filtered' | 'rate_limited';
  metadata: {
    timestamp: string;
    userId?: string;
    eventType: string;
    ingestionLatency?: number;
  };
}

export interface LogManagementRequest {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  context?: {
    service?: string;
    version?: string;
    environment?: string;
    userId?: string;
    sessionId?: string;
    requestId?: string;
    traceId?: string;
  };
  metadata?: {
    timestamp: string;
    stackTrace?: string;
    tags?: string[];
    structured?: boolean;
  };
  platform: 'elk' | 'cloudwatch';
}

export interface LogManagementResponse {
  logId: string;
  platform: string;
  status: 'indexed' | 'filtered' | 'retained';
  metadata: {
    timestamp: string;
    index?: string;
    retention?: string;
    searchable?: boolean;
  };
}

export interface UptimeMonitoringRequest {
  url: string;
  name: string;
  checkInterval?: number; // in seconds
  timeout?: number; // in seconds
  locations?: string[];
  alerting?: {
    enabled: boolean;
    emails?: string[];
    webhooks?: string[];
    threshold?: number; // consecutive failures before alert
  };
  metadata?: {
    tags?: string[];
    notes?: string;
    group?: string;
  };
}

export interface UptimeMonitoringResponse {
  monitorId: string;
  platform: 'pingdom' | 'uptimerobot';
  status: 'created' | 'updated' | 'deleted';
  metadata: {
    url: string;
    checkInterval: number;
    locations: string[];
    lastCheck?: string;
    uptime?: number;
    responseTime?: number;
  };
}

export interface MonitoringDashboard {
  errorTracking: {
    totalErrors: number;
    errorRate: number;
    criticalErrors: number;
    resolvedErrors: number;
    topErrors: ErrorSummary[];
  };
  performance: {
    averageResponseTime: number;
    throughput: number;
    errorRate: number;
    topSlowEndpoints: PerformanceSummary[];
  };
  analytics: {
    activeUsers: number;
    totalEvents: number;
    topEvents: EventSummary[];
    userRetention: RetentionMetrics;
  };
  uptime: {
    overallUptime: number;
    serviceStatus: ServiceStatus[];
    incidentHistory: IncidentSummary[];
  };
}

export interface Breadcrumb {
  timestamp: string;
  message: string;
  category: string;
  level: string;
  data?: any;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  version: string;
  screenResolution: string;
}

export interface LocationInfo {
  country: string;
  region: string;
  city: string;
  timezone: string;
}

export interface ErrorSummary {
  message: string;
  count: number;
  lastOccurrence: string;
  stackTrace: string;
  affectedUsers: number;
}

export interface PerformanceSummary {
  endpoint: string;
  averageResponseTime: number;
  requestCount: number;
  errorRate: number;
  p95ResponseTime: number;
}

export interface EventSummary {
  event: string;
  count: number;
  uniqueUsers: number;
  averageValue?: number;
}

export interface RetentionMetrics {
  day1: number;
  day7: number;
  day30: number;
  cohort: string;
}

export interface ServiceStatus {
  name: string;
  status: 'up' | 'down' | 'degraded';
  uptime: number;
  lastCheck: string;
  responseTime: number;
}

export interface IncidentSummary {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  startTime: string;
  endTime?: string;
  duration?: string;
  affectedServices: string[];
}

export class MonitoringService {
  private prisma: PrismaClient;
  private redis: Redis;
  
  // Error Tracking
  private sentry: typeof Sentry;
  private bugsnag: typeof Bugsnag;
  
  // Performance Monitoring
  private datadog: typeof Datadog;
  private newrelic: typeof NewRelic;
  
  // User Analytics
  private mixpanel: typeof Mixpanel;
  private amplitude: typeof Amplitude;
  
  // Log Management
  private elkStack: ELKStack;
  private cloudWatchLogs: CloudWatchLogs;
  
  // Uptime Monitoring
  private pingdom: Pingdom;
  private uptimeRobot: UptimeRobot;
  
  // Local logger
  private logger: Winston.Logger;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    this.initializeServices();
    this.setupLocalLogger();
  }

  private initializeServices(): void {
    // Initialize Sentry
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
        release: process.env.RELEASE_VERSION || '1.0.0',
        tracesSampleRate: 0.1,
        debug: process.env.NODE_ENV === 'development',
      });
      this.sentry = Sentry;
    }

    // Initialize Bugsnag
    if (process.env.BUGSNAG_API_KEY) {
      Bugsnag.start({
        apiKey: process.env.BUGSNAG_API_KEY,
        releaseStage: process.env.NODE_ENV || 'development',
        appVersion: process.env.RELEASE_VERSION || '1.0.0',
      });
      this.bugsnag = Bugsnag;
    }

    // Initialize Datadog
    if (process.env.DATADOG_API_KEY && process.env.DATADOG_APP_KEY) {
      Datadog.initializeApp({
        apiKey: process.env.DATADOG_API_KEY,
        appKey: process.env.DATADOG_APP_KEY,
        site: process.env.DATADOG_SITE || 'datadoghq.com',
      });
      this.datadog = Datadog;
    }

    // Initialize New Relic
    if (process.env.NEW_RELIC_LICENSE_KEY) {
      NewRelic.initialize({
        licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
        appName: process.env.NEW_RELIC_APP_NAME || 'novagenai',
        logLevel: 'info',
      });
      this.newrelic = NewRelic;
    }

    // Initialize Mixpanel
    if (process.env.MIXPANEL_TOKEN) {
      this.mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === 'development',
      });
    }

    // Initialize Amplitude
    if (process.env.AMPLITUDE_API_KEY) {
      this.amplitude = Amplitude.init(process.env.AMPLITUDE_API_KEY, {
        platform: 'Web',
        logLevel: process.env.NODE_ENV === 'development' ? 'DEBUG' : 'WARN',
      });
    }

    // Initialize ELK Stack
    if (process.env.ELK_HOST) {
      this.elkStack = new ELKStack({
        host: process.env.ELK_HOST,
        port: parseInt(process.env.ELK_PORT || '9200'),
        index: 'novagenai-logs',
      });
    }

    // Initialize CloudWatch Logs
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.cloudWatchLogs = new CloudWatchLogs({
        region: process.env.AWS_REGION || 'us-east-1',
        logGroupName: '/aws/novagenai/application',
      });
    }

    // Initialize Pingdom
    if (process.env.PINGDOM_API_KEY) {
      this.pingdom = new Pingdom({
        apiKey: process.env.PINGDOM_API_KEY,
        email: process.env.PINGDOM_EMAIL,
        password: process.env.PINGDOM_PASSWORD,
      });
    }

    // Initialize UptimeRobot
    if (process.env.UPTIMEROBOT_API_KEY) {
      this.uptimeRobot = new UptimeRobot({
        apiKey: process.env.UPTIMEROBOT_API_KEY,
      });
    }
  }

  private setupLocalLogger(): void {
    this.logger = Winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.errors({ stack: true }),
        Winston.format.json()
      ),
      transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({ filename: 'error.log', level: 'error' }),
        new Winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  // ERROR TRACKING
  async trackError(request: ErrorTrackingRequest): Promise<ErrorTrackingResponse[]> {
    const responses: ErrorTrackingResponse[] = [];

    // Track in Sentry
    if (this.sentry) {
      try {
        const eventId = this.sentry.captureException(request.error, {
          tags: request.context?.tags,
          extra: {
            userId: request.context?.userId,
            sessionId: request.context?.sessionId,
            presentationId: request.context?.presentationId,
            slideId: request.context?.slideId,
            component: request.context?.component,
            action: request.context?.action,
            userAgent: request.context?.userAgent,
            ipAddress: request.context?.ipAddress,
            level: request.context?.level || 'error',
          },
          level: request.context?.level || 'error',
          fingerprint: this.generateFingerprint(request),
        });

        responses.push({
          eventId,
          platform: 'sentry',
          severity: request.context?.level || 'error',
          status: 'captured',
          metadata: {
            timestamp: new Date().toISOString(),
            fingerprint: this.generateFingerprint(request),
          },
        });
      } catch (error) {
        this.logger.error('Sentry error tracking failed:', error);
      }
    }

    // Track in Bugsnag
    if (this.bugsnag) {
      try {
        const event = this.bugsnag.notify(request.error, {
          userId: request.context?.userId,
          context: request.context?.component,
          metadata: {
            sessionId: request.context?.sessionId,
            presentationId: request.context?.presentationId,
            slideId: request.context?.slideId,
            action: request.context?.action,
            userAgent: request.context?.userAgent,
            ipAddress: request.context?.ipAddress,
            tags: request.context?.tags,
            level: request.context?.level || 'error',
          },
          severity: request.context?.level || 'error',
        });

        responses.push({
          eventId: event.id,
          platform: 'bugsnag',
          severity: request.context?.level || 'error',
          status: 'captured',
          metadata: {
            timestamp: new Date().toISOString(),
            fingerprint: this.generateFingerprint(request),
          },
        });
      } catch (error) {
        this.logger.error('Bugsnag error tracking failed:', error);
      }
    }

    // Store in local database for analysis
    try {
      await this.prisma.errorLog.create({
        data: {
          message: typeof request.error === 'string' ? request.error : request.error.message,
          stackTrace: typeof request.error === 'string' ? '' : request.error.stack,
          level: request.context?.level || 'error',
          userId: request.context?.userId,
          sessionId: request.context?.sessionId,
          presentationId: request.context?.presentationId,
          slideId: request.context?.slideId,
          component: request.context?.component,
          action: request.context?.action,
          userAgent: request.context?.userAgent,
          ipAddress: request.context?.ipAddress,
          tags: request.context?.tags || [],
          eventId: responses[0]?.eventId,
          platform: responses[0]?.platform,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error('Database error logging failed:', error);
    }

    return responses;
  }

  // PERFORMANCE MONITORING
  async trackPerformance(request: PerformanceMonitoringRequest): Promise<PerformanceMonitoringResponse[]> {
    const responses: PerformanceMonitoringResponse[] = [];

    // Track in Datadog
    if (this.datadog) {
      try {
        const metricId = this.datadog.metric.send({
          metric: request.metric,
          points: [[Date.now(), request.value]],
          tags: Object.entries(request.tags || {}).map(([key, value]) => `${key}:${value}`),
          type: 'gauge',
          host: request.context?.service || 'novagenai-api',
        });

        responses.push({
          metricId: metricId.id,
          platform: 'datadog',
          status: 'submitted',
          metadata: {
            timestamp: new Date().toISOString(),
            aggregation: 'gauge',
            retention: '15_months',
          },
        });
      } catch (error) {
        this.logger.error('Datadog performance tracking failed:', error);
      }
    }

    // Track in New Relic
    if (this.newrelic) {
      try {
        this.newrelic.recordMetric(request.metric, request.value, {
          ...request.tags,
          ...request.context,
        });

        responses.push({
          metricId: `nr-${Date.now()}`,
          platform: 'newrelic',
          status: 'submitted',
          metadata: {
            timestamp: new Date().toISOString(),
            aggregation: 'average',
            retention: '8_months',
          },
        });
      } catch (error) {
        this.logger.error('New Relic performance tracking failed:', error);
      }
    }

    // Store in Redis for real-time monitoring
    try {
      const key = `perf:${request.metric}:${request.context?.service || 'default'}`;
      await this.redis.zadd(key, Date.now(), JSON.stringify({
        value: request.value,
        tags: request.tags,
        context: request.context,
        timestamp: request.timestamp || new Date().toISOString(),
      }));

      // Keep only last 1000 data points
      await this.redis.zremrangebyrank(key, 0, -1001);
    } catch (error) {
      this.logger.error('Redis performance tracking failed:', error);
    }

    return responses;
  }

  // USER ANALYTICS
  async trackUserEvent(request: UserAnalyticsRequest): Promise<UserAnalyticsResponse[]> {
    const responses: UserAnalyticsResponse[] = [];

    // Track in Mixpanel
    if (this.mixpanel && request.platform === 'mixpanel') {
      try {
        const eventId = this.mixpanel.track(request.event, {
          distinct_id: request.userId || request.anonymousId,
          properties: request.properties,
          time: request.timestamp ? new Date(request.timestamp).getTime() / 1000 : undefined,
          ip: request.context?.ip,
          $user_agent: request.context?.userAgent,
          $page: request.context?.page,
          $referrer: request.context?.referrer,
          $campaign: request.context?.campaign,
          $device: request.context?.device,
          $location: request.context?.location,
        });

        responses.push({
          eventId: eventId.toString(),
          platform: 'mixpanel',
          status: 'tracked',
          metadata: {
            timestamp: new Date().toISOString(),
            userId: request.userId,
            eventType: request.event,
          },
        });
      } catch (error) {
        this.logger.error('Mixpanel event tracking failed:', error);
      }
    }

    // Track in Amplitude
    if (this.amplitude && request.platform === 'amplitude') {
      try {
        const eventId = this.amplitude.logEvent({
          event_type: request.event,
          user_id: request.userId,
          event_properties: request.properties,
          time: request.timestamp ? new Date(request.timestamp).getTime() : Date.now(),
          platform: 'Web',
          ip: request.context?.ip,
          country: request.context?.location?.country,
          city: request.context?.location?.city,
          device_type: request.context?.device?.type,
          os_name: request.context?.device?.os,
          os_version: request.context?.device?.version,
          language: navigator.language,
        });

        responses.push({
          eventId: eventId.toString(),
          platform: 'amplitude',
          status: 'tracked',
          metadata: {
            timestamp: new Date().toISOString(),
            userId: request.userId,
            eventType: request.event,
          },
        });
      } catch (error) {
        this.logger.error('Amplitude event tracking failed:', error);
      }
    }

    // Store in database for custom analytics
    try {
      await this.prisma.analytics.create({
        data: {
          userId: request.userId,
          anonymousId: request.anonymousId,
          event: request.event,
          properties: request.properties || {},
          platform: request.platform,
          ip: request.context?.ip,
          userAgent: request.context?.userAgent,
          page: request.context?.page,
          referrer: request.context?.referrer,
          campaign: request.context?.campaign,
          device: request.context?.device,
          location: request.context?.location,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error('Database analytics tracking failed:', error);
    }

    return responses;
  }

  // LOG MANAGEMENT
  async manageLog(request: LogManagementRequest): Promise<LogManagementResponse[]> {
    const responses: LogManagementResponse[] = [];

    // Send to ELK Stack
    if (this.elkStack && request.platform === 'elk') {
      try {
        const logId = await this.elkStack.indexLog({
          level: request.level,
          message: request.message,
          context: request.context,
          metadata: request.metadata,
          timestamp: request.timestamp || new Date().toISOString(),
        });

        responses.push({
          logId,
          platform: 'elk',
          status: 'indexed',
          metadata: {
            timestamp: request.timestamp || new Date().toISOString(),
            index: 'novagenai-logs',
            retention: '30_days',
            searchable: true,
          },
        });
      } catch (error) {
        this.logger.error('ELK Stack log management failed:', error);
      }
    }

    // Send to CloudWatch Logs
    if (this.cloudWatchLogs && request.platform === 'cloudwatch') {
      try {
        const logId = await this.cloudWatchLogs.sendLog({
          level: request.level,
          message: request.message,
          context: request.context,
          metadata: request.metadata,
          timestamp: request.timestamp || new Date().toISOString(),
        });

        responses.push({
          logId,
          platform: 'cloudwatch',
          status: 'retained',
          metadata: {
            timestamp: request.timestamp || new Date().toISOString(),
            retention: '14_days',
            searchable: true,
          },
        });
      } catch (error) {
        this.logger.error('CloudWatch log management failed:', error);
      }
    }

    // Also log locally
    this.logger.log(request.level, request.message, {
      context: request.context,
      metadata: request.metadata,
    });

    return responses;
  }

  // UPTIME MONITORING
  async createUptimeMonitor(request: UptimeMonitoringRequest): Promise<UptimeMonitoringResponse[]> {
    const responses: UptimeMonitoringResponse[] = [];

    // Create in Pingdom
    if (this.pingdom && request.platform === 'pingdom') {
      try {
        const monitor = await this.pingdom.createCheck({
          name: request.name,
          url: request.url,
          checkInterval: request.checkInterval || 60,
          timeout: request.timeout || 30,
          locations: request.locations || ['US East'],
          alerting: request.alerting,
          tags: request.metadata?.tags,
          notes: request.metadata?.notes,
          group: request.metadata?.group,
        });

        responses.push({
          monitorId: monitor.id,
          platform: 'pingdom',
          status: 'created',
          metadata: {
            url: request.url,
            checkInterval: request.checkInterval || 60,
            locations: request.locations || ['US East'],
          },
        });
      } catch (error) {
        this.logger.error('Pingdom monitor creation failed:', error);
      }
    }

    // Create in UptimeRobot
    if (this.uptimeRobot && request.platform === 'uptimerobot') {
      try {
        const monitor = await this.uptimeRobot.createMonitor({
          type: 'http',
          name: request.name,
          url: request.url,
          interval: request.checkInterval || 60,
          timeout: request.timeout || 30,
          alertContacts: request.alerting?.emails || [],
          keywordExists: '',
          keywordNotExists: '',
          httpMethod: 'GET',
          postType: 'application/json',
          postData: '',
          port: '',
          subType: '',
        });

        responses.push({
          monitorId: monitor.id,
          platform: 'uptimerobot',
          status: 'created',
          metadata: {
            url: request.url,
            checkInterval: request.checkInterval || 60,
            locations: ['Global'],
          },
        });
      } catch (error) {
        this.logger.error('UptimeRobot monitor creation failed:', error);
      }
    }

    // Store in database
    try {
      await this.prisma.uptimeMonitor.create({
        data: {
          name: request.name,
          url: request.url,
          checkInterval: request.checkInterval || 60,
          timeout: request.timeout || 30,
          locations: request.locations || ['US East'],
          alerting: request.alerting || {},
          tags: request.metadata?.tags || [],
          notes: request.metadata?.notes,
          group: request.metadata?.group,
          platform: request.platform,
          monitorId: responses[0]?.monitorId,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error('Database uptime monitor creation failed:', error);
    }

    return responses;
  }

  // MONITORING DASHBOARD
  async getMonitoringDashboard(): Promise<MonitoringDashboard> {
    try {
      const [
        errorStats,
        performanceStats,
        analyticsStats,
        uptimeStats,
      ] = await Promise.all([
      this.getErrorStats(),
      this.getPerformanceStats(),
      this.getAnalyticsStats(),
      this.getUptimeStats(),
    ]);

      return {
        errorTracking: errorStats,
        performance: performanceStats,
        analytics: analyticsStats,
        uptime: uptimeStats,
      };
    } catch (error) {
      this.logger.error('Failed to get monitoring dashboard:', error);
      throw error;
    }
  }

  // HELPER METHODS
  private generateFingerprint(request: ErrorTrackingRequest): string {
    const fingerprintData = {
      message: typeof request.error === 'string' ? request.error : request.error.message,
      component: request.context?.component,
      action: request.context?.action,
      stackTrace: typeof request.error === 'string' ? '' : request.error.stack?.substring(0, 500),
    };

    return require('crypto')
      .createHash('md5')
      .update(JSON.stringify(fingerprintData))
      .digest('hex');
  }

  private async getErrorStats(): Promise<any> {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [
      totalErrors,
      criticalErrors,
      resolvedErrors,
      topErrors,
    ] = await Promise.all([
      this.prisma.errorLog.count({
        where: { createdAt: { gte: dayAgo } },
      }),
      this.prisma.errorLog.count({
        where: { 
          createdAt: { gte: dayAgo },
          level: 'fatal',
        },
      }),
      this.prisma.errorLog.count({
        where: { 
          createdAt: { gte: dayAgo },
          resolvedAt: { not: null },
        },
      }),
      this.prisma.errorLog.groupBy({
        by: ['message'],
        where: { createdAt: { gte: dayAgo } },
        _count: true,
        orderBy: { _count: { _all: 'desc' } },
        take: 5,
      }),
    ]);

    return {
      totalErrors,
      errorRate: totalErrors > 0 ? (totalErrors / 1000) * 100 : 0, // Assuming 1000 requests
      criticalErrors,
      resolvedErrors,
      topErrors: topErrors.map((error: any) => ({
        message: error.message,
        count: error._count,
        lastOccurrence: new Date().toISOString(),
        stackTrace: '',
        affectedUsers: 0,
      })),
    };
  }

  private async getPerformanceStats(): Promise<any> {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;

    // Get performance metrics from Redis
    const keys = await this.redis.keys('perf:*');
    const metrics: any[] = [];

    for (const key of keys) {
      const data = await this.redis.zrange(key, -100, -1, 'WITHSCORES');
      const recentData = data.filter(([_, score]) => parseInt(score) >= hourAgo);
      
      if (recentData.length > 0) {
        const values = recentData.map(([data]) => JSON.parse(data).value);
        const avgResponseTime = values.reduce((sum, val) => sum + val, 0) / values.length;
        
        metrics.push({
          endpoint: key.replace('perf:', ''),
          averageResponseTime: avgResponseTime,
          requestCount: values.length,
          errorRate: 0, // Would calculate from error logs
          p95ResponseTime: this.calculatePercentile(values, 95),
        });
      }
    }

    return {
      averageResponseTime: metrics.length > 0 ? 
        metrics.reduce((sum, m) => sum + m.averageResponseTime, 0) / metrics.length : 0,
      throughput: metrics.reduce((sum, m) => sum + m.requestCount, 0),
      errorRate: 0,
      topSlowEndpoints: metrics.sort((a, b) => b.averageResponseTime - a.averageResponseTime).slice(0, 5),
    };
  }

  private async getAnalyticsStats(): Promise<any> {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [
      activeUsers,
      totalEvents,
      topEvents,
      retention,
    ] = await Promise.all([
      this.prisma.analytics.groupBy({
        by: ['userId'],
        where: { 
          createdAt: { gte: dayAgo },
          userId: { not: null },
        },
        _count: true,
      }),
      this.prisma.analytics.count({
        where: { createdAt: { gte: dayAgo } },
      }),
      this.prisma.analytics.groupBy({
        by: ['event'],
        where: { createdAt: { gte: dayAgo } },
        _count: true,
        orderBy: { _count: { _all: 'desc' } },
        take: 5,
      }),
      this.calculateRetentionMetrics(),
    ]);

    return {
      activeUsers: activeUsers.length,
      totalEvents,
      topEvents: topEvents.map((event: any) => ({
        event: event.event,
        count: event._count,
        uniqueUsers: 0,
        averageValue: 0,
      })),
      userRetention: retention,
    };
  }

  private async getUptimeStats(): Promise<any> {
    const monitors = await this.prisma.uptimeMonitor.findMany({
      include: {
        checks: {
          where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
          orderBy: { createdAt: 'desc' },
          take: 100,
        },
      },
    });

    const serviceStatus = monitors.map(monitor => ({
      name: monitor.name,
      status: this.calculateServiceStatus(monitor.checks),
      uptime: this.calculateUptime(monitor.checks),
      lastCheck: monitor.checks[0]?.createdAt.toISOString() || new Date().toISOString(),
      responseTime: this.calculateAverageResponseTime(monitor.checks),
    }));

    return {
      overallUptime: serviceStatus.length > 0 ? 
        serviceStatus.reduce((sum, s) => sum + s.uptime, 0) / serviceStatus.length : 100,
      serviceStatus,
      incidentHistory: [], // Would fetch from incident table
    };
  }

  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = values.sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index] || 0;
  }

  private calculateServiceStatus(checks: any[]): 'up' | 'down' | 'degraded' {
    if (checks.length === 0) return 'up';
    
    const recentChecks = checks.slice(0, 10); // Last 10 checks
    const failedChecks = recentChecks.filter(check => !check.success).length;
    
    if (failedChecks === 0) return 'up';
    if (failedChecks >= 5) return 'down';
    return 'degraded';
  }

  private calculateUptime(checks: any[]): number {
    if (checks.length === 0) return 100;
    
    const successfulChecks = checks.filter(check => check.success).length;
    return (successfulChecks / checks.length) * 100;
  }

  private calculateAverageResponseTime(checks: any[]): number {
    if (checks.length === 0) return 0;
    
    const responseTimes = checks
      .filter(check => check.responseTime)
      .map(check => check.responseTime);
    
    if (responseTimes.length === 0) return 0;
    
    return responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
  }

  private async calculateRetentionMetrics(): Promise<RetentionMetrics> {
    // This would implement cohort analysis
    return {
      day1: 85,
      day7: 65,
      day30: 45,
      cohort: 'current',
    };
  }

  // HEALTH CHECKS
  async performHealthCheck(): Promise<any> {
    try {
      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: await this.checkDatabaseHealth(),
          redis: await this.checkRedisHealth(),
          sentry: this.sentry ? 'connected' : 'disabled',
          datadog: this.datadog ? 'connected' : 'disabled',
          mixpanel: this.mixpanel ? 'connected' : 'disabled',
          elk: this.elkStack ? 'connected' : 'disabled',
          cloudwatch: this.cloudWatchLogs ? 'connected' : 'disabled',
        },
        metrics: await this.getSystemMetrics(),
      };

      // Determine overall health
      const unhealthyServices = Object.values(health.services).filter(status => status !== 'connected' && status !== 'healthy');
      if (unhealthyServices.length > 0) {
        health.status = 'degraded';
      }

      return health;
    } catch (error) {
      this.logger.error('Health check failed:', error);
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  }

  private async checkDatabaseHealth(): Promise<string> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return 'healthy';
    } catch (error) {
      return 'unhealthy';
    }
  }

  private async checkRedisHealth(): Promise<string> {
    try {
      await this.redis.ping();
      return 'healthy';
    } catch (error) {
      return 'unhealthy';
    }
  }

  private async getSystemMetrics(): Promise<any> {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
      memory: {
        rss: memUsage.rss,
        heapTotal: memUsage.heapTotal,
        heapUsed: memUsage.heapUsed,
        external: memUsage.external,
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system,
      },
      uptime: process.uptime(),
    };
  }
}
