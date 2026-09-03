'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useStoreData } from '@/context/StoreDataContext';
import ProductCard from '@/components/public/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export default function SubCategoriaMujerPage() {
  const params = useParams();
  const categoriaSlug = params.categoria as string;
  const { products } = useStoreData();

  const getSubCategoryDetails = () => {
    switch (categoriaSlug) {
      case 'satin':
        return {
          title: 'Pijamas de Satín Seda en Medellín',
          tagline: 'Lujo, suavidad y caída sedosa para tu descanso nocturno',
          fabric: 'Satín Seda',
          desc: 'Explora nuestra colección de pijamas camiseras y batas en satín seda de alta densidad confeccionadas en Medellín. Tacto perlado y confort superior.',
        };
      case 'piel-de-durazno':
        return {
          title: 'Pijamas en Piel de Durazno',
          tagline: 'Frescura ligera, elasticidad y suavidad que abraza tu piel',
          fabric: 'Piel de Durazno',
          desc: 'Sets de short y camisilla en tela piel de durazno de alta rotación y frescura, ideales para el clima templado y cálido.',
        };
      case 'termicas':
        return {
          title: 'Pijamas Térmicas para Clima Frío',
          tagline: 'Abrigo esponjoso en fleece polar y joggers confortables',
          fabric: 'Tela Polar Térmica',
          desc: 'Pijamas abrigadas para noches frías o fines de semana de descanso en casa. Suavidad extrema sin peso extra.',
        };
      default:
        return {
          title: 'Colección de Pijamas',
          tagline: 'Confort y estilo para tus noches',
          fabric: '',
          desc: 'Descubre las mejores pijamas de Colombia con pago contraentrega.',
        };
    }
  };

  const info = getSubCategoryDetails();
  const categoryProducts = products.filter(
    (p) => p.subCategory === categoriaSlug || (info.fabric && p.fabric === info.fabric)
  );

  return (
    <div style={{ padding: '3rem 0', backgroundColor: 'var(--bg-secondary)', minHeight: '80vh' }}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: info.title,
          description: info.desc,
          url: `https://lovelynight.com.co/mujer/${categoriaSlug}`,
        }}
      />
      <div className="container">
        <Link
          href="/mujer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
          }}
        >
          <ArrowLeft size={16} />
          <span>Volver a Colección Mujer</span>
        </Link>

        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Silo Especializado • {info.fabric || 'Colección'}
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
            {info.title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {info.desc}
          </p>
        </div>

        {categoryProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Pronto agregaremos nuevas prendas en esta sección.
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
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
