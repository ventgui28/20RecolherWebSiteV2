import Link from 'next/link';
import { SERVICES } from "@/constants/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeServices() {
  return (
    <section className="py-20 bg-gray-50/50">
      <Container>
        <SectionHeading 
          centered
          title="Nossos Serviços Principais"
          subtitle="Soluções completas para a gestão de resíduos tecnológicos da sua empresa, com foco na sustentabilidade."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-5xl mb-6 bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:bg-primary-green group-hover:scale-110 transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-dark-green mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
              <Link 
                href="/servicos" 
                className="inline-flex items-center text-primary-green font-bold hover:text-dark-green transition-colors group-hover:gap-3 gap-2"
              >
                Saber mais 
                <span className="text-xl">→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
