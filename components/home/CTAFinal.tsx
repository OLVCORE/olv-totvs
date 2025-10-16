'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Phone, Shield, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CTAFinal = () => {
  return (
    <section className="section relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Futuristic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-pattern-hexagon"
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 px-6 py-3 rounded-full text-sm font-bold mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="tracking-wide">COMECE SUA TRANSFORMAÇÃO DIGITAL HOJE</span>
          </div>

          {/* Premium Heading */}
          <h2 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block">Pronto para Elevar</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sua Gestão?
            </span>
          </h2>

          {/* Premium Description */}
          <p className="text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Faça um diagnóstico gratuito e descubra como as soluções TOTVS podem
            transformar seu negócio. Nossa equipe de especialistas está pronta
            para atendê-lo.
          </p>

          {/* Premium CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/diagnostico"
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 rounded-2xl font-black text-xl shadow-premium hover:shadow-futuristic transition-all"
              >
                <span className="relative z-10 tracking-wide">DIAGNÓSTICO GRATUITO</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contato"
                className="group inline-flex items-center justify-center gap-3 border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-6 rounded-2xl font-black text-xl transition-all"
              >
                <span className="tracking-wide">FALAR COM ESPECIALISTA</span>
              </Link>
            </motion.div>
          </div>

          {/* Premium Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            <motion.a
              href="mailto:contato@olvinternacional.com.br"
              whileHover={{ y: -8, scale: 1.02 }}
              className="group card-premium hover:shadow-glow transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400 font-bold tracking-wider mb-1">EMAIL</div>
                  <div className="font-bold text-white text-lg">contato@olvinternacional.com.br</div>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="tel:+5511999999999"
              whileHover={{ y: -8, scale: 1.02 }}
              className="group card-premium hover:shadow-glow transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400 font-bold tracking-wider mb-1">TELEFONE</div>
                  <div className="font-bold text-white text-lg">+55 (11) 99999-9999</div>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Premium Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-12 text-slate-200">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30 group-hover:shadow-glow transition-all">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="font-bold text-lg">Sem compromisso</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30 group-hover:shadow-glow transition-all">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <span className="font-bold text-lg">Dados protegidos</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30 group-hover:shadow-glow transition-all">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="font-bold text-lg">Resposta em 24h</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFinal;
