import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { GoogleAdsOptimizer } from '@/components/shared/GoogleAdsOptimizer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OLV Internacional + TOTVS | Soluções Empresariais de Tecnologia',
  description:
    'Parceiro oficial TOTVS. Soluções integradas de ERP, Fluig, iPaaS, CRM, Techfin, Analytics e mais. Eleve a maturidade digital da sua empresa.',
  keywords: [
    'TOTVS',
    'ERP',
    'Fluig',
    'iPaaS',
    'CRM',
    'Gestão Empresarial',
    'OLV Internacional',
    'Transformação Digital',
    'Consultoria',
  ],
  authors: [{ name: 'OLV Internacional' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0087ff',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://olvinternacional.com.br',
    siteName: 'OLV Internacional + TOTVS',
    title: 'OLV Internacional + TOTVS | Soluções Empresariais',
    description: 'Parceiro oficial TOTVS. Transforme sua gestão com tecnologia de ponta.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OLV Internacional + TOTVS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OLV Internacional + TOTVS',
    description: 'Soluções empresariais integradas',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T3P68DR');`
          }}
        />
        {/* LGPD Banner */}
        <meta name="adopt-website-id" content="1d3503e5-6e70-4135-906f-6c9840d27875" />
        <script 
          src="//tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875" 
          className="adopt-injector"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3P68DR"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <GoogleAdsOptimizer />
      </body>
    </html>
  );
}

