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
Deve conter obrigatoriamente dois blocos:
- **IMPACTO:** O que muda na experiência do utilizador ou no valor de negócio.
- **COMPONENTE TÉCNICA:** Explicação da escolha técnica, lógica de programação ou arquitetura utilizada (o "como").

### 1.3 Detalhes Específicos (Footer)
Lista técnica profunda de alterações específicas:
- Quais ficheiros foram criados/modificados.
- Detalhes de implementação atómica (hooks, bibliotecas, estados).

## 2. Exemplo de Referência
```text
feat: adicionar animação de entrada na hero

IMPACTO: Os elementos da Hero entram agora de forma suave, guiando o olhar do utilizador e reforçando a estética premium do site.

COMPONENTE TÉCNICA: Implementação baseada em Framer Motion usando variantes de animação para desacoplar a lógica de transição do componente JSX, garantindo performance via hardware acceleration.

- Importado 'motion' do Framer Motion em 'HomeHero.js'.
- Adicionadas variantes de animação 'fadeInUp' e 'staggerContainer'.
- Aplicado atraso (delay) de 0.5s para o título e 0.8s para o botão.
```

## 3. Fluxo de Branches
- **main:** Estável / Produção.
- **develop:** Integração diária.
- **feature/nome:** Desenvolvimento de tarefas individuais.
