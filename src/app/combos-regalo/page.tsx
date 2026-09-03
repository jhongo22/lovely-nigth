'use client';

import React from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import ProductCard from '@/components/public/ProductCard';
import JsonLd from '@/components/seo/JsonLd';
import { Gift, Sparkles, Heart } from 'lucide-react';

export default function CombosRegaloPage() {
  const { products } = useStoreData();
  const comboProducts = products.filter((p) => p.isCombo || p.subCategory === 'box-regalo');

  return (
    <div style={{ padding: '3rem 0', backgroundColor: 'var(--bg-secondary)', minHeight: '80vh' }}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Boxes de Regalo y Dúo Packs de Pijamas en Medellín | Lovely Night',
          description: 'Regala cajas de lujo con pijamas de satín, antifaz acolchado y scrunchies. Ahorra con nuestros Dúo Packs con envío gratis en Colombia.',
          url: 'https://lovelynight.com.co/combos-regalo',
        }}
      />
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(217, 136, 128, 0.15)',
              color: 'var(--accent-rose-dark)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Gift size={14} />
            <span>Detalles que Enamoran</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Boxes de Regalo & Dúo Packs de Ahorro
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            El obsequio perfecto para cumpleaños, aniversarios o simplemente para consentirte. Cada caja incluye empaque rígido de lujo, lazo de satín y tarjeta personalizada lista para entregar.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {comboProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
