const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY devem estar definidos em .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const noticias = [
  {
    titulo: "20recolher Expande Operação para Nova Unidade em Cantanhede",
    slug: "expansao-unidade-cantanhede",
    subtitulo: "O novo centro logístico permite triplicar a capacidade de processamento de REEE em Portugal.",
    conteudo: "<h2>Expansão Estratégica</h2><p>A 20recolher inaugurou hoje a sua nova unidade na Zona Industrial de Cantanhede. Este investimento de última geração reforça a nossa posição como líderes na gestão de resíduos tecnológicos.</p><p>Com mais de 2000m² de área coberta, a nova infraestrutura está equipada com as mais recentes tecnologias de triagem e valorização de componentes eletrónicos.</p>",
    categoria: "Institucional",
    autor: "Direção Geral",
    imagem_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    publicado: true
  },
  {
    titulo: "Obtenção de Nova Certificação Ambiental Europeia",
    slug: "nova-certificacao-ambiental",
    subtitulo: "A 20recolher recebeu o selo de excelência em economia circular, validando os nossos processos de reciclagem.",
    conteudo: "<h2>Compromisso com a Excelência</h2><p>É com orgulho que anunciamos a obtenção da certificação ISO 14001, um marco fundamental que atesta o rigor ambiental dos nossos processos de tratamento de resíduos.</p><p>Este reconhecimento é o resultado de anos de dedicação à sustentabilidade e à inovação tecnológica.</p>",
    categoria: "Certificações",
    autor: "Departamento Qualidade",
    imagem_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
    publicado: true
  },
  {
    titulo: "Lançamento do Novo Serviço de Destruição de Dados Segura",
    slug: "servico-destruicao-dados",
    subtitulo: "Soluções avançadas para a eliminação certificada de informação confidencial em discos rígidos e SSDs.",
    conteudo: "<h2>Segurança Máxima</h2><p>A pensar na proteção de dados das empresas, lançámos um novo serviço de trituração física de suportes magnéticos. Garantimos a destruição total da informação com emissão imediata de certificado de destruição.</p><p>Este serviço cumpre rigorosamente com o RGPD e as normas de segurança europeias.</p>",
    categoria: "Serviços",
    autor: "Equipa Técnica",
    imagem_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    publicado: true
  }
];

async function insertNoticias() {
  console.log('🚀 A inserir notícias de teste...');
  
  const { data, error } = await supabase
    .from('noticias')
    .insert(noticias)
    .select();

  if (error) {
    console.error('❌ Erro ao inserir:', error.message);
  } else {
    console.log('✅ Sucesso! Notícias inseridas:', data.length);
  }
}

insertNoticias();
