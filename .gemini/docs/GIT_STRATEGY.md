# Estratégia de Git - 20recolher (Pragmático Senior)

Instruções para manter um histórico de commits profissional, focado no racional técnico e na intenção da mudança, redigido em Português (Portugal).

## 1. Padrão de Commits (Obrigatório)
Cada commit deve seguir uma estrutura focada na intenção e na lógica, redigida integralmente em **Português (Portugal)**.

### 1.1 Título (Header)
`tipo: breve descrição técnica em PT-PT` (max 70 caracteres).
- `feat`: Novas funcionalidades ou alterações lógicas significativas.
- `fix`: Correção de bugs ou instabilidades.
- `perf`: Otimizações de carregamento, memória ou execução.
- `style`: Ajustes visuais, CSS e animações.
- `refactor`: Reestruturação de código sem alteração de comportamento.
- `docs`: Documentação técnica.

### 1.2 O "Porquê" (Rationale)
Um parágrafo curto que explica o **motivo** da mudança e o **racional técnico** por trás da solução em PT-PT. Deve responder à pergunta: "Porque é que isto foi feito desta maneira?".

### 1.3 Mudanças Lógicas (Bullets)
Lista de alterações de alto nível que descrevem a evolução da lógica ou arquitetura. 
- **Nota:** Nunca listar nomes de ficheiros aqui (o Git já os rastreia).

## 2. O que Evitar
- **Linguagem de Marketing:** Evitar termos como "premium", "incrível", "fantástico". Focar na sobriedade técnica.
- **Redundância:** Não repetir informações que o Git fornece automaticamente (como a lista de ficheiros alterados).
- **Descrições de Ação Básica:** Evitar descrever ações óbvias do código (ex: "adicionei um div", "mudei a cor"). Descrever a intenção (ex: "reestruturada hierarquia visual do cabeçalho").

## 3. Exemplo de Referência
```text
fix: estabilizar transições de eventos de vídeo na hero

A lógica de transição era propensa a loops infinitos durante o cross-fade porque os vídeos em saída continuavam a disparar atualizações de tempo. Foi implementado um bloqueio de estado robusto utilizando Refs para garantir que apenas o vídeo estritamente ativo pode atualizar o progresso global ou disparar a próxima transição.

- Implementado um bloqueio baseado em ref (isTransitioning) para ignorar eventos obsoletos.
- Sincronizada a verificação do índice ativo com activeIndexRef para validação em tempo real.
- Desacoplada a navegação automática do evento 'onEnded' para simplificar a gestão de estados.
```

## 4. Fluxo de Branches
- **main:** Estável / Produção.
- **develop:** Integração diária.
- **feature/nome:** Desenvolvimento de tarefas individuais.
