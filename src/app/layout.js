import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BRAND } from "@/constants/brand";

export const metadata = {
  title: {
    default: BRAND.fullName,
    template: `%s | ${BRAND.name}`
  },
  description: BRAND.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="antialiased flex flex-col min-h-screen selection:bg-primary-green/20 selection:text-dark-green">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
