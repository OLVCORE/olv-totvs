import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import IntegracaoTOTVS from '@/models/IntegracaoTOTVS';

export const dynamic = 'force-dynamic';
import { verifyToken } from '@/lib/auth';

/**
 * Endpoint para enviar leads para TOTVS
 * POST /api/totvs/send-lead
 * 
 * Estrutura MOCK preparada para futura integração real
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const token =
      request.cookies.get('auth-token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar lead
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    // Preparar payload para TOTVS
    const totvsPayload = {
      lead_id: lead._id.toString(),
      nome: lead.nome,
      empresa: lead.empresa,
      setor: lead.setor,
      porte: lead.porte,
      modulos_interesse: lead.modulos_interesse,
      dores: lead.dores,
      contato: {
        email: lead.contato.email,
        telefone: lead.contato.telefone,
      },
      status: 'enviado',
      data_envio: new Date().toISOString(),
      origem: 'OLV Internacional - Website',
    };

    // MOCK: Simular envio para TOTVS
    // TODO: Substituir por chamada real quando API TOTVS estiver disponível
    const mockTotvsResponse = await simulateTotvsApiCall(totvsPayload);

    // Registrar integração
    const integracao = await IntegracaoTOTVS.create({
      lead_id: leadId,
      payload: totvsPayload,
      status: mockTotvsResponse.success ? 'sucesso' : 'erro',
      resposta: mockTotvsResponse,
      erro: mockTotvsResponse.success ? undefined : mockTotvsResponse.error,
      tentativas: 1,
      data_envio: new Date(),
    });

    // Atualizar status do lead
    if (mockTotvsResponse.success) {
      lead.status = 'enviado_totvs';
      lead.historico.push({
        data: new Date(),
        acao: 'Lead enviado para canal TOTVS',
        usuario: decoded.email,
        detalhes: `Integração ID: ${integracao._id}`,
      });
      await lead.save();
    }

    return NextResponse.json({
      success: mockTotvsResponse.success,
      message: mockTotvsResponse.success
        ? 'Lead enviado com sucesso para TOTVS'
        : 'Erro ao enviar lead para TOTVS',
      integracao_id: integracao._id,
      totvs_response: mockTotvsResponse,
    });
  } catch (error) {
    console.error('Erro ao enviar lead para TOTVS:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * FUNÇÃO MOCK - Simula chamada à API TOTVS
 * TODO: Substituir por implementação real
 */
async function simulateTotvsApiCall(payload: any): Promise<any> {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simular resposta da API TOTVS
  // 90% de sucesso, 10% de erro para teste
  const isSuccess = Math.random() > 0.1;

  if (isSuccess) {
    return {
      success: true,
      totvs_lead_id: `TOTVS-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      message: 'Lead recebido e processado com sucesso',
      protocolo: `PROT-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  } else {
    return {
      success: false,
      error: 'MOCK_ERROR',
      message: 'Erro simulado na API TOTVS (mock)',
      error_code: 'TOTVS_MOCK_ERROR_500',
    };
  }
}

/**
 * Obter histórico de integrações de um lead
 */
export async function GET(request: NextRequest) {
  try {
    const token =
      request.cookies.get('auth-token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      // Retornar todas as integrações
      const integracoes = await IntegracaoTOTVS.find()
        .sort({ createdAt: -1 })
        .limit(50)
        .lean();

      return NextResponse.json({ integracoes });
    } else {
      // Retornar integrações de um lead específico
      const integracoes = await IntegracaoTOTVS.find({ lead_id: leadId })
        .sort({ createdAt: -1 })
        .lean();

      return NextResponse.json({ integracoes });
    }
  } catch (error) {
    console.error('Erro ao buscar integrações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

