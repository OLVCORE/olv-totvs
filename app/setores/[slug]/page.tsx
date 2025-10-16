import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Target,
  Users,
  Award,
  Zap,
  Shield,
  TrendingUp,
  BarChart
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSetorBySlug, SETORES_VERTICAIS } from '@/lib/data/setores';
import { getSolucaoById } from '@/lib/data/solucoes';
import { AnimatedSection, AnimatedCard, AnimatedHero, AnimatedOrb, AnimatedButton } from '@/components/shared/AnimatedSection';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return SETORES_VERTICAIS.map((setor) => ({
    slug: setor.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const setor = getSetorBySlug(params.slug);

  if (!setor) {
    return {
      title: 'Setor não encontrado | OLV Internacional',
    };
  }

  return {
    title: `${setor.titulo} | OLV Internacional + TOTVS`,
    description: setor.descricao,
  };
}

export default function SetorPage({ params }: PageProps) {
  const setor = getSetorBySlug(params.slug);

  if (!setor) {
    notFound();
  }

  const setorIcons: Record<string, string> = {
    agro: 'Tractor',
    construcao: 'Building2',
    distribuicao: 'Package',
    'financial-services': 'Banknote',
    logistica: 'Truck',
    manufatura: 'Factory',
    servicos: 'Briefcase',
  };

  const getIcon = (setorId: string) => {
    const iconName = setorIcons[setorId] || 'Building2';
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-16 h-16" /> : null;
  };

  return (
    <>
      {/* Premium Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedOrb className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedHero direction="left">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="tracking-wide">ESPECIALIZAÇÃO VERTICAL</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                <span className="block">{setor.titulo}</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Especializado
                </span>
              </h1>

              <p className="text-xl text-slate-200 mb-8 leading-relaxed font-medium">
                {setor.descricao}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/diagnostico"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                >
                  <span className="relative z-10 tracking-wide">DIAGNÓSTICO GRATUITO</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link 
                  href="/contato" 
                  className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-slate-400 text-slate-300 hover:border-purple-400 hover:text-purple-300 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                >
                  <Users className="w-5 h-5" />
                  <span className="tracking-wide">FALAR COM ESPECIALISTA</span>
                </Link>
              </div>
            </AnimatedHero>

            <AnimatedHero direction="right" className="relative">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-rose-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-premium relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
                
                {/* Hero Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={`/images/setores/${setor.slug}-hero.svg`}
                    alt={`${setor.nome} - Soluções Especializadas`}
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      e.currentTarget.src = '/images/solucoes/default-hero.svg';
                    }}
                  />
                </div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 flex items-center justify-center">
                  <div className="text-center text-white relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm flex items-center justify-center border border-purple-400/30 shadow-glow">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg" />
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold mb-2 tracking-wide">
                      {setor.nome.toUpperCase()}
                    </p>
                    <p className="text-sm text-slate-300 tracking-wider">
                      Soluções especializadas
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
                    <span className="block">Como a OLV Atende o</span>
                    <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      Setor {setor.nome}
                    </span>
                  </h2>

                  <p className="text-xl text-slate-200 mb-8 leading-relaxed font-medium max-w-4xl mx-auto">
                    A OLV Internacional possui expertise específica no setor {setor.nome}, 
                    oferecendo consultoria estratégica especializada para identificar as melhores 
                    soluções TOTVS que atendem às necessidades únicas do seu segmento.
                  </p>

                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                      {
                        icon: Shield,
                        title: 'CONHECIMENTO SETORIAL',
                        description: 'Experiência específica nas particularidades do setor',
                        gradient: 'from-emerald-500 to-teal-600'
                      },
                      {
                        icon: Zap,
                        title: 'SOLUÇÕES PERSONALIZADAS',
                        description: 'Implementação adaptada às necessidades do segmento',
                        gradient: 'from-teal-500 to-cyan-600'
                      },
                      {
                        icon: TrendingUp,
                        title: 'RESULTADOS COMPROVADOS',
                        description: 'Cases de sucesso em empresas do mesmo setor',
                        gradient: 'from-cyan-500 to-blue-600'
                      }
                    ].map((item, index) => (
                      <AnimatedCard
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
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
          </AnimatedCard>
        </div>
      </section>

      {/* Premium Principais Desafios */}
      <section className="section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-hexagon" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                <span className="block">Principais</span>
                <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Desafios do Setor
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {setor.desafios.map((desafio, index) => (
                <AnimatedCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-red-400/30 flex-shrink-0 mt-1">
                          <AlertCircle className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                            {desafio}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Premium Soluções Aplicáveis */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                <span className="block">Soluções</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Recomendadas
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {setor.solucoes_aplicaveis.map((solucaoNome, index) => {
                // Mapear nomes para IDs corretos
                const nomeToId: Record<string, string> = {
                  'Sistema de Gestão (ERP)': 'sistema-gestao',
                  'Fluig': 'fluig',
                  'Analytics': 'analytics',
                  'Cloud': 'cloud',
                  'Techfin': 'techfin',
                  'Assinatura Eletrônica': 'assinatura-eletronica',
                  'CRM': 'crm',
                  'iPaaS': 'ipaas',
                };
                
                const solucaoId = nomeToId[solucaoNome] || solucaoNome.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
                const solucao = getSolucaoById(solucaoId);
                if (!solucao) return null;

                return (
                  <AnimatedCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Link href={`/solucoes/${solucao.slug}`} className="block">
                      <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30 flex-shrink-0 mt-1">
                              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                                {solucaoNome}
                              </h3>
                              <p className="text-slate-300 text-sm">
                                Ideal para {setor.nome}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedCard>
                );
              })}
            </div>
          </AnimatedCard>
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
          <AnimatedCard
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedCard 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="relative">
              {/* Premium Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-2xl opacity-50" />
              
              <div className="card-premium relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
                
                <div className="relative z-10">
                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                    <span className="block">Pronto para Transformar o</span>
                    <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Setor {setor.nome}?
                    </span>
                  </h2>
                  <p className="text-xl mb-10 text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
                    Descubra como nossas soluções especializadas podem revolucionar 
                    a gestão da sua empresa no setor {setor.nome}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <AnimatedCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        href="/diagnostico" 
                        className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-glow hover:shadow-futuristic transition-all"
                      >
                        <span className="relative z-10 tracking-wide">DIAGNÓSTICO GRATUITO</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </AnimatedCard>
                    <AnimatedCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        href="/contato" 
                        className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-slate-400 text-slate-300 hover:border-purple-400 hover:text-purple-300 px-10 py-5 rounded-2xl font-black text-xl transition-all"
                      >
                        <Users className="w-6 h-6" />
                        <span className="tracking-wide">FALAR COM ESPECIALISTA</span>
                      </Link>
                    </AnimatedCard>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>
    </>
  );
}
