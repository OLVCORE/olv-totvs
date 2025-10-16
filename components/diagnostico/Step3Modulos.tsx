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
    <div>
      <h2 className="text-h3 font-bold text-neutral-900 mb-2">
        Quais módulos/soluções te interessam?
      </h2>
      <p className="text-neutral-600 mb-8">
        Selecione uma ou mais opções (múltipla escolha)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {modulos.map((modulo) => (
          <button
            key={modulo}
            onClick={() => toggleModulo(modulo)}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selectedModulos.includes(modulo)
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{modulo}</span>
              {selectedModulos.includes(modulo) && (
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedModulos.length > 0 && (
        <div className="mb-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-800">
            <strong>{selectedModulos.length}</strong>{' '}
            {selectedModulos.length === 1 ? 'módulo selecionado' : 'módulos selecionados'}
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={onBack} className="btn btn-ghost">
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedModulos.length === 0}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Step3Modulos;

