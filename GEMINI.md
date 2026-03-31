# Mandato do Projeto: 20recolher

Este ficheiro serve como a "memória mestre" para o Gemini CLI.

## 🚨 INSTRUÇÃO OBRIGATÓRIA DE INÍCIO
Sempre que iniciares uma nova sessão neste projeto, deves **OBRIGATORIAMENTE** ler os ficheiros na pasta `.gemini/docs/` antes de sugerires ou limitares qualquer alteração.

### Documentos de Referência:
1. `.gemini/docs/ARCHITECTURAL_DECISIONS.md`: Porquê Next.js 15, Tailwind v4 e JS Vanilla.
2. `.gemini/docs/PROJECT_STATE.md`: O que já foi feito e onde estão os ficheiros.
3. `.gemini/docs/GIT_STRATEGY.md`: Regras de commits e branches.
4. `.gemini/docs/BACKLOG_ROADMAP.md`: O que falta fazer.

## 🔄 PROTOCOLO DE AUTO-UPDATE (AUTOMÁTICO)
O Gemini CLI tem a responsabilidade proativa de manter o estado do projeto atualizado:
1. **Pós-Task:** Após concluir uma tarefa do Backlog, deves atualizar o `PROJECT_STATE.md`.
2. **Pós-Commit:** Após cada commit significativo, deves correr `npm run sync-state` para sincronizar o histórico de alterações.
3. **Pré-Reset:** Se o utilizador pedir um reset ou terminar a sessão, deves correr `npm run handoff`.

## 🛠️ REGRAS DE OURO
- **Não alteres a arquitetura modular** sem consultar o utilizador.
- **Não escrevas texto diretamente nas páginas**; usa `src/constants/`.
- **Mantém o estilo "Ambiental & Sólido"** com a paleta de verdes definida.
- **Commits atómicos** e seguindo o padrão `feat:`, `fix:`, etc.

---
Este projeto é um website institucional para a **20recolher** (Reciclagem Tecnológica).
