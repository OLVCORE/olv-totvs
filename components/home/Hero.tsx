'use client';

import Link from 'next/link';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-48 pb-20 overflow-hidden">
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
               <div className="grid lg:grid-cols-2 gap-16 items-start">
                 {/* Conteúdo Principal */}
                 <motion.div
                   initial={{ opacity: 0, x: -50 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="lg:pr-8"
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

                   <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                     Integramos estratégia, tecnologia e operações para elevar a maturidade digital da sua empresa. 
                     Soluções TOTVS completas com consultoria especializada OLV.
                   </p>
                 </motion.div>

                 {/* Visual Futurista - Dashboard Estratégico */}
                 <motion.div
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                   className="relative lg:mt-16"
                 >
                   {/* Dashboard Principal */}
                   <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                     {/* Header do Dashboard */}
                     <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3">
                         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                         <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                       </div>
                       <div className="text-xs text-slate-400 font-mono">OLV STRATEGIC DASHBOARD</div>
                     </div>

                     {/* Métricas Estratégicas */}
                     <div className="grid grid-cols-2 gap-6 mb-6">
                       <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-4 border border-cyan-400/20">
                         <div className="text-2xl font-bold text-cyan-400 mb-1">MATURIDADE</div>
                         <div className="text-sm text-slate-300">Digital Elevada</div>
                         <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-4/5"></div>
                         </div>
                       </div>
                       
                       <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-4 border border-emerald-400/20">
                         <div className="text-2xl font-bold text-emerald-400 mb-1">INTEGRAÇÃO</div>
                         <div className="text-sm text-slate-300">TOTVS Completa</div>
                         <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-full"></div>
                         </div>
                       </div>
                     </div>

                     {/* Gráfico de Conceitos Estratégicos */}
                     <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-600/30">
                       <div className="text-sm font-semibold text-white mb-4">PILARES ESTRATÉGICOS</div>
                       <div className="space-y-3">
                         <div className="flex items-center justify-between">
                           <span className="text-slate-300 text-sm">Consultoria Especializada</span>
                           <div className="flex gap-1">
                             <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                           </div>
                         </div>
                         <div className="flex items-center justify-between">
                           <span className="text-slate-300 text-sm">Tecnologia Avançada</span>
                           <div className="flex gap-1">
                             <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                           </div>
                         </div>
                         <div className="flex items-center justify-between">
                           <span className="text-slate-300 text-sm">Resultados Comprovados</span>
                           <div className="flex gap-1">
                             <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                             <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Indicadores de Status */}
                     <div className="mt-6 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                         <span className="text-xs text-slate-400">Sistema Online</span>
                       </div>
                       <div className="text-xs text-slate-400 font-mono">OLV.TOTVS.V2.0</div>
                     </div>
                   </div>

                   {/* Cards Flutuantes */}
                   <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-2xl p-4 border border-amber-400/30 shadow-xl">
                     <div className="text-xs font-semibold text-amber-400 mb-1">CONSULTORIA</div>
                     <div className="text-sm text-white font-medium">Premium</div>
                   </div>

                   <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-4 border border-emerald-400/30 shadow-xl">
                     <div className="text-xs font-semibold text-emerald-400 mb-1">SUPORTE</div>
                     <div className="text-sm text-white font-medium">Contínuo</div>
                   </div>
                 </motion.div>
               </div>

               {/* Cards de Diferenciais - Alinhados Horizontalmente */}
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                 className="mt-16 grid md:grid-cols-3 gap-6"
               >
                 {/* Consultoria Premium */}
                 <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl hover:border-amber-400/30 transition-all duration-300">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full flex items-center justify-center border border-amber-400/30 flex-shrink-0">
                       <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                         <div className="w-4 h-4 bg-white rounded-full"></div>
                       </div>
                     </div>
                     <div className="flex-1">
                       <div className="text-sm font-semibold text-amber-400 mb-2 tracking-wide">
                         CONSULTORIA PREMIUM
                       </div>
                       <div className="text-slate-300 leading-relaxed">
                         <span className="text-white font-medium">Supply Chain, Comércio Exterior, Internacionalização e Inovação.</span> 
                         <span className="block mt-2 text-amber-300 font-medium">Evoluímos Negócios.</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Dashboards Inteligentes */}
                 <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/30 shadow-2xl hover:border-cyan-400/50 transition-all duration-300">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
                       <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                         <div className="w-4 h-4 bg-white rounded-full"></div>
                       </div>
                     </div>
                     <div className="flex-1">
                       <div className="text-sm font-semibold text-cyan-400 mb-2 tracking-wide">
                         DASHBOARDS INTELIGENTES
                       </div>
                       <div className="text-slate-300 leading-relaxed">
                         <span className="text-white font-medium">Decisões baseadas em dados em tempo real.</span> 
                         <span className="block mt-2 text-cyan-300 font-medium">Analytics Avançado + BI Integrado.</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Resultados Estratégicos */}
                 <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/30 shadow-2xl hover:border-emerald-400/50 transition-all duration-300">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
                       <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                         <div className="w-4 h-4 bg-white rounded-full"></div>
                       </div>
                     </div>
                     <div className="flex-1">
                       <div className="text-sm font-semibold text-emerald-400 mb-2 tracking-wide">
                         RESULTADOS ESTRATÉGICOS
                       </div>
                       <div className="text-slate-300 leading-relaxed">
                         <span className="text-white font-medium">Transformação digital com impacto mensurável.</span> 
                         <span className="block mt-2 text-emerald-300 font-medium">Evolução Comprovada.</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </motion.div>

               {/* Botões de CTA - Centralizados */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                 className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center"
               >
                 <Link 
                   href="/diagnostico" 
                   className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                 >
                   <span className="relative z-10">Agende Consultoria Gratuita</span>
                   <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 </Link>

                 <Link 
                   href="/consultoria-estrategica" 
                   className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
                 >
                   <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                   <span className="relative z-10">Veja Como Funciona</span>
                 </Link>
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

