export type ProductFabric = 'Satín Seda' | 'Piel de Durazno' | 'Térmica Polar' | 'Algodón Pima' | 'Lino / Viscosa' | 'Modal / Rib';

export type ProductGender = 'Mujer' | 'Hombre' | 'Unisex' | 'Infantil / Niñas';

export type ProductCategory =
  | 'pijamas-camiseras'
  | 'sets-cortos'
  | 'batas-kimonos'
  | 'pijamas-termicas'
  | 'combos-regalo'
  | 'hombre-loungewear';

export interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
  featured?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  fabric: string;
  image: string;
}

export interface ProductVariant {
  size: string; // S, M, L, XL, XXL, Talla Única, 4, 6, 8, etc.
  colorName: string;
  colorHex: string;
  stock: number;
  sku?: string;
  barcode?: string;
}

export interface ProductSEO {
  metaTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  keywords?: string[];
  imageAlt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  details: string[];
  gender?: ProductGender | string; // 'Mujer' | 'Hombre' | 'Unisex'
  fabric: ProductFabric | string;
  category: ProductCategory | string;
  subCategory?: string;
  collectionSlug?: string;
  price: number;
  comparePrice?: number;
  costPrice: number;
  packagingCost: number;
  images: string[];
  videoUrl?: string;
  variants: ProductVariant[];
  badges: string[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isCombo?: boolean;
  comboItems?: string[];
  seo?: ProductSEO;
  createdAt?: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  neighborhood?: string;
  city: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  costPrice: number;
  size: string;
  colorName: string;
  quantity: number;
}

export type PaymentMethod =
  | 'contraentrega'
  | 'transferencia_bancolombia'
  | 'nequi'
  | 'tarjeta_credito'
  | 'tarjeta_pse'
  | 'addi'
  | 'sistecredito';

export type PaymentStatus =
  | 'pendiente'
  | 'pagado'
  | 'por_cobrar_en_entrega'
  | 'fallido'
  | 'reembolsado';

export type OrderStatus =
  | 'pendiente'
  | 'confirmado_whatsapp'
  | 'en_preparacion'
  | 'despachado'
  | 'entregado'
  | 'devuelto'
  | 'cancelado';

export interface OrderFinancials {
  totalRevenue: number;
  totalCost: number;
  grossProfit: number;
  netProfitMargin: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date?: string;
  createdAt?: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  carrier: string;
  trackingNumber?: string;
  financials: OrderFinancials;
}

export interface KPIStats {
  totalRevenue: number;
  totalCost: number;
  grossProfit: number;
  netProfit: number;
  profitMarginPercent: number;
  averageTicket: number;
  averageOrderValue: number;
  totalUnitsSold: number;
  netProfitMargin: number;
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  returnedOrders: number;
  lowStockProductsCount: number;
  lowStockItemsCount: number;
}
