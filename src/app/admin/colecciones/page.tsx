'use client';

import React, { useState } from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import { Layers, Plus, Trash2, Edit3, Image as ImageIcon, Sparkles, Eye, Check } from 'lucide-react';
import ExportExcelButton from '@/components/admin/ExportExcelButton';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminColeccionesPage() {
  const { collections, addCollection, updateCollection, deleteCollection } = useStoreData();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('NUEVA');
  const [featured, setFeatured] = useState(true);

  const resetForm = () => {
    setName('');
    setSlug('');
    setDescription('');
    setImage('');
    setBadge('NUEVA');
    setFeatured(true);
    setIsCreating(false);
    setEditingId(null);
  };

  const handleStartEdit = (col: (typeof collections)[0]) => {
    setEditingId(col.id);
    setName(col.name);
    setSlug(col.slug);
    setDescription(col.description);
    setImage(col.image);
    setBadge(col.badge || '');
    setFeatured(col.featured ?? true);
    setIsCreating(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      alert('Por favor completa el nombre y la imagen de la colección.');
      return;
    }

    const calculatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingId) {
      updateCollection(editingId, {
        name,
        slug: calculatedSlug,
        description,
        image,
        badge,
        featured,
      });
    } else {
      addCollection({
        name,
        slug: calculatedSlug,
        description,
        image,
        badge,
        featured,
      });
    }

    resetForm();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#111827' }}>Gestión de Colecciones (Shopify Style)</h2>
          <p style={{ fontSize: '0.88rem', color: '#6B7280' }}>
            Crea y edita colecciones temáticas con fotos de portada y badges promocionales.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <ExportExcelButton
            data={collections.map((c) => ({
              ID: c.id,
              Nombre: c.name,
              Slug: c.slug,
              Badge: c.badge,
              Destacado: c.featured ? 'Sí' : 'No',
              Descripción: c.description,
            }))}
            fileName="Colecciones_Lovely_Night"
          />

          <button
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} />
            <span>Crear Nueva Colección</span>
          </button>
        </div>
      </div>

      {/* FORMULARIO DE CREACIÓN / EDICIÓN */}
      {isCreating && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '2.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
              {editingId ? 'Editar Colección' : 'Crear Nueva Colección de Temporada'}
            </h3>
            <button onClick={resetForm} style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Nombre de la Colección *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Colección Noches de Seda Rose Gold"
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
                  URL Slug (Ruta Web)
                </label>
                <input
                  type="text"
                  placeholder="ej: noches-de-seda-rose"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Descripción Editorial
              </label>
              <textarea
                rows={3}
                placeholder="Describe la temática, textura y sensación de esta colección..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Imagen de Portada (Supabase Storage) *
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
                  placeholder="O ingresa una URL directa"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.4rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Badge Promocional
                </label>
                <input
                  type="text"
                  placeholder="Ej: BESTSELLER, NUEVA, 20% DTO, EXCLUSIVA"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Preview de Portada */}
            {image && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                <img src={image} alt="Preview" style={{ width: '90px', height: '110px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>✓ Vista Previa de Portada</span>
                  <h4 style={{ fontSize: '1rem', color: '#111827', margin: '0.2rem 0' }}>{name || 'Título de Colección'}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{badge ? `Badge: ${badge}` : 'Sin badge'}</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.85rem 1.85rem' }}>
                <Check size={16} />
                <span>{editingId ? 'Guardar Cambios' : 'Publicar Colección'}</span>
              </button>
              <button type="button" onClick={resetForm} className="admin-btn" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTADO DE COLECCIONES EN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {collections.map((col) => (
          <div
            key={col.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative', height: '190px', backgroundColor: '#EDEAE4' }}>
              <img src={col.image} alt={col.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {col.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                >
                  {col.badge}
                </div>
              )}
            </div>

            <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.35rem' }}>
                  {col.name}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-accent-primary)', fontWeight: 600, display: 'block', marginBottom: '0.65rem' }}>
                  Ruta: /{col.slug}
                </span>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.5 }}>
                  {col.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                <button
                  onClick={() => handleStartEdit(col)}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem',
                    borderRadius: '8px',
                    backgroundColor: '#F3F4F6',
                    color: '#1F2937',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <Edit3 size={14} />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar la colección "${col.name}"?`)) {
                      deleteCollection(col.id);
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    fontSize: '0.82rem',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
