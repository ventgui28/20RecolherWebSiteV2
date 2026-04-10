# 📔 Diário de Projeto - 20recolher

Registo histórico das conversas, decisões e implementação técnica do website da 20recolher. Este documento funde a intenção do utilizador com a experiência técnica para garantir o controlo total do progresso.

---

## 📅 SEXTA-FEIRA, 10 DE ABRIL DE 2026 (Refinação de Interação: Mapa de Contactos)
### 💬 O que conversámos (Intenção)
Para simplificar a experiência do utilizador na página de **Contactos**, decidimos remover a camada de interação (Floating Glass Control Panel) que surgia ao passar o rato sobre o mapa. O objetivo era tornar o mapa mais limpo e direto, mantendo apenas a funcionalidade de clique no marcador (pin) para abrir o popup de informações e o botão de navegação para o Google Maps.

### 🚀 O que mudou no Site (Execução)
- **Simplificação de Interação no Mapa:**
  - Remoção total do painel de vidro flutuante (`Floating Glass Control Panel`) em `src/app/contactos/page.js`.
  - Limpeza das classes de `group` no contentor do mapa para eliminar estados de hover globais desnecessários.
  - Ajuste do nível de zoom inicial de **18** para **17** para proporcionar uma melhor contextualização da localização na zona industrial.
  - Implementação de **Animação de Zoom-In Imersiva**: O mapa inicia com zoom **13** e transita suavemente para **17** (`flyTo`) durante 4 segundos.
  - **Ativação por Scroll (Intersection Observer)**: A animação de aproximação agora só é disparada quando o mapa entra efetivamente no campo de visão do utilizador (viewport), garantindo que o efeito visual não é desperdiçado antes de ser visível.
  - **Aparição Diferida do Marcador**: O marcador da sede (pin) só é renderizado após a conclusão do efeito de zoom (4 segundos), surgindo com uma suave animação de fade-in/zoom-in para um toque final de polimento.
- **Manutenção de Funcionalidades Críticas:**
  - O marcador vibrante com animação de pulso e o seu popup interativo (`Popup`) permanecem ativos e funcionais via clique.
  - O efeito de escala local no pin (`group-hover/pin`) foi mantido para fornecer feedback visual ao utilizador antes do clique.

### 🎯 Estado da Entrega
- **Mapa de Contactos:** [OTIMIZADO] Interface mais limpa e focada na funcionalidade de clique.

---

## 📅 SEXTA-FEIRA, 10 DE ABRIL DE 2026 (UI/UX Pro Max - Premium Minimalist Bento Grid)
### 💬 O que conversámos (Intenção)
Nesta sessão, o utilizador deu ordens explícitas para ignorar as regras anteriores de design (baseadas no verde da marca) e seguir estritamente as recomendações da skill **UI/UX Pro Max**. O objetivo foi elevar a página de **Contactos** para um padrão de luxo industrial, utilizando a estética "Liquid Glass" e o padrão "Bento Grid Showcase" para comunicar exclusividade e profissionalismo.

### 🚀 O que mudou no Site (Execução)
- **Design Editorial "High-End":**
  - Implementação de um cabeçalho monumental (`text-9xl`) com tipografia **Bodoni Moda** (Serif) e **Jost** (Sans), criando um contraste editorial de revista de luxo.
  - Abandono da paleta de verdes original em favor de uma combinação de **Preto Premium (#1C1917)**, **Ouro (#A16207)** e **Branco Alabastro (#FAFAF9)**.
- **Bento Grid Showcase:**
  - Reestruturação das informações de contacto (Morada, Telefone, E-mail, Horário) num sistema de grelha modular (Bento) com tamanhos dinâmicos.
  - Integração do mapa do Google Maps como um bloco de destaque na grelha, com filtro "Grayscale" que se revela em cores no hover.
- **Formulário de Orçamento "Bespoke":**
  - Redesenho dos inputs com animações de "Floating Labels" e bordas minimalistas.
  - Botão de submissão transformado numa peça de design com preenchimento animado (Liquid) e ícones de ação rápida.
- **Infraestrutura de Design:**
  - Atualização do `layout.js` para suporte nativo das novas fontes premium via `next/font/google`.
  - Expansão do `globals.css` com as novas variáveis do sistema de design da skill.

### 🎯 Estado da Entrega
- **Página de Contactos:** [TRANSFORMADA] Design de luxo industrial implementado e validado.
- **Identidade Visual:** [EXPERIMENTAÇÃO] Transição para um estilo de alto contraste (Black & Gold) para esta secção específica conforme pedido.

---

## 📅 SEXTA-FEIRA, 10 DE ABRIL DE 2026 (Contactos & Liquid Glass)
### 💬 O que conversámos (Intenção)
A sessão focou-se na elevação da página de **Contactos** para o padrão visual mais elevado do site. O objetivo foi transformar um formulário e informações estáticas numa experiência de marca imersiva, utilizando a estética "Liquid Glass" (transparências, desfoques e tipografia editorial) para transmitir profissionalismo e inovação.

### 🚀 O que mudou no Site (Execução)
- **Design Editorial "Hero Direct":**
  - Implementação de um cabeçalho de grande escala (`text-8xl`) com gradientes dinâmicos para impacto imediato.
  - Substituição de títulos genéricos por uma mensagem focada no "futuro sustentável".
- **Cartões de Info Interativos:**
  - Redesenho dos cartões de contacto com `backdrop-blur` profundo e bordas semi-transparentes.
  - Adição de micro-interações: setas de ação (`ArrowRight`) que surgem no hover e sombras dinâmicas que sugerem profundidade.
- **Formulário de Orçamento "Linha Pura":**
  - Evolução para um estilo minimalista de inputs sem bordas (apenas linha inferior) para reduzir a carga cognitiva.
  - Otimização do seletor de serviços e da zona de upload de fotos com estados de feedback visual aprimorados.
- **Integração de Mapa Premium:**
  - O mapa do Google Maps foi emoldurado numa estrutura de vidro com bordas grossas brancas, animação de pulso no indicador de sede e um CTA contextual flutuante.

### 🎯 Estado da Entrega
- **Página de Contactos:** [CONCLUÍDA] Design premium de alta fidelidade implementado, validado e com espaçamento superior otimizado.
- **Performance:** [MANTIDA] Uso estratégico de efeitos CSS para evitar lag em dispositivos móveis.

---

## 📅 SEXTA-FEIRA, 10 DE ABRIL DE 2026 (UI/UX Pro Max - Premium Minimalist)
### 💬 O que conversámos (Intenção)
A pedido do utilizador, ativei a skill **UI/UX Pro Max** para efetuar uma auditoria visual e reestruturar a página de notícias. O objetivo era abandonar o design genérico e adotar uma estética "Premium Minimalist" com um subtema "Liquid Glass" focado em usabilidade, trazendo uma tipografia de classe editorial para a leitura de artigos.

### 🚀 O que mudou no Site (Execução)
- **Grelha de Notícias (Magazine Style):**
  - Implementado um design de sobreposição (`overlap`) com blur dinâmico para o artigo em destaque.
  - Conversão dos formatos dos cards para uma proporção `4:3`, mais próxima das publicações impressas.
  - Refinação da barra de pesquisa e filtros usando princípios de "glassmorphism".
- **Experiência de Leitura Imersiva (Página Individual):**
  - Implementação da "Mancha de Ouro" de leitura: largura máxima do texto limitada a **720px** para reduzir o esforço ocular e aumentar a retenção.
  - Reestruturação do layout com uma **Sidebar Sticky** dedicada para controlos de partilha, eliminando problemas de sobreposição e garantindo persistência durante o scroll em desktop.
  - Refinação estética dos `Blockquotes` (citações) com tipografia de grande escala e `tracking-tighter`.
  - Correção crítica do componente `<Container>`, que não estava a propagar a propriedade de tamanho. Isto otimizou o comprimento da linha (`max-w-3xl`) em todo o site.
- **Auditoria de Código:**
  - Resolvidos os avisos do linter e corrigidos antipadrões de React (`setState` síncrono dentro de um `useEffect` na grelha).

### 🎯 Estado da Entrega
- **Sala de Imprensa:** [PREMIUM] Design editorial imersivo implementado.
- **Acessibilidade:** [OTIMIZADA] Leitura ergonómica validada.

---

## 📅 SEXTA-FEIRA, 10 DE ABRIL DE 2026 (Navegação & UI/UX Notícias)
### 💬 O que conversámos (Intenção)
A sessão de hoje foi focada na escalabilidade e refinamento da Sala de Imprensa. O objetivo foi transformar a listagem simples de notícias num sistema robusto de navegação com paginação, scroll inteligente e filtros de alta fidelidade, garantindo que o portal se mantém utilizável e elegante mesmo com dezenas de artigos.

### 🚀 O que mudou no Site (Execução)
- **Sistema de Paginação & Navegação:**
  - Implementação de `Paginação Truncada`: Interface limpa que oculta intervalos de páginas com reticências (`...`), mostrando apenas as extremidades e vizinhos da página atual.
  - **Scroll Automático:** Adição de efeito suave que reposiciona o utilizador no topo da grelha ao mudar de página, eliminando a fricção de ficar "preso" no fundo do ecrã.
  - Lógica de destaque (Featured) configurada para aparecer apenas na primeira página.
- **Overhaul de UI/UX de Filtros:**
  - **Contadores Reais:** Cada categoria agora exibe dinamicamente o número de artigos publicados.
  - **Design "Floating Premium":** Substituição de botões básicos por cards flutuantes com sombras dinâmicas e estados ativos em preto profundo (`slate-900`).
  - **Pesquisa Imersiva:** Barra de pesquisa alargada com brilho (glow) de foco e indicação de "Pesquisa em tempo real".
- **Otimização de Assets de Notícias:**
  - Substituição de fallbacks genéricos por imagens reais de logística e triagem (`recolha.jpg`, `triagem.jpg`) na biblioteca de padrões do Admin.

### 🎯 Estado da Entrega
- **Sala de Imprensa:** [SISTEMA COMPLETO] Design, navegação e performance 100% otimizados.
- **Gestão de Imagens:** [CONSOLIDADA] Biblioteca de padrões integrada com ativos oficiais.


---

## 📅 QUINTA-FEIRA, 9 DE ABRIL DE 2026 (Imagens & Rigor Editorial)
### 💬 O que conversámos (Intenção)
Para elevar a qualidade visual do portal de notícias e evitar "buracos" no design, decidimos eliminar os ícones de reserva (Inbox) e implementar a **obrigatoriedade de imagem**. O objetivo é garantir que cada artigo publicado tenha sempre um impacto visual profissional, oferecendo ao administrador ferramentas rápidas para selecionar imagens padrão de alta qualidade sem precisar de sair do editor.

### 🚀 O que mudou no Site (Execução)
- **Protocolo de Imagem Obrigatória:**
  - O botão de publicação no Admin agora exige a presença de uma imagem (upload ou seleção).
  - Feedback visual no editor com badges de "Obrigatório" e "Imagem Padrão Selecionada".
- **Sistema de Padrões (Default Library):**
  - Criação de uma biblioteca de 4 imagens pré-configuradas em `src/constants/news.js`: Tecnologia, Logística, Industrial e Eco.
  - Interface de seleção rápida por cliques (thumbnails) no painel de criação e edição.
- **Substituição de Fallbacks Visuais:**
  - Remoção total dos ícones Lucide `Inbox` na grelha de notícias.
  - Implementação de fallback real (Imagem de Tecnologia) tanto na `NoticiasGrid` como na página de detalhe do artigo para garantir que notícias legadas nunca apareçam "vazias".
- **Otimização de UI Admin:**
  - Novo layout para a barra lateral de imagem com upload centralizado e seleção de padrões em grelha.

### 🎯 Estado da Entrega
- **Editor de Notícias:** [SUPER PREMIUM] Rigor editorial máximo com seleção assistida de imagem.
- **Sala de Imprensa:** [CONSISTENTE] 100% de cobertura visual garantida.

---

## 📅 TERÇA-FEIRA, 7 DE ABRIL DE 2026 (Gestão Avançada de Admin & Notícias)
### 💬 O que conversámos (Intenção)
O objetivo desta sessão foi elevar o painel de administração de uma ferramenta básica para um **CMS Profissional**. Focámo-nos na eficiência operacional (gestão em massa) e na segurança de dados (histórico de versões), garantindo que a equipa da **20recolher** tenha controlo total e intuitivo sobre a sua comunicação digital.

### 🚀 O que mudou no Site (Execução)
- **Dashboard Admin Transformado:**
  - **Filtros e Busca:** Implementação de filtragem instantânea e pesquisa por título/categoria.
  - **Ações em Massa (Bulk Bar):** Nova interface flutuante para gestão múltipla de notícias (Eliminar/Publicar/Rascunho).
- **Sistema de Revisões "Time Machine":**
  - **Snapshots Automáticos:** Configuração de Trigger SQL no Supabase para guardar versões de cada edição.
  - **Interface de Restauro:** Modal dedicado para comparar versões históricas e restaurar conteúdos, imagens e SEO com um clique.
- **Página de Edição Profissional:** Desenvolvimento da rota `/admin/editar/[id]` com carregamento dinâmico de dados.
- **Métricas de Leitura Realistas:** 
  - Novo algoritmo baseado no padrão Medium (Palavras + Imagens).
  - Feedback visual no editor com contador de palavras e tempo estimado.
- **Estabilização Crítica:**
  - Resolução de conflitos de Slugs únicos (Erro 409).
  - Correção de mapeamento de colunas (subtitulo, seo_title, seo_description).

### 🎯 Estado da Entrega
- **Dashboard Admin:** [CONCLUÍDO] Funcionalidade de nível corporativo.
- **Editor de Notícias:** [SUPER PREMIUM] Com métricas em tempo real e histórico de versões.
- **Segurança:** [REFORÇADA] Recomendação de ativação de RLS e Slugs anti-colisão.


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
