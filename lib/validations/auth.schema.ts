import { z } from 'zod';

/**
 * 🔐 SCHEMA DE VALIDAÇÃO PARA AUTENTICAÇÃO
 * 
 * Validação robusta de dados de autenticação usando Zod.
 * Garante segurança e integridade dos dados de login.
 */

// Schema para login
export const LoginSchema = z.object({
  email: z
    .string()
    .email('Email deve ter formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim(),
  
  senha: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(128, 'Senha deve ter no máximo 128 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'
    ),
});

// Schema para registro de usuário
export const RegisterSchema = z.object({
  nome: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços')
    .trim(),
  
  email: z
    .string()
    .email('Email deve ter formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim(),
  
  senha: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(128, 'Senha deve ter no máximo 128 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'
    ),
  
  confirmarSenha: z.string(),
  
  role: z
    .enum(['admin', 'user'], {
      errorMap: () => ({ message: 'Role deve ser: admin ou user' })
    })
    .default('user'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarSenha'],
});

// Schema para alteração de senha
export const ChangePasswordSchema = z.object({
  senhaAtual: z
    .string()
    .min(1, 'Senha atual é obrigatória'),
  
  novaSenha: z
    .string()
    .min(8, 'Nova senha deve ter pelo menos 8 caracteres')
    .max(128, 'Nova senha deve ter no máximo 128 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'
    ),
  
  confirmarNovaSenha: z.string(),
}).refine((data) => data.novaSenha === data.confirmarNovaSenha, {
  message: 'Novas senhas não coincidem',
  path: ['confirmarNovaSenha'],
});

// Schema para reset de senha
export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .email('Email deve ter formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim(),
});

// Schema para nova senha (após reset)
export const NewPasswordSchema = z.object({
  token: z
    .string()
    .min(1, 'Token é obrigatório'),
  
  novaSenha: z
    .string()
    .min(8, 'Nova senha deve ter pelo menos 8 caracteres')
    .max(128, 'Nova senha deve ter no máximo 128 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'
    ),
  
  confirmarNovaSenha: z.string(),
}).refine((data) => data.novaSenha === data.confirmarNovaSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarNovaSenha'],
});

// Schema para atualização de perfil
export const UpdateProfileSchema = z.object({
  nome: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços')
    .trim()
    .optional(),
  
  email: z
    .string()
    .email('Email deve ter formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase()
    .trim()
    .optional(),
  
  role: z
    .enum(['admin', 'user'], {
      errorMap: () => ({ message: 'Role deve ser: admin ou user' })
    })
    .optional(),
  
  ativo: z
    .boolean()
    .optional(),
});

// Schema para resposta de autenticação
export const AuthResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.object({
    id: z.string(),
    nome: z.string(),
    email: z.string(),
    role: z.enum(['admin', 'user']),
    ativo: z.boolean(),
  }).optional(),
  token: z.string().optional(),
});

// Schema para verificação de token
export const TokenVerificationSchema = z.object({
  token: z
    .string()
    .min(1, 'Token é obrigatório'),
});

// Tipos TypeScript derivados dos schemas
export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
export type NewPasswordData = z.infer<typeof NewPasswordSchema>;
export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type TokenVerificationData = z.infer<typeof TokenVerificationSchema>;

// Funções de validação
export function validateLogin(data: unknown): LoginData {
  return LoginSchema.parse(data);
}

export function validateRegister(data: unknown): RegisterData {
  return RegisterSchema.parse(data);
}

export function validateChangePassword(data: unknown): ChangePasswordData {
  return ChangePasswordSchema.parse(data);
}

export function validateResetPassword(data: unknown): ResetPasswordData {
  return ResetPasswordSchema.parse(data);
}

export function validateNewPassword(data: unknown): NewPasswordData {
  return NewPasswordSchema.parse(data);
}

export function validateUpdateProfile(data: unknown): UpdateProfileData {
  return UpdateProfileSchema.parse(data);
}

export function validateTokenVerification(data: unknown): TokenVerificationData {
  return TokenVerificationSchema.parse(data);
}
