# Decisões de Arquitetura - 20recolher

Este documento regista as escolhas técnicas fundamentais do projeto e o seu racional.

## 1. Stack Tecnológica
- **Next.js 15 (App Router):** Escolhido por ser a versão mais estável e moderna, oferecendo Server Components e excelente SEO.
- **Tailwind CSS v4:** Utilizado para estilização rápida e moderna. Configurado via variáveis CSS no `globals.css` (novo padrão v4) em vez de um ficheiro `tailwind.config.js` externo.
- **JavaScript (Vanilla):** Opção do utilizador para manter a simplicidade inicial do projeto.

## 2. Organização do Código (Modular & Escalável)
- **Atomic Design Light:** Componentes divididos em:
  - `ui/`: Componentes pequenos e reutilizáveis (Button, Container, SectionHeading).
  - `layout/`: Componentes globais (Navbar, Footer).
  - `sections/`: Blocos de conteúdo específicos de cada página (Hero, ServiceGrid).
- **Separação de Dados:** Todos os textos, listas de serviços e contactos foram movidos para `src/constants/`. Isso permite que o código visual seja limpo e os dados fáceis de atualizar.

## 3. Estilo Visual
- **Paleta de Cores:** Focada em tons de verde (**sustentabilidade**) fornecidos pelo utilizador.
- **Layout:** Horizontal clássico para desktop, responsivo para mobile.
- **Componentes:** Cantos arredondados (`rounded-2xl`, `rounded-3xl`), sombras suaves e transições para um aspeto moderno e "clean".

## 4. Estratégia de Git
- **Conventional Commits:** Uso de prefixos como `feat:`, `fix:`, `chore:`.
- **Git Flow:** Branches `main` (produção) e `develop` (desenvolvimento).
