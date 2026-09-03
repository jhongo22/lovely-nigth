import { Product } from '@/types/store';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'pijama-camisera-satin-luxe-rose',
    name: 'Pijama Camisera Satín Seda Rose Luxe',
    tagline: 'Elegancia y suavidad sedosa para noches inolvidables',
    description: 'Nuestra pijama insignia confeccionada en satín seda premium de alta densidad con tacto ultrasuave y caída fluida. Diseñada con corte clásico camisero, vivos en contraste blanco perlado, botones nacarados y pantalón con pretina elástica confortable.',
    details: [
      'Satín Seda Premium de alta densidad (no trasluce)',
      'Vivos a tono en contraste blanco perla',
      'Pantalón fluido con tiro medio y bolsillos laterales',
      'Confección 100% artesanal en Medellín, Colombia',
      'No encoge ni pierde brillo con los lavados'
    ],
    fabric: 'Satín Seda',
    category: 'mujer',
    subCategory: 'satin',
    price: 98000,
    comparePrice: 125000,
    costPrice: 38000,
    packagingCost: 4500,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { size: 'XS', colorName: 'Rose Mauve', colorHex: '#D98880', stock: 12, sku: 'LN-SAT-ROSE-XS' },
      { size: 'S', colorName: 'Rose Mauve', colorHex: '#D98880', stock: 25, sku: 'LN-SAT-ROSE-S' },
      { size: 'M', colorName: 'Rose Mauve', colorHex: '#D98880', stock: 30, sku: 'LN-SAT-ROSE-M' },
      { size: 'L', colorName: 'Rose Mauve', colorHex: '#D98880', stock: 18, sku: 'LN-SAT-ROSE-L' },
      { size: 'XL', colorName: 'Rose Mauve', colorHex: '#D98880', stock: 8, sku: 'LN-SAT-ROSE-XL' },
      { size: 'S', colorName: 'Champagne Gold', colorHex: '#E5D8CC', stock: 15, sku: 'LN-SAT-GOLD-S' },
      { size: 'M', colorName: 'Champagne Gold', colorHex: '#E5D8CC', stock: 20, sku: 'LN-SAT-GOLD-M' }
    ],
    badges: ['BESTSELLER', 'OFERTA'],
    rating: 4.9,
    reviewsCount: 84,
    featured: true,
    seo: {
      metaTitle: 'Pijama Camisera Satín Seda Rose Luxe | Lovely Night Medellín',
      metaDescription: 'Compra online la pijama camisera en satín seda más elegante de Colombia. Tacto ultrasuave, envío rápido a Medellín y contraentrega nacional.',
      keywords: ['pijamas de satin medellin', 'pijama camisera mujer', 'pijamas elegantes colombia', 'pijama satin rosa']
    }
  },
  {
    id: 'prod-002',
    slug: 'set-short-camisilla-durazno-coquette',
    name: 'Set Short & Camisilla Coquette Durazno',
    tagline: 'Frescura ligera y suavidad que abraza tu descanso',
    description: 'Set juvenil de dos piezas en piel de durazno microesmerilada de calibre medio. Incluye blusa de tiras ajustables con escote sutil y short con lazo decorativo y boleros delicados en el dobladillo.',
    details: [
      'Piel de durazno ultrasuave y transpirable',
      'Tirantes graduables y pretina elástica confortable',
      'Detalle de lazo frontal satinado',
      'Ideal para climas cálidos y templados'
    ],
    fabric: 'Piel de Durazno',
    category: 'mujer',
    subCategory: 'piel-de-durazno',
    price: 58000,
    comparePrice: 72000,
    costPrice: 21000,
    packagingCost: 3500,
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { size: 'S', colorName: 'Lavanda Pastel', colorHex: '#D6C7E2', stock: 18, sku: 'LN-COQ-LAV-S' },
      { size: 'M', colorName: 'Lavanda Pastel', colorHex: '#D6C7E2', stock: 22, sku: 'LN-COQ-LAV-M' },
      { size: 'L', colorName: 'Lavanda Pastel', colorHex: '#D6C7E2', stock: 14, sku: 'LN-COQ-LAV-L' },
      { size: 'S', colorName: 'Blush Pink', colorHex: '#F2D4DC', stock: 16, sku: 'LN-COQ-PNK-S' },
      { size: 'M', colorName: 'Blush Pink', colorHex: '#F2D4DC', stock: 20, sku: 'LN-COQ-PNK-M' }
    ],
    badges: ['NUEVO'],
    rating: 4.8,
    reviewsCount: 42,
    featured: true,
    seo: {
      metaTitle: 'Set Short Pijama Coquette Piel de Durazno | Lovely Night',
      metaDescription: 'Pijama de short y tiras en piel de durazno suave y fresca. Envíos contraentrega a todo Medellín y Colombia. ¡Ordena la tuya hoy!',
      keywords: ['pijamas piel de durazno medellin', 'set pijama short mujer', 'pijamas coquette colombia']
    }
  },
  {
    id: 'prod-003',
    slug: 'box-regalo-ritual-noche-satin-spa',
    name: 'Box Regalo "Ritual de Noche" Lovely Luxe',
    tagline: 'El regalo soñado: Pijama Satín + Antifaz + Scrunchie + Caja de Lujo',
    description: 'Experiencia completa de descanso y autocuidado en una exclusiva caja de regalo Lovely Night con lazo de satín y tarjeta personalizada. Incluye Pijama Camisera en Satín Seda, Antifaz acolchado de descanso a tono y 2 Scrunchies antifricción para el cabello.',
    details: [
      '1x Pijama Camisera Satín Seda (a elección de talla)',
      '1x Antifaz de descanso acolchado en satín 100%',
      '2x Scrunchies de satín para cuidar el cabello',
      'Caja rígida Lovely Night con acabado mate y cinta satinada',
      'Tarjeta de regalo personalizada con mensaje'
    ],
    fabric: 'Satín Seda',
    category: 'combos',
    subCategory: 'box-regalo',
    price: 139000,
    comparePrice: 175000,
    costPrice: 52000,
    packagingCost: 9500,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { size: 'S', colorName: 'Rose Mauve Box', colorHex: '#D98880', stock: 15, sku: 'LN-BOX-ROSE-S' },
      { size: 'M', colorName: 'Rose Mauve Box', colorHex: '#D98880', stock: 20, sku: 'LN-BOX-ROSE-M' },
      { size: 'L', colorName: 'Rose Mauve Box', colorHex: '#D98880', stock: 10, sku: 'LN-BOX-ROSE-L' },
      { size: 'M', colorName: 'Midnight Navy Box', colorHex: '#1B2A4A', stock: 12, sku: 'LN-BOX-NAVY-M' }
    ],
    badges: ['BESTSELLER', 'EDICIÓN LIMITADA'],
    rating: 5.0,
    reviewsCount: 68,
    isCombo: true,
    featured: true,
    seo: {
      metaTitle: 'Caja de Regalo Pijama Satín Ritual de Noche | Lovely Night',
      metaDescription: 'El mejor regalo para mujer en Medellín: Box con pijama de satín, antifaz y scrunchie en empaque de lujo. ¡Envío express para fechas especiales!',
      keywords: ['regalos para mujer medellin', 'box pijama regalo colombia', 'combo pijama satin antifaz', 'regalo aniversario novia']
    }
  },
  {
    id: 'prod-004',
    slug: 'pijama-termica-polar-cloud-soft',
    name: 'Pijama Térmica Polar "Cloud Soft" Clima Frío',
    tagline: 'El abrigo más suave para las noches frías y fines de semana',
    description: 'Conjunto térmico de dos piezas confeccionado en fleece polar ultrasuave tipo piel de conejo. Hombros caídos para libertad total de movimiento y pantalón tipo jogger con pretina elástica y tobilleras ajustadas que retienen el calor.',
    details: [
      'Tejido Térmico Fleece Polar de máxima retención térmica',
      'Pantalón jogger con bolsillos y bota resortada',
      'Buzo cuello redondo con acabados premium',
      'Suavidad esponjosa que no pesa ni pica'
    ],
    fabric: 'Tela Polar Térmica',
    category: 'mujer',
    subCategory: 'termicas',
    price: 89000,
    comparePrice: 110000,
    costPrice: 34000,
    packagingCost: 4000,
    images: [
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { size: 'S', colorName: 'Gris Perla', colorHex: '#C5C6C7', stock: 10, sku: 'LN-POL-GRS-S' },
      { size: 'M', colorName: 'Gris Perla', colorHex: '#C5C6C7', stock: 15, sku: 'LN-POL-GRS-M' },
      { size: 'L', colorName: 'Gris Perla', colorHex: '#C5C6C7', stock: 12, sku: 'LN-POL-GRS-L' },
      { size: 'XL', colorName: 'Gris Perla', colorHex: '#C5C6C7', stock: 6, sku: 'LN-POL-GRS-XL' }
    ],
    badges: ['NUEVO'],
    rating: 4.9,
    reviewsCount: 31,
    featured: false,
    seo: {
      metaTitle: 'Pijama Térmica Polar Mujer Clima Frío | Lovely Night Colombia',
      metaDescription: 'Pijamas térmicas tipo fleece y jogger para mujer. Abrigo, suavidad extrema y despacho rápido con pago contraentrega.',
      keywords: ['pijamas termicas mujer medellin', 'pijamas para frio colombia', 'pijama polar dama']
    }
  },
  {
    id: 'prod-005',
    slug: 'pijama-hombre-loungewear-algodon-pima',
    name: 'Pijama Hombre Loungewear Algodón Pima Charcoal',
    tagline: 'Comodidad sobria y frescura para el hombre contemporáneo',
    description: 'Conjunto masculino de descanso confeccionado en 100% Algodón Pima peruano de fibra larga. Camiseta básica de corte recto ergonómico y pantalón lounge con cordón ajustable y bolsillos profundos.',
    details: [
      '100% Algodón Pima de alta transpirabilidad',
      'Pantalón con pretina elástica y bolsillos amplios',
      'Corte atemporal y sobrio sin estampados infantiles',
      'Prenda versátil out-of-bed para estar en casa'
    ],
    fabric: 'Algodón Pima',
    category: 'hombre',
    subCategory: 'pantalones',
    price: 92000,
    comparePrice: 115000,
    costPrice: 36000,
    packagingCost: 4000,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { size: 'M', colorName: 'Charcoal Dark', colorHex: '#2C3E50', stock: 14, sku: 'LN-HOM-CHR-M' },
      { size: 'L', colorName: 'Charcoal Dark', colorHex: '#2C3E50', stock: 18, sku: 'LN-HOM-CHR-L' },
      { size: 'XL', colorName: 'Charcoal Dark', colorHex: '#2C3E50', stock: 8, sku: 'LN-HOM-CHR-XL' }
    ],
    badges: ['BESTSELLER'],
    rating: 4.8,
    reviewsCount: 29,
    featured: true,
    seo: {
      metaTitle: 'Pijama Hombre Loungewear Algodón Pima | Lovely Night Medellín',
      metaDescription: 'Ropa de descanso y pijamas para hombre en algodón premium. Diseños modernos y sobrios con envío contraentrega en Medellín y Colombia.',
      keywords: ['pijamas hombre medellin', 'ropa de descanso masculina', 'pantalones de descanso hombre algodon']
    }
  },
  {
    id: 'prod-006',
    slug: 'duo-pack-pijamas-satin-ahorro',
    name: 'Dúo Pack Ahorro: 2 Pijamas Satín Seda Lovely',
    tagline: 'Elige tus 2 colores favoritos con 25% de descuento especial',
    description: 'Combo especial al detal diseñado para renovar tu armario nocturno. Lleva 2 Pijamas Camiseras de Satín Seda en la combinación de tonos que prefieras (Rose Mauve, Champagne Gold o Midnight Navy) con un ahorro directo de $46.000 COP y envío gratis.',
    details: [
      'Incluye 2 Pijamas completas de Satín Seda',
      'Ahorro del 25% frente al precio individual',
      'Envío Gratis a todo Colombia incluido',
      'Empaque de lujo individual para cada pijama'
    ],
    fabric: 'Satín Seda',
    category: 'combos',
    subCategory: 'box-regalo',
    price: 159000,
    comparePrice: 196000,
    costPrice: 76000,
    packagingCost: 7000,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
    ],
    variants: [
      { size: 'S', colorName: 'Dúo Rose & Gold', colorHex: '#D98880', stock: 10, sku: 'LN-DUO-S' },
      { size: 'M', colorName: 'Dúo Rose & Gold', colorHex: '#D98880', stock: 16, sku: 'LN-DUO-M' },
      { size: 'L', colorName: 'Dúo Rose & Gold', colorHex: '#D98880', stock: 8, sku: 'LN-DUO-L' }
    ],
    badges: ['OFERTA', 'BESTSELLER'],
    rating: 5.0,
    reviewsCount: 51,
    isCombo: true,
    featured: true,
    seo: {
      metaTitle: 'Dúo Pack Pijamas Satín con Descuento | Lovely Night',
      metaDescription: 'Ahorra comprando 2 pijamas de satín seda con envío gratis en Colombia. Calidad premium, suaves y elegantes con pago contraentrega.',
      keywords: ['combo pijamas mujer descuento', 'oferta pijamas satin', 'pijamas 2x1 colombia']
    }
  }
];
