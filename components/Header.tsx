'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'Soluções',
      href: '/solucoes',
      dropdown: [
        { name: 'ERP', href: '/solucoes/sistema-de-gestao' },
        { name: 'Fluig', href: '/solucoes/fluig' },
        { name: 'iPaaS', href: '/solucoes/ipaas' },
        { name: 'CRM de Vendas', href: '/solucoes/crm-automacao' },
        { name: 'Techfin', href: '/solucoes/techfin' },
        { name: 'Analytics', href: '/solucoes/analytics' },
        { name: 'Assinatura Eletrônica', href: '/solucoes/assinatura-eletronica' },
        { name: 'Cloud', href: '/solucoes/cloud' },
        { name: 'RH', href: '/solucoes/rh' },
        { name: 'Atendimento e Chatbot', href: '/solucoes/atendimento-chatbot' },
        { name: 'Crédito', href: '/solucoes/credito' },
        { name: 'Inteligência Artificial', href: '/solucoes/inteligencia-artificial' },
        { name: 'Marketing Digital', href: '/solucoes/marketing-digital' },
        { name: 'Pagamentos', href: '/solucoes/pagamentos' },
        { name: 'SFA', href: '/solucoes/sfa' },
      ],
    },
    {
      name: 'Setores',
      href: '/setores',
      dropdown: [
        { name: 'Agro', href: '/setores/agro' },
        { name: 'Construção', href: '/setores/construcao' },
        { name: 'Distribuição', href: '/setores/distribuicao' },
        { name: 'Financial Services', href: '/setores/financial-services' },
        { name: 'Logística', href: '/setores/logistica' },
        { name: 'Manufatura', href: '/setores/manufatura' },
        { name: 'Prestadores de Serviços', href: '/setores/prestadores-servicos' },
      ],
    },
    { name: 'Diagnóstico', href: '/diagnostico' },
    { name: 'Blog', href: '/blog' },
    { name: 'Consultoria Estratégica', href: '/consultoria-estrategica' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-premium py-3'
          : 'bg-slate-900/90 backdrop-blur-xl py-4'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              {/* Logo OLV Oficial */}
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-futuristic transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                {/* Logo OLV - Globo com Seta */}
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Globo */}
                  <div className="absolute inset-1 border-2 border-white/40 rounded-full">
                    {/* Pontos de conexão */}
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/70 rounded-full"></div>
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/70 rounded-full"></div>
                    <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white/70 rounded-full"></div>
                    <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-white/70 rounded-full"></div>
                    {/* Linhas do globo */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/30"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-white/30"></div>
                  </div>
                  {/* Seta ascendente */}
                  <div className="absolute bottom-1 left-1 w-0 h-0 border-l-3 border-l-transparent border-r-3 border-r-transparent border-b-5 border-b-white transform rotate-45"></div>
                  <div className="absolute bottom-0.5 left-2 w-6 h-0.5 bg-white transform rotate-45"></div>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-black text-white tracking-wide">
                OLV Internacional
              </div>
              <div className="text-sm text-blue-300 font-medium tracking-wider">
                Integramos estratégia, operação e resultado
              </div>
            </div>
          </Link>

          {/* Premium Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button 
                      className="flex items-center gap-2 px-5 py-3 text-slate-300 hover:text-cyan-300 font-semibold transition-all duration-300 rounded-xl hover:bg-slate-800/50 hover:shadow-glow"
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-premium py-3 border border-slate-700/50 animate-fade-in z-50"
                        onMouseEnter={() => setOpenDropdown(item.name)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-5 py-3 text-sm text-slate-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-cyan-300 transition-all duration-300 font-medium"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-5 py-3 text-slate-300 hover:text-cyan-300 font-semibold transition-all duration-300 rounded-xl hover:bg-slate-800/50 hover:shadow-glow"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Premium CTA Button */}
          <div className="hidden lg:block">
            <Link 
              href="/diagnostico" 
              className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-glow hover:shadow-futuristic transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 tracking-wide">CONSULTORIA GRATUITA</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Premium Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all duration-300 hover:text-cyan-300"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Premium Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name
                          )
                        }
                        className="flex items-center justify-between w-full px-5 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all duration-300 font-semibold"
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === item.name && (
                        <div className="ml-4 mt-2 flex flex-col gap-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-5 py-3 text-sm text-slate-400 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-cyan-300 rounded-xl transition-all duration-300 font-medium"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-5 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all duration-300 font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/diagnostico"
                className="group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-glow hover:shadow-futuristic transition-all duration-300 hover:scale-105 mt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10 tracking-wide">CONSULTORIA GRATUITA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

