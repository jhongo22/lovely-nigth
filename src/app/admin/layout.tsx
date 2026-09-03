'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Tag,
  ShoppingBag,
  DollarSign,
  Gift,
  Menu,
  X,
  LogOut,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import '@/styles/admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Módulos con iconos para navegación móvil inferior y lateral
  const navItems = [
    { label: 'Dashboard', shortLabel: 'Inicio', href: '/admin', icon: LayoutDashboard },
    { label: 'Productos & Stock', shortLabel: 'Prendas', href: '/admin/productos', icon: Package },
    { label: 'Pedidos & Despachos', shortLabel: 'Pedidos', href: '/admin/pedidos', icon: ShoppingBag, badge: 'Envíos' },
    { label: 'Colecciones', shortLabel: 'Colecciones', href: '/admin/colecciones', icon: Layers },
    { label: 'Categorías', shortLabel: 'Categorías', href: '/admin/categorias', icon: Tag },
    { label: 'Boxes & Combos', shortLabel: 'Combos', href: '/admin/combos', icon: Gift },
    { label: 'Liquidación', shortLabel: 'Costos', href: '/admin/liquidacion', icon: DollarSign },
  ];

  const currentItem = navItems.find((item) => item.href === pathname) || {
    label: 'Panel Administrativo',
    shortLabel: 'Admin',
    href: '/admin',
  };

  // Si está en la página de login, no mostrar la estructura del layout ni pedir sesión
  const isLoginPage = pathname === '/admin/login';

  React.useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    const sessionStr = typeof window !== 'undefined' ? sessionStorage.getItem('lovely_admin_session') : null;
    if (!sessionStr) {
      router.push('/admin/login');
    } else {
      setAuthChecked(true);
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('lovely_admin_session');
    setShowLogoutConfirm(false);
    router.push('/');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF8F5', color: '#78716C', fontSize: '0.9rem' }}>
        Verificando credenciales de administración...
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* 1. TOPBAR COMPACTO Y LIMPIO (SIN MENÚS DUPLICADOS) */}
      <header className="admin-navbar">
        <div className="admin-navbar-brand-section">
          <Link href="/admin" className="admin-logo-link">
            <span className="admin-logo-text">LOVELY NIGHT</span>
            <span className="admin-logo-badge">ERP</span>
          </Link>
        </div>

        {/* Migas de pan en Desktop */}
        <div className="admin-breadcrumbs">
          <span>Panel</span>
          <ChevronRight size={14} style={{ opacity: 0.5 }} />
          <span className="current-crumb">{currentItem.label}</span>
        </div>

        {/* Acción única limpia a la derecha: Salir a la tienda */}
        <div className="admin-navbar-actions">
          <div className="admin-live-indicator">
            <span className="live-pulse" />
            <span className="live-label">En Línea</span>
          </div>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="admin-action-btn logout-btn"
            title="Cerrar sesión e ir a la tienda"
          >
            <LogOut size={15} />
            <span>Volver a Tienda</span>
          </button>
        </div>
      </header>

      {/* 2. ESPACIO DE TRABAJO */}
      <div className="admin-workspace">
        {/* SIDEBAR SOLO EN COMPUTADOR / DESKTOP (EN MÓVIL SE ELIMINA POR COMPLETO) */}
        <aside className="admin-sidebar-nav">
          <div className="admin-sidebar-inner">
            <div className="admin-sidebar-group-label">Módulos</div>

            <nav className="admin-sidebar-menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`admin-menu-item ${isActive ? 'is-active' : ''}`}
                  >
                    <div className="item-icon-text">
                      <Icon size={18} className="item-icon" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="item-badge">{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Widget Margen */}
            <div className="admin-sidebar-bottom-widget">
              <div className="widget-header">
                <TrendingUp size={15} style={{ color: '#10B981' }} />
                <span>Margen Operativo</span>
              </div>
              <div className="widget-metric">~54.8%</div>
              <p className="widget-note">Cálculo de rentabilidad Medellín</p>
            </div>
          </div>
        </aside>

        {/* VIEWPORT PRINCIPAL */}
        <main className="admin-content-area">
          <div className="admin-content-inner">
            {children}
          </div>
        </main>
      </div>

      {/* 3. BARRA DE NAVEGACIÓN RÁPIDA INFERIOR (ESTILO APP MÓVIL NATIVA) */}
      <nav className="admin-bottom-app-bar">
        <Link
          href="/admin"
          className={`app-bar-tab ${pathname === '/admin' ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/productos"
          className={`app-bar-tab ${pathname === '/admin/productos' ? 'active' : ''}`}
        >
          <Package size={20} />
          <span>Productos</span>
        </Link>
        <Link
          href="/admin/pedidos"
          className={`app-bar-tab ${pathname === '/admin/pedidos' ? 'active' : ''}`}
        >
          <ShoppingBag size={20} />
          <span>Pedidos</span>
        </Link>
        <Link
          href="/admin/categorias"
          className={`app-bar-tab ${pathname === '/admin/categorias' ? 'active' : ''}`}
        >
          <Tag size={20} />
          <span>Categorías</span>
        </Link>
        <Link
          href="/admin/combos"
          className={`app-bar-tab ${pathname === '/admin/combos' ? 'active' : ''}`}
        >
          <Gift size={20} />
          <span>Combos</span>
        </Link>
      </nav>

      {/* 4. MODAL CONFIRMAR SALIDA */}
      {showLogoutConfirm && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-wrap">
              <LogOut size={22} />
            </div>
            <h3 className="modal-title">¿Ir a la Tienda Pública?</h3>
            <p className="modal-desc">
              Saldrás del panel de gestión y volverás a la tienda online.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="modal-btn-cancel"
              >
                Permanecer
              </button>
              <button onClick={handleLogout} className="modal-btn-confirm">
                Ir a Tienda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
