# 🌙 Lovely Night Sleepwear & Loungewear
> **E-Commerce D2C de Alta Conversión & Arquitectura Ultra-SEO en Next.js (App Router)**  
> **Medellín, Colombia • Confección Local & Pago Contraentrega**

---

## 📌 1. Visión y Resumen del Proyecto

**Lovely Night** es una tienda online de pijamería y prendas de descanso (*Sleepwear & Loungewear*) con confección 100% en Medellín, Antioquia. El proyecto está diseñado bajo tres pilares estratégicos:
1. **Poder Orgánico Ultra-SEO & Rendimiento Técnico**: Arquitectura en Next.js con Server-Side Rendering (SSR), Static Site Generation (SSG), metadatos dinámicos por silo semántico, sitemap XML dinámico (`/sitemap.xml`), robots.txt (`/robots.txt`) y microformatos enriquecidos de Schema.org (`Product`, `AggregateOffer`, `Organization`, `FAQPage`, `BreadcrumbList`).
2. **Diseño Editorial de Boutique & Experiencia Mobile-First**: Estética de alta costura contemporánea (estilo *Touché / SKIMS / Lunya*), con paleta de sedas y marfil cálido, botones ovalados delicados, testimonios con fotografías reales de producto entregado, menú lateral deslizable estilo boutique y un flujo de compra optimizado para **Pago Contraentrega** y WhatsApp.
3. **Panel Administrativo ERP Conectado a Supabase en Tiempo Real**: Sistema administrativo interno con autenticación protegida, almacenamiento de fotos en la nube (Supabase Storage), control de inventario multivariante, gestión de pedidos contraentrega, liquidación financiera automática de rentabilidad y exportación de datos a Microsoft Excel (`.xlsx`).

---

## 🏗️ 2. Arquitectura Tecnológica & Stack

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework Web** | **Next.js 16+ (App Router)** | Renderizado híbrido ultra-rápido, Server Components, Turbopack |
| **Lenguaje** | **TypeScript 5+** | Tipado estricto para modelos de negocio, productos y órdenes |
| **Base de Datos & Auth** | **Supabase (PostgreSQL Realtime)** | Persistencia remota en tiempo real para productos, colecciones, categorías, usuarios y pedidos |
| **Almacenamiento CDN** | **Supabase Storage (Bucket 'productos')** | Subida interactiva de imágenes drag & drop para la dueña del negocio |
| **Diseño y Estilos** | **CSS Modular & Vanilla Moderno** | Control total sin dependencias pesadas, transiciones fluidas y mobile-first nativo |
| **Estado Reactivo** | **React Context API + Supabase Realtime** | Sincronización bidireccional instantánea entre la tienda pública y el panel ERP |
| **Iconografía** | **Lucide React + SVG Oficial de WhatsApp** | Iconos vectoriales nítidos y vector oficial en alta resolución de WhatsApp |
| **Exportación** | **XLSX (SheetJS)** | Generación y descarga directa de hojas de cálculo `.xlsx` |

---

## 📂 3. Estructura de Rutas y Páginas Implementadas

### 🛍️ Front-End Público (Tienda D2C)
* **`/` (Home Principal)**:
  - **Hero Carousel Interactivo y 100% Dinámico**: Se alimenta automáticamente de los productos destacados que la dueña sube en el admin.
  - **Carrusel Editorial de Categorías**: Diseño minimalista idéntico a las boutiques de referencia (foto superior, pie con `Pijama Dama →`, `Caballero →`, etc., paginador `< 1/6 >` y enlace `Ver todo`).
  - **Ofertas de Volumen (Tiered Pricing)**: Paquetes de descuento directo (Pack 3 Pijamas con 20% DTO por $219.900 / Pack 2 Pijamas con 15% DTO por $159.900) con activadores psicológicos para Medellín y compra en 1 clic.
  - **Vitrina de Bestsellers**: Productos más vendidos con precios y botones de acción rápida.
  - **Testimonios Reales**: Reseñas con fotografías de clientas y prendas entregadas.
  - **Preguntas Frecuentes (FAQ)**: Acordeón interactivo con microformato Schema.org JSON-LD.
* **`/mujer` (Catálogo Completo Mujer)**:
  - Grilla de productos con filtros interactivos por tela, talla y rango de precio.
* **`/mujer/[categoria]` (Silos Temáticos SEO)**:
  - `/mujer/satin`: Pijamas camiseras y batas en satín seda de alta densidad.
  - `/mujer/piel-de-durazno`: Sets frescos de short y camisilla microesmerilada.
  - `/mujer/termicas`: Pijamas abrigadas en fleece polar para clima frío.
* **`/combos-regalo` (Boxes & Dúo Packs)**:
  - Ofertas agrupadas de alta conversión (Pijama + Antifaz + Caja rígida de lujo con lazo de satín).
* **`/hombre` (Loungewear Masculino)**:
  - Pantalones de descanso y camisetas de confort masculino.
* **`/producto/[slug]` (Ficha de Producto PDP)**:
  - Galería con miniaturas y visualizador interactivo.
  - Selectores dinámicos de color y tallas (S, M, L, XL).
  - Modal interactivo con **Guía de Medidas en Centímetros (cm)**.
  - Botón *"Agregar al Carrito"* y botón directo con logo oficial *"Pedir por WhatsApp (Pago Contraentrega)"*.
  - Bloque editorial de confección y beneficios de la tela.
* **`/politicas` (Políticas de Cambios, Garantías & Envíos)**:
  - 15 días para cambio ágil de talla sin complicaciones.
  - 30 días de garantía de confección y costura en Medellín.
  - Instrucciones de lavado y preservación del satín seda.
  - Explicación del funcionamiento de envíos con Pago Contraentrega.

---

### 💼 Back-End Administrativo (ERP & Finanzas)
* **`/admin/login` (Autenticación Protegida)**:
  - Validación directa en la tabla `usuarios` de Supabase (`admin` / `admin123`).
  - Protección de rutas con guardia de sesión (redirección automática si no hay sesión).
  - Botón de retorno directo a la tienda pública.
* **`/admin` (Dashboard Maestro & KPIs)**:
  - Métricas en tiempo real: Ventas brutas, costos totales, utilidad neta real, ticket promedio y margen operativo Medellín (~54.8%).
* **`/admin/productos` (Catálogo & Matriz de Inventario)**:
  - Subida de imágenes directa a **Supabase Storage**.
  - Matriz de tallas responsiva con desplazamiento táctil horizontal para móviles (Talla, Tono, Color Swatch, SKU, Stock, Eliminar).
  - Doble vista: **Tarjetas táctiles compactas en móvil** y tabla horizontal completa en desktop.
* **`/admin/categorias` (Gestión de Categorías de la Tienda)**:
  - Administrador de categorías sincronizado en tiempo real con el carrusel de la tienda.
  - Subida de foto de categoría a Supabase Storage y doble vista móvil/desktop.
* **`/admin/combos` (Gestión de Boxes & Regalos)**:
  - Creación de combos, cajas de lujo, cálculo de utilidad neta y cargador de fotos a la nube.
* **`/admin/pedidos` (Gestión de Despachos & Contraentrega)**:
  - Control de pedidos, transportadora asignada y botón de contacto directo a WhatsApp del cliente.
* **`/admin/liquidacion` (Liquidación Financiera)**:
  - Desglose de ingresos, costo de taller, empaques y margen neto.
* **Navegación Móvil Ergonómica**:
  - Eliminado el sidebar lateral duplicado en celulares.
  - Navegación inferior fija (*Bottom App Bar*) estilo aplicación nativa (Dashboard, Productos, Pedidos, Categorías, Combos) operable con una sola mano.
* **Exportación a Excel**:
  - Descarga instantánea de reportes `.xlsx` en cada submódulo administrativo.

---

## 🚀 4. Cómo Ejecutar el Proyecto Localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno en .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xnnxusotmywymydbnpug.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...

# 3. Iniciar el servidor de desarrollo
npm run dev
# Tienda pública: http://localhost:3000
# Panel Admin:    http://localhost:3000/admin (Usuario: admin | Clave: admin123)

# 4. Validar compilación de producción
npm run build
```
