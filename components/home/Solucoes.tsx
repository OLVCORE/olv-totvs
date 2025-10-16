'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import { motion } from 'framer-motion';

const Solucoes = () => {
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <section id="solucoes" className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-pattern-grid" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 right-20 w-24 h-24 border border-cyan-400/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-32 left-16 w-16 h-16 border border-blue-400/20 transform rotate-45"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="tracking-wide">SOLUÇÕES PREMIUM</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            <span className="block">Nossas</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Soluções TOTVS
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Portfólio completo de produtos integrados para transformar a gestão
            do seu negócio com tecnologia de última geração
          </p>
        </motion.div>

        {/* Premium Grid de Soluções */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SOLUCOES_TOTVS.map((solucao, index) => (
            <motion.div
              key={solucao.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                href={`/solucoes/${solucao.slug}`}
                className="group block"
              >
                <div className="card-premium hover:shadow-futuristic transition-all duration-300 relative overflow-hidden">
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Premium Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-glow"
                         style={{
                           background: `linear-gradient(135deg, ${solucao.cor}20, ${solucao.cor}10)`,
                           border: `2px solid ${solucao.cor}30`,
                           color: solucao.cor,
                         }}>
                      {getIcon(solucao.icone)}
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                  </div>

                  {/* Premium Content */}
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300 tracking-wide">
                    {solucao.nome}
                  </h3>
                  <p className="text-slate-300 text-base mb-6 line-clamp-3 leading-relaxed">
                    {solucao.subtitulo}
                  </p>

                  {/* Premium CTA */}
                  <div className="flex items-center gap-3 text-cyan-300 font-bold text-base group-hover:gap-4 transition-all duration-300">
                    <span>EXPLORAR SOLUÇÃO</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Premium Badge */}
                  {index < 3 && (
                    <div className="absolute top-6 right-6">
                      <div className="badge badge-primary text-xs font-bold tracking-wide">
                        POPULAR
                      </div>
                    </div>
                  )}

                  {/* Premium Hover Effect */}
                  <div className="absolute inset-0 border border-cyan-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link 
            href="/solucoes" 
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl shadow-glow hover:shadow-futuristic transition-all duration-300 hover:scale-105 text-lg tracking-wide"
          >
            <span className="relative z-10">VER TODAS AS SOLUÇÕES</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Solucoes;

