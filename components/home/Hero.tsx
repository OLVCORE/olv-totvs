'use client';

import Link from 'next/link';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Futuristic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.3'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #00d4ff 1px, transparent 1px),
            linear-gradient(180deg, #00d4ff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Geometric Shapes - Responsivo */}
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
          className="absolute top-10 sm:top-20 right-10 sm:right-20 w-20 h-20 sm:w-32 sm:h-32 border border-cyan-400/20 rounded-full"
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
          className="absolute bottom-20 sm:bottom-32 left-8 sm:left-16 w-16 h-16 sm:w-24 sm:h-24 border border-blue-400/20 transform rotate-45"
        />
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-lg"
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Conteúdo Principal - Responsivo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:pr-8"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-semibold tracking-wide">PARCEIRO OFICIAL TOTVS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight">
              <span className="block">Transforme sua</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                gestão empresarial
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-slate-300 mt-2 sm:mt-4">
                com tecnologia de última geração
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed">
              Integramos estratégia, tecnologia e operações para elevar a maturidade digital da sua empresa. 
              Soluções TOTVS completas com consultoria especializada OLV.
            </p>
          </motion.div>

          {/* Visual Futurista - Dashboard Estratégico - Responsivo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative lg:mt-16 mt-8"
          >
            {/* Dashboard Principal - Responsivo */}
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
              {/* Header do Dashboard - Responsivo */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs sm:text-xs text-slate-400 font-mono">OLV STRATEGIC DASHBOARD</div>
              </div>

              {/* Métricas Estratégicas - Responsivo */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-cyan-400/20">
                  <div className="text-lg sm:text-2xl font-bold text-cyan-400 mb-1">MATURIDADE</div>
                  <div className="text-xs sm:text-sm text-slate-300">Digital Elevada</div>
                  <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-4/5"></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-emerald-400/20">
                  <div className="text-lg sm:text-2xl font-bold text-emerald-400 mb-1">INTEGRAÇÃO</div>
                  <div className="text-xs sm:text-sm text-slate-300">TOTVS Completa</div>
                  <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              {/* Gráfico de Conceitos Estratégicos - Responsivo */}
              <div className="bg-slate-800/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
                <div className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">PILARES ESTRATÉGICOS</div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-xs sm:text-sm">Consultoria Especializada</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-xs sm:text-sm">Tecnologia Avançada</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-xs sm:text-sm">Resultados Comprovados</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicadores de Status - Responsivo */}
              <div className="mt-4 sm:mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-400">Sistema Online</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">OLV.TOTVS.V2.0</div>
              </div>
            </div>

            {/* Cards Flutuantes - Responsivo */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-amber-400/30 shadow-xl">
              <div className="text-xs font-semibold text-amber-400 mb-1">CONSULTORIA</div>
              <div className="text-xs sm:text-sm text-white font-medium">Premium</div>
            </div>

            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-emerald-400/30 shadow-xl">
              <div className="text-xs font-semibold text-emerald-400 mb-1">SUPORTE</div>
              <div className="text-xs sm:text-sm text-white font-medium">Contínuo</div>
            </div>
          </motion.div>
        </div>

        {/* Cards de Diferenciais - Alinhados Horizontalmente - Responsivo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {/* Consultoria Premium - Responsivo */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50 shadow-2xl hover:border-amber-400/30 transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full flex items-center justify-center border border-amber-400/30 flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                  CONSULTORIA PREMIUM OLV
                </div>
                <div className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  <span className="text-white font-medium">Estratégia, Operações, Tecnologia e Pessoas</span>
                  <span className="block mt-2 text-amber-300 font-medium">Integramos Visões em Resultados Concretos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tecnologia TOTVS Integrada - Responsivo */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-400/30 shadow-2xl hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-semibold text-cyan-400 mb-2 tracking-wide">
                  TECNOLOGIA TOTVS INTEGRADA
                </div>
                <div className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  <span className="text-white font-medium">Ecossistema completo para gestão empresarial, da ponta ao backoffice.</span> 
                  <span className="block mt-2 text-cyan-300 font-medium">Inovação, escalabilidade e inteligência para seu crescimento.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados Estratégicos - Responsivo */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-400/30 shadow-2xl hover:border-emerald-400/50 transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-semibold text-emerald-400 mb-2 tracking-wide">
                  PARCERIA OLV + TOTVS
                </div>
                <div className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  <span className="text-white font-medium">Consultoria Estratégica com Tecnologia de Classe Mundial</span>
                  <span className="block mt-2 text-emerald-300 font-medium">Transformação Digital com Resultados Mensuráveis</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Botões de CTA - Centralizados - Responsivo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-8 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <Link
            href="/diagnostico"
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
          >
            <span className="relative z-10">Agende Consultoria Gratuita</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/consultoria-estrategica"
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/5 backdrop-blur-sm text-sm sm:text-base w-full sm:w-auto"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Veja Como Funciona</span>
          </Link>
        </motion.div>
      </div>

      {/* Futuristic Scroll Indicator - Responsivo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-slate-400">
          <span className="text-xs font-medium tracking-wider">EXPLORE MAIS</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyan-400/50 rounded-full flex items-center justify-center"
          >
            <div className="w-1 h-2 sm:h-3 bg-cyan-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

