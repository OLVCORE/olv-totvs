import { MetadataRoute } from 'next';
import { generateAdvancedSitemap } from '@/lib/seo/advanced';

/**
 * 🗺️ SITEMAP DINÂMICO AVANÇADO
 * 
 * Geração automática de sitemap com todas as páginas,
 * soluções, setores e posts do blog.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const sitemapData = await generateAdvancedSitemap();
    
    return sitemapData.map(item => ({
      url: item.url,
      lastModified: item.lastModified,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    }));
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback para sitemap básico em caso de erro
    const baseUrl = 'https://olvinternacional.com.br';
    const now = new Date();
    
    return [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/sobre`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contato`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/diagnostico`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];
  }
}