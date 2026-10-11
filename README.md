# Tema Axios Market

Tema de Shopify **mobile first** para una tienda de varios productos que vende con **Releasit (pago contra entrega)**.
Fondo blanco; negro para texto y bloques de contraste; rojo solo para acciones (botones, precios, etiquetas).

La tienda vende **dos productos, cada uno con su propia landing**:

| Producto | Plantilla | Estilo |
|---|---|---|
| Shine Armor Quick Coat | `templates/product.json` (la predeterminada) | Modelo **AIDA**, blanco/negro/rojo |
| Secadora de Ropa Portátil | `templates/product.secadora.json` | Paleta cálida **Miel y canela** con letra Nunito (ver [docs/CONTENIDO-SECADORA.md](docs/CONTENIDO-SECADORA.md)) |

**El tema no usa metacampos.** Todo el contenido (frase gancho, viñetas, paquetes, especificaciones, calificación, secciones,
reseñas y preguntas) vive en las plantillas y se edita desde Personalizar o en el JSON. En Shopify solo se crea el producto
(título, precio, fotos, descripción) y se le asigna su plantilla. Un solo `shopify theme push` sube todo.

Para agregar otro producto: duplica una plantilla (`product.<nombre>.json`), cambia sus textos y asígnala al producto.
Los subtítulos, estrellas y etiquetas de las **tarjetas** (inicio, catálogo, búsqueda y "Otros productos") están en
**Configuración del tema → Tarjetas de producto**, un renglón por producto.

## Estructura de la página de producto

| # | Sección | Archivo |
|---|---|---|
| 1 | Caja de compra (gancho, viñetas, paquetes y especificaciones en sus ajustes) | `sections/ax-product.liquid` |
| 2 | Opiniones de entrega (WhatsApp, rastreo, pago al recibir, garantía) | `sections/ax-voices.liquid` |
| 3 | Interés: gancho + imagen 1:1 | `sections/ax-copy.liquid` |
| 4 | El problema (agua y suciedad) + GIF "ANTES → APLICA → BRILLO" | `sections/ax-copy.liquid` |
| 5 | Beneficios (lista grande con emojis) + imagen 3 en 1 | `sections/ax-copy.liquid` |
| 6 | Cómo se usa: imagen con los 4 pasos y PRO TIP + GIF vertical | `sections/ax-copy.liquid` |
| 7 | Efecto hidrofóbico + video "¿NOTAS LA DIFERENCIA?" | `sections/ax-copy.liquid` |
| 8 | La oferta + contador + botón | `sections/ax-copy.liquid` |
| 9 | Preguntas frecuentes (objeciones + FAQ) | `sections/ax-qa.liquid` |
| 10 | Reseñas (sin cambios) | `sections/ax-reviews.liquid` |
| 11 | Garantía | `sections/ax-guarantee.liquid` |
| 12 | Cierre (bloque negro) + contador + botón | `sections/ax-copy.liquid` |

Todos los botones "QUIERO MI…" llevan a la caja de compra (`#comprar`). Los precios salen del producto en Shopify.

### Imágenes, GIFs y videos

Cada recuadro gris dice qué va ahí. Para llenarlo hay tres opciones (gana la primera que exista):
1. **Video** subido desde Personalizar.
2. **Imagen o GIF** subido desde Personalizar.
3. **Archivo en `assets/`**: copia el archivo (p. ej. `qc-hero.webp` o `qc-aplicacion.gif`) a la carpeta `assets/`
   y escribe su nombre en el campo `asset` del bloque en `templates/product.json`. Sube con un solo `shopify theme push`.

El inicio (`templates/index.json`) es tipo tienda: portada, confianza, lista de productos (una sola tarjeta se centra), reseñas, garantía y preguntas.

## Releasit

Releasit **reemplaza** el botón del tema con el suyo (`._rsi-buy-now-button`) dentro del formulario del producto.
La barra fija y el botón del llamado final llevan al inicio de la sección de compra (fotos, precio y paquetes);
el formulario de Releasit se abre desde el botón principal.
Si Releasit no carga, el botón del tema queda como respaldo (agrega al carrito y abre el checkout).

Después de instalar el tema:
1. **Tienda online → Temas → Personalizar → Incrustaciones de apps:** activa Releasit en ESTE tema (se activa por tema).
2. En Releasit, estilo del botón para que combine: color `#D61F2C`, texto blanco, radio de borde ~14 px.
3. En Releasit, "Redirigir a página personalizada" después de la compra: `https://TU-DOMINIO/?pedido=confirmado` (muestra el aviso de gracias).
4. Las ofertas por cantidad de Releasit deben coincidir con los "Paquetes" de la caja de compra de cada plantilla y con los descuentos de Shopify.

La tienda no usa carrito: `/cart` y el blog mandan al inicio (`snippets/ax-redirect.liquid`).

## Subir el tema a Shopify

Con [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) y tu sesión:

```bash
shopify theme push --unpublished --store axiosmarketmx
```

Eso crea un tema **nuevo sin publicar**. Revísalo con "Vista previa" antes de publicarlo. Tu tema actual no se toca.

Para ver cambios en vivo mientras editas: `shopify theme dev --store axiosmarketmx`.

## Vista previa local (sin Shopify)

`dev/` renderiza las plantillas con datos simulados de los dos productos para revisar el diseño. No se sube a Shopify (`.shopifyignore`).

```bash
cd dev && npm install && node serve.mjs
```

Abre `http://localhost:4173/`, `http://localhost:4173/products/shine-armor/` o `http://localhost:4173/products/secadora-ropa-portatil/` (o, en el celular dentro de la misma Wi-Fi, `http://IP-DE-TU-MAC:4173/...`).
Cada carga vuelve a generar la página: trae las fotos actuales del producto desde la tienda y toma los cambios más recientes del tema.
Para generar los archivos una sola vez, sin servidor: `node preview.mjs`.

`dev/mock-data.mjs` solo simula lo que vive en el producto de Shopify (título, precio, fotos); el resto sale de las plantillas.

## Archivos

- `assets/ax.css`: estilos (variables de color en `:root`).
- `assets/ax-calido.css`: paleta Miel y canela; solo la carga la plantilla de la secadora (sección `ax-skin`).
- `assets/ax.js`: galería, paquetes, Releasit, barra fija, contador, antes/después.
- `snippets/ax-*.liquid`: piezas reutilizables (íconos, estrellas, tarjeta de producto, contador…).
- `config/settings_schema.json`: ajustes globales (textos del botón, envío, garantía, correo, redes).
