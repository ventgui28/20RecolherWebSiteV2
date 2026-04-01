const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

// Configurações
const VIDEO_DIR = path.join(process.cwd(), 'public', 'videos');
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');
const VIDEO_BITRATE = '2M'; // Reduzir bitrate (2 Megabits/s é excelente para fundo de vídeo)
const IMAGE_QUALITY = 80;   // Qualidade WebP 80% (quase imperceptível)
const MAX_IMAGE_WIDTH = 1920; // 1080p ou largura máxima para o site

// Caminho direto para o ffmpeg instalado via winget para evitar erros de PATH
const FFMPEG_PATH = `"C:\\Users\\ventg\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1-full_build\\bin\\ffmpeg.exe"`;

/**
 * Otimiza vídeos usando FFmpeg
 * - Remove áudio (videos de fundo não precisam)
 * - Reduz bitrate
 * - Mantém resolução 1080p
 */
function optimizeVideos() {
  console.log('\n--- Otimizando Vídeos ---');
  if (!fs.existsSync(VIDEO_DIR)) return;

  const videos = fs.readdirSync(VIDEO_DIR).filter(file => file.endsWith('.mp4'));

  videos.forEach(video => {
    const inputPath = path.join(VIDEO_DIR, video);
    const outputPath = path.join(VIDEO_DIR, `optimized-${video}`);
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`\nProcessando: ${video} (${sizeMB} MB)`);
    
    try {
      // ffmpeg -i input -vcodec libx264 -crf 28 -preset fast -an output.mp4
      // -an: remove áudio
      // -b:v: define bitrate
      // -crf: fator de compressão (23-28 é bom)
      execSync(`${FFMPEG_PATH} -i "${inputPath}" -vcodec libx264 -crf 26 -preset slow -an -y "${outputPath}"`, { stdio: 'inherit' });
      
      const newStats = fs.statSync(outputPath);
      const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);
      
      console.log(`Resultado: ${newSizeMB} MB (Redução de ${reduction}%)`);
      
      // Substituir original pelo otimizado
      fs.unlinkSync(inputPath);
      fs.renameSync(outputPath, inputPath);
    } catch (error) {
      console.error(`Erro ao processar ${video}:`, error.message);
    }
  });
}

/**
 * Otimiza imagens usando Sharp
 * - Converte para WebP (muito mais leve)
 * - Redimensiona se for maior que MAX_IMAGE_WIDTH
 */
async function optimizeImages() {
  console.log('\n--- Otimizando Imagens ---');
  if (!fs.existsSync(IMAGE_DIR)) return;

  const images = fs.readdirSync(IMAGE_DIR).filter(file => 
    file.match(/\.(jpg|jpeg|png)$/i)
  );

  for (const img of images) {
    const inputPath = path.join(IMAGE_DIR, img);
    const fileName = path.parse(img).name;
    const outputPath = path.join(IMAGE_DIR, `${fileName}.webp`);
    
    const stats = fs.statSync(inputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);

    console.log(`\nProcessando: ${img} (${sizeKB} KB)`);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width > MAX_IMAGE_WIDTH) {
        pipeline = pipeline.resize(MAX_IMAGE_WIDTH);
      }

      await pipeline
        .webp({ quality: IMAGE_QUALITY })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSizeKB = (newStats.size / 1024).toFixed(1);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

      console.log(`Resultado: ${newSizeKB} KB (Redução de ${reduction}%) em formato WebP`);
      
      // OPCIONAL: Se quiseres manter os nomes originais em JPG para não quebrar links,
      // podemos converter WebP de volta para JPG otimizado ou apenas atualizar o código.
      // Vou atualizar o código para WebP pois é a melhor prática Next.js.
      
      // Remover original se for muito pesado
      if (stats.size > 500 * 1024) { // > 500KB
         console.log(`Limpando original pesado: ${img}`);
         // fs.unlinkSync(inputPath); // Comenta isto se quiseres manter os originais por precaução
      }

    } catch (error) {
      console.error(`Erro ao processar ${img}:`, error.message);
    }
  }
}

async function run() {
  optimizeVideos();
  await optimizeImages();
  console.log('\n--- Otimização Concluída ---');
}

run();
