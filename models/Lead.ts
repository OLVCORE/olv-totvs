import mongoose, { Schema, Model } from 'mongoose';
import { Lead } from '@/types';

const HistoricoAcaoSchema = new Schema({
  data: { type: Date, default: Date.now },
  acao: { type: String, required: true },
  usuario: { type: String },
  detalhes: { type: String },
});

const LeadSchema = new Schema<Lead>(
  {
    nome: { type: String, required: true },
    empresa: { type: String, required: true },
    setor: {
      type: String,
      required: true,
      enum: [
        'Agro',
        'Construção',
        'Distribuição',
        'Financial Services',
        'Logística',
        'Manufatura',
        'Prestadores de Serviços',
        'Outro',
      ],
    },
    porte: {
      type: String,
      required: true,
      enum: [
        'Micro (1-10 funcionários)',
        'Pequeno (11-50 funcionários)',
        'Médio (51-250 funcionários)',
        'Grande (251-1000 funcionários)',
        'Enterprise (1000+ funcionários)',
      ],
    },
    modulos_interesse: {
      type: [String],
      required: true,
    },
    dores: {
      type: [String],
      required: true,
    },
    contato: {
      email: { type: String, required: true },
      telefone: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['novo', 'em_analise', 'qualificado', 'enviado_totvs', 'descartado'],
      default: 'novo',
    },
    historico: {
      type: [HistoricoAcaoSchema],
      default: function() {
        return [
          {
            data: new Date(),
            acao: 'Lead criado via formulário de diagnóstico',
          },
        ];
      },
    },
  },
  {
    timestamps: true,
  }
);

LeadSchema.index({ email: 1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ setor: 1 });
LeadSchema.index({ createdAt: -1 });

export default (mongoose.models.Lead as Model<Lead>) ||
  mongoose.model<Lead>('Lead', LeadSchema);

