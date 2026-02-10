import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import crypto from 'crypto';
import { authenticator } from 'otplib';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

export interface AuthRequest {
  type: 'login' | 'register' | 'refresh' | 'logout' | 'verify-2fa' | 'enable-2fa';
  credentials?: {
    email?: string;
    password?: string;
    token?: string;
    refreshToken?: string;
  };
  oauth?: {
    provider: 'google' | 'microsoft' | 'github';
    code?: string;
    state?: string;
  };
  twoFactor?: {
    secret?: string;
    token?: string;
    backupCode?: string;
  };
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    device?: string;
    userId?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    subscription: string;
    twoFactorEnabled: boolean;
    lastLogin: string;
  };
  tokens?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
  twoFactor?: {
    secret: string;
    qrCode: string;
    backupCodes: string[];
  };
  challenges?: string[];
  metadata: {
    timestamp: string;
    sessionId: string;
    requiresTwoFactor: boolean;
    newDevice: boolean;
  };
}

export interface APIKeyRequest {
  userId: string;
  name: string;
  permissions: string[];
  restrictions?: {
    domains?: string[];
    rateLimit?: number;
    expiresAt?: string;
  };
}

export interface APIKeyResponse {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  restrictions: any;
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
  isActive: boolean;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: any) => string;
  handler?: (req: any, res: any) => void;
}

export interface DataProtectionRequest {
  userId: string;
  type: 'encrypt' | 'decrypt' | 'anonymize' | 'delete' | 'export';
  data?: any;
  fields?: string[];
  gdprRequest?: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction';
  encryptedData?: string;
}

export interface DataProtectionResponse {
  success: boolean;
  data?: any;
  encryptedData?: string;
  anonymizedData?: any;
  exportData?: any;
  metadata: {
    timestamp: string;
    requestId: string;
    complianceFlags: string[];
    retentionPeriod?: string;
  };
}

export class SecurityService {
  private prisma: PrismaClient;
  private redis: Redis;
  private jwtSecret: string;
  private jwtRefreshSecret: string;
  private encryptionKey: string;
  private oauthClients: Map<string, OAuth2Client>;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    this.jwtSecret = process.env.JWT_SECRET || 'default-secret';
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret';
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'default-encryption-key';

    // Initialize OAuth clients
    this.oauthClients = new Map();
    this.initializeOAuthClients();
  }

  // AUTHENTICATION METHODS
  async authenticate(request: AuthRequest): Promise<AuthResponse> {
    try {
      const sessionId = crypto.randomUUID();
      const timestamp = new Date().toISOString();

      switch (request.type) {
        case 'login':
          return await this.handleLogin(request, sessionId, timestamp);
        case 'register':
          return await this.handleRegistration(request, sessionId, timestamp);
        case 'refresh':
          return await this.handleTokenRefresh(request, sessionId, timestamp);
        case 'logout':
          return await this.handleLogout(request, sessionId, timestamp);
        case 'verify-2fa':
          return await this.verifyTwoFactor(request, sessionId, timestamp);
        case 'enable-2fa':
          return await this.enableTwoFactor(request, sessionId, timestamp);
        default:
          throw new Error(`Unsupported auth type: ${request.type}`);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  private async handleLogin(request: AuthRequest, sessionId: string, timestamp: string): Promise<AuthResponse> {
    const { email, password } = request.credentials || {};
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        twoFactorAuth: true,
        sessions: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Check if 2FA is enabled
    const requiresTwoFactor = user.twoFactorAuth?.enabled || false;
    
    // Check for new device
    const newDevice = await this.detectNewDevice(user.id, request.metadata);

    if (requiresTwoFactor) {
      // Store pending login session
      await this.redis.setex(`pending-login:${sessionId}`, 300, JSON.stringify({
        userId: user.id,
        email: user.email,
        timestamp,
        metadata: request.metadata
      }));

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscription: user.subscription,
          twoFactorEnabled: requiresTwoFactor,
          lastLogin: user.lastLogin?.toISOString() || timestamp
        },
        metadata: {
          timestamp,
          sessionId,
          requiresTwoFactor: true,
          newDevice
        }
      };
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Create session
    await this.createSession(user.id, sessionId, request.metadata, tokens);

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        twoFactorEnabled: false,
        lastLogin: new Date().toISOString()
      },
      tokens,
      metadata: {
        timestamp,
        sessionId,
        requiresTwoFactor: false,
        newDevice
      }
    };
  }

  private async handleRegistration(request: AuthRequest, sessionId: string, timestamp: string): Promise<AuthResponse> {
    const { email, password } = request.credentials || {};
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: request.metadata?.device || 'User',
        role: 'USER',
        subscription: 'FREE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Create session
    await this.createSession(user.id, sessionId, request.metadata, tokens);

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        twoFactorEnabled: false,
        lastLogin: timestamp
      },
      tokens,
      metadata: {
        timestamp,
        sessionId,
        requiresTwoFactor: false,
        newDevice: true
      }
    };
  }

  private async handleTokenRefresh(request: AuthRequest, sessionId: string, timestamp: string): Promise<AuthResponse> {
    const { refreshToken } = request.credentials || {};
    
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret) as any;
    
    // Check if session exists
    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true }
    });

    if (!session || !session.isActive) {
      throw new Error('Invalid session');
    }

    // Generate new tokens
    const tokens = await this.generateTokens(session.user);

    // Update session
    await this.prisma.session.update({
      where: { id: session.id },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + tokens.expiresIn * 1000),
        updatedAt: new Date()
      }
    });

    return {
      success: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        subscription: session.user.subscription,
        twoFactorEnabled: !!session.user.twoFactorAuth?.enabled,
        lastLogin: session.user.lastLogin?.toISOString() || timestamp
      },
      tokens,
      metadata: {
        timestamp,
        sessionId: session.id,
        requiresTwoFactor: false,
        newDevice: false
      }
    };
  }

  private async handleLogout(request: AuthRequest, sessionId: string, timestamp: string): Promise<AuthResponse> {
    const { refreshToken } = request.credentials || {};
    
    if (refreshToken) {
      // Deactivate specific session
      await this.prisma.session.updateMany({
        where: { refreshToken },
        data: { isActive: false, updatedAt: new Date() }
      });
    } else {
      // Deactivate all user sessions
      const decoded = jwt.decode(refreshToken || '') as any;
      if (decoded?.userId) {
        await this.prisma.session.updateMany({
          where: { userId: decoded.userId, isActive: true },
          data: { isActive: false, updatedAt: new Date() }
        });
      }
    }

    // Clear cache
    await this.redis.del(`session:${sessionId}`);

    return {
      success: true,
      metadata: {
        timestamp,
        sessionId,
        requiresTwoFactor: false,
        newDevice: false
      }
    };
  }

  // OAUTH2 METHODS
  async initiateOAuth(provider: 'google' | 'microsoft' | 'github', redirectUri: string): Promise<string> {
    const client = this.oauthClients.get(provider);
    if (!client) {
      throw new Error(`OAuth client not configured for ${provider}`);
    }

    const state = crypto.randomUUID();
    
    // Store state in Redis for verification
    await this.redis.setex(`oauth-state:${state}`, 600, JSON.stringify({
      provider,
      redirectUri,
      timestamp: new Date().toISOString()
    }));

    const authUrl = this.generateOAuthUrl(provider, client, state, redirectUri);
    return authUrl;
  }

  async handleOAuthCallback(provider: 'google' | 'microsoft' | 'github', code: string, state: string): Promise<AuthResponse> {
    // Verify state
    const stateData = await this.redis.get(`oauth-state:${state}`);
    if (!stateData) {
      throw new Error('Invalid or expired state');
    }

    const { redirectUri } = JSON.parse(stateData);
    await this.redis.del(`oauth-state:${state}`);

    // Exchange code for tokens
    const client = this.oauthClients.get(provider);
    if (!client) {
      throw new Error(`OAuth client not configured for ${provider}`);
    }

    const tokens = await this.exchangeCodeForTokens(provider, client, code, redirectUri);
    const userInfo = await this.getUserInfoFromToken(provider, tokens.access_token);

    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { email: userInfo.email }
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          password: '', // OAuth users don't have passwords
          role: 'USER',
          subscription: 'FREE',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    // Create OAuth account link
    await this.prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId: userInfo.id
        }
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: tokens.expires_at ? new Date(tokens.expires_at * 1000) : null,
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        provider,
        providerAccountId: userInfo.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: tokens.expires_at ? new Date(tokens.expires_at * 1000) : null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Generate application tokens
    const appTokens = await this.generateTokens(user);
    const sessionId = crypto.randomUUID();

    // Create session
    await this.createSession(user.id, sessionId, {}, appTokens);

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        twoFactorEnabled: !!user.twoFactorAuth?.enabled,
        lastLogin: new Date().toISOString()
      },
      tokens: appTokens,
      metadata: {
        timestamp: new Date().toISOString(),
        sessionId,
        requiresTwoFactor: false,
        newDevice: false
      }
    };
  }

  // TWO-FACTOR AUTHENTICATION
  async enableTwoFactor(request: AuthRequest, sessionId: string, timestamp: string): Promise<AuthResponse> {
    const userId = request.metadata?.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Generate secret
    const secret = authenticator.generateSecret({
      name: `NovagenAI (${userId})`,
      issuer: 'NovagenAI'
    });

    // Generate QR code
    const qrCodeUrl = authenticator.keyuri(userId, 'NovagenAI', secret);
    const qrCode = await qrcode.toDataURL(qrCodeUrl);

    // Generate backup codes
    const backupCodes = Array.from({ length: 10 }, () => 
      crypto.randomBytes(4).toString('hex').toUpperCase()
    );

    // Store 2FA setup (not enabled yet)
    await this.prisma.twoFactorAuth.upsert({
      where: { userId },
      update: {
        secret,
        backupCodes,
        enabled: false, // Not enabled until verified
        updatedAt: new Date()
      },
      create: {
        userId,
        secret,
        backupCodes,
        enabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return {
      success: true,
      twoFactor: {
        secret,
        qrCode,
        backupCodes
      },
      metadata: {
        timestamp,
        sessionId,
        requiresTwoFactor: true,
        newDevice: false
      }
    };
  }

  async verifyTwoFactor(request: AuthRequest, sessionId: string, timestamp: string): Promise<AuthResponse> {
    const { token, backupCode } = request.twoFactor || {};
    
    if (!token && !backupCode) {
      throw new Error('2FA token or backup code is required');
    }

    // Get pending login session
    const pendingLogin = await this.redis.get(`pending-login:${sessionId}`);
    if (!pendingLogin) {
      throw new Error('No pending login session');
    }

    const { userId, email } = JSON.parse(pendingLogin);
    
    // Get user's 2FA settings
    const twoFactorAuth = await this.prisma.twoFactorAuth.findUnique({
      where: { userId }
    });

    if (!twoFactorAuth) {
      throw new Error('2FA not configured for this user');
    }

    let isValid = false;

    if (token) {
      // Verify TOTP token
      isValid = authenticator.verify({
        token,
        secret: twoFactorAuth.secret
      });
    } else if (backupCode) {
      // Verify backup code
      isValid = twoFactorAuth.backupCodes.includes(backupCode);
      if (isValid) {
        // Remove used backup code
        await this.prisma.twoFactorAuth.update({
          where: { userId },
          data: {
            backupCodes: twoFactorAuth.backupCodes.filter(code => code !== backupCode),
            updatedAt: new Date()
          }
        });
      }
    }

    if (!isValid) {
      throw new Error('Invalid 2FA token');
    }

    // Get user
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Create session
    await this.createSession(user.id, sessionId, request.metadata, tokens);

    // Clear pending login
    await this.redis.del(`pending-login:${sessionId}`);

    // Enable 2FA if this was setup verification
    if (!twoFactorAuth.enabled) {
      await this.prisma.twoFactorAuth.update({
        where: { userId },
        data: { enabled: true, updatedAt: new Date() }
      });
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        twoFactorEnabled: true,
        lastLogin: new Date().toISOString()
      },
      tokens,
      metadata: {
        timestamp,
        sessionId,
        requiresTwoFactor: false,
        newDevice: false
      }
    };
  }

  // API KEY MANAGEMENT
  async createAPIKey(request: APIKeyRequest): Promise<APIKeyResponse> {
    try {
      const key = `nk_${crypto.randomBytes(32).toString('hex')}`;
      const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

      const apiKey = await this.prisma.apiKey.create({
        data: {
          userId: request.userId,
          name: request.name,
          key: hashedKey,
          permissions: request.permissions,
          restrictions: request.restrictions || {},
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      return {
        id: apiKey.id,
        name: apiKey.name,
        key, // Return raw key only once
        permissions: apiKey.permissions,
        restrictions: apiKey.restrictions,
        createdAt: apiKey.createdAt.toISOString(),
        usageCount: 0,
        isActive: apiKey.isActive
      };
    } catch (error) {
      console.error('Create API key error:', error);
      throw error;
    }
  }

  async validateAPIKey(key: string): Promise<any> {
    try {
      const hashedKey = crypto.createHash('sha256').update(key).digest('hex');
      
      const apiKey = await this.prisma.apiKey.findFirst({
        where: {
          key: hashedKey,
          isActive: true,
          OR: [
            { restrictions: { expiresAt: { gt: new Date() } } },
            { restrictions: { expiresAt: null } }
          ]
        },
        include: {
          user: {
            select: { id: true, email: true, role: true, subscription: true }
          }
        }
      });

      if (!apiKey) {
        throw new Error('Invalid API key');
      }

      // Update usage
      await this.prisma.apiKey.update({
        where: { id: apiKey.id },
        data: {
          lastUsed: new Date(),
          usageCount: { increment: 1 },
          updatedAt: new Date()
        }
      });

      return {
        apiKey: apiKey.id,
        user: apiKey.user,
        permissions: apiKey.permissions,
        restrictions: apiKey.restrictions
      };
    } catch (error) {
      console.error('Validate API key error:', error);
      throw error;
    }
  }

  async revokeAPIKey(keyId: string, userId: string): Promise<void> {
    try {
      await this.prisma.apiKey.updateMany({
        where: { id: keyId, userId },
        data: { isActive: false, updatedAt: new Date() }
      });
    } catch (error) {
      console.error('Revoke API key error:', error);
      throw error;
    }
  }

  // RATE LIMITING
  async checkRateLimit(identifier: string, config: RateLimitConfig): Promise<boolean> {
    try {
      const key = config.keyGenerator ? config.keyGenerator({ identifier }) : identifier;
      const current = await this.redis.incr(`rate-limit:${key}`);
      
      if (current === 1) {
        await this.redis.expire(`rate-limit:${key}`, Math.ceil(config.windowMs / 1000));
      }

      return current <= config.maxRequests;
    } catch (error) {
      console.error('Rate limit check error:', error);
      return true; // Allow on error
    }
  }

  // DATA PROTECTION
  async protectData(request: DataProtectionRequest): Promise<DataProtectionResponse> {
    try {
      const requestId = crypto.randomUUID();
      const timestamp = new Date().toISOString();
      const complianceFlags: string[] = [];

      switch (request.type) {
        case 'encrypt':
          return await this.encryptData(request, requestId, timestamp, complianceFlags);
        case 'decrypt':
          return await this.decryptData(request, requestId, timestamp, complianceFlags);
        case 'anonymize':
          return await this.anonymizeData(request, requestId, timestamp, complianceFlags);
        case 'delete':
          return await this.deleteData(request, requestId, timestamp, complianceFlags);
        case 'export':
          return await this.exportData(request, requestId, timestamp, complianceFlags);
        default:
          throw new Error(`Unsupported data protection type: ${request.type}`);
      }
    } catch (error) {
      console.error('Data protection error:', error);
      throw error;
    }
  }

  private async encryptData(request: DataProtectionRequest, requestId: string, timestamp: string, complianceFlags: string[]): Promise<DataProtectionResponse> {
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(this.encryptionKey, 'hex'), iv);
    
    let encrypted = cipher.update(JSON.stringify(request.data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    const encryptedData = JSON.stringify({
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      data: encrypted
    });

    complianceFlags.push('ENCRYPTED', 'GDPR_COMPLIANT');

    return {
      success: true,
      encryptedData,
      metadata: {
        timestamp,
        requestId,
        complianceFlags,
        retentionPeriod: '7_years'
      }
    };
  }

  private async decryptData(request: DataProtectionRequest, requestId: string, timestamp: string, complianceFlags: string[]): Promise<DataProtectionResponse> {
    const encrypted = JSON.parse(request.encryptedData || '{}');
    const algorithm = 'aes-256-gcm';
    
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(this.encryptionKey, 'hex'), Buffer.from(encrypted.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    const data = JSON.parse(decrypted);

    complianceFlags.push('DECRYPTED', 'GDPR_COMPLIANT');

    return {
      success: true,
      data,
      metadata: {
        timestamp,
        requestId,
        complianceFlags
      }
    };
  }

  private async anonymizeData(request: DataProtectionRequest, requestId: string, timestamp: string, complianceFlags: string[]): Promise<DataProtectionResponse> {
    const anonymized = { ...request.data };
    
    // Anonymize specified fields
    if (request.fields) {
      for (const field of request.fields) {
        if (anonymized[field]) {
          if (field.includes('email')) {
            anonymized[field] = 'user***@example.com';
          } else if (field.includes('name')) {
            anonymized[field] = 'User_' + Math.random().toString(36).substr(2, 9);
          } else if (field.includes('phone')) {
            anonymized[field] = '+1***-***-' + Math.random().toString(36).substr(2, 4);
          } else {
            anonymized[field] = '***ANONYMIZED***';
          }
        }
      }
    }

    complianceFlags.push('ANONYMIZED', 'GDPR_COMPLIANT', 'CCPA_COMPLIANT');

    return {
      success: true,
      anonymizedData: anonymized,
      metadata: {
        timestamp,
        requestId,
        complianceFlags,
        retentionPeriod: '2_years'
      }
    };
  }

  private async deleteData(request: DataProtectionRequest, requestId: string, timestamp: string, complianceFlags: string[]): Promise<DataProtectionResponse> {
    // Implement data deletion with proper GDPR compliance
    await this.prisma.user.delete({
      where: { id: request.userId }
    });

    // Delete related data
    await this.prisma.session.deleteMany({
      where: { userId: request.userId }
    });

    await this.prisma.apiKey.deleteMany({
      where: { userId: request.userId }
    });

    complianceFlags.push('DELETED', 'GDPR_COMPLIANT', 'RIGHT_TO_ERASURE');

    return {
      success: true,
      metadata: {
        timestamp,
        requestId,
        complianceFlags,
        retentionPeriod: '0_days'
      }
    };
  }

  private async exportData(request: DataProtectionRequest, requestId: string, timestamp: string, complianceFlags: string[]): Promise<DataProtectionResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: request.userId },
      include: {
        sessions: true,
        apiKeys: true,
        presentations: true,
        analytics: true
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const exportData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin
      },
      sessions: user.sessions.map(session => ({
        id: session.id,
        createdAt: session.createdAt,
        lastUsed: session.lastUsed,
        isActive: session.isActive
      })),
      apiKeys: user.apiKeys.map(key => ({
        id: key.id,
        name: key.name,
        permissions: key.permissions,
        createdAt: key.createdAt,
        lastUsed: key.lastUsed,
        usageCount: key.usageCount
      })),
      presentations: user.presentations,
      analytics: user.analytics
    };

    complianceFlags.push('EXPORTED', 'GDPR_COMPLIANT', 'DATA_PORTABILITY');

    return {
      success: true,
      exportData,
      metadata: {
        timestamp,
        requestId,
        complianceFlags,
        retentionPeriod: '30_days'
      }
    };
  }

  // CORS CONFIGURATION
  getCorsConfig(): any {
    return {
      origin: (origin: string, callback: Function) => {
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
          'http://localhost:3000',
          'https://novagenai.com',
          'https://app.novagenai.com'
        ];

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'X-API-Key'
      ],
      exposedHeaders: ['X-Total-Count', 'X-Rate-Limit-Remaining']
    };
  }

  // REQUEST VALIDATION
  validateRequest(req: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate required headers
    if (!req.headers.authorization && !req.headers['x-api-key']) {
      errors.push('Authorization or API key is required');
    }

    // Validate content type for POST/PUT requests
    if (['POST', 'PUT'].includes(req.method) && !req.headers['content-type']) {
      errors.push('Content-Type header is required');
    }

    // Validate request body size
    const contentLength = parseInt(req.headers['content-length'] || '0');
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (contentLength > maxSize) {
      errors.push('Request body too large');
    }

    // Validate API key format if present
    const apiKey = req.headers['x-api-key'];
    if (apiKey && !apiKey.startsWith('nk_')) {
      errors.push('Invalid API key format');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // HELPER METHODS
  private async generateTokens(user: any): Promise<any> {
    const accessToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        subscription: user.subscription
      },
      this.jwtSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      this.jwtRefreshSecret,
      { expiresIn: '7d' }
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes
      tokenType: 'Bearer'
    };
  }

  private async createSession(userId: string, sessionId: string, metadata: any, tokens: any): Promise<void> {
    await this.prisma.session.create({
      data: {
        id: sessionId,
        userId,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        isActive: true,
        userAgent: metadata?.userAgent,
        ipAddress: metadata?.ipAddress,
        device: metadata?.device,
        expiresAt: new Date(Date.now() + tokens.expiresIn * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Cache session
    await this.redis.setex(`session:${sessionId}`, tokens.expiresIn, JSON.stringify({
      userId,
      sessionId,
      metadata,
      tokens
    }));
  }

  private async detectNewDevice(userId: string, metadata?: any): Promise<boolean> {
    if (!metadata) return false;

    const recentSessions = await this.prisma.session.findMany({
      where: {
        userId,
        isActive: true,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      },
      select: { userAgent: true, ipAddress: true, device: true }
    });

    const hasMatchingDevice = recentSessions.some(session => 
      session.userAgent === metadata.userAgent &&
      session.ipAddress === metadata.ipAddress &&
      session.device === metadata.device
    );

    return !hasMatchingDevice;
  }

  private initializeOAuthClients(): void {
    // Google OAuth
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      this.oauthClients.set('google', new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'https://oauth2.googleapis.com/token'
      ));
    }

    // Microsoft OAuth
    if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
      this.oauthClients.set('microsoft', new OAuth2Client(
        process.env.MICROSOFT_CLIENT_ID,
        process.env.MICROSOFT_CLIENT_SECRET,
        'https://login.microsoftonline.com/common/oauth2/v2.0/token'
      ));
    }

    // GitHub OAuth
    if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
      this.oauthClients.set('github', new OAuth2Client(
        process.env.GITHUB_CLIENT_ID,
        process.env.GITHUB_CLIENT_SECRET,
        'https://github.com/login/oauth/access_token'
      ));
    }
  }

  private generateOAuthUrl(provider: string, client: OAuth2Client, state: string, redirectUri: string): string {
    const urls = {
      google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=${state}`,
      microsoft: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.MICROSOFT_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=${state}`,
      github: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email&state=${state}`
    };

    return urls[provider as keyof typeof urls];
  }

  private async exchangeCodeForTokens(provider: string, client: OAuth2Client, code: string, redirectUri: string): Promise<any> {
    // This would implement the actual token exchange logic
    // For now, return placeholder
    return {
      access_token: 'placeholder_token',
      refresh_token: 'placeholder_refresh',
      expires_in: 3600
    };
  }

  private async getUserInfoFromToken(provider: string, accessToken: string): Promise<any> {
    const urls = {
      google: 'https://www.googleapis.com/oauth2/v2/userinfo',
      microsoft: 'https://graph.microsoft.com/v1.0/me',
      github: 'https://api.github.com/user'
    };

    const response = await axios.get(urls[provider as keyof typeof urls], {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return {
      id: response.data.id || response.data.sub,
      email: response.data.email,
      name: response.data.name || response.data.displayName
    };
  }

  // SECURITY MONITORING
  async getSecurityMetrics(userId?: string): Promise<any> {
    try {
      const whereClause = userId ? { userId } : {};

      const [
        totalSessions,
        activeSessions,
        apiKeys,
        failedLogins,
        twoFactorEnabled
      ] = await Promise.all([
        this.prisma.session.count({ where: whereClause }),
        this.prisma.session.count({ where: { ...whereClause, isActive: true } }),
        this.prisma.apiKey.count({ where: whereClause }),
        this.prisma.analytics.count({
          where: {
            event: 'LOGIN_FAILED',
            ...(userId && { userId })
          }
        }),
        this.prisma.twoFactorAuth.count({
          where: {
            enabled: true,
            ...(userId && { userId })
          }
        })
      ]);

      return {
        totalSessions,
        activeSessions,
        apiKeys,
        failedLogins,
        twoFactorEnabled,
        securityScore: this.calculateSecurityScore(activeSessions, apiKeys, twoFactorEnabled, failedLogins)
      };
    } catch (error) {
      console.error('Get security metrics error:', error);
      return {};
    }
  }

  private calculateSecurityScore(activeSessions: number, apiKeys: number, twoFactorEnabled: number, failedLogins: number): number {
    let score = 100;

    // Deduct points for security risks
    if (activeSessions > 5) score -= 10;
    if (apiKeys > 3) score -= 5;
    if (twoFactorEnabled === 0) score -= 20;
    if (failedLogins > 10) score -= 15;

    return Math.max(0, score);
  }
}
