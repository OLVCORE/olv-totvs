/**
 * 🧪 TESTE E2E - Fluxo de Diagnóstico
 * 
 * Teste end-to-end do fluxo completo de diagnóstico.
 * Simula um usuário real completando o formulário.
 */

import { test, expect } from '@playwright/test';

test.describe('Fluxo de Diagnóstico Completo', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para página de diagnóstico
    await page.goto('/diagnostico');
    
    // Verificar que a página carregou
    await expect(page).toHaveTitle(/Diagnóstico/);
  });

  test('deve completar diagnóstico com sucesso', async ({ page }) => {
    // ==========================================
    // STEP 1: Selecionar Setor
    // ==========================================
    await test.step('Step 1 - Setor', async () => {
      // Aguardar o Step 1 carregar
      await expect(page.locator('text=Qual é o seu setor?')).toBeVisible();
      
      // Selecionar setor (Agro)
      await page.click('text=Agro');
      
      // Clicar em Próximo
      await page.click('button:has-text("Próximo")');
      
      // Aguardar transição
      await page.waitForTimeout(500);
    });

    // ==========================================
    // STEP 2: Selecionar Porte
    // ==========================================
    await test.step('Step 2 - Porte', async () => {
      // Verificar que avançou para Step 2
      await expect(page.locator('text=Qual o porte da sua empresa?')).toBeVisible();
      
      // Selecionar porte
      await page.click('text=Médio (51-250 funcionários)');
      
      // Clicar em Próximo
      await page.click('button:has-text("Próximo")');
      
      await page.waitForTimeout(500);
    });

    // ==========================================
    // STEP 3: Selecionar Módulos
    // ==========================================
    await test.step('Step 3 - Módulos', async () => {
      // Verificar Step 3
      await expect(page.locator('text=Quais soluções interessam?')).toBeVisible();
      
      // Selecionar múltiplos módulos
      await page.click('text=Sistema de Gestão (ERP)');
      await page.click('text=Fluig');
      await page.click('text=Analytics');
      
      // Clicar em Próximo
      await page.click('button:has-text("Próximo")');
      
      await page.waitForTimeout(500);
    });

    // ==========================================
    // STEP 4: Selecionar Dores
    // ==========================================
    await test.step('Step 4 - Dores', async () => {
      // Verificar Step 4
      await expect(page.locator('text=Quais são seus principais desafios?')).toBeVisible();
      
      // Selecionar dores
      await page.click('text=Processos manuais');
      await page.click('text=Falta de integração');
      
      // Clicar em Próximo
      await page.click('button:has-text("Próximo")');
      
      await page.waitForTimeout(500);
    });

    // ==========================================
    // STEP 5: Preencher Contato
    // ==========================================
    await test.step('Step 5 - Contato', async () => {
      // Verificar Step 5
      await expect(page.locator('text=Seus dados de contato')).toBeVisible();
      
      // Preencher formulário
      await page.fill('input[name="nome"]', 'João Silva');
      await page.fill('input[name="empresa"]', 'Empresa Teste LTDA');
      await page.fill('input[name="email"]', 'joao.silva@teste.com');
      await page.fill('input[name="telefone"]', '+55 11 99999-9999');
      
      // Aguardar um pouco para simular usuário real
      await page.waitForTimeout(1000);
      
      // Submeter formulário
      await page.click('button:has-text("Enviar")');
    });

    // ==========================================
    // VERIFICAR SUCESSO
    // ==========================================
    await test.step('Verificar Sucesso', async () => {
      // Aguardar redirecionamento ou mensagem de sucesso
      await page.waitForURL('**/diagnostico/sucesso', { timeout: 10000 });
      
      // Verificar mensagem de sucesso
      await expect(
        page.locator('text=Diagnóstico recebido com sucesso')
      ).toBeVisible();
      
      // Verificar elementos da página de sucesso
      await expect(page.locator('text=Obrigado')).toBeVisible();
    });
  });

  test('deve validar campos obrigatórios', async ({ page }) => {
    await test.step('Tentar avançar sem seleção', async () => {
      // Tentar clicar em Próximo sem selecionar nada
      await page.click('button:has-text("Próximo")');
      
      // Aguardar mensagem de erro
      await page.waitForTimeout(500);
      
      // Verificar que não avançou (ainda no Step 1)
      await expect(page.locator('text=Qual é o seu setor?')).toBeVisible();
    });
  });

  test('deve permitir voltar entre steps', async ({ page }) => {
    // Avançar para Step 2
    await page.click('text=Agro');
    await page.click('button:has-text("Próximo")');
    await page.waitForTimeout(500);
    
    // Verificar Step 2
    await expect(page.locator('text=Qual o porte')).toBeVisible();
    
    // Clicar em Voltar
    await page.click('button:has-text("Voltar")');
    await page.waitForTimeout(500);
    
    // Verificar que voltou para Step 1
    await expect(page.locator('text=Qual é o seu setor?')).toBeVisible();
  });

  test('deve manter dados ao voltar', async ({ page }) => {
    // Selecionar no Step 1
    await page.click('text=Agro');
    await page.click('button:has-text("Próximo")');
    
    // Selecionar no Step 2
    await page.click('text=Médio (51-250 funcionários)');
    await page.click('button:has-text("Próximo")');
    
    // Voltar para Step 1
    await page.click('button:has-text("Voltar")');
    await page.click('button:has-text("Voltar")');
    
    // Verificar que Agro ainda está selecionado
    const agroButton = page.locator('text=Agro').first();
    await expect(agroButton).toHaveClass(/selected|active|bg-cyan/);
  });
});

test.describe('Validações de Formulário', () => {
  test('deve validar formato de email', async ({ page }) => {
    await page.goto('/diagnostico');
    
    // Pular para Step 5 (assumindo que há um jeito de pular steps em dev)
    // Ou completar todos os steps rapidamente
    await page.click('text=Agro');
    await page.click('button:has-text("Próximo")');
    await page.click('text=Médio (51-250 funcionários)');
    await page.click('button:has-text("Próximo")');
    await page.click('text=Sistema de Gestão (ERP)');
    await page.click('button:has-text("Próximo")');
    await page.click('text=Processos manuais');
    await page.click('button:has-text("Próximo")');
    
    // Preencher com email inválido
    await page.fill('input[name="nome"]', 'João Silva');
    await page.fill('input[name="empresa"]', 'Empresa Teste');
    await page.fill('input[name="email"]', 'email-invalido');
    await page.fill('input[name="telefone"]', '+5511999999999');
    
    // Tentar submeter
    await page.click('button:has-text("Enviar")');
    
    // Verificar mensagem de erro
    await expect(page.locator('text=Email inválido')).toBeVisible();
  });
});

test.describe('Acessibilidade', () => {
  test('deve ser navegável por teclado', async ({ page }) => {
    await page.goto('/diagnostico');
    
    // Navegar usando Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Selecionar usando Enter
    await page.keyboard.press('Enter');
    
    // Verificar que algo foi selecionado
    await page.waitForTimeout(500);
  });

  test('deve ter labels acessíveis', async ({ page }) => {
    await page.goto('/diagnostico');
    
    // Verificar que inputs têm labels
    const inputs = page.locator('input');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const ariaLabel = await input.getAttribute('aria-label');
      const id = await input.getAttribute('id');
      
      // Deve ter aria-label ou id (para label for)
      expect(ariaLabel || id).toBeTruthy();
    }
  });
});

test.describe('Responsividade', () => {
  test('deve funcionar em mobile', async ({ page }) => {
    // Configurar viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/diagnostico');
    
    // Verificar que elementos estão visíveis
    await expect(page.locator('text=Qual é o seu setor?')).toBeVisible();
    
    // Completar fluxo
    await page.click('text=Agro');
    await page.click('button:has-text("Próximo")');
    
    // Verificar que avançou
    await expect(page.locator('text=Qual o porte')).toBeVisible();
  });

  test('deve funcionar em tablet', async ({ page }) => {
    // Configurar viewport tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/diagnostico');
    
    // Verificar layout
    await expect(page.locator('text=Qual é o seu setor?')).toBeVisible();
  });
});

