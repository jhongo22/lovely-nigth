'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, Star, Sparkles, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { Product } from '@/types/store';

export default function HeroCarousel() {
  const { products } = useStoreData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Filtrar productos destacados o con imágenes válidas
  // Priorizar los que están marcados como featured y tienen foto
  const candidateProducts = products.filter((p) => p.images && p.images.length > 0);
  const featuredProducts = candidateProducts.filter((p) => p.featured);
  const heroProducts: Product[] = featuredProducts.length >= 2 ? featuredProducts.slice(0, 5) : candidateProducts.slice(0, 5);

  // Slides dinámicos generados directamente de los productos de la dueña
  const slides = heroProducts.map((prod, idx) => {
    // Definir enlace al producto
    const productLink = prod.isCombo ? '/combos-regalo' : `/producto/${prod.slug}`;
    const categoryLink = prod.isCombo 
      ? '/combos-regalo' 
      : prod.fabric.toLowerCase().includes('satin') 
      ? '/mujer/satin' 
      : prod.fabric.toLowerCase().includes('durazno') 
      ? '/mujer/piel-de-durazno' 
      : '/mujer';

    return {
      id: prod.id || `prod-${idx}`,
      badge: prod.badges?.[0] ? `${prod.badges[0]} • ${prod.fabric}` : `Nueva Colección • ${prod.fabric}`,
      title: prod.name,
      subtitle: prod.tagline || prod.description || 'Prenda exclusiva confeccionada en Medellín con telas seleccionadas de tacto delicado. Pide con pago contraentrega.',
      ctaText: `Ver ${prod.fabric}`,
      ctaLink: categoryLink,
      secondaryCtaText: 'Ver Catálogo Completo',
      secondaryCtaLink: '/mujer',
      image: prod.images[0],
      tag: prod.fabric ? `✨ ${prod.fabric}` : 'Hecho en Medellín 🇨🇴',
      overlayBadge: prod.comparePrice 
        ? `🔥 OFERTA • Ahorras $${(prod.comparePrice - prod.price).toLocaleString('es-CO')}` 
        : `✨ Calidad Garantizada`,
      overlayButtonText: `Comprar por $${prod.price.toLocaleString('es-CO')}`,
      overlayButtonLink: productLink,
    };
  });

  // Fallback si la tienda apenas se está creando y no tiene productos aún
  const finalSlides = slides.length > 0 ? slides : [
    {
      id: 'fallback-1',
      badge: 'Boutique Oficial • Medellín',
      title: 'Pijamas en satín seda que abrazan tu piel con delicadeza.',
      subtitle: 'Confección 100% en Medellín con telas de alto gramaje y acabados finos. Próximamente nuevas prendas disponibles con Pago Contraentrega.',
      ctaText: 'Asesoría por WhatsApp',
      ctaLink: 'https://wa.me/573000000000?text=Hola%20Lovely%20Night,%20quiero%20conocer%20la%20nueva%20colección',
      secondaryCtaText: 'Ver Catálogo',
      secondaryCtaLink: '/mujer',
      image: '/imagenes/logo_circular_sin_fondo.png',
      tag: 'Hecho en Medellín 🇨🇴',
      overlayBadge: '🌙 Dulces Sueños • Lovely Night',
      overlayButtonText: 'Pedir por WhatsApp',
      overlayButtonLink: 'https://wa.me/573000000000',
    },
  ];

  const totalSlides = finalSlides.length;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const slide = finalSlides[currentSlide] || finalSlides[0];

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#fdf6f0',
        borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
        overflow: 'hidden',
        width: '100%',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
        className="hero-wrapper-desktop"
      >
        {/* 1. CONTENEDOR DE LA IMAGEN REAL DE PRODUCTO */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '520px',
            backgroundColor: '#EDEAE4',
            overflow: 'hidden',
          }}
          className="hero-img-col-desktop"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`img-${slide.id}`}
            src={slide.image}
            alt={slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block',
              transition: 'opacity 0.5s ease',
            }}
          />

          {/* Gradiente sutil */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Badge Superior Izquierdo con la tela de la prenda */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '9999px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              color: '#1C1C1C',
              zIndex: 10,
            }}
          >
            {slide.tag}
          </div>

          {/* Controles de navegación si hay más de 1 prenda */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Prenda anterior"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '12px',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(28, 28, 28, 0.12)',
                  color: '#1C1C1C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  zIndex: 20,
                }}
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Siguiente prenda"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '12px',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(28, 28, 28, 0.12)',
                  color: '#1C1C1C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  zIndex: 20,
                }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* BOTÓN CONTEXTUAL ADENTRO DE LA FOTO DEL PRODUCTO */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '18px',
              right: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              zIndex: 10,
            }}
          >
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              }}
            >
              {slide.overlayBadge}
            </span>

            <Link
              href={slide.overlayButtonLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#1C1C1C',
                fontSize: '0.88rem',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                maxWidth: '320px',
              }}
            >
              <ShoppingBag size={16} />
              <span>{slide.overlayButtonText}</span>
            </Link>
          </div>
        </div>

        {/* 2. TEXTOS EDITORIALES EXTRAÍDOS DEL PRODUCTO DE LA DUEÑA */}
        <div
          style={{
            padding: '2.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '640px',
            margin: '0 auto',
          }}
          className="hero-text-col-desktop"
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-terra)',
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={13} />
            <span>{slide.badge}</span>
          </div>

          <h1
            key={`title-${slide.id}`}
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
              fontFamily: 'var(--font-serif)',
              color: '#1C1C1C',
              marginBottom: '1rem',
              lineHeight: 1.14,
              fontWeight: 600,
            }}
          >
            {slide.title}
          </h1>

          <p
            key={`desc-${slide.id}`}
            style={{
              fontSize: '0.98rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
            }}
          >
            {slide.subtitle}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <Link href={slide.overlayButtonLink} className="btn-boutique-pill">
              <span>Comprar Ahora • Pago Contraentrega</span>
            </Link>

            <Link
              href={slide.ctaLink}
              className="btn-boutique-pill-outline"
            >
              <span>{slide.ctaText}</span>
            </Link>
          </div>

          {/* Badges de Confianza Medellín */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(28, 28, 28, 0.08)',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={16} strokeWidth={2} style={{ color: 'var(--accent-terra)' }} />
              <span>Entrega 24h Medellín</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} strokeWidth={2} style={{ color: '#dbbb92' }} />
              <span>Telas No Transparentan</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={15} fill="#F59E0B" color="#F59E0B" />
              <span>4.9/5 Calificación</span>
            </div>
          </div>

          {/* Paginadores (Dots) */}
          {totalSlides > 1 && (
            <div style={{ display: 'flex', gap: '0.45rem', marginTop: '1.5rem', alignItems: 'center' }}>
              {finalSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir al slide ${idx + 1}`}
                  style={{
                    width: currentSlide === idx ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: currentSlide === idx ? '#1C1C1C' : '#D1D5DB',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 860px) {
          .hero-wrapper-desktop {
            flex-direction: row !important;
            min-height: 82vh;
            align-items: stretch;
          }

          .hero-img-col-desktop {
            order: 2;
            width: 52% !important;
            height: auto !important;
            min-height: 100%;
          }

          .hero-text-col-desktop {
            order: 1;
            width: 48% !important;
            padding: 4.5rem 3.5rem !important;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
