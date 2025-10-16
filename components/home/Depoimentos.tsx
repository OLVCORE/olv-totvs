'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Building2, User } from 'lucide-react';
import { DEPOIMENTOS } from '@/lib/data/depoimentos';

export default function Depoimentos() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-6"
          >
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-300 font-semibold text-sm tracking-wider">
              HISTÓRIAS DE SUCESSO
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Transformação Comprovada
            </span>
          </h2>

          <p className="text-xl text-slate-300 leading-relaxed">
            Empresas que confiaram na OLV Internacional e TOTVS para impulsionar seus resultados
          </p>
        </motion.div>

        {/* Grid de Depoimentos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPOIMENTOS.map((depoimento, index) => (
            <motion.div
              key={depoimento.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-premium h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-cyan-400" />
                </div>

                {/* Foto e Info */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{depoimento.nome}</h3>
                    <p className="text-sm text-slate-400 mb-1">{depoimento.cargo}</p>
                    <div className="flex items-center gap-2 text-sm text-cyan-300">
                      <Building2 className="w-4 h-4" />
                      {depoimento.empresa}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Depoimento */}
                <blockquote className="text-slate-300 leading-relaxed mb-6 flex-1 italic">
                  "{depoimento.depoimento}"
                </blockquote>

                {/* Resultados */}
                <div className="space-y-3 pt-6 border-t border-slate-700/50">
                  {depoimento.resultados.map((resultado, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-slate-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        {resultado.metrica}
                      </span>
                      <span className="font-bold text-lg bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        {resultado.valor}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags de Soluções */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-700/50">
                  {depoimento.solucoes.map((solucao) => (
                    <span
                      key={solucao}
                      className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs font-semibold"
                    >
                      {solucao}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-slate-300 mb-6">
            Quer ser o próximo caso de sucesso?
          </p>
          <motion.a
            href="/diagnostico"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-glow hover:shadow-futuristic transition-all duration-300"
          >
            AGENDAR CONSULTORIA GRATUITA
            <TrendingUp className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

