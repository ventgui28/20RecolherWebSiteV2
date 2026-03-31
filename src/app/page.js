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
      <section className="py-24 bg-green-50/20">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 relative group">
               <div className="aspect-[4/3] w-full bg-primary-green rounded-[3rem] shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-green/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-[150px] group-hover:scale-110 transition-transform duration-700">
                    🌍
                  </div>
               </div>
               {/* Floating badge */}
               <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-green-50 max-w-[180px]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Compromisso</p>
                  <p className="text-sm font-bold text-dark-green leading-snug">Economia Circular em Portugal 🇵🇹</p>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary-green font-bold text-xs rounded-full shadow-sm mb-8 border border-green-100">
                <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
                POR UM PLANETA MAIS LIMPO
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading text-dark-green mb-8 leading-tight tracking-tight">
                A sustentabilidade não é uma escolha, <br /> é o <span className="text-primary-green italic underline decoration-green-100 decoration-8 underline-offset-4">nosso futuro.</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                Na 20recolher, transformamos a forma como as empresas gerem os seus ativos tecnológicos. Mais do que recolher, garantimos que cada componente volta a integrar o ciclo produtivo de forma segura.
              </p>
              
              <div className="bg-white p-8 rounded-3xl border border-green-50 shadow-sm mb-12">
                 <p className="text-dark-green text-lg font-bold italic leading-relaxed">
                   "{BRAND.mission}"
                 </p>
              </div>

              <Link href="/sobre-nos">
                <Button className="h-14 px-10 text-lg rounded-2xl shadow-xl shadow-primary-green/20">
                  Saiba como trabalhamos
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
