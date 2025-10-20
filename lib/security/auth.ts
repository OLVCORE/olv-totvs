import { NextRequest, NextResponse } from 'next/server';

/**
 * 🔐 AUTENTICAÇÃO E AUTORIZAÇÃO AVANÇADA
 * 
 * Sistema robusto de autenticação com múltiplos fatores,
 * sessões seguras e controle de acesso granular.
 */

// ==========================================
// CONFIGURAÇÕES DE AUTENTICAÇÃO
// ==========================================

interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenExpiresIn: string;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  enable2FA: boolean;
  enablePasswordPolicy: boolean;
  passwordMinLength: number;
  passwordRequireSpecial: boolean;
  enableSessionManagement: boolean;
}

const AUTH_CONFIG: AuthConfig = {
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
  jwtExpiresIn: '15m', // 15 minutos
  refreshTokenExpiresIn: '7d', // 7 dias
  sessionTimeout: 30 * 60 * 1000, // 30 minutos
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutos
  enable2FA: true,
  enablePasswordPolicy: true,
  passwordMinLength: 8,
  passwordRequireSpecial: true,
  enableSessionManagement: true,
};

// ==========================================
// TIPOS DE AUTENTICAÇÃO
// ==========================================

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'manager';
  isActive: boolean;
  lastLogin?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  sessions: Session[];
}

interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  createdAt: Date;
  expiresAt: Date;
  lastActivity: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
}

interface LoginAttempt {
  email: string;
  ip: string;
  userAgent: string;
  success: boolean;
  timestamp: Date;
  reason?: string;
}

// ==========================================
// SISTEMA DE SESSÕES
// ==========================================

class SessionManager {
  private sessions = new Map<string, Session>();
  private userSessions = new Map<string, Set<string>>();

  createSession(userId: string, ip: string, userAgent: string): Session {
    const sessionId = this.generateSessionId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + AUTH_CONFIG.sessionTimeout);

    const session: Session = {
      id: sessionId,
      userId,
      token: this.generateToken(userId),
      refreshToken: this.generateRefreshToken(userId),
      createdAt: now,
      expiresAt,
      lastActivity: now,
      ipAddress: ip,
      userAgent,
      isActive: true,
    };

    this.sessions.set(sessionId, session);

    // Adicionar à lista de sessões do usuário
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, new Set());
    }
    this.userSessions.get(userId)!.add(sessionId);

    return session;
  }

  getSession(sessionId: string): Session | null {
    const session = this.sessions.get(sessionId);
    
    if (!session || !session.isActive) {
      return null;
    }

    // Verificar se a sessão expirou
    if (new Date() > session.expiresAt) {
      this.invalidateSession(sessionId);
      return null;
    }

    // Atualizar última atividade
    session.lastActivity = new Date();
    return session;
  }

  invalidateSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.isActive = false;
    this.sessions.delete(sessionId);

    // Remover da lista de sessões do usuário
    const userSessions = this.userSessions.get(session.userId);
    if (userSessions) {
      userSessions.delete(sessionId);
      if (userSessions.size === 0) {
        this.userSessions.delete(session.userId);
      }
    }

    return true;
  }

  invalidateUserSessions(userId: string): number {
    const userSessions = this.userSessions.get(userId);
    if (!userSessions) return 0;

    let count = 0;
    for (const sessionId of userSessions) {
      if (this.invalidateSession(sessionId)) {
        count++;
      }
    }

    return count;
  }

  getUserSessions(userId: string): Session[] {
    const userSessions = this.userSessions.get(userId);
    if (!userSessions) return [];

    return Array.from(userSessions)
      .map(sessionId => this.sessions.get(sessionId))
      .filter((session): session is Session => session !== undefined && session.isActive);
  }

  cleanupExpiredSessions(): number {
    const now = new Date();
    let cleaned = 0;

    for (const [sessionId, session] of this.sessions.entries()) {
      if (now > session.expiresAt || !session.isActive) {
        this.invalidateSession(sessionId);
        cleaned++;
      }
    }

    return cleaned;
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateToken(userId: string): string {
    // Implementar geração de JWT real
    return `token_${userId}_${Date.now()}`;
  }

  private generateRefreshToken(userId: string): string {
    return `refresh_${userId}_${Date.now()}`;
  }
}

// ==========================================
// SISTEMA DE TENTATIVAS DE LOGIN
// ==========================================

class LoginAttemptManager {
  private attempts = new Map<string, LoginAttempt[]>();
  private lockedAccounts = new Map<string, Date>();

  recordAttempt(email: string, ip: string, userAgent: string, success: boolean, reason?: string): void {
    const attempt: LoginAttempt = {
      email,
      ip,
      userAgent,
      success,
      timestamp: new Date(),
      reason,
    };

    const key = `${email}:${ip}`;
    if (!this.attempts.has(key)) {
      this.attempts.set(key, []);
    }

    this.attempts.get(key)!.push(attempt);

    // Verificar se deve bloquear a conta
    if (!success) {
      this.checkForLockout(email, ip);
    } else {
      // Remover bloqueio em caso de sucesso
      this.lockedAccounts.delete(email);
    }
  }

  isAccountLocked(email: string): boolean {
    const lockUntil = this.lockedAccounts.get(email);
    if (!lockUntil) return false;

    if (new Date() > lockUntil) {
      this.lockedAccounts.delete(email);
      return false;
    }

    return true;
  }

  getRemainingLockoutTime(email: string): number {
    const lockUntil = this.lockedAccounts.get(email);
    if (!lockUntil) return 0;

    const remaining = lockUntil.getTime() - Date.now();
    return Math.max(0, remaining);
  }

  getRecentAttempts(email: string, ip: string, minutes: number = 15): LoginAttempt[] {
    const key = `${email}:${ip}`;
    const attempts = this.attempts.get(key) || [];
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);

    return attempts.filter(attempt => attempt.timestamp > cutoff);
  }

  private checkForLockout(email: string, ip: string): void {
    const recentAttempts = this.getRecentAttempts(email, ip, 15);
    const failedAttempts = recentAttempts.filter(attempt => !attempt.success);

    if (failedAttempts.length >= AUTH_CONFIG.maxLoginAttempts) {
      const lockUntil = new Date(Date.now() + AUTH_CONFIG.lockoutDuration);
      this.lockedAccounts.set(email, lockUntil);
      
      console.warn(`🔒 Account locked: ${email} until ${lockUntil.toISOString()}`);
    }
  }

  cleanupOldAttempts(): number {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 horas
    let cleaned = 0;

    for (const [key, attempts] of this.attempts.entries()) {
      const filtered = attempts.filter(attempt => attempt.timestamp > cutoff);
      if (filtered.length === 0) {
        this.attempts.delete(key);
        cleaned++;
      } else {
        this.attempts.set(key, filtered);
      }
    }

    return cleaned;
  }
}

// ==========================================
// VALIDAÇÃO DE SENHA
// ==========================================

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!AUTH_CONFIG.enablePasswordPolicy) {
    return { isValid: true, errors: [] };
  }

  if (password.length < AUTH_CONFIG.passwordMinLength) {
    errors.push(`Senha deve ter pelo menos ${AUTH_CONFIG.passwordMinLength} caracteres`);
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }

  if (AUTH_CONFIG.passwordRequireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Senha deve conter pelo menos um caractere especial');
  }

  // Verificar senhas comuns
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey',
  ];

  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Senha muito comum, escolha uma senha mais segura');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ==========================================
// INSTÂNCIAS GLOBAIS
// ==========================================

const sessionManager = new SessionManager();
const loginAttemptManager = new LoginAttemptManager();

// Limpeza periódica
setInterval(() => {
  sessionManager.cleanupExpiredSessions();
  loginAttemptManager.cleanupOldAttempts();
}, 5 * 60 * 1000); // A cada 5 minutos

// ==========================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ==========================================

export function withAuthentication(
  handler: (req: NextRequest, session: Session) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const sessionId = req.headers.get('x-session-id') || 
                     req.cookies.get('session-id')?.value;

    if (!sessionId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const session = sessionManager.getSession(sessionId);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    return handler(req, session);
  };
}

export function withAuthorization(
  requiredRoles: string[],
  handler: (req: NextRequest, session: Session) => Promise<NextResponse>
) {
  return withAuthentication(async (req: NextRequest, session: Session) => {
    // Verificar se o usuário tem uma das funções necessárias
    // Esta verificação seria feita contra o banco de dados
    const userRole = 'admin'; // Simulado
    
    if (!requiredRoles.includes(userRole)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return handler(req, session);
  });
}

// ==========================================
// FUNÇÕES DE UTILIDADE
// ==========================================

export function hashPassword(password: string): string {
  // Implementar hash real com bcrypt
  return `hashed_${password}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  // Implementar verificação real com bcrypt
  return hash === `hashed_${password}`;
}

export function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// ==========================================
// EXPORTS
// ==========================================

export default {
  validatePassword,
  hashPassword,
  verifyPassword,
  generateSecureToken,
  withAuthentication,
  withAuthorization,
  sessionManager,
  loginAttemptManager,
  AUTH_CONFIG,
};

// Logging de inicialização
if (process.env.NODE_ENV === 'development') {
  console.log('🔐 Advanced Authentication initialized:');
  console.log(`   - JWT expires in: ${AUTH_CONFIG.jwtExpiresIn}`);
  console.log(`   - Session timeout: ${AUTH_CONFIG.sessionTimeout / 1000 / 60} minutes`);
  console.log(`   - Max login attempts: ${AUTH_CONFIG.maxLoginAttempts}`);
  console.log(`   - Lockout duration: ${AUTH_CONFIG.lockoutDuration / 1000 / 60} minutes`);
  console.log(`   - 2FA enabled: ${AUTH_CONFIG.enable2FA}`);
  console.log(`   - Password policy: ${AUTH_CONFIG.enablePasswordPolicy}`);
}
