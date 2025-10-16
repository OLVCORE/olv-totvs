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
      color: 'from-blue-500 to-cyan-600',
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
      color: 'from-amber-500 to-orange-600',
      steps: ['Monitoramento de KPIs', 'Análise de performance', 'Otimizações contínuas']
    }
  ];

  const solucoesTotvs = [
    {
      sistema: 'TOTVS Fluig',
      aplicacao: 'Automação de processos, workflows e integração entre áreas',
      beneficio: 'Reduz burocracia e aumenta a eficiência operacional',
      icon: Zap,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      sistema: 'TOTVS Protheus (ERP)',
      aplicacao: 'Gestão financeira, fiscal, contábil, industrial e comercial',
      beneficio: 'Centraliza informações e aumenta o controle da operação',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-600'
    },
    {
      sistema: 'TOTVS Datasul',
      aplicacao: 'Gestão avançada de manufatura e supply chain',
      beneficio: 'Melhora previsibilidade e reduz custos produtivos',
      icon: Shield,
      color: 'from-slate-500 to-gray-600'
    },
    {
      sistema: 'TOTVS RM',
      aplicacao: 'Gestão de RH, folha e desenvolvimento organizacional',
      beneficio: 'Eleva a maturidade e eficiência da gestão de pessoas',
      icon: Users,
      color: 'from-amber-500 to-orange-600'
    },
    {
      sistema: 'TOTVS WMS',
      aplicacao: 'Controle logístico e de armazéns',
      beneficio: 'Maximiza o giro de estoque e reduz perdas',
      icon: Globe,
      color: 'from-indigo-500 to-blue-600'
    },
    {
      sistema: 'TOTVS COMEX',
      aplicacao: 'Gestão de importação, exportação e compliance',
      beneficio: 'Garante agilidade, legalidade e redução de custos aduaneiros',
      icon: Briefcase,
      color: 'from-teal-500 to-green-600'
    },
    {
      sistema: 'TOTVS Frota',
      aplicacao: 'Controle e manutenção de frotas',
      beneficio: 'Aumenta produtividade e reduz custos de transporte',
      icon: Rocket,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      sistema: 'TOTVS Varejo/Distribuição',
      aplicacao: 'Gestão de PDV, estoques e omnichannel',
      beneficio: 'Melhora margens e previsibilidade de vendas',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const areasAtuacao = [
    {
      icon: Target,
      title: 'Planejamento Estratégico e Plano Físico-Financeiro',
      description: 'Desenvolvimento de estratégias corporativas e planos de execução integrados'
    },
    {
      icon: Globe,
      title: 'Supply Chain e Compras Estratégicas',
      description: 'Otimização da cadeia de suprimentos e processos de aquisição'
    },
    {
      icon: Briefcase,
      title: 'Logística Internacional e Operações (3PL / 4PL)',
      description: 'Gestão de operações logísticas internacionais e terceirização'
    },
    {
      icon: BarChart3,
      title: 'Gestão de Projetos e Governança (PMO / SMOP)',
      description: 'Metodologias de gestão de projetos e governança corporativa'
    },
    {
      icon: Users,
      title: 'Reestruturação Organizacional e Treinamento',
      description: 'Transformação organizacional e desenvolvimento de equipes'
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento de KPIs e Indicadores de Resultado',
      description: 'Monitoramento de performance e indicadores de sucesso'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
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
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Brain className="w-5 h-5" />
              <span className="tracking-wide">PARCERIA OLV + TOTVS</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block">Transforme sua operação com</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Inteligência Estratégica e Tecnologia TOTVS
              </span>
            </h1>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium mb-8">
              Planejamento, execução e governança integrados para resultados mensuráveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
              >
                <Briefcase className="w-6 h-6" />
                <span className="relative z-10 tracking-wide">DESCUBRA COMO APLICAR ESSA PARCERIA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 flex-shrink-0" />
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

      {/* A Força da Parceria */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Award className="w-5 h-5" />
              <span className="tracking-wide">A FORÇA DE DUAS EXPERTISES</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide">
              PARCERIA OLV + TOTVS
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                A OLV Internacional une sua experiência em gestão estratégica, supply chain, comércio exterior e governança de projetos à robustez tecnológica da TOTVS — líder em software de gestão empresarial na América Latina.
              </p>
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Essa parceria oferece às empresas soluções integradas que combinam planejamento estratégico, tecnologia de ponta e gestão orientada a resultados.
              </p>
              <p className="text-xl text-slate-300 leading-relaxed font-semibold">
                Com a OLV, cada sistema TOTVS é aplicado com propósito, diagnóstico, indicadores e foco em performance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Possibilidades de Transformação */}
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
              <span className="tracking-wide">SOLUÇÕES TOTVS APLICADAS PELA OLV</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide">
              TECNOLOGIA COM PROPÓSITO ESTRATÉGICO
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Cada sistema TOTVS é aplicado pela OLV com metodologia própria, 
              diagnóstico preciso e foco em resultados mensuráveis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solucoesTotvs.map((solucao, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${solucao.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${solucao.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow`}>
                        <solucao.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white mb-1">{solucao.sistema}</h3>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 mb-2">APLICAÇÃO PELA OLV</h4>
                        <p className="text-slate-300 text-sm">{solucao.aplicacao}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-3">
                        <h4 className="text-xs font-bold text-green-300 mb-1">BENEFÍCIO ESTRATÉGICO</h4>
                        <p className="text-green-200 text-sm font-semibold">{solucao.beneficio}</p>
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
              COMO A OLV ATUA
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Nós não vendemos sistemas — entregamos governança, performance e crescimento sustentável.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areasAtuacao.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group text-center"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
                      <area.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-4">{area.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {area.description}
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-glow">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white">Converse com nossos especialistas</h2>
              </div>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Agende uma consultoria e descubra como unir estratégia e tecnologia para transformar sua empresa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                >
                  <ArrowRight className="w-6 h-6" />
                  <span className="relative z-10 tracking-wide">FALE COM A OLV INTERNACIONAL</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
