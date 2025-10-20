'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUpload } from '@/components/shared/FileUpload';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  solucao: string;
  setor: string;
  consultoria: string;
  mensagem: string;
}

interface UploadedFile {
  originalName: string;
  fileName: string;
  size: number;
  type: string;
  url: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    solucao: '',
    setor: '',
    consultoria: '',
    mensagem: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const uploadFiles = async (): Promise<UploadedFile[]> => {
    if (files.length === 0) return [];

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer upload dos arquivos');
    }

    const result = await response.json();
    return result.files;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Upload dos arquivos primeiro
      const uploaded = await uploadFiles();
      setUploadedFiles(uploaded);

      // Enviar email com dados do formulário e arquivos
      const emailData = {
        type: 'contact',
        data: {
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          company: formData.empresa,
          message: formData.mensagem,
          solution: formData.solucao,
          sector: formData.setor,
          consultancy: formData.consultoria,
          attachments: uploaded,
        },
      };

      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      setSubmitStatus('success');
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        solucao: '',
        setor: '',
        consultoria: '',
        mensagem: '',
      });
      setFiles([]);
      setUploadedFiles([]);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-green-400 font-semibold">Mensagem enviada com sucesso!</p>
            <p className="text-green-300 text-sm">Nossa equipe entrará em contato em até 24 horas.</p>
          </div>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-red-400 font-semibold">Erro ao enviar mensagem</p>
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados Pessoais */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              E-mail *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Empresa
            </label>
            <input
              type="text"
              value={formData.empresa}
              onChange={(e) => handleInputChange('empresa', e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="Nome da sua empresa"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Solução de Interesse
            </label>
            <select
              value={formData.solucao}
              onChange={(e) => handleInputChange('solucao', e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            >
              <option value="">Selecione uma solução</option>
              <option value="ERP">ERP</option>
              <option value="Fluig">Fluig</option>
              <option value="iPaaS">iPaaS</option>
              <option value="CRM de Vendas">CRM de Vendas</option>
              <option value="Techfin">Techfin</option>
              <option value="Analytics">Analytics</option>
              <option value="Assinatura Eletrônica">Assinatura Eletrônica</option>
              <option value="Cloud">Cloud</option>
              <option value="RH">RH</option>
              <option value="Atendimento e Chatbot">Atendimento e Chatbot</option>
              <option value="Crédito">Crédito</option>
              <option value="Inteligência Artificial">Inteligência Artificial</option>
              <option value="Marketing Digital">Marketing Digital</option>
              <option value="Pagamentos">Pagamentos</option>
              <option value="SFA">SFA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Setor de Atuação
            </label>
            <select
              value={formData.setor}
              onChange={(e) => handleInputChange('setor', e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            >
              <option value="">Selecione um setor</option>
              <option value="Agro">Agro</option>
              <option value="Construção">Construção</option>
              <option value="Distribuição">Distribuição</option>
              <option value="Serviços Financeiros">Serviços Financeiros</option>
              <option value="Logística">Logística</option>
              <option value="Manufatura">Manufatura</option>
              <option value="Prestadores de Serviços">Prestadores de Serviços</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">
              Tipo de Consultoria
            </label>
            <select
              value={formData.consultoria}
              onChange={(e) => handleInputChange('consultoria', e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            >
              <option value="">Selecione o tipo</option>
              <option value="Diagnóstico Estratégico">Diagnóstico Estratégico</option>
              <option value="Planejamento Inteligente">Planejamento Inteligente</option>
              <option value="Implementação Ágil">Implementação Ágil</option>
              <option value="Otimização Contínua">Otimização Contínua</option>
              <option value="Consultoria Completa">Consultoria Completa</option>
            </select>
          </div>
        </div>

        {/* Upload de Arquivos */}
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">
            📎 Anexar Arquivos (Opcional)
          </label>
          <p className="text-slate-400 text-sm mb-4">
            Envie projetos, documentos, especificações ou qualquer material relevante para seu projeto.
          </p>
          <FileUpload
            onFilesChange={handleFilesChange}
            maxFiles={5}
            maxSizePerFile={10}
          />
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">
            Mensagem *
          </label>
          <textarea
            value={formData.mensagem}
            onChange={(e) => handleInputChange('mensagem', e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
            placeholder="Conte-nos sobre seu projeto, desafios ou necessidades..."
          />
        </div>

        {/* Botão de Envio */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-glow hover:shadow-futuristic transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                ENVIAR MENSAGEM
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
