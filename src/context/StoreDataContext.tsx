'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, KPIStats, CollectionItem, CategoryItem } from '@/types/store';
import { INITIAL_PRODUCTS } from '@/data/initialProducts';
import { INITIAL_ORDERS } from '@/data/initialOrders';
import { supabase } from '@/lib/supabaseClient';

export const initialCollections: CollectionItem[] = [];
export const initialCategories: CategoryItem[] = [];

interface StoreDataContextType {
  products: Product[];
  orders: Order[];
  collections: CollectionItem[];
  categories: CategoryItem[];
  kpis: KPIStats;
  stats: KPIStats;
  isLoading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<Product>;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCollection: (collection: Omit<CollectionItem, 'id'>) => Promise<CollectionItem>;
  updateCollection: (id: string, updatedFields: Partial<CollectionItem>) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  addCategory: (category: Omit<CategoryItem, 'id'>) => Promise<CategoryItem>;
  updateCategory: (id: string, updatedFields: Partial<CategoryItem>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (id: string, status: Order['orderStatus']) => Promise<void>;
  updatePaymentStatus: (id: string, status: Order['paymentStatus']) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

// Mapeador DB -> App
const mapDbToProduct = (dbRow: any): Product => ({
  id: dbRow.id,
  name: dbRow.name,
  slug: dbRow.slug,
  tagline: dbRow.tagline || '',
  description: dbRow.description || '',
  details: Array.isArray(dbRow.details) ? dbRow.details : [],
  gender: dbRow.gender || 'Mujer',
  fabric: dbRow.fabric,
  category: dbRow.category,
  subCategory: dbRow.sub_category || undefined,
  collectionSlug: dbRow.collection_slug || undefined,
  price: Number(dbRow.price),
  comparePrice: dbRow.compare_price ? Number(dbRow.compare_price) : undefined,
  costPrice: Number(dbRow.cost_price || 0),
  packagingCost: Number(dbRow.packaging_cost || 0),
  images: Array.isArray(dbRow.images) ? dbRow.images : [],
  videoUrl: dbRow.video_url || undefined,
  variants: Array.isArray(dbRow.variants) ? dbRow.variants : [],
  badges: Array.isArray(dbRow.badges) ? dbRow.badges : [],
  rating: Number(dbRow.rating || 5.0),
  reviewsCount: Number(dbRow.reviews_count || 0),
  featured: dbRow.featured ?? true,
  isCombo: dbRow.is_combo ?? false,
  comboItems: Array.isArray(dbRow.combo_items) ? dbRow.combo_items : undefined,
  seo: dbRow.seo || undefined,
  createdAt: dbRow.created_at,
});

const mapProductToDb = (p: Partial<Product>) => {
  const row: any = {};
  if (p.id !== undefined) row.id = p.id;
  if (p.name !== undefined) row.name = p.name;
  if (p.slug !== undefined) row.slug = p.slug;
  if (p.tagline !== undefined) row.tagline = p.tagline;
  if (p.description !== undefined) row.description = p.description;
  if (p.details !== undefined) row.details = p.details;
  if (p.gender !== undefined) row.gender = p.gender;
  if (p.fabric !== undefined) row.fabric = p.fabric;
  if (p.category !== undefined) row.category = p.category;
  if (p.subCategory !== undefined) row.sub_category = p.subCategory;
  if (p.collectionSlug !== undefined) row.collection_slug = p.collectionSlug;
  if (p.price !== undefined) row.price = p.price;
  if (p.comparePrice !== undefined) row.compare_price = p.comparePrice;
  if (p.costPrice !== undefined) row.cost_price = p.costPrice;
  if (p.packagingCost !== undefined) row.packaging_cost = p.packagingCost;
  if (p.images !== undefined) row.images = p.images;
  if (p.videoUrl !== undefined) row.video_url = p.videoUrl;
  if (p.variants !== undefined) row.variants = p.variants;
  if (p.badges !== undefined) row.badges = p.badges;
  if (p.rating !== undefined) row.rating = p.rating;
  if (p.reviewsCount !== undefined) row.reviews_count = p.reviewsCount;
  if (p.featured !== undefined) row.featured = p.featured;
  if (p.isCombo !== undefined) row.is_combo = p.isCombo;
  if (p.comboItems !== undefined) row.combo_items = p.comboItems;
  if (p.seo !== undefined) row.seo = p.seo;
  return row;
};

const mapDbToOrder = (o: any): Order => ({
  id: o.id,
  orderNumber: o.order_number,
  date: o.created_at,
  createdAt: o.created_at,
  customer: o.customer,
  items: o.items,
  subtotal: Number(o.subtotal),
  shippingCost: Number(o.shipping_cost || 0),
  discount: Number(o.discount || 0),
  total: Number(o.total),
  paymentMethod: o.payment_method,
  paymentStatus: o.payment_status,
  orderStatus: o.order_status,
  carrier: o.carrier,
  trackingNumber: o.tracking_number,
  financials: o.financials || {
    totalRevenue: Number(o.total),
    totalCost: 0,
    grossProfit: Number(o.total),
    netProfitMargin: 100,
  },
});

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [collections, setCollections] = useState<CollectionItem[]>(initialCollections);
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos desde Supabase
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // 1. Productos
      const { data: dbProducts, error: pErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!pErr && dbProducts) {
        setProducts(dbProducts.map(mapDbToProduct));
      }

      // 2. Colecciones
      const { data: dbCollections, error: colErr } = await supabase
        .from('collections')
        .select('*')
        .order('created_at', { ascending: true });

      if (!colErr && dbCollections) {
        setCollections(
          dbCollections.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description || '',
            image: c.image || '',
            badge: c.badge || undefined,
            featured: c.featured ?? true,
          }))
        );
      }

      // 3. Categorías
      const { data: dbCategories, error: catErr } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (!catErr && dbCategories) {
        setCategories(
          dbCategories.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            fabric: cat.fabric || '',
            image: cat.image || '',
          }))
        );
      }

      // 4. Pedidos
      const { data: dbOrders, error: ordErr } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!ordErr && dbOrders) {
        setOrders(dbOrders.map(mapDbToOrder));
      }
    } catch (e) {
      console.error('Error sincronizando con Supabase:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Sincronización en tiempo real vía Supabase Channels
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'collections' }, () => {
        fetchData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
        fetchData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // PRODUCT CRUD
  const addProduct = async (newProdData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Actualización optimista local
    setProducts((prev) => [newProduct, ...prev]);

    // Persistencia en Supabase
    const dbPayload = mapProductToDb(newProduct);
    const { error } = await supabase.from('products').insert(dbPayload);
    if (error) {
      console.error('Error insertando producto en Supabase:', error);
    }
    return newProduct;
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    // Actualización optimista
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    const dbPayload = mapProductToDb(updatedFields);
    const { error } = await supabase.from('products').update(dbPayload).eq('id', id);
    if (error) {
      console.error('Error actualizando producto en Supabase:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Error eliminando producto en Supabase:', error);
    }
  };

  // COLLECTION CRUD
  const addCollection = async (data: Omit<CollectionItem, 'id'>): Promise<CollectionItem> => {
    const newCol: CollectionItem = {
      ...data,
      id: `col-${Date.now()}`,
    };
    setCollections((prev) => [...prev, newCol]);
    await supabase.from('collections').insert(newCol);
    return newCol;
  };

  const updateCollection = async (id: string, updatedFields: Partial<CollectionItem>) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    await supabase.from('collections').update(updatedFields).eq('id', id);
  };

  const deleteCollection = async (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    await supabase.from('collections').delete().eq('id', id);
  };

  // CATEGORY CRUD
  const addCategory = async (data: Omit<CategoryItem, 'id'>): Promise<CategoryItem> => {
    const newCat: CategoryItem = {
      ...data,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    await supabase.from('categories').insert(newCat);
    return newCat;
  };

  const updateCategory = async (id: string, updatedFields: Partial<CategoryItem>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    await supabase.from('categories').update(updatedFields).eq('id', id);
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    await supabase.from('categories').delete().eq('id', id);
  };

  // ORDER CRUD
  const addOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'date'>): Promise<Order> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const nowIso = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `LN-${randomSuffix}`,
      date: nowIso,
      createdAt: nowIso,
    };
    setOrders((prev) => [newOrder, ...prev]);

    await supabase.from('orders').insert({
      id: newOrder.id,
      order_number: newOrder.orderNumber,
      customer: newOrder.customer,
      items: newOrder.items,
      subtotal: newOrder.subtotal,
      shipping_cost: newOrder.shippingCost,
      discount: newOrder.discount,
      total: newOrder.total,
      payment_method: newOrder.paymentMethod,
      payment_status: newOrder.paymentStatus,
      order_status: newOrder.orderStatus,
      carrier: newOrder.carrier,
      tracking_number: newOrder.trackingNumber || null,
      financials: newOrder.financials,
    });

    return newOrder;
  };

  const updateOrderStatus = async (id: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o))
    );
    await supabase.from('orders').update({ order_status: status }).eq('id', id);
  };

  const updatePaymentStatus = async (id: string, status: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, paymentStatus: status } : o))
    );
    await supabase.from('orders').update({ payment_status: status }).eq('id', id);
  };

  const resetToDefaults = async () => {
    await fetchData();
  };

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCost = orders.reduce((sum, o) => sum + (o.financials?.totalCost || 0), 0);
  const grossProfit = totalRevenue - totalCost;
  const averageTicket = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const netProfitMargin = totalRevenue > 0 ? Number(((grossProfit / totalRevenue) * 100).toFixed(1)) : 0;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'entregado').length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pendiente' || o.orderStatus === 'en_preparacion').length;
  const returnedOrders = orders.filter((o) => o.orderStatus === 'devuelto').length;

  const lowStockProductsCount = products.filter((p) =>
    p.variants && p.variants.some((v) => v.stock <= 5)
  ).length;

  const totalUnitsSold = orders.reduce(
    (sum, o) => sum + (o.items ? o.items.reduce((iSum, i) => iSum + i.quantity, 0) : 0),
    0
  );

  const kpis: KPIStats = {
    totalRevenue,
    totalCost,
    grossProfit,
    netProfit: grossProfit,
    profitMarginPercent: netProfitMargin,
    averageTicket,
    averageOrderValue: averageTicket,
    totalUnitsSold,
    netProfitMargin,
    totalOrders: orders.length,
    deliveredOrders,
    pendingOrders,
    returnedOrders,
    lowStockProductsCount,
    lowStockItemsCount: lowStockProductsCount,
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        orders,
        collections,
        categories,
        kpis,
        stats: kpis,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCollection,
        updateCollection,
        deleteCollection,
        addCategory,
        updateCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
        updatePaymentStatus,
        resetToDefaults,
        refreshData: fetchData,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};

export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData debe ser utilizado dentro de un StoreDataProvider');
  }
  return context;
};
