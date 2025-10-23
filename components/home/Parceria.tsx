'use client';

import { CheckCircle2, Award, Users2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Parceria = () => {
  const diferenciais = [
    {
      icon: Award,
      titulo: 'Agente de Negócio TOTVS',
      descricao:
        'Certificação e treinamento direto com TOTVS para garantir excelência técnica',
      cor: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Users2,
      titulo: 'Consultoria Estratégica',
      descricao:
        'Não apenas implementamos: transformamos processos e elevamos maturidade',
      cor: 'from-purple-500 to-pink-600',
    },
    {
      icon: Zap,
      titulo: 'Implementação Ágil',
      descricao:
        'Metodologia comprovada com entregas rápidas e resultados mensuráveis',
      cor: 'from-emerald-500 to-teal-600',
    },
    {
      icon: CheckCircle2,
      titulo: 'Suporte Contínuo',
      descricao:
        'Acompanhamento pós go-live com evolução contínua e otimização',
      cor: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <section id="parceria" className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Futuristic Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-dots" />
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* NÍVEL 1 - Container Principal */}
        <div className="main-wrapper flex flex-col gap-12 w-full">
          
          {/* NÍVEL 2 - Seção 1: OLV + TOTVS */}
          <section className="section-box w-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              OLV + TOTVS:{' '}
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                A Combinação Perfeita
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed">
              Somos mais que um revendedor TOTVS. Somos seu parceiro estratégico
              na jornada de transformação digital, integrando tecnologia de ponta
              com consultoria especializada em processos.
            </p>

            {/* NÍVEL 3 - Grid de Cards */}
            <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {diferenciais.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="card bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-400/20 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.cor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.cor} rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300 mb-2 sm:mb-3`}>
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-black text-white mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base tracking-wide leading-tight">
                          {item.titulo}
                        </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-tight">{item.descricao}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* NÍVEL 2 - Seção 2: CONSULTORIA ESTRATÉGICA PREMIUM */}
          <section className="section-box w-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6 tracking-wide text-center">
              CONSULTORIA ESTRATÉGICA PREMIUM
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-8"></div>

            {/* NÍVEL 3 - Grid de Cards */}
            <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              
              {/* Card 1: Consultoria Empresarial Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-cyan-400/20 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                        </div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">Consultoria Empresarial Premium</h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Gestão de Projetos 360º que integra estratégia, execução e governança para transformar objetivos em resultados mensuráveis.
                    </p>
                          </div>
                        </div>
                <div className="space-y-1 sm:space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                    <span>Diagnóstico 360º e Roadmap de Valor</span>
                      </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                    <span>PMO de Alta Performance</span>
                    </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                    <span>Execução Ponta a Ponta</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Dashboards Inteligentes */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="card bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-400/20 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30 flex-shrink-0">
                    <Users2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">Dashboards Inteligentes</h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Analytics Avançado + BI Integrado com uma única fonte de verdade, consolidando operações, finanças e logística.
                    </p>
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                    <span>KPIs críticos em tempo real</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                    <span>Alertas e previsões inteligentes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                    <span>Decisões baseadas em dados</span>
                    </div>
                        </div>
                      </motion.div>

              {/* Card 3: Eficiência Operacional */}
                      <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-emerald-400/20 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">Eficiência Operacional</h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Ganhos sustentados por padronização, automação e governança de processos com retorno comprovado.
                    </p>
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                    <span>Padronização e automação</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                    <span>Governança de processos</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                    <span>ROI mensurável e tracking</span>
                  </div>
                </div>
                      </motion.div>

              {/* Card 4: Supply Chain & Internacionalização */}
                      <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-orange-400/20 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-400/30 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">Supply Chain & Internacionalização</h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Estratégias sob medida para transformar operações complexas em vantagem competitiva global.
                    </p>
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
                    <span>Comércio Exterior</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
                    <span>Internacionalização</span>
                    </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
                    <span>Inovação estratégica</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Parceria;