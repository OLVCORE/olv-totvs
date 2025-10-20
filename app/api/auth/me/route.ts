import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Obter token do cookie ou header
    const token =
      request.cookies.get('auth-token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Buscar usuário
    const user = await User.findById(decoded.userId).select('-password').lean();

    if (!user || !user.ativo) {
      return NextResponse.json(
        { error: 'Usuário não encontrado ou inativo' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        nome: user.nome,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

