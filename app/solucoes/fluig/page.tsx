import Link from 'next/link';
import { ArrowRight, Check, Star, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug, SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import ExemploDeAplicacao from '@/components/consultoria/ExemploDeAplicacao';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';

export const metadata = {
  title: 'Fluig - Automação de Processos BPM | OLV Internacional + TOTVS',
  description:
    'Automatize workflows e elimine processos manuais com Fluig TOTVS. Consultoria OLV para aplicação estratégica de BPM.',
};

export default function FluigPage() {
  const solucao = getSolucaoBySlug('fluig');

  if (!solucao) {
    return null;
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  return (
    <>
      {/* Hero - MANTIDO */}
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

      {/* 🆕 INTRODUÇÃO INSTITUCIONAL OLV */}
      <IntroducaoInstitucionalOLV
        nomeSolucao="Fluig TOTVS"
        aplicacaoEspecifica="automação de processos, workflows, gestão documental e colaboração corporativa"
      />

      {/* O que é - MANTIDO */}
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

      {/* 🆕 EXEMPLOS DE APLICAÇÃO REAL */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-neutral-900 mb-4">
                Exemplos Reais de Aplicação no Mercado
              </h2>
              <p className="text-lg text-neutral-600">
                Veja como empresas automatizam processos com Fluig e como OLV + TOTVS
                podem ajudar você a alcançar resultados similares
              </p>
            </div>

            {/* 5 CASOS REAIS DO FLUIG */}
            
            {/* Case 1: B&F Dias */}
            <div className="mb-8">
              <ExemploDeAplicacao
                setor="Indústria & Serviços"
                tipoEmpresa="Empresas com Processos de Aprovação Complexos"
                desafioComum="Processos manuais em vendas, financeiro e faturamento"
                contextoMercado="A B&F Dias revitalizou o ERP RM e implantou Fluig para automatizar processos críticos de vendas, financeiro e faturamento. A empresa eliminou etapas manuais, padronizou fluxos e trouxe rastreabilidade completa, acelerando aprovações e aumentando produtividade. O BPM/ECM conectou áreas e melhorou qualidade da informação para gestão."
                resultadosReaisMercado={[
                  {
                    metrica: 'Automação de processos críticos',
                    ganho: 'Vendas, financeiro e faturamento integrados',
                    fonte: 'Case B&F Dias',
                    link: 'https://crmservices.com.br/cases/bfdias/',
                  },
                  {
                    metrica: 'Redução de etapas manuais',
                    ganho: 'Fluxos padronizados e rastreáveis',
                    fonte: 'Case B&F Dias - Fluig',
                    link: 'https://crmservices.com.br/cases/bfdias/',
                  },
                  {
                    metrica: 'Colégio Notre Dame: BPM na educação',
                    ganho: 'Solicitações e documentos digitalizados',
                    fonte: 'Notre Dame adota Fluig',
                    link: 'https://www.baguete.com.br/noticias/colegio-notre-dame-adota-fluig-da-totvs',
                  },
                  {
                    metrica: 'Certisign: ECM + BPM + SSO',
                    ganho: 'Gestão documental com segurança',
                    fonte: 'Certisign adota Fluig',
                    link: 'https://www.baguete.com.br/noticias/certisign-adota-fluig-da-totvs',
                  },
                  {
                    metrica: 'CR Almeida (EcoRodovias)',
                    ganho: 'Contratos e validações jurídicas aceleradas',
                    fonte: 'CR Almeida + Fluig',
                    link: 'https://www.baguete.com.br/noticias/cr-almeida-adota-fluig-da-totvs',
                  },
                ]}
                comoPodemos={[
                  {
                    etapa: 'Mapeamento de Processos (OLV)',
                    descricao: 'Com nossa expertise em processos operacionais complexos e supply chain, mapeamos todos os workflows da sua empresa: aprovações, documentação, comunicação entre áreas. Identificamos onde Fluig pode eliminar gargalos e automatizar tarefas repetitivas.',
                  },
                  {
                    etapa: 'Interpretação de BPM em Seu Contexto (OLV)',
                    descricao: 'Explicamos COMO workflows do Fluig funcionariam no seu dia a dia específico. Mostramos exemplos práticos: aprovação de compras, gestão de contratos, onboarding de funcionários, solicitações internas. Traduzimos conceitos técnicos de BPM em ganhos reais para sua operação.',
                  },
                  {
                    etapa: 'Design de Workflows Personalizados (OLV + TOTVS)',
                    descricao: 'Desenhamos os workflows que serão implementados, priorizando quick wins (aprovações mais lentas primeiro). Facilitamos alinhamento com time TOTVS sobre complexidade técnica, integrações necessárias e prazos realistas.',
                  },
                  {
                    etapa: 'Implementação Técnica de BPM (TOTVS)',
                    descricao: 'Equipe TOTVS configura Fluig, cria formulários eletrônicos, implementa workflows, integra com sistemas existentes (ERP, email, etc), treina usuários e realiza go-live. Garantia de funcionamento técnico e conformidade.',
                  },
                  {
                    etapa: 'Otimização Contínua de Processos (OLV)',
                    descricao: 'Acompanhamos uso do Fluig, identificamos processos adicionais que podem ser automatizados. Sugerimos expansões: integração com assinatura eletrônica, Analytics para análise de gargalos, iPaaS para integrações mais complexas.',
                  },
                ]}
              />
            </div>

            {/* Exemplo 2: Setores Diversos */}
            <ExemploDeAplicacao
              setor="Diversos Setores"
              tipoEmpresa="Empresas com Alto Volume de Aprovações"
              desafioComum="Aprovações manuais lentas e sem rastreabilidade"
              contextoMercado="Empresas de diversos setores enfrentam gargalos em processos de aprovação: compras demoram dias ou semanas, contratos ficam parados, documentos se perdem. Estudos indicam que aprovações manuais consomem 30-40% do tempo de gestores intermediários. Fluig permite automatização completa com rastreabilidade total."
              resultadosReaisMercado={[
                {
                  metrica: 'Redução típica em aprovações',
                  ganho: 'De dias para horas/minutos',
                  fonte: 'Implementações BPM no mercado',
                },
                {
                  metrica: 'Rastreabilidade documental',
                  ganho: '100% dos documentos rastreáveis',
                  fonte: 'Funcionalidade nativa Fluig',
                },
                {
                  metrica: 'Eliminação de papel',
                  ganho: 'Até 90% dos processos digitalizados',
                  fonte: 'Cases gestão eletrônica documentos',
                },
                {
                  metrica: 'Conformidade e auditoria',
                  ganho: 'Evidências automáticas para auditorias',
                  fonte: 'Governança corporativa',
                },
              ]}
              comoPodemos={[
                {
                  etapa: 'Auditoria de Processos Manuais (OLV)',
                  descricao: 'Identificamos TODOS os processos manuais que consomem tempo: aprovações, solicitações, documentação. Com nossa experiência em gestão empresarial, priorizamos os mais críticos (maior impacto + menor complexidade técnica).',
                },
                {
                  etapa: 'Demonstração Contextualizada (OLV)',
                  descricao: 'Mostramos Fluig funcionando em casos similares ao seu. Não apenas apresentamos a ferramenta, mas simulamos como seria uma aprovação de compra, um workflow de férias, um processo de onboarding no SEU contexto específico.',
                },
                {
                  etapa: 'Facilitação e Priorização (OLV + TOTVS)',
                  descricao: 'Ajudamos a definir QUAIS processos automatizar primeiro (quick wins), QUANDO implementar cada um e COMO medir sucesso. Conectamos com time TOTVS para definição técnica.',
                  },
                {
                  etapa: 'Implementação de Workflows (TOTVS)',
                  descricao: 'TOTVS implementa tecnicamente: criação de formulários, configuração de workflows, integrações, treinamentos. Garantia de funcionamento e suporte técnico.',
                },
                {
                  etapa: 'Expansão e Melhoria Contínua (OLV)',
                  descricao: 'Após primeiros workflows, identificamos novos processos para automatizar. Sugerimos integrações com assinatura eletrônica TOTVS, conexão com ERP via iPaaS, ou Analytics para análise de tempos de aprovação.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Funcionalidades - MANTIDO */}
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

      {/* Benefícios - MANTIDO */}
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

      {/* Casos de Uso - MANTIDO */}
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

      {/* CTA Final - MANTIDO */}
      <section
        className="section text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)`,
        }}
      >
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-4">
              Pronto para Automatizar Seus Processos?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Faça um diagnóstico gratuito e descubra como Fluig pode eliminar
              processos manuais e acelerar aprovações
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

      {/* Outras Soluções - MANTIDO */}
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

