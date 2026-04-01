const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * 🌙 PROTOCOLO DE FIM DE DIA (End-of-Day) - 20recolher
 * Este script encerra a jornada de trabalho, garantindo estabilidade e continuidade.
 */

async function runEOD() {
  console.log('\n🌟 Iniciando Protocolo de Fim de Dia (EOD)...');

  try {
    // 1. Verificação de Estabilidade (Lint)
    console.log('🧪 1/4 Verificando estabilidade do código (Lint)...');
    try {
      execSync('npm run lint', { stdio: 'inherit' });
      console.log('✅ Código estável e limpo!');
    } catch (e) {
      console.warn('⚠️  Atenção: O projeto tem avisos de lint pendentes.');
    }

    // 2. Sincronização de Estado
    console.log('\n🔄 2/4 Sincronizando estado do projeto...');
    execSync('npm run sync-state', { stdio: 'inherit' });

    // 3. Resumo de Produtividade do Dia
    console.log('\n📝 3/4 Gerando resumo do dia...');
    const todayLog = execSync('git log --since="6am" --oneline').toString();
    
    if (todayLog) {
      console.log('--- Resumo de Commits (Hoje) ---');
      console.log(todayLog);
    } else {
      console.log('ℹ️  Nenhum commit realizado hoje.');
    }

    // 4. Limpeza de Git
    console.log('\n🧹 4/4 Verificando ficheiros não commitados...');
    const status = execSync('git status --short').toString();
    if (status) {
      console.warn('⚠️  Tens as seguintes alterações não commitadas:\n', status);
      console.log('Recomenda-se realizar o commit antes de encerrar o dia.');
    } else {
      console.log('✅ Git está limpo!');
    }

    console.log('\n🏁 PROTOCOLO EOD CONCLUÍDO!');
    console.log('🚀 Sugestão: Define agora o "Foco de Amanhã" no BACKLOG_ROADMAP.md.');
    console.log('Boa descanso! Até amanhã. 👋\n');

  } catch (error) {
    console.error('\n❌ Erro durante o protocolo EOD:', error.message);
  }
}

runEOD();
