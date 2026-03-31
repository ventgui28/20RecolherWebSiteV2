import HomeHero from "@/components/sections/HomeHero";
import HomeServices from "@/components/sections/HomeServices";
import HomeStats from "@/components/sections/HomeStats";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { BRAND } from "@/constants/brand";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <HomeServices />
      <HomeStats />
      
      {/* About Brief Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 relative">
               <div className="aspect-square w-full bg-mid-green rounded-[4rem] flex items-center justify-center text-white text-9xl shadow-2xl hover:scale-105 transition-transform duration-500">
                 🌍
               </div>
               <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-green rounded-full border-8 border-white flex items-center justify-center text-white text-6xl shadow-xl animate-bounce">
                 ♻️
               </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-primary-green font-bold uppercase tracking-[0.2em] text-xs bg-green-50 px-6 py-3 rounded-full mb-8 inline-block border border-green-100">Sustentabilidade</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">Compromisso com o nosso Planeta</h2>
              <p className="text-xl text-gray-500 mb-8 italic border-l-8 border-primary-green pl-8 py-4 bg-gray-50 rounded-r-2xl">
                "{BRAND.mission}"
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
                Atuamos na linha da frente da economia circular em Portugal, garantindo que os materiais são processados e reciclados de acordo com as normas ambientais mais rigorosas.
              </p>
              <Link href="/sobre-nos">
                <Button variant="dark" className="h-16 px-12 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
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
