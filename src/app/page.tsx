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

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://lovelynight.com.co/#organization',
        name: 'Lovely Night Sleepwear',
        url: 'https://lovelynight.com.co',
        logo: 'https://lovelynight.com.co/imagenes/logo_circular_sin_fondo.png',
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
      <section style={{ padding: '4.5rem 0', backgroundColor: '#fdf6f0', borderBottom: '1px solid rgba(28, 28, 28, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Catálogo de Prendas
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.35rem', color: '#1C1917' }}>
              Nuestras Prendas
            </h2>
          </div>

          {featuredProducts.length > 0 ? (
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
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '3.5rem 1.5rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(28, 28, 28, 0.06)',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.5rem' }}>🌙</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1C1C1C', marginBottom: '0.4rem' }}>
                Próximamente Nueva Colección
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Estamos preparando y subiendo las nuevas prendas exclusivas en satín seda y piel de durazno.
              </p>
              <a
                href="https://wa.me/573000000000?text=Hola%20Lovely%20Night,%20quiero%20conocer%20la%20nueva%20colección"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-boutique-pill"
                style={{ display: 'inline-flex' }}
              >
                Preguntar por WhatsApp
              </a>
            </div>
          )}
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

      {/* 7. CTA DISPERSO #3: GARANTÍA & CONFIANZA */}
      <ConversionBanner type="minimal-solid" />

      {/* 9. ACORDEÓN DE PREGUNTAS FRECUENTES */}
      <section style={{ padding: '5rem 0', backgroundColor: '#fdf6f0' }}>
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
