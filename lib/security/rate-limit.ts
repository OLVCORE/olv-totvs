import { NextRequest, NextResponse } from 'next/server';

/**
 * 🛡️ RATE LIMITING AVANÇADO
 * 
 * Sistema de proteção contra abuse com múltiplas camadas.
 * Proteção contra DDoS, brute force e ataques automatizados.
 */

// ==========================================
// CONFIGURAÇÕES AVANÇADAS
// ==========================================

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs?: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitRecord {
  count: number;
  resetAt: number;
  blockedUntil?: number;
  lastRequestAt: number;
  userAgent?: string;
  fingerprint: string;
}

interface SecurityMetrics {
  totalRequests: number;
  blockedRequests: number;
  suspiciousActivity: number;
  lastCleanup: number;
}

// ==========================================
// CACHE AVANÇADO COM LIMPEZA AUTOMÁTICA
// ==========================================

class AdvancedRateLimitCache {
  private cache = new Map<string, RateLimitRecord>();
  private metrics: SecurityMetrics = {
    totalRequests: 0,
    blockedRequests: 0,
    suspiciousActivity: 0,
    lastCleanup: Date.now(),
  };

  // Configurações de limpeza
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutos
  private readonly MAX_CACHE_SIZE = 10000;
  private readonly MAX_AGE = 60 * 60 * 1000; // 1 hora

  constructor() {
    // Limpeza automática periódica
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  get(key: string): RateLimitRecord | undefined {
    const record = this.cache.get(key);
    if (record && record.resetAt <= Date.now()) {
      this.cache.delete(key);
      return undefined;
    }
    return record;
  }

  set(key: string, record: RateLimitRecord): void {
    this.cache.set(key, record);
    
    // Limpeza preventiva se cache muito grande
    if (this.cache.size > this.MAX_CACHE_SIZE) {
      this.cleanup();
    }
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  private cleanup(): void {
    const now = Date.now();
    const cutoff = now - this.MAX_AGE;
    
    for (const [key, record] of this.cache.entries()) {
      if (record.resetAt <= now || record.lastRequestAt < cutoff) {
        this.cache.delete(key);
      }
    }
    
    this.metrics.lastCleanup = now;
  }

  getMetrics(): SecurityMetrics {
    return { ...this.metrics };
  }

  incrementBlocked(): void {
    this.metrics.blockedRequests++;
  }

  incrementSuspicious(): void {
    this.metrics.suspiciousActivity++;
  }

  incrementTotal(): void {
    this.metrics.totalRequests++;
  }
}

// ==========================================
// INSTÂNCIA GLOBAL DO CACHE
// ==========================================

const rateLimitCache = new AdvancedRateLimitCache();

// ==========================================
// CONFIGURAÇÕES POR TIPO DE ENDPOINT
// ==========================================

const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  // Autenticação - muito restritivo
  auth: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutos
    blockDurationMs: 30 * 60 * 1000, // 30 minutos de bloqueio
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },
  
  // Login - extremamente restritivo
  login: {
    maxRequests: 3,
    windowMs: 15 * 60 * 1000, // 15 minutos
    blockDurationMs: 60 * 60 * 1000, // 1 hora de bloqueio
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },
  
  // Formulários de lead - moderado
  lead: {
    maxRequests: 3,
    windowMs: 10 * 60 * 1000, // 10 minutos
    blockDurationMs: 20 * 60 * 1000, // 20 minutos de bloqueio
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },
  
  // API geral - mais permissivo
  api: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minuto
    blockDurationMs: 5 * 60 * 1000, // 5 minutos de bloqueio
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },
  
  // Upload de arquivos - restritivo
  upload: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hora
    blockDurationMs: 2 * 60 * 60 * 1000, // 2 horas de bloqueio
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },
  
  // Busca - moderado
  search: {
    maxRequests: 20,
    windowMs: 60 * 1000, // 1 minuto
    blockDurationMs: 10 * 60 * 1000, // 10 minutos de bloqueio
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },
};

// ==========================================
// FUNÇÕES AUXILIARES AVANÇADAS
// ==========================================

function getClientIdentifier(request: NextRequest): string {
  // Prioridade: IP real > IP proxy > fallback
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0] || request.ip || 'unknown';
  
  // Adicionar User-Agent para fingerprinting mais preciso
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  return `${ip}:${userAgent}`;
}

function generateFingerprint(request: NextRequest): string {
  const ip = getClientIdentifier(request);
  const userAgent = request.headers.get('user-agent') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Fingerprint mais sofisticado
  return btoa(`${ip}:${userAgent}:${acceptLanguage}`).substring(0, 32);
}

function isSuspiciousRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detectar bots e scrapers conhecidos
  const suspiciousPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /java/i,
    /postman/i, /insomnia/i, /httpie/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

function calculateDynamicLimit(config: RateLimitConfig, record?: RateLimitRecord): number {
  if (!record) return config.maxRequests;
  
  // Reduzir limite para IPs com histórico de abuse
  if (record.count > config.maxRequests * 0.8) {
    return Math.max(1, Math.floor(config.maxRequests * 0.5));
  }
  
  return config.maxRequests;
}

// ==========================================
// FUNÇÃO PRINCIPAL DE RATE LIMITING
// ==========================================

export async function advancedRateLimit(
  request: NextRequest,
  type: keyof typeof RATE_LIMIT_CONFIGS,
  customConfig?: Partial<RateLimitConfig>
): Promise<NextResponse | null> {
  
  const baseConfig = RATE_LIMIT_CONFIGS[type];
  if (!baseConfig) {
    console.error(`Rate limit config not found for type: ${type}`);
    return null;
  }
  
  const config: RateLimitConfig = {
    ...baseConfig,
    ...customConfig,
  };
  
  const identifier = getClientIdentifier(request);
  const fingerprint = generateFingerprint(request);
  const now = Date.now();
  
  // Incrementar métricas
  rateLimitCache.incrementTotal();
  
  // Verificar se é requisição suspeita
  if (isSuspiciousRequest(request)) {
    rateLimitCache.incrementSuspicious();
  }
  
  // Obter registro existente
  let record = rateLimitCache.get(identifier);
  
  // Verificar se está bloqueado
  if (record?.blockedUntil && record.blockedUntil > now) {
    const remainingBlockTime = Math.ceil((record.blockedUntil - now) / 1000);
    
    rateLimitCache.incrementBlocked();
    
    return NextResponse.json(
      {
        error: 'Temporarily Blocked',
        message: `IP bloqueado por ${remainingBlockTime} segundos devido a atividade suspeita.`,
        retryAfter: remainingBlockTime,
      },
      {
        status: 429,
        headers: {
          'Retry-After': remainingBlockTime.toString(),
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': record.resetAt.toString(),
          'X-RateLimit-Blocked': 'true',
        },
      }
    );
  }
  
  // Criar ou atualizar registro
  if (!record || record.resetAt <= now) {
    record = {
      count: 1,
      resetAt: now + config.windowMs,
      lastRequestAt: now,
      userAgent: request.headers.get('user-agent') || undefined,
      fingerprint,
    };
  } else {
    record.count++;
    record.lastRequestAt = now;
  }
  
  // Calcular limite dinâmico
  const dynamicLimit = calculateDynamicLimit(config, record);
  
  // Verificar se excedeu o limite
  if (record.count > dynamicLimit) {
    // Bloquear por tempo configurado
    record.blockedUntil = now + (config.blockDurationMs || config.windowMs);
    
    rateLimitCache.set(identifier, record);
    rateLimitCache.incrementBlocked();
    
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    
    return NextResponse.json(
      {
        error: 'Rate Limit Exceeded',
        message: `Você excedeu o limite de ${dynamicLimit} requisições em ${config.windowMs / 1000} segundos.`,
        retryAfter,
        limit: dynamicLimit,
        remaining: 0,
        reset: record.resetAt,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': dynamicLimit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': record.resetAt.toString(),
          'X-RateLimit-Blocked': 'true',
        },
      }
    );
  }
  
  // Salvar registro atualizado
  rateLimitCache.set(identifier, record);
  
  // Retornar headers informativos
  const remaining = Math.max(0, dynamicLimit - record.count);
  const retryAfter = Math.ceil((record.resetAt - now) / 1000);
  
  // Adicionar headers de rate limit (mesmo quando permitido)
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', dynamicLimit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', record.resetAt.toString());
  
  return null; // Requisição permitida
}

// ==========================================
// FUNÇÕES DE MONITORAMENTO
// ==========================================

export function getRateLimitMetrics(): SecurityMetrics {
  return rateLimitCache.getMetrics();
}

export function clearRateLimitCache(): void {
  rateLimitCache['cache'].clear();
}

export function getRateLimitStatus(identifier: string): RateLimitRecord | null {
  return rateLimitCache.get(identifier) || null;
}

// ==========================================
// MIDDLEWARE WRAPPER PARA NEXT.JS
// ==========================================

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  type: keyof typeof RATE_LIMIT_CONFIGS,
  customConfig?: Partial<RateLimitConfig>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const rateLimitResponse = await advancedRateLimit(req, type, customConfig);
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    return handler(req);
  };
}

// ==========================================
// EXPORTS
// ==========================================

export default advancedRateLimit;

// Logging em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('🛡️ Advanced Rate Limiting initialized:');
  console.log(`   - Cache: Advanced with auto-cleanup`);
  console.log(`   - Configs: ${Object.keys(RATE_LIMIT_CONFIGS).length} types`);
  console.log(`   - Max cache size: 10,000 entries`);
  console.log(`   - Cleanup interval: 5 minutes`);
}
