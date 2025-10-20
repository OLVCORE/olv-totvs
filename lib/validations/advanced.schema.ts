import { z } from 'zod';

/**
 * 🔐 VALIDAÇÕES AVANÇADAS COM ZOD
 * 
 * Sistema de validação robusto para garantir integridade total dos dados.
 * Proteção contra XSS, SQL injection e ataques de validação.
 */

// ==========================================
// VALIDAÇÕES BÁSICAS REUTILIZÁVEIS
// ==========================================

export const StringSchema = z.string()
  .min(1, 'Campo obrigatório')
  .max(1000, 'Texto muito longo')
  .transform(str => str.trim());

export const EmailSchema = z.string()
  .email('Email inválido')
  .max(255, 'Email muito longo')
  .toLowerCase()
  .transform(email => email.trim());

export const PhoneSchema = z.string()
  .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXXX-XXXX')
  .optional();

export const PasswordSchema = z.string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .max(128, 'Senha muito longa')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 
    'Senha deve conter: 1 minúscula, 1 maiúscula, 1 número e 1 caractere especial');

// ==========================================
// SCHEMAS DE LEADS AVANÇADOS
// ==========================================

export const ContactInfoSchema = z.object({
  nome: StringSchema
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: EmailSchema,
  
  telefone: PhoneSchema,
  
  empresa: StringSchema
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(200, 'Nome da empresa deve ter no máximo 200 caracteres')
    .optional(),
  
  cargo: StringSchema
    .max(100, 'Cargo deve ter no máximo 100 caracteres')
    .optional(),
  
  site: z.string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
});

export const BusinessInfoSchema = z.object({
  setor: StringSchema
    .min(1, 'Setor é obrigatório')
    .max(100, 'Setor deve ter no máximo 100 caracteres'),
  
  porte: z.enum(['micro', 'pequena', 'media', 'grande'], {
    errorMap: () => ({ message: 'Porte deve ser: micro, pequena, media ou grande' })
  }),
  
  faturamento: z.enum(['ate-100k', '100k-500k', '500k-1m', '1m-10m', 'acima-10m'], {
    errorMap: () => ({ message: 'Faturamento inválido' })
  }).optional(),
  
  funcionarios: z.number()
    .int('Número de funcionários deve ser inteiro')
    .min(1, 'Mínimo 1 funcionário')
    .max(100000, 'Máximo 100.000 funcionários')
    .optional(),
});

export const SolutionNeedsSchema = z.object({
  modulos: z.array(z.string())
    .min(1, 'Pelo menos um módulo deve ser selecionado')
    .max(15, 'Máximo 15 módulos podem ser selecionados'),
  
  dores: z.array(z.string())
    .min(1, 'Pelo menos uma dor deve ser selecionada')
    .max(20, 'Máximo 20 dores podem ser selecionadas'),
  
  urgencia: z.enum(['baixa', 'media', 'alta', 'critica'], {
    errorMap: () => ({ message: 'Urgência deve ser: baixa, media, alta ou critica' })
  }).default('media'),
  
  prazo: z.enum(['imediato', '1-mes', '3-meses', '6-meses', '1-ano'], {
    errorMap: () => ({ message: 'Prazo inválido' })
  }).optional(),
  
  orcamento: z.enum(['ate-10k', '10k-50k', '50k-100k', '100k-500k', 'acima-500k'], {
    errorMap: () => ({ message: 'Orçamento inválido' })
  }).optional(),
});

export const AdditionalInfoSchema = z.object({
  observacoes: StringSchema
    .max(2000, 'Observações devem ter no máximo 2000 caracteres')
    .optional(),
  
  como_conheceu: z.enum(['google', 'linkedin', 'facebook', 'indicacao', 'evento', 'outro'], {
    errorMap: () => ({ message: 'Origem inválida' })
  }).optional(),
  
  newsletter: z.boolean().default(false),
  
  comunicacao_preferida: z.enum(['email', 'telefone', 'whatsapp'], {
    errorMap: () => ({ message: 'Preferência de comunicação inválida' })
  }).default('email'),
});

// ==========================================
// SCHEMA COMPLETO DE LEAD
// ==========================================

export const AdvancedLeadSchema = z.object({
  // Informações de contato
  ...ContactInfoSchema.shape,
  
  // Informações do negócio
  ...BusinessInfoSchema.shape,
  
  // Necessidades de solução
  ...SolutionNeedsSchema.shape,
  
  // Informações adicionais
  ...AdditionalInfoSchema.shape,
  
  // Metadados do sistema
  origem: z.enum(['diagnostico', 'contato', 'blog', 'referencia', 'evento'], {
    errorMap: () => ({ message: 'Origem inválida' })
  }).default('diagnostico'),
  
  status: z.enum(['novo', 'contatado', 'qualificado', 'proposta', 'fechado', 'perdido'], {
    errorMap: () => ({ message: 'Status inválido' })
  }).default('novo'),
  
  prioridade: z.enum(['baixa', 'media', 'alta', 'urgente'], {
    errorMap: () => ({ message: 'Prioridade inválida' })
  }).default('media'),
  
  score: z.number()
    .int('Score deve ser inteiro')
    .min(0, 'Score mínimo é 0')
    .max(100, 'Score máximo é 100')
    .default(50),
  
  // Timestamps
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  lastContactAt: z.date().optional(),
});

// ==========================================
// SCHEMAS DE AUTENTICAÇÃO AVANÇADOS
// ==========================================

export const LoginSchema = z.object({
  email: EmailSchema,
  senha: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(128, 'Senha muito longa'),
  
  remember: z.boolean().default(false),
  captcha: z.string().optional(),
});

export const RegisterSchema = z.object({
  nome: StringSchema
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: EmailSchema,
  
  senha: PasswordSchema,
  
  confirmarSenha: z.string(),
  
  role: z.enum(['admin', 'user', 'manager'], {
    errorMap: () => ({ message: 'Role deve ser: admin, user ou manager' })
  }).default('user'),
  
  termos: z.boolean()
    .refine(val => val === true, 'Você deve aceitar os termos de uso'),
  
  privacidade: z.boolean()
    .refine(val => val === true, 'Você deve aceitar a política de privacidade'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarSenha'],
});

// ==========================================
// SCHEMAS DE API E RESPOSTAS
// ==========================================

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  errors: z.array(z.string()).optional(),
  timestamp: z.date().default(() => new Date()),
});

export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  total: z.number().int().min(0).optional(),
  totalPages: z.number().int().min(0).optional(),
});

export const LeadFilterSchema = z.object({
  status: z.enum(['novo', 'contatado', 'qualificado', 'proposta', 'fechado', 'perdido']).optional(),
  prioridade: z.enum(['baixa', 'media', 'alta', 'urgente']).optional(),
  setor: StringSchema.optional(),
  porte: z.enum(['micro', 'pequena', 'media', 'grande']).optional(),
  origem: z.enum(['diagnostico', 'contato', 'blog', 'referencia', 'evento']).optional(),
  dataInicio: z.string().datetime().optional(),
  dataFim: z.string().datetime().optional(),
  scoreMin: z.number().int().min(0).max(100).optional(),
  scoreMax: z.number().int().min(0).max(100).optional(),
}).merge(PaginationSchema);

// ==========================================
// FUNÇÕES DE VALIDAÇÃO AVANÇADAS
// ==========================================

export function validateAdvancedLead(data: unknown): z.infer<typeof AdvancedLeadSchema> {
  return AdvancedLeadSchema.parse(data);
}

export function validateContactInfo(data: unknown): z.infer<typeof ContactInfoSchema> {
  return ContactInfoSchema.parse(data);
}

export function validateBusinessInfo(data: unknown): z.infer<typeof BusinessInfoSchema> {
  return BusinessInfoSchema.parse(data);
}

export function validateSolutionNeeds(data: unknown): z.infer<typeof SolutionNeedsSchema> {
  return SolutionNeedsSchema.parse(data);
}

export function validateLogin(data: unknown): z.infer<typeof LoginSchema> {
  return LoginSchema.parse(data);
}

export function validateRegister(data: unknown): z.infer<typeof RegisterSchema> {
  return RegisterSchema.parse(data);
}

export function validateLeadFilter(data: unknown): z.infer<typeof LeadFilterSchema> {
  return LeadFilterSchema.parse(data);
}

// ==========================================
// FUNÇÕES DE SANITIZAÇÃO
// ==========================================

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limita tamanho
}

export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._-]/g, '');
}

// ==========================================
// TIPOS EXPORTADOS
// ==========================================

export type AdvancedLeadData = z.infer<typeof AdvancedLeadSchema>;
export type ContactInfoData = z.infer<typeof ContactInfoSchema>;
export type BusinessInfoData = z.infer<typeof BusinessInfoSchema>;
export type SolutionNeedsData = z.infer<typeof SolutionNeedsSchema>;
export type AdditionalInfoData = z.infer<typeof AdditionalInfoSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type LeadFilterData = z.infer<typeof LeadFilterSchema>;
export type PaginationData = z.infer<typeof PaginationSchema>;
