# Tema Axios Market

Tema de Shopify **mobile first** para una tienda de varios productos que vende con **Releasit (pago contra entrega)**.
Fondo blanco; negro para texto y bloques de contraste; rojo solo para acciones (botones, precios, etiquetas).

Cada página de producto sigue la misma estructura de conversión y se llena con los **metacampos `ax.*`** del producto
(ver [docs/METACAMPOS.md](docs/METACAMPOS.md)). No hay que tocar código para agregar productos.

## Estructura de la página de producto

| # | Sección | Archivo | Contenido |
|---|---|---|---|
| 1 | Caja de compra: galería, ★, precio, contador, paquetes, botón de Releasit, garantía | `sections/ax-product.liquid` | Metacampos |
| 2 | Barra de confianza | `sections/ax-trust.liquid` | Editor de temas (igual para todos) |
| 3 | El problema | `sections/ax-problem.liquid` | Metacampos |
| 4 | La solución: resultados con GIFs (carrusel en celular) | `sections/ax-benefits.liquid` | Metacampos |
| 5 | Antes y después | `sections/ax-before-after.liquid` | Metacampos |
| 6 | Cómo se usa | `sections/ax-howto.liquid` | Metacampos |
| 7 | Reseñas (filtradas por producto) | `sections/ax-reviews.liquid` | Editor de temas o app de reseñas |
| 8 | Comparativa | `sections/ax-compare.liquid` | Metacampos |
| 9 | Garantía con sello | `sections/ax-guarantee.liquid` | Editor de temas |
| 10 | Preguntas frecuentes (del producto + generales) | `sections/ax-faq.liquid` | Metacampos + editor |
| 11 | Llamado final con contador | `sections/ax-final-cta.liquid` | Metacampos |
| — | Otros productos | `sections/ax-related.liquid` | Automático |
| — | Barra fija de compra (celular) | dentro de `ax-product` | Automático |

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
4. Las ofertas por cantidad de Releasit deben coincidir con `ax.bundles` y con los descuentos de Shopify.

La tienda no usa carrito: `/cart` y el blog mandan al inicio (`snippets/ax-redirect.liquid`).

## Subir el tema a Shopify

Con [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) y tu sesión:

```bash
shopify theme push --unpublished --store axiosmarketmx
```

Eso crea un tema **nuevo sin publicar**. Revísalo con "Vista previa" antes de publicarlo. Tu tema actual no se toca.

Para ver cambios en vivo mientras editas: `shopify theme dev --store axiosmarketmx`.

## Vista previa local (sin Shopify)

`dev/` renderiza las plantillas con datos simulados de Shine Armor para revisar el diseño. No se sube a Shopify (`.shopifyignore`).

```bash
cd dev && npm install && node preview.mjs && python3 -m http.server 4173 --directory out
```

Si cambias el contenido de ejemplo en `dev/mock-data.mjs`, regenera la guía con `node dev/export-content.mjs`.

## Archivos

- `assets/ax.css`: estilos (variables de color en `:root`).
- `assets/ax.js`: galería, paquetes, Releasit, barra fija, contador, antes/después.
- `snippets/ax-*.liquid`: piezas reutilizables (íconos, estrellas, tarjeta de producto, contador…).
- `config/settings_schema.json`: ajustes globales (textos del botón, envío, garantía, correo, redes).
