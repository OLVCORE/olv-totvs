/**
 * 🔐 SCHEMAS DE VALIDAÇÃO - AUTENTICAÇÃO
 * 
 * Validações para login, registro e gerenciamento de usuários.
 */

import { z } from 'zod';

// ==========================================
// SCHEMAS BASE
// ==========================================

/**
 * Schema para email
 */
export const EmailSchema = z.string()
  .min(1, 'Email é obrigatório')
  .email('Email inválido')
  .toLowerCase()
  .trim()
  .max(255, 'Email muito longo');

/**
 * Schema para senha
 */
export const PasswordSchema = z.string()
  .min(6, 'Senha deve ter no mínimo 6 caracteres')
  .max(100, 'Senha muito longa')
  .refine(
    (password) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
    'Senha deve conter letras e números'
  );

/**
 * Schema para role do usuário
 */
export const UserRoleSchema = z.enum([
  'super_admin',
  'admin',
  'sales',
  'marketing',
], {
  errorMap: () => ({ message: 'Role inválido' }),
});

// ==========================================
// SCHEMAS DE AUTENTICAÇÃO
// ==========================================

/**
 * Schema para login
 */
export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

/**
 * Schema para criar novo usuário (admin apenas)
 */
export const CreateUserSchema = z.object({
  email: EmailSchema,
  nome: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim()
    .refine(
      (val) => /^[a-zA-ZÀ-ÿ\s]+$/.test(val),
      'Nome deve conter apenas letras e espaços'
    ),
  password: PasswordSchema,
  role: UserRoleSchema.optional().default('marketing'),
  ativo: z.boolean().optional().default(true),
});

/**
 * Schema para atualizar usuário
 */
export const UpdateUserSchema = z.object({
  email: EmailSchema.optional(),
  nome: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim()
    .optional(),
  password: PasswordSchema.optional(),
  role: UserRoleSchema.optional(),
  ativo: z.boolean().optional(),
});

/**
 * Schema para alterar senha
 */
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: PasswordSchema,
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  }
);

/**
 * Schema para recuperação de senha (futuro)
 */
export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

/**
 * Schema para reset de senha (futuro)
 */
export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  newPassword: PasswordSchema,
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  }
);

// ==========================================
// TYPE EXPORTS
// ==========================================

export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Validar credenciais de login
 */
export function validateLogin(data: unknown) {
  const result = LoginSchema.safeParse(data);
  
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
 * Validar força da senha
 * Retorna score de 0-5 e sugestões
 */
export function validatePasswordStrength(password: string): {
  score: number;
  suggestions: string[];
} {
  let score = 0;
  const suggestions: string[] = [];

  // Comprimento
  if (password.length >= 8) score++;
  else suggestions.push('Use pelo menos 8 caracteres');

  if (password.length >= 12) score++;
  else if (password.length >= 8) suggestions.push('Recomendado: 12+ caracteres');

  // Letras minúsculas
  if (/[a-z]/.test(password)) score++;
  else suggestions.push('Adicione letras minúsculas');

  // Letras maiúsculas
  if (/[A-Z]/.test(password)) score++;
  else suggestions.push('Adicione letras maiúsculas');

  // Números
  if (/[0-9]/.test(password)) score++;
  else suggestions.push('Adicione números');

  // Caracteres especiais
  if (/[^A-Za-z0-9]/.test(password)) score++;
  else suggestions.push('Adicione caracteres especiais (!@#$%...)');

  return { score, suggestions };
}

/**
 * Verificar se usuário tem permissão para ação
 */
export function hasPermission(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    super_admin: 4,
    admin: 3,
    sales: 2,
    marketing: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

