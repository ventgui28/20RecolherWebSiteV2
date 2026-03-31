import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRAND } from "@/constants/brand";

export default function AboutPage() {
  return (
    <div className="py-20 md:py-32">
      <Container>
        {/* Header Section */}
        <SectionHeading 
          centered
          title={`Sobre a ${BRAND.name}`}
          subtitle="Mais de uma década a transformar a forma como as empresas gerem os seus resíduos eletrónicos."
        />

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-dark-green mb-8">Nossa Missão</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{BRAND.mission}</p>
              <p>
                A 20recolher nasceu com a visão clara de simplificar a gestão de resíduos tecnológicos em Portugal. O nosso foco principal é a recolha de material informático obsoleto e o seu encaminhamento para centros de reciclagem certificados.
              </p>
              <p>
                Acreditamos que o lixo tecnológico não deve ser visto como um problema, mas como uma oportunidade de recuperar recursos valiosos e proteger o nosso ecossistema.
              </p>
            </div>
            <div className="mt-12 p-8 bg-green-50 rounded-3xl border-l-8 border-primary-green shadow-sm">
              <p className="text-dark-green text-xl font-medium italic leading-relaxed">
                "Promovemos a economia circular, garantindo que o seu material tecnológico de hoje não se torne a poluição de amanhã."
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-video lg:aspect-square bg-gray-100 rounded-[3rem] flex items-center justify-center text-9xl shadow-inner relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary-green/10 group-hover:bg-primary-green/5 transition-colors duration-500"></div>
               🏢
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-100">
          <SectionHeading 
            centered
            title="Nossos Valores"
            subtitle="Os pilares que sustentam a nossa atividade diária e o nosso compromisso com o futuro."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {BRAND.values.map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
                <div className="text-6xl mb-6">{v.icon}</div>
                <h3 className="text-2xl font-bold text-dark-green mb-4">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
