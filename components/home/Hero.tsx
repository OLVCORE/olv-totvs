'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-32 pb-20 overflow-hidden">
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

      {/* Floating Geometric Shapes */}
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
          className="absolute top-20 right-20 w-32 h-32 border border-cyan-400/20 rounded-full"
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
          className="absolute bottom-32 left-16 w-24 h-24 border border-blue-400/20 transform rotate-45"
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
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-lg"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-semibold tracking-wide">PARCEIRO OFICIAL TOTVS</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              <span className="block">Transforme sua</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                gestão empresarial
              </span>
              <span className="block text-2xl lg:text-3xl font-light text-slate-300 mt-4">
                com tecnologia de última geração
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Integramos estratégia, tecnologia e operações para elevar a maturidade digital da sua empresa. 
              Soluções TOTVS completas com consultoria especializada OLV.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link 
                href="/diagnostico" 
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Agende Consultoria Gratuita</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-slate-400 text-slate-300 font-semibold rounded-xl hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-105">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Veja Como Funciona
              </button>
            </div>

            {/* Premium Diferenciais */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700/50">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-400/30">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg" />
                </div>
                <div className="text-sm font-semibold text-cyan-300 mb-1 tracking-wide">
                  PARCEIRO OFICIAL
                </div>
                <div className="text-xs text-slate-400">
                  TOTVS Certificado
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-blue-400/30">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg" />
                </div>
                <div className="text-sm font-semibold text-blue-300 mb-1 tracking-wide">
                  CONSULTORIA
                </div>
                <div className="text-xs text-slate-400">
                  Estratégica Premium
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-indigo-400/30">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg" />
                </div>
                <div className="text-sm font-semibold text-indigo-300 mb-1 tracking-wide">
                  SUPORTE
                </div>
                <div className="text-xs text-slate-400">
                  Contínuo Garantido
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Futurista */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              {/* Main Futuristic Display */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
                {/* Holographic Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
                
                {/* Central Dashboard */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-12">
                    {/* Futuristic Icon */}
                    <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm flex items-center justify-center border border-cyan-400/30 shadow-2xl">
                      <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-lg" />
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold mb-2 tracking-wide">
                      DASHBOARDS INTELIGENTES
                    </p>
                    <p className="text-sm text-slate-300 tracking-wider">
                      Decisões baseadas em dados em tempo real
                    </p>
                  </div>
                </div>

                {/* Animated Data Streams */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="absolute top-16 right-12 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
                <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              </div>

              {/* Floating Premium Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -bottom-8 -left-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 max-w-xs border border-slate-700/50 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg tracking-wide">
                      +40% EFICIÊNCIA
                    </div>
                    <div className="text-sm text-slate-400 tracking-wide">
                      Em processos internos
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -top-8 -right-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg tracking-wide">ROI ALTO</div>
                    <div className="text-sm text-slate-400 tracking-wide">
                      Retorno garantido
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <span className="text-xs font-medium tracking-wider">EXPLORE MAIS</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 border-2 border-cyan-400/50 rounded-full flex items-center justify-center"
          >
            <div className="w-1 h-3 bg-cyan-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

