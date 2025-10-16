import Link from 'next/link';
import { ArrowRight, Check, Star, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug, SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import ExemploDeAplicacao from '@/components/consultoria/ExemploDeAplicacao';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';

export const metadata = {
  title: 'CRM e Automação de Vendas | OLV Internacional + TOTVS',
  description:
    'Acelere vendas e melhore conversão com CRM TOTVS e RD Station. Consultoria OLV para aplicação estratégica.',
};

export default function CRMAutomacaoPage() {
  const solucao = getSolucaoBySlug('crm-automacao');

  if (!solucao) {
    return null;
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${solucao.cor}15 0%, ${solucao.cor}05 100%)`,
        }}
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  backgroundColor: `${solucao.cor}20`,
                  color: solucao.cor,
                }}
              >
                Solução TOTVS
              </div>

              <h1 className="text-display-2 font-bold text-neutral-900 mb-6">
                {solucao.titulo}
              </h1>

              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                {solucao.subtitulo}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/diagnostico"
                  className="btn btn-primary"
                  style={{ backgroundColor: solucao.cor }}
                >
                  Solicitar Demonstração
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contato" className="btn btn-outline">
                  Falar com Especialista
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-square rounded-2xl flex items-center justify-center shadow-strong"
                style={{
                  background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)`,
                }}
              >
                <div className="text-white">{getIcon(solucao.icone)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUÇÃO INSTITUCIONAL OLV */}
      <IntroducaoInstitucionalOLV
        nomeSolucao="CRM e Automação de Vendas TOTVS"
        aplicacaoEspecifica="gestão comercial, automação de vendas, relacionamento com clientes e expansão de mercado"
      />

      {/* O que é */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold text-neutral-900 mb-6">
              O que é {solucao.nome}?
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              {solucao.descricao}
            </p>
          </div>
        </div>
      </section>

      {/* EXEMPLOS DE APLICAÇÃO REAL */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-neutral-900 mb-4">
                Exemplos Reais de Aplicação no Mercado
              </h2>
              <p className="text-lg text-neutral-600">
                Veja como empresas aceleram vendas com CRM TOTVS/RD Station e como
                OLV + TOTVS podem ajudar você a alcançar resultados similares
              </p>
            </div>

            <ExemploDeAplicacao
              setor="Serviços & Mobilidade"
              tipoEmpresa="Empresas B2B e B2C com Força de Vendas"
              desafioComum="Gestão de vendas desorganizada e falta de visibilidade do pipeline"
              contextoMercado="A LM Mobilidade conquistou o Prêmio TOTVS Brasil que FAZ 2025 na Categoria Especial Marketing & Vendas ao implementar RD Station CRM e RD Station Marketing. A empresa alcançou gestão de vendas mais eficiente e otimização de campanhas de marketing. Cases no mercado mostram que empresas com CRM bem implementado aumentam conversão e reduzem ciclo de vendas significativamente."
              resultadosReaisMercado={[
                {
                  metrica: 'Gestão de vendas otimizada',
                  ganho: 'Eficiência comprovada em vendas',
                  fonte: 'Case LM Mobilidade - Prêmio TOTVS 2025',
                  link: 'https://mercadoeconsumo.com.br/18/06/2025/tecnologia/totvs-premia-cases-de-inovacao-sebrae-nacional-e-empresa-do-ano/',
                },
                {
                  metrica: 'Otimização de campanhas',
                  ganho: 'Marketing & Vendas integrados',
                  fonte: 'RD Station - Categoria Especial 2025',
                  link: 'https://mercadoeconsumo.com.br/18/06/2025/tecnologia/totvs-premia-cases-de-inovacao-sebrae-nacional-e-empresa-do-ano/',
                },
                {
                  metrica: 'Visibilidade de pipeline',
                  ganho: 'Funil de vendas em tempo real',
                  fonte: 'Funcionalidade CRM',
                },
                {
                  metrica: 'Produtividade de vendedores',
                  ganho: 'Automatização de follow-ups',
                  fonte: 'Automação de força de vendas',
                },
              ]}
              comoPodemos={[
                {
                  etapa: 'Diagnóstico Comercial (OLV)',
                  descricao: 'Com nossa experiência em vendas internacionais e desenvolvimento de mercados, analisamos seu processo comercial completo: prospecção, qualificação, negociação, fechamento, pós-venda. Identificamos onde CRM pode eliminar perda de oportunidades e acelerar ciclo de vendas.',
                },
                {
                  etapa: 'Mapeamento de Funil e Jornada (OLV)',
                  descricao: 'Desenhamos seu funil de vendas ideal e jornada do cliente. Explicamos COMO CRM TOTVS/RD Station funcionaria no seu dia a dia comercial: registro de leads, acompanhamento de oportunidades, automação de follow-ups, previsão de vendas.',
                },
                {
                  etapa: 'Facilitação e Customização (OLV + TOTVS)',
                  descricao: 'Conectamos você com especialistas TOTVS/RD Station. Ajudamos a definir campos personalizados do CRM, etapas do funil, integrações (WhatsApp, email, telefonia), relatórios críticos. Garantimos que CRM seja moldado ao SEU processo.',
                },
                {
                  etapa: 'Implementação e Adoção (TOTVS)',
                  descricao: 'Time TOTVS/RD Station implementa CRM, configura automações, integra com sistemas, treina equipe de vendas. Garantia de funcionamento técnico e suporte.',
                },
                {
                  etapa: 'Otimização de Vendas Contínua (OLV)',
                  descricao: 'Acompanhamos uso do CRM, analisamos métricas de vendas. Sugerimos expansões: integração com ERP para pedidos automáticos, Analytics para previsão de vendas com IA, Marketing digital integrado.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-lg text-neutral-600">
              Tudo que você precisa em uma única plataforma integrada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solucao.funcionalidades.map((funcionalidade, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${solucao.cor}20` }}
                  >
                    <Check className="w-4 h-4" style={{ color: solucao.cor }} />
                  </div>
                  <p className="text-neutral-800 font-medium">{funcionalidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">
              Benefícios para Seu Negócio
            </h2>
            <p className="text-lg text-neutral-600">
              Resultados tangíveis e transformação real
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solucao.beneficios.map((beneficio, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${solucao.cor}15` }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: solucao.cor }} />
                </div>
                <div>
                  <p className="text-neutral-800 font-medium leading-relaxed">
                    {beneficio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">
              Casos de Uso
            </h2>
            <p className="text-lg text-neutral-600">
              Aplicações práticas em diferentes cenários
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {solucao.casos_uso.map((caso, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-soft border-l-4"
                style={{ borderColor: solucao.cor }}
              >
                <div className="flex items-start gap-3">
                  <Star
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: solucao.cor }}
                  />
                  <p className="text-neutral-800">{caso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        className="section text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)`,
        }}
      >
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-4">
              Pronto para Acelerar Suas Vendas?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Faça um diagnóstico gratuito e descubra como CRM pode transformar
              seu processo comercial
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="btn bg-white hover:bg-neutral-100"
                style={{ color: solucao.cor }}
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contato"
                className="btn border-2 border-white text-white hover:bg-white/10"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Outras Soluções */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-h3 font-bold text-neutral-900 mb-8 text-center">
            Outras Soluções TOTVS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SOLUCOES_TOTVS.filter((s) => s.id !== solucao.id)
              .slice(0, 3)
              .map((outraSolucao) => (
                <Link
                  key={outraSolucao.id}
                  href={`/solucoes/${outraSolucao.slug}`}
                  className="card p-6 group hover:shadow-medium transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: `${outraSolucao.cor}15`,
                      color: outraSolucao.cor,
                    }}
                  >
                    {getIcon(outraSolucao.icone)}
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {outraSolucao.nome}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {outraSolucao.subtitulo}
                  </p>
                  <div className="flex items-center gap-2 text-primary-600 text-sm font-medium">
                    Saiba mais
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

