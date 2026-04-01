# Estratégia de Git - 20recolher (Pragmático Senior)

Instruções para manter um histórico de commits profissional, focado no racional técnico e na intenção da mudança.

## 1. Padrão de Commits (Obrigatório)
Cada commit deve seguir uma estrutura focada na intenção e na lógica, evitando descrições superficiais ou redundantes.

### 1.1 Título (Header)
`tipo: breve descrição técnica` (max 70 caracteres).
- `feat`: Novas funcionalidades ou alterações lógicas significativas.
- `fix`: Correção de bugs ou instabilidades.
- `perf`: Otimizações de carregamento, memória ou execução.
- `style`: Ajustes visuais, CSS e animações.
- `refactor`: Reestruturação de código sem alteração de comportamento.
- `docs`: Documentação técnica.

### 1.2 O "Porquê" (Rationale)
Um parágrafo curto que explica o **motivo** da mudança e o **racional técnico** por trás da solução. Deve responder à pergunta: "Porque é que isto foi feito desta maneira?".

### 1.3 Mudanças Lógicas (Bullets)
Lista de alterações de alto nível que descrevem a evolução da lógica ou arquitetura. 
- **Nota:** Nunca listar nomes de ficheiros aqui (o Git já os rastreia).

## 2. O que Evitar
- **Linguagem de Marketing:** Evitar termos como "premium", "incrível", "fantástico". Focar na sobriedade técnica.
- **Redundância:** Não repetir informações que o Git fornece automaticamente (como a lista de ficheiros alterados).
- **Descrições de Ação Básica:** Evitar descrever ações óbvias do código (ex: "adicionei um div", "mudei a cor"). Descrever a intenção (ex: "reestruturada hierarquia visual do cabeçalho").

## 3. Exemplo de Referência
```text
fix: stabilize hero video event transitions

The transition logic was prone to infinite loops during cross-fade because exiting videos continued to trigger time updates. Implemented a robust state lock using Refs to ensure only the strictly active video can update global progress or trigger the next transition.

- Implemented a ref-based lock (isTransitioning) to ignore stale events.
- Synchronized active index tracking with activeIndexRef for real-time validation.
- Decoupled automatic navigation from the video 'onEnded' event to simplify state management.
```

## 4. Fluxo de Branches
- **main:** Estável / Produção.
- **develop:** Integração diária.
- **feature/nome:** Desenvolvimento de tarefas individuais.
