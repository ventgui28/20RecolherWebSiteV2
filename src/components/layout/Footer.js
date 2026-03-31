import Link from 'next/link';
import { BRAND } from "@/constants/brand";
import { CONTACTS } from "@/constants/contact";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-dark-green tracking-tight">
              20<span className="text-primary-green">recolher</span>
            </Link>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              {BRAND.description} Juntos por um futuro mais sustentável através da economia circular.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase">Explorar</h3>
            <ul className="mt-6 space-y-4">
              <li><Link href="/" className="text-base text-gray-600 hover:text-primary-green transition-colors font-medium">Início</Link></li>
              <li><Link href="/sobre-nos" className="text-base text-gray-600 hover:text-primary-green transition-colors font-medium">Sobre Nós</Link></li>
              <li><Link href="/servicos" className="text-base text-gray-600 hover:text-primary-green transition-colors font-medium">Serviços</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase">Contactos</h3>
            <ul className="mt-6 space-y-4 text-base text-gray-600">
              <li>{CONTACTS.email}</li>
              <li>{CONTACTS.phone}</li>
              <li><Link href="/contactos" className="text-primary-green hover:text-dark-green font-semibold transition-colors">Pedir Orçamento</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase">Redes Sociais</h3>
            <div className="mt-6 flex flex-wrap gap-4">
              {CONTACTS.social.map((item) => (
                <a 
                  key={item.name}
                  href={item.url} 
                  className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 text-gray-400 hover:text-primary-green hover:shadow transition-all"
                  title={item.name}
                >
                  <span className="font-medium text-sm">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-2">
             <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ambiente & Reciclagem</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
