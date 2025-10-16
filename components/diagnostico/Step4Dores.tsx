'use client';

import { useState } from 'react';
import { Check, ArrowLeft, Plus, X } from 'lucide-react';

interface Props {
  data?: { dores: string[] };
  onNext: (data: { dores: string[] }) => void;
  onBack: () => void;
}

const Step4Dores = ({ data, onNext, onBack }: Props) => {
  const [selectedDores, setSelectedDores] = useState<string[]>(
    data?.dores || []
  );
  const [customDor, setCustomDor] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const doresComuns = [
    'Controle de estoque inadequado',
    'Processos manuais e repetitivos',
    'Falta de integração entre sistemas',
    'Dificuldade no fechamento contábil',
    'Falta de visibilidade gerencial',
    'Gestão de documentos desorganizada',
    'Dificuldade em acompanhar vendas',
    'Problemas com fluxo de caixa',
    'Gestão de fornecedores complexa',
    'Comunicação interna ineficiente',
  ];

  const toggleDor = (dor: string) => {
    setSelectedDores((prev) => {
      if (prev.includes(dor)) {
        return prev.filter((d) => d !== dor);
      } else {
        return [...prev, dor];
      }
    });
  };

  const addCustomDor = () => {
    if (customDor.trim() && !selectedDores.includes(customDor.trim())) {
      setSelectedDores((prev) => [...prev, customDor.trim()]);
      setCustomDor('');
      setShowCustomInput(false);
    }
  };

  const removeDor = (dor: string) => {
    setSelectedDores((prev) => prev.filter((d) => d !== dor));
  };

  const handleSubmit = () => {
    if (selectedDores.length > 0) {
      onNext({ dores: selectedDores });
    }
  };

  return (
    <div>
      <h2 className="text-h3 font-bold text-white mb-2">
        Quais são suas principais dores/desafios?
      </h2>
      <p className="text-slate-300 mb-8">
        Selecione os desafios ou adicione os seus próprios
      </p>

      {/* Dores Comuns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {doresComuns.map((dor) => (
          <button
            key={dor}
            onClick={() => toggleDor(dor)}
            className={`relative p-4 rounded-xl border-2 transition-all text-left ${
              selectedDores.includes(dor)
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-600 bg-slate-800/50 hover:border-cyan-400 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{dor}</span>
              {selectedDores.includes(dor) && (
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Adicionar Desafio Personalizado */}
      {showCustomInput ? (
        <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border-2 border-cyan-400">
          <label className="label text-white">Descreva seu desafio:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customDor}
              onChange={(e) => setCustomDor(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomDor()}
              placeholder="Ex: Dificuldade em rastrear produtos..."
              className="input flex-1"
              autoFocus
            />
            <button onClick={addCustomDor} className="btn btn-primary">
              Adicionar
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomDor('');
              }}
              className="btn btn-ghost"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCustomInput(true)}
          className="mb-6 w-full p-4 rounded-xl border-2 border-dashed border-slate-500 hover:border-cyan-400 hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2 text-slate-300 hover:text-cyan-300"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Adicionar desafio personalizado</span>
        </button>
      )}

      {/* Desafios Selecionados */}
      {selectedDores.length > 0 && (
        <div className="mb-8 p-6 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-cyan-300">
              Desafios selecionados: <strong>{selectedDores.length}</strong>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedDores.map((dor) => (
              <span
                key={dor}
                className="inline-flex items-center gap-2 bg-slate-700 px-3 py-2 rounded-lg text-sm text-white border border-slate-600"
              >
                {dor}
                <button
                  onClick={() => removeDor(dor)}
                  className="text-neutral-500 hover:text-danger-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={onBack} className="btn btn-ghost">
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedDores.length === 0}
          className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Step4Dores;

