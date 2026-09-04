'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/icons/WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import { useStoreData } from '@/context/StoreDataContext';

interface ConversionBannerProps {
  type: 'image-lifestyle' | 'minimal-solid' | 'urgent-whatsapp';
  title?: string;
  subtitle?: string;
}

export default function ConversionBanner({ type, title, subtitle }: ConversionBannerProps) {
  const { openCart } = useCart();
  const { products } = useStoreData();
  const sampleProduct = products[0];

  const handleWhatsAppQuickHelp = () => {
    const msg = encodeURIComponent(
      '¡Hola Lovely Night! 🌙 Estoy viendo las pijamas en la web y me gustaría recibir asesoría con mi talla para pedir con Pago Contraentrega.'
    );
    window.open(`https://wa.me/573000000000?text=${msg}`, '_blank');
  };

  if (type === 'image-lifestyle') {
    return (
      <section style={{ padding: '4rem 0', backgroundColor: '#fdf6f0' }}>
        <div className="container">
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#1C1C1C',
              color: '#FFFFFF',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            }}
          >
            {/* Lado Imagen Lifestyle / Marca */}
            <div
              style={{
                height: '380px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--brand-beige, #fdf6f0)',
                padding: '2rem',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/imagenes/logo_circular_sin_fondo.png"
                alt="Lovely Night Medellín"
                style={{
                  maxHeight: '260px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 24px rgba(220, 157, 157, 0.25))',
                }}
              />
            </div>

            {/* Lado Contenido & CTAs */}
            <div style={{ padding: '3rem 2.5rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--accent-sand)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.75rem',
                }}
              >
                <Sparkles size={14} />
                <span>¿Dudas con tu Talla o Estilo?</span>
              </div>

              <h3 style={{ fontSize: '2.2rem', color: '#FFFFFF', lineHeight: 1.2, marginBottom: '1rem', fontWeight: 500 }}>
                {title || 'Asesoría Personalizada y Despachos en 24h'}
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#B0B0B0', lineHeight: 1.6, marginBottom: '2rem' }}>
                {subtitle ||
                  'Nuestras asesoras en Medellín te ayudan a elegir tu talla ideal en satín o piel de durazno. Pagas al recibir en tu puerta sin ningún riesgo.'}
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button onClick={handleWhatsAppQuickHelp} className="btn-boutique-pill-rose" style={{ padding: '0.9rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <WhatsAppOfficialIcon size={18} fill="#FFFFFF" />
                  <span>Asesoría por WhatsApp</span>
                </button>

                <Link href="/mujer" className="btn-boutique-pill-outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF', padding: '0.9rem 1.8rem' }}>
                  <span>Ver Catálogo</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (type === 'urgent-whatsapp') {
    return (
      <section style={{ padding: '3rem 0', backgroundColor: '#fdf6f0' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              border: '1.5px dashed var(--accent-terra)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 16px rgba(194, 125, 110, 0.08)',
            }}
          >
            <div style={{ maxWidth: '540px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-terra)', letterSpacing: '0.08em' }}>
                ⚡ Atención Rápida en Medellín
              </span>
              <h3 style={{ fontSize: '1.45rem', color: '#1C1C1C', margin: '0.25rem 0 0.5rem 0', fontWeight: 600 }}>
                ¿Prefieres hacer tu pedido directamente por WhatsApp?
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Envíanos la foto de la pijama que te gusta y te la enviamos hoy mismo con <strong>Pago Contraentrega</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleWhatsAppQuickHelp}
                className="btn-boutique-pill-rose"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <WhatsAppOfficialIcon size={18} fill="#FFFFFF" />
                <span>Pedir por WhatsApp Ahora</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '3.5rem 0', backgroundColor: '#1C1C1C', color: '#FFFFFF' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-sand)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Garantía de Satisfacción 100%
        </span>
        <h3 style={{ fontSize: '2rem', color: '#FFFFFF', margin: '0.5rem 0 1rem 0', lineHeight: 1.25 }}>
          {title || 'Pide con total tranquilidad y paga en la puerta de tu casa'}
        </h3>
        <p style={{ fontSize: '0.92rem', color: '#A0A0A0', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          {subtitle || 'Envíos rápidos a todo el Valle de Aburrá y ciudades principales de Colombia. Cambios fáciles de talla sin trámites complicados.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/mujer" className="btn-boutique-pill-rose" style={{ padding: '0.85rem 2rem' }}>
            <span>Explorar Catálogo Mujer</span>
            <ArrowRight size={16} />
          </Link>
          <button onClick={openCart} className="btn-boutique-pill-outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF', padding: '0.85rem 2rem' }}>
            <ShoppingBag size={16} />
            <span>Ver Carrito de Compras</span>
          </button>
        </div>
      </div>
    </section>
  );
}
