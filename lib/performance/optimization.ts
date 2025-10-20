import { NextRequest, NextResponse } from 'next/server';

/**
 * 🚀 OTIMIZAÇÕES DE PERFORMANCE AVANÇADAS
 * 
 * Sistema completo de otimização para máxima velocidade
 * e eficiência de recursos.
 */

// ==========================================
// CONFIGURAÇÕES DE PERFORMANCE
// ==========================================

interface PerformanceConfig {
  enableCompression: boolean;
  enableMinification: boolean;
  enableImageOptimization: boolean;
  enableLazyLoading: boolean;
  enablePreloading: boolean;
  enableServiceWorker: boolean;
  maxConcurrentRequests: number;
  requestTimeout: number;
}

const PERFORMANCE_CONFIG: PerformanceConfig = {
  enableCompression: true,
  enableMinification: true,
  enableImageOptimization: true,
  enableLazyLoading: true,
  enablePreloading: true,
  enableServiceWorker: true,
  maxConcurrentRequests: 10,
  requestTimeout: 5000,
};

// ==========================================
// MIDDLEWARE DE COMPRESSÃO
// ==========================================

export function withCompression(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const response = await handler(req);
    
    if (!PERFORMANCE_CONFIG.enableCompression) {
      return response;
    }

    // Adicionar headers de compressão
    const headers = new Headers(response.headers);
    headers.set('Content-Encoding', 'gzip');
    headers.set('Vary', 'Accept-Encoding');
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };
}

// ==========================================
// MIDDLEWARE DE CACHE DE HEADERS
// ==========================================

export function withCacheHeaders(
  handler: (req: NextRequest) => Promise<NextResponse>,
  cacheConfig: {
    static?: number;
    dynamic?: number;
    api?: number;
  } = {}
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const response = await handler(req);
    const headers = new Headers(response.headers);
    
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    // Configurações padrão
    const defaultConfig = {
      static: 60 * 60 * 24 * 7, // 7 dias
      dynamic: 60 * 60, // 1 hora
      api: 60 * 5, // 5 minutos
    };
    
    const config = { ...defaultConfig, ...cacheConfig };
    
    // Determinar tipo de conteúdo
    if (pathname.startsWith('/api/')) {
      // APIs
      headers.set('Cache-Control', `public, max-age=${config.api}, s-maxage=${config.api}`);
    } else if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
      // Assets estáticos
      headers.set('Cache-Control', `public, max-age=${config.static}, immutable`);
    } else if (pathname.startsWith('/_next/')) {
      // Next.js assets
      headers.set('Cache-Control', `public, max-age=${config.static}, immutable`);
    } else {
      // Páginas dinâmicas
      headers.set('Cache-Control', `public, max-age=${config.dynamic}, s-maxage=${config.dynamic}`);
    }
    
    // Headers adicionais de performance
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-XSS-Protection', '1; mode=block');
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };
}

// ==========================================
// OTIMIZAÇÃO DE IMAGENS
// ==========================================

export function optimizeImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  } = {}
): string {
  if (!PERFORMANCE_CONFIG.enableImageOptimization) {
    return src;
  }

  const { width, height, quality = 85, format = 'webp' } = options;
  
  // Se for uma URL externa, usar Next.js Image Optimization
  if (src.startsWith('http')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('f', format);
    
    return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
  }
  
  return src;
}

// ==========================================
// PRELOADING INTELIGENTE
// ==========================================

export function generatePreloadLinks(resources: Array<{
  href: string;
  as: 'script' | 'style' | 'image' | 'font' | 'fetch';
  crossorigin?: boolean;
}>): string {
  if (!PERFORMANCE_CONFIG.enablePreloading) {
    return '';
  }

  return resources
    .map(resource => {
      const attrs = [
        `href="${resource.href}"`,
        `as="${resource.as}"`,
        resource.crossorigin ? 'crossorigin' : '',
      ].filter(Boolean).join(' ');
      
      return `<link rel="preload" ${attrs}>`;
    })
    .join('\n');
}

// ==========================================
// LAZY LOADING AVANÇADO
// ==========================================

export function createLazyLoadConfig(options: {
  rootMargin?: string;
  threshold?: number;
  enableIntersectionObserver?: boolean;
} = {}) {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    enableIntersectionObserver = PERFORMANCE_CONFIG.enableLazyLoading,
  } = options;

  return {
    enabled: enableIntersectionObserver,
    rootMargin,
    threshold,
    fallback: !enableIntersectionObserver,
  };
}

// ==========================================
// OTIMIZAÇÃO DE BUNDLE
// ==========================================

export function getBundleOptimizationConfig() {
  return {
    // Code splitting automático
    automaticStaticOptimization: true,
    
    // Tree shaking
    treeShaking: true,
    
    // Minificação
    minification: PERFORMANCE_CONFIG.enableMinification,
    
    // Compressão
    compression: PERFORMANCE_CONFIG.enableCompression,
    
    // Análise de bundle
    bundleAnalyzer: process.env.ANALYZE === 'true',
    
    // Otimizações específicas
    optimizations: {
      // Remover console.log em produção
      removeConsole: process.env.NODE_ENV === 'production',
      
      // Otimizar imports
      optimizeImports: true,
      
      // Dead code elimination
      deadCodeElimination: true,
      
      // Minificar CSS
      minifyCSS: true,
      
      // Minificar HTML
      minifyHTML: true,
    },
  };
}

// ==========================================
// MONITORAMENTO DE PERFORMANCE
// ==========================================

export function trackPerformanceMetrics(
  name: string,
  startTime: number,
  endTime: number,
  metadata?: Record<string, any>
): void {
  const duration = endTime - startTime;
  
  // Enviar métricas para Sentry (se disponível)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.addBreadcrumb({
      message: `Performance: ${name}`,
      category: 'performance',
      level: 'info',
      data: {
        duration,
        ...metadata,
      },
    });
  }
  
  // Log em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log(`⚡ Performance: ${name} - ${duration}ms`, metadata);
  }
}

// ==========================================
// OTIMIZAÇÃO DE REQUISIÇÕES
// ==========================================

export class RequestOptimizer {
  private requestQueue: Array<() => Promise<any>> = [];
  private activeRequests = 0;
  private maxConcurrent = PERFORMANCE_CONFIG.maxConcurrentRequests;

  async addRequest<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.activeRequests >= this.maxConcurrent || this.requestQueue.length === 0) {
      return;
    }

    this.activeRequests++;
    const request = this.requestQueue.shift();
    
    if (request) {
      try {
        await request();
      } finally {
        this.activeRequests--;
        this.processQueue();
      }
    }
  }
}

// ==========================================
// SERVICE WORKER
// ==========================================

export function generateServiceWorker(): string {
  if (!PERFORMANCE_CONFIG.enableServiceWorker) {
    return '';
  }

  return `
// Service Worker para cache offline
const CACHE_NAME = 'olv-totvs-v1';
const STATIC_CACHE = 'olv-static-v1';
const DYNAMIC_CACHE = 'olv-dynamic-v1';

// Recursos para cache estático
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Estratégia: Cache First para assets estáticos
  if (request.destination === 'image' || 
      request.destination === 'script' || 
      request.destination === 'style') {
    event.respondWith(
      caches.match(request)
        .then((response) => response || fetch(request))
    );
  }
  
  // Estratégia: Network First para páginas
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match('/offline.html'))
    );
  }
});
`.trim();
}

// ==========================================
// FUNÇÕES DE UTILIDADE
// ==========================================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==========================================
// EXPORTS
// ==========================================

export default {
  withCompression,
  withCacheHeaders,
  optimizeImageUrl,
  generatePreloadLinks,
  createLazyLoadConfig,
  getBundleOptimizationConfig,
  trackPerformanceMetrics,
  RequestOptimizer,
  generateServiceWorker,
  debounce,
  throttle,
};

// Logging de inicialização
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Performance optimizations initialized:');
  console.log(`   - Compression: ${PERFORMANCE_CONFIG.enableCompression}`);
  console.log(`   - Minification: ${PERFORMANCE_CONFIG.enableMinification}`);
  console.log(`   - Image optimization: ${PERFORMANCE_CONFIG.enableImageOptimization}`);
  console.log(`   - Lazy loading: ${PERFORMANCE_CONFIG.enableLazyLoading}`);
  console.log(`   - Preloading: ${PERFORMANCE_CONFIG.enablePreloading}`);
  console.log(`   - Service worker: ${PERFORMANCE_CONFIG.enableServiceWorker}`);
}
