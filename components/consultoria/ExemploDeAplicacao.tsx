'use client';

import { Lightbulb, TrendingUp, CheckCircle2, Info } from 'lucide-react';

interface ExemploDeAplicacaoProps {
  setor: string;
  tipoEmpresa: string; // Ex: "Distribuidoras de médio porte"
  desafioComum: string;
  contextoMercado: string;
  resultadosReaisMercado: {
    metrica: string;
    ganho: string;
    fonte?: string;
    link?: string; // Link para matéria/case original
  }[];
  comoPodemos: {
    etapa: string;
    descricao: string;
  }[];
}

const ExemploDeAplicacao = ({
  setor,
  tipoEmpresa,
  desafioComum,
  contextoMercado,
  resultadosReaisMercado,
  comoPodemos,
}: ExemploDeAplicacaoProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft border-2 border-neutral-200 hover:border-primary-200 transition-all">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          {setor}
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          {tipoEmpresa}
        </h3>
        <p className="text-danger-600 font-semibold text-lg">
          {desafioComum}
        </p>
      </div>

      {/* Contexto de Mercado */}
      <div className="bg-neutral-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <Info className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
          <h4 className="font-semibold text-neutral-900">Cenário Real do Mercado</h4>
        </div>
        <p className="text-neutral-700 text-sm leading-relaxed">
          {contextoMercado}
        </p>
      </div>

      {/* Resultados Reais Observados no Mercado */}
      <div className="bg-gradient-to-br from-success-50 to-success-100/50 rounded-xl p-6 mb-6 border border-success-200">
        <div className="flex items-start gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
          <h4 className="font-bold text-success-900">
            Resultados Reais Observados no Mercado
          </h4>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {resultadosReaisMercado.map((resultado, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-success-200"
            >
              <div className="font-semibold text-neutral-900 mb-2 text-sm">
                {resultado.metrica}
              </div>
              <div className="text-success-700 font-bold mb-2">
                {resultado.ganho}
              </div>
              {resultado.fonte && (
                <div className="text-xs text-neutral-500">
                  {resultado.link ? (
                    <a
                      href={resultado.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline flex items-center gap-1"
                    >
                      <span className="italic">Fonte: {resultado.fonte}</span>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ) : (
                    <span className="italic">Fonte: {resultado.fonte}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Como OLV + TOTVS PODEM Ajudar */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6 mb-4 border-2 border-primary-200">
        <div className="flex items-start gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
          <h4 className="font-bold text-primary-900 text-lg">
            Como OLV + TOTVS PODEM Ajudar Você a Alcançar Resultados Similares
          </h4>
        </div>

        <div className="space-y-4">
          {comoPodemos.map((etapa, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-neutral-900 mb-1 text-sm">
                  {etapa.etapa}
                </h5>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {etapa.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Nota */}
      <div className="bg-neutral-50 rounded-lg p-4 border-l-4 border-primary-500">
        <p className="text-xs text-neutral-600 leading-relaxed">
          <strong>Nota:</strong> Resultados apresentados são baseados em casos reais de implementações
          TOTVS no mercado. Cada projeto é único e os resultados podem variar conforme contexto,
          porte e maturidade de cada empresa. A OLV Internacional atua como consultor estratégico
          para mapear suas necessidades e facilitar a aplicação dessas soluções em seu negócio.
        </p>
      </div>
    </div>
  );
};

export default ExemploDeAplicacao;

