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

  // Si no hay productos en la tienda aún, no renderizar el bundle builder
  if (!p1) {
    return null;
  }

  return (
    <section
      style={{
        padding: '4rem 0',
        backgroundColor: '#fdf6f0',
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
          {packs.map((pack) => {
            const isSelected = selectedPack === pack.id;
            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack.id as 'trio' | 'duo')}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  border: isSelected ? '2px solid #1C1C1C' : '1px solid #E5E7EB',
                  boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Badge flotante */}
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? '#1C1C1C' : '#F3F4F6',
                    color: isSelected ? '#FFFFFF' : '#4B5563',
                    marginBottom: '0.75rem',
                  }}
                >
                  {pack.badge}
                </span>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1C1917', margin: '0 0 0.35rem 0' }}>
                  {pack.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '0 0 1rem 0' }}>{pack.subtitle}</p>

                {/* Precios */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1C1C1C' }}>
                    ${pack.price.toLocaleString('es-CO')}
                  </span>
                  <span style={{ fontSize: '0.95rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                    ${pack.oldPrice.toLocaleString('es-CO')}
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#15803D', backgroundColor: '#DCFCE7', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                    {pack.tag}
                  </span>
                </div>

                <span style={{ fontSize: '0.8rem', color: '#57534E', fontWeight: 600, display: 'block', marginBottom: '1.25rem' }}>
                  Sale a solo <strong style={{ color: '#1C1917' }}>{pack.unitPrice}</strong> cada pijama
                </span>

                {/* Beneficios */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {pack.perks.map((perk, i) => (
                    <li key={i} style={{ fontSize: '0.8rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Check size={14} style={{ color: '#15803D', flexShrink: 0 }} strokeWidth={2.5} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* Botón selector */}
                <div
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: isSelected ? '#1C1C1C' : '#F3F4F6',
                    color: isSelected ? '#FFFFFF' : '#374151',
                    transition: 'all 0.2s',
                  }}
                >
                  {isSelected ? '✓ Paquete Seleccionado' : 'Elegir este Paquete'}
                </div>
              </div>
            );
          })}
        </div>

        {/* PRENDAS INCLUIDAS EN ESTA OFERTA */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1C1917' }}>
              Prendas combinadas en tu paquete ({current.itemsCount} unidades):
            </span>
            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              * Puedes coordinar tallas exactas al confirmar por WhatsApp
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: '1rem' }}>
            {(current.itemsCount === 3 ? [p1, p2, p3] : [p1, p2]).map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#fdf6f0',
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ aspectRatio: '1 / 1.15', overflow: 'hidden', backgroundColor: '#EDEAE4' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.images?.[0] || '/imagenes/logo_circular_sin_fondo.png'}
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
