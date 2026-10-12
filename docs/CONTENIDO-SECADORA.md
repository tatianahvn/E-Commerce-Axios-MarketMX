# Secadora de Ropa Portátil: alta en Shopify

Landing con la **paleta "Miel y canela"** (crema `#FFF8EC`, miel `#F6B93B`, canela `#E07B2E`, café `#8A4B20`, espresso `#3A2717`) y letra **Nunito**, en la plantilla `templates/product.secadora.json`.
Shine Armor y el resto de la tienda no cambian: los colores cálidos solo se cargan en esta plantilla.

Producto: **Dropi 36701 "Secador de ropa/zapato portátil"**. La página solo dice lo que viene en la descripción de Dropi y en su creativo de medidas:
hasta **9 prendas**, prendas ligeras secas **desde 20 minutos**, **calor + flujo de aire** a temperatura constante, plegable y ligera,
para departamento, viaje, campamento o casa rodante, **pantalla digital** con botones de encendido, temporizador y calor,
**152 × 60 cm** armada y base de **22 × 14 cm**. El texto de Dropi viene de la marca MOJOCO: no se usa ese nombre.

## ⚠️ Antes de vender

1. **Voltaje.** Confirma con Dropi que sea de **127 V con clavija americana**. Mientras no esté confirmado, el voltaje no aparece en la página.
2. **Fotos.** Salen de la carpeta "Creativos Fixed Secadora" del escritorio: creativos corregidos, sin textos en inglés (archivos `sec-fx-*.jpg`).
   - Línea de tiempo: `antes-despues-secadora` (tendedero bajo la lluvia vs. secadora en casa).
   - Tarjetas: `secado` (calor y aire), `diseñocompacto` (plegable), `night` (se apaga sola) y `colgar` (hasta 9 prendas).
   - Pasos: `caracteristicas` (cuelga), `temporizador` (programa) y `clothes` (listo).
   - Garantía: arriba `colgar` y `vistaprincipal`; abajo `general-01` y `clothes`.
   - Imagen + puntos: "Ampliamente usado" (`sec-usos.jpg`).
   - Sugerida como **foto principal del producto en Shopify:** `vistaprincipal`.
   **No se usaron** `esterilizar` y `esterilizar-2`: muestran luz UV, que Dropi no confirma y la página no menciona. Si Dropi la confirma, se agregan con su texto. La subcarpeta "originales" tampoco se usó.
   **Ojo:** `caracteristicas` dice "hasta 8 piezas o 10 kg" y la página dice 9 prendas (Dropi).
3. **Reseñas.** Vienen del [anuncio de AliExpress del mismo modelo](https://es.aliexpress.com/item/1005007254611442.html) (4.7★, 220 calificaciones). Están cargadas las **64 que traen texto**, traducidas a español sin cambiar lo que dicen, con sus fotos (`sec-rev-*.jpg`). **47 están activas** y **17 desactivadas**; en Personalizar → Reseñas puedes mostrar u ocultar cada una con el ícono del ojo:
   - **Mencionan cosas que Dropi no confirma:** control remoto (bloques ae-0, ae-9, ae-24), luz UV-C (ae-4) o 220 V (ae-11). Si tu producto sí trae control remoto, actívalas.
   - **Delatan que son de AliExpress:** precio en zlotys o dólares (ae-2, ae-4, ae-9) o comparan vendedores (ae-19).
   - **Negativas:** no enciende (ae-54), llegó roto (ae-193), "no plancha" (ae-194). Léelas: hablan de la calidad del proveedor.
   - **Sin contenido o de envío:** "ok", "¿Estás bien?", reembolso, aduana, nunca llegó (ae-50, ae-53, ae-55, ae-56, ae-46, ae-211, ae-212).
   En la reseña ae-18 solo se muestra una de sus dos fotos, porque la otra enseña la luz UV. Ninguna está marcada como compra verificada. El resumen (4.8 de 47) se calcula solo con las activas.
4. **Precio y paquetes.** Quedan pendientes. En la vista previa local se usan $899 y $1,599 solo de ejemplo.
5. **Silencio.** La descripción de Dropi no dice que sea silenciosa, así que la página ya no lo promete.

## 1. Crear el producto

- **Título:** `Secadora de Ropa Portátil | Plegable con temporizador`
- **Identificador (handle):** `secadora-ropa-portatil`
- **Plantilla:** en la ficha del producto → *Plantilla del tema* → **`secadora`**.
- **Fotos del producto:** de `assets/`, en este orden: `sec-fx-vista-principal.jpg`, `sec-fx-general-01.jpg`, `sec-fx-general-02.jpg`, `sec-armario-abierto.jpg`, `sec-usos.jpg` y `sec-medidas.jpg`.
- **Descripción:**

  > Seca tu ropa dentro de casa aunque llueva. Cuelgas tus prendas en sus ganchos, cierras la funda y el aire caliente circula de forma constante hasta que quedan secas.
  >
  > Combina calor y flujo de aire, y tiene pantalla digital con temporizador. Le caben hasta 9 prendas y las ligeras quedan desde 20 minutos. Cuando terminas, la funda se pliega y la base se guarda en el clóset.

## 2. Caja de compra (ya viene en la plantilla, sin metacampos)

Se edita en **Personalizar → plantilla "secadora" → Producto: caja de compra**, o en `templates/product.secadora.json` (sección `main`):

- **Frase gancho:** Aunque llueva toda la semana, *tu ropa seca en horas, no en días.*
- **Etiqueta sobre la foto:** Nuevo
- **Etiqueta de oferta:** Precio especial de temporada de lluvias
- **Viñetas:** seca dentro de casa · hasta 9 prendas · ligeras desde 20 min · pantalla digital con temporizador · plegable y ligera
- **Especificaciones:** capacidad, secado, prendas ligeras, controles, medidas armada y plegada, e incluye. Agrega `Voltaje | 127 V` solo cuando Dropi lo confirme.
- **Calificación y total de reseñas:** vacíos a propósito: el resumen de reseñas se calcula con las que están activas.
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
| 3 | Reseñas en slider (47 activas, primero las que traen foto) | `ax-reviews` | Deseo (prueba social) |
| 4 | "Tu tendedero bajo techo, *donde lo necesites*": imagen de usos, 3 puntos y botón | `ax-split` | Interés y acción |
| 5 | Franja oscura "Días de lluvia / ropa que no seca" | `ax-band` | Atención (dolor) |
| 6 | "Pensada para *los días grises*": 4 tarjetas | `ax-cards` | Deseo |
| 7 | "Es *muy sencillo*": 3 pasos | `ax-cards` (numerado) | Deseo |
| 8 | Cinta de promesas (pago al recibir, envío, garantía) | `ax-marquee` | Confianza |
| 9 | "Nuestra *diferencia*": secadora portátil vs. tender adentro | `ax-diff` | Deseo |
| 10 | Preguntas frecuentes (6 del producto + 3 generales) | `ax-faq` | Objeciones |
| 11 | "Garantía *sin riesgos*" con 4 fotos y botón | `ax-promise` | Acción |
| 12 | Otros productos (Shine Armor) | `ax-related` | — |

**Cambios frente a la página de referencia:**
- **"Como se vio en"** (NewScientist, Bloomberg, Cosmopolitan…) se cambió por la **cinta de promesas**. Esos medios nunca hablaron del producto: usar sus logotipos sería publicidad engañosa y un riesgo legal.
- **Franja de lluvia:** la referencia tiene porcentajes ("95 %… 400 clientes") que no salen de ningún dato real. Se cambiaron por los dolores del cliente, sin cifras.
- **Garantía:** la referencia usa caras de personas de banco de imágenes. Se usan fotos del producto.
- **Míralo en acción** (los 4 videos bajo la caja de compra) se trabajará con la caja de compra.
