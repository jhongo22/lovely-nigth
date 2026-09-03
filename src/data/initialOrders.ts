import { Order } from '@/types/store';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'LN-2026-1001',
    date: '2026-08-31T14:30:00Z',
    customer: {
      fullName: 'Valentina Restrepo',
      email: 'valen.restrepo@gmail.com',
      phone: '3128945612',
      address: 'Calle 10A # 36-24, Apto 402',
      neighborhood: 'El Poblado',
      city: 'Medellín',
      notes: 'Por favor timbrar antes de subir'
    },
    items: [
      {
        productId: 'prod-001',
        productName: 'Pijama Camisera Satín Seda Rose Luxe',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
        price: 98000,
        costPrice: 38000,
        size: 'M',
        colorName: 'Rose Mauve',
        quantity: 1
      }
    ],
    subtotal: 98000,
    shippingCost: 0,
    discount: 0,
    total: 98000,
    paymentMethod: 'contraentrega',
    paymentStatus: 'por_cobrar_en_entrega',
    orderStatus: 'en_preparacion',
    carrier: 'Mensajería Local Medellín',
    trackingNumber: 'MED-9921',
    financials: {
      totalRevenue: 98000,
      totalCost: 38000 + 4500 + 8000, // Costo confección + empaque + flete local
      grossProfit: 55500,
      netProfitMargin: 56.6
    }
  },
  {
    id: 'ord-1002',
    orderNumber: 'LN-2026-1002',
    date: '2026-08-30T10:15:00Z',
    customer: {
      fullName: 'Mariana Gómez Londoño',
      email: 'mariana.gomez@hotmail.com',
      phone: '3004567890',
      address: 'Transversal 39B # 72-15',
      neighborhood: 'Laureles',
      city: 'Medellín'
    },
    items: [
      {
        productId: 'prod-003',
        productName: 'Box Regalo "Ritual de Noche" Lovely Luxe',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
        price: 139000,
        costPrice: 52000,
        size: 'S',
        colorName: 'Rose Mauve Box',
        quantity: 1
      }
    ],
    subtotal: 139000,
    shippingCost: 0,
    discount: 0,
    total: 139000,
    paymentMethod: 'transferencia_bancolombia',
    paymentStatus: 'pagado',
    orderStatus: 'despachado',
    carrier: 'Mensajería Local Medellín',
    trackingNumber: 'MED-9915',
    financials: {
      totalRevenue: 139000,
      totalCost: 52000 + 9500 + 8000,
      grossProfit: 69500,
      netProfitMargin: 50.0
    }
  },
  {
    id: 'ord-1003',
    orderNumber: 'LN-2026-1003',
    date: '2026-08-29T16:45:00Z',
    customer: {
      fullName: 'Carlos Andrés Mejía',
      email: 'carlos.mejia@outlook.com',
      phone: '3157891234',
      address: 'Carrera 43A # 18 Sur - 50',
      neighborhood: 'Zuñiga',
      city: 'Envigado',
      notes: 'Es para regalo de cumpleaños, tarjeta con nombre Laura'
    },
    items: [
      {
        productId: 'prod-006',
        productName: 'Dúo Pack Ahorro: 2 Pijamas Satín Seda Lovely',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
        price: 159000,
        costPrice: 76000,
        size: 'M',
        colorName: 'Dúo Rose & Gold',
        quantity: 1
      }
    ],
    subtotal: 159000,
    shippingCost: 0,
    discount: 0,
    total: 159000,
    paymentMethod: 'tarjeta_pse',
    paymentStatus: 'pagado',
    orderStatus: 'entregado',
    carrier: 'Mensajería Local Medellín',
    trackingNumber: 'MED-9884',
    financials: {
      totalRevenue: 159000,
      totalCost: 76000 + 7000 + 9000,
      grossProfit: 67000,
      netProfitMargin: 42.1
    }
  },
  {
    id: 'ord-1004',
    orderNumber: 'LN-2026-1004',
    date: '2026-08-28T11:20:00Z',
    customer: {
      fullName: 'Camila Ospina',
      email: 'camila.ospina@gmail.com',
      phone: '3189923456',
      address: 'Calle 127 # 15-40, Torre 2 Apto 801',
      neighborhood: 'Usaquén',
      city: 'Bogotá'
    },
    items: [
      {
        productId: 'prod-004',
        productName: 'Pijama Térmica Polar "Cloud Soft" Clima Frío',
        image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop',
        price: 89000,
        costPrice: 34000,
        size: 'M',
        colorName: 'Gris Perla',
        quantity: 1
      }
    ],
    subtotal: 89000,
    shippingCost: 12000,
    discount: 0,
    total: 101000,
    paymentMethod: 'contraentrega',
    paymentStatus: 'por_cobrar_en_entrega',
    orderStatus: 'despachado',
    carrier: 'Interrapidísimo',
    trackingNumber: 'INT-77281903',
    financials: {
      totalRevenue: 101000,
      totalCost: 34000 + 4000 + 12000,
      grossProfit: 51000,
      netProfitMargin: 50.5
    }
  }
];
