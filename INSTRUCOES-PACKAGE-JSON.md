# 📦 Instruções para Atualizar package.json

## ⚠️ IMPORTANTE: Fazer Manualmente

Por segurança, **NÃO modificamos o `package.json` automaticamente**. 
Siga as instruções abaixo para adicionar os novos scripts e dependências.

---

## 🔧 1. Adicionar Scripts de Teste

Abra `package.json` e adicione os seguintes scripts na seção `"scripts"`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    
    // ✅ ADICIONAR ESTES SCRIPTS:
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    
    // Scripts de otimização
    "optimize:images": "node scripts/optimize-images.js",
    
    // Script de validação
    "validate": "npm run lint && npm run test:ci && npm run build"
  }
}
```

---

## 📦 2. Instalar Dependências de Teste

Execute os seguintes comandos para instalar as dependências necessárias:

### Testes Unitários (Jest + React Testing Library)

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @swc/jest
```

### Testes E2E (Playwright)

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Otimização de Imagens

```bash
npm install --save-dev sharp
```

### Rate Limiting (Opcional - para produção com Redis)

```bash
npm install @upstash/ratelimit @upstash/redis
```

### Error Tracking (Opcional - Sentry)

```bash
npm install --save-dev @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## 📋 3. Verificar Dependências Existentes

Verifique se estas dependências JÁ estão instaladas (não instalar novamente):

```json
{
  "dependencies": {
    "zod": "^3.23.6" // ✅ JÁ INSTALADO
  }
}
```

---

## 🚀 4. Comandos de Teste

Após instalar as dependências, você poderá usar:

### Testes Unitários

```bash
# Rodar todos os testes
npm run test

# Rodar em modo watch (desenvolvimento)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Rodar testes no CI/CD
npm run test:ci
```

### Testes E2E

```bash
# Rodar testes E2E
npm run test:e2e

# Rodar com UI interativa
npm run test:e2e:ui
```

### Otimização

```bash
# Otimizar imagens
npm run optimize:images
```

### Validação Completa (antes de deploy)

```bash
# Rodar todas as validações
npm run validate
```

---

## 📊 5. Estrutura de Testes (Criar)

Crie a seguinte estrutura de diretórios para os testes:

```
project/
├── __tests__/                  # Testes de integração
│   ├── api/
│   └── pages/
├── components/
│   └── __tests__/              # Testes de componentes
│       ├── Header.test.tsx
│       ├── Footer.test.tsx
│       └── ...
├── lib/
│   └── __tests__/              # Testes de utilitários
│       ├── auth.test.ts
│       ├── validations.test.ts
│       └── ...
├── e2e/                        # Testes E2E (Playwright)
│   ├── diagnostico.spec.ts
│   ├── auth.spec.ts
│   └── ...
└── playwright.config.ts        # Configuração Playwright
```

---

## 🧪 6. Criar Arquivo de Configuração do Playwright

Crie `playwright.config.ts` na raiz do projeto:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## ✅ 7. Validar Instalação

Execute os seguintes comandos para validar:

```bash
# Verificar se Jest está configurado
npm run test -- --version

# Verificar se Playwright está instalado
npx playwright --version

# Rodar lint
npm run lint

# Tentar build
npm run build
```

---

## 🎯 8. Próximos Passos

Após configurar tudo:

1. **Criar primeiro teste:**
   ```bash
   mkdir -p components/__tests__
   # Criar components/__tests__/Header.test.tsx
   ```

2. **Rodar testes:**
   ```bash
   npm run test
   ```

3. **Ver cobertura:**
   ```bash
   npm run test:coverage
   open coverage/index.html
   ```

4. **Criar teste E2E:**
   ```bash
   mkdir -p e2e
   # Criar e2e/homepage.spec.ts
   npm run test:e2e
   ```

---

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)

---

## 🆘 Troubleshooting

### Erro: "Cannot find module '@testing-library/react'"
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Erro: "SWC binary not found"
```bash
npm install --save-dev @swc/jest
```

### Erro: "Playwright browsers not installed"
```bash
npx playwright install
```

---

## ✅ Checklist de Configuração

- [ ] Scripts adicionados ao `package.json`
- [ ] Dependências de teste instaladas
- [ ] `jest.config.js` criado (✅ já criado)
- [ ] `jest.setup.js` criado (✅ já criado)
- [ ] `playwright.config.ts` criado
- [ ] Estrutura de diretórios criada
- [ ] Primeiro teste criado
- [ ] Testes rodando com sucesso

---

*Após completar estas etapas, você terá um ambiente de testes completo e robusto!* 🎉

