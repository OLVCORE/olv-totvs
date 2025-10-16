import Link from 'next/link';
import { ArrowRight, Check, Star, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug, SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import { getCasesByProduto } from '@/lib/data/cases-master';
import ExemploDeAplicacao from '@/components/consultoria/ExemploDeAplicacao';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';

export const metadata = {
  title: 'Inteligência Artificial TOTVS | OLV Internacional',
  description:
    'IA aplicada a negócios: atendimento, vendas conversacionais e CX. Consultoria estratégica OLV + tecnologia TOTVS.',
};

const cases = getCasesByProduto('Inteligência Artificial');

export default function InteligenciaArtificialPage() {
  const solucao = getSolucaoBySlug('inteligencia-artificial');

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
        nomeSolucao="Inteligência Artificial TOTVS"
        aplicacaoEspecifica="IA conversacional, automação de atendimento, vendas inteligentes e experiência do cliente"
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

      {/* EXEMPLOS DE APLICAÇÃO - 5 CASOS REAIS */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-neutral-900 mb-4">
                Exemplos Reais de Aplicação no Mercado
              </h2>
              <p className="text-lg text-neutral-600">
                Como empresas aplicam IA para acelerar atendimento, vendas e experiência do
                cliente
              </p>
            </div>

            {/* Caso 1: Universo TOTVS 2025 */}
            <div className="mb-12">
              <ExemploDeAplicacao
                setor={cases[0].setor}
                tipoEmpresa="Multi-setores aplicando IA aos negócios"
                desafioComum="Empresas buscando entender como IA pode gerar valor real em atendimento, previsões e integrações com ERP/CRM"
                contextoMercado={cases[0].resumoLongo}
                resultadosReaisMercado={[
                  {
                    metrica: cases[0].area,
                    ganho: cases[0].resumoCurto,
                    fonte: cases[0].ctaLink,
                    link: cases[0].ctaUrl,
                  },
                ]}
                comoPodemos={[
                  {
                    etapa: 'Mapeamento de Oportunidades de IA (OLV)',
                    descricao:
                      'Identificamos onde IA pode gerar maior impacto na sua operação: atendimento (chatbots), vendas (qualificação de leads), logística (previsão de demanda), finanças (detecção de anomalias).',
                  },
                  {
                    etapa: 'Diagnóstico de Maturidade Tecnológica (OLV)',
                    descricao:
                      'Avaliamos qualidade dos seus dados, integrações existentes e prontidão para IA. Definimos roadmap realista baseado na sua infraestrutura atual.',
                  },
                  {
                    etapa: 'Piloto Orientado a Resultados (OLV + TOTVS)',
                    descricao:
                      'Desenhamos prova de conceito com métricas claras (ex: reduzir 30% do volume de atendimento humano). Facilitamos definição técnica com time TOTVS.',
                  },
                  {
                    etapa: 'Implementação de IA (TOTVS)',
                    descricao:
                      'TOTVS implementa solução de IA: treinamento de modelos, integração com ERP/CRM, configuração de regras de negócio, dashboards de performance.',
                  },
                  {
                    etapa: 'Evolução e Escala (OLV)',
                    descricao:
                      'Acompanhamos resultados, sugerimos expansões: IA em novos canais (WhatsApp, site), novos casos de uso (previsão, recomendação), integração com Analytics.',
                  },
                ]}
              />
            </div>

            {/* Caso 2: IA Conversacional no WhatsApp */}
            <div className="mb-12">
              <ExemploDeAplicacao
                setor={cases[1].setor}
                tipoEmpresa="Empresas com alto volume de consultas repetitivas"
                desafioComum="Times sobrecarregados com perguntas frequentes, tempos de resposta longos e baixa satisfação do cliente"
                contextoMercado={cases[1].resumoLongo}
                resultadosReaisMercado={[
                  {
                    metrica: cases[1].area,
                    ganho: cases[1].resumoCurto,
                    fonte: cases[1].ctaLink,
                    link: cases[1].ctaUrl,
                  },
                ]}
                comoPodemos={[
                  {
                    etapa: 'Mapeamento de Conversas (OLV)',
                    descricao:
                      'Analisamos principais perguntas, canais de contato e jornadas do cliente. Identificamos o que pode ser automatizado sem perder qualidade.',
                  },
                  {
                    etapa: 'Desenho de Fluxos Conversacionais (OLV)',
                    descricao:
                      'Criamos árvores de decisão: quando escalar para humano, quando resolver automaticamente, como integrar com sistemas internos (CRM, ERP).',
                  },
                  {
                    etapa: 'Facilitação Técnica (OLV + TOTVS)',
                    descricao:
                      'Conectamos com time TOTVS para definir integrações, treinamento de IA, permissões e métricas de sucesso.',
                  },
                  {
                    etapa: 'Implementação de Chatbot (TOTVS)',
                    descricao:
                      'TOTVS implementa IA conversacional: treinamento de linguagem natural, integração com WhatsApp/site, dashboard de performance.',
                  },
                  {
                    etapa: 'Otimização Contínua (OLV)',
                    descricao:
                      'Revisamos conversas não resolvidas, ajustamos fluxos, sugerimos novos casos de uso (upsell, retenção, onboarding).',
                  },
                ]}
              />
            </div>

            {/* Caso 3: Chat Commerce */}
            <div className="mb-12">
              <ExemploDeAplicacao
                setor={cases[2].setor}
                tipoEmpresa="Varejo e comércio com vendas online"
                desafioComum="Leads qualificados se perdendo no funil, baixa conversão em canais de mensagem, dificuldade de rastrear jornada"
                contextoMercado={cases[2].resumoLongo}
                resultadosReaisMercado={[
                  {
                    metrica: cases[2].area,
                    ganho: cases[2].resumoCurto,
                    fonte: cases[2].ctaLink,
                    link: cases[2].ctaUrl,
                  },
                ]}
                comoPodemos={[
                  {
                    etapa: 'Diagnóstico de Funil Conversacional (OLV)',
                    descricao:
                      'Mapeamos jornada do lead: desde o primeiro contato até o pedido. Identificamos gargalos, pontos de atrito e oportunidades de automação.',
                  },
                  {
                    etapa: 'Estratégia de Conversação Comercial (OLV)',
                    descricao:
                      'Desenhamos fluxos de vendas conversacionais: qualificação automática, recomendações personalizadas, resgate de carrinhos abandonados.',
                  },
                  {
                    etapa: 'Integração com CRM/ERP (OLV + TOTVS)',
                    descricao:
                      'Facilitamos integração com CRM (histórico do cliente) e ERP (estoque, preços, pedidos) para conversas contextualizadas.',
                  },
                  {
                    etapa: 'Implementação de Chat Commerce (TOTVS)',
                    descricao:
                      'TOTVS implementa solução: IA de qualificação, integração com catálogos, pagamentos, ordens de pedido, dashboards de conversão.',
                  },
                  {
                    etapa: 'Otimização de Conversão (OLV)',
                    descricao:
                      'Analisamos métricas (taxa de resposta, conversão, ticket médio), sugerimos testes A/B e expansões (novos canais, upsell).',
                  },
                ]}
              />
            </div>

            {/* Caso 4: Marketing Conversacional */}
            <div className="mb-12">
              <ExemploDeAplicacao
                setor={cases[3].setor}
                tipoEmpresa="Empresas buscando alinhar marketing, vendas e atendimento"
                desafioComum="Desalinhamento entre times, leads mal qualificados, dificuldade de medir ROI de conversas"
                contextoMercado={cases[3].resumoLongo}
                resultadosReaisMercado={[
                  {
                    metrica: cases[3].area,
                    ganho: cases[3].resumoCurto,
                    fonte: cases[3].ctaLink,
                    link: cases[3].ctaUrl,
                  },
                ]}
                comoPodemos={[
                  {
                    etapa: 'Alinhamento de Processos (OLV)',
                    descricao:
                      'Facilitamos conversa entre marketing, vendas e CX para definir: o que é lead qualificado, quando escalar, como medir sucesso.',
                  },
                  {
                    etapa: 'Desenho de Cadência Conversacional (OLV)',
                    descricao:
                      'Criamos fluxos integrados: marketing nutre com conteúdo, IA qualifica, vendas recebe contexto, CX retém com automações.',
                  },
                  {
                    etapa: 'Estrutura de Métricas (OLV + TOTVS)',
                    descricao:
                      'Definimos KPIs por canal (WhatsApp, site, redes sociais) e integrações com Analytics para governança de funil.',
                  },
                  {
                    etapa: 'Implementação de Plataforma Conversacional (TOTVS)',
                    descricao:
                      'TOTVS implementa: IA multicanal, integração com RD Station/CRM, automações de nutrição, dashboards unificados.',
                  },
                  {
                    etapa: 'Evolução de Estratégia (OLV)',
                    descricao:
                      'Revisamos métricas, sugerimos testes de mensagens, expansão para novos canais e integração com outras soluções TOTVS.',
                  },
                ]}
              />
            </div>

            {/* Caso 5: Estratégias de CX com IA */}
            <div className="mb-12">
              <ExemploDeAplicacao
                setor={cases[4].setor}
                tipoEmpresa="Varejo e serviços focados em retenção de clientes"
                desafioComum="Baixo NPS, churn elevado, dificuldade de personalizar experiências em escala"
                contextoMercado={cases[4].resumoLongo}
                resultadosReaisMercado={[
                  {
                    metrica: cases[4].area,
                    ganho: cases[4].resumoCurto,
                    fonte: cases[4].ctaLink,
                    link: cases[4].ctaUrl,
                  },
                ]}
                comoPodemos={[
                  {
                    etapa: 'Mapeamento de Jornada do Cliente (OLV)',
                    descricao:
                      'Identificamos momentos críticos: onboarding, primeira compra, pós-venda, renovação. Pontos de atrito e oportunidades de encantamento.',
                  },
                  {
                    etapa: 'Estratégia de Personalização (OLV)',
                    descricao:
                      'Desenhamos táticas de CX com IA: recomendações personalizadas, alertas proativos, automação de follow-up, pesquisas de satisfação.',
                  },
                  {
                    etapa: 'Integração com Dados de Cliente (OLV + TOTVS)',
                    descricao:
                      'Facilitamos integração com ERP (histórico de compras), CRM (preferências) e Analytics (comportamento) para IA contextualizada.',
                  },
                  {
                    etapa: 'Implementação de Plataforma de CX (TOTVS)',
                    descricao:
                      'TOTVS implementa: IA de recomendação, automações de retenção, análise de sentimento, dashboards de NPS e churn.',
                  },
                  {
                    etapa: 'Otimização de Retenção (OLV)',
                    descricao:
                      'Analisamos impacto em NPS, lifetime value e churn. Sugerimos novas táticas (programas de fidelidade, upsell inteligente).',
                  },
                ]}
              />
            </div>
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
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">Casos de Uso</h2>
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

      {/* CTA */}
      <section
        className="section text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)`,
        }}
      >
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-4">
              Pronto para Aplicar IA na Sua Operação?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Faça um diagnóstico gratuito e descubra como IA pode acelerar atendimento,
              vendas e experiência do cliente
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

