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
Parágrafo explicando:
- **CONTEXTO:** O motivo da alteração (o "Porquê").
- **IMPACTO:** O que muda na experiência do utilizador ou no sistema.

### 1.3 Detalhes Técnicos (Footer)
Lista detalhada de alterações específicas:
- Quais ficheiros foram criados/modificados.
- Lógica implementada (hooks, loops, cálculos).
- Componentes novos e props utilizadas.

## 2. Exemplo de Referência
```text
feat: adicionar animação de entrada na hero

CONTEXTO: Melhorar a primeira impressão do utilizador seguindo o conceito "Soft & Immersive".
IMPACTO: Os elementos da Hero entram agora de forma suave, guiando o olhar do utilizador.

- Importado 'motion' do Framer Motion em 'HomeHero.js'.
- Adicionadas variantes de animação 'fadeInUp' e 'staggerContainer'.
- Aplicado atraso (delay) de 0.5s para o título e 0.8s para o botão.
```

## 3. Fluxo de Branches
- **main:** Estável / Produção.
- **develop:** Integração diária.
- **feature/nome:** Desenvolvimento de tarefas individuais.
