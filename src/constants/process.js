import { Truck, Search, Recycle, CheckCircle } from "lucide-react";

export const PROCESS_STEPS = [
  {
    id: 1,
    title: "Recolha",
    description: "Logística otimizada para reduzir a pegada de carbono desde o primeiro quilómetro.",
    icon: Truck,
    image: "/images/recolha.jpg",
    color: "bg-green-50",
    textColor: "text-primary-green"
  },
  {
    id: 2,
    title: "Triagem",
    description: "Separação minuciosa para maximizar o reaproveitamento de componentes e materiais nobres.",
    icon: Search,
    image: "/images/triagem.jpg",
    color: "bg-green-100/50",
    textColor: "text-mid-green"
  },
  {
    id: 3,
    title: "Valorização",
    description: "Processamento avançado que evita a extração mineira de novos recursos finitos da Terra.",
    icon: Recycle,
    image: "/images/valorizacao.avif",
    color: "bg-green-200/30",
    textColor: "text-forest-green"
  },
  {
    id: 4,
    title: "Reintrodução",
    description: "Devolvemos valor à economia circular, protegendo os ecossistemas do futuro.",
    icon: CheckCircle,
    image: "/images/process-reintroducao.png",
    color: "bg-primary-green/10",
    textColor: "text-dark-green"
  }
];
