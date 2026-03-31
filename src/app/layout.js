import "./globals.css";
import { Geist, Geist_Mono, Quicksand, Nunito } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BRAND } from "@/constants/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: BRAND.fullName,
    template: `%s | ${BRAND.name}`
  },
  description: BRAND.description,
  metadataBase: new URL('https://20recolher.pt'), // Substituir pelo domínio final quando disponível
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: BRAND.fullName,
    description: BRAND.description,
    url: 'https://20recolher.pt',
    siteName: BRAND.name,
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: '/logo.png', // Usar og-image.png no futuro para melhor aspeto
        width: 1200,
        height: 630,
        alt: BRAND.fullName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND.fullName,
    description: BRAND.description,
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} ${nunito.variable}`}>
      <body className="antialiased flex flex-col min-h-screen selection:bg-primary-green/20 selection:text-dark-green font-body bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
