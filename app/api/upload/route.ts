import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

// ==========================================
// CONFIGURAÇÕES DE UPLOAD
// ==========================================

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/zip',
  'application/x-rar-compressed',
];

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}_${random}.${extension}`;
}

function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `Arquivo muito grande. Máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB` };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Tipo de arquivo não permitido' };
  }

  return { valid: true };
}

// ==========================================
// API ROUTE
// ==========================================

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDir();

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: 'Máximo de 5 arquivos permitidos' },
        { status: 400 }
      );
    }

    const uploadedFiles: Array<{
      originalName: string;
      fileName: string;
      size: number;
      type: string;
      url: string;
    }> = [];

    for (const file of files) {
      const validation = validateFile(file);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }

      const fileName = generateUniqueFileName(file.name);
      const filePath = join(UPLOAD_DIR, fileName);
      
      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      uploadedFiles.push({
        originalName: file.name,
        fileName,
        size: file.size,
        type: file.type,
        url: `/uploads/${fileName}`,
      });
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `${uploadedFiles.length} arquivo(s) enviado(s) com sucesso`,
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// ==========================================
// LIMPEZA DE ARQUIVOS ANTIGOS (OPCIONAL)
// ==========================================

export async function DELETE(request: NextRequest) {
  try {
    const { fileName } = await request.json();
    
    if (!fileName) {
      return NextResponse.json(
        { error: 'Nome do arquivo não fornecido' },
        { status: 400 }
      );
    }

    const filePath = join(UPLOAD_DIR, fileName);
    
    if (existsSync(filePath)) {
      await writeFile(filePath, ''); // Limpar arquivo
      return NextResponse.json({
        success: true,
        message: 'Arquivo removido com sucesso',
      });
    }

    return NextResponse.json(
      { error: 'Arquivo não encontrado' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Erro ao remover arquivo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
