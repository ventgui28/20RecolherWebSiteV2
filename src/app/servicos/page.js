import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { SERVICES } from "@/constants/services";

export default function ServicesPage() {
  return (
    <div className="py-20 md:py-32 bg-white">
      <Container>
        {/* Header Section */}
        <SectionHeading 
          centered
          title="Nossos Serviços"
          subtitle="Oferecemos uma gama completa de soluções para a gestão de resíduos tecnológicos da sua empresa, garantindo conformidade e sustentabilidade."
        />

        {/* Detailed Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          {SERVICES.map((cat, i) => (
            <div key={i} className="flex flex-col bg-gray-50/50 rounded-3xl p-10 hover:bg-green-50 transition-all duration-300 border border-gray-100 shadow-sm group">
              <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h2 className="text-2xl font-extrabold text-dark-green mb-4">{cat.title}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">{cat.desc}</p>
              
              <div className="h-px bg-gray-200 mb-8"></div>
              
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Equipamentos:</h3>
              <ul className="space-y-4 mb-8 flex-grow">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-primary-green mr-3"></span>
                    <span className="font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-dark-green rounded-[4rem] p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden group">
           <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-primary-green font-bold uppercase tracking-widest text-sm bg-white/10 px-6 py-2 rounded-full mb-8 inline-block backdrop-blur-md">Pronto para começar?</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">Dê o destino certo ao seu material tecnológico</h2>
                <p className="text-xl mb-12 opacity-90 leading-relaxed text-green-50">
                    Agende agora uma recolha ou peça um orçamento sem qualquer compromisso. A nossa equipa entrará em contacto num prazo de 24 horas.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link href="/contactos">
                        <Button className="h-16 px-12 text-lg font-bold bg-white text-dark-green hover:bg-primary-green hover:text-white transform hover:scale-105 transition-all">
                            Agendar Recolha Agora
                        </Button>
                    </Link>
                </div>
           </div>
           {/* Visual background effect */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-green rounded-full opacity-20 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-mid-green rounded-full opacity-20 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        </div>
      </Container>
    </div>
  );
}
