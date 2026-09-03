'use client';

import React, { useState } from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import { Tag, Plus, Trash2, Edit3, Check, Layers } from 'lucide-react';
import ExportExcelButton from '@/components/admin/ExportExcelButton';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminCategoriasPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStoreData();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('Satín Seda');
  const [image, setImage] = useState('');

  const resetForm = () => {
    setName('');
    setSlug('');
    setDescription('');
    setFabric('Satín Seda');
    setImage('');
    setIsCreating(false);
    setEditingId(null);
  };

  const handleStartEdit = (cat: (typeof categories)[0]) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setFabric(cat.fabric);
    setImage(cat.image);
    setIsCreating(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      alert('Por favor completa el nombre y la imagen de la categoría.');
      return;
    }

    const calculatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingId) {
      updateCategory(editingId, {
        name,
        slug: calculatedSlug,
        description,
        fabric,
        image,
      });
    } else {
      addCategory({
        name,
        slug: calculatedSlug,
        description,
        fabric,
        image,
      });
    }

    resetForm();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#111827' }}>Categorías de Pijamería</h2>
          <p style={{ fontSize: '0.88rem', color: '#6B7280' }}>
            Organiza los tipos de prenda (Camiseras, Batas, Sets Cortos, Térmicas) para los filtros de la tienda.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <ExportExcelButton
            data={categories.map((c) => ({
              ID: c.id,
              Nombre: c.name,
              Slug: c.slug,
              Tela_Principal: c.fabric,
              Descripción: c.description,
            }))}
            fileName="Categorias_Lovely_Night"
          />

          <button
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} />
            <span>Crear Categoría</span>
          </button>
        </div>
      </div>

      {/* FORMULARIO */}
      {isCreating && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '2.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
              {editingId ? 'Editar Categoría' : 'Nueva Categoría de Producto'}
            </h3>
            <button onClick={resetForm} style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Batas & Kimonos de Seda"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingId) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Tela / Material Predeterminado
                </label>
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
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
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Descripción de la Categoría
              </label>
              <textarea
                rows={2}
                placeholder="Breve descripción para la cabecera del catálogo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Foto de la Categoría (Supabase Storage) *
              </label>
              <ImageUploader
                images={image ? [image] : []}
                onChange={(imgs) => {
                  if (imgs.length > 0) setImage(imgs[imgs.length - 1]);
                  else setImage('');
                }}
              />
              <input
                type="url"
                placeholder="O ingresa una URL directa de imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.4rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.85rem 1.85rem' }}>
                <Check size={16} />
                <span>{editingId ? 'Guardar Cambios' : 'Crear Categoría'}</span>
              </button>
              <button type="button" onClick={resetForm} className="admin-btn" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTADO DE CATEGORÍAS: TARJETAS TÁCTILES EN MÓVIL + TABLA EN DESKTOP */}
      
      {/* A. Vista Móvil (Tarjetas Táctiles) */}
      <div className="admin-mobile-product-cards">
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid var(--admin-border)',
              padding: '1rem',
              display: 'flex',
              gap: '0.85rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '70px',
                height: '85px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#EDEAE4',
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1C1917', margin: 0 }}>
                {cat.name}
              </h4>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#FAF8F5', border: '1px solid #E5E7EB', padding: '0.15rem 0.45rem', borderRadius: '4px', color: '#57534E', fontWeight: 600 }}>
                  /{cat.slug}
                </span>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#F0FDF4', color: '#15803D', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                  {cat.fabric}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#78716C', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {cat.description || 'Sin descripción'}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                <button
                  onClick={() => handleStartEdit(cat)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
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
                    if (confirm(`¿Eliminar la categoría "${cat.name}"?`)) {
                      deleteCategory(cat.id);
                    }
                  }}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* B. Vista Desktop (Tabla) */}
      <div className="admin-desktop-table table-responsive-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre Categoría</th>
              <th>Slug / Ruta</th>
              <th>Tela Base</th>
              <th>Descripción</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>
                  <img src={cat.image} alt={cat.name} style={{ width: '48px', height: '58px', objectFit: 'cover', borderRadius: '6px' }} />
                </td>
                <td>
                  <strong style={{ color: '#111827' }}>{cat.name}</strong>
                </td>
                <td>
                  <code style={{ fontSize: '0.75rem', color: 'var(--admin-accent-primary)', backgroundColor: '#F3F4F6', padding: '0.2rem 0.45rem', borderRadius: '4px' }}>
                    /{cat.slug}
                  </code>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{cat.fabric}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>{cat.description}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleStartEdit(cat)}
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', backgroundColor: '#F3F4F6', color: '#1F2937', border: '1px solid #E5E7EB', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar la categoría "${cat.name}"?`)) {
                          deleteCategory(cat.id);
                        }
                      }}
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.2)' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
