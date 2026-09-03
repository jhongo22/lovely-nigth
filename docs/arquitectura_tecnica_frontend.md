# 📐 Especificaciones de Arquitectura Técnica & Frontend (Next.js)

Este documento define el stack tecnológico, sistema de diseño, componentes reutilizables y estructura del proyecto para el E-commerce.

---

## 1. Stack Tecnológico

- **Framework:** **Next.js 15+ (App Router)** con React Server Components (RSC) para máximo rendimiento SEO y cero JavaScript innecesario en el cliente.
- **Lenguaje:** TypeScript para tipado estricto y seguridad en modelos de datos (productos, variantes, carrito).
- **Estilos:** CSS Modules / Vanilla CSS con tokens y variables de diseño estructuradas para control milimétrico del rendimiento (o Tailwind CSS v3/v4 según preferencia).
- **Iconografía:** Lucide React (árbol de sacudida ligero / zero-bloat).
- **Gestión de Estado Ligero:** React Context / Zustand para el carrito de compras (*Cart Drawer*) y favoritos (*Wishlist*), persistidos en `localStorage`.
- **Formatos de Imagen:** AVIF y WebP automáticos mediante `next/image`.
- **Datos Estructurados:** Componente `JsonLd` dinámico para schemas Schema.org.

---

## 2. Sistema de Diseño (Design Tokens)

### Paleta de Colores
```css
:root {
  /* Fondos y Neutros */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FDFBF7; /* Crema sedoso / Marfil */
  --bg-muted: #F5F3EF;     /* Fondo de cards y secciones secundarias */
  
  /* Textos y Contrastes */
  --text-primary: #181E28;   /* Carbón suave para lectura óptima */
  --text-secondary: #5E6472; /* Gris neutro para subtítulos y descripciones */
  --text-muted: #8D939F;     /* Gris claro para detalles y slugs */

  /* Colores de Acento & Marca */
  --accent-rose: #D98880;     /* Rosa palo empolvado / Coquette chic */
  --accent-rose-hover: #C5736B;
  --accent-gold: #C5A880;     /* Champagne / Satín dorado */
  --accent-navy: #1B2A4A;     /* Azul noche / Lujo sobrio */

  /* Estados y Badges */
  --badge-sale: #E74C3C;
  --badge-new: #27AE60;
  --badge-bestseller: #D35400;

  /* Bordes y Sombras */
  --border-light: rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.08);
}
```

### Tipografía
- **Títulos / Display:** `Playfair Display` o `Cormorant Garamond` (Elegancia editorial, lujo, delicadeza).
- **Cuerpo / Botones / UI:** `Plus Jakarta Sans` o `Inter` (Moderna, limpia, excelente legibilidad en móviles).

---

## 3. Estructura Modular de Carpetas del Proyecto

```
/src
├── /app
│   ├── layout.tsx                # Root layout con Google Fonts, CartProvider, AnnouncementBar, Header, Footer
│   ├── page.tsx                  # Home Page (Hero, Colecciones Destacadas, Bestsellers, Banner B2B, FAQ)
│   ├── /mujer
│   │   ├── page.tsx              # Catálogo completo Mujer
│   │   └── /[categoria]/page.tsx # Subcategorías (satin, piel-de-durazno, camiseras, etc.)
│   ├── /hombre/page.tsx          # Catálogo Hombre / Loungewear
│   ├── /por-mayor-medellin/page.tsx # Landing SEO de alta conversión para mayoristas
│   ├── /producto/[slug]/page.tsx # Ficha técnica de producto (PDP) con Schema Product
│   ├── /carrito/page.tsx         # Página de resumen de pedido
│   ├── /sitemap.ts               # Sitemap dinámico indexable por Google
│   └── /robots.ts                # Reglas para crawlers y bots
├── /components
│   ├── /layout
│   │   ├── AnnouncementBar.tsx   # Barra superior con beneficios y promos
│   │   ├── Navbar.tsx            # Header responsive con menú sticky
│   │   └── Footer.tsx            # Footer SEO con enlaces a silos, políticas y contacto
│   ├── /ui
│   │   ├── ProductCard.tsx       # Tarjeta de producto con hover de imagen, swatches y badge
│   │   ├── CartDrawer.tsx        # Carrito lateral deslizable con barra de envío gratis
│   │   ├── SizeGuideModal.tsx    # Modal interactivo con guía de tallas en cm
│   │   └── WhatsAppButton.tsx    # Botón flotante directo con mensaje preconfigurado
│   ├── /home
│   │   ├── HeroBanner.tsx        # Hero section editorial
│   │   ├── CategoryGrid.tsx      # Grilla visual de categorías destacadas
│   │   ├── FeaturesBar.tsx       # Badges de garantía (Contraentrega, 100% Colombiano, etc.)
│   │   └── Testimonials.tsx      # Reseñas reales y prueba social
│   └── /seo
│       └── JsonLd.tsx            # Inyector de datos estructurados Schema.org
├── /data
│   └── products.ts               # Mock / Catálogo de productos con atributos SEO
├── /context
│   └── CartContext.tsx           # Manejo de estado del carrito
└── /styles
    └── globals.css               # Reset y variables CSS
```
