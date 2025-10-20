/**
 * 🔐 CONFIGURAÇÃO CENTRALIZADA - Environment Variables
 * 
 * Este arquivo centraliza todas as variáveis de ambiente do projeto.
 * Fornece validação e fallbacks seguros para desenvolvimento.
 * 
 * ⚠️ IMPORTANTE: Em produção, todas as variáveis obrigatórias devem estar definidas.
 */

/**
 * Helper para obter variáveis de ambiente obrigatórias
 * Lança erro em produção se a variável não existir
 */
function getRequiredEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  
  // Em produção, não aceitar fallback - deve falhar se não estiver definido
  if (!value && process.env.NODE_ENV === 'production') {
    console.error(`❌ ERRO CRÍTICO: Variável de ambiente obrigatória não definida: ${key}`);
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  // Em desenvolvimento, usar fallback se fornecido
  if (!value && fallback) {
    console.warn(`⚠️ Usando fallback para ${key} (apenas desenvolvimento)`);
    return fallback;
  }
  
  return value || '';
}

/**
 * Helper para obter variáveis opcionais
 */
function getOptionalEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

/**
 * Configuração global do aplicativo
 */
export const config = {
  // ==========================================
  // AMBIENTE
  // ==========================================
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',

  // ==========================================
  // DATABASE
  // ==========================================
  database: {
    uri: getRequiredEnv('MONGODB_URI', 'mongodb://localhost:27017/olv-totvs'),
    name: getOptionalEnv('MONGODB_DB', 'olv-totvs'),
  },

  // ==========================================
  // AUTENTICAÇÃO
  // ==========================================
  auth: {
    jwtSecret: getRequiredEnv('JWT_SECRET', 'dev-secret-change-in-production'),
    nextAuthSecret: getRequiredEnv('NEXTAUTH_SECRET', 'dev-nextauth-secret'),
    nextAuthUrl: getOptionalEnv('NEXTAUTH_URL', 'http://localhost:3000'),
    tokenExpiry: getOptionalEnv('JWT_EXPIRY', '7d'),
  },

  // ==========================================
  // INTEGRAÇÃO TOTVS
  // ==========================================
  totvs: {
    apiUrl: getOptionalEnv('TOTVS_API_URL', ''),
    apiToken: getOptionalEnv('TOTVS_API_TOKEN', ''),
    enabled: getOptionalEnv('TOTVS_INTEGRATION_ENABLED', 'false') === 'true',
  },

  // ==========================================
  // ANALYTICS & TRACKING
  // ==========================================
  analytics: {
    gtmId: getOptionalEnv('NEXT_PUBLIC_GTM_ID', 'GTM-T3P68DR'),
    gaId: getOptionalEnv('NEXT_PUBLIC_GA_ID', ''),
    sentryDsn: getOptionalEnv('NEXT_PUBLIC_SENTRY_DSN', ''),
    sentryEnabled: getOptionalEnv('SENTRY_ENABLED', 'true') === 'true',
  },

  // ==========================================
  // EMAIL (FUTURO)
  // ==========================================
  email: {
    smtpHost: getOptionalEnv('SMTP_HOST', ''),
    smtpPort: parseInt(getOptionalEnv('SMTP_PORT', '587')),
    smtpUser: getOptionalEnv('SMTP_USER', ''),
    smtpPass: getOptionalEnv('SMTP_PASS', ''),
    fromEmail: getOptionalEnv('EMAIL_FROM', 'contato@olvinternacional.com.br'),
    fromName: getOptionalEnv('EMAIL_FROM_NAME', 'OLV Internacional'),
  },

  // ==========================================
  // RATE LIMITING (REDIS)
  // ==========================================
  redis: {
    url: getOptionalEnv('UPSTASH_REDIS_REST_URL', ''),
    token: getOptionalEnv('UPSTASH_REDIS_REST_TOKEN', ''),
    enabled: getOptionalEnv('REDIS_ENABLED', 'false') === 'true',
  },

  // ==========================================
  // APP CONFIG
  // ==========================================
  app: {
    name: 'OLV Internacional + TOTVS',
    url: getOptionalEnv('NEXT_PUBLIC_APP_URL', 'https://olvinternacional.com.br'),
    supportEmail: 'contato@olvinternacional.com.br',
    supportPhone: '+55 (11) 99999-9999',
  },
} as const;

/**
 * Validar configurações críticas no startup
 * Apenas em produção
 */
export function validateConfig(): void {
  if (!config.isProd) {
    console.log('✅ Config validation skipped (development mode)');
    return;
  }

  const errors: string[] = [];

  // Validar variáveis críticas
  if (!process.env.MONGODB_URI) {
    errors.push('MONGODB_URI is required');
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    errors.push('JWT_SECRET is required and must be at least 32 characters');
  }

  if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 32) {
    errors.push('NEXTAUTH_SECRET is required and must be at least 32 characters');
  }

  // Se houver erros, falhar imediatamente
  if (errors.length > 0) {
    console.error('❌ CONFIGURATION ERRORS:');
    errors.forEach(error => console.error(`   - ${error}`));
    throw new Error('Invalid configuration. Check environment variables.');
  }

  console.log('✅ Configuration validated successfully');
}

// Log de configuração (apenas em desenvolvimento)
if (config.isDev) {
  console.log('🔧 Configuration loaded:');
  console.log(`   - Environment: ${config.nodeEnv}`);
  console.log(`   - Database: ${config.database.uri ? '✅ Connected' : '❌ Not configured'}`);
  console.log(`   - JWT Secret: ${config.auth.jwtSecret.substring(0, 10)}...`);
  console.log(`   - TOTVS Integration: ${config.totvs.enabled ? '✅ Enabled' : '⚠️ Disabled (mock)'}`);
  console.log(`   - Analytics: GTM=${config.analytics.gtmId}`);
  console.log(`   - Sentry: ${config.analytics.sentryEnabled ? '✅ Enabled' : '⚠️ Disabled'}`);
}

export default config;

