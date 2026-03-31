const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Script para Sincronização de Estado do Projeto
 * Este script ajuda o Gemini CLI a manter a documentação de estado atualizada.
 */

try {
  console.log('🔄 Sincronizando estado do projeto com o Git...');

  // 1. Obter os últimos 5 commits
  const lastCommits = execSync('git log -n 5 --oneline').toString();
  
  // 2. Obter ficheiros alterados recentemente
  const changedFiles = execSync('git diff --name-only HEAD~1 HEAD').toString();

  const statePath = path.join(__dirname, '..', '.gemini', 'docs', 'PROJECT_STATE.md');
  
  if (fs.existsSync(statePath)) {
    let content = fs.readFileSync(statePath, 'utf8');
    
    // Atualizar a secção de histórico ou logs se necessário
    const timestamp = new Date().toLocaleString('pt-PT');
    const updateLog = `\n\n### Última Sincronização: ${timestamp}\n**Alterações Recentes (Git):**\n\`\`\`\n${lastCommits}\`\`\``;
    
    // Adicionar log ao final do ficheiro para histórico
    fs.appendFileSync(statePath, updateLog);
    
    console.log('✅ PROJECT_STATE.md atualizado com sucesso!');
  } else {
    console.error('❌ Ficheiro PROJECT_STATE.md não encontrado.');
  }

} catch (error) {
  console.error('❌ Erro ao sincronizar estado:', error.message);
}
