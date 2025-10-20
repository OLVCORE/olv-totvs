/**
 * 🔐 SCHEMAS DE VALIDAÇÃO - LEADS
 * 
 * Validações robustas com Zod para todas as operações de leads.
 * Garante segurança e integridade dos dados.
 */

import { z } from 'zod';

// ==========================================
// SCHEMAS BASE
// ==========================================

/**
 * Schema para contato (email + telefone)
 */
export const LeadContactSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .toLowerCase()
    .trim()
    .max(255, 'Email muito longo'),
  
  telefone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      'Telefone deve conter apenas números, espaços e caracteres especiais (+, -, (, ))'
    )
    .trim()
    .max(20, 'Telefone muito longo'),
});

/**
 * Schema para setor
 */
export const SetorSchema = z.enum([
  'Agro',
  'Construção',
  'Distribuição',
  'Financial Services',
  'Logística',
  'Manufatura',
  'Prestadores de Serviços',
  'Outro',
], {
  errorMap: () => ({ message: 'Setor inválido' }),
});

/**
 * Schema para porte da empresa
 */
export const PorteSchema = z.enum([
  'Micro (1-10 funcionários)',
  'Pequeno (11-50 funcionários)',
  'Médio (51-250 funcionários)',
  'Grande (251-1000 funcionários)',
  'Enterprise (1000+ funcionários)',
], {
  errorMap: () => ({ message: 'Porte inválido' }),
});

/**
 * Schema para módulos de interesse
 */
export const ModuloSchema = z.enum([
  'Sistema de Gestão (ERP)',
  'Fluig',
  'iPaaS',
  'CRM / Automação',
  'Techfin',
  'Analytics',
  'Assinatura Eletrônica',
  'Cloud',
  'RH',
  'Atendimento e Chatbot',
  'Crédito',
  'Inteligência Artificial',
  'Marketing Digital',
  'Pagamentos',
  'SFA',
], {
  errorMap: () => ({ message: 'Módulo inválido' }),
});

/**
 * Schema para status do lead
 */
export const LeadStatusSchema = z.enum([
  'novo',
  'em_analise',
  'qualificado',
  'enviado_totvs',
  'descartado',
], {
  errorMap: () => ({ message: 'Status inválido' }),
});

// ==========================================
// SCHEMA COMPLETO DE LEAD
// ==========================================

/**
 * Schema para criar um novo lead
 */
export const CreateLeadSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim()
    .refine(
      (val) => /^[a-zA-ZÀ-ÿ\s]+$/.test(val),
      'Nome deve conter apenas letras e espaços'
    ),
  
  empresa: z.string()
    .min(2, 'Nome da empresa deve ter no mínimo 2 caracteres')
    .max(200, 'Nome da empresa deve ter no máximo 200 caracteres')
    .trim(),
  
  setor: SetorSchema,
  
  porte: PorteSchema,
  
  modulos_interesse: z.array(ModuloSchema)
    .min(1, 'Selecione ao menos um módulo de interesse')
    .max(10, 'Máximo de 10 módulos'),
  
  dores: z.array(z.string())
    .min(1, 'Selecione ao menos uma dor/desafio')
    .max(20, 'Máximo de 20 dores'),
  
  contato: LeadContactSchema,
  
  status: LeadStatusSchema.optional().default('novo'),
});

// ==========================================
// SCHEMA DO FORMULÁRIO DE DIAGNÓSTICO
// ==========================================

/**
 * Schema Step 1: Setor
 */
export const DiagnosticoStep1Schema = z.object({
  setor: SetorSchema,
});

/**
 * Schema Step 2: Porte
 */
export const DiagnosticoStep2Schema = z.object({
  porte: PorteSchema,
});

/**
 * Schema Step 3: Módulos
 */
export const DiagnosticoStep3Schema = z.object({
  modulos: z.array(ModuloSchema)
    .min(1, 'Selecione ao menos um módulo')
    .max(10, 'Máximo de 10 módulos'),
});

/**
 * Schema Step 4: Dores
 */
export const DiagnosticoStep4Schema = z.object({
  dores: z.array(z.string().min(1))
    .min(1, 'Selecione ao menos uma dor/desafio')
    .max(20, 'Máximo de 20 dores'),
});

/**
 * Schema Step 5: Contato
 */
export const DiagnosticoStep5Schema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim()
    .refine(
      (val) => /^[a-zA-ZÀ-ÿ\s]+$/.test(val),
      'Nome deve conter apenas letras e espaços'
    ),
  
  empresa: z.string()
    .min(2, 'Nome da empresa deve ter no mínimo 2 caracteres')
    .max(200, 'Nome da empresa deve ter no máximo 200 caracteres')
    .trim(),
  
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .toLowerCase()
    .trim()
    .max(255, 'Email muito longo'),
  
  telefone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      'Telefone deve conter apenas números e caracteres especiais'
    )
    .trim()
    .max(20, 'Telefone muito longo'),
});

/**
 * Schema completo do formulário de diagnóstico (todos os steps)
 */
export const DiagnosticoFormSchema = z.object({
  step1: DiagnosticoStep1Schema,
  step2: DiagnosticoStep2Schema,
  step3: DiagnosticoStep3Schema,
  step4: DiagnosticoStep4Schema,
  step5: DiagnosticoStep5Schema,
});

// ==========================================
// SCHEMAS PARA QUERIES
// ==========================================

/**
 * Schema para filtros de busca de leads
 */
export const LeadQuerySchema = z.object({
  status: LeadStatusSchema.optional(),
  setor: SetorSchema.optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'nome', 'empresa']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

/**
 * Schema para atualizar status do lead
 */
export const UpdateLeadStatusSchema = z.object({
  status: LeadStatusSchema,
  detalhes: z.string().optional(),
});

// ==========================================
// TYPE EXPORTS
// ==========================================

export type LeadContactInput = z.infer<typeof LeadContactSchema>;
export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;
export type DiagnosticoFormInput = z.infer<typeof DiagnosticoFormSchema>;
export type DiagnosticoStep1Input = z.infer<typeof DiagnosticoStep1Schema>;
export type DiagnosticoStep2Input = z.infer<typeof DiagnosticoStep2Schema>;
export type DiagnosticoStep3Input = z.infer<typeof DiagnosticoStep3Schema>;
export type DiagnosticoStep4Input = z.infer<typeof DiagnosticoStep4Schema>;
export type DiagnosticoStep5Input = z.infer<typeof DiagnosticoStep5Schema>;
export type LeadQueryInput = z.infer<typeof LeadQuerySchema>;
export type UpdateLeadStatusInput = z.infer<typeof UpdateLeadStatusSchema>;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Validar e retornar dados limpos ou erros formatados
 */
export function validateDiagnostico(data: unknown) {
  const result = DiagnosticoFormSchema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
      data: null,
    };
  }
  
  return {
    success: true,
    errors: null,
    data: result.data,
  };
}

/**
 * Validar query params
 */
export function validateLeadQuery(query: unknown) {
  return LeadQuerySchema.safeParse(query);
}

/**
 * Sanitizar string (remover caracteres perigosos)
 */
export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

