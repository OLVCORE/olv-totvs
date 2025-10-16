import mongoose, { Schema, Model } from 'mongoose';
import { IntegracaoTOTVS } from '@/types';

const IntegracaoTOTVSSchema = new Schema<IntegracaoTOTVS>(
  {
    lead_id: { type: String, required: true, ref: 'Lead' },
    payload: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ['pendente', 'enviado', 'sucesso', 'erro'],
      default: 'pendente',
    },
    resposta: { type: Schema.Types.Mixed },
    erro: { type: String },
    tentativas: { type: Number, default: 0 },
    data_envio: { type: Date },
  },
  {
    timestamps: true,
  }
);

IntegracaoTOTVSSchema.index({ lead_id: 1 });
IntegracaoTOTVSSchema.index({ status: 1 });
IntegracaoTOTVSSchema.index({ createdAt: -1 });

export default (mongoose.models.IntegracaoTOTVS as Model<IntegracaoTOTVS>) ||
  mongoose.model<IntegracaoTOTVS>('IntegracaoTOTVS', IntegracaoTOTVSSchema);

