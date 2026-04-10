# Estado Atual do Projeto - 20recolher

Registo do progresso atual e ficheiros criados até à data de 10/04/2026.

## 1. Funcionalidades Concluídas
- [x] **Setup do Projeto:** Next.js 15, Tailwind v4 e estrutura de pastas.
- [x] **Organização Modular:** Criação de componentes UI Atómicos (`Button`, `Container`, `SectionHeading`).
- [x] **Central de Dados:** Constantes criadas para a marca, serviços e contactos (`src/constants/`).
- [x] **Páginas Implementadas:**
  - `Home`: [CONCLUÍDA] 100% otimizada e com imagens locais.
  - `Sobre Nós`: [CONCLUÍDA] Com dados históricos reais e design institucional sólido.
  - `Serviços`: [CONCLUÍDA] Design imersivo com fotografia em alta fidelidade, glassmorphism e micro-interações de parallax.
  - `Contactos`: Info, mapa e formulário.
  - `Notícias`: [CONCLUÍDA] Sistema de listagem com pesquisa, categorias e Paginação.
  - `404`: Página de erro personalizada com design premium.
- [x] **Git:** Branch única `main` consolidada com histórico limpo.

## 2. Estrutura de Pastas Atual
- `src/app/`: Páginas e layouts.
- `src/components/ui/`: Botões, containers e títulos.
- `src/components/layout/`: Navbar e Footer.
- `src/components/sections/`: Blocos modulares (ex: HomeHero, ProcessTimeline, NoticiasGrid).
- `src/constants/`: Ficheiros de dados dinâmicos (brand, services, stats, process, news).
- `src/lib/`: Utilidade `cn()` para classes CSS e clientes Supabase.

## 3. Comandos Importantes
- `npm run dev`: Inicia o servidor local.
- `git status`: Verifica alterações.


### Última Sincronização: 10/04/2026, 11:30:00
**Alterações Recentes (Git):**
```
6b31e7a style: overhaul na interface de filtros e pesquisa de notícias
44556b4 feat: implementar scroll automático na paginação
5f20b9c style: otimizar interface de paginação com truncagem
541b9d7 feat: implementar sistema de paginação na grelha de notícias
```

### Histórico de Sincronização
#### Sincronização: 10/04/2026, 13:02:39
**Commits:**
```
2e4ecc8 style: suavizar aparicao do marcador com Framer Motion
fd61438 style: aumentar zoom final da animacao para 17
7ab8444 feat: diferir a aparicao do marcador ate ao fim do zoom
618eefa feat: disparar animacao de zoom do mapa apenas via scroll
50b393f feat: implementar animacao de zoom-in imersiva no mapa
```
#### Sincronização:
#### Sincronização: 10/04/2026, 13:02:27
**Commits:**
```
2e4ecc8 style: suavizar aparicao do marcador com Framer Motion
fd61438 style: aumentar zoom final da animacao para 17
7ab8444 feat: diferir a aparicao do marcador ate ao fim do zoom
618eefa feat: disparar animacao de zoom do mapa apenas via scroll
50b393f feat: implementar animacao de zoom-in imersiva no mapa
```
