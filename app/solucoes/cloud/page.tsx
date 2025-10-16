import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getSolucaoBySlug } from '@/lib/data/solucoes';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';

export const metadata = { title: 'Cloud Infrastructure | OLV Internacional + TOTVS' };

export default function CloudPage() {
  const solucao = getSolucaoBySlug('cloud');
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

      <IntroducaoInstitucionalOLV nomeSolucao="TOTVS Cloud" aplicacaoEspecifica="infraestrutura cloud segura, escalável e otimizada para sistemas TOTVS" />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-bold text-neutral-900 mb-6">O que é {solucao.nome}?</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">{solucao.descricao}</p>
          </div>
        </div>
      </section>

      <section className="section text-white" style={{ background: `linear-gradient(135deg, ${solucao.cor} 0%, ${solucao.cor}dd 100%)` }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-bold mb-4">Migre para Cloud com Segurança</h2>
            <Link href="/diagnostico" className="btn bg-white" style={{ color: solucao.cor }}>Fazer Diagnóstico <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

