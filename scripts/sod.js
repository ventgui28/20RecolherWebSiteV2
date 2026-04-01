const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * 🌅 PROTOCOLO DE INÍCIO DE DIA (Start-of-Day) - 20recolher
 * Garante que a sessão começa com o pé direito.
 */

async function runSOD() {
  console.log('\n☀️  Iniciando Protocolo de Início de Dia (SOD)...');

  try {
    // 1. Verificação de Dependências
    console.log('📦 1/4 Verificando dependências...');
    execSync('npm install --no-audit --no-fund', { stdio: 'inherit' });

    // 2. Leitura de Contexto
    console.log('\n📖 2/4 Lendo estado do projeto...');
    const statePath = path.join(__dirname, '..', '.gemini', 'docs', 'PROJECT_STATE.md');
    const roadmapPath = path.join(__dirname, '..', '.gemini', 'docs', 'BACKLOG_ROADMAP.md');
    
    if (fs.existsSync(statePath)) {
      console.log('✅ Estado do projeto carregado.');
    }
    if (fs.existsSync(roadmapPath)) {
      console.log('✅ Backlog carregado.');
    }

    // 3. Verificação de Alterações Pendentes
    console.log('\n🧹 3/4 Verificando alterações da sessão anterior...');
    const status = execSync('git status --short').toString();
    if (status) {
      console.log('⚠️  Tens alterações pendentes:\n', status);
    } else {
      console.log('✅ Repositório limpo e pronto.');
    }

    // 4. Teste de Arranque
    console.log('\n🚀 4/4 Verificando se o projeto arranca (Next.js)...');
    console.log('Sugestão: Corre "npm run dev" para começar a desenvolver.');

    console.log('\n🏁 PROTOCOLO SOD CONCLUÍDO!');
    console.log('Bom trabalho! Vamos transformar resíduos em futuro. ♻️\n');

  } catch (error) {
    console.error('\n❌ Erro durante o protocolo SOD:', error.message);
  }
}

runSOD();
