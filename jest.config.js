/**
 * 🧪 JEST CONFIGURATION
 * 
 * Configuração do Jest para testes unitários e de integração.
 * Integrado com Next.js e TypeScript.
 */

const nextJest = require('next/jest');

// Carregar configuração do Next.js
const createJestConfig = nextJest({
  // Path para o diretório Next.js
  dir: './',
});

// Configuração customizada do Jest
const customJestConfig = {
  // Setup files (executados antes dos testes)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Ambiente de teste (jsdom para testes de componentes React)
  testEnvironment: 'jest-environment-jsdom',
  
  // Module name mapper (path aliases)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
  },
  
  // Arquivos de teste
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // Ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
  ],
  
  // Cobertura de código
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.js',
    '!**/next.config.mjs',
  ],
  
  // Thresholds de cobertura (mínimos aceitáveis)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Diretório de cobertura
  coverageDirectory: 'coverage',
  
  // Reporters de cobertura
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json-summary',
  ],
  
  // Transform (para processar arquivos)
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }],
  },
  
  // Module file extensions
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ],
  
  // Verbose output
  verbose: true,
  
  // Max workers (performance)
  maxWorkers: '50%',
  
  // Timeout padrão (ms)
  testTimeout: 10000,
};

// Exportar configuração mesclada com Next.js
module.exports = createJestConfig(customJestConfig);

