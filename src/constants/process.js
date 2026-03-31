import { Truck, Search, Recycle, CheckCircle } from "lucide-react";

export const PROCESS_STEPS = [
  {
    id: 1,
    title: "Recolha",
    description: "Agendamos e realizamos a recolha dos seus equipamentos com transporte especializado e seguro.",
    icon: Truck,
    color: "bg-green-50",
    textColor: "text-primary-green"
  },
  {
    id: 2,
    title: "Triagem",
    description: "Os materiais são rigorosamente separados e classificados de acordo com a sua composição técnica.",
    icon: Search,
    color: "bg-green-100/50",
    textColor: "text-mid-green"
  },
  {
    id: 3,
    title: "Valorização",
    description: "Transformamos os resíduos através de processos que permitem a recuperação de matérias-primas valiosas.",
    icon: Recycle,
    color: "bg-green-200/30",
    textColor: "text-forest-green"
  },
  {
    id: 4,
    title: "Destino Final",
    description: "Garantimos o encerramento do ciclo com a reintrodução na economia ou eliminação ambientalmente segura.",
    icon: CheckCircle,
    color: "bg-primary-green/10",
    textColor: "text-dark-green"
  }
];
