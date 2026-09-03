'use client';

import React, { useState } from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import {
  ShoppingBag,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  DollarSign,
  ChevronDown,
  Sparkles,
  Package,
  ArrowRight,
  User,
  Check,
} from 'lucide-react';
import ExportExcelButton from '@/components/admin/ExportExcelButton';
import { Order, OrderStatus } from '@/types/store';

export default function AdminPedidosPage() {
  const { orders, updateOrderStatus } = useStoreData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCityFilter, setSelectedCityFilter] = useState('ALL');

  // Ciudades presentes en las órdenes para filtro rápido
  const uniqueCities = Array.from(new Set(orders.map((o) => o.customer.city)));

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.phone.includes(searchTerm) ||
      o.customer.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    const matchesCity = selectedCityFilter === 'ALL' || o.customer.city === selectedCityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  const handleWhatsAppCustomer = (order: Order) => {
    const phoneClean = order.customer.phone.replace(/\D/g, '');
    const fullPhone = phoneClean.startsWith('57') ? phoneClean : `57${phoneClean}`;
    const itemsList = order.items
      .map((i) => `• *${i.quantity}x ${i.productName}* (Talla: ${i.size})`)
      .join('\n');

    const msg = encodeURIComponent(
      `🌙 *¡Hola ${order.customer.fullName}! Te escribimos de Lovely Night Sleepwear.*\n\n` +
      `Confirmamos tu pedido *#${order.orderNumber}*:\n` +
      `${itemsList}\n\n` +
      `📍 *Destino:* ${order.customer.address}, ${order.customer.city}\n` +
      `💰 *Total a pagar:* $${order.total.toLocaleString('es-CO')} COP (${order.paymentMethod === 'contraentrega' ? 'Pago Contraentrega' : 'Transferencia'})\n\n` +
      `¿Tu dirección está correcta para programar el despacho hoy?`
    );

    window.open(`https://wa.me/${fullPhone}?text=${msg}`, '_blank');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'entregado':
        return { bg: '#DCFCE7', color: '#15803D', text: 'Entregado ✓', border: '#BBF7D0' };
      case 'despachado':
        return { bg: '#EFF6FF', color: '#1D4ED8', text: 'En Camino 🚚', border: '#BFDBFE' };
      case 'en_preparacion':
        return { bg: '#FEF3C7', color: '#B45309', text: 'En Empaque 📦', border: '#FDE68A' };
      case 'confirmado_whatsapp':
        return { bg: '#F3E8FF', color: '#7E22CE', text: 'Confirmado WhatsApp 💬', border: '#E9D5FF' };
      case 'devuelto':
        return { bg: '#FEE2E2', color: '#DC2626', text: 'Devuelto ✕', border: '#FECACA' };
      default:
        return { bg: '#F3F4F6', color: '#4B5563', text: 'Pendiente', border: '#E5E7EB' };
    }
  };

  return (
    <div>
      {/* 1. TARJETA CABECERA BOUTIQUE EDITORIAL */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '1.75rem',
          border: '1px solid var(--admin-border-subtle)',
          marginBottom: '1.75rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: '#FAF0ED',
              color: 'var(--accent-terra)',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
              border: '1px solid rgba(194, 125, 110, 0.2)',
            }}
          >
            <Sparkles size={13} />
            <span>Gestión Operativa de Envíos</span>
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1C1917', letterSpacing: '-0.02em', margin: '0 0 0.35rem 0' }}>
            Pedidos & Despachos ({filteredOrders.length})
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#78716C', margin: 0 }}>
            Seguimiento de entregas contraentrega, mensajes rápidos de WhatsApp y actualización de estados.
          </p>
        </div>

        <ExportExcelButton
          data={filteredOrders.map((o) => ({
            'No. Pedido': o.orderNumber,
            Fecha: new Date(o.date || o.createdAt || Date.now()).toLocaleDateString('es-CO'),
            Cliente: o.customer.fullName,
            Teléfono: o.customer.phone,
            Ciudad: o.customer.city,
            Dirección: o.customer.address,
            Total_COP: o.total,
            Método_Pago: o.paymentMethod,
            Estado_Entrega: o.orderStatus,
          }))}
          fileName="Despachos_LovelyNight"
        />
      </div>

      {/* 2. FILTROS & BUSCADOR TÁCTIL */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid var(--admin-border-subtle)',
          marginBottom: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: '#FAF8F5', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <Search size={17} style={{ color: '#78716C' }} />
          <input
            type="text"
            placeholder="Buscar por cliente, teléfono, ciudad o # de pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '0.9rem', outline: 'none', color: '#1C1917', fontWeight: 500 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {/* Filtro por Estado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FAF8F5', padding: '0.5rem 0.85rem', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <Filter size={15} style={{ color: '#78716C' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C' }}>Estado:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#1C1917',
                outline: 'none',
              }}
            >
              <option value="ALL">Todos ({orders.length})</option>
              <option value="pendiente">Pendientes</option>
              <option value="confirmado_whatsapp">Confirmados WhatsApp</option>
              <option value="en_preparacion">En Empaque</option>
              <option value="despachado">Despachados / En Camino</option>
              <option value="entregado">Entregados</option>
              <option value="devuelto">Devueltos</option>
            </select>
          </div>

          {/* Filtro por Ciudad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FAF8F5', padding: '0.5rem 0.85rem', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <MapPin size={15} style={{ color: 'var(--accent-terra)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C' }}>Ciudad:</span>
            <select
              value={selectedCityFilter}
              onChange={(e) => setSelectedCityFilter(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#1C1917',
                outline: 'none',
              }}
            >
              <option value="ALL">Todas las Ciudades</option>
              {uniqueCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. LISTADO DE PEDIDOS: TARJETAS EDITORIALES DE ALTA FIDELIDAD */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredOrders.length === 0 ? (
          <div style={{ backgroundColor: '#FFFFFF', padding: '3.5rem 2rem', textAlign: 'center', borderRadius: '20px', border: '1px solid var(--admin-border-subtle)', color: '#78716C' }}>
            <Package size={36} style={{ color: 'var(--accent-terra)', margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#1C1917', margin: '0 0 0.35rem 0' }}>No hay pedidos que coincidan con la búsqueda</h3>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Prueba cambiando el filtro de estado o la ciudad seleccionada.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const badge = getStatusBadge(order.orderStatus);

            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid var(--admin-border-subtle)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Cabecera de la Ficha: Número de Orden, Fecha, Valor y Método de Pago */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.85rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1917', letterSpacing: '-0.01em' }}>
                        {order.orderNumber}
                      </span>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                        }}
                      >
                        {badge.text}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#78716C', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem' }}>
                      <Clock size={13} />
                      <span>
                        {new Date(order.date || order.createdAt || Date.now()).toLocaleDateString('es-CO', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Valor Total & Badge de Pago */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1C1917', letterSpacing: '-0.02em' }}>
                      ${order.total.toLocaleString('es-CO')} <span style={{ fontSize: '0.78rem', color: '#78716C', fontWeight: 500 }}>COP</span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: order.paymentMethod === 'contraentrega' ? '#92400E' : '#1E40AF',
                        backgroundColor: order.paymentMethod === 'contraentrega' ? '#FEF3C7' : '#EFF6FF',
                        border: `1px solid ${order.paymentMethod === 'contraentrega' ? '#FDE68A' : '#BFDBFE'}`,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        display: 'inline-block',
                        marginTop: '0.2rem',
                      }}
                    >
                      {order.paymentMethod === 'contraentrega' ? '🚚 PAGO CONTRAENTREGA' : '💳 TRANSFERENCIA BANCARIA'}
                    </span>
                  </div>
                </div>

                {/* Bloque Destinatario & Ciudad */}
                <div
                  style={{
                    backgroundColor: '#FAF8F5',
                    borderRadius: '14px',
                    padding: '1.15rem',
                    border: '1px solid #EAE6DF',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C', letterSpacing: '0.06em', display: 'block', marginBottom: '0.2rem' }}>
                      Destinatario
                    </span>
                    <strong style={{ fontSize: '0.98rem', color: '#1C1917', display: 'block' }}>{order.customer.fullName}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#44403C', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.3rem' }}>
                      <Phone size={13} style={{ color: '#10B981' }} />
                      <span style={{ fontWeight: 600 }}>{order.customer.phone}</span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C', letterSpacing: '0.06em', display: 'block', marginBottom: '0.2rem' }}>
                      Dirección de Despacho
                    </span>
                    <div style={{ fontSize: '0.9rem', color: '#1C1917', fontWeight: 700 }}>
                      {order.customer.address}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#78716C', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
                      <MapPin size={13} style={{ color: 'var(--accent-terra)' }} />
                      <span style={{ fontWeight: 600, color: '#1C1917' }}>{order.customer.city}</span>
                      {order.customer.neighborhood && <span>({order.customer.neighborhood})</span>}
                    </div>
                  </div>
                </div>

                {/* Detalle de Prendas Solicitadas */}
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C', letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem' }}>
                    Prendas en este Paquete ({order.items.reduce((s, i) => s + i.quantity, 0)} unidades):
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {order.items.map((it, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.6rem 0.85rem',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          border: '1px solid #E5E7EB',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={it.image}
                            alt={it.productName}
                            style={{ width: '36px', height: '44px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E5E7EB' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1C1917' }}>{it.productName}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-terra)', fontWeight: 700, backgroundColor: '#FAF0ED', padding: '0.15rem 0.5rem', borderRadius: '9999px', display: 'inline-block', marginTop: '0.2rem' }}>
                              Talla: {it.size} • {it.colorName || 'Color Estándar'}
                            </span>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1C1917' }}>x{it.quantity}</span>
                          <span style={{ fontSize: '0.78rem', color: '#78716C', display: 'block' }}>
                            ${(it.price * it.quantity).toLocaleString('es-CO')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones de WhatsApp & Cambio de Estado */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #F3F4F6' }}>
                  {/* Botón WhatsApp 1 Clic */}
                  <button
                    onClick={() => handleWhatsAppCustomer(order)}
                    style={{
                      padding: '0.85rem 1.25rem',
                      borderRadius: '9999px',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '0 3px 12px rgba(37, 211, 102, 0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <MessageCircle size={18} />
                    <span>Confirmar por WhatsApp</span>
                  </button>

                  {/* Selector de Estado Directo */}
                  <div>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.25rem',
                        borderRadius: '9999px',
                        border: '1.5px solid #D1D5DB',
                        backgroundColor: '#FAF8F5',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#1C1917',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <option value="pendiente">⏳ Estado: Pendiente</option>
                      <option value="confirmado_whatsapp">💬 Estado: Confirmado WhatsApp</option>
                      <option value="en_preparacion">📦 Estado: En Empaque</option>
                      <option value="despachado">🚚 Estado: Despachado / En Camino</option>
                      <option value="entregado">✓ Estado: Entregado con Éxito</option>
                      <option value="devuelto">✕ Estado: Devuelto</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
