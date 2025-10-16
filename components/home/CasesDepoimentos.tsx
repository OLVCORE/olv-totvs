'use client';

import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CasesDepoimentos = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const depoimentos = [
    {
      id: 1,
      nome: 'Diretor de Operações',
      cargo: 'C-Level',
      empresa: 'Distribuidora',
      setor: 'Distribuição',
      foto: '/images/clientes/cliente-1.jpg',
      depoimento:
        'A implementação do ERP TOTVS com consultoria OLV transformou nossa operação. Ganhamos visibilidade completa do negócio e processos mais eficientes.',
      resultados: [
        'Redução significativa em tempo de processos',
        'Visibilidade em tempo real',
        'ROI comprovado',
      ],
      rating: 5,
      gradientColor: 'from-cyan-500 to-blue-600',
    },
    {
      id: 2,
      nome: 'Gerente de Processos',
      cargo: 'Gestão',
      empresa: 'Construtora',
      setor: 'Construção',
      foto: '/images/clientes/cliente-2.jpg',
      depoimento:
        'O Fluig revolucionou nossa gestão de processos. Agora conseguimos rastrear todas as aprovações e documentos de forma digital e ágil.',
      resultados: [
        'Aprovações mais rápidas',
        'Documentação 100% digital',
        'Conformidade garantida',
      ],
      rating: 5,
      gradientColor: 'from-purple-500 to-indigo-600',
    },
    {
      id: 3,
      nome: 'Diretor Financeiro',
      cargo: 'CFO',
      empresa: 'Indústria',
      setor: 'Manufatura',
      foto: '/images/clientes/cliente-3.jpg',
      depoimento:
        'O TOTVS Techfin melhorou nosso fluxo de caixa significativamente. A antecipação de recebíveis nos deu capital de giro necessário para expansão.',
      resultados: [
        'Capital de giro imediato',
        'Redução de inadimplência',
        'Crescimento sustentável',
      ],
      rating: 5,
      gradientColor: 'from-emerald-500 to-teal-600',
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % depoimentos.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? depoimentos.length - 1 : prev - 1
    );
  };

  const currentDepoimento = depoimentos[activeIndex];

  return (
    <section id="cases" className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-grid" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="tracking-wide">CASOS DE SUCESSO</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            <span className="block">Histórias de</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Transformação
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Empresas que transformaram seus resultados com nossas soluções
          </p>
        </motion.div>

        {/* Premium Carousel */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative">
            {/* Premium Glow Effect */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${currentDepoimento.gradientColor} rounded-3xl blur-2xl opacity-30`} />
            
            <div className="card-premium relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Premium Quote Icon */}
                  <div className="absolute top-8 left-8 opacity-10">
                    <Quote className="w-24 h-24 text-cyan-400" />
                  </div>

                  <div className="relative z-10">
                    {/* Premium Rating */}
                    <div className="flex gap-2 mb-8">
                      {[...Array(currentDepoimento.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                          <Star className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Premium Testimonial */}
                    <blockquote className="text-3xl font-bold mb-10 leading-relaxed text-white">
                      "{currentDepoimento.depoimento}"
                    </blockquote>

                    {/* Premium Results */}
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                      {currentDepoimento.resultados.map((resultado, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className={`bg-gradient-to-br ${currentDepoimento.gradientColor} rounded-2xl p-6 text-center shadow-glow backdrop-blur-sm`}
                        >
                          <div className="text-base font-black text-white tracking-wide">{resultado}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Premium Author */}
                    <div className="flex items-center gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`w-20 h-20 bg-gradient-to-br ${currentDepoimento.gradientColor} rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-glow`}
                      >
                        {currentDepoimento.nome.charAt(0)}
                      </motion.div>
                      <div>
                        <div className="font-black text-white text-2xl mb-1 tracking-wide">
                          {currentDepoimento.nome}
                        </div>
                        <div className="text-slate-300 text-lg font-bold">
                          {currentDepoimento.cargo} • {currentDepoimento.empresa}
                        </div>
                        <div className={`inline-block mt-2 px-4 py-1 bg-gradient-to-r ${currentDepoimento.gradientColor} rounded-full text-white text-sm font-bold tracking-wide`}>
                          {currentDepoimento.setor}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Premium Navigation */}
                  <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-700/50">
                    <motion.button
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevSlide}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-cyan-500 hover:to-blue-600 flex items-center justify-center transition-all shadow-glow border border-slate-600/50"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-7 h-7 text-white" />
                    </motion.button>

                    {/* Premium Dots */}
                    <div className="flex gap-3">
                      {depoimentos.map((_, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => setActiveIndex(index)}
                          className={`h-3 rounded-full transition-all ${
                            index === activeIndex
                              ? `bg-gradient-to-r ${currentDepoimento.gradientColor} w-12 shadow-glow`
                              : 'bg-slate-600 w-3'
                          }`}
                          aria-label={`Ir para depoimento ${index + 1}`}
                        />
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextSlide}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-cyan-500 hover:to-blue-600 flex items-center justify-center transition-all shadow-glow border border-slate-600/50"
                      aria-label="Próximo"
                    >
                      <ChevronRight className="w-7 h-7 text-white" />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Premium Differentials */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { title: 'Parceiro Oficial', subtitle: 'TOTVS Certificado', gradient: 'from-cyan-500 to-blue-600' },
            { title: 'Multi-setorial', subtitle: 'Experiência diversa', gradient: 'from-purple-500 to-indigo-600' },
            { title: 'Consultoria', subtitle: 'Estratégica e Aplicada', gradient: 'from-emerald-500 to-teal-600' },
            { title: 'Suporte', subtitle: 'Pós-implementação', gradient: 'from-orange-500 to-rose-600' },
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -8, scale: 1.05 }}
              className="text-center group"
            >
              <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="text-xl font-black text-white mb-2 tracking-wide">{item.title}</div>
                  <div className="text-slate-300 font-bold">{item.subtitle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CasesDepoimentos;
