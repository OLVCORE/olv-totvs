'use client';

import Link from 'next/link';
import { ArrowRight, Award, Users2, Target, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SobrePage() {
  return (
    <>
      {/* Premium Hero */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
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
              <Award className="w-5 h-5" />
              <span className="tracking-wide">SOBRE NÓS</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block">Parceiro Estratégico em</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Transformação Digital
              </span>
            </h1>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium">
              A OLV Internacional é uma consultoria especializada em integrar
              estratégia, tecnologia e operações para empresas que desejam elevar
              sua maturidade digital e operacional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Missão, Visão, Valores */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-dots" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'MISSÃO',
                description: 'Transformar empresas através de tecnologia e consultoria estratégica, gerando resultados tangíveis e sustentáveis.',
                gradient: 'from-cyan-500 to-blue-600',
              },
              {
                icon: Zap,
                title: 'VISÃO',
                description: 'Ser referência nacional em consultoria de transformação digital, reconhecida pela excelência e resultados entregues.',
                gradient: 'from-purple-500 to-indigo-600',
              },
              {
                icon: Award,
                title: 'VALORES',
                description: 'Excelência, inovação, transparência, compromisso com resultados e foco no cliente.',
                gradient: 'from-emerald-500 to-teal-600',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-premium hover:shadow-futuristic transition-all duration-300 text-center h-full relative overflow-hidden">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-wide">{item.title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Parceria TOTVS */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Award className="w-5 h-5" />
                <span className="tracking-wide">PARCERIA OFICIAL</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                <span className="block">Parceria Estratégica com</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  TOTVS
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Como parceiro oficial TOTVS, unimos a melhor tecnologia do mercado
                com nossa expertise em processos e gestão
              </p>
            </div>

            {/* Premium Content Cards */}
            <div className="card-premium relative overflow-hidden">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
              
              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div>
                  <h3 className="text-3xl font-black text-white mb-8 tracking-wide">
                    O QUE NOS DIFERENCIA
                  </h3>
                  <ul className="space-y-5">
                    {[
                      'Certificação oficial e treinamento contínuo TOTVS',
                      'Experiência em múltiplos setores da economia',
                      'Metodologia ágil e foco em resultados',
                      'Equipe multidisciplinar (negócios + tecnologia)',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <CheckCircle2 className="w-7 h-7 flex-shrink-0 text-cyan-400 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-100 text-lg font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white mb-8 tracking-wide">
                    NOSSO COMPROMISSO
                  </h3>
                  <ul className="space-y-5">
                    {[
                      'Diagnóstico detalhado antes de qualquer projeto',
                      'Acompanhamento pós-implementação garantido',
                      'Transparência total em custos e prazos',
                      'ROI mensurável e documentado',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <CheckCircle2 className="w-7 h-7 flex-shrink-0 text-emerald-400 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-100 text-lg font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              <span className="block">Pronto para Transformar</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Sua Empresa?
              </span>
            </h2>
            <p className="text-2xl mb-10 text-slate-200 font-medium leading-relaxed">
              Entre em contato e descubra como podemos ajudar seu negócio a
              alcançar novos patamares
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/diagnostico"
                  className="group relative inline-flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 px-10 py-5 rounded-2xl font-black text-xl shadow-premium hover:shadow-futuristic transition-all"
                >
                  <span className="relative z-10 tracking-wide">DIAGNÓSTICO GRATUITO</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contato"
                  className="group inline-flex items-center justify-center gap-3 border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 rounded-2xl font-black text-xl transition-all"
                >
                  <span className="tracking-wide">FALAR COM ESPECIALISTA</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
