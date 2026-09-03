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
  const { products, collections } = useStoreData();

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

  // Categorías jerárquicas para el menú móvil estilo boutique (acordeones con +)
  const mobileMenuStructure = [
    {
      id: 'pijamas',
      label: 'PIJAMAS',
      subItems: [
        { label: 'Ver Todas las Pijamas', href: '/mujer' },
        { label: 'Satín Seda Clásicas', href: '/mujer/satin' },
        { label: 'Piel de Durazno Frescas', href: '/mujer/piel-de-durazno' },
        { label: 'Térmicas & Clima Frío', href: '/mujer/termicas' },
        { label: 'Pijamas Camiseras', href: '/mujer' },
        { label: 'Sets Cortos de Short', href: '/mujer/piel-de-durazno' },
      ],
    },
    {
      id: 'vestidos-bano',
      label: 'VESTIDOS DE BAÑO',
      subItems: [
        { label: 'Enterizos & Bikinis', href: '/mujer' },
        { label: 'Salidas de Baño & Kimonos', href: '/mujer/satin' },
      ],
    },
    {
      id: 'ropa-interior',
      label: 'ROPA INTERIOR',
      subItems: [
        { label: 'Bralettes & Tops Suaves', href: '/mujer' },
        { label: 'Panties & Tangas Confort', href: '/mujer' },
        { label: 'Bodys Modeladores', href: '/mujer' },
      ],
    },
    {
      id: 'ropa',
      label: 'ROPA & LOUNGEWEAR',
      subItems: [
        { label: 'Batas & Kimonos de Seda', href: '/mujer/satin' },
        { label: 'Joggers & Pantalones Relax', href: '/mujer/termicas' },
        { label: 'Camisetas & Sacos Confort', href: '/mujer' },
      ],
    },
    {
      id: 'accesorios',
      label: 'ACCESORIOS',
      subItems: [
        { label: 'Antifaces de Descanso en Satín', href: '/combos-regalo' },
        { label: 'Scrunchies de Seda', href: '/combos-regalo' },
        { label: 'Boxes Rígidas de Regalo Luxe', href: '/combos-regalo' },
      ],
    },
    {
      id: 'sale',
      label: 'SALE / OFERTAS',
      subItems: [
        { label: 'Últimas Unidades con Descuento', href: '/mujer' },
        { label: 'Combos & Packs 2x1 y 3x2', href: '/combos-regalo' },
      ],
    },
  ];

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
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(250, 248, 245, 0.98)',
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
                  Mujer
                </Link>

                <Link
                  href="/mujer/satin"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: pathname === '/mujer/satin' ? 'var(--accent-terra)' : 'var(--text-muted)',
                  }}
                >
                  Satín Seda
                </Link>

                <Link
                  href="/combos-regalo"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--accent-terra)',
                    backgroundColor: 'var(--accent-soft-pink)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                  }}
                >
                  🎁 Regalos
                </Link>

                <Link
                  href="/hombre"
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: pathname === '/hombre' ? 'var(--accent-terra)' : 'var(--text-muted)',
                  }}
                >
                  Hombre
                </Link>
              </div>
            </nav>
          </div>

          {/* Logo Central Minimalista */}
          <Link href="/" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isScrolled ? '1.55rem' : '1.85rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: '#1C1C1C',
                lineHeight: 1,
                transition: 'font-size 0.25s ease',
              }}
            >
              LOVELY NIGHT
            </span>
            <span
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontWeight: 500,
                marginTop: '3px',
              }}
            >
              Medellín • Sleepwear
            </span>
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
                    backgroundColor: '#1C1C1C',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '17px',
                    height: '17px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
            {/* Encabezado: "Cerrar" + Botón X */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.15rem 1.4rem',
                borderBottom: '1px solid #EEEEEE',
              }}
            >
              <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#1C1917' }}>
                Cerrar
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1C1917',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Cerrar menú"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Lista de Secciones con Acordeón (+) */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {mobileMenuStructure.map((section) => {
                const isOpen = openAccordion === section.id;
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
                        color: section.id === 'sale' ? '#DC2626' : '#1C1917',
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
                          backgroundColor: '#FAF8F5',
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

              {/* Ítems simples sin acordeón: HOMBRE */}
              <div style={{ borderBottom: '1px solid #EEEEEE' }}>
                <Link
                  href="/hombre"
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
                  HOMBRE
                </Link>
              </div>

              {/* INICIAR SESIÓN */}
              <div style={{ borderBottom: '1px solid #EEEEEE' }}>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '1.05rem 1.4rem',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#1C1917',
                    textDecoration: 'none',
                  }}
                >
                  <span>INICIAR SESIÓN</span>
                </Link>
              </div>

              {/* REGISTRARSE / PANEL ADMIN */}
              <div style={{ borderBottom: '1px solid #EEEEEE' }}>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '1.05rem 1.4rem',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#1C1917',
                    textDecoration: 'none',
                  }}
                >
                  <span>REGISTRARSE</span>
                </Link>
              </div>
            </nav>

            {/* Pie del menú con acceso directo a WhatsApp / Envíos */}
            <div style={{ padding: '1.25rem 1.4rem', backgroundColor: '#FAF8F5', borderTop: '1px solid #EEEEEE' }}>
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
        @media (min-width: 860px) {
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

