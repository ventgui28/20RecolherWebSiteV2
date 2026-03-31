import Link from 'next/link';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <Container>
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Recolha e Reciclagem</span>
                <span className="block text-primary-green">de Material Tecnológico</span>
              </h1>
              <p className="mt-6 text-lg text-gray-500 sm:max-w-xl sm:mx-auto lg:mx-0 leading-relaxed">
                {BRAND.description} Especialistas com compromisso ambiental e conformidade legal total.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link href="/contactos">
                  <Button className="w-full sm:w-auto h-14 text-lg px-10">
                    Pedir Recolha
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button variant="secondary" className="w-full sm:w-auto h-14 text-lg px-10 mt-3 sm:mt-0">
                    Nossos Serviços
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </Container>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="w-full h-full bg-gradient-to-br from-mid-green/90 to-dark-green flex items-center justify-center p-12 overflow-hidden relative group">
            <div className="text-white text-center relative z-10">
                <div className="bg-white/10 backdrop-blur-md w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl border border-white/20 transform group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <p className="text-3xl font-bold tracking-tight">{BRAND.slogan}</p>
                <div className="mt-4 flex justify-center space-x-2">
                   <div className="h-1 w-12 bg-primary-green rounded-full"></div>
                   <div className="h-1 w-4 bg-white/40 rounded-full"></div>
                </div>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="20" strokeDasharray="40 20"/>
                </svg>
            </div>
        </div>
      </div>
    </div>
  );
}
