# 📔 Diário de Projeto - 20recolher

Registo histórico das conversas, decisões e implementação técnica do website da 20recolher. Este documento funde a intenção do utilizador com a experiência técnica para garantir o controlo total do progresso.

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
