# Metacampos del producto (`ax.*`)

Cada producto llena su propia página con estos campos. **Se crean una sola vez** y después aparecen en todos los productos.

**Dónde se crean:** Configuración → Datos personalizados → Productos → *Agregar definición*.
En "Espacio de nombres y clave" escribe exactamente lo de la columna **Clave** (ej. `ax.subtitle`).

> Si un producto deja un campo vacío, la sección que lo usa **se oculta sola**. Puedes publicar un producto con solo lo básico y completarlo después.

## Convenciones

- **`Título | texto`**: en los campos de lista, separa el título del texto con una barra vertical `|`.
- **`*asteriscos*`**: en títulos y en `ax.hook`, lo que va entre asteriscos sale **en rojo**.
- **Listas de imágenes**: la 1.ª imagen va con el 1.er renglón, la 2.ª con el 2.º, etc.

## Definiciones

### Caja de compra (arriba del pliegue)

| Clave | Tipo en Shopify | Para qué sirve | Ejemplo |
|---|---|---|---|
| `ax.subtitle` | Una sola línea de texto | Subtítulo en las tarjetas de producto | Cera cerámica en spray 3 en 1 |
| `ax.hook` | Una sola línea de texto | Frase de beneficio bajo el título | Brillo de agencia en minutos. \*Sin agua.\* |
| `ax.badge` | Una sola línea de texto | Etiqueta negra sobre la foto | Más vendido |
| `ax.offer_label` | Una sola línea de texto | Etiqueta roja arriba del título | Precio de lanzamiento |
| `ax.offer_ends` | Fecha y hora | Contador. **Solo fechas reales.** Al vencer, desaparece | 2026-10-12 23:59 |
| `ax.rating` | Decimal | Calificación promedio (de reseñas reales) | 4.8 |
| `ax.rating_count` | Número entero | Cuántas reseñas | 10 |
| `ax.highlights` | Una sola línea de texto → **Lista** | Viñetas con ✓ | Limpia, abrillanta y protege |
| `ax.bundles` | Una sola línea de texto → **Lista** | Paquetes: `Nombre \| Cantidad \| Precio total \| Etiqueta` | `¡Compra 2! \| 2 \| 599 \| ⭐ Más pedido` |
| `ax.specs` | Una sola línea de texto → **Lista** | Tabla de especificaciones: `Dato \| Valor` | `Contenido \| 100 ml` |
| `ax.releasit_url` | URL | *Opcional.* Solo si algún producto usa un enlace directo de Releasit en vez de su botón | |

**Paquetes (`ax.bundles`)**
- El precio total es opcional: `¡Compra 1! | 1` usa el precio normal del producto.
- El paquete que tenga **Etiqueta** sale destacado y preseleccionado.
- El tema solo **muestra** el precio. El descuento real lo creas en **Descuentos** (descuento automático por cantidad) y Releasit lo toma de ahí. **Que coincidan los dos.**

### Historia del producto

| Clave | Tipo en Shopify | Sección |
|---|---|---|
| `ax.problem_title` | Una sola línea de texto | El problema |
| `ax.problem_text` | Varias líneas de texto | El problema |
| `ax.problem_points` | Una sola línea de texto → **Lista** (`Título \| texto`) | El problema |
| `ax.problem_images` | Archivo → **Lista** (solo imágenes) | El problema |
| `ax.solution_title` | Una sola línea de texto | La solución: título (opcional) |
| `ax.solution_text` | Varias líneas de texto | La solución: texto bajo el título (opcional) |
| `ax.solution_callout` | Una sola línea de texto (`Título \| texto`) | La solución: recuadro con alcancía (opcional) |
| `ax.benefits` | Una sola línea de texto → **Lista** (`Título \| texto`) | La solución: tarjetas |
| `ax.benefit_images` | Archivo → **Lista** (imágenes o GIF) | La solución: imagen de cada tarjeta |
| `ax.solution_points` | Una sola línea de texto → **Lista** (`Título \| texto`) | *Solo si agregas la sección extra "Producto: explicación"* |
| `ax.solution_image` | Archivo (solo imágenes) | *Solo con la sección extra* |
| `ax.solution_note` | Una sola línea de texto | *Solo con la sección extra* |
| `ax.before_image` | Archivo (solo imágenes) | Antes y después |
| `ax.after_image` | Archivo (solo imágenes) | Antes y después |
| `ax.ba_note` | Una sola línea de texto | Antes y después (nota debajo) |
| `ax.howto_title` | Una sola línea de texto | Cómo se usa (opcional) |
| `ax.steps` | Una sola línea de texto → **Lista** (`Título \| texto`) | Cómo se usa |
| `ax.step_images` | Archivo → **Lista** (solo imágenes) | Cómo se usa |
| `ax.howto_tip` | Varias líneas de texto | Cómo se usa (consejo) |
| `ax.compare_headers` | Una sola línea de texto (`Nosotros \| Otro \| Otro`) | Comparativa |
| `ax.compare_rows` | Una sola línea de texto → **Lista** (`Característica \| si \| no \| parcial`) | Comparativa |
| `ax.faq` | Una sola línea de texto → **Lista** (`Pregunta \| Respuesta`) | Preguntas frecuentes (van antes de las generales) |
| `ax.final_title` | Una sola línea de texto | Llamado final (opcional) |
| `ax.final_text` | Varias líneas de texto | Llamado final (opcional) |

En la comparativa, cada celda acepta `si`, `no`, `parcial` o un texto corto (ej. `$399 una vez`).

## Dar de alta un producto nuevo (checklist)

1. Crea el producto con fotos (la 1.ª es la portada de la tarjeta; la 2.ª se ve al pasar el mouse), precio y **precio de comparación**.
2. Activa **Rastrear inventario** si quieres el aviso real de "Quedan solo X piezas".
3. Llena los metacampos. Mínimo recomendado: `subtitle`, `hook`, `highlights`, `bundles`, `problem_*`, `benefits`, `faq`.
4. Si tiene paquetes, crea el **descuento automático** que corresponda.
5. Agrega sus **reseñas reales** en el editor de temas (Producto → Reseñas → Agregar bloque "Reseña" y elige el producto).
6. Abre la página del producto y prueba el botón de Releasit en tu celular.
