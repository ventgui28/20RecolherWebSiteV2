# Mandato do Projeto: 20recolher

Este ficheiro serve como a "memória mestre" para o Gemini CLI.

## 🚨 INSTRUÇÃO OBRIGATÓRIA DE INÍCIO
Sempre que iniciares uma nova sessão neste projeto, deves:
1. **OBRIGATORIAMENTE** ler os ficheiros na pasta `.gemini/docs/` antes de sugerires ou limitares qualquer alteração.
2. **ESPERAR POR ORDEM EXPLÍCITA:** Após o protocolo de leitura e o `npm run sod`, deves parar e aguardar que o utilizador dê uma ordem direta para começar as tarefas. Nunca inicies a execução ou análise profunda de tarefas sem este "go-ahead".

### Documentos de Referência:
1. `.gemini/docs/ARCHITECTURAL_DECISIONS.md`: Porquê Next.js 15, Tailwind v4 e JS Vanilla.
2. `.gemini/docs/PROJECT_STATE.md`: O que já foi feito e onde estão os ficheiros.
3. `.gemini/docs/DIARIO_DE_PROJETO.md`: Registo histórico de conversas e execução técnica (Obrigatório).
4. `.gemini/docs/GIT_STRATEGY.md`: Regras de commits e branches.
5. `.gemini/docs/BACKLOG_ROADMAP.md`: O que falta fazer.

## 🔄 PROTOCOLO DE AUTO-UPDATE & GIT
O Gemini CLI tem a responsabilidade proativa de manter o estado do projeto e o histórico Git organizados:
1. **Commits Locais Proativos:** Deves fazer `git commit` localmente sempre que concluíres uma tarefa significativa ou um conjunto de alterações lógicas.
2. **Push Manual:** Nunca deves fazer `git push` para o GitHub sem ordem explícita do utilizador. O utilizador prefere controlar o envio para o servidor.
3. **Pós-Task:** Após concluir uma tarefa do Backlog, deves atualizar o `PROJECT_STATE.md`.
4. **Relatório Obrigatório:** Antes de terminar qualquer sessão ou mudar de chat, deves **OBRIGATORIAMENTE** atualizar o `.gemini/docs/DIARIO_DE_PROJETO.md` fundindo o contexto do chat com os commits realizados.
5. **Pós-Commit:** Após cada commit significativo, deves correr `npm run sync-state` para sincronizar o histórico de alterações.
6. **Pré-Reset/Handoff:** Se o utilizador pedir um reset ou terminar a sessão, deves atualizar o diário e depois correr `npm run handoff`.

## 🛠️ REGRAS DE OURO
- **Commits Locais Automáticos:** Deves realizar commits locais (`git commit`) imediatamente após concluir cada tarefa ou implementação funcional, sem esperar por instruções explícitas, para manter um histórico granular.
- **Não alteres a arquitetura modular** sem consultar o utilizador.
- **Não escrevas texto diretamente nas páginas**; usa `src/constants/`.
- **Mantém o estilo "Ambiental & Sólido"** com a paleta de verdes definida.
- **Commits atómicos** e seguindo o padrão `feat:`, `fix:`, etc.

---
Este projeto é um website institucional para a **20recolher** (Reciclagem Tecnológica).
