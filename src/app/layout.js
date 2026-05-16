import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import config from '@/data/config.json';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />

        {/* Sticky Contact Bar for Mobile [cite: 25] */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 grid grid-cols-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-50">
          <a href={`tel:${config.contact.call}`} className="bg-blue-600 text-white p-4 text-center font-bold text-sm">
            📞 Call Now [cite: 25]
          </a>
          <a href={`https://wa.me/${config.contact.whatsapp}`} className="bg-green-500 text-white p-4 text-center font-bold text-sm">
            💬 WhatsApp [cite: 25]
          </a>
        </div>
      </body>
    </html>
  );
}