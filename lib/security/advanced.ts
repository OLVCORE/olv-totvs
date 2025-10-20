import { NextRequest, NextResponse } from 'next/server';

/**
 * 🛡️ SISTEMA DE SEGURANÇA AVANÇADO
 * 
 * Proteção multicamada contra ataques, vulnerabilidades
 * e tentativas de invasão com monitoramento em tempo real.
 */

// ==========================================
// CONFIGURAÇÕES DE SEGURANÇA
// ==========================================

interface SecurityConfig {
  enableCSP: boolean;
  enableHSTS: boolean;
  enableCOOP: boolean;
  enableCORP: boolean;
  enableTrustedTypes: boolean;
  maxRequestSize: number;
  allowedOrigins: string[];
  blockedIPs: string[];
  suspiciousPatterns: RegExp[];
}

const SECURITY_CONFIG: SecurityConfig = {
  enableCSP: true,
  enableHSTS: true,
  enableCOOP: true,
  enableCORP: true,
  enableTrustedTypes: true,
  maxRequestSize: 10 * 1024 * 1024, // 10MB
  allowedOrigins: [
    'https://olvinternacional.com.br',
    'https://www.olvinternacional.com.br',
    'https://staging.olvinternacional.com.br',
  ],
  blockedIPs: [],
  suspiciousPatterns: [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi,
  ],
};

// ==========================================
// HEADERS DE SEGURANÇA
// ==========================================

export function getSecurityHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    // Content Security Policy
    'Content-Security-Policy': SECURITY_CONFIG.enableCSP
      ? [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https: blob:",
          "media-src 'self' https:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "upgrade-insecure-requests",
        ].join('; ')
      : '',
    
    // HTTP Strict Transport Security
    'Strict-Transport-Security': SECURITY_CONFIG.enableHSTS
      ? 'max-age=31536000; includeSubDomains; preload'
      : '',
    
    // Cross-Origin Embedder Policy
    'Cross-Origin-Embedder-Policy': SECURITY_CONFIG.enableCOOP
      ? 'require-corp'
      : '',
    
    // Cross-Origin Resource Policy
    'Cross-Origin-Resource-Policy': SECURITY_CONFIG.enableCORP
      ? 'same-origin'
      : '',
    
    // Cross-Origin Opener Policy
    'Cross-Origin-Opener-Policy': 'same-origin',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
      'payment=()',
      'usb=()',
    ].join(', '),
    
    // X-Frame-Options
    'X-Frame-Options': 'DENY',
    
    // X-Content-Type-Options
    'X-Content-Type-Options': 'nosniff',
    
    // X-XSS-Protection
    'X-XSS-Protection': '1; mode=block',
    
    // X-Download-Options
    'X-Download-Options': 'noopen',
    
    // X-Permitted-Cross-Domain-Policies
    'X-Permitted-Cross-Domain-Policies': 'none',
    
    // Cache-Control para APIs sensíveis
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  // Remover headers vazios
  Object.keys(headers).forEach(key => {
    if (!headers[key]) {
      delete headers[key];
    }
  });

  return headers;
}

// ==========================================
// MIDDLEWARE DE SEGURANÇA
// ==========================================

export function withSecurityHeaders(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Verificar IP bloqueado
    if (isBlockedIP(req)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Verificar tamanho da requisição
    if (isOversizedRequest(req)) {
      return new NextResponse('Payload Too Large', { status: 413 });
    }

    // Verificar padrões suspeitos
    if (hasSuspiciousPatterns(req)) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // Verificar CORS
    if (!isAllowedOrigin(req)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Processar requisição
    const response = await handler(req);

    // Adicionar headers de segurança
    const securityHeaders = getSecurityHeaders();
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  };
}

// ==========================================
// FUNÇÕES DE VERIFICAÇÃO
// ==========================================

function isBlockedIP(req: NextRequest): boolean {
  const ip = getClientIP(req);
  return SECURITY_CONFIG.blockedIPs.includes(ip);
}

function isOversizedRequest(req: NextRequest): boolean {
  const contentLength = req.headers.get('content-length');
  if (!contentLength) return false;
  
  return parseInt(contentLength) > SECURITY_CONFIG.maxRequestSize;
}

function hasSuspiciousPatterns(req: NextRequest): boolean {
  const url = req.url;
  const userAgent = req.headers.get('user-agent') || '';
  const referer = req.headers.get('referer') || '';
  
  const content = `${url} ${userAgent} ${referer}`;
  
  return SECURITY_CONFIG.suspiciousPatterns.some(pattern => 
    pattern.test(content)
  );
}

function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // Permitir requisições sem origin
  
  return SECURITY_CONFIG.allowedOrigins.includes(origin);
}

function getClientIP(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  
  return cfConnectingIP || realIP || forwardedFor?.split(',')[0] || req.ip || 'unknown';
}

// ==========================================
// SISTEMA DE DETECÇÃO DE ATAQUES
// ==========================================

class AttackDetector {
  private suspiciousActivities = new Map<string, {
    count: number;
    lastSeen: number;
    patterns: string[];
  }>();

  private readonly SUSPICIOUS_THRESHOLD = 5;
  private readonly TIME_WINDOW = 5 * 60 * 1000; // 5 minutos

  detectAttack(req: NextRequest): {
    isAttack: boolean;
    severity: 'low' | 'medium' | 'high' | 'critical';
    reason: string;
  } {
    const ip = getClientIP(req);
    const now = Date.now();
    
    // Padrões de ataque conhecidos
    const attackPatterns = [
      { pattern: /union.*select/gi, severity: 'critical', reason: 'SQL Injection attempt' },
      { pattern: /<script[^>]*>.*?<\/script>/gi, severity: 'high', reason: 'XSS attempt' },
      { pattern: /\.\.\/.*\.\.\//gi, severity: 'high', reason: 'Path traversal attempt' },
      { pattern: /eval\s*\(/gi, severity: 'high', reason: 'Code injection attempt' },
      { pattern: /admin.*login/gi, severity: 'medium', reason: 'Admin brute force attempt' },
      { pattern: /wp-admin/gi, severity: 'medium', reason: 'WordPress attack attempt' },
      { pattern: /phpmyadmin/gi, severity: 'medium', reason: 'phpMyAdmin attack attempt' },
    ];

    const url = req.url;
    const userAgent = req.headers.get('user-agent') || '';
    const content = `${url} ${userAgent}`;

    // Verificar padrões de ataque
    for (const attackPattern of attackPatterns) {
      if (attackPattern.pattern.test(content)) {
        this.recordSuspiciousActivity(ip, attackPattern.reason, now);
        
        return {
          isAttack: true,
          severity: attackPattern.severity as any,
          reason: attackPattern.reason,
        };
      }
    }

    // Verificar atividade suspeita acumulada
    const activity = this.suspiciousActivities.get(ip);
    if (activity && now - activity.lastSeen < this.TIME_WINDOW) {
      if (activity.count >= this.SUSPICIOUS_THRESHOLD) {
        return {
          isAttack: true,
          severity: 'medium',
          reason: 'Multiple suspicious activities detected',
        };
      }
    }

    return {
      isAttack: false,
      severity: 'low',
      reason: 'No threats detected',
    };
  }

  private recordSuspiciousActivity(ip: string, reason: string, timestamp: number): void {
    const activity = this.suspiciousActivities.get(ip) || {
      count: 0,
      lastSeen: timestamp,
      patterns: [],
    };

    activity.count++;
    activity.lastSeen = timestamp;
    activity.patterns.push(reason);

    this.suspiciousActivities.set(ip, activity);
  }

  getSuspiciousIPs(): Array<{ ip: string; count: number; patterns: string[] }> {
    const now = Date.now();
    const suspicious: Array<{ ip: string; count: number; patterns: string[] }> = [];

    for (const [ip, activity] of this.suspiciousActivities.entries()) {
      if (now - activity.lastSeen < this.TIME_WINDOW) {
        suspicious.push({
          ip,
          count: activity.count,
          patterns: activity.patterns,
        });
      }
    }

    return suspicious.sort((a, b) => b.count - a.count);
  }

  clearOldActivities(): void {
    const now = Date.now();
    for (const [ip, activity] of this.suspiciousActivities.entries()) {
      if (now - activity.lastSeen > this.TIME_WINDOW) {
        this.suspiciousActivities.delete(ip);
      }
    }
  }
}

// ==========================================
// INSTÂNCIA GLOBAL DO DETECTOR
// ==========================================

const attackDetector = new AttackDetector();

// Limpeza periódica de atividades antigas
setInterval(() => {
  attackDetector.clearOldActivities();
}, 60 * 1000); // A cada minuto

// ==========================================
// MIDDLEWARE DE DETECÇÃO DE ATAQUES
// ==========================================

export function withAttackDetection(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const detection = attackDetector.detectAttack(req);
    
    if (detection.isAttack) {
      // Log do ataque
      console.warn(`🚨 Security Alert: ${detection.reason}`, {
        ip: getClientIP(req),
        url: req.url,
        userAgent: req.headers.get('user-agent'),
        severity: detection.severity,
        timestamp: new Date().toISOString(),
      });

      // Resposta baseada na severidade
      switch (detection.severity) {
        case 'critical':
          return new NextResponse('Forbidden', { 
            status: 403,
            headers: {
              'X-Security-Alert': 'Critical threat detected',
            },
          });
        case 'high':
          return new NextResponse('Bad Request', { 
            status: 400,
            headers: {
              'X-Security-Alert': 'High risk activity detected',
            },
          });
        case 'medium':
          return new NextResponse('Bad Request', { 
            status: 400,
            headers: {
              'X-Security-Alert': 'Suspicious activity detected',
            },
          });
        default:
          break;
      }
    }

    return handler(req);
  };
}

// ==========================================
// FUNÇÕES DE MONITORAMENTO
// ==========================================

export function getSecurityMetrics(): {
  suspiciousIPs: Array<{ ip: string; count: number; patterns: string[] }>;
  blockedIPs: string[];
  config: SecurityConfig;
} {
  return {
    suspiciousIPs: attackDetector.getSuspiciousIPs(),
    blockedIPs: SECURITY_CONFIG.blockedIPs,
    config: SECURITY_CONFIG,
  };
}

export function blockIP(ip: string): void {
  if (!SECURITY_CONFIG.blockedIPs.includes(ip)) {
    SECURITY_CONFIG.blockedIPs.push(ip);
    console.log(`🚫 IP blocked: ${ip}`);
  }
}

export function unblockIP(ip: string): void {
  const index = SECURITY_CONFIG.blockedIPs.indexOf(ip);
  if (index > -1) {
    SECURITY_CONFIG.blockedIPs.splice(index, 1);
    console.log(`✅ IP unblocked: ${ip}`);
  }
}

// ==========================================
// EXPORTS
// ==========================================

export default {
  getSecurityHeaders,
  withSecurityHeaders,
  withAttackDetection,
  getSecurityMetrics,
  blockIP,
  unblockIP,
  SECURITY_CONFIG,
};

// Logging de inicialização
if (process.env.NODE_ENV === 'development') {
  console.log('🛡️ Advanced Security initialized:');
  console.log(`   - CSP: ${SECURITY_CONFIG.enableCSP}`);
  console.log(`   - HSTS: ${SECURITY_CONFIG.enableHSTS}`);
  console.log(`   - COOP: ${SECURITY_CONFIG.enableCOOP}`);
  console.log(`   - Attack detection: Active`);
  console.log(`   - Max request size: ${SECURITY_CONFIG.maxRequestSize / 1024 / 1024}MB`);
}
