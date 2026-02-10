import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { Liveblocks } from '@liveblocks/node';
import { Clerk } from '@clerk/clerk-sdk-node';
import sendgrid from '@sendgrid/mail';

export interface CollaborationRequest {
  presentationId: string;
  userId: string;
  action: 'join' | 'leave' | 'edit' | 'comment' | 'share' | 'lock' | 'unlock';
  data?: any;
  permissions?: {
    canEdit: boolean;
    canComment: boolean;
    canShare: boolean;
    canDelete: boolean;
  };
}

export interface CollaborationResponse {
  success: boolean;
  sessionId: string;
  participants: Array<{
    userId: string;
    name: string;
    avatar: string;
    role: string;
    cursor?: { x: number; y: number };
    selection?: any;
    status: 'online' | 'away' | 'offline';
    lastSeen: string;
  }>;
  permissions: any;
  metadata: {
    timestamp: string;
    version: number;
    conflicts: any[];
  };
}

export interface RealtimeUpdate {
  type: 'element' | 'slide' | 'comment' | 'cursor' | 'selection' | 'presence';
  userId: string;
  data: any;
  timestamp: string;
  version: number;
}

export interface NotificationRequest {
  userId: string;
  type: 'mention' | 'comment' | 'share' | 'edit' | 'lock' | 'unlock';
  title: string;
  message: string;
  data?: any;
  channels: ('email' | 'push' | 'in-app')[];
}

export interface AuthRequest {
  userId?: string;
  email?: string;
  action: 'login' | 'register' | 'logout' | 'verify' | 'reset-password';
  data?: any;
}

export interface AuthResponse {
  success: boolean;
  user?: any;
  token?: string;
  session?: any;
  metadata: {
    timestamp: string;
    expiresAt?: string;
  };
}

export class CollaborationServicesService {
  private prisma: PrismaClient;
  private redis: Redis;
  private liveblocks: Liveblocks;
  private clerk: Clerk;
  private sendgrid: any;

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    // Initialize Liveblocks
    this.liveblocks = new Liveblocks({
      secret: process.env.LIVEBLOCKS_SECRET_KEY || '',
    });

    // Initialize Clerk
    this.clerk = new Clerk({
      secretKey: process.env.CLERK_SECRET_KEY || '',
    });

    // Initialize SendGrid
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');
    this.sendgrid = sendgrid;
  }

  // LIVEBLOCKS COLLABORATION
  async joinCollaboration(request: CollaborationRequest): Promise<CollaborationResponse> {
    try {
      // Verify user authentication
      const user = await this.verifyUser(request.userId);
      
      // Get presentation and permissions
      const presentation = await this.getPresentation(request.presentationId);
      const permissions = await this.getUserPermissions(request.userId, request.presentationId);
      
      if (!permissions.canEdit) {
        throw new Error('Insufficient permissions to join collaboration');
      }

      // Create Liveblocks room
      const roomId = `presentation-${request.presentationId}`;
      const room = await this.liveblocks.createRoom(roomId, {
        defaultAccesses: permissions.canEdit ? ['room:write'] : ['room:read'],
        usersAccesses: {
          [request.userId]: permissions.canEdit ? ['room:write'] : ['room:read'],
        },
        metadata: {
          presentationId: request.presentationId,
          title: presentation.title,
        },
      });

      // Get current participants
      const participants = await this.getActiveParticipants(roomId);
      
      // Add user to participants
      await this.addParticipant(roomId, {
        userId: request.userId,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        status: 'online',
        lastSeen: new Date().toISOString(),
      });

      // Create collaboration session
      const sessionId = `session-${Date.now()}-${request.userId}`;
      await this.redis.setex(`session:${sessionId}`, 3600, JSON.stringify({
        userId: request.userId,
        presentationId: request.presentationId,
        roomId,
        joinedAt: new Date().toISOString(),
      }));

      return {
        success: true,
        sessionId,
        participants,
        permissions,
        metadata: {
          timestamp: new Date().toISOString(),
          version: presentation.version || 1,
          conflicts: [],
        },
      };
    } catch (error) {
      console.error('Join collaboration error:', error);
      throw error;
    }
  }

  async leaveCollaboration(request: CollaborationRequest): Promise<CollaborationResponse> {
    try {
      const roomId = `presentation-${request.presentationId}`;
      
      // Remove user from participants
      await this.removeParticipant(roomId, request.userId);
      
      // Update user status
      await this.updateParticipantStatus(roomId, request.userId, 'offline');
      
      // Get remaining participants
      const participants = await this.getActiveParticipants(roomId);
      
      // Clean up session
      const sessions = await this.redis.keys(`session:*`);
      for (const session of sessions) {
        const sessionData = JSON.parse(await this.redis.get(session) || '{}');
        if (sessionData.userId === request.userId && sessionData.presentationId === request.presentationId) {
          await this.redis.del(session);
        }
      }

      return {
        success: true,
        sessionId: '',
        participants,
        permissions: {},
        metadata: {
          timestamp: new Date().toISOString(),
          version: 0,
          conflicts: [],
        },
      };
    } catch (error) {
      console.error('Leave collaboration error:', error);
      throw error;
    }
  }

  async sendRealtimeUpdate(roomId: string, update: RealtimeUpdate): Promise<void> {
    try {
      // Send update through Liveblocks
      await this.liveblocks.sendNotification(roomId, {
        type: update.type,
        userId: update.userId,
        data: update.data,
        timestamp: update.timestamp,
        version: update.version,
      });

      // Store update in Redis for conflict resolution
      await this.redis.zadd(`updates:${roomId}`, update.version, JSON.stringify(update));
      
      // Clean up old updates (keep last 100)
      await this.redis.zremrangebyrank(`updates:${roomId}`, 0, -101);
      
      // Broadcast to other participants
      await this.broadcastToRoom(roomId, update);
    } catch (error) {
      console.error('Realtime update error:', error);
      throw error;
    }
  }

  async resolveConflicts(roomId: string): Promise<any[]> {
    try {
      // Get all updates for the room
      const updates = await this.redis.zrange(`updates:${roomId}`, 0, -1);
      const conflicts = [];
      
      // Analyze conflicts
      for (let i = 0; i < updates.length - 1; i++) {
        const currentUpdate = JSON.parse(updates[i]);
        const nextUpdate = JSON.parse(updates[i + 1]);
        
        if (this.hasConflict(currentUpdate, nextUpdate)) {
          conflicts.push({
            update1: currentUpdate,
            update2: nextUpdate,
            type: this.getConflictType(currentUpdate, nextUpdate),
            resolution: await this.resolveConflict(currentUpdate, nextUpdate),
          });
        }
      }
      
      return conflicts;
    } catch (error) {
      console.error('Conflict resolution error:', error);
      throw error;
    }
  }

  // CLERK AUTHENTICATION
  async authenticateUser(request: AuthRequest): Promise<AuthResponse> {
    try {
      let response: AuthResponse;

      switch (request.action) {
        case 'login':
          response = await this.loginUser(request);
          break;
        case 'register':
          response = await this.registerUser(request);
          break;
        case 'logout':
          response = await this.logoutUser(request);
          break;
        case 'verify':
          response = await this.verifyEmail(request);
          break;
        case 'reset-password':
          response = await this.resetPassword(request);
          break;
        default:
          throw new Error(`Unsupported auth action: ${request.action}`);
      }

      return response;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  private async loginUser(request: AuthRequest): Promise<AuthResponse> {
    try {
      // Use Clerk to authenticate
      const user = await this.clerk.users.getUser(request.userId || '');
      
      if (!user) {
        throw new Error('User not found');
      }

      // Create session
      const session = await this.clerk.sessions.createSession({
        userId: user.id,
        sessionId: `session-${Date.now()}`,
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
          avatar: user.imageUrl,
        },
        token: session.jwt,
        session: session,
        metadata: {
          timestamp: new Date().toISOString(),
          expiresAt: session.expiresAt?.toISOString(),
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  private async registerUser(request: AuthRequest): Promise<AuthResponse> {
    try {
      // Create user with Clerk
      const user = await this.clerk.users.createUser({
        emailAddress: [request.email || ''],
        firstName: request.data?.firstName,
        lastName: request.data?.lastName,
        password: request.data?.password,
      });

      // Create session
      const session = await this.clerk.sessions.createSession({
        userId: user.id,
        sessionId: `session-${Date.now()}`,
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
          avatar: user.imageUrl,
        },
        token: session.jwt,
        session: session,
        metadata: {
          timestamp: new Date().toISOString(),
          expiresAt: session.expiresAt?.toISOString(),
        },
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  private async logoutUser(request: AuthRequest): Promise<AuthResponse> {
    try {
      if (request.userId) {
        await this.clerk.sessions.revokeSession(request.userId);
      }

      return {
        success: true,
        metadata: {
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  private async verifyEmail(request: AuthRequest): Promise<AuthResponse> {
    try {
      // Verify email with Clerk
      await this.clerk.users.verifyUser(request.userId || '', {
        verificationStrategy: 'email_link',
      });

      return {
        success: true,
        metadata: {
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }

  private async resetPassword(request: AuthRequest): Promise<AuthResponse> {
    try {
      // Reset password with Clerk
      await this.clerk.users.resetPassword({
        userId: request.userId || '',
        password: request.data?.newPassword,
      });

      return {
        success: true,
        metadata: {
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  // SENDGRID NOTIFICATIONS
  async sendNotification(request: NotificationRequest): Promise<void> {
    try {
      const user = await this.getUser(request.userId);
      
      // Send email notification
      if (request.channels.includes('email')) {
        await this.sendEmailNotification(user, request);
      }

      // Send push notification
      if (request.channels.includes('push')) {
        await this.sendPushNotification(user, request);
      }

      // Send in-app notification
      if (request.channels.includes('in-app')) {
        await this.sendInAppNotification(user, request);
      }

      // Log notification
      await this.logNotification(request);
    } catch (error) {
      console.error('Send notification error:', error);
      throw error;
    }
  }

  private async sendEmailNotification(user: any, request: NotificationRequest): Promise<void> {
    try {
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@novagenai.com',
        subject: request.title,
        text: request.message,
        html: this.generateEmailTemplate(request),
      };

      await this.sendgrid.send(msg);
    } catch (error) {
      console.error('Email notification error:', error);
      throw error;
    }
  }

  private async sendPushNotification(user: any, request: NotificationRequest): Promise<void> {
    try {
      // This would integrate with a push notification service
      // For now, log the push notification
      console.log('Push notification sent:', {
        userId: user.id,
        title: request.title,
        message: request.message,
      });
    } catch (error) {
      console.error('Push notification error:', error);
      throw error;
    }
  }

  private async sendInAppNotification(user: any, request: NotificationRequest): Promise<void> {
    try {
      // Store in-app notification in database
      await this.prisma.notification.create({
        data: {
          userId: user.id,
          type: request.type,
          title: request.title,
          message: request.message,
          data: request.data || {},
          read: false,
          createdAt: new Date(),
        },
      });

      // Broadcast to user's active sessions
      const userSessions = await this.getUserActiveSessions(user.id);
      for (const session of userSessions) {
        await this.broadcastToSession(session, {
          type: 'notification',
          data: request,
        });
      }
    } catch (error) {
      console.error('In-app notification error:', error);
      throw error;
    }
  }

  // COLLABORATION FEATURES
  async sharePresentation(presentationId: string, userId: string, shareData: any): Promise<void> {
    try {
      // Create share record
      await this.prisma.collaboration.create({
        data: {
          presentationId,
          userId,
          role: shareData.role || 'viewer',
          permissions: shareData.permissions || {},
          sharedBy: shareData.sharedBy,
          createdAt: new Date(),
        },
      });

      // Send notification to shared user
      await this.sendNotification({
        userId,
        type: 'share',
        title: 'Presentation Shared',
        message: `You have been shared a presentation with ${shareData.role} access`,
        data: { presentationId, role: shareData.role },
        channels: ['email', 'in-app'],
      });
    } catch (error) {
      console.error('Share presentation error:', error);
      throw error;
    }
  }

  async addComment(presentationId: string, userId: string, comment: any): Promise<void> {
    try {
      // Create comment
      await this.prisma.comment.create({
        data: {
          presentationId,
          userId,
          content: comment.content,
          slideId: comment.slideId,
          elementId: comment.elementId,
          position: comment.position,
          resolved: false,
          createdAt: new Date(),
        },
      });

      // Notify relevant users
      const collaborators = await this.getPresentationCollaborators(presentationId);
      for (const collaborator of collaborators) {
        if (collaborator.userId !== userId) {
          await this.sendNotification({
            userId: collaborator.userId,
            type: 'comment',
            title: 'New Comment',
            message: `A new comment was added to the presentation`,
            data: { presentationId, commentId: comment.id },
            channels: ['in-app'],
          });
        }
      }

      // Send realtime update
      await this.sendRealtimeUpdate(`presentation-${presentationId}`, {
        type: 'comment',
        userId,
        data: comment,
        timestamp: new Date().toISOString(),
        version: Date.now(),
      });
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  }

  async updateCursor(roomId: string, userId: string, cursor: { x: number; y: number }): Promise<void> {
    try {
      // Update cursor in Redis
      await this.redis.hset(`cursors:${roomId}`, userId, JSON.stringify({
        x: cursor.x,
        y: cursor.y,
        timestamp: new Date().toISOString(),
      }));

      // Broadcast cursor update
      await this.broadcastToRoom(roomId, {
        type: 'cursor',
        userId,
        data: cursor,
        timestamp: new Date().toISOString(),
        version: Date.now(),
      });
    } catch (error) {
      console.error('Update cursor error:', error);
      throw error;
    }
  }

  async updateSelection(roomId: string, userId: string, selection: any): Promise<void> {
    try {
      // Update selection in Redis
      await this.redis.hset(`selections:${roomId}`, userId, JSON.stringify({
        ...selection,
        timestamp: new Date().toISOString(),
      }));

      // Broadcast selection update
      await this.broadcastToRoom(roomId, {
        type: 'selection',
        userId,
        data: selection,
        timestamp: new Date().toISOString(),
        version: Date.now(),
      });
    } catch (error) {
      console.error('Update selection error:', error);
      throw error;
    }
  }

  async lockElement(presentationId: string, userId: string, elementId: string): Promise<void> {
    try {
      // Lock element
      await this.redis.setex(`lock:${presentationId}:${elementId}`, 300, JSON.stringify({
        userId,
        lockedAt: new Date().toISOString(),
      }));

      // Broadcast lock update
      await this.sendRealtimeUpdate(`presentation-${presentationId}`, {
        type: 'element',
        userId,
        data: { elementId, action: 'lock' },
        timestamp: new Date().toISOString(),
        version: Date.now(),
      });
    } catch (error) {
      console.error('Lock element error:', error);
      throw error;
    }
  }

  async unlockElement(presentationId: string, userId: string, elementId: string): Promise<void> {
    try {
      // Unlock element
      await this.redis.del(`lock:${presentationId}:${elementId}`);

      // Broadcast unlock update
      await this.sendRealtimeUpdate(`presentation-${presentationId}`, {
        type: 'element',
        userId,
        data: { elementId, action: 'unlock' },
        timestamp: new Date().toISOString(),
        version: Date.now(),
      });
    } catch (error) {
      console.error('Unlock element error:', error);
      throw error;
    }
  }

  // HELPER METHODS
  private async verifyUser(userId: string): Promise<any> {
    try {
      const user = await this.clerk.users.getUser(userId);
      return {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
        avatar: user.imageUrl,
        role: 'user',
      };
    } catch (error) {
      console.error('Verify user error:', error);
      throw error;
    }
  }

  private async getPresentation(presentationId: string): Promise<any> {
    const presentation = await this.prisma.presentation.findUnique({
      where: { id: presentationId },
    });

    if (!presentation) {
      throw new Error('Presentation not found');
    }

    return presentation;
  }

  private async getUserPermissions(userId: string, presentationId: string): Promise<any> {
    try {
      const collaboration = await this.prisma.collaboration.findFirst({
        where: {
          presentationId,
          userId,
        },
      });

      if (collaboration) {
        return collaboration.permissions;
      }

      // Check if user is the owner
      const presentation = await this.getPresentation(presentationId);
      if (presentation.userId === userId) {
        return {
          canEdit: true,
          canComment: true,
          canShare: true,
          canDelete: true,
        };
      }

      // Default permissions
      return {
        canEdit: false,
        canComment: true,
        canShare: false,
        canDelete: false,
      };
    } catch (error) {
      console.error('Get user permissions error:', error);
      return {
        canEdit: false,
        canComment: false,
        canShare: false,
        canDelete: false,
      };
    }
  }

  private async getActiveParticipants(roomId: string): Promise<any[]> {
    try {
      const participants = await this.redis.hgetall(`participants:${roomId}`);
      return Object.values(participants).map(p => JSON.parse(p));
    } catch (error) {
      console.error('Get active participants error:', error);
      return [];
    }
  }

  private async addParticipant(roomId: string, participant: any): Promise<void> {
    await this.redis.hset(`participants:${roomId}`, participant.userId, JSON.stringify(participant));
  }

  private async removeParticipant(roomId: string, userId: string): Promise<void> {
    await this.redis.hdel(`participants:${roomId}`, userId);
  }

  private async updateParticipantStatus(roomId: string, userId: string, status: string): Promise<void> {
    const participant = await this.redis.hget(`participants:${roomId}`, userId);
    if (participant) {
      const parsed = JSON.parse(participant);
      parsed.status = status;
      parsed.lastSeen = new Date().toISOString();
      await this.redis.hset(`participants:${roomId}`, userId, JSON.stringify(parsed));
    }
  }

  private async broadcastToRoom(roomId: string, data: any): Promise<void> {
    // This would use Liveblocks to broadcast to all participants
    console.log('Broadcasting to room:', roomId, data);
  }

  private async broadcastToSession(sessionId: string, data: any): Promise<void> {
    // This would broadcast to a specific user session
    console.log('Broadcasting to session:', sessionId, data);
  }

  private hasConflict(update1: RealtimeUpdate, update2: RealtimeUpdate): boolean {
    // Check if updates conflict
    return update1.type === update2.type && 
           update1.data.elementId === update2.data.elementId &&
           update1.userId !== update2.userId;
  }

  private getConflictType(update1: RealtimeUpdate, update2: RealtimeUpdate): string {
    return 'edit_conflict';
  }

  private async resolveConflict(update1: RealtimeUpdate, update2: RealtimeUpdate): Promise<any> {
    // Implement conflict resolution logic
    return {
      resolved: true,
      winner: update2, // Last update wins
      mergedData: update2.data,
    };
  }

  private async getUser(userId: string): Promise<any> {
    try {
      const user = await this.clerk.users.getUser(userId);
      return {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
        avatar: user.imageUrl,
      };
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }

  private generateEmailTemplate(request: NotificationRequest): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${request.title}</h2>
        <p style="color: #666;">${request.message}</p>
        <div style="margin-top: 20px;">
          <a href="${process.env.FRONTEND_URL}/notifications" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            View Notification
          </a>
        </div>
      </div>
    `;
  }

  private async logNotification(request: NotificationRequest): Promise<void> {
    try {
      await this.prisma.analytics.create({
        data: {
          event: 'NOTIFICATION_SENT',
          properties: {
            userId: request.userId,
            type: request.type,
            channels: request.channels,
          },
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Log notification error:', error);
    }
  }

  private async getUserActiveSessions(userId: string): Promise<string[]> {
    try {
      const sessions = await this.redis.keys(`session:*`);
      const userSessions = [];
      
      for (const session of sessions) {
        const sessionData = JSON.parse(await this.redis.get(session) || '{}');
        if (sessionData.userId === userId) {
          userSessions.push(session);
        }
      }
      
      return userSessions;
    } catch (error) {
      console.error('Get user active sessions error:', error);
      return [];
    }
  }

  private async getPresentationCollaborators(presentationId: string): Promise<any[]> {
    try {
      return await this.prisma.collaboration.findMany({
        where: { presentationId },
        include: {
          user: {
            select: { id: true, email: true, name: true }
          }
        }
      });
    } catch (error) {
      console.error('Get presentation collaborators error:', error);
      return [];
    }
  }

  // COLLABORATION ANALYTICS
  async getCollaborationStats(presentationId: string): Promise<any> {
    try {
      const stats = await this.prisma.$queryRaw`
        SELECT 
          COUNT(DISTINCT user_id) as total_collaborators,
          COUNT(*) as total_actions,
          AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_session_duration
        FROM collaboration 
        WHERE presentation_id = ${presentationId}
      `;

      const comments = await this.prisma.comment.count({
        where: { presentationId }
      });

      const conflicts = await this.resolveConflicts(`presentation-${presentationId}`);

      return {
        totalCollaborators: stats[0]?.total_collaborators || 0,
        totalActions: stats[0]?.total_actions || 0,
        avgSessionDuration: stats[0]?.avg_session_duration || 0,
        totalComments: comments,
        totalConflicts: conflicts.length,
        activeNow: (await this.getActiveParticipants(`presentation-${presentationId}`)).length,
      };
    } catch (error) {
      console.error('Get collaboration stats error:', error);
      return {};
    }
  }

  // COLLABORATION TEMPLATES
  async getCollaborationTemplates(): Promise<any[]> {
    return [
      {
        id: 'real-time-editing',
        name: 'Real-time Editing',
        description: 'Enable real-time collaborative editing with live cursors and selections',
        features: ['live-cursors', 'real-time-updates', 'conflict-resolution'],
      },
      {
        id: 'comment-system',
        name: 'Comment System',
        description: 'Add threaded comments and discussions to presentations',
        features: ['threaded-comments', 'mentions', 'notifications'],
      },
      {
        id: 'version-control',
        name: 'Version Control',
        description: 'Track changes and maintain version history',
        features: ['change-tracking', 'version-history', 'rollback'],
      },
    ];
  }
}
