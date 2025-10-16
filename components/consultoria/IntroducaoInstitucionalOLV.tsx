'use client';

import { Globe2, TrendingUp, Lightbulb, Zap, Award, Target } from 'lucide-react';

interface IntroducaoInstitucionalOLVProps {
  nomeSolucao: string; // Ex: "ERP TOTVS", "Fluig", "Analytics"
  aplicacaoEspecifica: string; // Ex: "gestão financeira integrada", "automação de processos"
}

const IntroducaoInstitucionalOLV = ({
  nomeSolucao,
  aplicacaoEspecifica,
}: IntroducaoInstitucionalOLVProps) => {
  return (
    <section className="section bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Globe2 className="w-4 h-4" />
              Consultoria Especializada em Supply Chain Global e Comércio Exterior
            </div>
            <h2 className="text-h1 font-bold mb-6">
              OLV Internacional + TOTVS
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Como nossa experiência em negócios globais se une à tecnologia de ponta
              TOTVS para potencializar resultados em <strong>{aplicacaoEspecifica}</strong>
            </p>
          </div>

          {/* Expertise OLV */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Nossa Experiência */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">35+ Anos de Experiência</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Especialistas em <strong>Supply Chain Global</strong> e{' '}
                    <strong>Logística Internacional</strong> para setores industriais
                    de alta complexidade.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/90">
                    <strong>Setores de Atuação:</strong> Agroindústria, Mineração, Energia,
                    Petróleo & Gás, Metalurgia, Bens de Capital, Máquinas & Equipamentos,
                    Manufatura e Logística Industrial
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/90">
                    <strong>Expertise Core:</strong> Procurement Estratégico, Comércio
                    Exterior, Importação & Exportação, Gestão de Fornecedores Globais,
                    Compras Estratégicas, Planejamento de Supply Chain
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/90">
                    <strong>Abordagem:</strong> Simplificamos operações complexas, otimizamos
                    processos e transformamos estratégias em resultados práticos e mensuráveis
                  </span>
                </div>
              </div>
            </div>

            {/* Alicerce Tecnológico TOTVS */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 border-2 border-primary-400 shadow-strong">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Alicerce Tecnológico TOTVS</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Nossa consultoria estratégica se potencializa exponencialmente quando
                    unida à tecnologia de ponta TOTVS.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/90">
                    <strong>Diagnóstico + Tecnologia:</strong> Identificamos necessidades
                    com nossa experiência e recomendamos {nomeSolucao} como solução tecnológica
                    adequada para {aplicacaoEspecifica}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/90">
                    <strong>Estratégia + Execução:</strong> Traduzimos processos complexos
                    de supply chain em configurações técnicas do sistema TOTVS, garantindo
                    que a tecnologia atenda necessidades reais do dia a dia
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/90">
                    <strong>Consultoria + Implementação:</strong> Nossa expertise em negócios
                    globais somada à excelência técnica TOTVS cria sinergia única para
                    transformação digital efetiva
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Proposta de Valor */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Target className="w-10 h-10 text-primary-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Do Diagnóstico à Execução</h4>
                <p className="text-sm text-white/80">
                  Mapeamos necessidades com profundidade e aplicamos {nomeSolucao} de
                  forma estratégica e contextualizada
                </p>
              </div>
              <div>
                <Lightbulb className="w-10 h-10 text-primary-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Experiência + Tecnologia</h4>
                <p className="text-sm text-white/80">
                  35 anos em supply chain global potencializados pela plataforma
                  tecnológica líder de mercado
                </p>
              </div>
              <div>
                <TrendingUp className="w-10 h-10 text-primary-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Resultados Mensuráveis</h4>
                <p className="text-sm text-white/80">
                  Atuamos como extensão da sua equipe, focando exclusivamente em entregar
                  valor tangível e sustentável
                </p>
              </div>
            </div>
          </div>

          {/* Footer - Como Trabalhamos */}
          <div className="mt-10 text-center">
            <p className="text-white/70 text-sm mb-4">
              <strong>Nosso Modelo:</strong> Consultoria estratégica OLV + Implementação
              técnica TOTVS = Transformação digital efetiva
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                'Supply Chain Global',
                'Comércio Exterior',
                'Procurement Estratégico',
                'Gestão de Fornecedores',
                'Planejamento Estratégico',
                'Transformação Digital',
                'Tecnologia TOTVS',
              ].map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroducaoInstitucionalOLV;

