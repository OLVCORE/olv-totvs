# 🚀 PLANO DE AÇÃO - IMPLEMENTAÇÃO
## Roteiro Completo para Deploy em Produção

**Timeline:** 3 semanas  
**Esforço:** ~120 horas de desenvolvimento  
**Objetivo:** Deploy seguro e robusto em produção

---

## 📅 SEMANA 1: TESTES + SEGURANÇA CRÍTICA

### 🔴 DIA 1: Environment Variables e Secrets (4 horas)

**Tarefas:**
1. Gerar secrets seguros
2. Configurar env vars
3. Validar vars obrigatórias

**Implementação:**

```bash
# 1. Gerar secrets seguros
openssl rand -base64 32  # NEXTAUTH_SECRET
openssl rand -base64 32  # JWT_SECRET

# 2. Criar .env.local.example atualizado
cp .env.local.example .env.local

# 3. Adicionar no Vercel
vercel env add NEXTAUTH_SECRET production
vercel env add JWT_SECRET production
vercel env add MONGODB_URI production
```

**Código: lib/config.ts** (NOVO)
```typescript
// lib/config.ts
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`❌ Missing required env var: ${key}`);
  }
  return value || '';
}

export const config = {
  // Database
  mongoUri: getRequiredEnv('MONGODB_URI'),
  
  // Auth
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  nextAuthSecret: getRequiredEnv('NEXTAUTH_SECRET'),
  nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // TOTVS
  totvsApiUrl: process.env.TOTVS_API_URL || '',
  totvsApiToken: process.env.TOTVS_API_TOKEN || '',
  
  // Analytics
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-T3P68DR',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  
  // App
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
};

// Validar no startup
if (config.isProd && !config.jwtSecret) {
  throw new Error('❌ JWT_SECRET is required in production');
}
```

**Atualizar lib/auth.ts:**
```typescript
import { config } from './config';

export function generateToken(user: Pick<User, '_id' | 'email' | 'role'>): string {
  const payload: JWTPayload = {
    userId: user._id as string,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '7d',
  });
}
```

**Checklist:**
- [ ] Secrets gerados
- [ ] .env.local.example atualizado
- [ ] config.ts criado
- [ ] lib/auth.ts atualizado
- [ ] lib/mongodb.ts atualizado
- [ ] Vars configuradas no Vercel

---

### 🔴 DIA 2-3: Validação com Zod (12 horas)

**Objetivo:** Validar e sanitizar todos inputs de API

**1. Criar schemas de validação**

```bash
mkdir -p lib/validations
```

**lib/validations/lead.schema.ts:**
```typescript
import { z } from 'zod';

export const LeadContactSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  telefone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido')
    .trim(),
});

export const LeadSchema = z.object({
  nome: z.string()
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo')
    .trim(),
  empresa: z.string()
    .min(2, 'Nome da empresa muito curto')
    .max(200, 'Nome da empresa muito longo')
    .trim(),
  setor: z.enum([
    'Agro',
    'Construção',
    'Distribuição',
    'Financial Services',
    'Logística',
    'Manufatura',
    'Prestadores de Serviços',
    'Outro'
  ]),
  porte: z.enum([
    'Micro (1-10 funcionários)',
    'Pequeno (11-50 funcionários)',
    'Médio (51-250 funcionários)',
    'Grande (251-1000 funcionários)',
    'Enterprise (1000+ funcionários)'
  ]),
  modulos_interesse: z.array(z.string()).min(1, 'Selecione ao menos um módulo'),
  dores: z.array(z.string()).min(1, 'Selecione ao menos uma dor'),
  contato: LeadContactSchema,
});

export const DiagnosticoFormSchema = z.object({
  step1: z.object({ setor: LeadSchema.shape.setor }),
  step2: z.object({ porte: LeadSchema.shape.porte }),
  step3: z.object({ modulos: LeadSchema.shape.modulos_interesse }),
  step4: z.object({ dores: LeadSchema.shape.dores }),
  step5: z.object({
    nome: LeadSchema.shape.nome,
    empresa: LeadSchema.shape.empresa,
    email: LeadContactSchema.shape.email,
    telefone: LeadContactSchema.shape.telefone,
  }),
});

export type LeadInput = z.infer<typeof LeadSchema>;
export type DiagnosticoFormInput = z.infer<typeof DiagnosticoFormSchema>;
```

**lib/validations/auth.schema.ts:**
```typescript
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(100, 'Senha muito longa'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
```

**2. Atualizar API routes**

**app/api/leads/route.ts:**
```typescript
import { DiagnosticoFormSchema } from '@/lib/validations/lead.schema';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // ✅ VALIDAÇÃO COM ZOD
    const validationResult = DiagnosticoFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Criar lead com dados validados
    const lead = await Lead.create({
      nome: data.step5.nome,
      empresa: data.step5.empresa,
      setor: data.step1.setor,
      porte: data.step2.porte,
      modulos_interesse: data.step3.modulos,
      dores: data.step4.dores,
      contato: {
        email: data.step5.email,
        telefone: data.step5.telefone,
      },
      status: 'novo',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Lead criado com sucesso',
        leadId: lead._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    
    // ✅ Não expor detalhes do erro em produção
    if (config.isProd) {
      return NextResponse.json(
        { error: 'Erro ao processar requisição' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
```

**app/api/auth/login/route.ts:**
```typescript
import { LoginSchema } from '@/lib/validations/auth.schema';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // ✅ VALIDAÇÃO COM ZOD
    const validationResult = LoginSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Email ou senha inválidos' },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // ... resto da lógica
  } catch (error) {
    // ... error handling
  }
}
```

**Checklist:**
- [ ] Schemas Zod criados (lead, auth)
- [ ] API routes atualizadas
- [ ] Error handling melhorado
- [ ] Testes manuais das validações

---

### 🔴 DIA 4: Rate Limiting (6 horas)

**Instalar dependência:**
```bash
npm install @upstash/ratelimit @upstash/redis
```

**lib/rate-limit.ts:**
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// Criar Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limiters diferentes por tipo de endpoint
export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 tentativas por 15 min
  analytics: true,
});

export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 requests por minuto
  analytics: true,
});

export const leadLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 leads por hora (mesmo IP)
  analytics: true,
});

// Helper function
export async function rateLimit(
  request: NextRequest,
  limiter: Ratelimit
): Promise<{ success: boolean; response?: NextResponse }> {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  
  const { success, limit, reset, remaining } = await limiter.limit(ip);

  if (!success) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: 'Muitas requisições. Tente novamente mais tarde.',
          retryAfter: Math.floor((reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      ),
    };
  }

  return { success: true };
}
```

**Usar em API routes:**

**app/api/auth/login/route.ts:**
```typescript
import { rateLimit, authLimiter } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // ✅ RATE LIMITING
  const rateLimitResult = await rateLimit(request, authLimiter);
  if (!rateLimitResult.success) {
    return rateLimitResult.response;
  }

  // ... resto da lógica
}
```

**app/api/leads/route.ts:**
```typescript
import { rateLimit, leadLimiter } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // ✅ RATE LIMITING
  const rateLimitResult = await rateLimit(request, leadLimiter);
  if (!rateLimitResult.success) {
    return rateLimitResult.response;
  }

  // ... resto da lógica
}
```

**Alternativa sem Redis (in-memory):**

```typescript
// lib/rate-limit-memory.ts (para desenvolvimento/baixo tráfego)
const cache = new Map<string, { count: number; resetAt: number }>();

export function rateLimitMemory(
  ip: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = cache.get(ip);

  if (!record || now > record.resetAt) {
    cache.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: limit - record.count };
}
```

**Checklist:**
- [ ] Rate limiting implementado
- [ ] Testado em dev
- [ ] Upstash Redis configurado (ou in-memory para MVP)
- [ ] Logs de rate limit

---

### 🔴 DIA 5-7: Testes Automatizados (16 horas)

**Setup de testes:**

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest
npm install -D @playwright/test
```

**jest.config.js:**
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

**jest.setup.js:**
```javascript
import '@testing-library/jest-dom';
```

**package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test"
  }
}
```

**Testes de Componentes:**

**components/__tests__/Header.test.tsx:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renderiza logo corretamente', () => {
    render(<Header />);
    expect(screen.getByAlt('OLV Internacional Logo')).toBeInTheDocument();
  });

  it('abre menu mobile ao clicar', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Menu');
    fireEvent.click(menuButton);
    expect(screen.getByText('Diagnóstico')).toBeVisible();
  });

  it('mostra dropdowns ao hover (desktop)', () => {
    render(<Header />);
    // Test dropdown logic
  });
});
```

**Testes de API:**

**app/api/__tests__/leads.test.ts:**
```typescript
import { POST } from '../leads/route';
import { NextRequest } from 'next/server';

describe('POST /api/leads', () => {
  it('cria lead com dados válidos', async () => {
    const validLead = {
      step1: { setor: 'Agro' },
      step2: { porte: 'Médio (51-250 funcionários)' },
      step3: { modulos: ['Sistema de Gestão (ERP)'] },
      step4: { dores: ['Processos manuais'] },
      step5: {
        nome: 'João Silva',
        empresa: 'Empresa Teste',
        email: 'joao@teste.com',
        telefone: '+5511999999999',
      },
    };

    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify(validLead),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty('leadId');
  });

  it('retorna erro com email inválido', async () => {
    const invalidLead = {
      // ... dados com email inválido
    };

    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify(invalidLead),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

**Testes E2E (Playwright):**

**playwright.config.ts:**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**e2e/diagnostico.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Fluxo de Diagnóstico', () => {
  test('usuário completa diagnóstico completo', async ({ page }) => {
    await page.goto('/diagnostico');

    // Step 1: Setor
    await page.click('text=Agro');
    await page.click('button:has-text("Próximo")');

    // Step 2: Porte
    await page.click('text=Médio (51-250 funcionários)');
    await page.click('button:has-text("Próximo")');

    // Step 3: Módulos
    await page.click('text=Sistema de Gestão (ERP)');
    await page.click('text=Fluig');
    await page.click('button:has-text("Próximo")');

    // Step 4: Dores
    await page.click('text=Processos manuais');
    await page.click('button:has-text("Próximo")');

    // Step 5: Contato
    await page.fill('input[name="nome"]', 'João Silva');
    await page.fill('input[name="empresa"]', 'Empresa Teste');
    await page.fill('input[name="email"]', 'joao@teste.com');
    await page.fill('input[name="telefone"]', '+5511999999999');
    await page.click('button:has-text("Enviar")');

    // Verificar sucesso
    await expect(page).toHaveURL('/diagnostico/sucesso');
    await expect(page.locator('text=Diagnóstico recebido')).toBeVisible();
  });

  test('valida campos obrigatórios', async ({ page }) => {
    await page.goto('/diagnostico');

    // Tentar prosseguir sem selecionar
    await page.click('button:has-text("Próximo")');

    // Verificar erro
    await expect(page.locator('text=campo obrigatório')).toBeVisible();
  });
});
```

**Checklist:**
- [ ] Jest configurado
- [ ] Playwright configurado
- [ ] Testes de componentes (5+ componentes)
- [ ] Testes de API (todas rotas)
- [ ] Testes E2E (fluxo principal)
- [ ] Coverage > 70%

---

## 📅 SEMANA 2: MONITORING + PERFORMANCE

### 🟡 DIA 8-9: Error Tracking com Sentry (8 horas)

**Setup:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**sentry.client.config.ts:**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
});
```

**sentry.server.config.ts:**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
});
```

**Usar em APIs:**
```typescript
import * as Sentry from '@sentry/nextjs';

export async function POST(request: NextRequest) {
  try {
    // ... lógica
  } catch (error) {
    Sentry.captureException(error, {
      tags: { endpoint: '/api/leads' },
      extra: { body: await request.json() },
    });
    
    console.error('Erro ao criar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
```

**Checklist:**
- [ ] Sentry instalado e configurado
- [ ] DSN no Vercel
- [ ] Error tracking em todas APIs
- [ ] Source maps configuradas

---

### 🟡 DIA 10-11: Otimização de Performance (10 horas)

**1. Otimizar Imagens:**

```bash
# Instalar sharp para otimização
npm install sharp

# Script para comprimir imagens
node scripts/optimize-images.js
```

**scripts/optimize-images.js:**
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = './public/images';

async function optimizeImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await optimizeImages(filePath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      console.log(`Otimizando: ${filePath}`);
      
      await sharp(filePath)
        .resize(1920, null, { withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(filePath.replace(/\.(jpg|jpeg|png)$/i, '_opt.jpg'));
    }
  }
}

optimizeImages(imageDir);
```

**2. Implementar ISR:**

**app/solucoes/[slug]/page.tsx:**
```typescript
export const revalidate = 3600; // Revalidar a cada 1 hora

export async function generateStaticParams() {
  return SOLUCOES_TOTVS.map((solucao) => ({
    slug: solucao.slug,
  }));
}
```

**3. Dynamic Imports:**

**app/page.tsx:**
```typescript
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/home/Hero'));
const Depoimentos = dynamic(() => import('@/components/home/Depoimentos'), {
  loading: () => <div>Carregando...</div>,
});
```

**4. Implementar Cache:**

**lib/cache.ts:**
```typescript
const cache = new Map<string, { data: any; expiry: number }>();

export function getCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }
  
  return cached.data as T;
}

export function setCache<T>(key: string, data: T, ttlSeconds: number = 3600): void {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  });
}
```

**Usar em APIs:**
```typescript
export async function GET(request: NextRequest) {
  const cacheKey = 'leads:all';
  const cached = getCache(cacheKey);
  
  if (cached) {
    return NextResponse.json(cached);
  }

  const leads = await Lead.find().lean();
  setCache(cacheKey, leads, 300); // 5 minutos
  
  return NextResponse.json(leads);
}
```

**Checklist:**
- [ ] Imagens otimizadas
- [ ] ISR implementado
- [ ] Dynamic imports
- [ ] Cache implementado
- [ ] Lighthouse score > 90

---

### 🟡 DIA 12-13: SEO Completo (10 horas)

**1. Sitemap Dinâmico:**

**app/sitemap.ts:**
```typescript
import { MetadataRoute } from 'next';
import { SOLUCOES_TOTVS } from '@/lib/data/solucoes';
import { SETORES_VERTICAIS } from '@/lib/data/setores';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://olvinternacional.com.br';

  const solucoes = SOLUCOES_TOTVS.map((solucao) => ({
    url: `${baseUrl}/solucoes/${solucao.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const setores = SETORES_VERTICAIS.map((setor) => ({
    url: `${baseUrl}/setores/${setor.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/diagnostico`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...solucoes,
    ...setores,
    // Adicionar mais páginas
  ];
}
```

**2. JSON-LD Structured Data:**

**components/structured-data/Organization.tsx:**
```typescript
export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OLV Internacional',
    url: 'https://olvinternacional.com.br',
    logo: 'https://olvinternacional.com.br/images/logo-olv.png',
    description: 'Parceiro oficial TOTVS. Soluções empresariais integradas.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-99999-9999',
      contactType: 'Sales',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
    sameAs: [
      'https://www.linkedin.com/company/olv-internacional',
      'https://www.facebook.com/olvinternacional',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

**app/layout.tsx:**
```typescript
import { OrganizationStructuredData } from '@/components/structured-data/Organization';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <OrganizationStructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Checklist:**
- [ ] Sitemap dinâmico
- [ ] robots.txt revisado
- [ ] JSON-LD implementado
- [ ] Breadcrumbs adicionados
- [ ] Meta tags revisadas

---

### 🟡 DIA 14: Deploy em Staging + Testes (6 horas)

**1. Criar branch staging:**

```bash
git checkout -b staging
git push -u origin staging
```

**2. Deploy no Vercel:**

```bash
vercel --prod --environment staging
```

**3. Testes em staging:**

- [ ] Testar todos fluxos manualmente
- [ ] Validar formulários
- [ ] Testar autenticação
- [ ] Verificar performance (Lighthouse)
- [ ] Testar em diferentes dispositivos
- [ ] Validar SEO (Google Search Console)

**4. Load Testing:**

```bash
npm install -g artillery

# artillery.yml
config:
  target: 'https://staging.olvinternacional.com.br'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - flow:
      - get:
          url: '/'
      - post:
          url: '/api/leads'
          json:
            # ... payload de teste

# Rodar teste
artillery run artillery.yml
```

---

## 📅 SEMANA 3: DEPLOY EM PRODUÇÃO

### 🟢 DIA 15-16: Bug Fixes e Ajustes Finais (10 horas)

- [ ] Corrigir bugs encontrados em staging
- [ ] Ajustes de UX baseados em feedback
- [ ] Revisar logs e erros
- [ ] Otimizações finais
- [ ] Documentação atualizada

### 🟢 DIA 17: Deploy em Produção (4 horas)

**1. Merge para main:**

```bash
git checkout main
git merge staging
git push origin main
```

**2. Deploy Vercel:**

```bash
vercel --prod
```

**3. Verificações pós-deploy:**

- [ ] Site acessível
- [ ] SSL funcionando
- [ ] Formulários funcionando
- [ ] API endpoints OK
- [ ] Sentry recebendo dados
- [ ] Analytics trackingando
- [ ] Performance OK (Lighthouse)

### 🟢 DIA 18-21: Monitoramento e Ajustes (16 horas)

**Monitoramento 24/7:**

- [ ] Verificar Sentry para erros
- [ ] Monitorar Vercel Analytics
- [ ] Verificar logs de API
- [ ] Monitorar performance
- [ ] Responder a issues rapidamente

**Ajustes baseados em dados reais:**

- [ ] Otimizações de performance
- [ ] Ajustes de UX
- [ ] Correções de bugs
- [ ] Melhorias de conversão

---

## ✅ CHECKLIST FINAL PRÉ-PRODUÇÃO

### Código
- [ ] Code review completo
- [ ] Zero erros de linter
- [ ] Build sem warnings
- [ ] Testes passando (coverage > 70%)
- [ ] Dependencies atualizadas

### Segurança
- [ ] Secrets seguros gerados
- [ ] Validação Zod em todas APIs
- [ ] Rate limiting implementado
- [ ] CSRF protection
- [ ] Headers de segurança
- [ ] Environment vars no Vercel

### Performance
- [ ] Imagens otimizadas
- [ ] Cache implementado
- [ ] ISR configurado
- [ ] Dynamic imports
- [ ] Lighthouse > 90

### Monitoring
- [ ] Sentry configurado
- [ ] Vercel Analytics ativo
- [ ] Logs estruturados
- [ ] Alertas configurados

### SEO
- [ ] Sitemap dinâmico
- [ ] robots.txt
- [ ] JSON-LD structured data
- [ ] Meta tags completas
- [ ] Google Search Console

### Deploy
- [ ] Staging testado
- [ ] Load tests OK
- [ ] Rollback plan pronto
- [ ] Documentação atualizada
- [ ] Backup database configurado

---

## 🚨 PLANO DE ROLLBACK

Se algo der errado:

```bash
# Voltar para versão anterior
vercel rollback

# Ou deploy específico
vercel --prod <deployment-url>

# Restaurar backup database
mongorestore --uri="..." --drop dump/
```

---

## 📊 MÉTRICAS DE SUCESSO

### Semana 1
- [ ] 100% dos testes implementados
- [ ] 0 vulnerabilidades críticas
- [ ] Coverage > 70%

### Semana 2
- [ ] Lighthouse score > 90
- [ ] 0 erros no Sentry (staging)
- [ ] LCP < 2.5s

### Semana 3
- [ ] Deploy em produção OK
- [ ] 0 downtime
- [ ] 0 erros críticos nas primeiras 48h

---

## 💰 RECURSOS NECESSÁRIOS

### Ferramentas
- [ ] Vercel Pro: $20/mês
- [ ] MongoDB Atlas M10: $57/mês
- [ ] Sentry Team: $26/mês
- [ ] Upstash Redis: $10/mês (ou free tier)

### Tempo
- **Dev Lead:** 60 horas (testes, segurança, performance)
- **Dev Junior:** 30 horas (ajustes, testes manuais)
- **QA:** 20 horas (testes, validações)
- **DevOps:** 10 horas (deploy, monitoramento)

---

## 🎯 CONCLUSÃO

Este plano garante:

✅ **Deploy seguro** com testes completos  
✅ **Performance otimizada** (Lighthouse > 90)  
✅ **Monitoring robusto** (Sentry + Analytics)  
✅ **Segurança reforçada** (validações + rate limiting)  
✅ **SEO completo** (sitemap + structured data)

**Timeline:** 3 semanas  
**Risco:** Baixo (com testes e staging)  
**ROI:** Alto (qualidade production-ready)

---

*Plano criado em: 20 de Outubro de 2025*  
*Baseado em: Avaliação Completa do Projeto OLV-TOTVS*

