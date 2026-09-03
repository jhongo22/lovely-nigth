'use client';

import React, { useState } from 'react';
import { useStoreData } from '@/context/StoreDataContext';
import { DollarSign, PieChart, TrendingUp, Download, ArrowUpRight } from 'lucide-react';
import ExportExcelButton from '@/components/admin/ExportExcelButton';

export default function AdminLiquidacionPage() {
  const { orders, products, stats } = useStoreData();
  const [selectedMonth, setSelectedMonth] = useState('todos');

  // Cálculos consolidados
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalConfectionCosts = orders.reduce(
    (acc, o) => acc + o.items.reduce((iAcc, item) => iAcc + item.costPrice * item.quantity, 0),
    0
  );
  const totalPackagingCosts = orders.reduce(
    (acc, o) => acc + o.items.reduce((iAcc, item) => iAcc + 4000 * item.quantity, 0),
    0
  );
  const totalShippingExpenses = orders.reduce((acc, o) => acc + (o.shippingCost || 8000), 0);
  const totalOperationalCosts = totalConfectionCosts + totalPackagingCosts + totalShippingExpenses;
  const netProfit = totalRevenue - totalOperationalCosts;
  const netMarginPercent = totalRevenue > 0 ? Number(((netProfit / totalRevenue) * 100).toFixed(1)) : 0;

  const excelFinancialReport = orders.map((o) => {
    const confectionCost = o.items.reduce((sum, it) => sum + it.costPrice * it.quantity, 0);
    const packagingCost = o.items.reduce((sum, it) => sum + 4000 * it.quantity, 0);
    const shipping = o.shippingCost || 8000;
    const orderCost = confectionCost + packagingCost + shipping;
    const profit = o.total - orderCost;
    const margin = o.total > 0 ? Number(((profit / o.total) * 100).toFixed(1)) : 0;

    return {
      'No. Pedido': o.orderNumber,
      'Fecha': new Date(o.date || o.createdAt || Date.now()).toLocaleDateString('es-CO'),
      'Cliente': o.customer.fullName,
      'Ciudad': o.customer.city,
      'Ingreso Bruto (COP)': o.total,
      'Costo Confección & Telas (COP)': confectionCost,
      'Costo Empaque de Lujo (COP)': packagingCost,
      'Costo Flete / Mensajero (COP)': shipping,
      'Costo Total Operativo (COP)': orderCost,
      'Utilidad Neta Real (COP)': profit,
      'Margen Neto (%)': `${margin}%`,
    };
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827' }}>
            Liquidación Financiera & Rentabilidad
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>
            Auditoría de ingresos reales vs costos de confección, empaques, fletes y utilidad neta por pedido.
          </p>
        </div>
        <ExportExcelButton data={excelFinancialReport} fileName="Liquidacion_Financiera_LovelyNight" />
      </div>

      {/* Tarjetas de Resumen Financiero */}
      <div className="kpi-grid">
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--text-primary)' }}>
          <div className="kpi-header">
            <span>Ventas Brutas Detal</span>
            <DollarSign size={18} style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="kpi-value">${totalRevenue.toLocaleString('es-CO')}</div>
          <div className="kpi-footer">
            <span>Facturación directa al cliente</span>
          </div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid #EF4444' }}>
          <div className="kpi-header">
            <span>Costos Operativos Totales</span>
            <PieChart size={18} style={{ color: '#EF4444' }} />
          </div>
          <div className="kpi-value" style={{ color: '#EF4444' }}>
            ${totalOperationalCosts.toLocaleString('es-CO')}
          </div>
          <div className="kpi-footer">
            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              Telas (${totalConfectionCosts.toLocaleString('es-CO')}) + Empaques + Fletes
            </span>
          </div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid #10B981' }}>
          <div className="kpi-header">
            <span>Ganancia Neta Real</span>
            <TrendingUp size={18} style={{ color: '#10B981' }} />
          </div>
          <div className="kpi-value" style={{ color: '#10B981' }}>
            ${netProfit.toLocaleString('es-CO')}
          </div>
          <div className="kpi-footer">
            <span className="kpi-positive">Margen Neto: {netMarginPercent}%</span>
          </div>
        </div>
      </div>

      {/* Desglose Detallado por Pedido */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Auditoría de Liquidación por Pedido</h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>No. Pedido</th>
                <th>Cliente & Ciudad</th>
                <th>Ingreso Venta</th>
                <th>Costo Confección</th>
                <th>Empaque</th>
                <th>Flete Estimado</th>
                <th>Ganancia Neta</th>
                <th>Margen %</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const confectionCost = o.items.reduce((sum, it) => sum + it.costPrice * it.quantity, 0);
                const packagingCost = o.items.reduce((sum, it) => sum + 4000 * it.quantity, 0);
                const shipping = o.shippingCost || 8000;
                const totalCost = confectionCost + packagingCost + shipping;
                const profit = o.total - totalCost;
                const margin = o.total > 0 ? Number(((profit / o.total) * 100).toFixed(1)) : 0;

                return (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 700 }}>{o.orderNumber}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{o.customer.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{o.customer.city}</div>
                    </td>
                    <td style={{ fontWeight: 700 }}>${o.total.toLocaleString('es-CO')}</td>
                    <td style={{ color: '#6B7280' }}>-${confectionCost.toLocaleString('es-CO')}</td>
                    <td style={{ color: '#6B7280' }}>-${packagingCost.toLocaleString('es-CO')}</td>
                    <td style={{ color: '#6B7280' }}>-${shipping.toLocaleString('es-CO')}</td>
                    <td>
                      <span style={{ color: profit >= 0 ? '#10B981' : '#EF4444', fontWeight: 700 }}>
                        +${profit.toLocaleString('es-CO')}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 700,
                          color: margin >= 40 ? '#10B981' : '#F59E0B',
                        }}
                      >
                        {margin}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
