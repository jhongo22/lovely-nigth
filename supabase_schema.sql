-- =========================================================
-- ESQUEMA COMPLETO PARA LOVELY NIGHT SLEEPWEAR (SUPABASE)
-- =========================================================

-- 1. EXTENSIÓN UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA COLECCIONES
CREATE TABLE IF NOT EXISTS public.collections (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    badge TEXT,
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA CATEGORÍAS
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    fabric TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA PRODUCTOS
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    details JSONB DEFAULT '[]'::jsonb,
    gender TEXT DEFAULT 'Mujer',
    fabric TEXT NOT NULL,
    category TEXT NOT NULL,
    sub_category TEXT,
    collection_slug TEXT,
    price NUMERIC NOT NULL,
    compare_price NUMERIC,
    cost_price NUMERIC NOT NULL DEFAULT 0,
    packaging_cost NUMERIC NOT NULL DEFAULT 0,
    images JSONB DEFAULT '[]'::jsonb,
    video_url TEXT,
    variants JSONB DEFAULT '[]'::jsonb,
    badges JSONB DEFAULT '[]'::jsonb,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    featured BOOLEAN DEFAULT true,
    is_combo BOOLEAN DEFAULT false,
    combo_items JSONB DEFAULT '[]'::jsonb,
    seo JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLA PEDIDOS (CONTRAENTREGA Y WHATSAPP)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    customer JSONB NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL,
    shipping_cost NUMERIC NOT NULL DEFAULT 0,
    discount NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL,
    payment_method TEXT DEFAULT 'contraentrega',
    payment_status TEXT DEFAULT 'por_cobrar_en_entrega',
    order_status TEXT DEFAULT 'pendiente',
    carrier TEXT DEFAULT 'Mensajería Local Medellín',
    tracking_number TEXT,
    financials JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABLA BANNERS HERO (Para que cambie banners de inicio sin código)
CREATE TABLE IF NOT EXISTS public.hero_banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    image_desktop TEXT NOT NULL,
    image_mobile TEXT,
    link_url TEXT DEFAULT '/mujer',
    badge TEXT,
    button_text TEXT DEFAULT 'Ver Colección',
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- HABILITAR RLS Y PERMISOS PÚBLICOS DE LECTURA/ESCRITURA
-- =========================================================

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Lectura pública collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Lectura pública categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Lectura pública products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Lectura pública orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Lectura pública hero_banners" ON public.hero_banners FOR SELECT USING (true);

-- Políticas de escritura (Inserción, Modificación y Eliminación)
CREATE POLICY "Escritura pública collections" ON public.collections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Escritura pública categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Escritura pública products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Escritura pública orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Escritura pública hero_banners" ON public.hero_banners FOR ALL USING (true) WITH CHECK (true);

-- =========================================================
-- CONFIGURACIÓN DE STORAGE (BUCKET PÚBLICO: "productos")
-- =========================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('productos', 'productos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de acceso para Storage
CREATE POLICY "Acceso público lectura productos" ON storage.objects 
FOR SELECT USING (bucket_id = 'productos');

CREATE POLICY "Subida pública de imágenes productos" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'productos');

CREATE POLICY "Modificación pública de imágenes productos" ON storage.objects 
FOR UPDATE USING (bucket_id = 'productos');

CREATE POLICY "Eliminación pública de imágenes productos" ON storage.objects 
FOR DELETE USING (bucket_id = 'productos');
