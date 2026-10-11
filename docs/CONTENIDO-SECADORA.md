# Secadora de Ropa Portátil: alta en Shopify

Landing con la **paleta "Miel y canela"** (crema `#FFF8EC`, miel `#F6B93B`, canela `#E07B2E`, café `#8A4B20`, espresso `#3A2717`) y letra **Nunito**, en la plantilla `templates/product.secadora.json`.
Shine Armor y el resto de la tienda no cambian: los colores cálidos solo se cargan en esta plantilla.

Fuente: [anuncio de AliExpress](https://es.aliexpress.com/item/1005009863163711.html), modelo **HP-901**.

## ⚠️ Antes de vender

1. **Voltaje.** El anuncio solo ofrece la versión **EU Plug 220V** y en sus especificaciones dice "Voltaje: 220 voltios". En México la corriente es de **127 V** y el enchufe es tipo A/B. Una resistencia de 220 V conectada a 127 V calienta mucho menos y puede no secar, y la clavija europea no entra en un contacto mexicano. Una reseña también menciona que el cable es de otro país. **Confirma con el proveedor una versión de 110 a 127 V con clavija americana** antes de publicarla. Por eso el voltaje no aparece en la página.
2. **Fotos con textos ajenos.** `sec-principal.webp` lleva el logo **COOSKR** (otra marca) y `sec-control.webp` dice **"EU 220V"**. Varias fotos tienen textos en inglés y la marca "raugee". Hay que reeditarlas. `sec-control.webp` no se usa en la página.
3. **Color de la funda.** En las fotos del anuncio la funda es blanca o crema. En las fotos de los compradores es **gris** y una reseña se queja de eso. La página no promete color de funda.
4. **Precio y paquetes.** Quedan pendientes (se trabajan con la caja de compra). En la vista previa local se usan $899 y $1,599 solo de ejemplo.

## 1. Crear el producto

- **Título:** `Secadora de Ropa Portátil | Plegable con temporizador`
- **Identificador (handle):** `secadora-ropa-portatil`. Si usas otro, abre la plantilla en el editor y vuelve a elegir el producto en cada reseña.
- **Plantilla:** en la ficha del producto → *Plantilla del tema* → **`secadora`**.
- **Fotos del producto** (en este orden, están en `assets/`): `sec-principal.webp`, `sec-calor.webp`, `sec-prendas.webp`, `sec-ganchos.webp`, `sec-aire-uv.webp`, `sec-compacta.webp`, `sec-medidas.webp`.
- **Video:** `docs/media/secadora-video.mp4`, el video del anuncio. Súbelo como medio del producto si lo quieres en la galería.
- **Descripción:**

  > Seca tu ropa dentro de casa aunque llueva. Cuelgas tus prendas en sus ganchos de acero inoxidable, cierras la funda y el aire caliente circula de forma constante hasta que quedan secas.
  >
  > Temporizador de 1 a 8 horas, control remoto y pantalla LED. Cuando terminas, se pliega y la base cabe en un cajón.

## 2. Caja de compra (ya viene en la plantilla, sin metacampos)

Se edita en **Personalizar → plantilla "secadora" → Producto: caja de compra**, o en `templates/product.secadora.json` (sección `main`):

- **Frase gancho:** Aunque llueva toda la semana, *tu ropa seca en horas, no en días.*
- **Etiqueta sobre la foto:** Nuevo
- **Etiqueta de oferta:** Precio especial de temporada de lluvias
- **Viñetas:** seca dentro de casa · 8 a 10 prendas ligeras · temporizador de 1 a 8 h y control remoto · se pliega y cabe en un cajón
- **Especificaciones:** modelo, calefacción, temporizador, capacidad, medidas armada y plegada, ganchos e incluye. Agrega `Voltaje | 127 V` solo cuando el proveedor lo confirme.
- **Calificación y total de reseñas:** vacíos a propósito. Así el resumen de reseñas se calcula con las 11 que se muestran. El anuncio de AliExpress tiene 4.6 de 81 calificaciones, pero son de compradores del proveedor, no de tu tienda.
- **Paquetes:** pendientes, se definen junto con el precio. Formato, uno por renglón: `¡Compra 2! | 2 | 1499 | ⭐ Más pedido`. Mientras estén vacíos, se vende de 1 en 1.

La tarjeta del producto en el inicio y en "Otros productos" toma su subtítulo y etiqueta de **Configuración del tema → Tarjetas de producto**
(renglón `secadora-ropa-portatil | Seca tu ropa en casa aunque llueva | | | Nuevo`).

## 3. Lo que ya viene en la plantilla

Todo, incluida la caja de compra, se edita en **Personalizar → plantilla de producto "secadora"**. Cada texto es un ajuste o un bloque. Orden de la página:

| # | Sección | Archivo | Etapa AIDA |
|---|---|---|---|
| 0 | Paleta cálida (no se ve, carga los colores) | `ax-skin` | — |
| 1 | Caja de compra (la misma de Shine Armor, con sus propios textos) | `ax-product` | Atención |
| 2 | "Tu ropa seca, *sin depender del sol*": imagen + 4 momentos | `ax-story` | Interés |
| 3 | Reseñas en slider (11, tomadas del anuncio) | `ax-reviews` | Deseo (prueba social) |
| 4 | "Tu tendedero bajo techo, *que cabe en un cajón*": imagen, 3 puntos y botón | `ax-split` | Interés y acción |
| 5 | Franja oscura "Días de lluvia / ropa que no seca" | `ax-band` | Atención (dolor) |
| 6 | "Pensada para *los días grises*": 4 tarjetas | `ax-cards` | Deseo |
| 7 | "Es *muy sencillo*": 3 pasos | `ax-cards` (numerado) | Deseo |
| 8 | Cinta de promesas (pago al recibir, envío, garantía) | `ax-marquee` | Confianza |
| 9 | "Nuestra *diferencia*": secadora portátil vs. tender adentro | `ax-diff` | Deseo |
| 10 | Preguntas frecuentes (5 del producto + 3 generales) | `ax-faq` | Objeciones |
| 11 | "Garantía *sin riesgos*" con 4 fotos y botón | `ax-promise` | Acción |
| 12 | Otros productos (Shine Armor) | `ax-related` | — |

**Cambios frente a la página de referencia:**
- **"Como se vio en"** (NewScientist, Bloomberg, Cosmopolitan…) se cambió por la **cinta de promesas**. Esos medios nunca hablaron del producto: usar sus logotipos sería publicidad engañosa y un riesgo legal.
- **Franja de lluvia:** la referencia tiene porcentajes ("95 %… 400 clientes") que no salen de ningún dato real. Se cambiaron por los dolores del cliente, sin cifras.
- **Garantía:** la referencia usa caras de personas de banco de imágenes. Se usan fotos del producto.
- **Míralo en acción** (los 4 videos bajo la caja de compra) se trabajará con la caja de compra.

### Reseñas

Son reseñas reales del anuncio, traducidas a español de México sin cambiar lo que dicen. Los nombres van como los muestra AliExpress (enmascarados o "Cliente anónimo") y ninguna está marcada como compra verificada.
Las fotos de reseñas que se usan son `sec-review-armada.webp`, `sec-review-caja-2.webp` y `sec-review-caja.webp`.
Se dejaron fuera las reseñas negativas (olor a quemado, sobrecalentamiento, caja dañada) y sus fotos. **Revísalas** antes de vender: hablan de calidad del proveedor.
