/**
 * 🛡️ RATE LIMITING - Proteção contra Abuse
 * 
 * Sistema de rate limiting com suporte para Redis (produção) 
 * ou in-memory (desenvolvimento).
 * 
 * Protege APIs contra:
 * - Brute force attacks
 * - Spam de formulários
 * - DDoS básico
 */

import { NextRequest, NextResponse } from 'next/server';
import { config } from './config';

// ==========================================
// IN-MEMORY RATE LIMITER (Desenvolvimento)
// ==========================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

/**
 * Cache in-memory para desenvolvimento
 * Em produção, usar Redis (Upstash)
 */
const memoryCache = new Map<string, RateLimitRecord>();

/**
 * Limpar registros expirados periodicamente (evitar memory leak)
 */
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryCache.entries()) {
      if (now > record.resetAt) {
        memoryCache.delete(key);
      }
    }
  }, 60000); // Limpar a cada 1 minuto
}

// ==========================================
// RATE LIMIT CONFIGURATIONS
// ==========================================

export interface RateLimitConfig {
  /**
   * Número máximo de requisições
   */
  maxRequests: number;
  
  /**
   * Janela de tempo em milissegundos
   */
  windowMs: number;
  
  /**
   * Mensagem de erro customizada
   */
  message?: string;
}

/**
 * Configurações pré-definidas
 */
export const RATE_LIMITS = {
  /**
   * Para endpoints de autenticação (login, registro)
   * Mais restritivo para prevenir brute force
   */
  auth: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutos
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  } as RateLimitConfig,

  /**
   * Para criação de leads (diagnóstico)
   * Previne spam de formulários
   */
  lead: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hora
    message: 'Você já enviou vários diagnósticos recentemente. Aguarde um pouco.',
  } as RateLimitConfig,

  /**
   * Para APIs gerais (GET requests)
   * Mais permissivo
   */
  api: {
    maxRequests: 60,
    windowMs: 60 * 1000, // 1 minuto
    message: 'Muitas requisições. Tente novamente em alguns instantes.',
  } as RateLimitConfig,

  /**
   * Para endpoints sensíveis (admin)
   * Muito restritivo
   */
  admin: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minuto
    message: 'Limite de requisições administrativas excedido.',
  } as RateLimitConfig,
} as const;

// ==========================================
// RATE LIMITER FUNCTIONS
// ==========================================

/**
 * Obter identificador único do cliente (IP address)
 */
function getClientIdentifier(request: NextRequest): string {
  // Tentar obter IP real (considerando proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return ip;
}

/**
 * Rate limiter in-memory (para desenvolvimento ou baixo tráfego)
 */
function rateLimitMemory(
  identifier: string,
  config: RateLimitConfig
): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
} {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;
  const record = memoryCache.get(key);

  // Se não existe ou expirou, criar novo
  if (!record || now > record.resetAt) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    memoryCache.set(key, newRecord);
    
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: newRecord.resetAt,
    };
  }

  // Se atingiu o limite
  if (record.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  // Incrementar contador
  record.count++;
  memoryCache.set(key, record);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - record.count,
    reset: record.resetAt,
  };
}

/**
 * Rate limiter com Redis (Upstash)
 * Para produção com alto tráfego
 * 
 * NOTA: Requer instalação de @upstash/ratelimit
 * npm install @upstash/ratelimit @upstash/redis
 */
async function rateLimitRedis(
  identifier: string,
  rateLimitConfig: RateLimitConfig
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  // Se Redis não estiver configurado, usar in-memory
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!redisUrl || !redisToken) {
    return rateLimitMemory(identifier, rateLimitConfig);
  }

  try {
    // Dynamic import para não quebrar se pacote não estiver instalado
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis } = await import('@upstash/redis');

    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(
        rateLimitConfig.maxRequests,
        `${rateLimitConfig.windowMs}ms`
      ),
      analytics: true,
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

    return {
      success,
      limit,
      remaining,
      reset: reset * 1000, // Converter para ms
    };
  } catch (error) {
    console.error('❌ Redis rate limit error, falling back to memory:', error);
    return rateLimitMemory(identifier, rateLimitConfig);
  }
}

// ==========================================
// MAIN RATE LIMIT FUNCTION
// ==========================================

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  response?: NextResponse;
}

/**
 * Aplicar rate limiting em uma requisição
 * 
 * @param request - NextRequest
 * @param configName - Nome da configuração (auth, lead, api, admin)
 * @param customConfig - Configuração customizada (opcional)
 * @returns RateLimitResult
 * 
 * @example
 * ```typescript
 * // Em uma API route
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await rateLimit(request, 'auth');
 *   
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response;
 *   }
 *   
 *   // Processar requisição normalmente
 * }
 * ```
 */
export async function rateLimit(
  request: NextRequest,
  configName: keyof typeof RATE_LIMITS,
  customConfig?: Partial<RateLimitConfig>
): Promise<RateLimitResult> {
  // Obter configuração
  const baseConfig = RATE_LIMITS[configName];
  const finalConfig: RateLimitConfig = {
    ...baseConfig,
    ...customConfig,
  };

  // Obter identificador do cliente
  const identifier = getClientIdentifier(request);

  // Aplicar rate limit (Redis se disponível, senão in-memory)
  // rateLimitRedis fará fallback automático se Redis não estiver configurado
  const result = await rateLimitRedis(identifier, finalConfig);

  // Se não passou no rate limit, retornar resposta de erro
  if (!result.success) {
    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

    return {
      ...result,
      response: NextResponse.json(
        {
          error: finalConfig.message || 'Muitas requisições. Tente novamente mais tarde.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': result.reset.toString(),
            'Retry-After': retryAfter.toString(),
          },
        }
      ),
    };
  }

  // Passou no rate limit
  return {
    ...result,
  };
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Adicionar headers de rate limit na resposta (informativo)
 */
export function addRateLimitHeaders(
  response: NextResponse,
  result: RateLimitResult
): NextResponse {
  response.headers.set('X-RateLimit-Limit', result.limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', result.reset.toString());
  
  return response;
}

/**
 * Resetar rate limit para um identificador específico
 * Útil para testes ou casos especiais
 */
export function resetRateLimit(identifier: string): void {
  const keys = Array.from(memoryCache.keys()).filter(key => 
    key.includes(identifier)
  );
  
  keys.forEach(key => memoryCache.delete(key));
  
  console.log(`✅ Rate limit resetado para: ${identifier}`);
}

/**
 * Obter estatísticas de rate limit (admin)
 */
export function getRateLimitStats(): {
  totalRecords: number;
  records: Array<{ identifier: string; count: number; resetAt: number }>;
} {
  const records = Array.from(memoryCache.entries()).map(([key, record]) => ({
    identifier: key.replace('ratelimit:', ''),
    count: record.count,
    resetAt: record.resetAt,
  }));

  return {
    totalRecords: records.length,
    records,
  };
}

// ==========================================
// EXPORTS
// ==========================================

export default rateLimit;

// Logging em desenvolvimento
if (config.isDev) {
  const redisConfigured = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  console.log('🛡️ Rate Limiting initialized:');
  console.log(`   - Mode: ${redisConfigured ? 'Redis (if @upstash/ratelimit installed)' : 'In-Memory'}`);
  console.log(`   - Auth: ${RATE_LIMITS.auth.maxRequests} requests per ${RATE_LIMITS.auth.windowMs / 1000}s`);
  console.log(`   - Lead: ${RATE_LIMITS.lead.maxRequests} requests per ${RATE_LIMITS.lead.windowMs / 1000}s`);
  console.log(`   - API: ${RATE_LIMITS.api.maxRequests} requests per ${RATE_LIMITS.api.windowMs / 1000}s`);
}

