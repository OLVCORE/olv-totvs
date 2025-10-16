import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { DiagnosticoFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: DiagnosticoFormData = await request.json();

    // Validar dados
    if (!body.step1?.setor || !body.step2?.porte || !body.step3?.modulos || 
        !body.step4?.dores || !body.step5) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Criar lead
    const lead = await Lead.create({
      nome: body.step5.nome,
      empresa: body.step5.empresa,
      setor: body.step1.setor,
      porte: body.step2.porte,
      modulos_interesse: body.step3.modulos,
      dores: body.step4.dores,
      contato: {
        email: body.step5.email,
        telefone: body.step5.telefone,
      },
      status: 'novo',
    });

    // TODO: Enviar email de notificação (opcional)
    // TODO: Integrar com CRM/webhook (futuro)

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
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Verificar autenticação (JWT) aqui
    // TODO: Implementar middleware de autenticação

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const setor = searchParams.get('setor');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: any = {};
    if (status) query.status = status;
    if (setor) query.setor = setor;

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const total = await Lead.countDocuments(query);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

