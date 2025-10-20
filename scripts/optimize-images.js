/**
 * 🖼️ IMAGE OPTIMIZATION SCRIPT
 * 
 * Script para otimizar imagens do projeto.
 * Reduz tamanho de arquivos mantendo qualidade.
 * 
 * USO:
 * node scripts/optimize-images.js
 * 
 * REQUISITOS:
 * npm install --save-dev sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ==========================================
// CONFIGURAÇÕES
// ==========================================

const CONFIG = {
  // Diretórios para otimizar
  directories: [
    'public/images/avatars',
    'public/images/blog',
    'public/images/depoimentos',
    'public/images/setores',
    'public/images/solucoes',
  ],
  
  // Extensões suportadas
  extensions: ['.jpg', '.jpeg', '.png', '.webp'],
  
  // Qualidade JPEG (0-100)
  jpegQuality: 80,
  
  // Qualidade PNG (0-9, 6 é bom balanço)
  pngQuality: 8,
  
  // Qualidade WebP (0-100)
  webpQuality: 80,
  
  // Largura máxima (null = manter original)
  maxWidth: 1920,
  
  // Altura máxima (null = manter original)
  maxHeight: null,
  
  // Criar backup antes de otimizar
  createBackup: true,
  
  // Sufixo para arquivos de backup
  backupSuffix: '.original',
};

// ==========================================
// ESTATÍSTICAS
// ==========================================

const stats = {
  totalFiles: 0,
  processedFiles: 0,
  skippedFiles: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0,
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Formatar bytes para formato legível
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Obter tamanho do arquivo
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Verificar se arquivo já está otimizado
 */
function isAlreadyOptimized(filePath) {
  const backupPath = filePath + CONFIG.backupSuffix;
  return fs.existsSync(backupPath);
}

// ==========================================
// OTIMIZAÇÃO
// ==========================================

/**
 * Otimizar uma imagem
 */
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    
    // Verificar se é uma extensão suportada
    if (!CONFIG.extensions.includes(ext)) {
      return { success: false, reason: 'Extension not supported' };
    }
    
    // Verificar se já está otimizado
    if (isAlreadyOptimized(filePath)) {
      console.log(`⏭️  Já otimizado: ${filePath}`);
      stats.skippedFiles++;
      return { success: false, reason: 'Already optimized' };
    }
    
    // Obter tamanho original
    const originalSize = getFileSize(filePath);
    stats.originalSize += originalSize;
    
    // Criar backup se configurado
    if (CONFIG.createBackup) {
      const backupPath = filePath + CONFIG.backupSuffix;
      fs.copyFileSync(filePath, backupPath);
    }
    
    // Processar imagem com Sharp
    let sharpInstance = sharp(filePath);
    
    // Obter metadata
    const metadata = await sharpInstance.metadata();
    
    // Redimensionar se necessário
    if (CONFIG.maxWidth || CONFIG.maxHeight) {
      sharpInstance = sharpInstance.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Otimizar baseado no formato
    if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({
        quality: CONFIG.jpegQuality,
        progressive: true,
        mozjpeg: true,
      });
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({
        quality: CONFIG.pngQuality * 10,
        compressionLevel: 9,
        palette: true,
      });
    } else if (ext === '.webp') {
      sharpInstance = sharpInstance.webp({
        quality: CONFIG.webpQuality,
      });
    }
    
    // Salvar arquivo otimizado
    await sharpInstance.toFile(filePath + '.tmp');
    
    // Substituir original
    fs.renameSync(filePath + '.tmp', filePath);
    
    // Obter novo tamanho
    const optimizedSize = getFileSize(filePath);
    stats.optimizedSize += optimizedSize;
    
    // Calcular redução
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(
      `✅ ${path.basename(filePath)}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${reduction}% redução)`
    );
    
    stats.processedFiles++;
    return { success: true };
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${filePath}:`, error.message);
    stats.errors++;
    
    // Restaurar backup se houver erro
    if (CONFIG.createBackup) {
      const backupPath = filePath + CONFIG.backupSuffix;
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, filePath);
        fs.unlinkSync(backupPath);
      }
    }
    
    return { success: false, reason: error.message };
  }
}

/**
 * Processar diretório recursivamente
 */
async function processDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.warn(`⚠️  Diretório não existe: ${dirPath}`);
      return;
    }
    
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Processar subdiretório
        await processDirectory(filePath);
      } else if (stat.isFile()) {
        // Processar arquivo
        const ext = path.extname(file).toLowerCase();
        
        // Ignorar backups
        if (file.endsWith(CONFIG.backupSuffix)) {
          continue;
        }
        
        if (CONFIG.extensions.includes(ext)) {
          stats.totalFiles++;
          await optimizeImage(filePath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Erro ao processar diretório ${dirPath}:`, error.message);
  }
}

// ==========================================
// MAIN
// ==========================================

async function main() {
  console.log('🖼️  IMAGE OPTIMIZATION SCRIPT\n');
  console.log('Configurações:');
  console.log(`  - Qualidade JPEG: ${CONFIG.jpegQuality}`);
  console.log(`  - Qualidade PNG: ${CONFIG.pngQuality}`);
  console.log(`  - Largura máxima: ${CONFIG.maxWidth || 'original'}`);
  console.log(`  - Backup: ${CONFIG.createBackup ? 'Sim' : 'Não'}`);
  console.log('\n');
  
  // Verificar se Sharp está instalado
  try {
    require.resolve('sharp');
  } catch (error) {
    console.error('❌ Sharp não está instalado!');
    console.error('Execute: npm install --save-dev sharp');
    process.exit(1);
  }
  
  // Processar cada diretório
  for (const dir of CONFIG.directories) {
    console.log(`📁 Processando: ${dir}\n`);
    await processDirectory(dir);
    console.log('\n');
  }
  
  // Mostrar estatísticas
  console.log('📊 ESTATÍSTICAS FINAIS\n');
  console.log(`Total de arquivos: ${stats.totalFiles}`);
  console.log(`Processados: ${stats.processedFiles}`);
  console.log(`Pulados: ${stats.skippedFiles}`);
  console.log(`Erros: ${stats.errors}`);
  console.log('');
  console.log(`Tamanho original: ${formatBytes(stats.originalSize)}`);
  console.log(`Tamanho otimizado: ${formatBytes(stats.optimizedSize)}`);
  
  if (stats.originalSize > 0) {
    const totalReduction = ((stats.originalSize - stats.optimizedSize) / stats.originalSize * 100).toFixed(2);
    const spaceSaved = stats.originalSize - stats.optimizedSize;
    console.log(`Redução total: ${totalReduction}%`);
    console.log(`Espaço economizado: ${formatBytes(spaceSaved)}`);
  }
  
  console.log('\n✅ Otimização concluída!');
  
  if (CONFIG.createBackup) {
    console.log('\n💡 Para remover backups (.original):');
    console.log('   find public/images -name "*.original" -delete');
  }
}

// Executar
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
}

module.exports = { optimizeImage, processDirectory };

