'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryItem } from '@/types/store';

interface CategoriesCarouselProps {
  categories: CategoryItem[];
}

export default function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  if (!categories || categories.length === 0) {
    return null;
  }

  const total = categories.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    
    // Calcular índice aproximado
    const itemWidth = 320; // Ancho aproximado de tarjeta + gap
    const index = Math.min(Math.max(1, Math.round(scrollLeft / itemWidth) + 1), total);
    setCurrentIndex(index);
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '3.5rem 0 4rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(28, 28, 28, 0.08)' }}>
      <div className="container">
        {/* Encabezado: "Categorías" con Serif clásica y enlace "Ver todo" subrayado */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: '#1C1917',
              margin: 0,
            }}
          >
            Categorías
          </h2>

          <Link
            href="/mujer"
            style={{
              fontSize: '0.92rem',
              color: '#1C1917',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              fontWeight: 500,
              fontFamily: 'var(--font-serif)',
            }}
          >
            Ver todo
          </Link>
        </div>

        {/* Carrusel Deslizable Horizontal */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="categories-scroll-container"
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '1rem',
          }}
        >
          {categories.map((cat) => {
            const href = cat.slug.startsWith('/') ? cat.slug : `/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={href}
                className="category-card-item"
                style={{
                  flex: '0 0 280px',
                  scrollSnapAlign: 'start',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#F7F7F7',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Contenedor de la Foto (aspect ratio limpio de catálogo) */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1.15',
                    backgroundColor: '#EDEAE4',
                    overflow: 'hidden',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      className="cat-card-img"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fdf6f0',
                        padding: '1.5rem',
                      }}
                    >
                      <img
                        src="/imagenes/logo_circular_sin_fondo.png"
                        alt={cat.name}
                        style={{ width: '80px', height: '80px', objectFit: 'contain', opacity: 0.9 }}
                      />
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-pink, #dc9d9d)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {cat.fabric || 'Colección'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pie de Tarjeta Minimalista: Título en Serif con Flecha -> */}
                <div
                  style={{
                    padding: '1.25rem 1rem',
                    backgroundColor: '#F7F7F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '0.65rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      fontWeight: 500,
                      color: '#1C1917',
                    }}
                  >
                    {cat.name}
                  </span>
                  <ArrowRight size={17} strokeWidth={1.5} style={{ color: '#1C1917' }} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Paginador Inferior Central: < 1/6 > exactamente como en la foto */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginTop: '1.5rem',
          }}
        >
          <button
            onClick={scrollPrev}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#57534E',
              padding: '0.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
            }}
            aria-label="Anterior categoría"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          <span
            style={{
              fontSize: '0.82rem',
              color: '#57534E',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            {currentIndex}/{total}
          </span>

          <button
            onClick={scrollNext}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#57534E',
              padding: '0.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
            }}
            aria-label="Siguiente categoría"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .categories-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .category-card-item:hover .cat-card-img {
          transform: scale(1.04);
        }
        .category-card-item:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }
        @media (min-width: 768px) {
          .category-card-item {
            flex: 0 0 310px !important;
          }
        }
      `}</style>
    </section>
  );
}
