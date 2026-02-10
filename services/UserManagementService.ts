import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/email';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'USER' | 'ADMIN' | 'PREMIUM';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  preferences: UserPreferences;
  subscription?: Subscription;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  accessibility: AccessibilityPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  marketing: boolean;
  updates: boolean;
  collaboration: boolean;
  aiGenerations: boolean;
  exports: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'friends';
  showActivity: boolean;
  allowDataCollection: boolean;
  shareTemplates: boolean;
}

export interface AccessibilityPreferences {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

export interface Subscription {
  plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PENDING';
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  features: string[];
  limits: {
    presentations: number;
    aiGenerations: number;
    exports: number;
    storage: number; // in MB
    collaborators: number;
  };
}

export interface UserCreateRequest {
  email: string;
  password: string;
  name: string;
  role?: 'USER' | 'ADMIN' | 'PREMIUM';
  preferences?: Partial<UserPreferences>;
}

export interface UserUpdateRequest {
  name?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export class UserManagementService {
  private prisma: PrismaClient;
  private redis: Redis;
  private jwtSecret: string;
  private jwtRefreshSecret: string;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
  }

  // USER AUTHENTICATION
  async createUser(request: UserCreateRequest): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: request.email }
      });

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(request.password, 12);

      // Create default preferences
      const defaultPreferences: UserPreferences = {
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          push: true,
          marketing: false,
          updates: true,
          collaboration: true,
          aiGenerations: true,
          exports: true
        },
        privacy: {
          profileVisibility: 'private',
          showActivity: false,
          allowDataCollection: true,
          shareTemplates: false
        },
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          reducedMotion: false,
          screenReader: false,
          keyboardNavigation: false
        }
      };

      // Create user
      const user = await this.prisma.user.create({
        data: {
          email: request.email,
          password: hashedPassword,
          name: request.name,
          role: request.role || 'USER',
          status: 'ACTIVE',
          preferences: { ...defaultPreferences, ...request.preferences },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Create free subscription
      await this.prisma.subscription.create({
        data: {
          userId: user.id,
          plan: 'FREE',
          status: 'ACTIVE',
          startDate: new Date(),
          autoRenew: false,
          features: this.getPlanFeatures('FREE'),
          limits: this.getPlanLimits('FREE'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Generate tokens
      const tokens = await this.generateTokens(user);

      // Send welcome email
      await this.sendWelcomeEmail(user);

      // Cache user
      await this.cacheUser(user);

      return {
        user: this.mapToUser(user),
        ...tokens
      };
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  async authenticateUser(email: string, password: string): Promise<AuthResponse> {
    try {
      // Find user
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          subscription: true
        }
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      if (user.status !== 'ACTIVE') {
        throw new Error('Account is not active');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });

      // Generate tokens
      const tokens = await this.generateTokens(user);

      // Log login event
      await this.logAuthEvent(user.id, 'LOGIN');

      return {
        user: this.mapToUser(user),
        ...tokens
      };
    } catch (error) {
      console.error('Failed to authenticate user:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret) as any;
      
      // Get user
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { subscription: true }
      });

      if (!user || user.status !== 'ACTIVE') {
        throw new Error('Invalid refresh token');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      return {
        user: this.mapToUser(user),
        ...tokens
      };
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw new Error('Invalid refresh token');
    }
  }

  async logoutUser(userId: string): Promise<void> {
    try {
      // Invalidate refresh tokens
      await this.redis.del(`refresh-token:${userId}`);
      
      // Log logout event
      await this.logAuthEvent(userId, 'LOGOUT');
    } catch (error) {
      console.error('Failed to logout user:', error);
      throw error;
    }
  }

  // USER MANAGEMENT
  async getUser(userId: string): Promise<User | null> {
    try {
      // Check cache first
      const cacheKey = `user:${userId}`;
      const cached = await this.redis.get(cacheKey);
      
      if (cached) {
        return JSON.parse(cached);
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          subscription: true
        }
      });

      if (!user) {
        return null;
      }

      const mappedUser = this.mapToUser(user);

      // Cache for 1 hour
      await this.redis.setex(cacheKey, 3600, JSON.stringify(mappedUser));

      return mappedUser;
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  }

  async updateUser(userId: string, request: UserUpdateRequest): Promise<User> {
    try {
      const updateData: any = {
        updatedAt: new Date()
      };

      if (request.name) updateData.name = request.name;
      if (request.avatar) updateData.avatar = request.avatar;
      if (request.preferences) {
        updateData.preferences = {
          ...await this.getUserPreferences(userId),
          ...request.preferences
        };
      }

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
        include: { subscription: true }
      });

      // Update cache
      await this.cacheUser(user);

      return this.mapToUser(user);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      // Soft delete by setting status to INACTIVE
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          status: 'INACTIVE',
          updatedAt: new Date()
        }
      });

      // Remove from cache
      await this.redis.del(`user:${userId}`);

      // Send deletion confirmation email
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (user) {
        await this.sendAccountDeletionEmail(user);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedNewPassword,
          updatedAt: new Date()
        }
      });

      // Invalidate all refresh tokens
      await this.redis.del(`refresh-token:${userId}`);

      // Send password change notification
      await this.sendPasswordChangeEmail(user);
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user.id, type: 'password-reset' },
        this.jwtSecret,
        { expiresIn: '1h' }
      );

      // Cache reset token
      await this.redis.setex(`reset-token:${user.id}`, 3600, resetToken);

      // Send reset email
      await this.sendPasswordResetEmail(user, resetToken);
    } catch (error) {
      console.error('Failed to reset password:', error);
      throw error;
    }
  }

  async confirmPasswordReset(token: string, newPassword: string): Promise<void> {
    try {
      // Verify reset token
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      
      if (decoded.type !== 'password-reset') {
        throw new Error('Invalid reset token');
      }

      // Check if token is still valid
      const cachedToken = await this.redis.get(`reset-token:${decoded.userId}`);
      
      if (!cachedToken || cachedToken !== token) {
        throw new Error('Reset token has expired');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await this.prisma.user.update({
        where: { id: decoded.userId },
        data: {
          password: hashedPassword,
          updatedAt: new Date()
        }
      });

      // Remove reset token
      await this.redis.del(`reset-token:${decoded.userId}`);

      // Send confirmation email
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (user) {
        await this.sendPasswordResetConfirmationEmail(user);
      }
    } catch (error) {
      console.error('Failed to confirm password reset:', error);
      throw error;
    }
  }

  // USER PREFERENCES
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { preferences: true }
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user.preferences as UserPreferences;
    } catch (error) {
      console.error('Failed to get user preferences:', error);
      throw error;
    }
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const currentPreferences = await this.getUserPreferences(userId);
      const updatedPreferences = { ...currentPreferences, ...preferences };

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          preferences: updatedPreferences,
          updatedAt: new Date()
        }
      });

      // Update cache
      await this.redis.del(`user:${userId}`);

      return updatedPreferences;
    } catch (error) {
      console.error('Failed to update user preferences:', error);
      throw error;
    }
  }

  // SUBSCRIPTION MANAGEMENT
  async getUserSubscription(userId: string): Promise<Subscription | null> {
    try {
      const subscription = await this.prisma.subscription.findUnique({
        where: { userId }
      });

      if (!subscription) {
        return null;
      }

      return this.mapToSubscription(subscription);
    } catch (error) {
      console.error('Failed to get user subscription:', error);
      throw error;
    }
  }

  async upgradeSubscription(userId: string, plan: 'BASIC' | 'PRO' | 'ENTERPRISE'): Promise<Subscription> {
    try {
      const currentSubscription = await this.getUserSubscription(userId);
      
      if (!currentSubscription) {
        throw new Error('No active subscription found');
      }

      // Update subscription
      const updatedSubscription = await this.prisma.subscription.update({
        where: { userId },
        data: {
          plan,
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: plan !== 'FREE' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null,
          autoRenew: plan !== 'FREE',
          features: this.getPlanFeatures(plan),
          limits: this.getPlanLimits(plan),
          updatedAt: new Date()
        }
      });

      // Send upgrade confirmation
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (user) {
        await this.sendSubscriptionUpgradeEmail(user, plan);
      }

      return this.mapToSubscription(updatedSubscription);
    } catch (error) {
      console.error('Failed to upgrade subscription:', error);
      throw error;
    }
  }

  async cancelSubscription(userId: string): Promise<void> {
    try {
      await this.prisma.subscription.update({
        where: { userId },
        data: {
          status: 'CANCELLED',
          autoRenew: false,
          updatedAt: new Date()
        }
      });

      // Send cancellation confirmation
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (user) {
        await this.sendSubscriptionCancellationEmail(user);
      }
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }

  // USER SEARCH AND ADMINISTRATION
  async searchUsers(query: string, filters?: {
    role?: string;
    status?: string;
    plan?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ users: User[]; total: number }> {
    try {
      const whereClause: any = {};

      if (query) {
        whereClause.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ];
      }

      if (filters?.role) {
        whereClause.role = filters.role;
      }

      if (filters?.status) {
        whereClause.status = filters.status;
      }

      if (filters?.plan) {
        whereClause.subscription = { plan: filters.plan };
      }

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where: whereClause,
          include: { subscription: true },
          orderBy: { createdAt: 'desc' },
          take: filters?.limit || 20,
          skip: filters?.offset || 0
        }),
        this.prisma.user.count({ where: whereClause })
      ]);

      return {
        users: users.map(u => this.mapToUser(u)),
        total
      };
    } catch (error) {
      console.error('Failed to search users:', error);
      throw error;
    }
  }

  async getUserStats(userId: string): Promise<any> {
    try {
      const [
        presentationsCount,
        aiGenerationsCount,
        exportsCount,
        collaborationsCount,
        templatesCount
      ] = await Promise.all([
        this.prisma.presentation.count({ where: { userId } }),
        this.prisma.aIGeneration.count({ where: { userId } }),
        this.prisma.export.count({ where: { userId } }),
        this.prisma.collaboration.count({ where: { userId } }),
        this.prisma.template.count({ where: { createdBy: userId } })
      ]);

      const subscription = await this.getUserSubscription(userId);

      return {
        presentations: presentationsCount,
        aiGenerations: aiGenerationsCount,
        exports: exportsCount,
        collaborations: collaborationsCount,
        templates: templatesCount,
        subscription,
        limits: subscription?.limits || this.getPlanLimits('FREE'),
        usage: {
          presentationsUsed: presentationsCount,
          aiGenerationsUsed: aiGenerationsCount,
          exportsUsed: exportsCount,
          collaboratorsUsed: collaborationsCount
        }
      };
    } catch (error) {
      console.error('Failed to get user stats:', error);
      throw error;
    }
  }

  // HELPER METHODS
  private async generateTokens(user: any): Promise<{ token: string; refreshToken: string; expiresIn: number }> {
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      this.jwtSecret,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      this.jwtRefreshSecret,
      { expiresIn: '7d' }
    );

    // Store refresh token in Redis
    await this.redis.setex(`refresh-token:${user.id}`, 7 * 24 * 60 * 60, refreshToken);

    return {
      token,
      refreshToken,
      expiresIn: 3600 // 1 hour
    };
  }

  private async cacheUser(user: any): Promise<void> {
    const cacheKey = `user:${user.id}`;
    await this.redis.setex(cacheKey, 3600, JSON.stringify(this.mapToUser(user)));
  }

  private async logAuthEvent(userId: string, event: string): Promise<void> {
    try {
      await this.prisma.analytics.create({
        data: {
          userId,
          event: `AUTH_${event}`,
          properties: { timestamp: new Date().toISOString() },
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to log auth event:', error);
    }
  }

  private getPlanFeatures(plan: string): string[] {
    const features = {
      FREE: ['basic_presentations', 'limited_ai', 'community_support'],
      BASIC: ['advanced_presentations', 'ai_generations', 'email_support', 'templates'],
      PRO: ['unlimited_presentations', 'premium_ai', 'priority_support', 'advanced_templates', 'analytics'],
      ENTERPRISE: ['all_features', 'custom_ai', 'dedicated_support', 'white_label', 'api_access']
    };

    return features[plan as keyof typeof features] || features.FREE;
  }

  private getPlanLimits(plan: string): any {
    const limits = {
      FREE: {
        presentations: 5,
        aiGenerations: 10,
        exports: 3,
        storage: 100,
        collaborators: 2
      },
      BASIC: {
        presentations: 25,
        aiGenerations: 100,
        exports: 25,
        storage: 1000,
        collaborators: 5
      },
      PRO: {
        presentations: -1, // unlimited
        aiGenerations: 500,
        exports: -1,
        storage: 10000,
        collaborators: 20
      },
      ENTERPRISE: {
        presentations: -1,
        aiGenerations: -1,
        exports: -1,
        storage: -1,
        collaborators: -1
      }
    };

    return limits[plan as keyof typeof limits] || limits.FREE;
  }

  private mapToUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
      preferences: user.preferences,
      subscription: user.subscription ? this.mapToSubscription(user.subscription) : undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      lastLoginAt: user.lastLoginAt?.toISOString()
    };
  }

  private mapToSubscription(subscription: any): Subscription {
    return {
      plan: subscription.plan,
      status: subscription.status,
      startDate: subscription.startDate.toISOString(),
      endDate: subscription.endDate?.toISOString(),
      autoRenew: subscription.autoRenew,
      features: subscription.features,
      limits: subscription.limits
    };
  }

  // EMAIL METHODS (placeholders - would integrate with actual email service)
  private async sendWelcomeEmail(user: any): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to NovagenAI!',
        template: 'welcome',
        data: { name: user.name }
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }

  private async sendPasswordChangeEmail(user: any): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Changed',
        template: 'password-change',
        data: { name: user.name }
      });
    } catch (error) {
      console.error('Failed to send password change email:', error);
    }
  }

  private async sendPasswordResetEmail(user: any, token: string): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        template: 'password-reset',
        data: { 
          name: user.name,
          resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${token}`
        }
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
    }
  }

  private async sendPasswordResetConfirmationEmail(user: any): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Successful',
        template: 'password-reset-confirmation',
        data: { name: user.name }
      });
    } catch (error) {
      console.error('Failed to send password reset confirmation email:', error);
    }
  }

  private async sendAccountDeletionEmail(user: any): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Account Deleted',
        template: 'account-deletion',
        data: { name: user.name }
      });
    } catch (error) {
      console.error('Failed to send account deletion email:', error);
    }
  }

  private async sendSubscriptionUpgradeEmail(user: any, plan: string): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: `Subscription Upgraded to ${plan}`,
        template: 'subscription-upgrade',
        data: { name: user.name, plan }
      });
    } catch (error) {
      console.error('Failed to send subscription upgrade email:', error);
    }
  }

  private async sendSubscriptionCancellationEmail(user: any): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Subscription Cancelled',
        template: 'subscription-cancellation',
        data: { name: user.name }
      });
    } catch (error) {
      console.error('Failed to send subscription cancellation email:', error);
    }
  }

  // BATCH OPERATIONS
  async batchUpdateUsers(updates: Array<{ id: string; data: Partial<UserUpdateRequest> }>): Promise<User[]> {
    const results = await Promise.all(
      updates.map(update => this.updateUser(update.id, update.data))
    );

    return results;
  }

  async exportUsers(format: 'csv' | 'json'): Promise<string> {
    const users = await this.prisma.user.findMany({
      include: { subscription: true }
    });

    switch (format) {
      case 'csv':
        return this.convertUsersToCSV(users);
      case 'json':
        return JSON.stringify(users.map(u => this.mapToUser(u)), null, 2);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  private convertUsersToCSV(users: any[]): string {
    if (users.length === 0) return '';
    
    const headers = ['id', 'email', 'name', 'role', 'status', 'createdAt', 'lastLoginAt'];
    const csvRows = [headers.join(',')];
    
    for (const user of users) {
      const values = headers.map(header => {
        const value = user[header];
        if (value instanceof Date) {
          return value.toISOString();
        }
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }
}
