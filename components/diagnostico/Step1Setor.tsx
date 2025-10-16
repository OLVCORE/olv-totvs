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
    <div>
      <h2 className="text-h3 font-bold text-neutral-900 mb-2">
        Qual o seu setor de atuação?
      </h2>
      <p className="text-neutral-600 mb-8">
        Selecione o segmento que melhor representa seu negócio
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {setores.map((setor) => (
          <button
            key={setor}
            onClick={() => setSelectedSetor(setor)}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selectedSetor === setor
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{setor}</span>
              {selectedSetor === setor && (
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedSetor}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continuar
      </button>
    </div>
  );
};

export default Step1Setor;

