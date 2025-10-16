'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Número */}
            <div className="relative mb-8">
              <motion.h1
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="text-[200px] md:text-[300px] font-black leading-none"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  404
                </span>
              </motion.h1>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-dashed border-cyan-500/30 rounded-full"
              />
            </div>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              Página Não Encontrada
            </motion.h2>

            {/* Descrição */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-300 mb-12 leading-relaxed"
            >
              Ops! Parece que você navegou para um espaço inexplorado do nosso universo digital. 
              A página que você está procurando não existe ou foi movida.
            </motion.p>

            {/* Botões de Ação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-glow hover:shadow-futuristic transition-all duration-300 hover:scale-105"
              >
                <Home className="w-5 h-5" />
                VOLTAR PARA HOME
              </Link>

              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-white font-bold rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <Search className="w-5 h-5" />
                EXPLORAR BLOG
              </Link>
            </motion.div>

            {/* Links Rápidos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 pt-8 border-t border-slate-700/50"
            >
              <p className="text-slate-400 mb-4 font-semibold">Links Rápidos:</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-cyan-300">
                <Link href="/solucoes" className="hover:text-cyan-200 transition-colors">
                  Soluções
                </Link>
                <span className="text-slate-700">|</span>
                <Link href="/setores" className="hover:text-cyan-200 transition-colors">
                  Setores
                </Link>
                <span className="text-slate-700">|</span>
                <Link href="/sobre" className="hover:text-cyan-200 transition-colors">
                  Sobre
                </Link>
                <span className="text-slate-700">|</span>
                <Link href="/contato" className="hover:text-cyan-200 transition-colors">
                  Contato
                </Link>
                <span className="text-slate-700">|</span>
                <Link href="/diagnostico" className="hover:text-cyan-200 transition-colors">
                  Diagnóstico Gratuito
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

