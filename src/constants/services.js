import { 
  Recycle, 
  Cpu, 
  Printer, 
  Box, 
  FileText, 
  ClipboardCheck, 
  ShieldAlert, 
  Monitor,
  BatteryCharging
} from 'lucide-react';

export const SERVICES = [
  {
    id: "reee_metais",
    title: "Recolha REEE's e Metais",
    desc: "Recolha e valorização de equipamentos Informáticos, Eletrónicos e Eletrodomésticos (EEE).",
    badge: "01",
    advantage: "Valorização Total",
    icon: "Recycle",
    image: "/images/recolha.jpg",
    items: ["Equipamentos Informáticos", "Equipamentos Eletrónicos", "Eletrodomésticos", "Metais Ferrosos e Não Ferrosos"]
  },
  {
    id: "componentes",
    title: "Componentes Informáticos",
    desc: "Recolha e valorização e reciclagem de componentes informático e electrónicos (placas, processadores, memórias, discos, etc) em quantidade.",
    badge: "02",
    advantage: "Especialistas em Hardware",
    icon: "Cpu",
    image: "/images/componentes-info.jpg",
    items: ["Placas Eletrónicas", "Processadores e Memórias", "Discos Rígidos", "Circuitos Integrados"]
  },
  {
    id: "toners_vazios",
    title: "Toners Vazios",
    desc: "Recolha e reciclagem de tinteiros e toners vazios.",
    badge: "03",
    advantage: "Eco-Gestão",
    icon: "Printer",
    image: "/images/toner-vazio.jpg",
    items: ["Tinteiros Jacto de Tinta", "Toners Laser", "Cartuchos de Impressão"]
  },
  {
    id: "toners_validade",
    title: "Toners Fora de Validade",
    desc: "Recolha e valorização de tinteiros e toners cheios originais fora da validade.",
    badge: "04",
    advantage: "Recuperação de Stock",
    icon: "Box",
    image: "/images/toner-fora-da-validade.jpg",
    items: ["Stock Obsoleto", "Consumíveis Originais", "Tinteiros Cheios"]
  },
  {
    id: "abate_fiscal",
    title: "Abate Fiscal e de Imobilizado",
    desc: "Fazemos abates fiscais e imobilizados, recolhemos e reciclamos os equipamentos abatidos. Emitimos a E-Gar que comprova o envio para reciclagem.",
    badge: "05",
    advantage: "Conformidade Legal",
    icon: "FileText",
    image: "/images/e-gar.jpg",
    items: ["Declaração de Abate", "Emissão de E-Gar", "Certificação de Reciclagem"]
  },
  {
    id: "consultadoria",
    title: "Consultadoria Ambiental",
    desc: "Ajudamos no registo no Siliamb e emissão de E-gar. Esclareça dúvidas ambientais ou legais com a nossa Engenheira do Ambiente.",
    badge: "06",
    advantage: "Apoio Especializado",
    icon: "ClipboardCheck",
    image: "/images/imagem-arvore.jpg",
    items: ["Registo Siliamb", "Validação de E-gar", "Consultoria Jurídica Ambiental"]
  },
  {
    id: "destruicao",
    title: "Destruição de Dados",
    desc: "Destruímos no local do cliente ou nas nossas instalações, discos rígidos e outros dispositivos de armazenamento e equipamentos.",
    badge: "07",
    advantage: "Segurança Absoluta",
    icon: "ShieldAlert",
    image: "/images/destruir-data.jpg",
    items: ["Discos Rígidos (HDD/SSD)", "Suportes Magnéticos", "Equipamentos Confidenciais"]
  }
];

export const RECYCLING_MASTER_LIST = [
  {
    category: "Informática & Redes",
    items: [
      "Computadores e Servidores",
      "Impressoras e Multifunções",
      "Monitores e Televisões",
      "Telemóveis e Telefones",
      "UPS, Routers e Centrais",
      "Componentes Informáticos"
    ]
  },
  {
    category: "Equipamentos Elétricos",
    items: [
      "Eletrodomésticos (Grandes e Pequenos)",
      "Ar Condicionado e Equipamento de Frio",
      "Ferramentas Elétricas",
      "Baterias e Cabos Elétricos"
    ]
  },
  {
    category: "Outros Resíduos",
    items: [
      "Tinteiros e Toners",
      "Papel, Cartão e Plástico",
      "Metais (Ferro, Cobre, Alumínio e Inox)"
    ]
  }
];
