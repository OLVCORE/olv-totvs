/**
 * ⚙️ CONFIGURAÇÃO CENTRALIZADA
 * 
 * Centraliza todas as configurações de ambiente e constantes.
 * Garante acesso seguro e validado às variáveis de ambiente.
 */

// ==========================================
// VALIDAÇÃO DE ENVIRONMENT VARIABLES
// ==========================================

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getOptionalEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

// ==========================================
// CONFIGURAÇÕES DE BANCO DE DADOS
// ==========================================

export const databaseConfig = {
  uri: getRequiredEnv('MONGODB_URI'),
  dbName: getOptionalEnv('MONGODB_DB_NAME', 'olv-totvs'),
  options: {
    maxPoolSize: parseInt(getOptionalEnv('MONGODB_MAX_POOL_SIZE', '10')),
    serverSelectionTimeoutMS: parseInt(getOptionalEnv('MONGODB_TIMEOUT', '5000')),
    socketTimeoutMS: parseInt(getOptionalEnv('MONGODB_SOCKET_TIMEOUT', '45000')),
  },
} as const;

// ==========================================
// CONFIGURAÇÕES DE AUTENTICAÇÃO
// ==========================================

export const authConfig = {
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  jwtExpiresIn: getOptionalEnv('JWT_EXPIRES_IN', '7d'),
  cookieName: getOptionalEnv('AUTH_COOKIE_NAME', 'olv-auth-token'),
  cookieMaxAge: parseInt(getOptionalEnv('AUTH_COOKIE_MAX_AGE', '604800000')), // 7 dias em ms
  bcryptRounds: parseInt(getOptionalEnv('BCRYPT_ROUNDS', '12')),
} as const;

// ==========================================
// CONFIGURAÇÕES DE API
// ==========================================

export const apiConfig = {
  baseUrl: getOptionalEnv('NEXT_PUBLIC_API_URL', 'https://olvinternacional.com.br'),
  corsOrigins: getOptionalEnv('CORS_ORIGINS', 'https://olvinternacional.com.br').split(','),
  rateLimitEnabled: getOptionalEnv('RATE_LIMIT_ENABLED', 'true') === 'true',
  apiVersion: getOptionalEnv('API_VERSION', 'v1'),
} as const;

// ==========================================
// CONFIGURAÇÕES DE EMAIL
// ==========================================

export const emailConfig = {
  enabled: getOptionalEnv('EMAIL_ENABLED', 'false') === 'true',
  provider: getOptionalEnv('EMAIL_PROVIDER', 'smtp'),
  smtp: {
    host: getOptionalEnv('SMTP_HOST', ''),
    port: parseInt(getOptionalEnv('SMTP_PORT', '587')),
    user: getOptionalEnv('SMTP_USER', ''),
    password: getOptionalEnv('SMTP_PASSWORD', ''),
    secure: getOptionalEnv('SMTP_SECURE', 'false') === 'true',
  },
  from: getOptionalEnv('EMAIL_FROM', 'noreply@olvinternacional.com.br'),
  replyTo: getOptionalEnv('EMAIL_REPLY_TO', 'contato@olvinternacional.com.br'),
} as const;

// ==========================================
// CONFIGURAÇÕES DE ANALYTICS
// ==========================================

export const analyticsConfig = {
  gtmId: getOptionalEnv('NEXT_PUBLIC_GTM_ID', 'GTM-T3P68DR'),
  gaId: getOptionalEnv('NEXT_PUBLIC_GA_ID', ''),
  facebookPixelId: getOptionalEnv('NEXT_PUBLIC_FB_PIXEL_ID', ''),
  hotjarId: getOptionalEnv('NEXT_PUBLIC_HOTJAR_ID', ''),
} as const;

// ==========================================
// CONFIGURAÇÕES DE CACHE
// ==========================================

export const cacheConfig = {
  redis: {
    enabled: getOptionalEnv('REDIS_ENABLED', 'false') === 'true',
    url: getOptionalEnv('REDIS_URL', ''),
    password: getOptionalEnv('REDIS_PASSWORD', ''),
    ttl: parseInt(getOptionalEnv('REDIS_TTL', '3600')), // 1 hora
  },
  memory: {
    maxSize: parseInt(getOptionalEnv('MEMORY_CACHE_MAX_SIZE', '100')),
    ttl: parseInt(getOptionalEnv('MEMORY_CACHE_TTL', '1800')), // 30 minutos
  },
} as const;

// ==========================================
// CONFIGURAÇÕES DE UPLOAD
// ==========================================

export const uploadConfig = {
  maxFileSize: parseInt(getOptionalEnv('MAX_FILE_SIZE', '10485760')), // 10MB
  allowedTypes: getOptionalEnv('ALLOWED_FILE_TYPES', 'image/jpeg,image/png,image/webp').split(','),
  uploadPath: getOptionalEnv('UPLOAD_PATH', '/uploads'),
} as const;

// ==========================================
// CONFIGURAÇÕES DE LOGGING
// ==========================================

export const loggingConfig = {
  level: getOptionalEnv('LOG_LEVEL', 'info'),
  enabled: getOptionalEnv('LOGGING_ENABLED', 'true') === 'true',
  sentry: {
    enabled: getOptionalEnv('SENTRY_ENABLED', 'false') === 'true',
    dsn: getOptionalEnv('SENTRY_DSN', ''),
    environment: getOptionalEnv('SENTRY_ENVIRONMENT', 'production'),
  },
} as const;

// ==========================================
// CONFIGURAÇÕES DE DESENVOLVIMENTO
// ==========================================

export const devConfig = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  debug: getOptionalEnv('DEBUG', 'false') === 'true',
  mockData: getOptionalEnv('MOCK_DATA', 'false') === 'true',
} as const;

// ==========================================
// CONFIGURAÇÃO PRINCIPAL
// ==========================================

export const config = {
  // Ambiente
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(getOptionalEnv('PORT', '3000')),
  
  // Configurações específicas
  database: databaseConfig,
  auth: authConfig,
  api: apiConfig,
  email: emailConfig,
  analytics: analyticsConfig,
  cache: cacheConfig,
  upload: uploadConfig,
  logging: loggingConfig,
  dev: devConfig,
  
  // URLs e paths
  urls: {
    base: apiConfig.baseUrl,
    admin: `${apiConfig.baseUrl}/admin`,
    api: `${apiConfig.baseUrl}/api`,
    assets: `${apiConfig.baseUrl}/images`,
  },
  
  // Configurações de segurança
  security: {
    corsEnabled: true,
    helmetEnabled: true,
    rateLimitEnabled: apiConfig.rateLimitEnabled,
    csrfEnabled: getOptionalEnv('CSRF_ENABLED', 'true') === 'true',
  },
} as const;

// ==========================================
// VALIDAÇÃO DE CONFIGURAÇÃO
// ==========================================

export function validateConfig(): void {
  const errors: string[] = [];
  
  // Validar configurações críticas
  try {
    getRequiredEnv('MONGODB_URI');
  } catch (error) {
    errors.push('MONGODB_URI é obrigatória');
  }
  
  try {
    getRequiredEnv('JWT_SECRET');
  } catch (error) {
    errors.push('JWT_SECRET é obrigatória');
  }
  
  // Validar formato de URLs
  try {
    new URL(apiConfig.baseUrl);
  } catch (error) {
    errors.push('NEXT_PUBLIC_API_URL deve ser uma URL válida');
  }
  
  // Validar configurações de email se habilitado
  if (emailConfig.enabled) {
    if (!emailConfig.smtp.host) {
      errors.push('SMTP_HOST é obrigatório quando EMAIL_ENABLED=true');
    }
    if (!emailConfig.smtp.user) {
      errors.push('SMTP_USER é obrigatório quando EMAIL_ENABLED=true');
    }
  }
  
  // Validar configurações de Redis se habilitado
  if (cacheConfig.redis.enabled) {
    if (!cacheConfig.redis.url) {
      errors.push('REDIS_URL é obrigatória quando REDIS_ENABLED=true');
    }
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuração inválida:\n${errors.join('\n')}`);
  }
}

// ==========================================
// EXPORTS
// ==========================================

export default config;

// Validar configuração na inicialização
if (devConfig.isDev) {
  console.log('🔧 Configuração carregada:');
  console.log(`   - Ambiente: ${config.nodeEnv}`);
  console.log(`   - Base URL: ${config.urls.base}`);
  console.log(`   - Rate Limit: ${config.security.rateLimitEnabled ? 'Habilitado' : 'Desabilitado'}`);
  console.log(`   - Email: ${config.email.enabled ? 'Habilitado' : 'Desabilitado'}`);
  console.log(`   - Redis: ${config.cache.redis.enabled ? 'Habilitado' : 'Desabilitado'}`);
}
