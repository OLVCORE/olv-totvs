import { NextRequest, NextResponse } from 'next/server';

/**
 * 🤖 ROBOTS.TXT DINÂMICO
 * 
 * Geração automática de robots.txt com configurações
 * otimizadas para SEO e segurança.
 */

export function GET(request: NextRequest): NextResponse {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: https://olvinternacional.com.br/sitemap.xml

# Crawl-delay para bots específicos
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

User-agent: Slurp
Crawl-delay: 2

# Bloquear bots maliciosos
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: BLEXBot
Disallow: /

# Bloquear áreas administrativas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Permitir apenas páginas importantes
Allow: /solucoes/
Allow: /setores/
Allow: /blog/
Allow: /sobre
Allow: /contato
Allow: /diagnostico
`.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // 24 horas
    },
  });
}
