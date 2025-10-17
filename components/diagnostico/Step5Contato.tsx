'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { validateEmail, validatePhone } from '@/lib/utils';

interface Props {
  data?: {
    nome: string;
    empresa: string;
    email: string;
    telefone: string;
  };
  onSubmit: (data: {
    nome: string;
    empresa: string;
    email: string;
    telefone: string;
  }) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const Step5Contato = ({ data, onSubmit, onBack, isSubmitting }: Props) => {
  const [formData, setFormData] = useState({
    nome: data?.nome || '',
    empresa: data?.empresa || '',
    email: data?.email || '',
    telefone: data?.telefone || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = 'Nome da empresa é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido (mínimo 10 dígitos)';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Você deve aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
        Quase lá! Dados para contato
      </h2>
      <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
        Preencha seus dados para receber o diagnóstico personalizado
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Nome */}
        <div>
          <label className="label text-sm sm:text-base">Nome completo *</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            placeholder="João Silva"
            className={`input text-sm sm:text-base ${errors.nome ? 'input-error' : ''}`}
          />
          {errors.nome && (
            <p className="mt-1 text-xs sm:text-sm text-danger-500">{errors.nome}</p>
          )}
        </div>

        {/* Empresa */}
        <div>
          <label className="label text-sm sm:text-base">Empresa *</label>
          <input
            type="text"
            value={formData.empresa}
            onChange={(e) => handleChange('empresa', e.target.value)}
            placeholder="Exemplo Distribuidora Ltda"
            className={`input text-sm sm:text-base ${errors.empresa ? 'input-error' : ''}`}
          />
          {errors.empresa && (
            <p className="mt-1 text-xs sm:text-sm text-danger-500">{errors.empresa}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label text-sm sm:text-base">Email corporativo *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="joao@empresa.com.br"
            className={`input text-sm sm:text-base ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs sm:text-sm text-danger-500">{errors.email}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="label text-sm sm:text-base">Telefone / WhatsApp *</label>
          <input
            type="tel"
            value={formData.telefone}
            onChange={(e) => handleChange('telefone', e.target.value)}
            placeholder="(11) 99999-9999"
            className={`input text-sm sm:text-base ${errors.telefone ? 'input-error' : ''}`}
          />
          {errors.telefone && (
            <p className="mt-1 text-xs sm:text-sm text-danger-500">{errors.telefone}</p>
          )}
        </div>

        {/* Termos - Responsivo */}
        <div className="bg-slate-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-slate-600">
          <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 border-slate-400 rounded focus:ring-cyan-500"
            />
            <span className="text-xs sm:text-sm text-slate-300">
              Aceito receber contato da OLV Internacional e compartilhar meus
              dados conforme a{' '}
              <a
                href="/privacidade"
                target="_blank"
                className="text-cyan-400 hover:underline"
              >
                Política de Privacidade
              </a>
              . Estou ciente de que meus dados serão tratados de acordo com a
              LGPD.
            </span>
          </label>
          {errors.terms && (
            <p className="mt-2 text-xs sm:text-sm text-danger-500">{errors.terms}</p>
          )}
        </div>

        {/* Buttons - Responsivo */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="btn btn-ghost text-sm sm:text-base py-3 sm:py-4"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Voltar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary flex-1 text-sm sm:text-base py-3 sm:py-4"
          >
            {isSubmitting ? (
              <>
                <div className="spinner w-4 h-4 sm:w-5 sm:h-5 border-2" />
                Enviando...
              </>
            ) : (
              'Enviar Diagnóstico'
            )}
          </button>
        </div>
      </form>

      {/* Trust Note - Responsivo */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
        <p className="text-xs sm:text-sm text-cyan-300 text-center">
          Seus dados estão protegidos. Entraremos em contato em até 2 dias úteis
          com um diagnóstico personalizado e sem compromisso.
        </p>
      </div>
    </div>
  );
};

export default Step5Contato;

