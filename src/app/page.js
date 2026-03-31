import HomeHero from "@/components/sections/HomeHero";
import HomeServices from "@/components/sections/HomeServices";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { BRAND } from "@/constants/brand";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <HomeServices />
      
      {/* About Brief Section */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 relative">
               <div className="aspect-square w-full bg-mid-green rounded-[3rem] flex items-center justify-center text-white text-9xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                 🌍
               </div>
               <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-green rounded-full flex items-center justify-center text-white text-6xl shadow-xl -rotate-12 animate-pulse">
                 ♻️
               </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-primary-green font-bold uppercase tracking-widest text-sm bg-green-50 px-4 py-2 rounded-full mb-6 inline-block">Sustentabilidade</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">Compromisso com o nosso Planeta</h2>
              <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-primary-green pl-6 py-2">
                "{BRAND.mission}"
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Atuamos na linha da frente da economia circular em Portugal, garantindo que os materiais são processados e reciclados de acordo com as normas ambientais mais rigorosas.
              </p>
              <Link href="/sobre-nos">
                <Button variant="dark" className="h-14 px-10 text-lg">
                  Conheça a nossa história
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
