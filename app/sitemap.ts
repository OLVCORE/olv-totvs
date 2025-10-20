import { MetadataRoute } from 'next';
import { SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import { SETORES_VERTICAIS } from '@/lib/data/setores';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://olvinternacional.com.br';

  // Páginas principais
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diagnostico`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consultoria-estrategica`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Páginas de soluções
  const solucoesPages = SOLUCOES_TOTVS.map((solucao) => ({
    url: `${baseUrl}/solucoes/${solucao.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas de setores
  const setoresPages = SETORES_VERTICAIS.map((setor) => ({
    url: `${baseUrl}/setores/${setor.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...solucoesPages, ...setoresPages];
}
