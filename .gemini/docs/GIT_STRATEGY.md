# Estratégia de Git - 20recolher (Ultra-Detalhado)

Instruções sobre como manter o repositório organizado com descrições ricas.

## 1. Padrão de Commits (Obrigatório)
Cada commit deve seguir uma estrutura tripartida para garantir rastreabilidade total:

### 1.1 Título (Header)
`tipo: breve descrição em português` (max 70 caracteres).
- `feat`: Novas funcionalidades.
- `fix`: Correção de bugs.
- `perf`: Melhorias de performance (ex: otimização de assets).
- `style`: Design, CSS, animações.
- `refactor`: Limpeza ou reestruturação de código.
- `docs`: Documentação.

### 1.2 Corpo (Body)
O corpo do commit deve ser estruturado nestes três tópicos obrigatórios:

- **FICHEIROS ALTERADOS:** Listagem clara dos ficheiros que sofreram modificações.
- **ALTERAÇÕES REALIZADAS:** Descrição detalhada do código alterado, incluindo a **Componente Técnica** (lógica, bibliotecas, algoritmos utilizados).
- **IMPACTO:** O resultado final da alteração para o utilizador ou para a performance do sistema.

## 2. Exemplo de Referência
```text
feat: otimizar transição de vídeo na hero

FICHEIROS ALTERADOS: 
- src/components/sections/HomeHero.js

ALTERAÇÕES REALIZADAS:
Implementado um sistema de bloqueio de eventos via 'Refs' para ignorar vídeos em animação de saída. Reduzida a duração da transição para 0.8s e removido o 'mode=wait' para permitir cross-fade imediato.

IMPACTO:
A troca de vídeos na Hero tornou-se instantânea e imune a loops infinitos, melhorando a fluidez da navegação manual.
```

## 3. Fluxo de Branches
- **main:** Estável / Produção.
- **develop:** Integração diária.
- **feature/nome:** Desenvolvimento de tarefas individuais.
