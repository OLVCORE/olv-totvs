import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailConfig } from '@/lib/config';

export const dynamic = 'force-dynamic';

// ==========================================
// CONFIGURAÇÃO DO TRANSPORTER SMTP
// ==========================================

const createTransporter = () => {
  if (!emailConfig.enabled) {
    throw new Error('Email não está habilitado');
  }

  return nodemailer.createTransport({
    host: emailConfig.smtp.host,
    port: emailConfig.smtp.port,
    secure: emailConfig.smtp.secure, // true para porta 465, false para outras
    auth: {
      user: emailConfig.smtp.user,
      pass: emailConfig.smtp.password,
    },
  });
};

// ==========================================
// TIPOS DE EMAIL
// ==========================================

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
  solution?: string;
  sector?: string;
  consultancy?: string;
  attachments?: Array<{
    originalName: string;
    fileName: string;
    size: number;
    type: string;
    url: string;
  }>;
}

interface LeadEmailData {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  size: string;
  modules: string[];
  pains: string[];
}

// ==========================================
// TEMPLATES DE EMAIL
// ==========================================

const createContactEmailTemplate = (data: ContactEmailData) => ({
  subject: `Nova mensagem de contato - ${data.name}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Nova Mensagem de Contato</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">OLV Internacional - Parceiro TOTVS</p>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #1e293b; margin-top: 0;">Detalhes do Contato</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Nome:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Telefone:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
          ${data.solution ? `<p><strong>Solução de Interesse:</strong> ${data.solution}</p>` : ''}
          ${data.sector ? `<p><strong>Setor:</strong> ${data.sector}</p>` : ''}
          ${data.consultancy ? `<p><strong>Tipo de Consultoria:</strong> ${data.consultancy}</p>` : ''}
          ${data.subject ? `<p><strong>Assunto:</strong> ${data.subject}</p>` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1e293b; margin-top: 0;">Mensagem</h3>
          <p style="line-height: 1.6; color: #475569;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        ${data.attachments && data.attachments.length > 0 ? `
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1e293b; margin-top: 0;">📎 Arquivos Anexados (${data.attachments.length})</h3>
          <ul style="margin: 0; padding-left: 20px; color: #475569;">
            ${data.attachments.map(att => `
              <li style="margin-bottom: 8px;">
                <strong>${att.originalName}</strong> 
                <span style="color: #64748b;">(${(att.size / 1024 / 1024).toFixed(2)} MB)</span>
              </li>
            `).join('')}
          </ul>
          <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">
            💡 Os arquivos foram salvos no servidor e podem ser acessados através do painel administrativo.
          </p>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding: 20px; background: #e0f2fe; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #0369a1;">
            <strong>Responda diretamente para:</strong> ${data.email}
          </p>
        </div>
      </div>
      
      <div style="background: #1e293b; padding: 20px; text-align: center; color: white;">
        <p style="margin: 0; font-size: 14px;">
          © ${new Date().getFullYear()} OLV Internacional - Parceiro Oficial TOTVS
        </p>
        <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
          Este email foi enviado automaticamente através do site olvinternacional.com.br
        </p>
      </div>
    </div>
  `,
});

const createLeadEmailTemplate = (data: LeadEmailData) => ({
  subject: `Novo Lead TOTVS - ${data.company}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Novo Lead TOTVS</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Diagnóstico Completo</p>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #1e293b; margin-top: 0;">Informações da Empresa</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Empresa:</strong> ${data.company}</p>
          <p><strong>Contato:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.phone}</p>
          <p><strong>Setor:</strong> ${data.sector}</p>
          <p><strong>Porte:</strong> ${data.size}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1e293b; margin-top: 0;">Módulos de Interesse</h3>
          <ul style="color: #475569;">
            ${data.modules.map(module => `<li>${module}</li>`).join('')}
          </ul>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <h3 style="color: #1e293b; margin-top: 0;">Principais Dores</h3>
          <ul style="color: #475569;">
            ${data.pains.map(pain => `<li>${pain}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #dcfce7; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #166534;">
            <strong>🎯 Lead Qualificado - Ação Imediata Necessária</strong>
          </p>
        </div>
      </div>
      
      <div style="background: #1e293b; padding: 20px; text-align: center; color: white;">
        <p style="margin: 0; font-size: 14px;">
          © ${new Date().getFullYear()} OLV Internacional - Parceiro Oficial TOTVS
        </p>
      </div>
    </div>
  `,
});

// ==========================================
// API ROUTES
// ==========================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!emailConfig.enabled) {
      return NextResponse.json(
        { error: 'Email não está habilitado' },
        { status: 503 }
      );
    }

    const transporter = createTransporter();

    let emailTemplate;
    let toEmail = emailConfig.from; // Enviar para o email da empresa

    switch (type) {
      case 'contact':
        emailTemplate = createContactEmailTemplate(data as ContactEmailData);
        break;
      case 'lead':
        emailTemplate = createLeadEmailTemplate(data as LeadEmailData);
        break;
      default:
        return NextResponse.json(
          { error: 'Tipo de email inválido' },
          { status: 400 }
        );
    }

    const mailOptions = {
      from: emailConfig.from,
      to: toEmail,
      replyTo: data.email || emailConfig.replyTo,
      ...emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email enviado com sucesso' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// ==========================================
// TESTE DE CONEXÃO SMTP
// ==========================================

export async function GET() {
  try {
    if (!emailConfig.enabled) {
      return NextResponse.json(
        { error: 'Email não está habilitado' },
        { status: 503 }
      );
    }

    const transporter = createTransporter();
    await transporter.verify();

    return NextResponse.json(
      { 
        message: 'Conexão SMTP verificada com sucesso',
        config: {
          host: emailConfig.smtp.host,
          port: emailConfig.smtp.port,
          secure: emailConfig.smtp.secure,
          user: emailConfig.smtp.user,
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro na verificação SMTP:', error);
    return NextResponse.json(
      { error: 'Falha na conexão SMTP' },
      { status: 500 }
    );
  }
}
