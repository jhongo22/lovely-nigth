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
  MoreHorizontal,
  Store,
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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
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
        {/* 1. Dashboard */}
        <Link
          href="/admin"
          className={`app-bar-tab ${pathname === '/admin' ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* 2. Productos */}
        <Link
          href="/admin/productos"
          className={`app-bar-tab ${pathname === '/admin/productos' ? 'active' : ''}`}
        >
          <Package size={20} />
          <span>Productos</span>
        </Link>

        {/* 3. Colecciones (Inmediatamente al lado de Productos) */}
        <Link
          href="/admin/colecciones"
          className={`app-bar-tab ${pathname === '/admin/colecciones' ? 'active' : ''}`}
        >
          <Layers size={20} />
          <span>Colecciones</span>
        </Link>

        {/* 4. Pedidos */}
        <Link
          href="/admin/pedidos"
          className={`app-bar-tab ${pathname === '/admin/pedidos' ? 'active' : ''}`}
        >
          <ShoppingBag size={20} />
          <span>Pedidos</span>
        </Link>

        {/* 5. Más (...) con todas las demás opciones */}
        <button
          type="button"
          onClick={() => setIsMoreMenuOpen(true)}
          className={`app-bar-tab ${['/admin/categorias', '/admin/combos', '/admin/liquidacion'].includes(pathname) ? 'active' : ''}`}
          aria-label="Más opciones del administrador"
        >
          <MoreHorizontal size={22} />
          <span>Más...</span>
        </button>
      </nav>

      {/* 4. DRAWER BOTTOM-SHEET PARA MÁS OPCIONES DEL ADMIN EN MÓVIL */}
      {isMoreMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {/* Backdrop con desenfoque suave */}
          <div
            onClick={() => setIsMoreMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(3px)',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          />

          {/* Card Desplegable desde abajo */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '1.25rem 1.5rem 2.25rem 1.5rem',
              zIndex: 101,
              boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)',
              maxHeight: '85vh',
              overflowY: 'auto',
              animation: 'slideUpSheet 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Tirador superior */}
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#E5E7EB',
                borderRadius: '9999px',
                margin: '0 auto 1.25rem auto',
              }}
            />

            {/* Cabecera */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1C1917', margin: 0 }}>
                  Más Módulos del Administrador
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#78716C' }}>Todas las herramientas de control Lovely ERP</span>
              </div>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                style={{
                  background: '#F5F5F4',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#57534E',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Lista Completa de Módulos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Categorías */}
              <Link
                href="/admin/categorias"
                onClick={() => setIsMoreMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: pathname === '/admin/categorias' ? '#FAF0ED' : '#F9F8F6',
                  color: '#1C1917',
                  textDecoration: 'none',
                  border: pathname === '/admin/categorias' ? '1px solid var(--accent-terra)' : '1px solid transparent',
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', color: 'var(--accent-terra)' }}>
                  <Tag size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.92rem', display: 'block', color: '#1C1917' }}>Categorías de Prenda</strong>
                  <span style={{ fontSize: '0.75rem', color: '#78716C' }}>Tipos de prendas (Camiseras, Batas, Shorts, Kimonos)</span>
                </div>
                <ChevronRight size={16} style={{ color: '#A8A29E' }} />
              </Link>

              {/* Combos & Regalos */}
              <Link
                href="/admin/combos"
                onClick={() => setIsMoreMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: pathname === '/admin/combos' ? '#FAF0ED' : '#F9F8F6',
                  color: '#1C1917',
                  textDecoration: 'none',
                  border: pathname === '/admin/combos' ? '1px solid var(--accent-terra)' : '1px solid transparent',
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', color: '#D97706' }}>
                  <Gift size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.92rem', display: 'block', color: '#1C1917' }}>Boxes & Combos de Regalo</strong>
                  <span style={{ fontSize: '0.75rem', color: '#78716C' }}>Armado de packs especiales con cajas de lujo y cintas</span>
                </div>
                <ChevronRight size={16} style={{ color: '#A8A29E' }} />
              </Link>

              {/* Liquidación & Costos */}
              <Link
                href="/admin/liquidacion"
                onClick={() => setIsMoreMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: pathname === '/admin/liquidacion' ? '#FAF0ED' : '#F9F8F6',
                  color: '#1C1917',
                  textDecoration: 'none',
                  border: pathname === '/admin/liquidacion' ? '1px solid var(--accent-terra)' : '1px solid transparent',
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', color: '#059669' }}>
                  <DollarSign size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.92rem', display: 'block', color: '#1C1917' }}>Liquidación Financiera</strong>
                  <span style={{ fontSize: '0.75rem', color: '#78716C' }}>Márgenes netos, tela, confección y balances</span>
                </div>
                <ChevronRight size={16} style={{ color: '#A8A29E' }} />
              </Link>

              <hr style={{ border: 'none', borderTop: '1px solid #F3F4F6', margin: '0.5rem 0' }} />

              {/* Ver Tienda Pública */}
              <Link
                href="/"
                target="_blank"
                onClick={() => setIsMoreMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: '#FAF8F5',
                  color: '#1C1917',
                  textDecoration: 'none',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Store size={18} style={{ color: 'var(--accent-terra)' }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, flex: 1 }}>Ver Tienda en Vivo (Pública)</span>
                <span style={{ fontSize: '0.72rem', color: '#78716C' }}>Abrir ↗</span>
              </Link>

              {/* Salir / Cerrar Sesión */}
              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <LogOut size={18} />
                <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>Cerrar Sesión ERP</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL CONFIRMAR SALIDA */}
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
