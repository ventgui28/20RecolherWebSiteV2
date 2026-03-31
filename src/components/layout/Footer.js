import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from "@/constants/brand";
import { CONTACTS } from "@/constants/contact";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-muted-bg dark:bg-black/40 border-t border-card-border dark:border-white/5 transition-colors duration-300">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                src="/logo.png" 
                alt={BRAND.name} 
                width={140} 
                height={40} 
                className="h-8 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:brightness-110"
              />
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {BRAND.description} Juntos por um futuro mais sustentável através da economia circular.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">Explorar</h3>
            <ul className="mt-6 space-y-4">
              <li><Link href="/" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-green dark:hover:text-primary-green transition-colors font-medium">Início</Link></li>
              <li><Link href="/sobre-nos" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-green dark:hover:text-primary-green transition-colors font-medium">Sobre Nós</Link></li>
              <li><Link href="/servicos" className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-green dark:hover:text-primary-green transition-colors font-medium">Serviços</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">Contactos</h3>
            <ul className="mt-6 space-y-4 text-base text-gray-600 dark:text-gray-400">
              <li>{CONTACTS.email}</li>
              <li>{CONTACTS.phone}</li>
              <li><Link href="/contactos" className="text-primary-green hover:text-dark-green dark:hover:text-white font-semibold transition-colors">Pedir Orçamento</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">Redes Sociais</h3>
            <div className="mt-6 flex flex-wrap gap-4">
              {CONTACTS.social.map((item) => (
                <a 
                  key={item.name}
                  href={item.url} 
                  className="bg-white dark:bg-primary-green/5 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-primary-green/20 text-gray-400 hover:text-primary-green hover:shadow transition-all"
                  title={item.name}
                >
                  <span className="font-medium text-sm">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-100 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-2">
             <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse"></span>
             <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Ambiente & Reciclagem</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
