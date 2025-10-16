import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug } from '@/lib/data/solucoes';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';
import ExemploDeAplicacao from '@/components/consultoria/ExemploDeAplicacao';

export const metadata = { title: 'Assinatura Eletrônica | OLV Internacional + TOTVS' };

export default function AssinaturaEletronicaPage() {
  const solucao = getSolucaoBySlug('assinatura-eletronica');
  if (!solucao) return null;

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-12 h-12" /> : null;
  };

  return (
    <>
      <section className="pt-32 pb-20" style={{ background: `linear-gradient(135deg, ${solucao.cor}15 0%, ${solucao.cor}05 100%)` }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-display-2 font-bold text-neutral-900 mb-6">{solucao.titulo}</h1>
              <p className="text-xl text-neutral-600 mb-8">{solucao.subtitulo}</p>
              <Link href="/diagnostico" className="btn btn-primary" style={{ backgroundColor: solucao.cor }}>Solicitar Demonstração <ArrowRight className="w-5 h-5" /></Link>
            </div>
            <div className="aspect-square rounded-2xl flex items-center justify-center shadow-strong" style={{ background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)` }}>
              <div className="text-white">{getIcon(solucao.icone)}</div>
            </div>
          </div>
        </div>
      </section>

      <IntroducaoInstitucionalOLV nomeSolucao="Assinatura Eletrônica TOTVS" aplicacaoEspecifica="assinatura digital de documentos, contratos e processos com validade jurídica" />

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
              <p className="text-lg text-neutral-600">Veja como empresas digitalizam documentos e aceleram assinaturas</p>
            </div>

            <ExemploDeAplicacao
              setor="Multi-Setorial"
              tipoEmpresa="Empresas com Alto Volume Documental"
              desafioComum="Assinaturas lentas e dependência de papel"
              contextoMercado="A Tradimaq digitalizou a gestão de documentos com TOTVS Assinatura Eletrônica, eliminando gargalos de coleta de assinaturas e reduzindo custos de impressão e deslocamento. Com validade jurídica e trilhas de auditoria, acelerou aprovações e aumentou produtividade, mantendo conformidade e segurança. A solução possui integração nativa ao ERP TOTVS e app mobile."
              resultadosReaisMercado={[
                {
                  metrica: 'Tradimaq: fluidez e produtividade',
                  ganho: 'Aprovações aceleradas com validade jurídica',
                  fonte: 'Case Tradimaq',
                  link: 'https://www.totvs.com/blog/gestao-para-assinatura-de-documentos/case-de-sucesso-tradimaq/',
                },
                {
                  metrica: 'Integração nativa ao ERP',
                  ganho: 'Lançamento oficial com integração',
                  fonte: 'Inforchannel - Lançamento',
                  link: 'https://inforchannel.com.br/2021/04/07/totvs-lanca-solucao-de-assinatura-eletronica-com-integracao-nativa-ao-sistema-de-gestao/',
                },
                {
                  metrica: 'Validade jurídica garantida',
                  ganho: 'ICP-Brasil e conformidade LGPD',
                  fonte: 'Produto TOTVS Assinatura',
                  link: 'https://www.totvs.com/assinatura-eletronica/',
                },
                {
                  metrica: 'App mobile disponível',
                  ganho: 'Assine de qualquer lugar',
                  fonte: 'App Minha Assinatura',
                  link: 'https://produtos.totvs.com/aplicativo/app-minha-assinatura-eletronica/',
                },
                {
                  metrica: 'Demonstração em vídeo',
                  ganho: 'Veja a solução em ação',
                  fonte: 'Vídeo oficial TOTVS',
                  link: 'https://www.youtube.com/watch?v=5mQTgo_PW-0',
                },
              ]}
              comoPodemos={[
                {
                  etapa: 'Diagnóstico Documental (OLV)',
                  descricao: 'Mapeamos TODOS os documentos que precisam de assinatura: contratos, propostas, ordens de compra, documentos de RH. Identificamos gargalos, custos ocultos de impressão/logística e riscos de conformidade.',
                },
                {
                  etapa: 'Interpretação em Seu Contexto (OLV)',
                  descricao: 'Mostramos COMO assinatura eletrônica funcionaria no seu fluxo: desde aprovações internas até contratos com clientes. Explicamos validade jurídica, LGPD e certificação ICP-Brasil em termos práticos.',
                },
                {
                  etapa: 'Facilitação Técnica (OLV + TOTVS)',
                  descricao: 'Conectamos com time TOTVS. Ajudamos a definir quais documentos priorizar, integrações com Fluig/ERP, fluxos de assinatura e permissões. Garantimos alinhamento técnico.',
                },
                {
                  etapa: 'Implementação e Integração (TOTVS)',
                  descricao: 'TOTVS implementa solução completa: configuração, integrações, certificados digitais, treinamentos. Garantia técnica e suporte.',
                },
                {
                  etapa: 'Expansão Estratégica (OLV)',
                  descricao: 'Acompanhamos uso, sugerimos expansão: integrar com Fluig para workflows completos, Analytics para análise de tempos de aprovação, ou outras oportunidades.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section text-white" style={{ background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)` }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-4">Elimine Papel e Acelere Aprovações</h2>
            <Link href="/diagnostico" className="btn bg-white" style={{ color: solucao.cor }}>Fazer Diagnóstico <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

