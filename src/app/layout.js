import "./globals.css";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: BRAND.fullName,
    template: `%s | ${BRAND.name}`
  },
  description: BRAND.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body className="antialiased flex flex-col min-h-screen selection:bg-primary-green/20 selection:text-dark-green font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
