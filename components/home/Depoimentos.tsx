'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Building2, User } from 'lucide-react';
import { DEPOIMENTOS } from '@/lib/data/depoimentos';

export default function Depoimentos() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 right-10 sm:top-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header - Responsivo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full mb-4 sm:mb-6"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 fill-cyan-400" />
            <span className="text-cyan-300 font-semibold text-xs sm:text-sm tracking-wider">
              NOSSA ABORDAGEM
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Metodologia Comprovada
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
            Combinamos experiência estratégica com tecnologia TOTVS para entregar resultados mensuráveis e sustentáveis
          </p>
        </motion.div>

        {/* Cards de Metodologia - Responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Diagnóstico Estratégico - Responsivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-premium h-full flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg sm:text-xl mb-1 sm:mb-2">Diagnóstico Estratégico</h3>
                  <p className="text-xs sm:text-sm text-cyan-300">Análise 360º do negócio</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 flex-1 text-sm sm:text-base">
                Mapeamento completo dos processos, identificação de gargalos e oportunidades de melhoria para definir a estratégia ideal.
              </p>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                  <span>Análise de maturidade digital</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                  <span>Mapeamento de processos críticos</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                  <span>Identificação de oportunidades</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Implementação Guiada - Responsivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-premium h-full flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg sm:text-xl mb-1 sm:mb-2">Implementação Guiada</h3>
                  <p className="text-xs sm:text-sm text-purple-300">Execução com especialistas</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 flex-1 text-sm sm:text-base">
                Desenvolvimento e implementação de soluções personalizadas com acompanhamento especializado em cada etapa.
              </p>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  <span>Especialistas certificados TOTVS</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  <span>Metodologia ágil e comprovada</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  <span>Transferência de conhecimento</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Resultados Sustentáveis - Responsivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-premium h-full flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg sm:text-xl mb-1 sm:mb-2">Resultados Sustentáveis</h3>
                  <p className="text-xs sm:text-sm text-emerald-300">Evolução contínua</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 flex-1 text-sm sm:text-base">
                Acompanhamento pós-implementação para garantir que os benefícios sejam mantidos e expandidos ao longo do tempo.
              </p>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                  <span>Suporte contínuo especializado</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                  <span>Monitoramento de performance</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                  <span>Otimização contínua</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Final - Responsivo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-lg sm:text-xl text-slate-300 mb-4 sm:mb-6">
            Quer ser o próximo caso de sucesso?
          </p>
          <motion.a
            href="/diagnostico"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-glow hover:shadow-futuristic transition-all duration-300 text-sm sm:text-base"
          >
            AGENDAR CONSULTORIA GRATUITA
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}


