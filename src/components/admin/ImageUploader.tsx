'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon, Plus } from 'lucide-react';
import { uploadProductImage } from '@/lib/storageService';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setErrorMsg(null);

    const newUrls: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const url = await uploadProductImage(file);
        newUrls.push(url);
      }
      onChange([...images, ...newUrls]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al subir una o más imágenes');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Botón / Zona de Drag & Drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed #D1D5DB',
          borderRadius: '12px',
          padding: '1.25rem 1rem',
          textAlign: 'center',
          backgroundColor: '#FAF8F5',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={isUploading}
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />

        {isUploading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9E6A5A', fontWeight: 600, fontSize: '0.85rem' }}>
            <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            <span>Subiendo imágenes a Supabase...</span>
          </div>
        ) : (
          <>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#F3EAE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9E6A5A',
              }}
            >
              <UploadCloud size={20} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#1C1917' }}>
                Haz clic o arrastra fotos aquí
              </p>
              <span style={{ fontSize: '0.72rem', color: '#78716C' }}>
                PNG, JPG, WEBP • Se guardan automáticamente en Supabase Storage
              </span>
            </div>
          </>
        )}
      </div>

      {errorMsg && (
        <div style={{ fontSize: '0.75rem', color: '#DC2626', backgroundColor: '#FEF2F2', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
          {errorMsg}
        </div>
      )}

      {/* Galería de fotos cargadas con opción de eliminar */}
      {images.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '0.65rem',
            marginTop: '0.25rem',
          }}
        >
          {images.map((imgUrl, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '1/1',
                border: index === 0 ? '2px solid #9E6A5A' : '1px solid #E5E7EB',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                backgroundColor: '#F3F4F6',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={`Foto ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {index === 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    backgroundColor: '#9E6A5A',
                    color: '#FFFFFF',
                    fontSize: '0.55rem',
                    fontWeight: 800,
                    padding: '1px 4px',
                    borderRadius: '3px',
                    textTransform: 'uppercase',
                  }}
                >
                  Principal
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                style={{
                  position: 'absolute',
                  top: '3px',
                  right: '3px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                }}
                title="Eliminar foto"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
