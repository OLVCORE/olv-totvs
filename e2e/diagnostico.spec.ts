import { test, expect } from '@playwright/test';

/**
 * 🎭 TESTE E2E - DIAGNÓSTICO
 * 
 * Teste end-to-end completo do fluxo de diagnóstico.
 * Simula interação real do usuário.
 */

test.describe('Diagnóstico E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página de diagnóstico
    await page.goto('/diagnostico');
    
    // Aguardar carregamento da página
    await page.waitForLoadState('networkidle');
  });

  test('deve completar fluxo de diagnóstico completo', async ({ page }) => {
    // Step 1: Selecionar setor
    await expect(page.locator('h2')).toContainText('Qual é o setor da sua empresa?');
    
    // Selecionar setor "Manufatura"
    await page.click('text=Manufatura');
    await page.click('button[type="submit"]');
    
    // Step 2: Selecionar porte
    await expect(page.locator('h2')).toContainText('Qual é o porte da sua empresa?');
    
    // Selecionar porte "Média"
    await page.click('text=Média');
    await page.click('button[type="submit"]');
    
    // Step 3: Selecionar módulos
    await expect(page.locator('h2')).toContainText('Quais módulos você precisa?');
    
    // Selecionar módulos
    await page.check('input[value="ERP"]');
    await page.check('input[value="CRM"]');
    await page.check('input[value="Analytics"]');
    
    await page.click('button[type="submit"]');
    
    // Step 4: Selecionar dores
    await expect(page.locator('h2')).toContainText('Quais são suas principais dores?');
    
    // Selecionar dores
    await page.check('input[value="Gestão de estoque"]');
    await page.check('input[value="Controle financeiro"]');
    await page.check('input[value="Relatórios"]');
    
    await page.click('button[type="submit"]');
    
    // Step 5: Dados de contato
    await expect(page.locator('h2')).toContainText('Vamos conversar sobre sua empresa?');
    
    // Preencher dados de contato
    await page.fill('input[name="nome"]', 'João Silva');
    await page.fill('input[name="email"]', 'joao@exemplo.com');
    await page.fill('input[name="telefone"]', '(11) 99999-9999');
    await page.fill('input[name="empresa"]', 'Empresa Teste LTDA');
    
    // Adicionar observações
    await page.fill('textarea[name="observacoes"]', 'Precisamos de uma solução completa para nossa empresa.');
    
    // Submeter formulário
    await page.click('button[type="submit"]');
    
    // Verificar redirecionamento para página de sucesso
    await expect(page).toHaveURL('/diagnostico/sucesso');
    await expect(page.locator('h1')).toContainText('Diagnóstico Enviado!');
  });

  test('deve validar campos obrigatórios', async ({ page }) => {
    // Step 1: Tentar avançar sem selecionar setor
    await page.click('button[type="submit"]');
    
    // Deve mostrar erro ou não avançar
    await expect(page.locator('h2')).toContainText('Qual é o setor da sua empresa?');
    
    // Selecionar setor e avançar
    await page.click('text=Manufatura');
    await page.click('button[type="submit"]');
    
    // Step 2: Tentar avançar sem selecionar porte
    await page.click('button[type="submit"]');
    
    // Deve mostrar erro ou não avançar
    await expect(page.locator('h2')).toContainText('Qual é o porte da sua empresa?');
  });

  test('deve permitir navegação entre steps', async ({ page }) => {
    // Step 1: Selecionar setor
    await page.click('text=Manufatura');
    await page.click('button[type="submit"]');
    
    // Step 2: Voltar para step anterior
    await page.click('button:has-text("Voltar")');
    
    // Deve voltar para step 1
    await expect(page.locator('h2')).toContainText('Qual é o setor da sua empresa?');
    
    // Verificar se a seleção foi mantida
    await expect(page.locator('text=Manufatura')).toBeVisible();
  });

  test('deve mostrar progresso correto', async ({ page }) => {
    // Step 1: Verificar progresso inicial
    await expect(page.locator('[data-testid="progress"]')).toContainText('1 de 5');
    
    // Avançar para step 2
    await page.click('text=Manufatura');
    await page.click('button[type="submit"]');
    
    // Verificar progresso atualizado
    await expect(page.locator('[data-testid="progress"]')).toContainText('2 de 5');
  });

  test('deve funcionar em dispositivos móveis', async ({ page }) => {
    // Simular viewport móvel
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Step 1: Selecionar setor
    await page.click('text=Manufatura');
    await page.click('button[type="submit"]');
    
    // Step 2: Selecionar porte
    await page.click('text=Média');
    await page.click('button[type="submit"]');
    
    // Verificar se a interface está responsiva
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('deve lidar com erros de rede', async ({ page }) => {
    // Interceptar requisições e simular erro
    await page.route('**/api/leads', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });
    
    // Completar fluxo até o final
    await page.click('text=Manufatura');
    await page.click('button[type="submit"]');
    
    await page.click('text=Média');
    await page.click('button[type="submit"]');
    
    await page.check('input[value="ERP"]');
    await page.click('button[type="submit"]');
    
    await page.check('input[value="Gestão de estoque"]');
    await page.click('button[type="submit"]');
    
    // Preencher dados de contato
    await page.fill('input[name="nome"]', 'João Silva');
    await page.fill('input[name="email"]', 'joao@exemplo.com');
    await page.fill('input[name="telefone"]', '(11) 99999-9999');
    await page.fill('input[name="empresa"]', 'Empresa Teste LTDA');
    
    // Tentar submeter
    await page.click('button[type="submit"]');
    
    // Deve mostrar mensagem de erro
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});
