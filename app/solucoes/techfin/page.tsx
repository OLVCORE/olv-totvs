import Link from 'next/link';
import { ArrowRight, Check, Star, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug, SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';
import ExemploDeAplicacao from '@/components/consultoria/ExemploDeAplicacao';

export const metadata = {
  title: 'Techfin - Soluções Financeiras Digitais | OLV Internacional + TOTVS',
  description: 'Otimize fluxo de caixa com TOTVS Techfin. Consultoria OLV para soluções financeiras.',
};

export default function TechfinPage() {
  const solucao = getSolucaoBySlug('techfin');
  if (!solucao) return null;

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: `${solucao.cor}20`, color: solucao.cor }}>Solução TOTVS</div>
              <h1 className="text-display-2 font-bold text-neutral-900 mb-6">{solucao.titulo}</h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">{solucao.subtitulo}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostico" className="btn btn-primary" style={{ backgroundColor: solucao.cor }}>Solicitar Demonstração <ArrowRight className="w-5 h-5" /></Link>
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

      <IntroducaoInstitucionalOLV nomeSolucao="TOTVS Techfin" aplicacaoEspecifica="gestão financeira digital, fluxo de caixa, antecipação de recebíveis e crédito empresarial" />

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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-neutral-900 mb-4">Exemplos Reais de Aplicação</h2>
              <p className="text-lg text-neutral-600">Veja como empresas otimizam fluxo de caixa com TOTVS Techfin</p>
            </div>

            <ExemploDeAplicacao
              setor="Multi-Setorial"
              tipoEmpresa="Empresas que Precisam de Capital de Giro"
              desafioComum="Fluxo de caixa travado e acesso lento a crédito"
              contextoMercado="TOTVS Techfin oferece antecipação de recebíveis, crédito empresarial e pagamentos integrados ao ERP. Casos reais mostram como empresas ganham capital de giro imediato, melhoram previsibilidade financeira e reduzem fricção em processos de cobrança e pagamento. Gelth, Labtest, SALVABRAS e EMCCAMP são exemplos de aplicação bem-sucedida."
              resultadosReaisMercado={[
                {
                  metrica: 'SALVABRAS: Antecipação ágil',
                  ganho: 'Acesso rápido a capital de giro',
                  fonte: 'Case SALVABRAS - TOTVS Antecipa',
                  link: 'https://pt.linkedin.com/posts/totvstechfin_case-de-sucesso-totvs-antecipa-salvabras-activity-7218992850124869633-vmqu',
                },
                {
                  metrica: 'Gelth: Fluxo de caixa otimizado',
                  ganho: 'Gestão financeira simplificada',
                  fonte: 'Case Gelth - Antecipa',
                  link: 'https://www.youtube.com/watch?v=_c3E-WfWUm0',
                },
                {
                  metrica: 'Labtest: Produtividade financeira',
                  ganho: 'Redução de processos manuais',
                  fonte: 'Case Labtest - Antecipa',
                  link: 'https://www.youtube.com/watch?v=bdqiXOvkfJ4',
                },
                {
                  metrica: 'EMCCAMP: Pagamento Instantâneo',
                  ganho: 'Repasses e controle em tempo real',
                  fonte: 'Case EMCCAMP - Pagamentos',
                  link: 'https://www.youtube.com/watch?v=K-JoUgKX3_Y',
                },
                {
                  metrica: 'Ecossistema financeiro completo',
                  ganho: 'Crédito + Pagamentos + Gestão',
                  fonte: 'TOTVS Techfin',
                  link: 'https://www.totvs.com/techfin/',
                },
              ]}
              comoPodemos={[
                {
                  etapa: 'Diagnóstico Financeiro (OLV)',
                  descricao: 'Com nossa experiência em gestão de capital de giro e comércio exterior, analisamos seu fluxo de caixa, recebíveis, pagamentos e necessidades de crédito. Identificamos onde Techfin pode liberar capital travado e melhorar previsibilidade.',
                },
                {
                  etapa: 'Apresentação de Soluções Financeiras (OLV)',
                  descricao: 'Explicamos COMO antecipação de recebíveis, crédito empresarial e pagamentos integrados funcionariam no seu contexto. Mostramos ROI potencial, taxas competitivas e integração com ERP.',
                },
                {
                  etapa: 'Facilitação com TOTVS Techfin (OLV + TOTVS)',
                  descricao: 'Conectamos você com especialistas TOTVS Techfin. Facilitamos análise de crédito, definição de limites, integração com ERP e processos de compliance.',
                },
                {
                  etapa: 'Implementação e Integração (TOTVS)',
                  descricao: 'TOTVS Techfin implementa soluções financeiras: antecipação, crédito, pagamentos, conciliação automática. Integração nativa com ERP garante dados em tempo real.',
                },
                {
                  etapa: 'Expansão de Serviços Financeiros (OLV)',
                  descricao: 'Acompanhamos uso, sugerimos expansão: split de pagamentos para marketplaces, conta digital PJ, ou integrações com Analytics para análise financeira avançada.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">Funcionalidades Principais</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solucao.funcionalidades.map((funcionalidade, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
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

      <section className="section text-white" style={{ background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)` }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-4">Pronto para Otimizar Seu Fluxo de Caixa?</h2>
            <p className="text-xl mb-8 text-white/90">Faça um diagnóstico gratuito</p>
            <Link href="/diagnostico" className="btn bg-white hover:bg-neutral-100" style={{ color: solucao.cor }}>Fazer Diagnóstico Gratuito <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

