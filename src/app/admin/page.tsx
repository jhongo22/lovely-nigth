'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStoreData } from '@/context/StoreDataContext';
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  Truck,
  CheckCircle,
  Clock,
  ExternalLink,
  MessageCircle,
  X,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import ExportExcelButton from '@/components/admin/ExportExcelButton';
import { Order, OrderStatus } from '@/types/store';

export default function AdminDashboardPage() {
  const { kpis, orders, products, updateOrderStatus } = useStoreData();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const recentOrders = orders.slice(0, 5);

  const excelExportData = orders.map((o) => ({
    'No. Pedido': o.orderNumber,
    Fecha: new Date(o.date || o.createdAt || Date.now()).toLocaleDateString('es-CO'),
    Cliente: o.customer.fullName,
    Ciudad: o.customer.city,
    Teléfono: o.customer.phone,
    'Total (COP)': o.total,
    'Método de Pago': o.paymentMethod,
    'Estado Pedido': o.orderStatus,
    'Utilidad Neta (COP)': o.financials.grossProfit,
    'Margen Neto (%)': `${o.financials.netProfitMargin}%`,
  }));

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

  return (
    <div>
      {/* 1. SECCIÓN DE BIENVENIDA & ACCIÓN RÁPIDA */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '1.75rem',
          border: '1px solid var(--admin-border-subtle)',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
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
                marginBottom: '0.65rem',
                border: '1px solid rgba(194, 125, 110, 0.25)',
              }}
            >
              <Sparkles size={13} />
              <span>Tienda D2C Medellín • Control General</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 1.95rem)',
                fontWeight: 700,
                color: '#1C1917',
                margin: '0 0 0.4rem 0',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Panel de Despacho & Rentabilidad
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#78716C', lineHeight: 1.5, margin: 0, maxWidth: '640px' }}>
              Supervisa tus ventas al detal, utilidad neta real tras empaque y estado de pedidos contraentrega en tiempo real.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', width: '100%', maxWidth: '380px' }}>
            <Link
              href="/admin/pedidos"
              className="admin-btn admin-btn-rose"
              style={{ flex: 1, padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Truck size={16} />
              <span>Ver Despachos</span>
            </Link>

            <Link
              href="/admin/productos"
              className="admin-btn"
              style={{
                flex: 1,
                padding: '0.75rem 1.25rem',
                fontSize: '0.85rem',
                backgroundColor: '#FAF8F5',
                color: '#1C1917',
                border: '1px solid #D1D5DB',
              }}
            >
              <Package size={16} />
              <span>Catálogo</span>
            </Link>
          </div>
        </div>

        {/* Barra de Descarga de Reporte */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
          <ExportExcelButton data={excelExportData} fileName="Reporte_Ventas_LovelyNight" />
        </div>
      </div>

      {/* 2. KPIS EDITORIALES */}
      <div className="kpi-grid">
        {/* KPI 1: Ventas Totales */}
        <div className="kpi-card kpi-card-dark">
          <div className="kpi-header">
            <span className="kpi-label">Ingresos Totales (Detal)</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#FAF8F5', color: '#1C1917' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="kpi-val">${kpis.totalRevenue.toLocaleString('es-CO')}</div>
          <div className="kpi-footer-note">
            <span style={{ color: '#10B981', fontWeight: 700 }}>↑ 100% Venta Directa</span>
            <span>• {kpis.totalOrders} pedidos</span>
          </div>
        </div>

        {/* KPI 2: Utilidad Neta Real */}
        <div className="kpi-card kpi-card-emerald">
          <div className="kpi-header">
            <span className="kpi-label">Utilidad Neta Real</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-val" style={{ color: '#059669' }}>
            ${kpis.grossProfit.toLocaleString('es-CO')}
          </div>
          <div className="kpi-footer-note">
            <span>Margen Promedio:</span>
            <strong style={{ color: '#059669' }}>{kpis.netProfitMargin}%</strong>
          </div>
        </div>

        {/* KPI 3: Ticket Promedio AOV */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Ticket Promedio (AOV)</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#FFFBEB', color: '#D97706' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="kpi-val">${kpis.averageTicket.toLocaleString('es-CO')}</div>
          <div className="kpi-footer-note">
            <span>{kpis.totalUnitsSold} prendas vendidas</span>
          </div>
        </div>

        {/* KPI 4: Alertas de Stock */}
        <div className="kpi-card kpi-card-amber">
          <div className="kpi-header">
            <span className="kpi-label">Alertas de Inventario</span>
            <div
              className="kpi-icon-wrap"
              style={{
                backgroundColor: kpis.lowStockProductsCount > 0 ? '#FEF2F2' : '#F0FDF4',
                color: kpis.lowStockProductsCount > 0 ? '#DC2626' : '#16A34A',
              }}
            >
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="kpi-val" style={{ color: kpis.lowStockProductsCount > 0 ? '#DC2626' : '#1C1917' }}>
            {kpis.lowStockProductsCount}
          </div>
          <div className="kpi-footer-note">
            <span>Variantes con stock ≤ 5 unidades</span>
          </div>
        </div>
      </div>

      {/* 3. ÚLTIMOS PEDIDOS RECIBIDOS (CLICKEABLES PARA VER DETALLES) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid var(--admin-border-subtle)',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>
              Últimos Pedidos Recibidos
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#78716C' }}>Toca cualquier pedido para ver el desglose completo</span>
          </div>

          <Link
            href="/admin/pedidos"
            style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--admin-accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <span>Ver Todos los Pedidos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tarjetas Clickeables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {recentOrders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => setSelectedOrder(ord)}
              style={{
                backgroundColor: '#FAF8F5',
                borderRadius: '14px',
                padding: '1.15rem',
                border: '1px solid #EAE6DF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="recent-order-row"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '1rem', color: '#1C1917' }}>{ord.orderNumber}</strong>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.55rem',
                      borderRadius: '9999px',
                      backgroundColor: ord.paymentMethod === 'contraentrega' ? '#FEF3C7' : '#EFF6FF',
                      color: ord.paymentMethod === 'contraentrega' ? '#92400E' : '#1E40AF',
                    }}
                  >
                    {ord.paymentMethod === 'contraentrega' ? '🚚 Contraentrega' : '💳 Transferencia'}
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', color: '#1C1917', fontWeight: 600, marginTop: '0.25rem' }}>
                  {ord.customer.fullName} • <span style={{ color: '#78716C', fontWeight: 400 }}>{ord.customer.city}</span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#78716C', marginTop: '0.15rem' }}>
                  {ord.items.map((i) => `${i.quantity}x ${i.productName} (${i.size})`).join(', ')}
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1C1917' }}>
                    ${ord.total.toLocaleString('es-CO')}
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: ord.orderStatus === 'entregado' ? '#15803D' : '#D97706',
                    }}
                  >
                    {ord.orderStatus.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D1D5DB' }}>
                  <ArrowRight size={15} style={{ color: '#1C1917' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MODAL DETALLE COMPLETO DEL PEDIDO AL HACER CLIC */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: '1px solid var(--admin-border-subtle)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-terra)', letterSpacing: '0.08em' }}>
                  Detalle Completo de Pedido
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1C1917', margin: '0.15rem 0 0 0' }}>
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E5E7EB', backgroundColor: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Contenido del Pedido */}
            <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Información del Cliente */}
              <div style={{ backgroundColor: '#FAF8F5', borderRadius: '14px', padding: '1.15rem', border: '1px solid #EAE6DF' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C', display: 'block', marginBottom: '0.4rem' }}>
                  Datos del Destinatario
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1C1917' }}>{selectedOrder.customer.fullName}</div>
                <div style={{ fontSize: '0.88rem', color: '#44403C', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem' }}>
                  <Phone size={13} style={{ color: '#10B981' }} />
                  <span style={{ fontWeight: 600 }}>{selectedOrder.customer.phone}</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#1C1917', fontWeight: 600, marginTop: '0.35rem' }}>
                  📍 {selectedOrder.customer.address}, {selectedOrder.customer.city}
                </div>
                {selectedOrder.customer.notes && (
                  <div style={{ fontSize: '0.8rem', color: '#78716C', fontStyle: 'italic', marginTop: '0.4rem' }}>
                    Notas: "{selectedOrder.customer.notes}"
                  </div>
                )}
              </div>

              {/* Prendas Solicitadas */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#78716C', display: 'block', marginBottom: '0.6rem' }}>
                  Prendas en el Pedido ({selectedOrder.items.reduce((s, i) => s + i.quantity, 0)} unidades):
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={it.image}
                          alt={it.productName}
                          style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E5E7EB' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1C1917' }}>{it.productName}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-terra)', fontWeight: 700, backgroundColor: '#FAF0ED', padding: '0.15rem 0.5rem', borderRadius: '9999px', display: 'inline-block', marginTop: '0.2rem' }}>
                            Talla: {it.size} • {it.colorName || 'Color Estándar'}
                          </span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1C1917' }}>x{it.quantity}</span>
                        <span style={{ fontSize: '0.8rem', color: '#78716C', display: 'block' }}>
                          ${(it.price * it.quantity).toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen Financiero de la Orden */}
              <div style={{ backgroundColor: '#FAF8F5', borderRadius: '14px', padding: '1rem', border: '1px solid #EAE6DF', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#78716C' }}>Subtotal Prendas:</span>
                  <span style={{ fontWeight: 600 }}>${selectedOrder.subtotal.toLocaleString('es-CO')} COP</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#78716C' }}>Costo de Envío:</span>
                  <span style={{ fontWeight: 600 }}>{selectedOrder.shippingCost === 0 ? 'GRATIS' : `$${selectedOrder.shippingCost.toLocaleString('es-CO')}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid #E5E7EB', fontSize: '1.1rem', fontWeight: 800, color: '#1C1917' }}>
                  <span>Total a Cobrar:</span>
                  <span>${selectedOrder.total.toLocaleString('es-CO')} COP</span>
                </div>
              </div>

              {/* Botones de Acción Rápida */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button
                  onClick={() => handleWhatsAppCustomer(selectedOrder)}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    borderRadius: '9999px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Enviar Confirmación por WhatsApp</span>
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value as OrderStatus;
                      updateOrderStatus(selectedOrder.id, newStatus);
                      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '9999px',
                      border: '1.5px solid #D1D5DB',
                      backgroundColor: '#FAF8F5',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#1C1917',
                      outline: 'none',
                    }}
                  >
                    <option value="pendiente">⏳ Estado: Pendiente</option>
                    <option value="confirmado_whatsapp">💬 Estado: Confirmado WhatsApp</option>
                    <option value="en_preparacion">📦 Estado: En Empaque</option>
                    <option value="despachado">🚚 Estado: Despachado</option>
                    <option value="entregado">✓ Estado: Entregado</option>
                    <option value="devuelto">✕ Estado: Devuelto</option>
                  </select>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    style={{
                      padding: '0.75rem 1.25rem',
                      borderRadius: '9999px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .recent-order-row:hover {
          background-color: #FFFFFF !important;
          border-color: var(--accent-terra) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
