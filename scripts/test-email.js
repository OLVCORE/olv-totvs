#!/usr/bin/env node

/**
 * Script de teste para configuração de email
 * Executa: npm run test:email
 */

import nodemailer from 'nodemailer';

// Configurações de email (mesmas do .env.local)
const emailConfig = {
  enabled: true,
  smtp: {
    host: 'mail.olvinternacional.com.br',
    port: 465,
    secure: true,
    user: 'parceiro-totvs@olvinternacional.com.br',
    password: 's#Bliss2711@',
  },
  from: 'parceiro-totvs@olvinternacional.com.br',
};

async function testEmailConnection() {
  console.log('🔧 Testando configuração de email...\n');

  try {
    // Criar transporter
    const transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: {
        user: emailConfig.smtp.user,
        pass: emailConfig.smtp.password,
      },
    });

    console.log('📡 Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP verificada com sucesso!\n');

    // Enviar email de teste
    console.log('📧 Enviando email de teste...');
    
    const testEmail = {
      from: emailConfig.from,
      to: emailConfig.from, // Enviar para si mesmo
      subject: 'Teste de Configuração - OLV Internacional',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">✅ Email Configurado com Sucesso!</h1>
            <p style="color: white; margin: 10px 0 0 0;">OLV Internacional - Parceiro TOTVS</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e293b;">Configuração Ativa</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p><strong>Servidor:</strong> ${emailConfig.smtp.host}</p>
              <p><strong>Porta:</strong> ${emailConfig.smtp.port}</p>
              <p><strong>SSL:</strong> ${emailConfig.smtp.secure ? 'Habilitado' : 'Desabilitado'}</p>
              <p><strong>Usuário:</strong> ${emailConfig.smtp.user}</p>
              <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 20px; background: #dcfce7; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #166534;">
                <strong>🎉 Sistema de email funcionando perfeitamente!</strong>
              </p>
            </div>
          </div>
          
          <div style="background: #1e293b; padding: 20px; text-align: center; color: white;">
            <p style="margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} OLV Internacional - Agente de Negócio TOTVS
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(testEmail);
    console.log('✅ Email de teste enviado com sucesso!');
    console.log(`📬 Message ID: ${result.messageId}\n`);

    console.log('🎉 Configuração de email funcionando perfeitamente!');
    console.log('📋 Próximos passos:');
    console.log('   - Integrar com formulários de contato');
    console.log('   - Configurar templates personalizados');
    console.log('   - Testar envio de leads\n');

  } catch (error) {
    console.error('❌ Erro na configuração de email:');
    console.error(error);
    
    console.log('\n🔧 Possíveis soluções:');
    console.log('   - Verificar credenciais do email');
    console.log('   - Confirmar configurações SMTP');
    console.log('   - Verificar firewall/proxy');
    console.log('   - Testar conectividade de rede\n');
    
    process.exit(1);
  }
}

// Executar teste
testEmailConnection();
