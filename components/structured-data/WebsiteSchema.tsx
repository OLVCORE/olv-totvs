/**
 * 🌐 WEBSITE SCHEMA (JSON-LD)
 * 
 * Dados estruturados do website para Google Search.
 * Melhora indexação e aparência nos resultados.
 */

export function WebsiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OLV Internacional',
    alternateName: 'OLV',
    url: 'https://olvinternacional.com.br',
    description:
      'Parceiro oficial TOTVS. Soluções empresariais integradas de ERP, Fluig, iPaaS, CRM, Techfin, Analytics e mais. Consultoria especializada para transformação digital.',
    
    // Organização proprietária
    publisher: {
      '@type': 'Organization',
      name: 'OLV Internacional',
      url: 'https://olvinternacional.com.br',
      logo: 'https://olvinternacional.com.br/images/logo-olv.png',
    },
    
    // Funcionalidades de busca
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://olvinternacional.com.br/blog?q={search_term_string}',
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
          url: 'https://olvinternacional.com.br/solucoes/erp',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Fluig',
          url: 'https://olvinternacional.com.br/solucoes/fluig',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CRM',
          url: 'https://olvinternacional.com.br/solucoes/crm',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Analytics',
          url: 'https://olvinternacional.com.br/solucoes/analytics',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Techfin',
          url: 'https://olvinternacional.com.br/solucoes/techfin',
        },
      ],
    },
    
    // Informações técnicas
    inLanguage: 'pt-BR',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'OLV Internacional',
    },
    
    // Breadcrumb para navegação
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://olvinternacional.com.br',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Soluções',
          item: 'https://olvinternacional.com.br/solucoes',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Setores',
          item: 'https://olvinternacional.com.br/setores',
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
