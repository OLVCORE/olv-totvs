/**
 * 🏢 ORGANIZATION SCHEMA (JSON-LD)
 * 
 * Dados estruturados da organização para Google Search.
 * Melhora aparência nos resultados de busca.
 */

export function OrganizationSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OLV Internacional',
    alternateName: 'OLV',
    url: 'https://olvinternacional.com.br',
    logo: 'https://olvinternacional.com.br/images/logo-olv.png',
    description:
      'Parceiro oficial TOTVS. Soluções empresariais integradas de ERP, Fluig, iPaaS, CRM, Techfin, Analytics e mais. Consultoria especializada para transformação digital.',
    
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
    
    // Redes sociais (adicionar quando disponíveis)
    sameAs: [
      'https://www.linkedin.com/company/olv-internacional',
      'https://www.facebook.com/olvinternacional',
      'https://www.instagram.com/olvinternacional',
      // Adicionar mais links de redes sociais
    ],
    
    // Endereço (adicionar quando disponível)
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
    
    // Fundação (ajustar datas reais)
    foundingDate: '2000',
    
    // Número de funcionários (ajustar se disponível)
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 50,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

