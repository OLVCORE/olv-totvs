'use client';

import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Shield, Clock, Zap } from 'lucide-react';
import Step1Setor from '@/components/diagnostico/Step1Setor';
import Step2Porte from '@/components/diagnostico/Step2Porte';
import Step3Modulos from '@/components/diagnostico/Step3Modulos';
import Step4Dores from '@/components/diagnostico/Step4Dores';
import Step5Contato from '@/components/diagnostico/Step5Contato';
import { DiagnosticoFormData } from '@/types';
import { motion } from 'framer-motion';

export default function DiagnosticoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DiagnosticoFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;

  const steps = [
    { number: 1, title: 'Setor' },
    { number: 2, title: 'Porte' },
    { number: 3, title: 'Módulos' },
    { number: 4, title: 'Desafios' },
    { number: 5, title: 'Contato' },
  ];

  const updateFormData = (stepData: Partial<DiagnosticoFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar diagnóstico');
      }

      // Redireciona para página de sucesso
      window.location.href = '/diagnostico/sucesso';
    } catch (error) {
      console.error('Erro ao submeter:', error);
      alert('Erro ao enviar diagnóstico. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-16 text-white overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-grid" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Premium Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="tracking-wide">DIAGNÓSTICO INTELIGENTE</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="block">Diagnóstico</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Gratuito
              </span>
            </h1>
            <p className="text-xl text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
              Responda algumas perguntas e descubra as melhores soluções TOTVS
              para o seu negócio
            </p>
          </motion.div>

          {/* Premium Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center flex-1 relative"
                >
                  {/* Linha de conexão */}
                  {step.number < totalSteps && (
                    <div
                      className={`absolute top-8 left-1/2 w-full h-1 rounded-full ${
                        currentStep > step.number
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'bg-slate-700'
                      }`}
                      style={{ zIndex: 0 }}
                    />
                  )}

                  {/* Círculo Premium */}
                  <div
                    className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 shadow-glow ${
                      currentStep > step.number
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : currentStep === step.number
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-4 ring-emerald-400/30'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-8 h-8" />
                    ) : (
                      step.number
                    )}
                  </div>

                  {/* Label */}
                  <div
                    className={`mt-3 text-sm font-bold tracking-wide ${
                      currentStep >= step.number
                        ? 'text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center text-sm text-slate-400 font-medium">
              Passo {currentStep} de {totalSteps}
            </div>
          </motion.div>

          {/* Premium Form Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-premium relative overflow-hidden"
          >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
            
            <div className="relative z-10">
              {currentStep === 1 && (
                <Step1Setor
                  data={formData.step1}
                  onNext={(data) => {
                    updateFormData({ step1: data });
                    handleNext();
                  }}
                />
              )}

              {currentStep === 2 && (
                <Step2Porte
                  data={formData.step2}
                  onNext={(data) => {
                    updateFormData({ step2: data });
                    handleNext();
                  }}
                  onBack={handlePrevious}
                />
              )}

              {currentStep === 3 && (
                <Step3Modulos
                  data={formData.step3}
                  onNext={(data) => {
                    updateFormData({ step3: data });
                    handleNext();
                  }}
                  onBack={handlePrevious}
                />
              )}

              {currentStep === 4 && (
                <Step4Dores
                  data={formData.step4}
                  onNext={(data) => {
                    updateFormData({ step4: data });
                    handleNext();
                  }}
                  onBack={handlePrevious}
                />
              )}

              {currentStep === 5 && (
                <Step5Contato
                  data={formData.step5}
                  onSubmit={(data) => {
                    updateFormData({ step5: data });
                    handleSubmit();
                  }}
                  onBack={handlePrevious}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </motion.div>

          {/* Premium Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { icon: Zap, text: '100% Gratuito', color: 'text-emerald-400' },
              { icon: Shield, text: 'Dados Protegidos (LGPD)', color: 'text-blue-400' },
              { icon: Clock, text: 'Resposta em até 2 dias úteis', color: 'text-purple-400' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className={`w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
