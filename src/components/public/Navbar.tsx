'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Sparkles,
  Truck,
  ShieldCheck,
  Percent,
  Plus,
  Minus,
  User,
} from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/icons/WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import { useStoreData } from '@/context/StoreDataContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { products, collections, categories } = useStoreData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  // Categorías jerárquicas dinámicas basadas 100% en la base de datos
  const dynamicMenuStructure = categories.map((cat) => {
    const catProducts = products.filter(
      (p) =>
        p.category?.toLowerCase() === cat.slug?.toLowerCase() ||
        p.category?.toLowerCase() === cat.name?.toLowerCase() ||
        p.fabric?.toLowerCase() === cat.fabric?.toLowerCase()
    );
    const uniqueFabrics = Array.from(new Set(catProducts.map((p) => p.fabric).filter(Boolean)));

    return {
      id: cat.id || cat.slug,
      label: cat.name.toUpperCase(),
      href: `/mujer?categoria=${cat.slug}`,
      subItems: [
        { label: `Ver Todo en ${cat.name}`, href: `/mujer?categoria=${cat.slug}` },
        ...uniqueFabrics.map((f) => ({
          label: f,
          href: `/mujer?categoria=${cat.slug}&tela=${encodeURIComponent(f)}`,
        })),
      ],
    };
  });

  // Resultados de búsqueda en vivo
  const searchResults = searchQuery.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(253, 246, 240, 0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
          zIndex: 45,
          transition: 'all 0.25s ease',
        }}
      >
        <div className="container" style={{ height: isScrolled ? '66px' : '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'height 0.25s ease' }}>
          
          {/* Lado Izquierdo: Menú Móvil Hamburguesa / Enlaces Desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem',
                color: 'var(--text-main)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              className="mobile-nav-toggle"
              aria-label="Abrir menú"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>

            {/* Enlaces Desktop */}
            <nav style={{ display: 'none' }} className="desktop-left-nav">
              <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
                <Link
                  href="/"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: pathname === '/' ? 700 : 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: pathname === '/' ? 'var(--accent-terra)' : 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Home size={14} />
                  <span>Inicio</span>
                </Link>

                <Link
                  href="/mujer"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: pathname === '/mujer' ? 700 : 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: pathname === '/mujer' ? 'var(--accent-terra)' : 'var(--text-main)',
                  }}
                >
                  Catálogo
                </Link>

                {categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/mujer?categoria=${cat.slug}`}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--text-main)',
                    }}
                  >
                    {cat.name}
                  </Link>
                ))}

                {collections.slice(0, 2).map((col) => (
                  <Link
                    key={col.id}
                    href={`/mujer?coleccion=${col.slug}`}
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--brand-dark, #1C1917)',
                      backgroundColor: 'var(--brand-beige, #fdf6f0)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(219, 187, 146, 0.4)',
                    }}
                  >
                    {col.badge ? `${col.badge} ` : ''}{col.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Logo Central de Marca */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              padding: '0 0.5rem',
            }}
          >
            {/* Logo Móvil Oficial: Imagen rectangular de la marca sin fondo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/imagenes/logo_rectangular_sin_fondo.png"
              alt="Lovely Night"
              className="mobile-header-logo"
              style={{
                height: isScrolled ? '34px' : '40px',
                width: 'auto',
                maxWidth: '185px',
                objectFit: 'contain',
                transition: 'height 0.25s ease',
              }}
            />

            {/* Logo Desktop Oficial */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/imagenes/logo_rectangular_sin_fondo.png"
              alt="Lovely Night"
              className="desktop-header-logo"
              style={{
                height: isScrolled ? '42px' : '50px',
                width: 'auto',
                maxWidth: '240px',
                objectFit: 'contain',
                transition: 'height 0.25s ease',
              }}
            />
          </Link>

          {/* Lado Derecho: Buscador Interactivo & Carrito */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.85rem', flex: 1 }}>
            {/* Botón de Búsqueda */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                color: '#1C1C1C',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Buscar pijamas y prendas"
            >
              <Search size={21} strokeWidth={1.5} />
            </button>

            {/* Ícono de Usuario Desktop */}
            <Link
              href="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                color: '#1C1C1C',
              }}
              className="user-nav-btn"
              title="Mi Cuenta / Acceso ERP"
            >
              <User size={21} strokeWidth={1.5} />
            </Link>

            {/* Botón de Carrito */}
            <button
              onClick={openCart}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                color: '#1C1C1C',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Ver carrito de compras"
              className="bag-icon-btn"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '0px',
                    backgroundColor: 'var(--brand-pink, #dc9d9d)',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(220, 157, 157, 0.5)',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* BARRA DESPLEGABLE DE BÚSQUEDA EN VIVO */}
        {isSearchOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid rgba(28, 28, 28, 0.08)',
              borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
              padding: '1.25rem 0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div className="container" style={{ maxWidth: '720px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
                <Search size={20} style={{ color: 'var(--accent-terra)' }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Busca por tela, modelo o estilo (ej: Satín, Piel de Durazno, Camisera, Térmica)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.5rem',
                    border: 'none',
                    borderBottom: '1.5px solid #1C1C1C',
                    outline: 'none',
                    fontSize: '0.98rem',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  style={{ padding: '0.4rem', color: '#666666', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  aria-label="Cerrar buscador"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Resultados en tiempo real */}
              {searchResults.length > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                    Resultados sugeridos:
                  </span>
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/producto/${item.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        backgroundColor: '#FAF8F5',
                        transition: 'background-color 0.2s ease',
                      }}
                      className="search-result-row"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.images[0]} alt={item.name} style={{ width: '42px', height: '52px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1C1C1C' }}>{item.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-terra)', fontWeight: 700 }}>
                          ${item.price.toLocaleString('es-CO')} COP • {item.fabric}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MENÚ MÓVIL DRAWER LATERAL EXACTO A LA REFERENCIA */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
          }}
        >
          {/* Backdrop con desenfoque suave */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(3px)',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          />

          {/* Drawer Lateral Izquierdo */}
          <aside
            style={{
              position: 'relative',
              width: '84%',
              maxWidth: '340px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 101,
              boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
              animation: 'slideInLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              overflowY: 'auto',
            }}
          >
            {/* Encabezado: Logo Circular + Nombre + Botón X */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.4rem',
                borderBottom: '1px solid #EEEEEE',
                backgroundColor: 'var(--brand-beige, #fdf6f0)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/imagenes/logo_circular_sin_fondo.png"
                  alt="Lovely Night Medellín"
                  style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                />
                <span style={{ fontSize: '0.98rem', fontWeight: 600, color: '#1C1917', fontFamily: 'var(--font-serif)', letterSpacing: '0.04em' }}>
                  LOVELY NIGHT
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1C1917',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Cerrar menú"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Lista de Secciones Dinámicas */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Inicio */}
              <div style={{ borderBottom: '1px solid #EEEEEE' }}>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '1.05rem 1.4rem',
                    fontSize: '0.88rem',
                    fontWeight: pathname === '/' ? 700 : 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: pathname === '/' ? 'var(--accent-terra)' : '#1C1917',
                    textDecoration: 'none',
                  }}
                >
                  <Home size={16} />
                  <span>INICIO</span>
                </Link>
              </div>

              {/* Catálogo Completo */}
              <div style={{ borderBottom: '1px solid #EEEEEE' }}>
                <Link
                  href="/mujer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '1.05rem 1.4rem',
                    fontSize: '0.88rem',
                    fontWeight: pathname === '/mujer' ? 700 : 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: pathname === '/mujer' ? 'var(--accent-terra)' : '#1C1917',
                    textDecoration: 'none',
                  }}
                >
                  <Sparkles size={16} />
                  <span>CATÁLOGO DE PRENDAS</span>
                </Link>
              </div>

              {/* Categorías dinámicas desde DB */}
              {dynamicMenuStructure.map((section) => {
                const isOpen = openAccordion === section.id;
                const hasSub = section.subItems && section.subItems.length > 1;

                if (!hasSub) {
                  return (
                    <div key={section.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                      <Link
                        href={section.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '1.05rem 1.4rem',
                          fontSize: '0.88rem',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: '#1C1917',
                          textDecoration: 'none',
                        }}
                      >
                        {section.label}
                      </Link>
                    </div>
                  );
                }

                return (
                  <div key={section.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                    <button
                      onClick={() => toggleAccordion(section.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.05rem 1.4rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: '#1C1917',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {section.label}
                      </span>
                      {isOpen ? (
                        <Minus size={18} strokeWidth={1.3} style={{ color: '#57534E' }} />
                      ) : (
                        <Plus size={18} strokeWidth={1.3} style={{ color: '#57534E' }} />
                      )}
                    </button>

                    {/* Sub-items desplegables */}
                    {isOpen && (
                      <div
                        style={{
                          backgroundColor: 'var(--brand-beige, #fdf6f0)',
                          padding: '0.5rem 1.4rem 1rem 1.75rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          borderTop: '1px solid #F3F4F6',
                        }}
                      >
                        {section.subItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                              fontSize: '0.86rem',
                              color: '#44403C',
                              textDecoration: 'none',
                              padding: '0.2rem 0',
                              fontWeight: 400,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>{sub.label}</span>
                            <ChevronRight size={13} style={{ color: '#A8A29E' }} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Colecciones especiales si existen en DB */}
              {collections.map((col) => (
                <div key={col.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <Link
                    href={`/mujer?coleccion=${col.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.05rem 1.4rem',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#1C1917',
                      textDecoration: 'none',
                    }}
                  >
                    <span>{col.badge ? `${col.badge} ` : ''}{col.name}</span>
                    <ChevronRight size={14} style={{ color: '#A8A29E' }} />
                  </Link>
                </div>
              ))}

              {/* ACCESO AL SISTEMA DE ADMINISTRACIÓN ERP */}
              <div style={{ borderBottom: '1px solid #EEEEEE', marginTop: 'auto' }}>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '1.05rem 1.4rem',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-dark, #1C1917)',
                    backgroundColor: 'rgba(219, 187, 146, 0.15)',
                    textDecoration: 'none',
                  }}
                >
                  <User size={16} />
                  <span>ADMINISTRAR TIENDA (ERP)</span>
                </Link>
              </div>
            </nav>

            {/* Pie del menú con acceso directo a WhatsApp / Envíos */}
            <div style={{ padding: '1.25rem 1.4rem', backgroundColor: 'var(--brand-beige, #fdf6f0)', borderTop: '1px solid #EEEEEE' }}>
              <span style={{ fontSize: '0.72rem', color: '#78716C', display: 'block', marginBottom: '0.35rem' }}>
                Atención al cliente Medellín:
              </span>
              <a
                href="https://wa.me/573000000000?text=Hola%20Lovely%20Night,%20necesito%20asesoría%20con%20una%20prenda"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#15803D',
                  textDecoration: 'none',
                }}
              >
                <WhatsAppOfficialIcon size={18} fill="#25D366" />
                <span>Asesoría por WhatsApp</span>
              </a>
            </div>
          </aside>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .bag-icon-btn:hover {
          opacity: 0.7;
        }
        .search-result-row:hover {
          background-color: #F0EAE1 !important;
        }
        .mobile-header-logo {
          display: block;
        }
        .desktop-header-logo {
          display: none;
        }
        @media (min-width: 860px) {
          .mobile-header-logo {
            display: none !important;
          }
          .desktop-header-logo {
            display: block !important;
          }
          .desktop-left-nav {
            display: block !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
          .user-nav-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

