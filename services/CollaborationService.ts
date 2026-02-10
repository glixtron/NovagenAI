import { PrismaClient } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';
import Redis from 'ioredis';

export interface CollaborationSession {
  id: string;
  presentationId: string;
  userId: string;
  role: 'owner' | 'editor' | 'viewer' | 'commenter';
  permissions: string[];
  joinedAt: string;
  lastActiveAt: string;
  isActive: boolean;
  cursor?: { x: number; y: number };
  selection?: string[];
}

export interface CollaborationEvent {
  id: string;
  sessionId: string;
  userId: string;
  type: 'cursor-move' | 'element-update' | 'selection-change' | 'text-change' | 'user-joined' | 'user-left';
  data: any;
  timestamp: string;
}

export interface RealTimeDocument {
  id: string;
  presentationId: string;
  content: any;
  version: number;
  lastEditedBy: string;
  lastEditedAt: string;
  isActive: boolean;
  locked: boolean;
  lockedBy?: string;
}

export class CollaborationService {
  private prisma: PrismaClient;
  private redis: Redis;
  private io: SocketIOServer;
  private activeSessions: Map<string, CollaborationSession> = new Map();

  constructor() {
    this.prisma = new PrismaClient();
    
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    });

    // Initialize Socket.io server
    this.io = new SocketIOServer({
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? ['https://novagen-ai-seven.vercel.app']
          : ['http://localhost:3000'],
        methods: ['GET', 'POST'],
      },
    });
  }

  initializeSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log('User connected to collaboration:', socket.id);
      this.handleUserConnection(socket);
    });

    this.io.on('disconnect', (socket) => {
      console.log('User disconnected from collaboration:', socket.id);
      this.handleUserDisconnection(socket);
    });

    // Presentation collaboration events
    this.io.on('join-presentation', (socket, data) => {
      this.handleJoinPresentation(socket, data);
    });

    this.io.on('leave-presentation', (socket, data) => {
      this.handleLeavePresentation(socket, data);
    });

    // Real-time editing events
    this.io.on('element-update', (socket, data) => {
      this.handleElementUpdate(socket, data);
    });

    this.io.on('element-add', (socket, data) => {
      this.handleElementAdd(socket, data);
    });

    this.io.on('element-delete', (socket, data) => {
      this.handleElementDelete(socket, data);
    });

    // Cursor and selection events
    this.io.on('cursor-move', (socket, data) => {
      this.handleCursorMove(socket, data);
    });

    this.io.on('selection-change', (socket, data) => {
      this.handleSelectionChange(socket, data);
    });

    // Text editing events
    this.io.on('text-change', (socket, data) => {
      this.handleTextChange(socket, data);
    });

    // Document versioning events
    this.io.on('document-save', (socket, data) => {
      this.handleDocumentSave(socket, data);
    });

    this.io.on('document-restore', (socket, data) => {
      this.handleDocumentRestore(socket, data);
    });
  }

  // Comment and annotation events
    this.io.on('comment-add', (socket, data) => {
      this.handleCommentAdd(socket, data);
    });

    this.io.on('comment-update', (socket, data) => {
      this.handleCommentUpdate(socket, data);
    });

    this.io.on('comment-delete', (socket, data) => {
      this.handleCommentDelete(socket, data);
    });
  }

  // Permission management
    this.io.on('permission-change', (socket, data) => {
      this.handlePermissionChange(socket, data);
    });

    this.io.on('role-change', (socket, data) => {
      this.handleRoleChange(socket, data);
    });
  }

    // Voice and video call events (future enhancement)
    this.io.on('voice-start', (socket, data) => {
      this.handleVoiceStart(socket, data);
    });

    this.io.on('voice-end', (socket, data) => {
      this.handleVoiceEnd(socket, data);
    });
  }

    // Screen sharing and presentation mode
    this.io.on('screen-share-start', (socket, data) => {
      this.handleScreenShareStart(socket, data);
    });

    this.io.on('screen-share-end', (socket, data) => {
      this.handleScreenShareEnd(socket, data);
    });

    this.io.on('presentation-mode-change', (socket, data) => {
      this.handlePresentationModeChange(socket, data);
    });
  }

    // Analytics events
    this.io.on('user-activity', (socket, data) => {
      this.handleUserActivity(socket, data);
    });
  }

    // Error handling
    this.io.on('error', (socket, error) => {
      this.handleError(socket, error);
    });
  }

  async handleUserConnection(socket: any) {
    const userId = socket.handshake.query.userId;
    if (!userId) {
      socket.disconnect();
      return;
    }

    // Create or get user session
    let session = await this.getOrCreateSession(userId, socket.id);
    this.activeSessions.set(socket.id, session);
    
    // Join user to their active presentations
    const activePresentations = await this.getUserActivePresentations(userId);
    activePresentations.forEach(presentationId => {
      socket.join(presentationId);
    });

    socket.emit('session-established', {
      sessionId: session.id,
      userId,
      role: session.role,
      permissions: session.permissions
    });
  }

  async handleUserDisconnection(socket: any) {
    const session = this.activeSessions.get(socket.id);
    if (session) {
      // Update last active timestamp
      await this.prisma.collaboration.update({
        where: { id: session.id },
        data: { lastActiveAt: new Date().toISOString() }
      });

      // Clean up session
      this.activeSessions.delete(socket.id);
    }

    this.io.emit('user-disconnected', {
      userId: session.userId,
      sessionId: session.id
    });
  }

  async handleJoinPresentation(socket: any, data: { presentationId: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Check permissions
    const presentation = await this.prisma.presentation.findUnique({
      where: { id: data.presentationId },
      include: { collaborators: true }
    });

    if (!presentation) {
      socket.emit('error', { message: 'Presentation not found' });
      return;
    }

    const collaboration = await this.prisma.collaboration.findFirst({
      where: {
        presentationId: data.presentationId,
        userId: session.userId
      }
    });

    if (collaboration) {
      socket.emit('error', { message: 'Already collaborating on this presentation' });
      return;
    }

    // Create new collaboration record
    const newCollaboration = await this.prisma.collaboration.create({
      data: {
        presentationId: data.presentationId,
        userId: session.userId,
        role: 'viewer',
        permissions: ['view', 'comment'],
        joinedAt: new Date().toISOString()
      }
    });

    // Update session
    session.presentationId = data.presentationId;
    session.role = 'viewer';
    session.joinedAt = new Date().toISOString();
    await this.prisma.collaboration.update({
      where: { id: newCollaboration.id },
      data: { role: 'viewer', permissions: ['view', 'comment'] }
    });

    socket.join(data.presentationId);
    socket.emit('joined-presentation', { presentationId: data.presentationId });
    
    // Broadcast to other users
    this.broadcastToPresentation(data.presentationId, 'user-joined', {
      userId: session.userId,
      sessionId: session.id,
      role: session.role
    });
  }

  async handleLeavePresentation(socket: any, data: { presentationId: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session || session.presentationId !== data.presentationId) return;

    // Update collaboration record
    await this.prisma.collaboration.updateMany({
      where: {
        presentationId: data.presentationId,
        userId: session.userId,
        role: { in: ['owner', 'editor', 'viewer'] }
      },
      data: { lastActiveAt: new Date().toISOString() }
    });

    session.presentationId = null;
    socket.leave(data.presentationId);
    
    this.broadcastToPresentation(data.presentationId, 'user-left', {
      userId: session.userId,
      sessionId: session.id
    });
  }

  async handleElementUpdate(socket: any, data: { elementId: string; updates: any }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Check permissions
    const collaboration = await this.prisma.collaboration.findFirst({
      where: {
        presentationId: session.presentationId,
        userId: session.userId
      }
    });

    if (!collaboration || !collaboration.permissions.includes('edit')) {
      socket.emit('error', { message: 'No permission to edit' });
      return;
    }

    // Update element in database
    await this.prisma.element.update({
      where: { id: data.elementId },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    });

    // Broadcast to presentation room
    this.broadcastToPresentation(session.presentationId, 'element-updated', {
      elementId: data.elementId,
      updates,
      userId: session.userId
    });
  }

  async handleElementAdd(socket: any, data: any) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Create new element
    const newElement = await this.prisma.element.create({
      data: {
        slideId: data.slideId,
        type: data.type,
        content: data.content,
        zIndex: data.zIndex || 0,
        createdAt: new Date()
      }
    });

    // Broadcast to presentation room
    this.broadcastToPresentation(session.presentationId, 'element-added', {
      element: newElement,
      userId: session.userId
    });
  }

  async handleElementDelete(socket: any, data: { elementId: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Check permissions
    const collaboration = await this.prisma.collaboration.findFirst({
      where: {
        presentationId: session.presentationId,
        userId: session.userId
      }
    });

    if (!collaboration || !collaboration.permissions.includes('delete')) {
      socket.emit('error', { message: 'No permission to delete' });
      return;
    }

    // Delete element
    await this.prisma.element.delete({
      where: { id: data.elementId }
    });

    // Broadcast to presentation room
    this.broadcastToPresentation(session.presentationId, 'element-deleted', {
      elementId: data.elementId,
      userId: session.userId
    });
  }

  async handleCursorMove(socket: any, data: { position: { x: number; y: number } }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Update cursor position in session
    session.cursor = data.position;
    session.lastActiveAt = new Date().toISOString();
    await this.prisma.collaboration.update({
      where: { id: session.id },
      data: { lastActiveAt: session.lastActiveAt }
    });

    // Broadcast cursor position
    this.broadcastToPresentation(session.presentationId, 'cursor-moved', {
      userId: session.userId,
      position: data.position,
      timestamp: new Date().toISOString()
    });
  }

  async handleSelectionChange(socket: any, data: { elementIds: string[] }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Update selection in session
    session.selection = data.elementIds;
    session.lastActiveAt = new Date().toISOString();
    await this.prisma.collaboration.update({
      where: { id: session.id },
      data: { lastActiveAt: session.lastActiveAt }
    });

    // Broadcast selection change
    this.broadcastToPresentation(session.presentationId, 'selection-change', {
      userId: session.userId,
      elementIds: data.elementIds,
      timestamp: new Date().toISOString()
    });
  }

  async handleTextChange(socket: any, data: { elementId: string; text: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Update element text
    await this.prisma.element.update({
      where: { id: data.elementId },
      data: { 
        content: { ...JSON.parse(session.element?.content || '{}'), text: data.text },
        updatedAt: new Date()
      }
    });

    // Broadcast text change
    this.broadcastToPresentation(session.presentationId, 'text-change', {
      userId: session.userId,
      elementId: data.elementId,
      text: data.text,
      timestamp: new Date().toISOString()
    });
  }

  async handleDocumentSave(socket: any, data: { content: any }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Create new document version
    const newVersion = await this.prisma.realTimeDocument.create({
      data: {
        presentationId: session.presentationId,
        content: data.content,
        version: (await this.getLatestVersion(session.presentationId)) + 1,
        lastEditedBy: session.userId,
        lastEditedAt: new Date(),
        isActive: true,
        createdAt: new Date()
      }
    });

    // Update all elements to new version
    await this.prisma.element.updateMany({
      where: { 
        presentationId: session.presentationId,
        isActive: true
      },
      data: {
        documentVersion: newVersion.version,
        updatedAt: new Date()
      }
    });

    // Broadcast document save
    this.broadcastToPresentation(session.presentationId, 'document-saved', {
      userId: session.userId,
      version: newVersion.version,
      timestamp: new Date().toISOString()
    });
  }

  async handleDocumentRestore(socket: any, data: { version: number }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Set all elements to specified version
    await this.prisma.element.updateMany({
      where: { 
        presentationId: session.presentationId,
        documentVersion: data.version
      },
      data: {
        documentVersion: data.version,
        updatedAt: new Date()
      }
    });

    // Set document version as active
    await this.prisma.realTimeDocument.updateMany({
      where: { 
        presentationId: session.presentationId,
        isActive: true,
        documentVersion: data.version
      },
      data: {
        isActive: false
      }
    });

    // Broadcast document restore
    this.broadcastToPresentation(session.presentationId, 'document-restore', {
      userId: session.userId,
      version: data.version,
      timestamp: new Date().toISOString()
    });
  }

  async handleCommentAdd(socket: any, data: { elementId: string; content: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Create comment
    const newComment = await this.prisma.comment.create({
      data: {
        elementId: data.elementId,
        userId: session.userId,
        content: data.content,
        createdAt: new Date()
      }
    });

    // Broadcast comment addition
    this.broadcastToPresentation(session.presentationId, 'comment-added', {
      userId: session.userId,
      commentId: newComment.id,
      elementId: data.elementId,
      content: data.content,
      timestamp: new Date().toISOString()
    });
  }

  async handleCommentUpdate(socket: any, data: { commentId: string; content: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Update comment
    await this.prisma.comment.update({
      where: { 
        id: data.commentId,
        userId: session.userId
      },
      data: {
        content: data.content,
        updatedAt: new Date()
      }
    });

    // Broadcast comment update
    this.broadcastToPresentation(session.presentationId, 'comment-updated', {
      userId: session.userId,
      commentId: data.commentId,
      content: data.content,
      timestamp: new Date().toISOString()
    });
  }

  async handleCommentDelete(socket: any, data: { commentId: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Delete comment
    await this.prisma.comment.delete({
      where: { 
        id: data.commentId,
        userId: session.userId
      }
    });

    // Broadcast comment deletion
    this.broadcastToPresentation(session.presentationId, 'comment-deleted', {
      userId: session.userId,
      commentId: data.commentId,
      timestamp: new Date().toISOString()
    });
  }

  async handlePermissionChange(socket: any, data: { permissions: string[] }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Update collaboration permissions
    await this.prisma.collaboration.update({
      where: { 
        id: session.id,
        userId: session.userId
      },
      data: {
        permissions: data.permissions,
        updatedAt: new Date()
      }
    });

    // Broadcast permission change
    this.broadcastToPresentation(session.presentationId, 'permission-change', {
      userId: session.userId,
      permissions: data.permissions,
      timestamp: new Date().toISOString()
    });
  }

  async handleRoleChange(socket: any, data: { role: string }) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Update user role
    await this.prisma.collaboration.update({
      where: { 
        id: session.id,
        userId: session.userId
      },
      data: {
        role: data.role,
        updatedAt: new Date()
      }
    });

    // Broadcast role change
    this.broadcastToPresentation(session.presentationId, 'role-change', {
      userId: session.userId,
      role: data.role,
      timestamp: new Date().toISOString()
    });
  }

  async handleUserActivity(socket: any, data: any) {
    const session = this.activeSessions.get(socket.id);
    if (!session) return;

    // Log user activity
    await this.prisma.analytics.create({
      data: {
        userId: session.userId,
        event: 'USER_ACTIVITY',
        properties: data,
        timestamp: new Date()
      }
    });
  }

  async handleError(socket: any, error: any) {
    console.error('Socket error:', error);
    socket.emit('error', { message: error.message || 'Unknown error' });
  }

  private async getOrCreateSession(userId: string, socketId: string): Promise<CollaborationSession> {
    // Check for existing active session
    const existingSession = await this.prisma.collaboration.findFirst({
      where: {
        userId,
        lastActiveAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // Active in last 5 minutes
        }
      },
      orderBy: { lastActiveAt: 'desc' }
    });

    if (existingSession) {
      return existingSession;
    }

    // Create new session
    const newSession = await this.prisma.collaboration.create({
      data: {
        userId,
        socketId,
        role: 'viewer',
        permissions: ['view'],
        joinedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString()
      }
    });

    return newSession;
  }

  private async getUserActivePresentations(userId: string): Promise<string[]> {
    const collaborations = await this.prisma.collaboration.findMany({
      where: {
        userId,
        role: { in: ['owner', 'editor', 'viewer'] },
        lastActiveAt: {
          gte: new Date(Date.now() - 24 * 60 * 600) // Active in last 24 hours
        }
      },
      include: {
        presentation: {
          select: { id: true }
        }
      }
    });

    return collaborations.map(c => c.presentation.id);
  }

  private async getLatestVersion(presentationId: string): Promise<number> {
    const latestDoc = await this.prisma.realTimeDocument.findFirst({
      where: {
        presentationId,
        isActive: true
      },
      orderBy: { version: 'desc' }
    });

    return latestDoc?.version || 1;
  }

  private broadcastToPresentation(presentationId: string, event: string, data: any) {
    this.io.to(presentationId).emit(event, {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  // Initialize all handlers
  public initialize() {
    this.initializeSocketHandlers();
  }

  public getActiveUsersCount(presentationId: string): Promise<number> {
    const sockets = Array.from(this.io.sockets.sockets.values());
    return sockets.filter(socket => socket.rooms?.has(presentationId)).length;
  }
}
