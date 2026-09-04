'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppFloating() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }
  const whatsappUrl =
    'https://wa.me/573000000000?text=' +
    encodeURIComponent('¡Hola Lovely Night! 🌙 Me gustaría consultar disponibilidad de pijamas y ordenar con Pago Contraentrega.');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        padding: '0.5rem 1.15rem 0.5rem 0.5rem',
        borderRadius: '9999px', /* Ovalado delicado */
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
        zIndex: 40,
        textDecoration: 'none',
        transition: 'all 0.25s cubic-bezier(0.2, 0, 0, 1)',
      }}
      className="whatsapp-oval-btn"
      aria-label="Chatear por WhatsApp con una asesora Lovely Night"
    >
      {/* Icono / Logo Oficial de WhatsApp en Alta Fidelidad Circular */}
      <div
        className="whatsapp-icon-circle"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="24"
          height="24"
          className="whatsapp-svg-icon"
          style={{ fill: '#25D366' }}
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.72.78 5.26 2.14 7.42L2 30l6.76-2.1A13.93 13.93 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.64c-2.34 0-4.54-.66-6.42-1.82l-.46-.28-4.26 1.32 1.34-4.14-.3-.48A11.58 11.58 0 014.36 16c0-6.42 5.22-11.64 11.64-11.64s11.64 5.22 11.64 11.64-5.22 11.64-11.64 11.64zm6.38-8.7c-.36-.18-2.1-1.04-2.42-1.16-.32-.12-.56-.18-.8.18s-.92 1.16-1.12 1.4-.42.26-.78.08a9.8 9.8 0 01-2.9-1.78 10.84 10.84 0 01-2-2.48c-.2-.36 0-.54.16-.72.16-.16.36-.42.54-.62.18-.2.24-.36.36-.6.12-.24.06-.46-.04-.64s-.8-1.92-1.1-2.62c-.3-.7-.6-.6-.82-.62h-.7c-.24 0-.64.1-0.98.46s-1.3 1.28-1.3 3.12 1.34 3.62 1.52 3.86c.18.24 2.62 4 6.36 5.62.88.38 1.58.62 2.12.8.9.28 1.72.24 2.36.14.72-.1 2.1-.86 2.4-1.7.3-.84.3-1.56.2-1.72-.1-.14-.32-.24-.68-.42z" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }} className="whatsapp-label-text">
        <span style={{ fontSize: '0.82rem', fontWeight: 800, lineHeight: 1.1 }}>
          ¿Preguntas o Pedidos?
        </span>
        <span style={{ fontSize: '0.7rem', opacity: 0.9, fontWeight: 500 }}>
          Pide por WhatsApp aquí
        </span>
      </div>

      <style jsx>{`
        .whatsapp-oval-btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.55);
        }
        @media (max-width: 580px) {
          .whatsapp-label-text {
            display: none !important;
          }
          .whatsapp-oval-btn {
            padding: 0 !important;
            width: 62px !important;
            height: 62px !important;
            bottom: 20px !important;
            right: 18px !important;
            justify-content: center !important;
            box-shadow: 0 10px 28px rgba(37, 211, 102, 0.5) !important;
          }
          :global(.whatsapp-icon-circle) {
            width: 44px !important;
            height: 44px !important;
          }
          :global(.whatsapp-svg-icon) {
            width: 28px !important;
            height: 28px !important;
          }
        }
      `}</style>
    </a>
  );
}
