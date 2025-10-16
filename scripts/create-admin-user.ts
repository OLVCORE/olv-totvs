/**
 * Script para criar usuário administrador
 * Executar: npx ts-node scripts/create-admin-user.ts
 */

import mongoose from 'mongoose';
import { hashPassword } from '../lib/auth';
import User from '../models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/olv-totvs';

async function createAdminUser() {
  try {
    console.log('Conectando ao MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Verificar se já existe usuário admin
    const existingAdmin = await User.findOne({ email: 'admin@olv.com' });

    if (existingAdmin) {
      console.log('⚠️  Usuário admin já existe');
      process.exit(0);
    }

    // Criar usuário admin
    const hashedPassword = await hashPassword('admin123');

    const admin = await User.create({
      email: 'admin@olv.com',
      nome: 'Administrador',
      password: hashedPassword,
      role: 'super_admin',
      ativo: true,
    });

    console.log('✅ Usuário administrador criado com sucesso!');
    console.log('📧 Email: admin@olv.com');
    console.log('🔑 Senha: admin123');
    console.log('');
    console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro acesso!');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    process.exit(1);
  }
}

createAdminUser();

