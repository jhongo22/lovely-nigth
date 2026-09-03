'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Truck, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';

const MESSAGES = [
  { icon: Truck, text: '✨ Envíos a todo Medellín y Colombia • Pago Contraentrega disponible' },
  { icon: Sparkles, text: '💖 Envío GRATIS en compras superiores a $150.000 COP' },
  { icon: CreditCard, text: '💳 Paga a 3 cuotas sin interés con Addi y Sistecredito' },
  { icon: ShieldCheck, text: '🧵 Confección 100% en Medellín • Telas Premium de alta densidad' }
];

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const current = MESSAGES[currentIndex];
  const IconComponent = current.icon;

  return (
    <div
      style={{
        backgroundColor: '#1C1C1C',
        color: '#FFFFFF',
        padding: '0.6rem 1rem',
        fontSize: '0.82rem',
        fontWeight: '600',
        letterSpacing: '0.03em',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 50,
      }}
    >
      <IconComponent size={15} style={{ color: 'var(--accent-sand)', flexShrink: 0 }} />
      <span style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{current.text}</span>
    </div>
  );
}
