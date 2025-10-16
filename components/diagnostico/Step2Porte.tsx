'use client';

import { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { Porte } from '@/types';

interface Props {
  data?: { porte: Porte };
  onNext: (data: { porte: Porte }) => void;
  onBack: () => void;
}

const Step2Porte = ({ data, onNext, onBack }: Props) => {
  const [selectedPorte, setSelectedPorte] = useState<Porte | null>(
    data?.porte || null
  );

  const portes: Porte[] = [
    'Micro (1-10 funcionários)',
    'Pequeno (11-50 funcionários)',
    'Médio (51-250 funcionários)',
    'Grande (251-1000 funcionários)',
    'Enterprise (1000+ funcionários)',
  ];

  const handleSubmit = () => {
    if (selectedPorte) {
      onNext({ porte: selectedPorte });
    }
  };

  return (
    <div>
      <h2 className="text-h3 font-bold text-neutral-900 mb-2">
        Qual o porte da sua empresa?
      </h2>
      <p className="text-neutral-600 mb-8">
        Selecione a faixa que corresponde ao número de funcionários
      </p>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {portes.map((porte) => (
          <button
            key={porte}
            onClick={() => setSelectedPorte(porte)}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selectedPorte === porte
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">{porte}</span>
              {selectedPorte === porte && (
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="btn btn-ghost">
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selectedPorte}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Step2Porte;

