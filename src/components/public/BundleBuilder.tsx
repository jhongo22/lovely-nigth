'use client';

import React, { useState } from 'react';
import { ShoppingBag, Flame, Check, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/icons/WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import { useStoreData } from '@/context/StoreDataContext';

export default function BundleBuilder() {
  const { products } = useStoreData();
  const { addToCart, openCart } = useCart();
  const [selectedPack, setSelectedPack] = useState<'trio' | 'duo'>('trio');

  // Tomar productos reales disponibles
  const elegibles = products.filter((p) => !p.isCombo).slice(0, 3);
  const p1 = elegibles[0] || products[0];
  const p2 = elegibles[1] || products[1] || p1;
  const p3 = elegibles[2] || products[2] || p1;

  // Ofertas claras y directas
  const packs = [
    {
      id: 'trio',
      badge: '🔥 MÁS VENDIDO EN MEDELLÍN',
      title: 'Lleva 3 Pijamas con 20% DTO',
      subtitle: 'Combina estilos favoritos • Envío GRATIS hoy',
      tag: 'Ahorras $54.000 COP',
      price: 219900,
      oldPrice: 274000,
      unitPrice: '$73.300 c/u',
      freeShipping: true,
      itemsCount: 3,
      perks: [
        'Envío GRATIS a Medellín y toda Colombia',
        'Pago Contraentrega (Pagas al recibir en casa)',
        'Puedes escoger tus 3 tallas favoritas por WhatsApp',
      ],
      whatsappMsg: 'Hola Lovely Night! Quiero aprovechar la promo de 3 Pijamas con 20% DTO por $219.900 y envío gratis contraentrega',
    },
    {
      id: 'duo',
      badge: '✨ PACK DÚO BÁSICO',
      title: 'Lleva 2 Pijamas con 15% DTO',
      subtitle: 'Ideales para renovar tu descanso',
      tag: 'Ahorras $28.000 COP',
      price: 159900,
      oldPrice: 188000,
      unitPrice: '$79.950 c/u',
      freeShipping: true,
      itemsCount: 2,
      perks: [
        'Envío GRATIS inmediato',
        'Pago Contraentrega en efectivo o transferencia',
        'Confección 100% Medellín',
      ],
      whatsappMsg: 'Hola Lovely Night! Quiero el Pack de 2 Pijamas con 15% DTO por $159.900 con pago contraentrega',
    },
  ];

  const current = packs.find((p) => p.id === selectedPack) || packs[0];

  const handleBuyCart = () => {
    // Añadir prendas al carrito con el descuento aplicado
    const count = current.itemsCount;
    const unitPriceCalculated = Math.round(current.price / count);
    const selectedProds = count === 3 ? [p1, p2, p3] : [p1, p2];

    selectedProds.forEach((prod) => {
      const v = prod.variants?.[0] || { size: 'M', colorName: 'Rose Mauve', colorHex: '#D98880' };
      addToCart(
        {
          ...prod,
          price: unitPriceCalculated,
        },
        v.size || 'M',
        v.colorName || 'Tono Clásico',
        v.colorHex || '#D98880',
        1
      );
    });

    openCart();
  };

  const handleWhatsAppBuy = () => {
    const url = `https://wa.me/573000000000?text=${encodeURIComponent(current.whatsappMsg)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      style={{
        padding: '4rem 0',
        backgroundColor: '#FAF8F5',
        borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
      }}
    >
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* ENCABEZADO PERSUASIVO Y DIRECTO AL GRANO */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            <Flame size={15} />
            <span>Oferta por Tiempo Limitado • Medellín</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              color: '#1C1917',
              margin: '0.2rem 0',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Lleva Más y Paga Menos
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#57534E', margin: '0.4rem 0 0 0' }}>
            Descuento automático en tu compra + <strong>Envío Gratis</strong> con <strong>Pago Contraentrega</strong>
          </p>
        </div>

        {/* SELECTOR RÁPIDO DE PAQUETE */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          {packs.map((p) => {
            const isSelected = selectedPack === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPack(p.id as any)}
                style={{
                  position: 'relative',
                  backgroundColor: isSelected ? '#FFFFFF' : '#F7F5F0',
                  border: isSelected ? '2.5px solid #1C1917' : '1.5px solid #E5E7EB',
                  borderRadius: '16px',
                  padding: '1.75rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.08)' : 'none',
                  transform: isSelected ? 'translateY(-3px)' : 'none',
                }}
              >
                {/* Badge flotante */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '16px',
                    backgroundColor: isSelected ? '#1C1917' : '#78716C',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                  }}
                >
                  {p.badge}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1917', margin: 0 }}>
                      {p.title}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#78716C' }}>{p.subtitle}</span>
                  </div>

                  <span
                    style={{
                      backgroundColor: '#DCFCE7',
                      color: '#15803D',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* Precios visuales con alto contraste */}
                <div style={{ margin: '1.25rem 0', display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
                  <span style={{ fontSize: '2.1rem', fontWeight: 900, color: '#1C1917', fontFamily: 'var(--font-sans)' }}>
                    ${p.price.toLocaleString('es-CO')}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                    ${p.oldPrice.toLocaleString('es-CO')}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', marginLeft: 'auto' }}>
                    {p.unitPrice}
                  </span>
                </div>

                {/* Beneficios clave con chulitos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px solid #F3F4F6', paddingTop: '1rem' }}>
                  {p.perks.map((perk, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#44403C' }}>
                      <Check size={14} style={{ color: '#16A34A', flexShrink: 0 }} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* VISTA PREVIA VISUAL DE PRENDAS INCLUIDAS */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#1C1917', letterSpacing: '0.06em' }}>
              👗 Prendas de referencia en tu paquete:
            </span>
            <span style={{ fontSize: '0.78rem', color: '#15803D', fontWeight: 700 }}>
              ✓ Confección premium 100% Medellín
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${selectedPack === 'trio' ? 3 : 2}, 1fr)`,
              gap: '1rem',
            }}
          >
            {(selectedPack === 'trio' ? [p1, p2, p3] : [p1, p2]).map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#FAF8F5',
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ aspectRatio: '1 / 1.15', overflow: 'hidden', backgroundColor: '#EDEAE4' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600'}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#9E6A5A' }}>
                    Prenda #{idx + 1} • {item.fabric}
                  </span>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1C1917', margin: '0.15rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* BOTONES DE COMPRA INMEDIATA (ACTIVADORES DE VENTA) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              {/* Botón WhatsApp Directo (El preferido en Medellín) */}
              <button
                type="button"
                onClick={handleWhatsAppBuy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '1.05rem 1.5rem',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease',
                }}
              >
                <WhatsAppOfficialIcon size={22} fill="#FFFFFF" />
                <span>Pedir Pack por WhatsApp (Contraentrega)</span>
              </button>

              {/* Botón Carrito Web */}
              <button
                type="button"
                onClick={handleBuyCart}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '1.05rem 1.5rem',
                  backgroundColor: '#1C1917',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s ease',
                }}
              >
                <ShoppingBag size={20} />
                <span>Comprar Pack en la Web (${current.price.toLocaleString('es-CO')})</span>
              </button>
            </div>

            {/* Sellos de Confianza Rápidos */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem',
                fontSize: '0.78rem',
                color: '#57534E',
                fontWeight: 600,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Truck size={15} style={{ color: '#16A34A' }} /> Entrega en 24h en Medellín
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={15} style={{ color: '#16A34A' }} /> Pagas al mensajero en la puerta
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={15} style={{ color: '#EAB308' }} /> Garantía total de cambio de talla
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
