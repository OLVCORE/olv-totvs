import { NextRequest, NextResponse } from 'next/server';

/**
 * 📱 MANIFEST.JSON PARA PWA
 * 
 * Manifest para Progressive Web App com configurações
 * otimizadas para instalação e experiência mobile.
 */

export function GET(request: NextRequest): NextResponse {
  const manifest = {
    name: 'OLV Internacional - Agente de Negócio TOTVS',
    short_name: 'OLV TOTVS',
    description: 'Agente de Negócio TOTVS. Soluções empresariais integradas de ERP, Fluig, iPaaS, CRM, Techfin, Analytics e mais.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'pt-BR',
    dir: 'ltr',
    
    icons: [
      {
        src: '/images/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    
    categories: ['business', 'productivity', 'finance'],
    
    shortcuts: [
      {
        name: 'Diagnóstico',
        short_name: 'Diagnóstico',
        description: 'Faça o diagnóstico da sua empresa',
        url: '/diagnostico',
        icons: [
          {
            src: '/images/icons/shortcut-diagnostico.png',
            sizes: '96x96',
          },
        ],
      },
      {
        name: 'Soluções',
        short_name: 'Soluções',
        description: 'Conheça nossas soluções TOTVS',
        url: '/solucoes',
        icons: [
          {
            src: '/images/icons/shortcut-solucoes.png',
            sizes: '96x96',
          },
        ],
      },
      {
        name: 'Contato',
        short_name: 'Contato',
        description: 'Entre em contato conosco',
        url: '/contato',
        icons: [
          {
            src: '/images/icons/shortcut-contato.png',
            sizes: '96x96',
          },
        ],
      },
    ],
    
    screenshots: [
      {
        src: '/images/screenshots/desktop-home.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Homepage Desktop',
      },
      {
        src: '/images/screenshots/mobile-home.png',
        sizes: '375x667',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Homepage Mobile',
      },
    ],
    
    related_applications: [
      {
        platform: 'webapp',
        url: 'https://olvinternacional.com.br/manifest.json',
      },
    ],
    
    prefer_related_applications: false,
  };

  return new NextResponse(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=86400', // 24 horas
    },
  });
}
