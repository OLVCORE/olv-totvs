'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { SETORES_VERTICAIS } from '@/lib/data/setores';
import { motion } from 'framer-motion';

export default function SetoresPage() {
  const setorIcons: Record<string, string> = {
    agro: 'Tractor',
    construcao: 'Building2',
    distribuicao: 'Package',
    'financial-services': 'Banknote',
    logistica: 'Truck',
    manufatura: 'Factory',
    servicos: 'Briefcase',
  };

  const getIcon = (setorId: string) => {
    const iconName = setorIcons[setorId] || 'Building2';
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  return (
    <>
      {/* Premium Hero */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="tracking-wide">ESPECIALIZAÇÃO VERTICAL</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block">Setores</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Especializados
              </span>
            </h1>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium max-w-4xl mx-auto">
              Expertise vertical para atender as necessidades específicas do seu
              segmento com soluções personalizadas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Grid de Setores */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-dots" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SETORES_VERTICAIS.map((setor, index) => (
              <motion.div
                key={setor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link
                  href={`/setores/${setor.slug}`}
                  className="group block h-full"
                >
                  <div className="card-premium hover:shadow-futuristic transition-all duration-300 h-full relative overflow-hidden">
                    {/* Premium Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Premium Icon */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-glow"
                           style={{
                             background: `linear-gradient(135deg, #a855f720, #e91e6310)`,
                             border: `2px solid #a855f730`,
                             color: '#a855f7',
                           }}>
                        {getIcon(setor.id)}
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                    </div>

                    {/* Premium Content */}
                    <h3 className="text-2xl font-black text-white mb-3 text-center group-hover:text-purple-300 transition-colors duration-300 tracking-wide">
                      {setor.nome}
                    </h3>

                    <p className="text-slate-300 text-center mb-6 line-clamp-3 text-base leading-relaxed">
                      {setor.descricao}
                    </p>

                    {/* Principais Desafios Preview */}
                    <div className="mb-6">
                      <div className="text-sm font-bold text-slate-400 mb-3 tracking-wider">
                        PRINCIPAIS DESAFIOS
                      </div>
                      <ul className="space-y-2">
                        {setor.desafios.slice(0, 3).map((desafio, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-slate-300 flex items-start gap-2 font-medium"
                          >
                            <span className="text-purple-400 mt-0.5 font-bold">▸</span>
                            {desafio}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Premium CTA */}
                    <div className="flex items-center justify-center gap-3 text-purple-300 font-bold text-sm group-hover:gap-4 transition-all duration-300 mt-auto pt-4 border-t border-slate-700/50">
                      <span className="tracking-wide">EXPLORAR SETOR</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Premium Hover Border */}
                    <div className="absolute inset-0 border border-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"
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
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="card-premium text-center relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
                
                <div className="relative z-10">
                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                    <span className="block">Seu Setor Não Está</span>
                    <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Listado?
                    </span>
                  </h2>
                  <p className="text-xl mb-10 text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
                    Temos experiência em diversos segmentos. Entre em contato e
                    descubra como podemos ajudar
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/contato" 
                      className="group relative inline-flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 px-10 py-5 rounded-2xl font-black text-xl shadow-premium hover:shadow-futuristic transition-all"
                    >
                      <span className="relative z-10 tracking-wide">FALAR COM ESPECIALISTA</span>
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
