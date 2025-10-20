const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * 🖼️ OTIMIZADOR DE IMAGENS
 * 
 * Script para otimizar imagens automaticamente.
 * Reduz tamanho mantendo qualidade visual.
 */

// Configurações
const CONFIG = {
  inputDir: './public/images',
  outputDir: './public/images-optimized',
  quality: {
    jpeg: 85,
    png: 90,
    webp: 80,
  },
  sizes: [
    { suffix: '-sm', width: 400 },
    { suffix: '-md', width: 800 },
    { suffix: '-lg', width: 1200 },
    { suffix: '-xl', width: 1920 },
  ],
  formats: ['jpeg', 'png', 'webp'],
};

// Estatísticas
let stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0,
};

/**
 * Converte bytes para formato legível
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Obtém tamanho do arquivo
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch (error) {
    return 0;
  }
}

/**
 * Verifica se arquivo é uma imagem
 */
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'].includes(ext);
}

/**
 * Otimiza uma imagem
 */
async function optimizeImage(inputPath, outputPath, format = 'jpeg') {
  try {
    const inputBuffer = fs.readFileSync(inputPath);
    const originalSize = inputBuffer.length;
    
    let sharpInstance = sharp(inputBuffer);
    
    // Configurar qualidade baseada no formato
    const quality = CONFIG.quality[format] || 85;
    
    switch (format) {
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg({ quality, progressive: true });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ quality, compressionLevel: 9 });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality });
        break;
    }
    
    const outputBuffer = await sharpInstance.toBuffer();
    const optimizedSize = outputBuffer.length;
    
    // Escrever arquivo otimizado
    fs.writeFileSync(outputPath, outputBuffer);
    
    stats.processed++;
    stats.originalSize += originalSize;
    stats.optimizedSize += optimizedSize;
    
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% economia)`);
    
    return true;
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${inputPath}:`, error.message);
    stats.errors++;
    return false;
  }
}

/**
 * Gera diferentes tamanhos de uma imagem
 */
async function generateSizes(inputPath, baseOutputPath) {
  const inputBuffer = fs.readFileSync(inputPath);
  
  for (const size of CONFIG.sizes) {
    try {
      const outputPath = baseOutputPath.replace(/(\.[^.]+)$/, `${size.suffix}$1`);
      
      const resizedBuffer = await sharp(inputBuffer)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .jpeg({ quality: CONFIG.quality.jpeg, progressive: true })
        .toBuffer();
      
      fs.writeFileSync(outputPath, resizedBuffer);
      
      console.log(`📏 ${path.basename(inputPath)} → ${path.basename(outputPath)} (${size.width}px)`);
    } catch (error) {
      console.error(`❌ Erro ao redimensionar ${inputPath}:`, error.message);
    }
  }
}

/**
 * Processa um arquivo de imagem
 */
async function processImageFile(inputPath, relativePath) {
  const filename = path.basename(inputPath);
  const ext = path.extname(filename).toLowerCase();
  const nameWithoutExt = path.basename(filename, ext);
  
  // Criar diretório de saída
  const outputDir = path.join(CONFIG.outputDir, path.dirname(relativePath));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Processar em diferentes formatos
  for (const format of CONFIG.formats) {
    const outputPath = path.join(outputDir, `${nameWithoutExt}.${format}`);
    
    if (format === 'jpeg' && ['.jpg', '.jpeg'].includes(ext)) {
      // Otimizar JPEG original
      await optimizeImage(inputPath, outputPath, 'jpeg');
      
      // Gerar diferentes tamanhos
      await generateSizes(inputPath, outputPath);
    } else if (format === 'png' && ext === '.png') {
      // Otimizar PNG original
      await optimizeImage(inputPath, outputPath, 'png');
    } else if (format === 'webp') {
      // Converter para WebP
      await optimizeImage(inputPath, outputPath, 'webp');
    }
  }
}

/**
 * Processa diretório recursivamente
 */
async function processDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const itemRelativePath = path.join(relativePath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Processar subdiretório
      await processDirectory(itemPath, itemRelativePath);
    } else if (stat.isFile() && isImageFile(item)) {
      // Processar arquivo de imagem
      await processImageFile(itemPath, itemRelativePath);
    } else {
      // Copiar arquivo não-imagem
      const outputPath = path.join(CONFIG.outputDir, itemRelativePath);
      const outputDir = path.dirname(outputPath);
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      fs.copyFileSync(itemPath, outputPath);
      stats.skipped++;
    }
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🖼️ Iniciando otimização de imagens...\n');
  
  // Verificar se diretório de entrada existe
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`❌ Diretório de entrada não encontrado: ${CONFIG.inputDir}`);
    process.exit(1);
  }
  
  // Criar diretório de saída
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Processar imagens
  await processDirectory(CONFIG.inputDir);
  
  // Mostrar estatísticas finais
  console.log('\n📊 Estatísticas finais:');
  console.log(`✅ Imagens processadas: ${stats.processed}`);
  console.log(`⏭️ Arquivos ignorados: ${stats.skipped}`);
  console.log(`❌ Erros: ${stats.errors}`);
  console.log(`📦 Tamanho original: ${formatBytes(stats.originalSize)}`);
  console.log(`📦 Tamanho otimizado: ${formatBytes(stats.optimizedSize)}`);
  
  if (stats.originalSize > 0) {
    const totalSavings = ((stats.originalSize - stats.optimizedSize) / stats.originalSize * 100).toFixed(1);
    console.log(`💰 Economia total: ${formatBytes(stats.originalSize - stats.optimizedSize)} (${totalSavings}%)`);
  }
  
  console.log(`\n🎉 Otimização concluída! Arquivos salvos em: ${CONFIG.outputDir}`);
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, generateSizes, processDirectory };
