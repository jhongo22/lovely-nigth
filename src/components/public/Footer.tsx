'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, ShieldCheck, RefreshCw, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/icons/WhatsAppIcon';

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }
  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(28, 28, 28, 0.08)',
        color: '#1C1C1C',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
        marginTop: '5rem',
      }}
    >
      <div className="container">
        {/* 1. SECCIÓN DE PILARES DE CONFIANZA */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            backgroundColor: '#fdf6f0',
            borderRadius: '16px',
            border: '1px solid rgba(28, 28, 28, 0.06)',
            marginBottom: '4rem',
          }}
        >
          {/* Pilar 1 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                color: 'var(--accent-terra)',
                flexShrink: 0,
              }}
            >
              <Truck size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1C1C', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)' }}>
                Pago Contraentrega
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: 1.4 }}>
                Paga en efectivo o transferencia al recibir en tu puerta.
              </p>
            </div>
          </div>

          {/* Pilar 2 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                color: '#dbbb92',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1C1C', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)' }}>
                100% Hecho en Medellín
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: 1.4 }}>
                Confección artesanal y telas premium de alta densidad.
              </p>
            </div>
          </div>

          {/* Pilar 3 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                color: '#2E7D32',
                flexShrink: 0,
              }}
            >
              <RefreshCw size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1C1C', marginBottom: '0.2rem', fontFamily: 'var(--font-sans)' }}>
                Garantía y Cambios Fáciles
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: 1.4 }}>
                Cambios de talla ágiles sin complicaciones por WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* 2. ENLACES, INFORMACIÓN & MAPA DE MEDELLÍN */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Columna Marca & Contacto */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/imagenes/logo_circular_sin_fondo.png"
                alt="Lovely Night Medellín"
                style={{ width: '44px', height: '44px', objectFit: 'contain' }}
              />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 700, color: '#1C1C1C' }}>
                LOVELY NIGHT
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#666666', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Boutique especializada en pijamas de satín seda, conjuntos en piel de durazno y prendas de descanso diseñadas para abrazar tus noches en Medellín.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#444444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--accent-terra)' }} />
                <span>Medellín, Antioquia (Valle de Aburrá)</span>
              </div>
              <a
                href="https://wa.me/573000000000?text=Hola%20Lovely%20Night,%20quiero%20hacer%20un%20pedido%20o%20consultar%20disponibilidad"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#15803D', fontWeight: 600 }}
              >
                <WhatsAppOfficialIcon size={16} fill="#25D366" />
                <span>WhatsApp: +57 300 000 0000</span>
              </a>
              <Link
                href="/politicas"
                style={{ color: 'var(--accent-terra)', fontWeight: 600, marginTop: '0.35rem', textDecoration: 'underline' }}
              >
                Políticas de Cambios & Garantías ↗
              </Link>
            </div>
          </div>

          {/* Columna Colecciones SEO */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C1C1C', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)' }}>
              Colecciones
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#555555' }}>
              <li><Link href="/mujer" style={{ transition: 'color 0.2s' }}>Colección Mujer Completa</Link></li>
              <li><Link href="/mujer/satin" style={{ transition: 'color 0.2s' }}>Pijamas Satín Seda</Link></li>
              <li><Link href="/mujer/piel-de-durazno" style={{ transition: 'color 0.2s' }}>Pijamas Piel de Durazno</Link></li>
              <li><Link href="/mujer/termicas" style={{ transition: 'color 0.2s' }}>Pijamas Térmicas Clima Frío</Link></li>
              <li><Link href="/combos-regalo" style={{ transition: 'color 0.2s' }}>Boxes de Regalo & Dúo Packs</Link></li>
              <li><Link href="/hombre" style={{ transition: 'color 0.2s' }}>Loungewear Hombre</Link></li>
            </ul>
          </div>

          {/* Columna Mapa OpenStreetMap de Medellín (100% Funcional sin bloqueos) */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C1C1C', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)' }}>
              Despachos en Medellín & Colombia
            </h4>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(28, 28, 28, 0.1)',
                height: '160px',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                backgroundColor: '#EAE6E1',
              }}
            >
              <iframe
                title="Mapa de Despachos Medellín"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-75.63%2C6.18%2C-75.52%2C6.30&layer=mapnik&marker=6.2442%2C-75.5812"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#777777', marginTop: '0.4rem', display: 'block' }}>
              📍 Entregas el mismo día o 24h en Medellín, Envigado, Itagüí, Sabaneta y Bello.
            </span>
          </div>
        </div>

        {/* 3. COPYRIGHT & ACCESO ADMIN */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(28, 28, 28, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#777777',
          }}
        >
          <span>© {new Date().getFullYear()} LOVELY NIGHT. Todos los derechos reservados. Hecho en Medellín, Colombia.</span>
          <Link
            href="/admin"
            style={{
              color: 'var(--accent-terra)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <span>🔒 Panel Administrativo ERP</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
