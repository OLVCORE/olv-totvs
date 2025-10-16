'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { SETORES_VERTICAIS } from '@/lib/data/setores';
import { motion } from 'framer-motion';

const Setores = () => {
  // Mapeamento de ícones para setores
  const setorIcons: Record<string, string> = {
    agro: 'Tractor',
    construcao: 'Building2',
    distribuicao: 'Package',
    'financial-services': 'Building',
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
    <section id="setores" className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-hexagon" />
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-32 right-24 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="tracking-wide">ESPECIALIZAÇÃO VERTICAL</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            <span className="block">Soluções por</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Setor
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Especialização vertical para atender as necessidades específicas do
            seu segmento com tecnologia de ponta
          </p>
        </motion.div>

        {/* Premium Grid de Setores */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {SETORES_VERTICAIS.map((setor, index) => (
            <motion.div
              key={setor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -12, scale: 1.05 }}
            >
              <Link
                href={`/setores/${setor.slug}`}
                className="group block"
              >
                <div className="card-premium text-center hover:shadow-futuristic transition-all duration-300 relative overflow-hidden h-full">
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Premium Icon */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center text-purple-300 group-hover:text-pink-300 transition-all duration-300 shadow-glow group-hover:shadow-futuristic group-hover:scale-110 border border-purple-400/30">
                      {getIcon(setor.id)}
                    </div>
                    <div className="absolute inset-0 -m-4 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  </div>

                  {/* Premium Content */}
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 tracking-wide">
                    {setor.nome}
                  </h3>

                  {/* Premium CTA */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4">
                    <div className="inline-flex items-center gap-2 text-purple-300 font-bold text-sm group-hover:gap-3">
                      <span>EXPLORAR</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Premium Hover Border */}
                  <div className="absolute inset-0 border-2 border-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Não encontrou seu setor? Temos soluções personalizadas para todos os
            segmentos.
          </p>
          <Link 
            href="/contato" 
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black rounded-2xl shadow-glow hover:shadow-futuristic transition-all duration-300 hover:scale-105 text-lg tracking-wide"
          >
            <span className="relative z-10">FALE COM ESPECIALISTA</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Setores;
