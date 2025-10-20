/**
 * 🧪 TESTES - Validações com Zod
 * 
 * Exemplos de testes para os schemas de validação.
 */

import { describe, test, expect } from '@jest/globals';
import {
  DiagnosticoFormSchema,
  LeadContactSchema,
  validateDiagnostico,
} from '../validations/lead.schema';
import {
  LoginSchema,
  validateLogin,
  validatePasswordStrength,
} from '../validations/auth.schema';

// ==========================================
// TESTES DE VALIDAÇÃO DE LEADS
// ==========================================

describe('LeadContactSchema', () => {
  test('deve validar email correto', () => {
    const result = LeadContactSchema.safeParse({
      email: 'teste@exemplo.com',
      telefone: '+5511999999999',
    });
    
    expect(result.success).toBe(true);
  });

  test('deve rejeitar email inválido', () => {
    const result = LeadContactSchema.safeParse({
      email: 'email-invalido',
      telefone: '+5511999999999',
    });
    
    expect(result.success).toBe(false);
  });

  test('deve converter email para lowercase', () => {
    const result = LeadContactSchema.safeParse({
      email: 'TESTE@EXEMPLO.COM',
      telefone: '+5511999999999',
    });
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('teste@exemplo.com');
    }
  });

  test('deve remover espaços do telefone', () => {
    const result = LeadContactSchema.safeParse({
      email: 'teste@exemplo.com',
      telefone: '  +5511999999999  ',
    });
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.telefone).toBe('+5511999999999');
    }
  });
});

describe('DiagnosticoFormSchema', () => {
  const validDiagnostico = {
    step1: { setor: 'Agro' },
    step2: { porte: 'Médio (51-250 funcionários)' },
    step3: { modulos: ['Sistema de Gestão (ERP)', 'Fluig'] },
    step4: { dores: ['Processos manuais', 'Falta de integração'] },
    step5: {
      nome: 'João Silva',
      empresa: 'Empresa Teste',
      email: 'joao@teste.com',
      telefone: '+5511999999999',
    },
  };

  test('deve validar formulário completo e válido', () => {
    const result = DiagnosticoFormSchema.safeParse(validDiagnostico);
    expect(result.success).toBe(true);
  });

  test('deve rejeitar formulário sem step1', () => {
    const { step1, ...incomplete } = validDiagnostico;
    const result = DiagnosticoFormSchema.safeParse(incomplete);
    expect(result.success).toBe(false);
  });

  test('deve rejeitar módulos vazios', () => {
    const invalid = {
      ...validDiagnostico,
      step3: { modulos: [] },
    };
    const result = DiagnosticoFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  test('deve rejeitar nome muito curto', () => {
    const invalid = {
      ...validDiagnostico,
      step5: {
        ...validDiagnostico.step5,
        nome: 'A',
      },
    };
    const result = DiagnosticoFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});

describe('validateDiagnostico helper', () => {
  test('deve retornar sucesso com dados válidos', () => {
    const validData = {
      step1: { setor: 'Agro' },
      step2: { porte: 'Médio (51-250 funcionários)' },
      step3: { modulos: ['Sistema de Gestão (ERP)'] },
      step4: { dores: ['Processos manuais'] },
      step5: {
        nome: 'João Silva',
        empresa: 'Teste',
        email: 'joao@teste.com',
        telefone: '+5511999999999',
      },
    };

    const result = validateDiagnostico(validData);
    
    expect(result.success).toBe(true);
    expect(result.errors).toBeNull();
    expect(result.data).not.toBeNull();
  });

  test('deve retornar erros com dados inválidos', () => {
    const result = validateDiagnostico({});
    
    expect(result.success).toBe(false);
    expect(result.errors).not.toBeNull();
    expect(result.data).toBeNull();
  });
});

// ==========================================
// TESTES DE VALIDAÇÃO DE AUTH
// ==========================================

describe('LoginSchema', () => {
  test('deve validar credenciais corretas', () => {
    const result = LoginSchema.safeParse({
      email: 'admin@olv.com',
      password: 'senha123',
    });
    
    expect(result.success).toBe(true);
  });

  test('deve rejeitar email inválido', () => {
    const result = LoginSchema.safeParse({
      email: 'email-invalido',
      password: 'senha123',
    });
    
    expect(result.success).toBe(false);
  });

  test('deve rejeitar senha vazia', () => {
    const result = LoginSchema.safeParse({
      email: 'admin@olv.com',
      password: '',
    });
    
    expect(result.success).toBe(false);
  });
});

describe('validatePasswordStrength', () => {
  test('senha fraca deve ter score baixo', () => {
    const result = validatePasswordStrength('123');
    
    expect(result.score).toBeLessThan(3);
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  test('senha forte deve ter score alto', () => {
    const result = validatePasswordStrength('Senha@Forte123!');
    
    expect(result.score).toBeGreaterThanOrEqual(5);
    expect(result.suggestions.length).toBe(0);
  });

  test('senha média deve ter score médio', () => {
    const result = validatePasswordStrength('senha123');
    
    expect(result.score).toBeGreaterThan(2);
    expect(result.score).toBeLessThan(5);
  });
});

describe('validateLogin helper', () => {
  test('deve retornar sucesso com credenciais válidas', () => {
    const result = validateLogin({
      email: 'admin@olv.com',
      password: 'senha123',
    });
    
    expect(result.success).toBe(true);
    expect(result.errors).toBeNull();
  });

  test('deve retornar erros com email inválido', () => {
    const result = validateLogin({
      email: 'invalido',
      password: 'senha123',
    });
    
    expect(result.success).toBe(false);
    expect(result.errors).not.toBeNull();
  });
});

// ==========================================
// TESTES DE EDGE CASES
// ==========================================

describe('Edge Cases', () => {
  test('deve lidar com caracteres especiais no nome', () => {
    const result = LeadContactSchema.safeParse({
      email: 'josé@exemplo.com',
      telefone: '+5511999999999',
    });
    
    expect(result.success).toBe(true);
  });

  test('deve rejeitar scripts maliciosos no email', () => {
    const result = LeadContactSchema.safeParse({
      email: '<script>alert("xss")</script>@exemplo.com',
      telefone: '+5511999999999',
    });
    
    expect(result.success).toBe(false);
  });

  test('deve limitar tamanho de arrays', () => {
    const manyModules = Array(15).fill('Sistema de Gestão (ERP)');
    const result = DiagnosticoFormSchema.safeParse({
      step1: { setor: 'Agro' },
      step2: { porte: 'Médio (51-250 funcionários)' },
      step3: { modulos: manyModules },
      step4: { dores: ['Teste'] },
      step5: {
        nome: 'João',
        empresa: 'Teste',
        email: 'joao@teste.com',
        telefone: '+5511999999999',
      },
    });
    
    expect(result.success).toBe(false);
  });
});

