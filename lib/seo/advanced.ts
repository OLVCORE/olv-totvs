import { Metadata } from 'next';

/**
 * 🔍 SEO AVANÇADO E OTIMIZADO
 * 
 * Sistema completo de SEO com structured data,
 * meta tags dinâmicas e otimização para buscadores.
 */

// ==========================================
// CONFIGURAÇÕES DE SEO
// ==========================================

interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  author: string;
  locale: string;
  twitterHandle: string;
  facebookAppId: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
}

const SEO_CONFIG: SEOConfig = {
  siteName: 'OLV Internacional',
  siteUrl: 'https://olvinternacional.com.br',
  defaultTitle: 'OLV Internacional - Parceiro Oficial TOTVS | Soluções Empresariais',
  defaultDescription: 'Parceiro oficial TOTVS. Soluções empresariais integradas de ERP, Fluig, iPaaS, CRM, Techfin, Analytics e mais. Consultoria especializada para transformação digital.',
  defaultKeywords: [
    'TOTVS',
    'ERP',
    'CRM',
    'Fluig',
    'iPaaS',
    'Analytics',
    'Techfin',
    'soluções empresariais',
    'transformação digital',
    'consultoria',
    'OLV Internacional',
  ],
  author: 'OLV Internacional',
  locale: 'pt_BR',
  twitterHandle: '@olvinternacional',
  facebookAppId: '123456789',
  googleAnalyticsId: 'GA-XXXXXXXXX',
  googleTagManagerId: 'GTM-T3P68DR',
};

// ==========================================
// TIPOS DE METADATA
// ==========================================

interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

// ==========================================
// FUNÇÕES DE METADATA DINÂMICA
// ==========================================

export function generateMetadata(pageSEO: PageSEO = {}): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
  } = pageSEO;

  const finalTitle = title 
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;

  const finalDescription = description || SEO_CONFIG.defaultDescription;
  const finalKeywords = [...SEO_CONFIG.defaultKeywords, ...(keywords || [])];
  const finalImage = image || `${SEO_CONFIG.siteUrl}/images/og-default.jpg`;
  const finalUrl = url || SEO_CONFIG.siteUrl;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: [{ name: author || SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
    
    // Open Graph
    openGraph: {
      type,
      locale: SEO_CONFIG.locale,
      url: finalUrl,
      title: finalTitle,
      description: finalDescription,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Canonical
    alternates: {
      canonical: finalUrl,
    },
    
    // Verification
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-site-verification-code',
    },
  };
}

// ==========================================
// STRUCTURED DATA AVANÇADO
// ==========================================

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    alternateName: 'OLV',
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/logo-olv.png`,
    description: SEO_CONFIG.defaultDescription,
    
    // Informações de contato
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+55-11-99999-9999',
        contactType: 'Sales',
        areaServed: 'BR',
        availableLanguage: ['Portuguese', 'pt-BR'],
        email: 'contato@olvinternacional.com.br',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+55-11-99999-9999',
        contactType: 'Customer Support',
        areaServed: 'BR',
        availableLanguage: ['Portuguese', 'pt-BR'],
        email: 'suporte@olvinternacional.com.br',
      },
    ],
    
    // Redes sociais
    sameAs: [
      'https://www.linkedin.com/company/olv-internacional',
      'https://www.facebook.com/olvinternacional',
      'https://www.instagram.com/olvinternacional',
    ],
    
    // Endereço
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Exemplo, 123',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '01000-000',
      addressCountry: 'BR',
    },
    
    // Área de atuação
    areaServed: {
      '@type': 'Country',
      name: 'Brazil',
    },
    
    // Serviços oferecidos
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Soluções TOTVS',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sistema de Gestão (ERP)',
            description: 'Plataforma integrada de gestão empresarial completa.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fluig',
            description: 'Plataforma de automação de processos e gestão documental.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Consultoria Estratégica',
            description: 'Consultoria especializada em transformação digital empresarial.',
          },
        },
      ],
    },
    
    // Informações adicionais
    foundingDate: '2000',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 50,
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    alternateName: 'OLV',
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    
    // Organização proprietária
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      logo: `${SEO_CONFIG.siteUrl}/images/logo-olv.png`,
    },
    
    // Funcionalidades de busca
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    
    // Páginas principais
    mainEntity: {
      '@type': 'ItemList',
      name: 'Soluções TOTVS',
      description: 'Catálogo completo de soluções empresariais TOTVS',
      numberOfItems: 15,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Sistema de Gestão (ERP)',
          url: `${SEO_CONFIG.siteUrl}/solucoes/sistema-de-gestao`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Fluig',
          url: `${SEO_CONFIG.siteUrl}/solucoes/fluig`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CRM',
          url: `${SEO_CONFIG.siteUrl}/solucoes/crm`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Analytics',
          url: `${SEO_CONFIG.siteUrl}/solucoes/analytics`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Techfin',
          url: `${SEO_CONFIG.siteUrl}/solucoes/techfin`,
        },
      ],
    },
    
    // Informações técnicas
    inLanguage: 'pt-BR',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  section: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/images/logo-olv.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    articleSection: article.section,
    keywords: article.tags.join(', '),
    inLanguage: 'pt-BR',
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image: string;
  provider: string;
  areaServed: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    image: service.image,
    provider: {
      '@type': 'Organization',
      name: service.provider,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: service.areaServed,
    },
    serviceType: service.serviceType,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BRL',
    },
  };
}

// ==========================================
// SITEMAP DINÂMICO AVANÇADO
// ==========================================

export async function generateAdvancedSitemap(): Promise<Array<{
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}>> {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date();

  // Páginas principais
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diagnostico`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consultoria-estrategica`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Páginas de soluções
  const { SOLUCOES_TOTVS } = await import('@/lib/data/solucoes');
  const solucoesPages = SOLUCOES_TOTVS.map((solucao) => ({
    url: `${baseUrl}/solucoes/${solucao.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas de setores
  const { SETORES_VERTICAIS } = await import('@/lib/data/setores');
  const setoresPages = SETORES_VERTICAIS.map((setor) => ({
    url: `${baseUrl}/setores/${setor.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Páginas de blog
  const { BLOG_POSTS } = await import('@/lib/data/blog-posts');
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...solucoesPages, ...setoresPages, ...blogPages];
}

// ==========================================
// ROBOTS.TXT DINÂMICO
// ==========================================

export function generateRobotsTxt(): string {
  return `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Crawl-delay para bots específicos
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

# Bloquear bots maliciosos
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /
`.trim();
}

// ==========================================
// MANIFEST.JSON PARA PWA
// ==========================================

export function generateManifest() {
  return {
    name: SEO_CONFIG.siteName,
    short_name: 'OLV',
    description: SEO_CONFIG.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'pt-BR',
    dir: 'ltr',
  };
}

// ==========================================
// FUNÇÕES DE UTILIDADE
// ==========================================

export function generateCanonicalUrl(path: string): string {
  return `${SEO_CONFIG.siteUrl}${path}`;
}

export function generateOgImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams({
    title: title.substring(0, 60),
    ...(subtitle && { subtitle: subtitle.substring(0, 100) }),
  });
  
  return `${SEO_CONFIG.siteUrl}/api/og?${params.toString()}`;
}

export function generateTwitterCardUrl(title: string, description: string): string {
  const params = new URLSearchParams({
    title: title.substring(0, 60),
    description: description.substring(0, 200),
  });
  
  return `${SEO_CONFIG.siteUrl}/api/twitter-card?${params.toString()}`;
}

// ==========================================
// EXPORTS
// ==========================================

export default {
  generateMetadata,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateServiceSchema,
  generateAdvancedSitemap,
  generateRobotsTxt,
  generateManifest,
  generateCanonicalUrl,
  generateOgImageUrl,
  generateTwitterCardUrl,
  SEO_CONFIG,
};

// Logging de inicialização
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 Advanced SEO initialized:');
  console.log(`   - Site: ${SEO_CONFIG.siteName}`);
  console.log(`   - URL: ${SEO_CONFIG.siteUrl}`);
  console.log(`   - Locale: ${SEO_CONFIG.locale}`);
  console.log(`   - Twitter: ${SEO_CONFIG.twitterHandle}`);
}
