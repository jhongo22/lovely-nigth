import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { INITIAL_PRODUCTS } from '@/data/initialProducts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lovelynight.com.co';

  // 1. Rutas estáticas principales y silos
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/mujer`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mujer/satin`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mujer/piel-de-durazno`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mujer/termicas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/combos-regalo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/hombre`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politicas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. Rutas dinámicas de productos desde Supabase en tiempo real
  let productSlugs: string[] = [];

  try {
    const { data: dbProducts } = await supabase
      .from('products')
      .select('slug, created_at');

    if (dbProducts && dbProducts.length > 0) {
      productSlugs = dbProducts.map((p) => p.slug);
    }
  } catch (err) {
    console.error('Error fetching sitemap products from Supabase:', err);
  }

  // Fallback si la BD apenas está iniciando
  if (productSlugs.length === 0) {
    productSlugs = INITIAL_PRODUCTS.map((p) => p.slug);
  }

  // Quitar duplicados
  const uniqueSlugs = Array.from(new Set(productSlugs));

  const productRoutes: MetadataRoute.Sitemap = uniqueSlugs.map((slug) => ({
    url: `${baseUrl}/producto/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
