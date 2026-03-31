import Link from 'next/link';
import { BRAND } from "@/constants/brand";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Sobre Nós", href: "/sobre-nos" },
    { label: "Serviços", href: "/servicos" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <Container>
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-dark-green tracking-tight">
              20<span className="text-primary-green">recolher</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-gray-600 hover:text-primary-green font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contactos" 
              className="bg-primary-green text-white px-6 py-2.5 rounded-xl hover:bg-dark-green transition-all font-semibold shadow-sm hover:shadow-md"
            >
              Contactos
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-700 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
