/**
 * 🗺️ SITEMAP DINÂMICO
 * 
 * Gera sitemap.xml automaticamente com todas as páginas do site.
 * Melhora SEO e indexação no Google.
 */

import { MetadataRoute } from 'next';
import { SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import { SETORES_VERTICAIS } from '@/lib/data/setores';

/**
 * URL base do site
 */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://olvinternacional.com.br';

/**
 * Gerar sitemap dinâmico
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Data atual para lastModified
  const now = new Date();

  // ==========================================
  // PÁGINAS ESTÁTICAS PRINCIPAIS
  // ==========================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/diagnostico`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/consultoria-estrategica`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // ==========================================
  // PÁGINAS DE SOLUÇÕES (Dinâmicas)
  // ==========================================
  const solucoesPages: MetadataRoute.Sitemap = [
    // Página índice de soluções
    {
      url: `${BASE_URL}/solucoes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Páginas individuais de cada solução
    ...SOLUCOES_TOTVS.map((solucao) => ({
      url: `${BASE_URL}/solucoes/${solucao.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // ==========================================
  // PÁGINAS DE SETORES (Dinâmicas)
  // ==========================================
  const setoresPages: MetadataRoute.Sitemap = [
    // Página índice de setores
    {
      url: `${BASE_URL}/setores`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Páginas individuais de cada setor
    ...SETORES_VERTICAIS.map((setor) => ({
      url: `${BASE_URL}/setores/${setor.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // ==========================================
  // PÁGINAS DE BLOG (Futuro - quando implementar)
  // ==========================================
  // TODO: Quando implementar blog, adicionar URLs dinâmicas dos posts
  /*
  const blogPosts = await getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.createdAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  */

  // ==========================================
  // COMBINAR TODOS OS SITEMAPS
  // ==========================================
  return [
    ...staticPages,
    ...solucoesPages,
    ...setoresPages,
    // ...blogPages, // Quando implementar
  ];
}

/**
 * NOTAS:
 * 
 * 1. Este sitemap é gerado automaticamente no build
 * 2. Acessível em: https://olvinternacional.com.br/sitemap.xml
 * 3. Atualiza automaticamente quando novas páginas são adicionadas
 * 4. Google Search Console será notificado automaticamente
 * 
 * Prioridades (recomendações):
 * - 1.0: Homepage (página principal)
 * - 0.9: Páginas críticas (diagnóstico, soluções)
 * - 0.8: Páginas importantes (sobre, setores)
 * - 0.7: Páginas secundárias (contato, blog)
 * - 0.6: Conteúdo (posts individuais)
 * 
 * Change Frequencies:
 * - daily: Homepage
 * - weekly: Índices (soluções, setores, blog)
 * - monthly: Páginas de conteúdo estático
 * 
 * Para testar localmente:
 * npm run build
 * npm run start
 * Acessar: http://localhost:3000/sitemap.xml
 */

