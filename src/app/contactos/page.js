import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CONTACTS } from "@/constants/contact";

export default function ContactPage() {
  const contactItems = [
    { label: "Endereço", value: CONTACTS.address, icon: "📍" },
    { label: "Telefone", value: CONTACTS.phone, icon: "📞" },
    { label: "Email", value: CONTACTS.email, icon: "✉️" },
    { label: "Horário", value: CONTACTS.workingHours, icon: "⏰" },
  ];

  return (
    <div className="py-20 md:py-32 bg-gray-50/50">
      <Container>
        {/* Header Section */}
        <SectionHeading 
          centered
          title="Fale Connosco"
          subtitle="Tem dúvidas sobre as nossas recolhas? Gostaria de um orçamento detalhado para a sua empresa? Estamos prontos para ajudar."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info and Map */}
          <div>
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 mb-12">
              <h2 className="text-2xl font-bold text-dark-green mb-8">Informações de Contacto</h2>
              <div className="space-y-8 text-gray-600">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="text-3xl mr-6 bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-primary-green group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-lg font-semibold text-gray-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps Iframe */}
            <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-sm border-8 border-white">
              <iframe
                src={CONTACTS.mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-dark-green mb-8">Pedido de Recolha / Orçamento</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all"
                      placeholder="Seu nome..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Empresarial</label>
                    <input
                      type="email"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all"
                      placeholder="exemplo@empresa.pt"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Tipo de Serviço</label>
                  <select className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all appearance-none cursor-pointer">
                    <option>Recolha de Informática</option>
                    <option>Resíduos Eletrónicos</option>
                    <option>Consumíveis e Baterias</option>
                    <option>Outros Serviços</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Lista de Equipamento</label>
                  <textarea
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:border-primary-green focus:bg-white focus:ring-4 focus:ring-green-100 outline-none transition-all h-40 resize-none"
                    placeholder="Descreva brevemente o que pretende recolher..."
                  ></textarea>
                </div>

                <Button className="w-full h-16 text-lg font-bold shadow-lg transform hover:scale-[1.02] active:scale-[0.98]">
                  Enviar Pedido de Recolha
                </Button>
                
                <p className="text-center text-sm text-gray-400 font-medium">
                  A nossa equipa responderá num prazo máximo de 24 horas úteis.
                </p>
              </form>
            </div>
            {/* Background design element */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-green-50 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}
