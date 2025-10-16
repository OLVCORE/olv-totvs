'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Brain, Target, Search, AlertTriangle, CheckCircle } from 'lucide-react';

export function GoogleAdsOptimizer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar após 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Google Ads 2025</h3>
            <p className="text-sm text-slate-400">Principais Mudanças</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* AI Mode */}
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">AI Mode no Buscador</h4>
              <p className="text-xs text-slate-300">
                IA com maior banco de dados comportamental do mundo para buscas personalizadas
              </p>
            </div>
          </div>

          {/* Agentic AI */}
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Agente de IA</h4>
              <p className="text-xs text-slate-300">
                Otimização automática de campanhas com aprendizado contínuo
              </p>
            </div>
          </div>

          {/* AI Max for Search */}
          <div className="flex items-start gap-3">
            <Search className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">AI Max for Search</h4>
              <p className="text-xs text-slate-300">
                Nova estratégia baseada em IA que aprende e ajusta continuamente
              </p>
            </div>
          </div>

          {/* Keyword Intent */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">⚠️ Fim das Correspondências de Palavra-chave</h4>
                <p className="text-xs text-slate-300">
                  Google abandonará correspondências tradicionais. Foco na intenção detectada por IA.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Update */}
          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-red-300 mb-1">📅 Política de Preços - Outubro 2025</h4>
                <p className="text-xs text-slate-300">
                  Transparência obrigatória em preços. Proibidas práticas de "isca e troca".
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <a
            href="/contato"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold text-center block hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Otimize Suas Campanhas
          </a>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
