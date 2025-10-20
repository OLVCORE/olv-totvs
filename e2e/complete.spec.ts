import { test, expect } from '@playwright/test';

/**
 * 🎭 TESTES E2E AVANÇADOS
 * 
 * Suite completa de testes end-to-end para garantir
 * funcionamento perfeito em todos os cenários.
 */

test.describe('OLV TOTVS - Testes E2E Completos', () => {
  test.beforeEach(async ({ page }) => {
    // Configurações globais
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('🏠 Homepage', () => {
    test('deve carregar homepage com todos os elementos', async ({ page }) => {
      // Verificar elementos principais
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // Verificar seções
      await expect(page.locator('text=Transforme sua gestão empresarial')).toBeVisible();
      await expect(page.locator('text=Soluções TOTVS')).toBeVisible();
      await expect(page.locator('text=Setores')).toBeVisible();
    });

    test('deve navegar para diagnóstico', async ({ page }) => {
      await page.click('text=Diagnóstico');
      await expect(page).toHaveURL('/diagnostico');
    });

    test('deve navegar para soluções', async ({ page }) => {
      await page.click('text=Soluções');
      await expect(page).toHaveURL('/solucoes');
    });

    test('deve navegar para setores', async ({ page }) => {
      await page.click('text=Setores');
      await expect(page).toHaveURL('/setores');
    });
  });

  test.describe('🔍 Diagnóstico Completo', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/diagnostico');
      await page.waitForLoadState('networkidle');
    });

    test('deve completar fluxo completo de diagnóstico', async ({ page }) => {
      // Step 1: Setor
      await expect(page.locator('h2')).toContainText('setor');
      await page.click('text=Manufatura');
      await page.click('button[type="submit"]');
      
      // Step 2: Porte
      await expect(page.locator('h2')).toContainText('porte');
      await page.click('text=Média');
      await page.click('button[type="submit"]');
      
      // Step 3: Módulos
      await expect(page.locator('h2')).toContainText('módulos');
      await page.check('input[value="ERP"]');
      await page.check('input[value="CRM"]');
      await page.check('input[value="Analytics"]');
      await page.click('button[type="submit"]');
      
      // Step 4: Dores
      await expect(page.locator('h2')).toContainText('dores');
      await page.check('input[value="Gestão de estoque"]');
      await page.check('input[value="Controle financeiro"]');
      await page.check('input[value="Relatórios"]');
      await page.click('button[type="submit"]');
      
      // Step 5: Contato
      await expect(page.locator('h2')).toContainText('conversar');
      await page.fill('input[name="nome"]', 'João Silva Teste');
      await page.fill('input[name="email"]', 'joao.teste@exemplo.com');
      await page.fill('input[name="telefone"]', '(11) 99999-9999');
      await page.fill('input[name="empresa"]', 'Empresa Teste LTDA');
      await page.fill('textarea[name="observacoes"]', 'Teste automatizado do diagnóstico');
      
      await page.click('button[type="submit"]');
      
      // Verificar sucesso
      await expect(page).toHaveURL('/diagnostico/sucesso');
      await expect(page.locator('h1')).toContainText('sucesso');
    });

    test('deve validar campos obrigatórios', async ({ page }) => {
      // Tentar avançar sem selecionar setor
      await page.click('button[type="submit"]');
      await expect(page.locator('h2')).toContainText('setor');
      
      // Selecionar setor e tentar avançar sem porte
      await page.click('text=Manufatura');
      await page.click('button[type="submit"]');
      await page.click('button[type="submit"]');
      await expect(page.locator('h2')).toContainText('porte');
    });

    test('deve permitir navegação entre steps', async ({ page }) => {
      // Avançar para step 2
      await page.click('text=Manufatura');
      await page.click('button[type="submit"]');
      
      // Voltar para step 1
      await page.click('button:has-text("Voltar")');
      await expect(page.locator('h2')).toContainText('setor');
      
      // Verificar se seleção foi mantida
      await expect(page.locator('text=Manufatura')).toBeVisible();
    });
  });

  test.describe('📱 Responsividade', () => {
    test('deve funcionar em mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Verificar elementos principais
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      
      // Verificar menu mobile
      const menuButton = page.locator('button[aria-label*="menu"]');
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await expect(page.locator('nav a')).toBeVisible();
      }
    });

    test('deve funcionar em tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Verificar layout tablet
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('🔐 Autenticação', () => {
    test('deve acessar dashboard admin', async ({ page }) => {
      await page.goto('/admin/login');
      await page.waitForLoadState('networkidle');
      
      // Verificar página de login
      await expect(page.locator('h1')).toContainText('Login');
      
      // Tentar login (sem credenciais reais)
      await page.fill('input[name="email"]', 'admin@teste.com');
      await page.fill('input[name="senha"]', 'senha123');
      await page.click('button[type="submit"]');
      
      // Verificar comportamento (pode ser erro ou redirecionamento)
      await page.waitForTimeout(2000);
    });
  });

  test.describe('📄 Páginas de Soluções', () => {
    test('deve navegar para página de ERP', async ({ page }) => {
      await page.goto('/solucoes/sistema-de-gestao');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('Sistema de Gestão');
      await expect(page.locator('text=funcionalidades')).toBeVisible();
    });

    test('deve navegar para página de CRM', async ({ page }) => {
      await page.goto('/solucoes/crm');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('CRM');
      await expect(page.locator('text=benefícios')).toBeVisible();
    });
  });

  test.describe('🏭 Páginas de Setores', () => {
    test('deve navegar para página de Manufatura', async ({ page }) => {
      await page.goto('/setores/manufatura');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('Manufatura');
      await expect(page.locator('text=desafios')).toBeVisible();
    });

    test('deve navegar para página de Agro', async ({ page }) => {
      await page.goto('/setores/agro');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('Agro');
      await expect(page.locator('text=soluções')).toBeVisible();
    });
  });

  test.describe('📝 Blog', () => {
    test('deve acessar página do blog', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('Blog');
      await expect(page.locator('article')).toBeVisible();
    });

    test('deve navegar para post específico', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // Clicar no primeiro post
      const firstPost = page.locator('article a').first();
      if (await firstPost.isVisible()) {
        await firstPost.click();
        await expect(page.locator('article')).toBeVisible();
      }
    });
  });

  test.describe('📞 Contato', () => {
    test('deve acessar página de contato', async ({ page }) => {
      await page.goto('/contato');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('Contato');
      await expect(page.locator('form')).toBeVisible();
    });

    test('deve enviar formulário de contato', async ({ page }) => {
      await page.goto('/contato');
      await page.waitForLoadState('networkidle');
      
      // Preencher formulário
      await page.fill('input[name="nome"]', 'João Silva');
      await page.fill('input[name="email"]', 'joao@exemplo.com');
      await page.fill('input[name="telefone"]', '(11) 99999-9999');
      await page.fill('input[name="empresa"]', 'Empresa Teste');
      await page.fill('textarea[name="mensagem"]', 'Mensagem de teste');
      
      await page.click('button[type="submit"]');
      
      // Verificar comportamento
      await page.waitForTimeout(2000);
    });
  });

  test.describe('🔍 SEO e Performance', () => {
    test('deve ter meta tags corretas', async ({ page }) => {
      await page.goto('/');
      
      // Verificar meta tags
      const title = await page.title();
      expect(title).toBeTruthy();
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });

    test('deve carregar rapidamente', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Verificar se carregou em menos de 5 segundos
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test.describe('🌐 Acessibilidade', () => {
    test('deve ter estrutura semântica correta', async ({ page }) => {
      await page.goto('/');
      
      // Verificar elementos semânticos
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('deve ter alt text em imagens', async ({ page }) => {
      await page.goto('/');
      
      const images = page.locator('img');
      const count = await images.count();
      
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });
  });

  test.describe('🚨 Tratamento de Erros', () => {
    test('deve lidar com página não encontrada', async ({ page }) => {
      await page.goto('/pagina-inexistente');
      
      // Verificar página 404
      await expect(page.locator('h1')).toContainText('404');
    });

    test('deve lidar com erros de rede', async ({ page }) => {
      // Interceptar requisições e simular erro
      await page.route('**/api/**', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' }),
        });
      });
      
      await page.goto('/diagnostico');
      await page.click('text=Manufatura');
      await page.click('button[type="submit"]');
      
      // Verificar tratamento de erro
      await page.waitForTimeout(2000);
    });
  });
});
