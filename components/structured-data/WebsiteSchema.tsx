/**
 * 🌐 WEBSITE SCHEMA (JSON-LD)
 * 
 * Dados estruturados do website para melhorar SEO.
 * Inclui search box e breadcrumbs.
 */

export function WebsiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OLV Internacional + TOTVS',
    alternateName: 'OLV TOTVS',
    url: 'https://olvinternacional.com.br',
    description:
      'Website oficial da OLV Internacional, parceiro oficial TOTVS. Soluções empresariais de tecnologia e consultoria estratégica.',
    
    // Search box (permite busca no Google)
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://olvinternacional.com.br/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    
    // Idioma
    inLanguage: 'pt-BR',
    
    // Publisher (organização responsável)
    publisher: {
      '@type': 'Organization',
      name: 'OLV Internacional',
      logo: {
        '@type': 'ImageObject',
        url: 'https://olvinternacional.com.br/images/logo-olv.png',
        width: 200,
        height: 200,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

