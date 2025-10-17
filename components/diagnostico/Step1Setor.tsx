'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Setor } from '@/types';

interface Props {
  data?: { setor: Setor };
  onNext: (data: { setor: Setor }) => void;
}

const Step1Setor = ({ data, onNext }: Props) => {
  const [selectedSetor, setSelectedSetor] = useState<Setor | null>(
    data?.setor || null
  );

  const setores: Setor[] = [
    'Agro',
    'Construção',
    'Distribuição',
    'Financial Services',
    'Logística',
    'Manufatura',
    'Prestadores de Serviços',
    'Outro',
  ];

  const handleSubmit = () => {
    if (selectedSetor) {
      onNext({ setor: selectedSetor });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
        Qual o seu setor de atuação?
      </h2>
      <p className="text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
        Selecione o segmento que melhor representa seu negócio
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {setores.map((setor) => (
          <button
            key={setor}
            onClick={() => setSelectedSetor(setor)}
            className={`relative p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 transition-all text-left ${
              selectedSetor === setor
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-600 bg-slate-800/50 hover:border-cyan-400 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-white text-sm sm:text-base">{setor}</span>
              {selectedSetor === setor && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedSetor}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-3 sm:py-4"
      >
        Continuar
      </button>
    </div>
  );
};

export default Step1Setor;

