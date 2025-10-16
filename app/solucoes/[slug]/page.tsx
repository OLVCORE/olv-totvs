import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, Star, TrendingUp, Zap, Shield, Users, Award, BarChart, Clock, Target } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug, SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import { AnimatedSection, AnimatedCard, AnimatedHero, AnimatedOrb, AnimatedButton } from '@/components/shared/AnimatedSection';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return SOLUCOES_TOTVS.map((solucao) => ({
    slug: solucao.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const solucao = getSolucaoBySlug(params.slug);

  if (!solucao) {
    return {
      title: 'Solução não encontrada | OLV Internacional',
    };
  }

  return {
    title: `${solucao.titulo} | OLV Internacional + TOTVS`,
    description: solucao.descricao,
  };
}

export default function SolucaoPage({ params }: PageProps) {
  const solucao = getSolucaoBySlug(params.slug);

  if (!solucao) {
    notFound();
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  // Mapeamento de cores para gradientes premium
  const getGradientFromColor = (color: string) => {
    const colorMap: Record<string, string> = {
      '#0087ff': 'from-blue-500 to-indigo-600',
      '#00d4ff': 'from-cyan-500 to-blue-600',
      '#7c3aed': 'from-purple-500 to-indigo-600',
      '#059669': 'from-emerald-500 to-teal-600',
      '#dc2626': 'from-red-500 to-rose-600',
      '#ea580c': 'from-orange-500 to-red-600',
      '#7c2d12': 'from-amber-500 to-orange-600',
    };
    return colorMap[color] || 'from-cyan-500 to-blue-600';
  };

  const gradient = getGradientFromColor(solucao.cor);

  return (
    <>
      {/* Premium Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedOrb className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedHero direction="left">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="tracking-wide">SOLUÇÃO TOTVS</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                <span className="block">{solucao.titulo}</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Premium
                </span>
              </h1>

              <p className="text-xl text-slate-200 mb-8 leading-relaxed font-medium">
                {solucao.subtitulo}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/diagnostico"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                >
                  <span className="relative z-10 tracking-wide">SOLICITAR DEMONSTRAÇÃO</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link 
                  href="/contato" 
                  className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-slate-400 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                >
                  <Users className="w-5 h-5" />
                  <span className="tracking-wide">FALAR COM ESPECIALISTA</span>
                </Link>
              </div>
            </AnimatedHero>

            <AnimatedHero direction="right" className="relative">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-indigo-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-premium relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />
                
                {/* Hero Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={`/images/solucoes/${solucao.slug}-hero.svg`}
                    alt={`${solucao.nome} - Solução TOTVS`}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 flex items-center justify-center">
                  <div className="text-center text-white relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm flex items-center justify-center border border-cyan-400/30 shadow-glow">
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-lg" />
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold mb-2 tracking-wide">
                      {solucao.nome.toUpperCase()}
                    </p>
                    <p className="text-sm text-slate-300 tracking-wider">
                      Solução integrada TOTVS
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedHero>
          </div>
        </div>
      </section>

      {/* Premium Introdução OLV */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-dots" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="card-premium text-center relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
                    <Award className="w-5 h-5" />
                    <span className="tracking-wide">CONSULTORIA ESTRATÉGICA OLV</span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                    <span className="block">Como a OLV Aplica</span>
                    <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      {solucao.nome}
                    </span>
                  </h2>

                  <p className="text-xl text-slate-200 mb-8 leading-relaxed font-medium max-w-4xl mx-auto">
                    A OLV Internacional atua como consultora estratégica especializada em {solucao.nome}, 
                    focando na aplicação prática e eficaz da solução para transformar processos e elevar 
                    a maturidade digital da sua empresa.
                  </p>

                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                      {
                        icon: Shield,
                        title: 'ANÁLISE ESTRATÉGICA',
                        description: 'Mapeamento completo dos processos e identificação de oportunidades de melhoria',
                        gradient: 'from-emerald-500 to-teal-600'
                      },
                      {
                        icon: Zap,
                        title: 'IMPLEMENTAÇÃO ÁGIL',
                        description: 'Metodologia comprovada para go-live rápido e eficiente',
                        gradient: 'from-teal-500 to-cyan-600'
                      },
                      {
                        icon: TrendingUp,
                        title: 'RESULTADOS GARANTIDOS',
                        description: 'Acompanhamento pós-implementação para garantir ROI',
                        gradient: 'from-cyan-500 to-blue-600'
                      }
                    ].map((item, index) => (
                      <AnimatedCard
                        key={index}
                        delay={index * 0.1}
                        className="text-center"
                      >
                        <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-glow`}>
                          <item.icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-3 tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-slate-300 text-base leading-relaxed">
                          {item.description}
                        </p>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium O que é */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 text-center leading-tight">
              <span className="block">O que é</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {solucao.nome}?
              </span>
            </h2>
            <div className="card-premium">
              <p className="text-xl text-slate-200 leading-relaxed font-medium text-center">
                {solucao.descricao}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium Funcionalidades */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                <span className="block">Principais</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Funcionalidades
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solucao.funcionalidades.map((funcionalidade, index) => (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                >
                  <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30 flex-shrink-0 mt-1">
                          <Check className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                            {funcionalidade}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium Benefícios */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-dots" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                <span className="block">Principais</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Benefícios
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solucao.beneficios.map((beneficio, index) => (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                >
                  <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30 flex-shrink-0 mt-1">
                          <Target className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                            {beneficio}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium Casos de Uso */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                <span className="block">Casos de</span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  Uso Ideais
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {solucao.casos_uso.map((caso, index) => (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                >
                  <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-400/30 flex-shrink-0 mt-1">
                          <BarChart className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                            {caso}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Premium CTA Final */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-dots" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedOrb className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="max-w-5xl mx-auto text-center">
            <div className="relative">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="card-premium relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
                
                <div className="relative z-10">
                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                    <span className="block">Pronto para Transformar</span>
                    <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Seu Negócio?
                    </span>
                  </h2>
                  <p className="text-xl mb-10 text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
                    Descubra como {solucao.nome} com consultoria OLV pode revolucionar 
                    os processos da sua empresa
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <AnimatedButton>
                      <Link 
                        href="/diagnostico" 
                        className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all"
                      >
                        <span className="relative z-10 tracking-wide">DIAGNÓSTICO GRATUITO</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </AnimatedButton>
                    <AnimatedButton>
                      <Link 
                        href="/contato" 
                        className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-slate-400 text-slate-300 hover:border-purple-400 hover:text-purple-300 px-10 py-5 rounded-2xl font-black text-xl transition-all"
                      >
                        <Users className="w-6 h-6" />
                        <span className="tracking-wide">FALAR COM ESPECIALISTA</span>
                      </Link>
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
