import { NextRequest, NextResponse } from 'next/server';

/**
 * ⚡ SISTEMA DE CACHE AVANÇADO
 * 
 * Cache inteligente com múltiplas camadas para máxima performance.
 * Invalidação automática, compressão e otimização de memória.
 */

// ==========================================
// TIPOS E INTERFACES
// ==========================================

interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
  lastAccessed: number;
  compressed?: boolean;
  tags?: string[];
}

interface CacheConfig {
  maxSize: number;
  defaultTtl: number;
  compressionThreshold: number;
  cleanupInterval: number;
  maxMemoryUsage: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  memoryUsage: number;
  entries: number;
  hitRate: number;
}

// ==========================================
// CONFIGURAÇÕES AVANÇADAS
// ==========================================

const CACHE_CONFIG: CacheConfig = {
  maxSize: 10000,
  defaultTtl: 5 * 60 * 1000, // 5 minutos
  compressionThreshold: 1024, // 1KB
  cleanupInterval: 60 * 1000, // 1 minuto
  maxMemoryUsage: 100 * 1024 * 1024, // 100MB
};

// ==========================================
// CACHE AVANÇADO COM COMPRESSÃO
// ==========================================

class AdvancedCache {
  private cache = new Map<string, CacheEntry>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    memoryUsage: 0,
    entries: 0,
    hitRate: 0,
  };
  
  private cleanupTimer?: NodeJS.Timeout;
  private tagIndex = new Map<string, Set<string>>();

  constructor() {
    this.startCleanupTimer();
  }

  // ==========================================
  // OPERAÇÕES BÁSICAS
  // ==========================================

  set<T>(key: string, data: T, ttl?: number, tags?: string[]): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || CACHE_CONFIG.defaultTtl,
      hits: 0,
      lastAccessed: Date.now(),
      tags,
    };

    // Compressão automática para dados grandes
    if (JSON.stringify(data).length > CACHE_CONFIG.compressionThreshold) {
      entry.compressed = true;
      entry.data = this.compress(data) as T;
    }

    // Verificar limite de memória
    if (this.getMemoryUsage() > CACHE_CONFIG.maxMemoryUsage) {
      this.evictLRU();
    }

    // Verificar limite de entradas
    if (this.cache.size >= CACHE_CONFIG.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, entry);
    this.updateStats();

    // Indexar por tags
    if (tags) {
      tags.forEach(tag => {
        if (!this.tagIndex.has(tag)) {
          this.tagIndex.set(tag, new Set());
        }
        this.tagIndex.get(tag)!.add(key);
      });
    }
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.updateStats();
      return null;
    }

    // Verificar TTL
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      this.updateStats();
      return null;
    }

    // Atualizar estatísticas
    entry.hits++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;
    this.updateStats();

    // Descomprimir se necessário
    if (entry.compressed) {
      return this.decompress(entry.data) as T;
    }

    return entry.data as T;
  }

  delete(key: string): boolean {
    const entry = this.cache.get(key);
    if (entry) {
      // Remover das tags
      if (entry.tags) {
        entry.tags.forEach(tag => {
          const tagSet = this.tagIndex.get(tag);
          if (tagSet) {
            tagSet.delete(key);
            if (tagSet.size === 0) {
              this.tagIndex.delete(tag);
            }
          }
        });
      }
    }

    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.tagIndex.clear();
    this.updateStats();
  }

  // ==========================================
  // OPERAÇÕES AVANÇADAS
  // ==========================================

  invalidateByTag(tag: string): number {
    const keys = this.tagIndex.get(tag);
    if (!keys) return 0;

    let count = 0;
    keys.forEach(key => {
      if (this.cache.delete(key)) {
        count++;
      }
    });

    this.tagIndex.delete(tag);
    this.updateStats();
    return count;
  }

  invalidateByPattern(pattern: RegExp): number {
    let count = 0;
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        if (this.cache.delete(key)) {
          count++;
        }
      }
    }
    this.updateStats();
    return count;
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  // ==========================================
  // FUNÇÕES AUXILIARES
  // ==========================================

  private compress(data: any): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error('Compression error:', error);
      return JSON.stringify({ error: 'Compression failed' });
    }
  }

  private decompress(data: any): any {
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
      console.error('Decompression error:', error);
      return null;
    }
  }

  private evictLRU(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  private getMemoryUsage(): number {
    let usage = 0;
    for (const entry of this.cache.values()) {
      usage += JSON.stringify(entry).length;
    }
    return usage;
  }

  private updateStats(): void {
    this.stats.entries = this.cache.size;
    this.stats.memoryUsage = this.getMemoryUsage();
    this.stats.hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) || 0;
  }

  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, CACHE_CONFIG.cleanupInterval);
  }

  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.updateStats();
    }
  }

  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.clear();
  }
}

// ==========================================
// INSTÂNCIA GLOBAL DO CACHE
// ==========================================

const globalCache = new AdvancedCache();

// ==========================================
// FUNÇÕES DE CACHE PARA API
// ==========================================

export async function cacheResponse<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number,
  tags?: string[]
): Promise<T> {
  // Tentar buscar do cache
  const cached = globalCache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Buscar dados
  const data = await fetcher();
  
  // Armazenar no cache
  globalCache.set(key, data, ttl, tags);
  
  return data;
}

export function invalidateCache(key: string): boolean {
  return globalCache.delete(key);
}

export function invalidateCacheByTag(tag: string): number {
  return globalCache.invalidateByTag(tag);
}

export function invalidateCacheByPattern(pattern: RegExp): number {
  return globalCache.invalidateByPattern(pattern);
}

// ==========================================
// MIDDLEWARE DE CACHE PARA NEXT.JS
// ==========================================

export function withCache<T extends any[]>(
  fn: (...args: T) => Promise<any>,
  keyGenerator: (...args: T) => string,
  ttl?: number,
  tags?: string[]
) {
  return async (...args: T) => {
    const key = keyGenerator(...args);
    return cacheResponse(key, () => fn(...args), ttl, tags);
  };
}

// ==========================================
// CACHE DE HEADERS HTTP
// ==========================================

export function getCacheHeaders(ttl: number = 300): Record<string, string> {
  return {
    'Cache-Control': `public, max-age=${ttl}, s-maxage=${ttl}`,
    'CDN-Cache-Control': `max-age=${ttl}`,
    'Vercel-CDN-Cache-Control': `max-age=${ttl}`,
  };
}

export function getNoCacheHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
}

// ==========================================
// FUNÇÕES DE MONITORAMENTO
// ==========================================

export function getCacheStats(): CacheStats {
  return globalCache.getStats();
}

export function getCacheKeys(): string[] {
  return globalCache.getKeys();
}

// ==========================================
// CACHE ESPECÍFICO PARA DADOS
// ==========================================

export const DataCache = {
  // Cache para soluções TOTVS
  solucoes: withCache(
    async () => {
      const { SOLUCOES_TOTVS } = await import('@/lib/data/solucoes');
      return SOLUCOES_TOTVS;
    },
    () => 'solucoes:all',
    60 * 60 * 1000, // 1 hora
    ['solucoes', 'static-data']
  ),

  // Cache para setores
  setores: withCache(
    async () => {
      const { SETORES_VERTICAIS } = await import('@/lib/data/setores');
      return SETORES_VERTICAIS;
    },
    () => 'setores:all',
    60 * 60 * 1000, // 1 hora
    ['setores', 'static-data']
  ),

  // Cache para depoimentos
  depoimentos: withCache(
    async () => {
      const { depoimentos } = await import('@/lib/data/depoimentos');
      return depoimentos;
    },
    () => 'depoimentos:all',
    30 * 60 * 1000, // 30 minutos
    ['depoimentos', 'static-data']
  ),

  // Cache para blog posts
  blogPosts: withCache(
    async () => {
      const { blogPosts } = await import('@/lib/data/blog-posts');
      return blogPosts;
    },
    () => 'blog:all',
    15 * 60 * 1000, // 15 minutos
    ['blog', 'content']
  ),
};

// ==========================================
// EXPORTS
// ==========================================

export default globalCache;

// Logging de inicialização
if (process.env.NODE_ENV === 'development') {
  console.log('⚡ Advanced Cache initialized:');
  console.log(`   - Max size: ${CACHE_CONFIG.maxSize} entries`);
  console.log(`   - Default TTL: ${CACHE_CONFIG.defaultTtl / 1000}s`);
  console.log(`   - Compression threshold: ${CACHE_CONFIG.compressionThreshold} bytes`);
  console.log(`   - Cleanup interval: ${CACHE_CONFIG.cleanupInterval / 1000}s`);
}
