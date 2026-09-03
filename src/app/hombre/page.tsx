'use client';

import React from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import ProductCard from '@/components/public/ProductCard';
import JsonLd from '@/components/seo/JsonLd';

export default function HombrePage() {
  const { products } = useStoreData();
  const menProducts = products.filter((p) => p.category === 'hombre');

  return (
    <div style={{ padding: '3rem 0', backgroundColor: 'var(--bg-secondary)', minHeight: '80vh' }}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Pijamas y Ropa de Descanso para Hombre en Medellín | Lovely Night',
          description: 'Pijamas masculinas en 100% Algodón Pima de corte sobrio y máxima frescura. Envíos con pago contraentrega en Medellín y toda Colombia.',
          url: 'https://lovelynight.com.co/hombre',
        }}
      />
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-navy)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Línea Masculina • Loungewear
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
            Pijamas y Pantalones de Descanso para Hombre
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Diseñadas con 100% Algodón Pima de fibra larga para brindar frescura ergonómica sin estampados infantiles.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {menProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
