const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Script para Sincronização de Estado do Projeto (v2)
 * Mantém o PROJECT_STATE.md atualizado e limpo.
 */

try {
  console.log('🔄 Sincronizando estado do projeto...');

  const statePath = path.join(__dirname, '..', '.gemini', 'docs', 'PROJECT_STATE.md');
  
  if (!fs.existsSync(statePath)) {
    console.error('❌ PROJECT_STATE.md não encontrado.');
    process.exit(1);
  }

  let content = fs.readFileSync(statePath, 'utf8');
  const timestamp = new Date().toLocaleString('pt-PT');

  // 1. Atualizar a data no topo (Registo do progresso atual e ficheiros criados até à data de...)
  const dateRegex = /até à data de \d{2}\/\d{2}\/\d{4}/;
  const today = new Date().toLocaleDateString('pt-PT');
  content = content.replace(dateRegex, `até à data de ${today}`);

  // 2. Obter logs do Git
  const lastCommits = execSync('git log -n 5 --oneline').toString().trim();
  
  // 3. Gerir secção de Sincronização (manter apenas as últimas 3)
  const syncSectionHeader = '### Histórico de Sincronização';
  const newSyncEntry = `\n#### Sincronização: ${timestamp}\n**Commits:**\n\`\`\`\n${lastCommits}\n\`\`\`\n`;

  if (!content.includes(syncSectionHeader)) {
    content += `\n\n${syncSectionHeader}\n${newSyncEntry}`;
  } else {
    // Dividir o conteúdo e manter apenas as últimas entradas
    const parts = content.split(syncSectionHeader);
    const history = parts[1].split('#### Sincronização:').filter(Boolean).slice(0, 2); // Mantém 2 anteriores
    content = parts[0] + syncSectionHeader + newSyncEntry + history.map(h => '#### Sincronização:' + h).join('');
  }

  fs.writeFileSync(statePath, content);
  console.log('✅ PROJECT_STATE.md atualizado e limpo!');

} catch (error) {
  console.error('❌ Erro ao sincronizar estado:', error.message);
}
