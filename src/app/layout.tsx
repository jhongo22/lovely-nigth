import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import '@/styles/admin.css';
import { StoreDataProvider } from '@/context/StoreDataContext';
import { CartProvider } from '@/context/CartContext';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import CartDrawer from '@/components/public/CartDrawer';
import WhatsAppFloating from '@/components/public/WhatsAppFloating';
import Footer from '@/components/public/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lovelynight.com.co'),
  title: {
    default: 'Lovely Night | Pijamas de Satín Seda y Loungewear en Medellín',
    template: '%s | Lovely Night Sleepwear',
  },
  description:
    'Tienda online de pijamas de satín seda, conjuntos en piel de durazno, prendas térmicas y box de regalo en Medellín y Colombia. Envíos rápidos y Pago Contraentrega.',
  keywords: [
    'pijamas mujer medellin',
    'pijamas de satin colombia',
    'pijamas contraentrega medellin',
    'ropa de descanso mujer',
    'box de regalo pijamas',
    'pijamas termicas dama',
    'lovely night sleepwear',
  ],
  authors: [{ name: 'Lovely Night Sleepwear' }],
  creator: 'Lovely Night',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://lovelynight.com.co',
    siteName: 'Lovely Night Sleepwear',
    title: 'Lovely Night | Pijamas de Satín Seda y Ropa de Descanso',
    description:
      'Descubre la suavidad y elegancia de nuestras pijamas camiseras en satín seda y piel de durazno. Envíos a todo Colombia con Pago Contraentrega.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Pijamas de Satín Seda Lovely Night',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lovely Night | Pijamas de Satín Seda y Loungewear',
    description:
      'Pijamas suaves y elegantes para tus noches de descanso en Medellín y Colombia.',
    images: ['https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop'],
  },
  alternates: {
    canonical: 'https://lovelynight.com.co',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body>
        <StoreDataProvider>
          <CartProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <AnnouncementBar />
              <Navbar />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppFloating />
            </div>
          </CartProvider>
        </StoreDataProvider>
      </body>
    </html>
  );
}
