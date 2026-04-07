# 📔 Diário de Projeto - 20recolher

Registo histórico das conversas, decisões e implementação técnica do website da 20recolher. Este documento funde a intenção do utilizador com a execução técnica para garantir o controlo total do progresso.

---

## 📅 TERÇA-FEIRA, 7 DE ABRIL DE 2026 (Refinamento Visual "Premium Editorial" - Notícias)
### 💬 O que conversámos (Intenção)
A sessão de hoje focou-se em elevar a estética da área de Notícias para um padrão de revista digital premium. A intenção era passar de uma grelha simples para um layout editorial dinâmico, onde a notícia mais recente tem destaque absoluto e a interatividade é fluida e moderna. Decidimos usar a **Framer Motion** para animações de scroll e criar componentes atómicos reutilizáveis para barras de progresso e grelhas animadas.

### 🚀 O que mudou no Site (Execução)
- **Evolução de Componentes UI:**
  - `SectionHeading` agora suporta etiquetas (`badge`) e tem tipografia refinada para títulos de grande escala.
  - Criação do componente `ReadingProgress` para feedback visual durante a leitura de artigos.
- **Layout Editorial Dinâmico:**
  - Implementação do `NoticiasGrid` (Client Component) que separa automaticamente a notícia mais recente como **Destaque Principal** (Layout horizontal, imagem de grandes dimensões e sombras profundas).
  - Grelha de notícias secundárias com animações **staggered** (entrada sequencial ao fazer scroll).
- **Experiência de Artigo Elevada:**
  - Reformulação total da página de detalhe (`/noticias/[slug]`) com foco em legibilidade editorial (prose-xl, blockquotes estilizados e imagens com hover dinâmico).
  - Novo sistema de botões de partilha e navegação de retorno com micro-interações de escala e cor.
- **Consolidação Técnica:** Separação clara entre Server Components (para SEO e dados) e Client Components (para interatividade), mantendo a performance otimizada.

### 🎯 Estado da Entrega
- **Listagem de Notícias:** [CONCLUÍDA] Design imersivo e animado.
- **Página de Artigo:** [CONCLUÍDA] Leitura otimizada com barra de progresso.
- **Design System:** [ATUALIZADO] Componentes de títulos mais versáteis.

---


## 📅 QUINTA-FEIRA, 2 DE ABRIL DE 2026
### 💬 O que conversámos (Intenção)
O foco total desta sessão foi a **página de Serviços**. O objetivo era elevar o design de uma grelha simples para uma experiência imersiva que fizesse jus ao padrão "Premium Minimalist" do resto do site. Decidimos por uma abordagem que utiliza **Fotografia Imersiva**, onde cada categoria de serviço é representada por uma imagem de alta qualidade com sobreposições de glassmorphism.

### 🚀 O que mudou no Site (Execução)
- **Catálogo Completo de Serviços:** Substituição dos 3 serviços genéricos por uma lista detalhada de **8 serviços oficiais**: Recolha REEE's, Componentes Informáticos, Toners Vazios e Fora de Validade, Abate Fiscal, Consultadoria Ambiental e Destruição de Dados.
- **Lista Mestra de Reciclagem:** Implementação de uma nova secção dedicada ("Recolhemos e Reciclamos") que categoriza exaustivamente todos os materiais processados, desde informática e eletrodomésticos até metais e consumíveis.
- **Refinação de Dados & Ícones:** Atualização das constantes para incluir novos ícones Lucide (Printer, FileText, ClipboardCheck, ShieldAlert) e badges numerados para facilitar a leitura.
- **Design de Grande Escala:** Otimização do layout Z-pattern para suportar o novo volume de conteúdo, mantendo a performance fluida e a estética premium.

### 🎯 Estado da Entrega
- **Home Page:** [CONCLUÍDA] Restaurada ao design original após testes de parallax.
- **Sobre Nós:** [CONCLUÍDA]
- **Serviços:** [CONCLUÍDA] Design imersivo finalizado.
- **Contactos:** [CONCLUÍDA] Formulário único com design Premium Minimalist e contraste otimizado.

---

## 📅 QUINTA-FEIRA, 2 DE ABRIL DE 2026 (Sessão de Refinamento & Performance)
### 💬 O que conversámos (Intenção)
O foco principal foi elevar a página de **Contactos** para o padrão "Premium Minimalist". Explorámos várias abordagens, desde formulários conversacionais a lógicas condicionais por perfil (Empresa/Particular), acabando por decidir por uma abordagem simplificada, direta e de alto contraste. Na **Home Page**, testámos um efeito de "Lupa Reveladora" (Spyglass) na secção de sustentabilidade, mas regressámos à animação orgânica original para manter a sobriedade da marca.

### 🚀 O que mudou no Site (Execução)
- **Contactos Premium:** Substituição de emojis por ícones Lucide, implementação de upload de fotos e ajuste de contraste nos inputs para melhor usabilidade.
- **Otimização de Performance:** Redução de `backdrop-blur` e remoção de animações pesadas (`pulse`) para eliminar lag em dispositivos menos potentes.
- **Experiências de UI (Iterações):**
  - Implementação e posterior remoção de lógica de formulário condicional.
  - Criação e reversão de efeito de parallax hidrodinâmico na Home Page.
- **Consolidação Técnica:** Refatoração modular de componentes durante os testes e limpeza final do código.

### 🎯 Estado da Entrega
- **Infraestrutura:** [CONCLUÍDA]
- **Design de Páginas:** [CONCLUÍDA] Todas as páginas principais estão no estado final aprovado.
- **Performance:** [OTIMIZADA] Carga de GPU reduzida na página de contactos.

---
### 💬 O que conversámos (Intenção)
A sessão de hoje foi uma jornada de transformação do "genérico" para o "autêntico". Começámos por elevar o design do rodapé para um formato **Slim e Profissional**, respeitando as cores originais da marca. Houve uma decisão clara de simplificar a presença digital, focando exclusivamente no **Facebook** e removendo redes não utilizadas (Instagram/LinkedIn). 

O ponto mais importante foi a integração da **história real da 20recolher**: a sua fundação em 2014, o prémio de empreendedorismo de 2013 e a mudança estratégica para a Zona Industrial de Cantanhede em 2022. No fecho da sessão, estabelecemos um **Protocolo de Diário** para que nada se perca entre conversas futuras.

### 🚀 O que mudou no Site (Execução)
- **Rodapé Premium & Slim:** Novo design em verde escuro, muito compacto, com o logótipo em cores reais e contactos de Cantanhede.
- **Identidade Real:** Atualização total da página "Sobre Nós" com fotografias realistas e a narrativa oficial da empresa (incluindo o trabalho com o Estado e tribunais).
- **Foco Digital Único:** Remoção total de referências ao LinkedIn e Instagram; link oficial do Facebook configurado.
- **Otimização Visual:** Substituição da imagem da floresta por um recurso local (`imagem-arvore.jpg`) e ajuste tipográfico no título principal do "Sobre Nós".
- **Sistema de Documentação:** Criação deste Diário de Projeto e atualização das "Regras de Ouro" no ficheiro `GEMINI.md` para automatizar este registo.
- **Consolidação Git:** Repositório simplificado para trabalhar exclusivamente na branch `main`.

### 🎯 Estado da Entrega
- **Home Page:** [CONCLUÍDA] 100% otimizada e com imagens locais.
- **Sobre Nós:** [CONCLUÍDA] Com dados históricos reais e design institucional sólido.
- **Protocolos:** [ATIVOS] Sistema de diário diário implementado.
- **Próximo Passo:** Rever e otimizar a página de **Serviços** e a de **Contactos**.

---

## 📅 TERÇA-FEIRA, 31 DE MARÇO DE 2026
### 💬 O que conversámos (Intenção)
O primeiro dia foi de definições estruturais. O utilizador queria um site moderno que fugisse ao aspeto "clássico" de reciclagem. Decidimos por um design "Soft & Immersive", utilizando tons de verde pastel e micro-interações. O foco inicial foi criar uma Home Page que gerasse impacto imediato através de vídeo e uma tipografia elegante.

### 🚀 O que mudou no Site (Execução)
- **Setup Tecnológico:** Configuração do Next.js 15, Tailwind v4 e Framer Motion.
- **Design Editorial:** Criação das primeiras secções da Home: Hero com vídeo, Estatísticas Animadas e Timeline de Processo.
- **Componentes Base:** Desenvolvimento da Navbar e da estrutura de cores da marca.
- **Experiência do Utilizador:** Implementação da página 404 personalizada e animações de entrada.
- **SEO & Metadados:** Configuração inicial de títulos e ícones.

### 🎯 Estado da Entrega
- **Infraestrutura:** [CONCLUÍDA] Base técnica sólida estabelecida.
- **Draft Visual:** [CONCLUÍDA] Estética do site definida e aprovada.
