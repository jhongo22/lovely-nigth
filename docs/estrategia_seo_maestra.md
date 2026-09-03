# 🚀 Estrategia Maestra de SEO & Arquitectura de Información
## E-commerce de Pijamas & Loungewear (Medellín / Colombia)

Este documento detalla el plan táctico para posicionar la tienda en los primeros lugares de Google mediante SEO On-Page, SEO Técnico (Next.js), Datos Estructurados Schema.org y Topic Clusters (Silos de Contenido).

---

## 1. Auditoría de la Competencia en SEO (Nuestras Ventajas Injustas)

Al inspeccionar los sitios de la competencia (*Touché, Dolce D'Amore, Esencial Pijamas, Balboa*):
- ❌ **Sobrecarga de JavaScript**: La mayoría usa temas de Shopify pesados con docenas de apps inyectadas (`gtm`, widgets de chat no diferidos, popups intrusivos). Sus Core Web Vitals (LCP, CLS, INP) caen en zona amarilla/roja en móvil.
- ❌ **Keywords desaprovechadas**: Solo tienen meta titles genéricos como *"Inicio - Dolce D'Amore"* o URLs no semánticas.
- ❌ **Falta de Schema Markup completo**: Solo implementan lo básico de `Organization`, ignorando `AggregateOffer`, `ItemAvailability`, `BreadcrumbList` y `FAQPage` en páginas de categoría.
- ❌ **Cero contenido transaccional Long-Tail**: No tienen páginas dedicadas a búsquedas con alta intención de compra en Colombia.

---

## 2. Mapa de Keywords & Topic Clusters (Silos de Búsqueda)

### Clúster 1: Pijamas Mujer (Categoría Reina)
- **Keyword Primaria:** `pijamas mujer medellin`, `pijamas para mujer colombia`
- **Keywords Secundarias / Materiales:**
  - `pijamas de satin medellin` / `pijamas de seda para mujer`
  - `pijamas piel de durazno por mayor`
  - `pijamas termicas para mujer colombia`
  - `pijamas camiseras dama`
  - `pijamas de short y camisa mujer`
  - `pijamas lenceras / babydolls satin`

### Clúster 2: Ventas al Por Mayor & Emprendimiento (B2B / Micro-distribución)
- **Keyword Primaria:** `pijamas al por mayor medellin`, `fabricantes de pijamas en medellin`
- **Keywords Secundarias:**
  - `fabrica de pijamas en guayabal y el hueco`
  - `combos de pijamas para emprender`
  - `distribuidores de pijamas mayoristas colombia`
  - `pijamas baratas al por mayor envios contraentrega`

### Clúster 3: Pijamas Familiares & Ocasiones Especiales
- **Keywords:**
  - `pijamas familiares iguales medellin` / `pijamas match familia`
  - `pijamas para parejas colombia`
  - `pijamas de novias / batas bridal medellin`
  - `pijamas de maternidad y lactancia`

### Clúster 4: Pijamas Hombre & Loungewear Unisex (Océano Azul)
- **Keywords:**
  - `pijamas para hombre medellin`
  - `ropa de descanso hombre comoda`
  - `pantalones de descanso hombre algodon`

---

## 3. Arquitectura de URLs Semánticas

Nuestra estructura de rutas en Next.js (App Router) será 100% limpia, jerárquica y legible por motores de búsqueda:

```
/
├── /mujer
│   ├── /mujer/satin
│   ├── /mujer/piel-de-durazno
│   ├── /mujer/camiseras
│   ├── /mujer/termicas
│   └── /mujer/maternales
├── /hombre
│   ├── /hombre/conjuntos
│   └── /hombre/pantalones-descanso
├── /familia
│   ├── /familia/parejas
│   └── /familia/family-match
├── /por-mayor-medellin (Landing B2B de alta conversión SEO)
├── /producto/[slug] (Ej: /producto/pijama-camisera-satin-rosada-luxe)
├── /guias
│   ├── /guias/guia-de-tallas
│   ├── /guias/cuidado-de-telas-satin-y-algodon
│   └── /guias/como-emprender-vendiendo-pijamas-medellin
└── /faq
```

---

## 4. Implementación Técnica en Next.js (Puntaje 100 en PageSpeed)

1. **Server-Side Generation (SSG) e Incremental Static Regeneration (ISR):**
   - Las páginas de producto y categorías se pre-renderizan en HTML puro en el servidor, permitiendo tiempos de respuesta de milisegundos y rastreo inmediato por el Googlebot.
2. **Metadata API Dinámica (`generateMetadata`):**
   - Title tags optimizados: `[Nombre Producto] | Pijamas [Material] en Medellín - [Marca]`
   - Meta Descriptions con CTR magnético (incluyendo llamada a la acción, precio de entrada y garantía de envío).
   - Canonical URLs automáticas y etiquetas OpenGraph/Twitter Cards dinámicas con imágenes de alta resolución.
3. **JSON-LD Schema Markup Automático:**
   - **Página de Producto:** `Product`, `Offer`, `brand`, `aggregateRating`, `availability` (`InStock`), `priceCurrency: "COP"`.
   - **Páginas de Categoría:** `ItemList`, `BreadcrumbList`, `CollectionPage`.
   - **Home:** `Organization`, `WebSite` con `SearchAction`, `LocalBusiness` (Medellín, Colombia).
   - **Preguntas Frecuentes:** `FAQPage` para ganar fragmentos enriquecidos (Rich Snippets) en Google.
4. **Optimización de Assets & Core Web Vitals:**
   - `next/image` con formatos modernos `.avif` y `.webp`, lazy loading nativo y dimensiones fijas para evitar `Cumulative Layout Shift` (CLS = 0).
   - `next/font` con fuentes de Google descargadas en build-time (cero llamadas de bloqueo a servidores externos).
   - Sitemap XML dinámico generado en `/sitemap.xml` y archivo `/robots.txt` estricto.
