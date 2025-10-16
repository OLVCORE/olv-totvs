'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight,
  Brain,
  BarChart3,
  Zap,
  Shield,
  Award,
  Globe,
  Briefcase,
  Rocket
} from 'lucide-react';

export default function ConsultoriaEstrategicaPage() {
  const metodologias = [
    {
      icon: Target,
      title: 'Diagnóstico Estratégico',
      description: 'Análise profunda do negócio e identificação de oportunidades de melhoria',
      color: 'from-blue-500 to-cyan-600',
      steps: ['Análise de processos', 'Mapeamento de gargalos', 'Identificação de oportunidades']
    },
    {
      icon: Brain,
      title: 'Planejamento Inteligente',
      description: 'Desenvolvimento de estratégias personalizadas baseadas em dados e melhores práticas',
      color: 'from-purple-500 to-pink-600',
      steps: ['Definição de objetivos', 'Roadmap estratégico', 'Cronograma de implementação']
    },
    {
      icon: Rocket,
      title: 'Implementação Ágil',
      description: 'Execução eficiente com metodologias ágeis e acompanhamento contínuo',
      color: 'from-green-500 to-emerald-600',
      steps: ['Implementação por fases', 'Testes e validações', 'Go-live controlado']
    },
    {
      icon: TrendingUp,
      title: 'Otimização Contínua',
      description: 'Monitoramento de resultados e ajustes estratégicos para maximizar ROI',
      color: 'from-orange-500 to-red-600',
      steps: ['Monitoramento de KPIs', 'Análise de performance', 'Otimizações contínuas']
    }
  ];

  const possibilidadesTransformacao = [
    {
      setor: 'Indústria de Transformação',
      desafio: 'Controle de qualidade e rastreabilidade',
      solucao: 'ERP TOTVS + Fluig',
      potencial: 'Automação completa de processos industriais',
      icon: Shield,
      color: 'from-green-500 to-emerald-600'
    },
    {
      setor: 'Varejo e Distribuição',
      desafio: 'Gestão de múltiplas unidades e canais',
      solucao: 'ERP TOTVS + Analytics + SFA',
      potencial: 'Visibilidade total da operação',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      setor: 'Serviços Financeiros',
      desafio: 'Compliance e gestão de riscos',
      solucao: 'Techfin TOTVS + Assinatura Eletrônica',
      potencial: 'Conformidade regulatória automatizada',
      icon: Zap,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const diferenciais = [
    {
      icon: Award,
      title: 'Parceiro Oficial TOTVS',
      description: 'Certificação oficial com acesso a recursos exclusivos e suporte especializado'
    },
    {
      icon: Users,
      title: 'Equipe Multidisciplinar',
      description: 'Consultores especializados em transformação digital com experiência estratégica, tática e operacional'
    },
    {
      icon: Globe,
      title: 'Experiência Internacional',
      description: 'Conhecimento de melhores práticas globais adaptadas ao mercado brasileiro'
    },
    {
      icon: Briefcase,
      title: 'Metodologia Própria',
      description: 'Framework desenvolvido pela OLV baseado em planejamento estratégico, tático e operacional'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Brain className="w-5 h-5" />
              <span className="tracking-wide">CONSULTORIA ESTRATÉGICA</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block">Transformação</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Estratégica & Digital
              </span>
            </h1>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium mb-8">
              Integramos estratégia empresarial com tecnologia TOTVS para 
              acelerar sua transformação digital
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
              >
                <Briefcase className="w-6 h-6" />
                <span className="relative z-10 tracking-wide">CONSULTORIA GRATUITA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <Link
                href="/diagnostico"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
              >
                <Target className="w-6 h-6" />
                <span className="relative z-10 tracking-wide">DIAGNÓSTICO COMPLETO</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metodologia Section */}
      <section className="relative py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide">
              NOSSA METODOLOGIA
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Processo estruturado e comprovado para garantir o sucesso da sua 
              transformação digital com soluções TOTVS
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {metodologias.map((metodologia, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${metodologia.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${metodologia.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow`}>
                        <metodologia.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-2">{metodologia.title}</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                          {metodologia.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {metodologia.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-300 text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases de Sucesso */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Lightbulb className="w-5 h-5" />
              <span className="tracking-wide">POSSIBILIDADES DE TRANSFORMAÇÃO</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide">
              POTENCIAL DE TRANSFORMAÇÃO
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Como nossa consultoria estratégica aliada às soluções TOTVS pode transformar diferentes setores
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {possibilidadesTransformacao.map((possibilidade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${possibilidade.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${possibilidade.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow`}>
                        <possibilidade.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white mb-1">{possibilidade.setor}</h3>
                        <p className="text-slate-400 text-sm">Setor de Atuação</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 mb-2">DESAFIO TÍPICO</h4>
                        <p className="text-slate-300 text-sm">{possibilidade.desafio}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 mb-2">SOLUÇÃO TOTVS</h4>
                        <p className="text-slate-300 text-sm">{possibilidade.solucao}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                        <h4 className="text-sm font-bold text-green-300 mb-2">POTENCIAL DE TRANSFORMAÇÃO</h4>
                        <p className="text-green-200 font-bold">{possibilidade.potencial}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="relative py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide">
              NOSSOS DIFERENCIAIS
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Por que escolher a OLV Internacional para sua transformação digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((diferencial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group text-center"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
                      <diferencial.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-4">{diferencial.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {diferencial.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-glow">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white">Pronto para Transformar?</h2>
              </div>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Nossa equipe de consultores especializados está pronta para ajudar você 
                a definir a melhor estratégia de transformação digital para sua empresa
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                >
                  <ArrowRight className="w-6 h-6" />
                  <span className="relative z-10 tracking-wide">FALE COM UM CONSULTOR</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link
                  href="https://olvinternacional.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                >
                  <Globe className="w-6 h-6" />
                  <span className="relative z-10 tracking-wide">SITE OFICIAL OLV</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
