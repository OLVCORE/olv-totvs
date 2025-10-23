'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import { motion } from 'framer-motion';

export default function SolucoesPage() {
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <>
      {/* Premium Hero */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="tracking-wide">PORTFÓLIO COMPLETO</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block">Soluções</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                TOTVS
              </span>
            </h1>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium max-w-4xl mx-auto">
              Transforme sua gestão com o portfólio mais completo de soluções
              empresariais do mercado. ERP, processos, integração, CRM e muito mais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Grid de Soluções */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="group block h-full"
                >
                  <div className="card-premium hover:shadow-futuristic transition-all duration-300 h-full relative overflow-hidden">
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

                    <p className="text-slate-300 mb-6 line-clamp-3 text-base leading-relaxed">
                      {solucao.descricao}
                    </p>

                    {/* Funcionalidades Preview */}
                    <div className="mb-6">
                      <div className="text-sm font-bold text-slate-400 mb-3 tracking-wider">
                        PRINCIPAIS FUNCIONALIDADES
                      </div>
                      <ul className="space-y-2">
                        {solucao.funcionalidades.slice(0, 3).map((func, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-slate-300 flex items-start gap-2 font-medium"
                          >
                            <span className="text-cyan-400 mt-0.5 font-bold">▸</span>
                            {func}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Premium CTA */}
                    <div className="flex items-center gap-3 text-cyan-300 font-bold text-sm group-hover:gap-4 transition-all duration-300 mt-auto pt-4 border-t border-slate-700/50">
                      <span className="tracking-wide">CONHECER SOLUÇÃO</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Premium Hover Border */}
                    <div className="absolute inset-0 border border-cyan-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-dots" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-rose-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="card-premium text-center relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
                
                <div className="relative z-10">
                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                    <span className="block">Não Sabe Qual Solução</span>
                    <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                      É Ideal para Você?
                    </span>
                  </h2>
                  <p className="text-xl mb-10 text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
                    Faça um diagnóstico gratuito e descubra as melhores soluções para o
                    seu negócio
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/diagnostico" 
                      className="group relative inline-flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 px-10 py-5 rounded-2xl font-black text-xl shadow-premium hover:shadow-futuristic transition-all"
                    >
                      <span className="relative z-10 tracking-wide">DIAGNÓSTICO GRATUITO</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
