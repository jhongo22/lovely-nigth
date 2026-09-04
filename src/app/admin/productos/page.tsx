'use client';

import React, { useState } from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Video,
  Image as ImageIcon,
  Check,
  AlertTriangle,
  Layers,
  ChevronDown,
  User,
  Search,
  Filter,
  Tag,
} from 'lucide-react';
import ExportExcelButton from '@/components/admin/ExportExcelButton';
import ImageUploader from '@/components/admin/ImageUploader';
import { Product, ProductVariant, ProductGender } from '@/types/store';

export default function AdminProductosPage() {
  const { products, collections, categories, addProduct, updateProduct, deleteProduct } = useStoreData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filtros de búsqueda en la tabla
  const [searchFilter, setSearchFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [fabricFilter, setFabricFilter] = useState('ALL');

  // Form State Ultra-Flexible
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [gender, setGender] = useState<ProductGender>('Mujer');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [detailsText, setDetailsText] = useState('');
  const [fabric, setFabric] = useState('Satín Seda');
  const [category, setCategory] = useState('pijamas-camiseras');
  const [collectionSlug, setCollectionSlug] = useState('satin-seda');
  const [price, setPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState<number | undefined>(undefined);
  const [costPrice, setCostPrice] = useState(0);
  const [packagingCost, setPackagingCost] = useState(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [imagesText, setImagesText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [badgesText, setBadgesText] = useState('');
  const [featured, setFeatured] = useState(true);
  const [isCombo, setIsCombo] = useState(false);

  // Matriz de Variantes de Stock (Talla, Color, Hex, SKU, Stock)
  const [variants, setVariants] = useState<ProductVariant[]>([
    { size: 'S', colorName: 'Rosa', colorHex: '#E8A598', stock: 10, sku: '' },
    { size: 'M', colorName: 'Rosa', colorHex: '#E8A598', stock: 10, sku: '' },
    { size: 'L', colorName: 'Rosa', colorHex: '#E8A598', stock: 10, sku: '' },
  ]);

  const resetForm = () => {
    setName('');
    setSlug('');
    setGender('Mujer');
    setTagline('');
    setDescription('');
    setDetailsText('');
    setFabric('Satín Seda');
    setCategory('pijamas-camiseras');
    setCollectionSlug('satin-seda');
    setPrice(0);
    setComparePrice(undefined);
    setCostPrice(0);
    setPackagingCost(0);
    setProductImages([]);
    setImagesText('');
    setVideoUrl('');
    setBadgesText('');
    setFeatured(true);
    setIsCombo(false);
    setVariants([
      { size: 'S', colorName: 'Rosa', colorHex: '#E8A598', stock: 10, sku: '' },
      { size: 'M', colorName: 'Rosa', colorHex: '#E8A598', stock: 10, sku: '' },
      { size: 'L', colorName: 'Rosa', colorHex: '#E8A598', stock: 10, sku: '' },
    ]);
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleStartEdit = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setSlug(p.slug);
    setGender((p.gender as ProductGender) || 'Mujer');
    setTagline(p.tagline || '');
    setDescription(p.description);
    setDetailsText(p.details.join('\n'));
    setFabric(p.fabric);
    setCategory(p.category);
    setCollectionSlug(p.collectionSlug || 'satin-seda');
    setPrice(p.price);
    setComparePrice(p.comparePrice);
    setCostPrice(p.costPrice);
    setPackagingCost(p.packagingCost);
    setProductImages(p.images || []);
    setImagesText((p.images || []).join('\n'));
    setVideoUrl(p.videoUrl || '');
    setBadgesText(p.badges.join(', '));
    setFeatured(p.featured ?? true);
    setIsCombo(p.isCombo ?? false);
    setVariants(
      p.variants.map((v) => ({
        ...v,
        sku: v.sku || `LN-${p.slug.toUpperCase().slice(0, 4)}-${v.size}`,
      }))
    );
    setIsFormOpen(true);
  };

  // Agregar Variante Personalizada
  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        size: 'M',
        colorName: 'Nuevo Color',
        colorHex: '#C27D6E',
        stock: 10,
        sku: `LN-${name ? name.toUpperCase().slice(0, 4) : 'PROD'}-M-${Date.now().toString().slice(-3)}`,
      },
    ]);
  };

  // Generador Rápido de Tallas (S, M, L, XL) para un color específico
  const handleGenerateSizeMatrix = (colorName: string, colorHex: string) => {
    const sizes = ['S', 'M', 'L', 'XL'];
    const newVariants: ProductVariant[] = sizes.map((s) => ({
      size: s,
      colorName,
      colorHex,
      stock: 12,
      sku: `LN-${name ? name.toUpperCase().slice(0, 4) : 'PROD'}-${colorName.toUpperCase().slice(0, 3)}-${s}`,
    }));
    setVariants((prev) => [...prev, ...newVariants]);
  };

  const handleVariantChange = (index: number, field: keyof ProductVariant, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Por favor ingresa el nombre de la prenda.');
      return;
    }

    const calculatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const parsedTextImages = imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    // Unir imágenes subidas al storage con las que ingrese por texto (sin duplicados)
    const combinedImages = Array.from(new Set([...productImages, ...parsedTextImages]));

    const defaultImages = combinedImages.length > 0 ? combinedImages : [
      '/imagenes/logo_circular_sin_fondo.png'
    ];

    const parsedDetails = detailsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedBadges = badgesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // 1. Guardar de inmediato para que la dueña no espere
    const baseProductPayload = {
      name,
      slug: calculatedSlug,
      gender,
      tagline: tagline || 'Confección suave y premium en Medellín',
      description,
      details: parsedDetails.length > 0 ? parsedDetails : ['Satín seda de alto gramaje', 'Botones nacarados', 'No destiñe'],
      fabric,
      category,
      collectionSlug,
      price: Number(price),
      comparePrice: comparePrice ? Number(comparePrice) : undefined,
      costPrice: Number(costPrice),
      packagingCost: Number(packagingCost),
      images: defaultImages,
      videoUrl: videoUrl || undefined,
      variants,
      badges: parsedBadges,
      rating: 4.9,
      reviewsCount: 18,
      featured,
      isCombo,
    };

    let createdProduct: Product | undefined;
    if (editingId) {
      await updateProduct(editingId, baseProductPayload);
    } else {
      createdProduct = await addProduct(baseProductPayload);
    }

    // 2. Ejecutar generación de SEO Técnico con IA en segundo plano
    fetch('/api/ai/seo-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        fabric,
        category,
        gender,
        price: Number(price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.seo) {
          // Si es edición o creación, actualizar con el SEO generado
          const targetId = editingId || createdProduct?.id;
          if (targetId) {
            updateProduct(targetId, {
              seo: data.seo,
            });
          }
        }
      })
      .catch((err) => console.error('Error auto-generating SEO:', err));

    resetForm();
  };

  // Filtrado de la tabla
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesGender = genderFilter === 'ALL' || (p.gender || 'Mujer') === genderFilter;
    const matchesFabric = fabricFilter === 'ALL' || p.fabric === fabricFilter;

    return matchesSearch && matchesGender && matchesFabric;
  });

  return (
    <div>
      {/* 1. CABECERA & ACCIONES PRINCIPALES */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1C1917', letterSpacing: '-0.02em' }}>
            Control de Catálogo & Matriz de Inventario
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#78716C' }}>
            Gestión flexible de tallas, colores, telas, colecciones, género y costos de producción.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <ExportExcelButton
            data={filteredProducts.map((p) => ({
              ID: p.id,
              Nombre: p.name,
              Slug: p.slug,
              Género: p.gender || 'Mujer',
              Tela: p.fabric,
              Colección: p.collectionSlug || 'General',
              Precio_Venta: p.price,
              Costo_Confeccion: p.costPrice,
              Costo_Empaque: p.packagingCost,
              Margen_COP: p.price - p.costPrice - p.packagingCost,
              Stock_Total: p.variants.reduce((sum, v) => sum + v.stock, 0),
              Variantes_Tallas: p.variants.map((v) => `${v.size}(${v.colorName}:${v.stock})`).join(', '),
            }))}
            fileName="Inventario_Completo_LovelyNight"
          />

          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="admin-btn admin-btn-rose"
          >
            <Plus size={16} />
            <span>Crear Nueva Prenda</span>
          </button>
        </div>
      </div>

      {/* 2. BARRA DE FILTROS RÁPIDOS */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid var(--admin-border-subtle)',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        {/* Buscador en Vivo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 260px', backgroundColor: '#FAF8F5', padding: '0.55rem 0.85rem', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
          <Search size={16} style={{ color: '#78716C' }} />
          <input
            type="text"
            placeholder="Buscar por nombre, tela, slug..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '0.85rem', outline: 'none', color: '#1C1917' }}
          />
        </div>

        {/* Filtro por Género / Público */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={15} style={{ color: '#78716C' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#57534E' }}>Género:</span>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.82rem', backgroundColor: '#FFFFFF', fontWeight: 600 }}
          >
            <option value="ALL">Todos los Públicos</option>
            <option value="Mujer">Dama / Mujer</option>
            <option value="Hombre">Hombre / Loungewear</option>
            <option value="Unisex">Unisex / Dúos</option>
            <option value="Infantil / Niñas">Infantil / Niñas</option>
          </select>
        </div>

        {/* Filtro por Tela */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Tag size={15} style={{ color: '#78716C' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#57534E' }}>Tela:</span>
          <select
            value={fabricFilter}
            onChange={(e) => setFabricFilter(e.target.value)}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.82rem', backgroundColor: '#FFFFFF', fontWeight: 600 }}
          >
            <option value="ALL">Todas las Telas</option>
            <option value="Satín Seda">Satín Seda</option>
            <option value="Piel de Durazno">Piel de Durazno</option>
            <option value="Térmica Polar">Térmica Polar</option>
            <option value="Algodón Pima">Algodón Pima</option>
            <option value="Modal / Rib">Modal / Rib</option>
          </select>
        </div>
      </div>

      {/* 3. FORMULARIO MODERNO ULTRA-FLEXIBLE */}
      {isFormOpen && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '2.25rem', borderRadius: '20px', border: '1.5px solid var(--admin-border-strong)', marginBottom: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>
                {editingId ? 'Editar Prenda & Stock' : 'Crear Nueva Prenda en el Catálogo'}
              </h3>
              <span style={{ fontSize: '0.82rem', color: '#78716C' }}>Configuración detallada multivariante tipo Shopify</span>
            </div>
            <button onClick={resetForm} style={{ color: '#78716C', fontSize: '0.85rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '8px', backgroundColor: '#FAF8F5' }}>
              ✕ Cerrar Formulario
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* A. Clasificación Maestra: Nombre, Género, Tela, Colección */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Pijama Camisera Satín Seda Rose Gold"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingId) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                  Género / Público Objetivo *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as ProductGender)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: '#FFFFFF', fontWeight: 600 }}
                >
                  <option value="Mujer">🌸 Mujer / Dama</option>
                  <option value="Hombre">🎩 Hombre / Loungewear</option>
                  <option value="Unisex">✨ Unisex / Parejas Dúo</option>
                  <option value="Infantil / Niñas">🧸 Infantil / Niñas</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                  Tela / Material de Confección *
                </label>
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: '#FFFFFF', fontWeight: 600 }}
                >
                  <option value="Satín Seda">Satín Seda (Alto Gramaje)</option>
                  <option value="Piel de Durazno">Piel de Durazno (Microesmerilada)</option>
                  <option value="Térmica Polar">Térmica Polar / Fleece</option>
                  <option value="Algodón Pima">Algodón Pima Peruano</option>
                  <option value="Modal / Rib">Modal / Rib Acanalado</option>
                  <option value="Lino / Viscosa">Lino / Viscosa Natural</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                  Colección Asignada
                </label>
                <select
                  value={collectionSlug}
                  onChange={(e) => setCollectionSlug(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: '#FFFFFF', fontWeight: 600 }}
                >
                  {collections.map((col) => (
                    <option key={col.slug} value={col.slug}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* B. Precios & Liquidación Financiera */}
            <div style={{ padding: '1.5rem', backgroundColor: '#FAF8F5', borderRadius: '14px', border: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--admin-accent-primary)', letterSpacing: '0.08em', display: 'block', marginBottom: '1rem' }}>
                Precios de Venta & Costos de Taller en Medellín
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Precio de Venta al Detal (COP) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.7rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Precio Tachado / Comparación</label>
                  <input
                    type="number"
                    value={comparePrice || ''}
                    onChange={(e) => setComparePrice(e.target.value ? Number(e.target.value) : undefined)}
                    style={{ width: '100%', padding: '0.7rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Costo Tela + Confección Taller</label>
                  <input
                    type="number"
                    required
                    value={costPrice}
                    onChange={(e) => setCostPrice(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.7rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Costo Bolsa + Caja de Empaque</label>
                  <input
                    type="number"
                    required
                    value={packagingCost}
                    onChange={(e) => setPackagingCost(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.7rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', backgroundColor: '#ECFDF5', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#065F46', fontWeight: 700 }}>
                  💰 Utilidad Neta Real: ${(price - costPrice - packagingCost).toLocaleString('es-CO')} COP por unidad
                </span>
                <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 800 }}>
                  Margen Operativo: {(((price - costPrice - packagingCost) / price) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* C. Matriz de Variantes de Stock (Tallas Personalizadas, Colores, SKU y Stock) */}
            <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1.5px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#1C1917', letterSpacing: '0.06em' }}>
                    Matriz de Tallas, Tonos & Balance de Stock
                  </span>
                  <p style={{ fontSize: '0.78rem', color: '#78716C', margin: '0.15rem 0 0 0' }}>
                    Agrega tallas numéricas, alfanuméricas (XS a XXL) o combinaciones de colores.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="admin-btn"
                  style={{ backgroundColor: '#FAF8F5', color: '#1C1917', border: '1px solid #D1D5DB', fontSize: '0.8rem' }}
                >
                  <Plus size={14} /> <span>+ Agregar Talla/Color</span>
                </button>
              </div>

              {/* Lista de Variantes Adaptativa para Móvil y Desktop */}
              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <div style={{ minWidth: '540px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* Cabecera */}
                  <div style={{ display: 'grid', gridTemplateColumns: '75px 1fr 44px 110px 85px 36px', gap: '0.5rem', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C', padding: '0 0.5rem' }}>
                    <span>Talla</span>
                    <span>Nombre Tono</span>
                    <span>Color</span>
                    <span>SKU</span>
                    <span>Stock</span>
                    <span></span>
                  </div>

                  {/* Filas de variantes */}
                  {variants.map((v, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '75px 1fr 44px 110px 85px 36px',
                        gap: '0.5rem',
                        alignItems: 'center',
                        backgroundColor: '#FAF8F5',
                        padding: '0.45rem 0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      {/* Talla */}
                      <input
                        type="text"
                        placeholder="S, M..."
                        value={v.size}
                        onChange={(e) => handleVariantChange(idx, 'size', e.target.value)}
                        style={{ width: '100%', padding: '0.45rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, textAlign: 'center', backgroundColor: '#FFFFFF' }}
                      />

                      {/* Nombre del Color */}
                      <input
                        type="text"
                        placeholder="Rosa Seda..."
                        value={v.colorName}
                        onChange={(e) => handleVariantChange(idx, 'colorName', e.target.value)}
                        style={{ width: '100%', padding: '0.45rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
                      />

                      {/* Color Hex Swatch */}
                      <input
                        type="color"
                        value={v.colorHex}
                        onChange={(e) => handleVariantChange(idx, 'colorHex', e.target.value)}
                        style={{ width: '100%', height: '34px', padding: '0', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer' }}
                        title="Seleccionar color"
                      />

                      {/* Código SKU */}
                      <input
                        type="text"
                        placeholder="SKU"
                        value={v.sku || ''}
                        onChange={(e) => handleVariantChange(idx, 'sku', e.target.value)}
                        style={{ width: '100%', padding: '0.45rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', backgroundColor: '#FFFFFF' }}
                      />

                      {/* Stock */}
                      <input
                        type="number"
                        placeholder="0"
                        value={v.stock}
                        onChange={(e) => handleVariantChange(idx, 'stock', Number(e.target.value))}
                        style={{ width: '100%', padding: '0.45rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, textAlign: 'center', backgroundColor: '#FFFFFF' }}
                      />

                      {/* Eliminar */}
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(idx)}
                        style={{ color: '#DC2626', padding: '0.4rem', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Eliminar variante"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* D. Galería de Imágenes en Supabase Storage, Video de Producto & Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', color: '#1C1917' }}>
                  <ImageIcon size={14} /> Fotos de la Prenda (Supabase Storage) *
                </label>
                
                {/* Cargador interactivo de imágenes arrastrar y soltar */}
                <ImageUploader
                  images={productImages}
                  onChange={(newImages) => {
                    setProductImages(newImages);
                    setImagesText(newImages.join('\n'));
                  }}
                />

                <details style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#78716C' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600 }}>O pegar URLs manuales (Opcional)</summary>
                  <textarea
                    rows={3}
                    placeholder="https://ejemplo.com/foto1.jpg&#10;https://ejemplo.com/foto2.jpg"
                    value={imagesText}
                    onChange={(e) => {
                      setImagesText(e.target.value);
                      const parsed = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
                      setProductImages(parsed);
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.4rem' }}
                  />
                </details>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', color: '#1C1917' }}>
                  <Video size={14} /> Video de Producto (Reels / TikTok / MP4)
                </label>
                <input
                  type="url"
                  placeholder="https://tu-servidor.com/video-prenda.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '0.85rem' }}
                />

                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                  Badges Promocionales (Cápsulas)
                </label>
                <input
                  type="text"
                  placeholder="BESTSELLER, NUEVA, 15% DTO"
                  value={badgesText}
                  onChange={(e) => setBadgesText(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Botón Guardar */}
            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
              <button type="submit" className="admin-btn admin-btn-rose" style={{ padding: '0.9rem 2.5rem', fontSize: '0.92rem' }}>
                <Check size={17} />
                <span>{editingId ? 'Guardar Cambios de Prenda' : 'Publicar Prenda en Catálogo'}</span>
              </button>
              <button type="button" onClick={resetForm} className="admin-btn" style={{ backgroundColor: '#FAF8F5', color: '#374151', border: '1px solid #D1D5DB' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. LISTADO DE PRODUCTOS: TARJETAS TÁCTILES EN MÓVIL + TABLA EN DESKTOP */}
      
      {/* A. Vista Móvil (Tarjetas Shopify/App Style) */}
      <div className="admin-mobile-product-cards">
        {filteredProducts.map((p) => {
          const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
          return (
            <div
              key={p.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid var(--admin-border)',
                padding: '1rem',
                display: 'flex',
                gap: '0.85rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                position: 'relative',
              }}
            >
              {/* Foto de la prenda */}
              <div
                style={{
                  width: '80px',
                  height: '105px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#EDEAE4',
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0]}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Información y detalles */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1C1917', margin: 0, lineHeight: 1.25 }}>
                      {p.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.35rem 0' }}>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: (p.gender || 'Mujer') === 'Mujer' ? '#FCE7F3' : '#E0E7FF',
                        color: (p.gender || 'Mujer') === 'Mujer' ? '#BE185D' : '#3730A3',
                      }}
                    >
                      {p.gender || 'Mujer'}
                    </span>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: '#FAF0ED',
                        color: 'var(--admin-accent-primary)',
                      }}
                    >
                      {p.fabric}
                    </span>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        backgroundColor: totalStock <= 10 ? '#FEE2E2' : '#DCFCE7',
                        color: totalStock <= 10 ? '#DC2626' : '#15803D',
                      }}
                    >
                      {totalStock} unid.
                    </span>
                  </div>

                  {/* Precios y Utilidad */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#1C1917', fontWeight: 800 }}>
                      ${p.price.toLocaleString('es-CO')}
                    </strong>
                    {p.comparePrice && (
                      <span style={{ fontSize: '0.78rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        ${p.comparePrice.toLocaleString('es-CO')}
                      </span>
                    )}
                  </div>
                  {p.costPrice > 0 && (
                    <div style={{ fontSize: '0.73rem', color: '#047857', fontWeight: 700, marginTop: '0.2rem' }}>
                      💰 Ganancia: +${(p.price - p.costPrice - (p.packagingCost || 0)).toLocaleString('es-CO')} COP ({(((p.price - p.costPrice - (p.packagingCost || 0)) / (p.price || 1)) * 100).toFixed(0)}%)
                    </div>
                  )}
                </div>

                {/* Botones de acción táctiles grandes para móvil */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                  <button
                    onClick={() => handleStartEdit(p)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem',
                      borderRadius: '8px',
                      backgroundColor: '#1C1917',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar la prenda "${p.name}"?`)) {
                        deleteProduct(p.id);
                      }
                    }}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: '#FEE2E2',
                      color: '#DC2626',
                      border: '1px solid rgba(220,38,38,0.2)',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* B. Vista Desktop (Tabla completa horizontal) */}
      <div className="admin-desktop-table table-responsive-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Prenda & Slug</th>
              <th>Género</th>
              <th>Tela Base</th>
              <th>Precio Venta</th>
              <th>Stock Total</th>
              <th>Variantes & Tonos</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => {
              const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);

              return (
                <tr key={p.id}>
                  <td>
                    <img src={p.images[0]} alt={p.name} style={{ width: '52px', height: '65px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }} />
                  </td>
                  <td>
                    <strong style={{ color: '#1C1917', display: 'block', fontSize: '0.92rem' }}>{p.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#78716C' }}>/{p.slug}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor:
                          (p.gender || 'Mujer') === 'Mujer'
                            ? '#FCE7F3'
                            : (p.gender || 'Mujer') === 'Hombre'
                            ? '#E0E7FF'
                            : '#FEF3C7',
                        color:
                          (p.gender || 'Mujer') === 'Mujer'
                            ? '#BE185D'
                            : (p.gender || 'Mujer') === 'Hombre'
                            ? '#3730A3'
                            : '#92400E',
                      }}
                    >
                      {p.gender || 'Mujer'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--admin-accent-primary)' }}>
                      {p.fabric}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: '#1C1917', fontSize: '0.95rem' }}>${p.price.toLocaleString('es-CO')}</strong>
                    {p.comparePrice && (
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through', display: 'block' }}>
                        ${p.comparePrice.toLocaleString('es-CO')}
                      </span>
                    )}
                    {p.costPrice > 0 && (
                      <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                        +${(p.price - p.costPrice - (p.packagingCost || 0)).toLocaleString('es-CO')} ({(((p.price - p.costPrice - (p.packagingCost || 0)) / (p.price || 1)) * 100).toFixed(0)}%)
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: totalStock <= 10 ? '#FEE2E2' : '#DCFCE7',
                        color: totalStock <= 10 ? '#DC2626' : '#15803D',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      {totalStock <= 10 && <AlertTriangle size={12} />}
                      <span>{totalStock} unid.</span>
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {Array.from(new Set(p.variants.map((v) => v.colorHex))).map((hex, i) => (
                          <span key={i} style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: hex, border: '1px solid #D1D5DB' }} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#78716C' }}>
                        Tallas: {Array.from(new Set(p.variants.map((v) => v.size))).join(', ')}
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => handleStartEdit(p)}
                        style={{ padding: '0.45rem 0.8rem', borderRadius: '8px', backgroundColor: '#FAF8F5', color: '#1C1917', border: '1px solid #D1D5DB', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        title="Editar prenda y stock"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar la prenda "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        style={{ padding: '0.45rem 0.8rem', borderRadius: '8px', backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.2)', cursor: 'pointer' }}
                        title="Eliminar producto"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
