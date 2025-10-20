import { z } from 'zod';

/**
 * 📝 SCHEMA DE VALIDAÇÃO PARA LEADS
 * 
 * Validação robusta de dados de leads usando Zod.
 * Garante integridade e segurança dos dados.
 */

// Schema para dados de contato básico
export const ContactSchema = z.object({
  nome: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: z
    .string()
    .email('Email deve ter formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase(),
  
  telefone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXXX-XXXX')
    .optional(),
  
  empresa: z
    .string()
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(200, 'Nome da empresa deve ter no máximo 200 caracteres')
    .optional(),
});

// Schema para dados do diagnóstico
export const DiagnosticoSchema = z.object({
  setor: z
    .string()
    .min(1, 'Setor é obrigatório')
    .max(100, 'Setor deve ter no máximo 100 caracteres'),
  
  porte: z
    .enum(['micro', 'pequena', 'media', 'grande'], {
      errorMap: () => ({ message: 'Porte deve ser: micro, pequena, media ou grande' })
    }),
  
  modulos: z
    .array(z.string())
    .min(1, 'Pelo menos um módulo deve ser selecionado')
    .max(10, 'Máximo 10 módulos podem ser selecionados'),
  
  dores: z
    .array(z.string())
    .min(1, 'Pelo menos uma dor deve ser selecionada')
    .max(15, 'Máximo 15 dores podem ser selecionadas'),
  
  observacoes: z
    .string()
    .max(1000, 'Observações devem ter no máximo 1000 caracteres')
    .optional(),
});

// Schema completo para lead
export const LeadSchema = z.object({
  // Dados de contato
  ...ContactSchema.shape,
  
  // Dados do diagnóstico
  ...DiagnosticoSchema.shape,
  
  // Metadados
  origem: z
    .enum(['diagnostico', 'contato', 'blog', 'referencia'], {
      errorMap: () => ({ message: 'Origem deve ser: diagnostico, contato, blog ou referencia' })
    })
    .default('diagnostico'),
  
  status: z
    .enum(['novo', 'contatado', 'qualificado', 'proposta', 'fechado', 'perdido'], {
      errorMap: () => ({ message: 'Status deve ser: novo, contatado, qualificado, proposta, fechado ou perdido' })
    })
    .default('novo'),
  
  prioridade: z
    .enum(['baixa', 'media', 'alta', 'urgente'], {
      errorMap: () => ({ message: 'Prioridade deve ser: baixa, media, alta ou urgente' })
    })
    .default('media'),
  
  // Timestamps
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Schema para atualização de lead (campos opcionais)
export const LeadUpdateSchema = LeadSchema.partial().omit({
  createdAt: true,
});

// Schema para busca/filtros
export const LeadFilterSchema = z.object({
  status: z.enum(['novo', 'contatado', 'qualificado', 'proposta', 'fechado', 'perdido']).optional(),
  prioridade: z.enum(['baixa', 'media', 'alta', 'urgente']).optional(),
  setor: z.string().optional(),
  porte: z.enum(['micro', 'pequena', 'media', 'grande']).optional(),
  origem: z.enum(['diagnostico', 'contato', 'blog', 'referencia']).optional(),
  dataInicio: z.string().datetime().optional(),
  dataFim: z.string().datetime().optional(),
  pagina: z.number().int().min(1).default(1),
  limite: z.number().int().min(1).max(100).default(10),
});

// Schema para resposta de API
export const LeadResponseSchema = LeadSchema.extend({
  _id: z.string(),
});

// Schema para lista de leads
export const LeadListResponseSchema = z.object({
  leads: z.array(LeadResponseSchema),
  total: z.number().int().min(0),
  pagina: z.number().int().min(1),
  limite: z.number().int().min(1),
  totalPaginas: z.number().int().min(0),
});

// Tipos TypeScript derivados dos schemas
export type ContactData = z.infer<typeof ContactSchema>;
export type DiagnosticoData = z.infer<typeof DiagnosticoSchema>;
export type LeadData = z.infer<typeof LeadSchema>;
export type LeadUpdateData = z.infer<typeof LeadUpdateSchema>;
export type LeadFilterData = z.infer<typeof LeadFilterSchema>;
export type LeadResponse = z.infer<typeof LeadResponseSchema>;
export type LeadListResponse = z.infer<typeof LeadListResponseSchema>;

// Funções de validação
export function validateLead(data: unknown): LeadData {
  return LeadSchema.parse(data);
}

export function validateLeadUpdate(data: unknown): LeadUpdateData {
  return LeadUpdateSchema.parse(data);
}

export function validateLeadFilter(data: unknown): LeadFilterData {
  return LeadFilterSchema.parse(data);
}

export function validateContact(data: unknown): ContactData {
  return ContactSchema.parse(data);
}

export function validateDiagnostico(data: unknown): DiagnosticoData {
  return DiagnosticoSchema.parse(data);
}
