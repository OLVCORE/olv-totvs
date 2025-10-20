import { validateLead, validateContact, validateDiagnostico } from '../validations/lead.schema';
import { validateLogin, validateRegister } from '../validations/auth.schema';

/**
 * 🧪 TESTES DE VALIDAÇÃO
 * 
 * Testes unitários para os schemas de validação Zod.
 * Garante que as validações funcionam corretamente.
 */

describe('Lead Validation Tests', () => {
  describe('validateContact', () => {
    it('should validate valid contact data', () => {
      const validContact = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        telefone: '(11) 99999-9999',
        empresa: 'Empresa Teste',
      };

      expect(() => validateContact(validContact)).not.toThrow();
    });

    it('should reject invalid email', () => {
      const invalidContact = {
        nome: 'João Silva',
        email: 'email-invalido',
        telefone: '(11) 99999-9999',
        empresa: 'Empresa Teste',
      };

      expect(() => validateContact(invalidContact)).toThrow();
    });

    it('should reject short name', () => {
      const invalidContact = {
        nome: 'J',
        email: 'joao@exemplo.com',
        telefone: '(11) 99999-9999',
        empresa: 'Empresa Teste',
      };

      expect(() => validateContact(invalidContact)).toThrow();
    });

    it('should reject invalid phone format', () => {
      const invalidContact = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        telefone: '11999999999',
        empresa: 'Empresa Teste',
      };

      expect(() => validateContact(invalidContact)).toThrow();
    });
  });

  describe('validateDiagnostico', () => {
    it('should validate valid diagnostico data', () => {
      const validDiagnostico = {
        setor: 'Manufatura',
        porte: 'media',
        modulos: ['ERP', 'CRM'],
        dores: ['Gestão de estoque', 'Controle financeiro'],
        observacoes: 'Precisamos de uma solução completa',
      };

      expect(() => validateDiagnostico(validDiagnostico)).not.toThrow();
    });

    it('should reject invalid porte', () => {
      const invalidDiagnostico = {
        setor: 'Manufatura',
        porte: 'invalid',
        modulos: ['ERP'],
        dores: ['Gestão de estoque'],
      };

      expect(() => validateDiagnostico(invalidDiagnostico)).toThrow();
    });

    it('should reject empty modulos array', () => {
      const invalidDiagnostico = {
        setor: 'Manufatura',
        porte: 'media',
        modulos: [],
        dores: ['Gestão de estoque'],
      };

      expect(() => validateDiagnostico(invalidDiagnostico)).toThrow();
    });

    it('should reject too many modulos', () => {
      const invalidDiagnostico = {
        setor: 'Manufatura',
        porte: 'media',
        modulos: Array(11).fill('ERP'),
        dores: ['Gestão de estoque'],
      };

      expect(() => validateDiagnostico(invalidDiagnostico)).toThrow();
    });
  });

  describe('validateLead', () => {
    it('should validate complete lead data', () => {
      const validLead = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        telefone: '(11) 99999-9999',
        empresa: 'Empresa Teste',
        setor: 'Manufatura',
        porte: 'media',
        modulos: ['ERP', 'CRM'],
        dores: ['Gestão de estoque', 'Controle financeiro'],
        observacoes: 'Precisamos de uma solução completa',
        origem: 'diagnostico',
        status: 'novo',
        prioridade: 'media',
      };

      expect(() => validateLead(validLead)).not.toThrow();
    });

    it('should set default values', () => {
      const minimalLead = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        setor: 'Manufatura',
        porte: 'media',
        modulos: ['ERP'],
        dores: ['Gestão de estoque'],
      };

      const validatedLead = validateLead(minimalLead);
      
      expect(validatedLead.origem).toBe('diagnostico');
      expect(validatedLead.status).toBe('novo');
      expect(validatedLead.prioridade).toBe('media');
      expect(validatedLead.createdAt).toBeInstanceOf(Date);
      expect(validatedLead.updatedAt).toBeInstanceOf(Date);
    });
  });
});

describe('Auth Validation Tests', () => {
  describe('validateLogin', () => {
    it('should validate valid login data', () => {
      const validLogin = {
        email: 'admin@exemplo.com',
        senha: 'Senha123',
      };

      expect(() => validateLogin(validLogin)).not.toThrow();
    });

    it('should reject invalid email format', () => {
      const invalidLogin = {
        email: 'email-invalido',
        senha: 'Senha123',
      };

      expect(() => validateLogin(invalidLogin)).toThrow();
    });

    it('should reject weak password', () => {
      const invalidLogin = {
        email: 'admin@exemplo.com',
        senha: '123',
      };

      expect(() => validateLogin(invalidLogin)).toThrow();
    });

    it('should reject password without uppercase', () => {
      const invalidLogin = {
        email: 'admin@exemplo.com',
        senha: 'senha123',
      };

      expect(() => validateLogin(invalidLogin)).toThrow();
    });

    it('should reject password without number', () => {
      const invalidLogin = {
        email: 'admin@exemplo.com',
        senha: 'SenhaABC',
      };

      expect(() => validateLogin(invalidLogin)).toThrow();
    });
  });

  describe('validateRegister', () => {
    it('should validate valid register data', () => {
      const validRegister = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'Senha123!',
        confirmarSenha: 'Senha123!',
        role: 'user',
      };

      expect(() => validateRegister(validRegister)).not.toThrow();
    });

    it('should reject mismatched passwords', () => {
      const invalidRegister = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'Senha123!',
        confirmarSenha: 'Senha456!',
        role: 'user',
      };

      expect(() => validateRegister(invalidRegister)).toThrow();
    });

    it('should reject password without special character', () => {
      const invalidRegister = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'Senha123',
        confirmarSenha: 'Senha123',
        role: 'user',
      };

      expect(() => validateRegister(invalidRegister)).toThrow();
    });

    it('should reject invalid role', () => {
      const invalidRegister = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'Senha123!',
        confirmarSenha: 'Senha123!',
        role: 'invalid',
      };

      expect(() => validateRegister(invalidRegister)).toThrow();
    });

    it('should set default role', () => {
      const registerData = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'Senha123!',
        confirmarSenha: 'Senha123!',
      };

      const validatedRegister = validateRegister(registerData);
      expect(validatedRegister.role).toBe('user');
    });
  });
});
