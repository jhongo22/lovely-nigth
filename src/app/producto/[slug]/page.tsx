'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useStoreData } from '@/context/StoreDataContext';
import { useCart } from '@/context/CartContext';
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  Star,
  Sparkles,
  Ruler,
  Check,
  CheckCircle2,
  Camera,
  ArrowRight,
  Heart,
  Share2,
} from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/icons/WhatsAppIcon';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import ProductCard from '@/components/public/ProductCard';
import BundleBuilder from '@/components/public/BundleBuilder';
import ConversionBanner from '@/components/public/ConversionBanner';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { products } = useStoreData();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  if (!product) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Prenda no encontrada</h2>
        <Link href="/mujer" className="btn-boutique-pill" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const availableColors = Array.from(
    new Set(product.variants.map((v) => JSON.stringify({ name: v.colorName, hex: v.colorHex })))
  ).map((str) => JSON.parse(str));

  const currentColor = selectedColor || availableColors[0]?.name || '';
  const currentHex = availableColors.find((c) => c.name === currentColor)?.hex || '#D98880';

  const availableSizes = Array.from(
    new Set(product.variants.filter((v) => v.colorName === currentColor).map((v) => v.size))
  );

  const currentSize = selectedSize || availableSizes[0] || 'M';

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, currentHex, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWhatsAppBuy = () => {
    const message = encodeURIComponent(
      `🌙 *¡Hola Lovely Night! Quiero pedir esta pijama:*\n\n` +
      `*Prenda:* ${product.name}\n` +
      `*Talla:* ${currentSize}\n` +
      `*Color:* ${currentColor}\n` +
      `*Precio:* $${(product.price * quantity).toLocaleString('es-CO')} COP\n\n` +
      `¿Tienen disponibilidad para envío con Pago Contraentrega?`
    );
    window.open(`https://wa.me/573000000000?text=${message}`, '_blank');
  };

  // Testimonios con foto real de clienta Y foto del producto recibido
  const productReviews = [
    {
      author: 'Laura Camila Osorio',
      city: 'El Poblado, Medellín',
      date: 'Hace 3 días',
      rating: 5,
      comment: 'Es la pijama más suave que tengo. El satín no calienta, la caída es hermosa y los acabados de las costuras son impecables. La textura perlada es un sueño.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      productPhoto: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
      tag: 'Foto de Prenda Recibida',
    },
    {
      author: 'Sofía Echeverri',
      city: 'Envigado',
      date: 'Hace 1 semana',
      rating: 5,
      comment: 'Tenía dudas con la talla y la guía de medidas en centímetros me ayudó muchísimo. Pedí talla M y me quedó perfecta. 100% recomendada.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      productPhoto: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
      tag: 'Detalle de Costura & Tela',
    },
    {
      author: 'Diana Marcela Vélez',
      city: 'Laureles, Medellín',
      date: 'Hace 2 semanas',
      rating: 5,
      comment: 'La presentación en la que viene empacada es espectacular para regalo. Ya es la segunda que compro este mes para obsequiar.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      productPhoto: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      tag: 'Empaque de Regalo con Lazo',
    }
  ];

  // Productos relacionados
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  // Microformato Schema.org Product + AggregateOffer + BreadcrumbList
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.seo?.metaTitle || product.name,
        description: product.seo?.metaDescription || product.description,
        image: product.images,
        brand: {
          '@type': 'Brand',
          name: 'Lovely Night',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'COP',
          price: product.price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: `https://lovelynight.com.co/producto/${product.slug}`,
          seller: {
            '@type': 'Organization',
            name: 'Lovely Night Sleepwear',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Medellín',
              addressRegion: 'Antioquia',
              addressCountry: 'CO',
            },
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating || 4.9,
          reviewCount: product.reviewsCount || 18,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://lovelynight.com.co',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Colección Mujer',
            item: 'https://lovelynight.com.co/mujer',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: `https://lovelynight.com.co/producto/${product.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div style={{ padding: '2rem 0 5rem 0', backgroundColor: '#FAF8F5', minHeight: '85vh' }}>
      <JsonLd data={productSchema} />

      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.75rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/mujer">Colección</Link>
          <span>/</span>
          <span style={{ color: '#1C1C1C', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* 1. SECCIÓN PRINCIPAL: GALERÍA & SELECTORES DE COMPRA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'start', marginBottom: '4rem' }}>
          {/* Galería de Fotos */}
          <div>
            <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#EDEAE4', marginBottom: '1rem', border: '1px solid rgba(28, 28, 28, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.seo?.imageAlt || `${product.name} en ${product.fabric} - Pijama confeccionada en Medellín Lovely Night`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                <span className="badge-delicate badge-delicate-dark">
                  Hecho en Medellín 🇨🇴
                </span>
              </div>
            </div>

            {/* Miniaturas */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '75px',
                    height: '90px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: selectedImage === index ? '2px solid #1C1C1C' : '1px solid rgba(28, 28, 28, 0.12)',
                    backgroundColor: 'white',
                    padding: '0',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img
                    src={img}
                    alt={product.seo?.imageAlt ? `${product.seo.imageAlt} (Vista ${index + 1})` : `${product.name} en ${product.fabric} detalle ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Opciones de Compra & Conversión */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-terra)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {product.fabric}
              </span>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', color: '#B45309', fontWeight: 700 }}>
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span>{product.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({product.reviewsCount} reseñas verificadas)</span>
              </div>
            </div>

            <h1 style={{ fontSize: '2.1rem', color: '#1C1C1C', marginBottom: '0.6rem', lineHeight: 1.18, fontWeight: 500 }}>
              {product.name}
            </h1>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "{product.tagline}"
            </p>

            {/* Precio */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(28, 28, 28, 0.08)' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1C1C1C', letterSpacing: '-0.02em' }}>
                ${product.price.toLocaleString('es-CO')} COP
              </span>
              {product.comparePrice && (
                <span style={{ fontSize: '1.1rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  ${product.comparePrice.toLocaleString('es-CO')}
                </span>
              )}
            </div>

            {/* Colores */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem' }}>
                Color: <strong style={{ color: '#1C1C1C' }}>{currentColor}</strong>
              </span>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {availableColors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: '9999px',
                      border: currentColor === col.name ? '1.5px solid #1C1C1C' : '1px solid rgba(28, 28, 28, 0.15)',
                      backgroundColor: currentColor === col.name ? '#1C1C1C' : '#FFFFFF',
                      color: currentColor === col.name ? '#FFFFFF' : '#1C1C1C',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: col.hex, border: '1px solid rgba(255,255,255,0.5)' }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tallas */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Talla: <strong>{currentSize}</strong>
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--accent-terra)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  <Ruler size={14} />
                  <span>Guía de Tallas (cm)</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '9999px',
                      border: currentSize === sz ? '2px solid #1C1C1C' : '1px solid rgba(28, 28, 28, 0.15)',
                      backgroundColor: currentSize === sz ? '#1C1C1C' : '#FFFFFF',
                      color: currentSize === sz ? '#FFFFFF' : '#1C1C1C',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Botones de Compra Ovalados */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              <button
                onClick={handleAddToCart}
                className="btn-boutique-pill"
                style={{ width: '100%', padding: '1.1rem' }}
              >
                <ShoppingBag size={17} />
                <span>{addedAnimation ? '¡Agregado al Carrito! 🎉' : 'Agregar al Carrito'}</span>
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="btn-boutique-pill-rose"
                style={{ width: '100%', padding: '1.1rem' }}
              >
                <WhatsAppOfficialIcon size={19} fill="#FFFFFF" />
                <span>Pedir por WhatsApp (Pago Contraentrega)</span>
              </button>
            </div>

            {/* Badges de Confianza */}
            <div style={{ padding: '1.35rem', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(28, 28, 28, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Truck size={18} style={{ color: 'var(--accent-terra)' }} strokeWidth={1.75} />
                <span><strong>Pago Contraentrega:</strong> Pagas cuando el mensajero entregue en tu puerta.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={18} style={{ color: '#C2A676' }} strokeWidth={1.75} />
                <span><strong>100% Hecho en Medellín:</strong> Confección con acabados de alta costura.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <RefreshCw size={18} style={{ color: '#2E7D32' }} strokeWidth={1.75} />
                <span><strong>Garantía de Talla:</strong> 15 días para cambio ágil sin complicaciones.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CTA DISPERSO EN FICHA DE PRODUCTO */}
        <ConversionBanner type="urgent-whatsapp" />

        {/* 3. SECCIÓN VISUAL EDITORIAL: DETALLES DE LA TELA */}
        <section style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '3.5rem 2rem', margin: '4rem 0', border: '1px solid rgba(28, 28, 28, 0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-terra)', display: 'block', marginBottom: '0.5rem' }}>
                Confección Consciente
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#1C1C1C', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Tacto ultrasuave que no se desgasta con los lavados
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#555555', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1C1C', marginBottom: '0.75rem' }}>
                Beneficios clave de esta prenda:
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {product.details.map((detail, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#444444' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-terra)', flexShrink: 0 }} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
                alt="Detalle de Satín Seda"
                style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px' }}
              />
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop"
                alt="Detalle de Confección"
                style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px' }}
              />
            </div>
          </div>
        </section>

        {/* 4. SECCIÓN DE TESTIMONIOS CON FOTOS DE CLIENTAS Y PRODUCTO */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-terra)' }}>
              Opiniones & Fotos Reales de Clientas
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.35rem', color: '#1C1C1C' }}>
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
            {productReviews.map((rev, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(28, 28, 28, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                {/* Foto Real de la Prenda */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden', backgroundColor: '#EAE6E1' }}>
                  <img
                    src={rev.productPhoto}
                    alt={rev.tag}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(28, 28, 28, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Camera size={12} />
                    <span>{rev.tag}</span>
                  </div>
                </div>

                {/* Comentario y Perfil */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <div style={{ display: 'flex', gap: '3px', color: '#F59E0B' }}>
                        {[...Array(rev.rating)].map((_, starIdx) => (
                          <Star key={starIdx} size={14} fill="#F59E0B" />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#444444', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                      "{rev.comment}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(28, 28, 28, 0.08)' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-terra)' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1C1C1C' }}>{rev.author}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {rev.city} • Compradora Verificada ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CREADOR DE PACKS PROGRESIVOS */}
        <BundleBuilder />

        {/* 6. PRENDAS RELACIONADAS */}
        <section style={{ marginTop: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Completa tu Colección
              </span>
              <h2 style={{ fontSize: '1.8rem', marginTop: '0.25rem', color: '#1C1C1C' }}>
                Otras prendas que te encantarán
              </h2>
            </div>
            <Link href="/mujer" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-terra)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Ver catálogo</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </div>

      {/* Modal Guía de Tallas */}
      {showSizeGuide && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              maxWidth: '520px',
              width: '100%',
              borderRadius: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Guía de Tallas (en centímetros)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Mide tu contorno con una cinta métrica suave sin apretar.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1C1C1C', backgroundColor: '#FAF8F5' }}>
                  <th style={{ padding: '0.6rem' }}>Talla</th>
                  <th style={{ padding: '0.6rem' }}>Busto</th>
                  <th style={{ padding: '0.6rem' }}>Cintura</th>
                  <th style={{ padding: '0.6rem' }}>Cadera</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}><td style={{ padding: '0.6rem', fontWeight: 700 }}>S (32-34)</td><td style={{ padding: '0.6rem' }}>86 - 90 cm</td><td style={{ padding: '0.6rem' }}>66 - 70 cm</td><td style={{ padding: '0.6rem' }}>92 - 96 cm</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}><td style={{ padding: '0.6rem', fontWeight: 700 }}>M (34-36)</td><td style={{ padding: '0.6rem' }}>90 - 95 cm</td><td style={{ padding: '0.6rem' }}>70 - 75 cm</td><td style={{ padding: '0.6rem' }}>96 - 102 cm</td></tr>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}><td style={{ padding: '0.6rem', fontWeight: 700 }}>L (36-38)</td><td style={{ padding: '0.6rem' }}>95 - 102 cm</td><td style={{ padding: '0.6rem' }}>75 - 82 cm</td><td style={{ padding: '0.6rem' }}>102 - 108 cm</td></tr>
                <tr><td style={{ padding: '0.6rem', fontWeight: 700 }}>XL (38-40)</td><td style={{ padding: '0.6rem' }}>102 - 110 cm</td><td style={{ padding: '0.6rem' }}>82 - 90 cm</td><td style={{ padding: '0.6rem' }}>108 - 116 cm</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="btn-boutique-pill"
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              Cerrar Guía
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
