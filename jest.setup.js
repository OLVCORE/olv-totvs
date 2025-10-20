/**
 * 🧪 JEST SETUP
 * 
 * Configuração global dos testes.
 * Executado antes de todos os testes.
 */

// Import Testing Library matchers
import '@testing-library/jest-dom';

// Mock do Next.js Router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock do Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock do Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock do Framer Motion (para evitar erros de animação)
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock de variáveis de ambiente para testes
process.env.MONGODB_URI = 'mongodb://localhost:27017/olv-totvs-test';
process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only-32-chars-min';
process.env.NEXTAUTH_SECRET = 'test-nextauth-secret-for-testing-only-32-chars';
process.env.NODE_ENV = 'test';

// Suprimir warnings específicos nos testes
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Suprimir avisos conhecidos do React/Next.js
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Cleanup após cada teste
afterEach(() => {
  jest.clearAllMocks();
});

// Global test utilities (opcional)
global.testUtils = {
  // Helper para criar mock de request
  createMockRequest: (options = {}) => {
    return {
      json: jest.fn().mockResolvedValue(options.body || {}),
      headers: new Headers(options.headers || {}),
      url: options.url || 'http://localhost:3000',
      method: options.method || 'GET',
      ...options,
    };
  },
  
  // Helper para criar mock de response
  createMockResponse: () => {
    return {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      headers: new Headers(),
    };
  },
};

console.log('✅ Jest setup completed');

