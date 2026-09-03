'use client';

import React, { useState } from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import ProductCard from '@/components/public/ProductCard';
import { Filter, Sparkles } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export default function MujerCatalogPage() {
  const { products } = useStoreData();
  const [selectedFabric, setSelectedFabric] = useState<string>('todos');
  const [selectedSize, setSelectedSize] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'populares' | 'precio-bajo' | 'precio-alto'>('populares');

  const mujerProducts = products.filter((p) => p.category === 'mujer' || p.category === 'combos');

  const filteredProducts = mujerProducts
    .filter((p) => {
      if (selectedFabric !== 'todos' && p.fabric !== selectedFabric) return false;
      if (selectedSize !== 'todos' && !p.variants.some((v) => v.size === selectedSize && v.stock > 0)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'precio-bajo') return a.price - b.price;
      if (sortBy === 'precio-alto') return b.price - a.price;
      return b.rating - a.rating;
    });

  const fabrics = ['Satín Seda', 'Piel de Durazno', 'Tela Polar Térmica'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Colección de Pijamas para Mujer en Medellín | Lovely Night',
    description: 'Catálogo de pijamas para mujer en satín seda, piel de durazno y térmicas con envío contraentrega en Medellín y Colombia.',
    url: 'https://lovelynight.com.co/mujer',
  };

  return (
    <div style={{ padding: '3rem 0', backgroundColor: 'var(--bg-secondary)', minHeight: '80vh' }}>
      <JsonLd data={categorySchema} />
      <div className="container">
        {/* Encabezado SEO */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Colección Femenina
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
            Pijamas para Mujer en Medellín
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Descubre nuestra línea de pijamas camiseras en satín seda, sets frescos de short en piel de durazno y prendas térmicas confortables.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={16} />
              <span>Tela:</span>
            </span>
            <button
              onClick={() => setSelectedFabric('todos')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: selectedFabric === 'todos' ? 'var(--accent-rose)' : 'var(--bg-muted)',
                color: selectedFabric === 'todos' ? 'white' : 'var(--text-secondary)',
              }}
            >
              Todas
            </button>
            {fabrics.map((fabric) => (
              <button
                key={fabric}
                onClick={() => setSelectedFabric(fabric)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: selectedFabric === fabric ? 'var(--accent-rose)' : 'var(--bg-muted)',
                  color: selectedFabric === fabric ? 'white' : 'var(--text-secondary)',
                }}
              >
                {fabric}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, marginRight: '0.4rem' }}>Talla:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              >
                <option value="todos">Todas</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, marginRight: '0.4rem' }}>Ordenar:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              >
                <option value="populares">Más Populares</option>
                <option value="precio-bajo">Precio: Menor a Mayor</option>
                <option value="precio-alto">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grilla de Productos */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              No encontramos prendas con esos filtros específicos. Intenta seleccionando "Todas".
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
