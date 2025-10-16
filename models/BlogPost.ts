import mongoose, { Schema, Model } from 'mongoose';
import { BlogPost } from '@/types';

const BlogPostSchema = new Schema<BlogPost>(
  {
    titulo: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    resumo: { type: String, required: true },
    conteudo: { type: String, required: true },
    imagem_destaque: { type: String, required: true },
    categorias: { type: [String], default: [] },
    autor: { type: String, required: true },
    seo_title: { type: String, required: true },
    seo_description: { type: String, required: true },
    data_publicacao: { type: Date, default: Date.now },
    publicado: { type: Boolean, default: false },
    visualizacoes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ publicado: 1 });
BlogPostSchema.index({ data_publicacao: -1 });
BlogPostSchema.index({ categorias: 1 });

export default (mongoose.models.BlogPost as Model<BlogPost>) ||
  mongoose.model<BlogPost>('BlogPost', BlogPostSchema);

