'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Gift,
  Sparkles,
  Lock,
  MessageCircle,
  CreditCard,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStoreData } from '@/context/StoreDataContext';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    freeShippingThreshold,
    progressToFreeShipping,
    amountNeededForFreeShipping,
  } = useCart();

  const { addOrder } = useStoreData();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Medellín');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'contraentrega' | 'transferencia_bancolombia'>('contraentrega');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState('');

  if (!isOpen) return null;

  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 9000;
  const total = subtotal + shippingCost;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Por favor completa todos tus datos de envío.');
      return;
    }

    const orderItems = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      image: item.product.images[0],
      price: item.price,
      costPrice: item.product.costPrice,
      size: item.size,
      colorName: item.colorName,
      quantity: item.quantity,
    }));

    const totalCost =
      items.reduce(
        (sum, item) => sum + (item.product.costPrice + item.product.packagingCost) * item.quantity,
        0
      ) + shippingCost;

    const newOrder = await addOrder({
      customer: {
        fullName: customerName,
        email: `${customerPhone}@pedido-lovely.com`,
        phone: customerPhone,
        address: customerAddress,
        city: customerCity,
      },
      items: orderItems,
      subtotal,
      shippingCost,
      discount: 0,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'contraentrega' ? 'por_cobrar_en_entrega' : 'pendiente',
      orderStatus: 'pendiente',
      carrier: customerCity.toLowerCase().includes('medell') ? 'Mensajería Local Medellín' : 'Interrapidísimo',
      financials: {
        totalRevenue: total,
        totalCost,
        grossProfit: total - totalCost,
        netProfitMargin: Number((((total - totalCost) / total) * 100).toFixed(1)),
      },
    });

    setCompletedOrderNumber(newOrder.orderNumber);
    setOrderCompleted(true);
    clearCart();

    const itemsList = items
      .map(
        (i) =>
          `• ${i.quantity}x *${i.product.name}*\n  (Talla: ${i.size} | Color: ${i.colorName}) - $${(
            i.price * i.quantity
          ).toLocaleString('es-CO')} COP`
      )
      .join('\n');

    const whatsappMessage = encodeURIComponent(
      `🌙 *¡Hola Lovely Night! Acabo de registrar mi pedido:*\n\n` +
        `📦 *Orden:* #${newOrder.orderNumber}\n` +
        `👤 *Cliente:* ${customerName}\n` +
        `📱 *Celular:* ${customerPhone}\n` +
        `📍 *Dirección:* ${customerCity} - ${customerAddress}\n` +
        (orderNotes ? `📝 *Nota:* ${orderNotes}\n` : '') +
        `🚚 *Método de Pago:* ${
          paymentMethod === 'contraentrega'
            ? 'Pago Contraentrega (Efectivo/Transferencia al recibir)'
            : 'Transferencia Bancolombia / Nequi'
        }\n\n` +
        `👗 *Prendas Seleccionadas:*\n${itemsList}\n\n` +
        `💰 *Subtotal:* $${subtotal.toLocaleString('es-CO')} COP\n` +
        `🚚 *Envío:* ${shippingCost === 0 ? 'GRATIS 🎉' : '$9.000 COP'}\n` +
        `🔥 *TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP\n\n` +
        `Por favor confírmenme el despacho de mi paquete. ¡Gracias!`
    );

    setTimeout(() => {
      window.open(`https://wa.me/573000000000?text=${whatsappMessage}`, '_blank');
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(18, 21, 27, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeInOverlay 0.25s ease',
      }}
      onClick={closeCart}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.2)',
          animation: 'slideInDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. HEADER DEL CARRITO */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--accent-terra)' }} />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1C1C', letterSpacing: '-0.01em' }}>
              Tu Carrito de Compras
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                backgroundColor: 'var(--accent-soft-pink)',
                color: 'var(--accent-terra)',
                padding: '0.15rem 0.55rem',
                borderRadius: '9999px',
              }}
            >
              {items.length} {items.length === 1 ? 'prenda' : 'prendas'}
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#F3F4F6',
              color: '#1C1C1C',
              transition: 'background-color 0.2s ease',
            }}
            aria-label="Cerrar carrito"
          >
            <X size={18} />
          </button>
        </div>

        {/* 2. BARRA DE PROGRESO DE ENVÍO GRATIS */}
        <div
          style={{
            padding: '0.9rem 1.5rem',
            backgroundColor: '#fdf6f0',
            borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              color: '#1C1C1C',
              marginBottom: '0.45rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={15} style={{ color: 'var(--accent-terra)' }} />
              {amountNeededForFreeShipping === 0 ? (
                <span style={{ fontWeight: 700, color: '#15803D' }}>
                  ¡Felicidades! Tienes ENVÍO GRATIS 🎉
                </span>
              ) : (
                <span>
                  Agrega <strong>${amountNeededForFreeShipping.toLocaleString('es-CO')} COP</strong> para{' '}
                  <strong style={{ color: 'var(--accent-terra)' }}>Envío Gratis</strong>
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              {Math.min(100, Math.round(progressToFreeShipping))}%
            </span>
          </div>

          {/* Barra Animada */}
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#E5E7EB',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressToFreeShipping}%`,
                height: '100%',
                backgroundColor: progressToFreeShipping >= 100 ? '#10B981' : 'var(--accent-terra)',
                borderRadius: '9999px',
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        </div>

        {/* 3. CUERPO DEL CARRITO (Lista, Formulario o Estado Vacío) */}
        {orderCompleted ? (
          /* PANTALLA DE ÉXITO */
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                boxShadow: '0 8px 20px rgba(22, 163, 74, 0.2)',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
              ¡Pedido Registrado con Éxito!
            </h3>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--accent-terra)',
                backgroundColor: 'var(--accent-soft-pink)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                marginBottom: '1rem',
              }}
            >
              Orden #{completedOrderNumber}
            </span>

            <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '2rem' }}>
              Te estamos redirigiendo a WhatsApp para coordinar los detalles de entrega con tu asesora.
            </p>

            <button
              onClick={() => {
                setOrderCompleted(false);
                setIsCheckingOut(false);
                closeCart();
              }}
              className="btn-boutique-pill"
            >
              Seguir Explorando Colecciones
            </button>
          </div>
        ) : isCheckingOut ? (
          /* FORMULARIO DE DESPACHO & PAGO CONTRAENTREGA */
          <form
            onSubmit={handleCheckoutSubmit}
            style={{
              padding: '1.5rem',
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Lock size={15} style={{ color: 'var(--accent-terra)' }} />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Datos de Entrega & Despacho
              </h3>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#374151' }}>
                Nombre y Apellidos *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Juliana Morales Gómez"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#374151' }}>
                WhatsApp / Celular de Contacto *
              </label>
              <input
                type="tel"
                required
                placeholder="Ej: 300 123 4567"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#374151' }}>
                Ciudad o Municipio *
              </label>
              <select
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="Medellín">Medellín (Entrega Mismo Día / 24h)</option>
                <option value="Envigado">Envigado</option>
                <option value="Itagüí">Itagüí</option>
                <option value="Sabaneta">Sabaneta</option>
                <option value="Bello">Bello</option>
                <option value="Rionegro / Oriente">Rionegro / Oriente Antioqueño</option>
                <option value="Bogotá">Bogotá D.C.</option>
                <option value="Cali">Cali</option>
                <option value="Barranquilla">Barranquilla</option>
                <option value="Otra Ciudad Colombia">Otra Ciudad (Nacional)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#374151' }}>
                Dirección Completa, Barrio y Apto *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Cra 43A # 12-45 Apto 502, Edificio Alborada"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', color: '#374151' }}>
                Instrucciones Especiales o Nota de Regalo (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: Empacar para regalo / Timbrar en portería"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Selector de Método de Pago */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', color: '#374151' }}>
                Forma de Pago Seleccionada
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    border: paymentMethod === 'contraentrega' ? '1.5px solid var(--accent-terra)' : '1px solid #E5E7EB',
                    backgroundColor: paymentMethod === 'contraentrega' ? 'var(--accent-soft-pink)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'contraentrega'}
                    onChange={() => setPaymentMethod('contraentrega')}
                  />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827' }}>
                      🚚 Pago Contraentrega
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Pagas en efectivo o transferencia al mensajero cuando llegue a tu casa
                    </div>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    border: paymentMethod === 'transferencia_bancolombia' ? '1.5px solid var(--accent-terra)' : '1px solid #E5E7EB',
                    backgroundColor: paymentMethod === 'transferencia_bancolombia' ? 'var(--accent-soft-pink)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'transferencia_bancolombia'}
                    onChange={() => setPaymentMethod('transferencia_bancolombia')}
                  />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827' }}>
                      💳 Transferencia Bancolombia / Nequi
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Coordinas el comprobante directamente por WhatsApp
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Botones de Navegación del Checkout */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="btn-boutique-pill-outline"
                style={{ flex: 1, padding: '0.85rem' }}
              >
                Volver
              </button>
              <button
                type="submit"
                className="btn-boutique-pill"
                style={{ flex: 2, padding: '0.85rem' }}
              >
                Confirmar Orden (${total.toLocaleString('es-CO')})
              </button>
            </div>
          </form>
        ) : items.length === 0 ? (
          /* CARRITO VACÍO */
          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#fdf6f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--text-muted)',
              }}
            >
              <ShoppingBag size={32} strokeWidth={1.25} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1C1C1C', marginBottom: '0.35rem' }}>
              Tu carrito está vacío
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem', maxWidth: '280px' }}>
              Descubre nuestras pijamas en satín seda y sets suaves diseñados para descansar.
            </p>
            <button onClick={closeCart} className="btn-boutique-pill">
              Explorar Colecciones
            </button>
          </div>
        ) : (
          /* LISTA DE PRENDAS EN EL CARRITO */
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.85rem',
                    borderRadius: '12px',
                    backgroundColor: '#fdf6f0',
                    border: '1px solid rgba(28, 28, 28, 0.06)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{
                      width: '75px',
                      height: '95px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1C1C1C', lineHeight: 1.25 }}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ color: '#9CA3AF', padding: '2px', transition: 'color 0.2s' }}
                          title="Eliminar prenda"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <span>Talla: <strong>{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong>{item.colorName}</strong></span>
                      </div>
                    </div>

                    {/* Selector de Cantidad & Total de Prenda */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '9999px',
                          padding: '0.15rem 0.4rem',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ padding: '0.2rem 0.4rem', color: '#4B5563' }}
                        >
                          <Minus size={11} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '22px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ padding: '0.2rem 0.4rem', color: '#4B5563' }}
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#1C1C1C' }}>
                        ${(item.price * item.quantity).toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FOOTER CON DESGLOSE DE COSTOS Y BOTÓN DE CHECKOUT */}
        {items.length > 0 && !isCheckingOut && !orderCompleted && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid rgba(28, 28, 28, 0.08)',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.03)',
            }}
          >
            {/* Desglose */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal ({items.length} {items.length === 1 ? 'prenda' : 'prendas'})</span>
                <span>${subtotal.toLocaleString('es-CO')} COP</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Costo de Envío</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong style={{ color: '#16A34A' }}>¡GRATIS!</strong>
                  ) : (
                    <span>$9.000 COP</span>
                  )}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid #E5E7EB',
                  marginTop: '0.25rem',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>Total Estimado</span>
                <span style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--accent-terra)' }}>
                  ${total.toLocaleString('es-CO')} COP
                </span>
              </div>
            </div>

            {/* Botón Principal de Checkout */}
            <button
              onClick={() => setIsCheckingOut(true)}
              className="btn-boutique-pill"
              style={{ width: '100%', padding: '1.05rem' }}
            >
              <span>Continuar con Pago Contraentrega</span>
              <ArrowRight size={16} />
            </button>

            {/* Badges de Confianza al Pie del Carrito */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.25rem',
                marginTop: '0.85rem',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldCheck size={13} style={{ color: '#10B981' }} /> Pagas al recibir
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={13} style={{ color: 'var(--accent-terra)' }} /> Garantía de talla
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInDrawer {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
