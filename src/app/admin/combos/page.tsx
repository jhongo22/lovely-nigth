'use client';

import React, { useState } from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import { Gift, Plus, Edit3, Trash2, Sparkles, Percent, DollarSign, Check, X } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import ExportExcelButton from '@/components/admin/ExportExcelButton';
import { Product } from '@/types/store';

export default function AdminCombosPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStoreData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState(139000);
  const [comparePrice, setComparePrice] = useState(175000);
  const [costPrice, setCostPrice] = useState(52000);
  const [packagingCost, setPackagingCost] = useState(9500);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800');
  const [fabric, setFabric] = useState<Product['fabric']>('Satín Seda');

  const combosList = products.filter((p) => p.isCombo || p.subCategory === 'box-regalo');

  const resetForm = () => {
    setName('');
    setTagline('');
    setPrice(139000);
    setComparePrice(175000);
    setCostPrice(52000);
    setPackagingCost(9500);
    setImageUrl('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800');
    setFabric('Satín Seda');
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleStartEdit = (combo: Product) => {
    setEditingId(combo.id);
    setName(combo.name);
    setTagline(combo.tagline || '');
    setPrice(combo.price);
    setComparePrice(combo.comparePrice || combo.price * 1.2);
    setCostPrice(combo.costPrice);
    setPackagingCost(combo.packagingCost);
    setImageUrl(combo.images?.[0] || '');
    setFabric(combo.fabric);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');

    if (editingId) {
      updateProduct(editingId, {
        name,
        slug,
        tagline: tagline || 'El obsequio soñado con empaque de lujo incluido',
        fabric,
        price: Number(price),
        comparePrice: Number(comparePrice),
        costPrice: Number(costPrice),
        packagingCost: Number(packagingCost),
        images: [imageUrl],
      });
    } else {
      addProduct({
        slug,
        name,
        tagline: tagline || 'El obsequio soñado con empaque de lujo incluido',
        description: 'Combo especial para consentirte o regalar en fechas memorables. Incluye caja rígida Lovely Night con cinta satinada.',
        details: [
          '1x Pijama completa en Satín Seda',
          '1x Antifaz acolchado de descanso',
          '2x Scrunchies de satín para el cabello',
          'Caja de regalo rígida con lazo de satín'
        ],
        fabric,
        category: 'combos',
        subCategory: 'box-regalo',
        price: Number(price),
        comparePrice: Number(comparePrice),
        costPrice: Number(costPrice),
        packagingCost: Number(packagingCost),
        images: [imageUrl],
        variants: [
          { size: 'S', colorName: 'Box Set', colorHex: '#D98880', stock: 15, sku: `LN-BOX-${slug.slice(0, 4)}-S` },
          { size: 'M', colorName: 'Box Set', colorHex: '#D98880', stock: 20, sku: `LN-BOX-${slug.slice(0, 4)}-M` },
          { size: 'L', colorName: 'Box Set', colorHex: '#D98880', stock: 10, sku: `LN-BOX-${slug.slice(0, 4)}-L` }
        ],
        badges: ['BESTSELLER', 'OFERTA'],
        rating: 5.0,
        reviewsCount: 1,
        isCombo: true,
        featured: true,
        seo: {
          metaTitle: `${name} | Lovely Night`,
          metaDescription: `Compra ${name} en caja de lujo con pago contraentrega en Medellín y Colombia.`,
          keywords: ['box de regalo pijamas', 'combo regalo mujer medellin', name.toLowerCase()]
        }
      });
    }

    resetForm();
  };

  return (
    <div>
      {/* 1. CABECERA & ACCIÓN RÁPIDA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1C1917', letterSpacing: '-0.02em', margin: 0 }}>
            Gestión de Combos & Boxes de Regalo
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#78716C', marginTop: '0.35rem' }}>
            Empaqueta pijamas con antifaces y lazos de satín en cajas rígidas para elevar el ticket promedio en Medellín.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <ExportExcelButton
            data={combosList.map((c) => ({
              ID: c.id,
              Nombre: c.name,
              Slug: c.slug,
              Tela: c.fabric,
              Precio_Venta: c.price,
              Costo_Prenda: c.costPrice,
              Costo_Caja_Lujo: c.packagingCost,
              Ganancia_Neta: c.price - c.costPrice - c.packagingCost,
            }))}
            fileName="Combos_Boxes_LovelyNight"
          />

          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="admin-btn admin-btn-rose"
          >
            <Plus size={16} />
            <span>Crear Nuevo Box / Combo</span>
          </button>
        </div>
      </div>

      {/* 2. FORMULARIO MODERNO EN LÍNEA (ESTILO PRODUCTOS) */}
      {isFormOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.75rem',
            borderRadius: '16px',
            border: '1px solid var(--admin-border)',
            marginBottom: '2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>
              {editingId ? 'Editar Combo / Box de Regalo' : 'Nuevo Combo / Box de Regalo'}
            </h3>
            <button onClick={resetForm} style={{ color: '#9CA3AF', fontSize: '0.85rem', cursor: 'pointer', border: 'none', background: 'none' }}>
              ✕ Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                  Nombre del Combo o Box *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Box Regalo Luxe: Pijama Satín + Antifaz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                  Tela Base
                </label>
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value as any)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Satín Seda">Satín Seda</option>
                  <option value="Piel de Durazno">Piel de Durazno</option>
                  <option value="Térmica Polar">Térmica Polar</option>
                  <option value="Algodón Pima">Algodón Pima</option>
                  <option value="Modal / Rib">Modal / Rib</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem', color: '#1C1917' }}>
                Frase Promocional / Subtítulo
              </label>
              <input
                type="text"
                placeholder="Ej: Pijama Satín + Antifaz + Caja rígida con cinta de satín"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            {/* PRECIOS Y COSTOS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', backgroundColor: '#FAF8F5', padding: '1rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#1C1917' }}>
                  Precio Venta (COP) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700, backgroundColor: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#78716C' }}>
                  Precio Tachado (COP)
                </label>
                <input
                  type="number"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#78716C' }}>
                  Costo Prendas (COP) *
                </label>
                <input
                  type="number"
                  required
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#78716C' }}>
                  Caja Lujo + Lazo (COP) *
                </label>
                <input
                  type="number"
                  required
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                />
              </div>
            </div>

            {/* FOTO CON SUPABASE STORAGE */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', color: '#1C1917' }}>
                Foto del Box de Regalo (Supabase Storage) *
              </label>
              <ImageUploader
                images={imageUrl ? [imageUrl] : []}
                onChange={(imgs) => {
                  if (imgs.length > 0) setImageUrl(imgs[imgs.length - 1]);
                  else setImageUrl('');
                }}
              />
              <input
                type="url"
                placeholder="O ingresa una URL directa"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.4rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.85rem 1.85rem' }}>
                <Check size={16} />
                <span>{editingId ? 'Guardar Cambios' : 'Crear Combo'}</span>
              </button>
              <button type="button" onClick={resetForm} className="admin-btn" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. LISTADO: TARJETAS TÁCTILES EN MÓVIL + TABLA EN DESKTOP */}
      
      {/* A. Vista Móvil (Tarjetas Shopify Style) */}
      <div className="admin-mobile-product-cards">
        {combosList.map((combo) => {
          const totalCost = combo.costPrice + combo.packagingCost;
          const profit = combo.price - totalCost;

          return (
            <div
              key={combo.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid var(--admin-border)',
                padding: '1rem',
                display: 'flex',
                gap: '0.85rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
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
                  src={combo.images[0]}
                  alt={combo.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1C1917', margin: '0 0 0.25rem 0', lineHeight: 1.25 }}>
                    {combo.name}
                  </h3>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, backgroundColor: '#FAF0ED', color: 'var(--admin-accent-primary)', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      {combo.fabric} • COMBO
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, backgroundColor: '#DCFCE7', color: '#15803D', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      +${profit.toLocaleString('es-CO')} Utilidad
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#1C1917', fontWeight: 800 }}>
                      ${combo.price.toLocaleString('es-CO')}
                    </strong>
                    {combo.comparePrice && (
                      <span style={{ fontSize: '0.78rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        ${combo.comparePrice.toLocaleString('es-CO')}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                  <button
                    onClick={() => handleStartEdit(combo)}
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
                      if (confirm(`¿Eliminar combo "${combo.name}"?`)) deleteProduct(combo.id);
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
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* B. Vista Desktop (Tabla) */}
      <div className="admin-desktop-table table-responsive-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre del Combo</th>
              <th>Tela Base</th>
              <th>Precio Venta</th>
              <th>Costo Total</th>
              <th>Ganancia Neta</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {combosList.map((combo) => {
              const totalCost = combo.costPrice + combo.packagingCost;
              const profit = combo.price - totalCost;

              return (
                <tr key={combo.id}>
                  <td>
                    <img src={combo.images[0]} alt={combo.name} style={{ width: '52px', height: '65px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }} />
                  </td>
                  <td>
                    <strong style={{ color: '#1C1917', display: 'block', fontSize: '0.92rem' }}>{combo.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#78716C' }}>{combo.tagline}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--admin-accent-primary)' }}>
                      {combo.fabric}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: '#1C1917', fontSize: '0.95rem' }}>${combo.price.toLocaleString('es-CO')}</strong>
                    {combo.comparePrice && (
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through', display: 'block' }}>
                        ${combo.comparePrice.toLocaleString('es-CO')}
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                      ${totalCost.toLocaleString('es-CO')}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      +${profit.toLocaleString('es-CO')}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => handleStartEdit(combo)}
                        style={{ padding: '0.45rem 0.8rem', borderRadius: '8px', backgroundColor: '#FAF8F5', color: '#1C1917', border: '1px solid #D1D5DB', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        title="Editar combo"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar combo "${combo.name}"?`)) deleteProduct(combo.id);
                        }}
                        style={{ padding: '0.45rem 0.8rem', borderRadius: '8px', backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.2)', cursor: 'pointer' }}
                        title="Eliminar combo"
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
