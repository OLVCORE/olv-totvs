'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Target, 
  Brain, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

export function ContentOptimizer() {
  const [currentStep, setCurrentStep] = useState(0);

  const optimizationSteps = [
    {
      icon: Search,
      title: 'Análise de Intenção',
      description: 'Identifique a intenção real por trás das buscas dos usuários',
      color: 'from-blue-500 to-cyan-600',
      tips: [
        'Mapeie jornadas de intenção completas',
        'Analise contexto comportamental',
        'Identifique necessidades não expressas'
      ]
    },
    {
      icon: Target,
      title: 'Otimização de Copy',
      description: 'Crie conteúdo que se conecte diretamente com as necessidades',
      color: 'from-purple-500 to-pink-600',
      tips: [
        'Foque em soluções, não em produtos',
        'Use linguagem que ressoe com a intenção',
        'Destaque benefícios tangíveis'
      ]
    },
    {
      icon: Brain,
      title: 'Estratégia de IA',
      description: 'Prepare-se para o aprendizado automático do Google',
      color: 'from-green-500 to-emerald-600',
      tips: [
        'Estruture dados para IA',
        'Implemente sinais de qualidade',
        'Monitore performance contínua'
      ]
    },
    {
      icon: FileText,
      title: 'Transparência de Preços',
      description: 'Garanta conformidade com as novas políticas',
      color: 'from-orange-500 to-red-600',
      tips: [
        'Divulgue custos totais claramente',
        'Evite práticas de "isca e troca"',
        'Seja transparente em testes gratuitos'
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 px-6 py-3 rounded-full text-sm font-bold mb-6">
          <TrendingUp className="w-5 h-5" />
          <span className="tracking-wide">OTIMIZAÇÃO PARA GOOGLE ADS 2025</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">
          Prepare Seu Conteúdo
        </h2>
        <p className="text-slate-300 text-lg">
          Siga estes passos para otimizar seu site para as mudanças do Google Ads
        </p>
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          {optimizationSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                currentStep === index
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-glow'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${optimizationSteps[currentStep].color} rounded-2xl flex items-center justify-center shadow-glow`}>
              <optimizationSteps[currentStep].icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-2">
                {optimizationSteps[currentStep].title}
              </h3>
              <p className="text-slate-300 text-lg">
                {optimizationSteps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {optimizationSteps[currentStep].tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-slate-300 text-sm font-medium">{tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-slate-700 text-slate-300 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-all duration-300"
        >
          Anterior
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(optimizationSteps.length - 1, currentStep + 1))}
          disabled={currentStep === optimizationSteps.length - 1}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
        >
          Próximo
        </button>
      </div>

      {/* Warning */}
      <div className="mt-8 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-red-300 font-bold mb-1">⚠️ Atenção Importante</h4>
            <p className="text-slate-300 text-sm">
              As novas políticas entram em vigor em <strong>28 de outubro de 2025</strong>. 
              Comece a implementar essas mudanças agora para evitar penalizações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
