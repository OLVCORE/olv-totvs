'use client';

import { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { Modulo } from '@/types';

interface Props {
  data?: { modulos: Modulo[] };
  onNext: (data: { modulos: Modulo[] }) => void;
  onBack: () => void;
}

const Step3Modulos = ({ data, onNext, onBack }: Props) => {
  const [selectedModulos, setSelectedModulos] = useState<Modulo[]>(
    data?.modulos || []
  );

  const modulos: Modulo[] = [
    'Sistema de Gestão (ERP)',
    'Fluig',
    'iPaaS',
    'CRM / Automação',
    'Techfin',
    'Analytics',
    'Assinatura Eletrônica',
    'Cloud',
    'RH',
  ];

  const toggleModulo = (modulo: Modulo) => {
    setSelectedModulos((prev) => {
      if (prev.includes(modulo)) {
        return prev.filter((m) => m !== modulo);
      } else {
        return [...prev, modulo];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedModulos.length > 0) {
      onNext({ modulos: selectedModulos });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
        Quais módulos/soluções te interessam?
      </h2>
      <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
        Selecione uma ou mais opções (múltipla escolha)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {modulos.map((modulo) => (
          <button
            key={modulo}
            onClick={() => toggleModulo(modulo)}
            className={`relative p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 transition-all text-left ${
              selectedModulos.includes(modulo)
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-600 bg-slate-800/50 hover:border-cyan-400 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-white text-sm sm:text-base">{modulo}</span>
              {selectedModulos.includes(modulo) && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedModulos.length > 0 && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
          <p className="text-xs sm:text-sm text-cyan-300">
            <strong>{selectedModulos.length}</strong>{' '}
            {selectedModulos.length === 1 ? 'módulo selecionado' : 'módulos selecionados'}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button onClick={onBack} className="btn btn-ghost text-sm sm:text-base py-3 sm:py-4">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Voltar
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedModulos.length === 0}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-3 sm:py-4"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Step3Modulos;

