import Link from 'next/link';
import { ArrowRight, Check, Star, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug, SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';

export const metadata = {
  title: 'iPaaS - Integração de Sistemas | OLV Internacional + TOTVS',
  description:
    'Conecte sistemas e dados com TOTVS iPaaS. Consultoria OLV para integrações estratégicas.',
};

export default function IPaaSPage() {
  const solucao = getSolucaoBySlug('ipaas');

  if (!solucao) {
    return null;
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${solucao.cor}15 0%, ${solucao.cor}05 100%)` }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: `${solucao.cor}20`, color: solucao.cor }}>
                Solução TOTVS
              </div>
              <h1 className="text-display-2 font-bold text-neutral-900 mb-6">{solucao.titulo}</h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">{solucao.subtitulo}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostico" className="btn btn-primary" style={{ backgroundColor: solucao.cor }}>
                  Solicitar Demonstração <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contato" className="btn btn-outline">Falar com Especialista</Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl flex items-center justify-center shadow-strong" style={{ background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)` }}>
                <div className="text-white">{getIcon(solucao.icone)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IntroducaoInstitucionalOLV nomeSolucao="TOTVS iPaaS" aplicacaoEspecifica="integração de sistemas, sincronização de dados e orquestração de processos entre aplicações" />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold text-neutral-900 mb-6">O que é {solucao.nome}?</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">{solucao.descricao}</p>
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">Funcionalidades Principais</h2>
            <p className="text-lg text-neutral-600">Tudo que você precisa em uma única plataforma integrada</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solucao.funcionalidades.map((funcionalidade, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${solucao.cor}20` }}>
                    <Check className="w-4 h-4" style={{ color: solucao.cor }} />
                  </div>
                  <p className="text-neutral-800 font-medium">{funcionalidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">Benefícios para Seu Negócio</h2>
            <p className="text-lg text-neutral-600">Resultados tangíveis e transformação real</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solucao.beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${solucao.cor}15` }}>
                  <TrendingUp className="w-6 h-6" style={{ color: solucao.cor }} />
                </div>
                <div><p className="text-neutral-800 font-medium leading-relaxed">{beneficio}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">Casos de Uso</h2>
            <p className="text-lg text-neutral-600">Aplicações práticas em diferentes cenários</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {solucao.casos_uso.map((caso, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft border-l-4" style={{ borderColor: solucao.cor }}>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: solucao.cor }} />
                  <p className="text-neutral-800">{caso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)` }}>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-4">Pronto para Integrar Seus Sistemas?</h2>
            <p className="text-xl mb-8 text-white/90">Faça um diagnóstico gratuito e descubra como iPaaS pode conectar suas aplicações</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnostico" className="btn bg-white hover:bg-neutral-100" style={{ color: solucao.cor }}>
                Fazer Diagnóstico Gratuito <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contato" className="btn border-2 border-white text-white hover:bg-white/10">Falar com Especialista</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-h3 font-bold text-neutral-900 mb-8 text-center">Outras Soluções TOTVS</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SOLUCOES_TOTVS.filter((s) => s.id !== solucao.id).slice(0, 3).map((outraSolucao) => (
              <Link key={outraSolucao.id} href={`/solucoes/${outraSolucao.slug}`} className="card p-6 group hover:shadow-medium transition-shadow">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${outraSolucao.cor}15`, color: outraSolucao.cor }}>
                  {getIcon(outraSolucao.icone)}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">{outraSolucao.nome}</h3>
                <p className="text-sm text-neutral-600 line-clamp-2 mb-3">{outraSolucao.subtitulo}</p>
                <div className="flex items-center gap-2 text-primary-600 text-sm font-medium">Saiba mais <ArrowRight className="w-4 h-4" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

