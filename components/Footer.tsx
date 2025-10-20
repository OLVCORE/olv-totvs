'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const solucoes = [
    { name: 'Sistema de Gestão (ERP)', href: '/solucoes/sistema-de-gestao' },
    { name: 'Fluig', href: '/solucoes/fluig' },
    { name: 'iPaaS', href: '/solucoes/ipaas' },
    { name: 'CRM / Automação', href: '/solucoes/crm-automacao' },
    { name: 'Techfin', href: '/solucoes/techfin' },
    { name: 'Analytics', href: '/solucoes/analytics' },
  ];

  const setores = [
    { name: 'Agro', href: '/setores/agro' },
    { name: 'Construção', href: '/setores/construcao' },
    { name: 'Distribuição', href: '/setores/distribuicao' },
    { name: 'Logística', href: '/setores/logistica' },
    { name: 'Manufatura', href: '/setores/manufatura' },
    { name: 'Financial Services', href: '/setores/financial-services' },
  ];

  const institucional = [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Blog', href: '/blog' },
    { name: 'Diagnóstico', href: '/diagnostico' },
    { name: 'Contato', href: '/contato' },
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 overflow-hidden">
      {/* Futuristic Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Footer - Responsivo */}
      <div className="container-custom py-12 sm:py-16 lg:py-20 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {/* Coluna 1 - Premium Brand - Responsivo */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-glow">
                  <span className="text-white font-black text-lg sm:text-2xl tracking-wider">OLV</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl opacity-30 blur" />
              </div>
              <div>
                <div className="text-white font-black text-lg sm:text-xl tracking-wide">
                  OLV Internacional
                </div>
                <div className="text-xs sm:text-sm text-cyan-300 font-semibold tracking-wider">
                  PARCEIRO OFICIAL TOTVS
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 leading-relaxed">
              Especialistas em integrar estratégia, tecnologia e operações para
              elevar a maturidade digital de empresas com soluções de última geração.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-glow border border-slate-700/50"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-glow border border-slate-700/50"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:scale-110 hover:shadow-glow border border-slate-700/50"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-glow border border-slate-700/50"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Soluções - Responsivo */}
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6 tracking-wide">SOLUÇÕES</h3>
            <ul className="space-y-3 sm:space-y-4">
              {solucoes.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base hover:text-cyan-300 transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Setores - Responsivo */}
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6 tracking-wide">SETORES</h3>
            <ul className="space-y-3 sm:space-y-4">
              {setores.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base hover:text-cyan-300 transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contato Premium - Responsivo */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6 tracking-wide">CONTATO</h3>
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-cyan-400/30 mt-1">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white mb-1">EMAIL</div>
                  <a
                    href="mailto:parceiro-totvs@olvinternacional.com.br"
                    className="text-xs sm:text-base hover:text-cyan-300 transition-colors font-medium break-all"
                  >
                    parceiro-totvs@olvinternacional.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-emerald-400/30 mt-1">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white mb-1">TELEFONE / WHATSAPP</div>
                  <a
                    href="tel:+5511910074444"
                    className="text-xs sm:text-base hover:text-cyan-300 transition-colors font-medium block"
                  >
                    +55 (11) 91007-4444
                  </a>
                  <a
                    href="tel:+551126751446"
                    className="text-xs sm:text-base hover:text-cyan-300 transition-colors font-medium block mt-1"
                  >
                    +55 (11) 2675-1446
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-purple-400/30 mt-1">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white mb-1">ENDEREÇO</div>
                  <p className="text-xs sm:text-base font-medium">Av. Paulista, 1471 - Conj 1110<br />Bela Vista - São Paulo/SP</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Bottom Footer - Responsivo */}
      <div className="border-t border-slate-700/50 relative">
        <div className="container-custom py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base text-slate-400 font-medium mb-2">
                © {currentYear} OLV Internacional. Todos os direitos reservados.
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Powered by{' '}
                <a 
                  href="https://olvinternacional.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                >
                  OLV Internacional
                </a>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
              {institucional.slice(4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs sm:text-sm lg:text-base text-slate-400 hover:text-cyan-300 transition-all duration-300 font-medium hover:scale-105"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

