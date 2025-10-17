'use client';

import { CheckCircle2, Award, Users2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Parceria = () => {
  const diferenciais = [
    {
      icon: Award,
      titulo: 'Parceiro Oficial TOTVS',
      descricao:
        'Certificação e treinamento direto com TOTVS para garantir excelência técnica',
      cor: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Users2,
      titulo: 'Consultoria Estratégica',
      descricao:
        'Não apenas implementamos: transformamos processos e elevamos maturidade',
      cor: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Zap,
      titulo: 'Implementação Ágil',
      descricao:
        'Metodologia comprovada para go-live rápido e resultados tangíveis',
      cor: 'from-emerald-500 to-teal-600',
    },
    {
      icon: CheckCircle2,
      titulo: 'Suporte Contínuo',
      descricao:
        'Acompanhamento pós go-live para garantir evolução constante',
      cor: 'from-orange-500 to-rose-600',
    },
  ];

  const beneficios = [
    'Consultoria completa em processos de negócio',
    'Implementação guiada por especialistas certificados',
    'Treinamento e capacitação de equipes',
    'Suporte técnico e funcional dedicado',
    'Atualizações e melhorias contínuas',
    'Integração com sistemas legados',
    'Customizações e desenvolvimentos específicos',
    'Análise de ROI e acompanhamento de resultados',
  ];

  return (
    <section id="parceria" className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
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

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Lado Esquerdo - Premium Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Award className="w-5 h-5" />
              <span className="tracking-wide">PARCERIA DE EXCELÊNCIA</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              OLV + TOTVS:{' '}
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                A Combinação Perfeita
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Somos mais que um revendedor TOTVS. Somos seu parceiro estratégico
              na jornada de transformação digital, integrando tecnologia de ponta
              com consultoria especializada em processos.
            </p>

            {/* Premium Diferenciais */}
            <div className="grid sm:grid-cols-2 gap-6">
              {diferenciais.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.cor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="flex gap-4 relative z-10">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 bg-gradient-to-br ${item.cor} rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-black text-white mb-2 text-lg tracking-wide">
                          {item.titulo}
                        </h3>
                        <p className="text-base text-slate-300">{item.descricao}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lado Direito - Premium Benefits Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="card-premium relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-8 tracking-wide">
                    CONSULTORIA ESTRATÉGICA PREMIUM
                  </h3>

                  {/* Cards de Consultoria Estratégica */}
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {/* Card 1: Consultoria Empresarial Premium */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
                          <Award className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2">Consultoria Empresarial Premium</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            Gestão de Projetos 360º que integra estratégia, execução e governança para transformar objetivos em resultados mensuráveis.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Diagnóstico 360º e Roadmap de Valor</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>PMO de Alta Performance</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Execução Ponta a Ponta</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 2: Dashboards Inteligentes */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-purple-400/30 flex-shrink-0">
                          <Users2 className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2">Dashboards Inteligentes</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            Analytics Avançado + BI Integrado com uma única fonte de verdade, consolidando operações, finanças e logística.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>KPIs críticos em tempo real</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Alertas e previsões inteligentes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Decisões baseadas em dados</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 3: Eficiência Operacional */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-400/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
                          <Zap className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2">Eficiência Operacional</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            Ganhos sustentados por padronização, automação e governança de processos com retorno comprovado.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Padronização e automação</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Governança de processos</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>ROI mensurável e tracking</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Card 4: Supply Chain & Internacionalização */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-orange-400/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-xl flex items-center justify-center border border-orange-400/30 flex-shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2">Supply Chain & Internacionalização</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            Estratégias sob medida para transformar operações complexas em vantagem competitiva global.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Comércio Exterior</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Internacionalização</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Inovação estratégica</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Premium Guarantee Badge */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl blur-xl" />
                    <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 backdrop-blur-sm border border-emerald-400/30 relative">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-glow">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="font-black text-white text-xl mb-1 tracking-wide">CONSULTORIA PREMIUM</div>
                          <div className="text-base text-slate-200">
                            Estratégia + Execução + Dados para resultados mensuráveis
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Certifications */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <div className="card-premium">
                  <div className="text-center">
                    <div className="text-sm text-slate-400 mb-6 font-bold tracking-wider">
                      CERTIFICAÇÕES E PARCERIAS
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="px-8 py-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl shadow-glow backdrop-blur-sm border border-cyan-400/30"
                      >
                        <div className="font-black text-cyan-300 text-xl mb-1">TOTVS</div>
                        <div className="text-sm text-slate-300 font-bold">
                          Parceiro Oficial
                        </div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="px-8 py-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl shadow-glow backdrop-blur-sm border border-emerald-400/30"
                      >
                        <div className="font-black text-emerald-300 text-xl mb-1">ISO 9001</div>
                        <div className="text-sm text-slate-300 font-bold">Certificado</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="px-8 py-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl shadow-glow backdrop-blur-sm border border-purple-400/30"
                      >
                        <div className="font-black text-purple-300 text-xl mb-1">LGPD</div>
                        <div className="text-sm text-slate-300 font-bold">Compliance</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Parceria;
