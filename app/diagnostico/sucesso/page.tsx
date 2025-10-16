import Link from 'next/link';
import { CheckCircle2, ArrowRight, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Diagnóstico Enviado com Sucesso | OLV Internacional',
  description: 'Recebemos seu diagnóstico. Entraremos em contato em breve.',
};

export default function DiagnosticoSucessoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 to-white pt-32 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Ícone de Sucesso */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-16 h-16 text-success-600" />
            </div>
          </div>

          {/* Mensagem */}
          <h1 className="text-h1 font-bold text-neutral-900 mb-4">
            Diagnóstico Enviado com Sucesso!
          </h1>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Obrigado por confiar na OLV Internacional + TOTVS. Recebemos suas
            informações e nossa equipe especializada já está analisando seu
            diagnóstico.
          </p>

          {/* O que acontece agora */}
          <div className="bg-white rounded-2xl shadow-strong p-8 mb-8 text-left">
            <h2 className="text-h4 font-bold text-neutral-900 mb-6 text-center">
              O que acontece agora?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    Análise Detalhada
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Nossa equipe irá analisar suas necessidades e preparar um
                    diagnóstico personalizado com as melhores soluções TOTVS para
                    o seu negócio.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    Contato Personalizado
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Em até 2 dias úteis, um especialista entrará em contato via
                    email ou telefone para apresentar o diagnóstico e tirar suas
                    dúvidas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    Proposta Customizada
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Apresentaremos uma proposta completa e personalizada, com
                    investimento, prazos e próximos passos para a implementação.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contatos Diretos */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 mb-8">
            <h3 className="text-h5 font-bold text-neutral-900 mb-4">
              Precisa falar conosco agora?
            </h3>
            <p className="text-neutral-600 mb-6">
              Você também pode entrar em contato diretamente:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="mailto:consultores@olvinternacional.com.br"
                className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Mail className="w-6 h-6 text-primary-600" />
                <div className="text-left">
                  <div className="text-xs text-neutral-500">Email</div>
                  <div className="font-medium text-neutral-900 text-sm">
                    contato@olvinternacional.com.br
                  </div>
                </div>
              </a>

              <a
                href="tel:+5511999999999"
                className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Phone className="w-6 h-6 text-primary-600" />
                <div className="text-left">
                  <div className="text-xs text-neutral-500">Telefone</div>
                  <div className="font-medium text-neutral-900 text-sm">
                    +55 (11) 99999-9999
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              Voltar para Home
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/solucoes" className="btn btn-outline">
              Conhecer Soluções
            </Link>
          </div>

          {/* Mensagem de Confirmação */}
          <div className="mt-8 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-800">
              Um email de confirmação foi enviado para o endereço cadastrado.
              Verifique também sua caixa de spam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

