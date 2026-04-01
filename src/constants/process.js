import { Truck, Search, Recycle, CheckCircle } from "lucide-react";

export const PROCESS_STEPS = [
  {
    id: 1,
    title: "Recolha Logística",
    description: "Transporte especializado com frota moderna para uma recolha segura e eficiente.",
    icon: Truck,
    image: "/images/process-recolha.webp",
    color: "bg-green-50",
    textColor: "text-primary-green"
  },
  {
    id: 2,
    title: "Triagem Técnica",
    description: "Separação rigorosa e classificação especializada de componentes eletrónicos.",
    icon: Search,
    image: "/images/process-triagem.webp",
    color: "bg-green-100/50",
    textColor: "text-mid-green"
  },
  {
    id: 3,
    title: "Valorização Industrial",
    description: "Recuperação de matérias-primas valiosas através de processos tecnológicos avançados.",
    icon: Recycle,
    image: "/images/process-valorizacao.webp",
    color: "bg-green-200/30",
    textColor: "text-forest-green"
  },
  {
    id: 4,
    title: "Economia Circular",
    description: "Reintrodução sustentável de materiais no ciclo produtivo para um futuro verde.",
    icon: CheckCircle,
    image: "/images/process-reintroducao.webp",
    color: "bg-primary-green/10",
    textColor: "text-dark-green"
  }
];
