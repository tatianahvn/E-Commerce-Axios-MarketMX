# Tema Axios Market

Tema de Shopify **mobile first** para una tienda de varios productos que vende con **Releasit (pago contra entrega)**.
Fondo blanco; negro para texto y bloques de contraste; rojo solo para acciones (botones, precios, etiquetas).

Cada página de producto sigue la misma estructura de conversión y se llena con los **metacampos `axios.*`** del producto
(ver [docs/METACAMPOS.md](docs/METACAMPOS.md)). No hay que tocar código para agregar productos.

## Estructura de la página de producto

| # | Sección | Archivo | Contenido |
|---|---|---|---|
| 1 | Caja de compra: galería, ★, precio, contador, paquetes, botón de Releasit, garantía | `sections/ax-product.liquid` | Metacampos |
| 2 | Barra de confianza | `sections/ax-trust.liquid` | Editor de temas (igual para todos) |
| 3 | Míralo en acción: resumen rápido con 2 GIFs (aplicación y resultado), dos columnas también en celular | `sections/ax-in-action.liquid` | Metacampos |
| 4 | El problema | `sections/ax-problem.liquid` | Metacampos |
| 5 | La solución: resultados con GIFs (uno debajo de otro en celular) | `sections/ax-benefits.liquid` | Metacampos |
| 6 | Antes y después | `sections/ax-before-after.liquid` | Metacampos |
| 7 | Cómo se usa | `sections/ax-howto.liquid` | Metacampos |
| 8 | Reseñas (filtradas por producto) | `sections/ax-reviews.liquid` | Editor de temas o app de reseñas |
| 9 | Comparativa | `sections/ax-compare.liquid` | Metacampos |
| 10 | Garantía con sello | `sections/ax-guarantee.liquid` | Editor de temas |
| 11 | Preguntas frecuentes (del producto + generales) | `sections/ax-faq.liquid` | Metacampos + editor |
| 12 | Llamado final con contador | `sections/ax-final-cta.liquid` | Metacampos |
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
4. Las ofertas por cantidad de Releasit deben coincidir con `axios.bundles` y con los descuentos de Shopify.

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
cd dev && npm install && node serve.mjs
```

Abre `http://localhost:4173/products/shine-armor/` (o, en el celular dentro de la misma Wi-Fi, `http://IP-DE-TU-MAC:4173/...`).
Cada carga vuelve a generar la página: trae las fotos actuales del producto desde la tienda y toma los cambios más recientes del tema.
Para generar los archivos una sola vez, sin servidor: `node preview.mjs`.

Si cambias el contenido de ejemplo en `dev/mock-data.mjs`, regenera la guía con `node dev/export-content.mjs`.

## Archivos

- `assets/ax.css`: estilos (variables de color en `:root`).
- `assets/ax.js`: galería, paquetes, Releasit, barra fija, contador, antes/después.
- `snippets/ax-*.liquid`: piezas reutilizables (íconos, estrellas, tarjeta de producto, contador…).
- `config/settings_schema.json`: ajustes globales (textos del botón, envío, garantía, correo, redes).
