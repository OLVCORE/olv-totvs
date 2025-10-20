import { NextRequest, NextResponse } from 'next/server';

// ==========================================
// CONFIGURAÇÃO DO CACHE IN-MEMORY SIMPLES
// ==========================================
interface RateLimitCacheRecord {
  count: number;
  resetAt: number;
}

// Cache simples em memória (sem dependências externas)
const rateLimitCache = new Map<string, RateLimitCacheRecord>();

// ==========================================
// TIPOS E INTERFACES
// ==========================================
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // Tempo em milissegundos
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

/**
 * Obtém o identificador único do cliente (IP ou ID de usuário)
 */
function getClientIdentifier(request: NextRequest): string {
  // Prioriza o IP do cabeçalho Vercel, senão o IP padrão, senão um fallback
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
  return ip;
}

/**
 * Rate limiter in-memory (para desenvolvimento e ambientes simples)
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
  let record = rateLimitCache.get(identifier);

  if (!record || record.resetAt <= now) {
    // Novo período ou reset
    record = {
      count: 1,
      resetAt: now + config.windowMs,
    };
  } else {
    record.count++;
  }

  rateLimitCache.set(identifier, record);

  // Limpar entradas expiradas periodicamente
  if (rateLimitCache.size > 1000) {
    for (const [key, value] of rateLimitCache.entries()) {
      if (value.resetAt <= now) {
        rateLimitCache.delete(key);
      }
    }
  }

  return {
    success: record.count <= config.maxRequests,
    limit: config.maxRequests,
    remaining: config.maxRequests - record.count,
    reset: record.resetAt,
  };
}

/**
 * Rate limiter wrapper
 * Atualmente usa apenas in-memory
 */
async function rateLimitWrapper(
  identifier: string,
  rateLimitConfig: RateLimitConfig
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  // Por enquanto, usa apenas in-memory (funciona perfeitamente para a maioria dos casos)
  return rateLimitMemory(identifier, rateLimitConfig);
}

// ==========================================
// MAIN RATE LIMIT FUNCTION
// ==========================================

/**
 * Aplica o rate limiting a uma requisição.
 * @param request A requisição Next.js.
 * @param type O tipo de rate limit a ser aplicado ('auth', 'lead', 'api').
 * @param customConfig Configurações customizadas para o rate limit.
 * @returns NextResponse se o limite for excedido, ou null se a requisição for permitida.
 */
async function rateLimit(
  request: NextRequest,
  type: 'auth' | 'lead' | 'api',
  customConfig?: Partial<RateLimitConfig>
): Promise<NextResponse | null> {
  const baseConfig = RATE_LIMITS[type];
  const finalConfig: RateLimitConfig = {
    ...baseConfig,
    ...customConfig,
  };

  // Obter identificador do cliente
  const identifier = getClientIdentifier(request);

  // Aplicar rate limit (atualmente in-memory, funciona para maioria dos casos)
  const result = await rateLimitWrapper(identifier, finalConfig);

  // Se não passou no rate limit, retornar resposta de erro
  if (!result.success) {
    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: `Você excedeu o limite de ${finalConfig.maxRequests} requisições em ${finalConfig.windowMs / 1000} segundos. Tente novamente em ${retryAfter} segundos.`,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': finalConfig.maxRequests.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.reset.toString(),
          'Retry-After': retryAfter.toString(),
        },
      }
    );
  }

  return null; // Requisição permitida
}

// ==========================================
// CONFIGURAÇÕES DE RATE LIMIT POR TIPO
// ==========================================
const RATE_LIMITS = {
  auth: {
    maxRequests: 5, // 5 tentativas de login
    windowMs: 5 * 60 * 1000, // em 5 minutos
  },
  lead: {
    maxRequests: 3, // 3 envios de formulário de lead
    windowMs: 10 * 60 * 1000, // em 10 minutos
  },
  api: {
    maxRequests: 60, // 60 requisições gerais de API
    windowMs: 60 * 1000, // em 1 minuto
  },
};

// EXPORTS
// ==========================================

export default rateLimit;

// Logging em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('🛡️ Rate Limiting initialized:');
  console.log(`   - Mode: In-Memory (adequado para maioria dos casos)`);
  console.log(`   - Auth: ${RATE_LIMITS.auth.maxRequests} requests per ${RATE_LIMITS.auth.windowMs / 1000}s`);
  console.log(`   - Lead: ${RATE_LIMITS.lead.maxRequests} requests per ${RATE_LIMITS.lead.windowMs / 1000}s`);
  console.log(`   - API: ${RATE_LIMITS.api.maxRequests} requests per ${RATE_LIMITS.api.windowMs / 1000}s`);
}
