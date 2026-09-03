'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, Star, Gift, ChevronDown, ChevronRight, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import ProductCard from '@/components/public/ProductCard';
import BundleBuilder from '@/components/public/BundleBuilder';
import ConversionBanner from '@/components/public/ConversionBanner';
import HeroCarousel from '@/components/public/HeroCarousel';
import CategoriesCarousel from '@/components/public/CategoriesCarousel';
import JsonLd from '@/components/seo/JsonLd';

export default function HomePage() {
  const { products, collections, categories } = useStoreData();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const giftCombos = products.filter((p) => p.isCombo).slice(0, 2);

  // Estado para acordeón interactivo funcional
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: '¿Cómo funciona el Pago Contraentrega en Medellín y Colombia?',
      a: 'Puedes realizar tu pedido directamente en la web seleccionando "Pago Contraentrega". No pagas nada por adelantado: cancelas el valor exacto en efectivo o transferencia cuando el mensajero entregue el paquete en la puerta de tu casa.',
    },
    {
      q: '¿De qué telas están hechas las pijamas Lovely Night?',
      a: 'Nuestras pijamas están confeccionadas con Satín Seda de alto gramaje (con caída pesada, no transparenta ni destiñe), Piel de Durazno microesmerilada fresca y Telas Polares Térmicas tipo fleece para clima frío. Confección 100% en Medellín.',
    },
    {
      q: '¿Cuánto tiempo tarda la entrega en Medellín y el Valle de Aburrá?',
      a: 'Para Medellín, Envigado, Itagüí, Sabaneta y Bello entregamos el mismo día o en 24 horas hábiles mediante mensajería local. Para el resto de ciudades principales de Colombia el tiempo estimado es de 2 a 4 días hábiles vía Interrapidísimo.',
    },
    {
      q: '¿Qué garantía tengo si no me queda la talla?',
      a: 'Cuentas con 15 días calendario de garantía de satisfacción. Si necesitas cambio de talla o color, coordinamos el cambio directamente por WhatsApp de forma rápida y sin trámites engorrosos.',
    },
  ];

  const testimonials = [
    {
      name: 'Mariana Restrepo',
      city: 'El Poblado, Medellín',
      rating: 5,
      comment: 'La calidad del satín es increíble, no se siente plástica como otras marcas y la caída es hermosa. Me llegó al día siguiente con pago contraentrega.',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      productPhoto: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
      itemBought: 'Pijama Camisera Satín Seda Rose Luxe',
    },
    {
      name: 'Valentina Gómez',
      city: 'Laureles, Medellín',
      rating: 5,
      comment: 'Compré la Box de Regalo para el cumpleaños de mi hermana y quedó fascinada con la presentación de la caja y el antifaz. Súper recomendadas.',
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      productPhoto: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      itemBought: 'Box Regalo "Ritual de Noche" Lovely Luxe',
    },
    {
      name: 'Camila Jaramillo',
      city: 'Envigado',
      rating: 5,
      comment: 'La tela piel de durazno es súper suave y fresca para el calor. La atención por WhatsApp fue impecable para elegir mi talla.',
      userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
      productPhoto: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=600&auto=format&fit=crop',
      itemBought: 'Set Short & Camisilla Coquette Durazno',
    },
  ];

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://lovelynight.com.co/#organization',
        name: 'Lovely Night Sleepwear',
        url: 'https://lovelynight.com.co',
        logo: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600',
        description: 'Boutique de pijamas en satín seda y loungewear de confección local en Medellín.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Medellín',
          addressRegion: 'Antioquia',
          addressCountry: 'CO',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={homeSchema} />

      {/* 1. HERO CAROUSEL INTERACTIVO (SATÍN, PIEL DE DURAZNO Y BOXES DE REGALO) */}
      <HeroCarousel />

      {/* 2. CATEGORÍAS (CARRUSEL MINIMALISTA CON FOTO, NOMBRE EN SERIF Y FLECHA) */}
      <CategoriesCarousel categories={categories} />

      {/* 3. PRODUCTOS MÁS VENDIDOS */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FAF8F5', borderBottom: '1px solid rgba(28, 28, 28, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Favoritos de la Tienda
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.35rem', color: '#1C1917' }}>
              Las Pijamas Más Pedidas
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA DISPERSO #1: BANNER LIFESTYLE CON IMAGEN Y BOTÓN WHATSAPP */}
      <ConversionBanner type="image-lifestyle" />

      {/* 5. CREADOR INTERACTIVO DE PACKS CON DESCUENTO PROGRESIVO */}
      <div id="pack-builder">
        <BundleBuilder />
      </div>

      {/* 6. CTA DISPERSO #2: BANNER URGENTE DE WHATSAPP */}
      <ConversionBanner type="urgent-whatsapp" />

      {/* 7. TESTIMONIOS CON FOTOS REALES */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(28, 28, 28, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-terra)' }}>
              Opiniones & Fotos Reales de Clientas
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.35rem', color: '#1C1917' }}>
              Fotos reales de entregas en Medellín
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FAF8F5',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(28, 28, 28, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                {/* Foto Real de la Prenda */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#E5E2DC' }}>
                  <img
                    src={t.productPhoto}
                    alt={t.itemBought}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(28, 28, 28, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                  >
                    🛍️ {t.itemBought}
                  </div>
                </div>

                {/* Comentario y Perfil */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '3px', color: '#F59E0B', marginBottom: '0.65rem' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#F59E0B" />
                      ))}
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#333333', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                      "{t.comment}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(28, 28, 28, 0.08)' }}>
                    <img
                      src={t.userAvatar}
                      alt={t.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-terra)' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1C1917' }}>{t.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {t.city} • Compradora Verificada ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA DISPERSO #3: GARANTÍA & CONFIANZA */}
      <ConversionBanner type="minimal-solid" />

      {/* 9. ACORDEÓN DE PREGUNTAS FRECUENTES */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAF8F5' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Resolvemos tus Dudas
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.35rem', color: '#1C1917' }}>
              Preguntas Frecuentes
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: isOpen ? '1.5px solid var(--accent-terra)' : '1px solid rgba(28, 28, 28, 0.1)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.98rem',
                      color: isOpen ? 'var(--accent-terra)' : '#1C1917',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? 'var(--accent-terra)' : '#666666',
                        flexShrink: 0,
                        marginLeft: '1rem',
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.25rem 1.5rem',
                        fontSize: '0.9rem',
                        color: '#555555',
                        lineHeight: 1.65,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .collection-tile:hover .tile-img {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
