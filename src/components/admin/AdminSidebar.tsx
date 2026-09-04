'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Package, DollarSign, Gift, Store, Shield, Layers, Tag } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard & KPIs', href: '/admin', icon: LayoutDashboard },
    { label: 'Gestión de Pedidos', href: '/admin/pedidos', icon: ShoppingCart },
    { label: 'Catálogo & Stock', href: '/admin/productos', icon: Package },
    { label: 'Colecciones', href: '/admin/colecciones', icon: Layers },
    { label: 'Categorías', href: '/admin/categorias', icon: Tag },
    { label: 'Combos & Regalos', href: '/admin/combos', icon: Gift },
    { label: 'Liquidación & Costos', href: '/admin/liquidacion', icon: DollarSign },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="admin-brand-title">Lovely ERP</span>
            <span className="admin-brand-badge">v1.0</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Panel de Control Detal</span>
        </div>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 0.85rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#E5E7EB',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          <Store size={16} style={{ color: 'var(--accent-rose)' }} />
          <span>Ver Tienda en Vivo ↗</span>
        </Link>
      </div>
    </aside>
  );
}
