# Estratégia de Git - 20recolher

Instruções sobre como manter o repositório organizado.

## 1. Padrão de Commits
- **Conventional Commits:** Seguir sempre o padrão `tipo: mensagem` (em Inglês).
  - `feat`: Novas funcionalidades.
  - `fix`: Correção de bugs.
  - `docs`: Documentação (README, Wiki).
  - `style`: Estilo visual, CSS, formatação (sem impacto na lógica).
  - `refactor`: Alteração no código sem mudar o comportamento.
  - `chore`: Tarefas de manutenção (ex: `npm install`).

## 2. Fluxo de Branches
- **main:** Branch protegida para produção.
- **develop:** Branch de integração para novas funcionalidades.
- **feature/nome-tarefa:** Branches temporárias para desenvolvimento de novas tarefas (e.g. `feature/contact-form`).

## 3. Pull Requests
- Todas as alterações na `main` ou `develop` devem ser feitas através de PR.
- Descrição clara do que foi alterado e porquê.
