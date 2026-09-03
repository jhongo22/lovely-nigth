'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { Product } from '@/types/store';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const mainVariant = product.variants[0] || { size: 'S', colorName: 'Natural', colorHex: '#D98880' };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, mainVariant.size, mainVariant.colorName, mainVariant.colorHex, 1);
  };

  const discountPercentage = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(28, 28, 28, 0.08)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
      }}
      className="boutique-product-card"
    >
      {/* Contenedor de Imagen */}
      <Link
        href={`/producto/${product.slug}`}
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#EFECE6',
          display: 'block',
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="product-tile-image"
          loading="lazy"
        />

        {/* ETIQUETAS DECORATIVAS TIPO BADGE / CÁPSULA */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
          {product.badges?.map((badge) => (
            <div
              key={badge}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                backgroundColor: badge === 'BESTSELLER' ? '#1C1C1C' : '#FFFFFF',
                color: badge === 'BESTSELLER' ? '#FFFFFF' : 'var(--accent-terra)',
                border: badge === 'BESTSELLER' ? '1px solid #1C1C1C' : '1px solid rgba(194, 125, 110, 0.3)',
              }}
            >
              {badge === 'BESTSELLER' && <Sparkles size={11} style={{ color: 'var(--accent-sand)' }} />}
              <span>{badge}</span>
            </div>
          ))}

          {discountPercentage > 0 && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                backgroundColor: '#B87363',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(184, 115, 99, 0.35)',
              }}
            >
              <Tag size={11} />
              <span>-{discountPercentage}% DTO</span>
            </div>
          )}
        </div>

        {/* Botón flotante 'Agregar Rápido' */}
        <button
          onClick={handleQuickAdd}
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            backgroundColor: 'rgba(28, 28, 28, 0.95)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '0.75rem',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.78rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.25s ease',
          }}
          className="quick-add-strip"
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingBag size={14} style={{ color: 'var(--accent-sand)' }} />
          <span>Agregar al Carrito</span>
        </button>
      </Link>

      {/* Info Prenda */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-terra)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {product.fabric}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', color: '#1C1C1C', fontWeight: 700 }}>
              <Star size={12} fill="#F59E0B" color="#F59E0B" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link href={`/producto/${product.slug}`}>
            <h3
              style={{
                fontSize: '1.02rem',
                fontWeight: 600,
                color: '#1C1C1C',
                marginBottom: '0.35rem',
                lineHeight: 1.3,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {product.name}
            </h3>
          </Link>
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          {/* Swatches de Color */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '0.75rem', alignItems: 'center' }}>
            {Array.from(new Set(product.variants.map((v) => v.colorHex))).map((hex, i) => (
              <span
                key={i}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: hex,
                  border: '1.5px solid #FFFFFF',
                  boxShadow: '0 0 0 1px rgba(28, 28, 28, 0.15)',
                  display: 'inline-block',
                }}
              />
            ))}
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
              {product.variants.length} tonos
            </span>
          </div>

          {/* Precio */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.18rem', fontWeight: 800, color: '#1C1C1C' }}>
              ${product.price.toLocaleString('es-CO')}
            </span>
            {product.comparePrice && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                ${product.comparePrice.toLocaleString('es-CO')}
              </span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .boutique-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
        }
        .boutique-product-card:hover .product-tile-image {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
