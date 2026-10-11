# Secadora de Ropa Portátil: alta en Shopify

Landing con la **paleta "Miel y canela"** (crema `#FFF8EC`, miel `#F6B93B`, canela `#E07B2E`, café `#8A4B20`, espresso `#3A2717`) y letra **Nunito**, en la plantilla `templates/product.secadora.json`.
Shine Armor y el resto de la tienda no cambian: los colores cálidos solo se cargan en esta plantilla.

Modelo: **SH-005**, el que se vende por Dropi. Dropi no trae especificaciones, así que **la página solo dice lo que se ve en la caja y en el producto**:
temporizador de **1, 2 o 4 horas**, encendido con **un solo botón**, **hasta 8 prendas**, aire caliente a **360°**, funcionamiento **silencioso**,
base que se cuelga de un tubo con su gancho y funda plegable con cierre. No tiene control remoto ni pantalla de números.

## ⚠️ Antes de vender

1. **Voltaje.** Confirma con Dropi que el SH-005 es de **127 V con clavija americana**. Mientras no esté confirmado, el voltaje no aparece en la página.
2. **Fotos ilustrativas.** Los creativos vienen de anuncios de AliExpress de secadoras con la misma forma (funda beige y base blanca). Solo `sec-closet.webp` es igual al arte de la caja del SH-005. En las demás, el panel de la base se ve pequeño, pero los detalles pueden variar. Por eso no se usó ninguna foto donde se lean controles distintos (pantalla con números, control remoto o 6 niveles de tiempo).
3. **Funda real.** En la foto del producto real, la funda es beige translúcida y de nailon, menos lisa que en los creativos. La página no promete acabado ni color exacto.
4. **Reseñas.** La sección de reseñas está **desactivada**: las 11 reseñas que había eran del modelo anterior (HP-901), no del SH-005. Actívala (Personalizar → Reseñas → mostrar) cuando tengas opiniones reales, y cambia los textos de los bloques.
5. **Precio y paquetes.** Quedan pendientes. En la vista previa local se usan $899 y $1,599 solo de ejemplo.

## 1. Crear el producto

- **Título:** `Secadora de Ropa Portátil | Plegable con temporizador`
- **Identificador (handle):** `secadora-ropa-portatil`
- **Plantilla:** en la ficha del producto → *Plantilla del tema* → **`secadora`**.
- **Fotos del producto:** primero tus fotos reales del SH-005 (producto armado y caja). Después, si quieres, los creativos de `assets/`: `sec-closet.webp`, `sec-producto.webp`, `sec-rack.webp`, `sec-aire-360.jpg`, `sec-sala.jpg`.
- **Descripción:**

  > Seca tu ropa dentro de casa aunque llueva. Cuelgas tus prendas en sus ganchos, cierras la funda y el aire caliente circula de forma constante hasta que quedan secas.
  >
  > Temporizador de 1, 2 o 4 horas y encendido con un solo botón. Cuando terminas, la funda se pliega y la base se guarda en el clóset.

### De dónde salen los creativos

| Archivo | Dónde va | Origen |
|---|---|---|
| `sec-closet.webp` | Imagen + puntos ("se guarda en el clóset"), garantía | [Anuncio 1](https://es.aliexpress.com/item/1005012054192431.html) (igual al arte de la caja) |
| `sec-rack.webp` | Línea de tiempo, garantía | [Anuncio 2](https://es.aliexpress.com/item/1005013101753915.html) |
| `sec-producto.webp` | Paso 2 "Elige el tiempo" | Anuncio 2 |
| `sec-aire-360.jpg` | Tarjeta "Aire caliente a 360°" | Anuncio 2 (recorte sin texto) |
| `sec-sala.jpg` | Tarjeta "Plegable y portátil" | Anuncio 2 (recorte sin texto) |
| `sec-noche.jpg` | Tarjeta "Se apaga sola", garantía | Anuncio 2 (recorte sin texto) |
| `sec-lectura.jpg` | Tarjeta "Silenciosa" | Anuncio 2 (recorte sin texto) |
| `sec-ganchos-ropa.jpg` | Paso 1 "Cuelga" | Anuncio 1 (recorte sin texto) |
| `sec-frescura.jpg` | Paso 3 "Listo", garantía | Anuncio 2 (recorte sin texto) |

El [anuncio 3](https://es.aliexpress.com/item/1005008077622397.html) es otro modelo (temporizador de 60 a 240 min y gancho secador), con creativos más "tech" (azules, virus). No se usó.

## 2. Caja de compra (ya viene en la plantilla, sin metacampos)

Se edita en **Personalizar → plantilla "secadora" → Producto: caja de compra**, o en `templates/product.secadora.json` (sección `main`):

- **Frase gancho:** Aunque llueva toda la semana, *tu ropa seca en horas, no en días.*
- **Etiqueta sobre la foto:** Nuevo
- **Etiqueta de oferta:** Precio especial de temporada de lluvias
- **Viñetas:** seca dentro de casa · hasta 8 prendas · temporizador de 1, 2 o 4 h · un solo botón · se guarda en el clóset
- **Especificaciones:** modelo SH-005, temporizador, capacidad, secado, encendido, funcionamiento e incluye. Agrega `Voltaje | 127 V` y las medidas solo cuando Dropi las confirme.
- **Calificación y total de reseñas:** vacíos a propósito, hasta tener reseñas reales del SH-005.
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
| 3 | Reseñas en slider (**desactivada** hasta tener reseñas reales) | `ax-reviews` | Deseo (prueba social) |
| 4 | "Tu tendedero bajo techo, *que se guarda en el clóset*": imagen, 3 puntos y botón | `ax-split` | Interés y acción |
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

Los bloques de reseñas siguen en la plantilla, pero la sección está desactivada: eran opiniones del HP-901 (otro modelo) y no deben mostrarse para el SH-005.
Cuando tengas reseñas reales, reemplaza el texto de los bloques y activa la sección.
