'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function GoogleAds2025Page() {
  const changes = [
    {
      icon: Brain,
      title: 'AI Mode no Buscador',
      description: 'Inteligência artificial com o maior banco de dados comportamental do mundo',
      impact: 'Alto',
      color: 'from-blue-500 to-cyan-600',
      details: [
        'Buscas ultra-personalizadas baseadas em comportamento',
        'Contexto avançado de intenção do usuário',
        'Respostas mais relevantes e precisas'
      ]
    },
    {
      icon: Target,
      title: 'Agente de IA (Agentic)',
      description: 'IA que otimiza automaticamente campanhas de Google Ads',
      impact: 'Crítico',
      color: 'from-purple-500 to-pink-600',
      details: [
        'Otimização automática contínua',
        'Aprendizado de máquina em tempo real',
        'Necessário conhecimento técnico avançado'
      ]
    },
    {
      icon: Search,
      title: 'AI Max for Search',
      description: 'Nova estratégia baseada em IA para campanhas',
      impact: 'Alto',
      color: 'from-green-500 to-emerald-600',
      details: [
        'Modelo baseado em inteligência artificial',
        'Aprendizado contínuo e ajustes automáticos',
        'Resultados otimizados em menos tempo'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Fim das Correspondências de Palavra-chave',
      description: 'Google abandona correspondências tradicionais',
      impact: 'Crítico',
      color: 'from-red-500 to-orange-600',
      details: [
        'Sem mais correspondências ampla, frase, exata',
        'Foco exclusivo na intenção detectada por IA',
        'Cruzamento de dados comportamentais e contexto'
      ]
    }
  ];

  const policyUpdates = [
    {
      icon: Shield,
      title: 'Transparência de Preços',
      description: 'Divulgação clara do modelo de pagamento obrigatória',
      deadline: '28 de outubro de 2025'
    },
    {
      icon: AlertTriangle,
      title: 'Proibição de "Isca e Troca"',
      description: 'Práticas enganosas de preços serão penalizadas',
      deadline: '28 de outubro de 2025'
    },
    {
      icon: CheckCircle,
      title: 'Testes Gratuitos',
      description: 'Divulgação obrigatória de períodos e cobranças automáticas',
      deadline: '28 de outubro de 2025'
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
              <TrendingUp className="w-5 h-5" />
              <span className="tracking-wide">GOOGLE ADS 2025</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block">Transformação</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Radical do Google Ads
              </span>
            </h1>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium">
              Prepare-se para as principais mudanças que vão revolucionar 
              as campanhas de marketing digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Changes Section */}
      <section className="relative py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide">
              PRINCIPAIS MUDANÇAS
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              O Google está implementando uma revolução completa no sistema de anúncios, 
              baseada em inteligência artificial avançada
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {changes.map((change, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${change.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${change.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow`}>
                        <change.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-black text-white">{change.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            change.impact === 'Crítico' 
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {change.impact}
                          </span>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed">
                          {change.description}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      {change.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-300 text-sm">{detail}</p>
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

      {/* Policy Updates Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 text-red-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Calendar className="w-5 h-5" />
              <span className="tracking-wide">ATUALIZAÇÕES DE POLÍTICA</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide">
              OUTUBRO 2025
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Novas regras de transparência e práticas comerciais que entram em vigor
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {policyUpdates.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow">
                        <policy.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-white mb-2">{policy.title}</h3>
                        <div className="flex items-center gap-2 text-orange-300 text-sm font-bold">
                          <Calendar className="w-4 h-4" />
                          <span>{policy.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white">Prepare-se para o Futuro</h2>
              </div>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Nossa equipe está preparada para ajudar você a navegar por essas mudanças 
                e otimizar suas campanhas para o novo cenário do Google Ads
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                >
                  <BarChart3 className="w-6 h-6" />
                  <span className="relative z-10 tracking-wide">OTIMIZAR CAMPANHAS</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link
                  href="/diagnostico"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                >
                  <Target className="w-6 h-6" />
                  <span className="relative z-10 tracking-wide">DIAGNÓSTICO GRATUITO</span>
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
