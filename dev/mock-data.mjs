// Datos simulados para la vista previa local: solo lo que vive en el producto de Shopify
// (título, precio, fotos, descripción). El resto del contenido está en las plantillas (templates/*.json).

const img = (file, width, height, alt = '') => ({ src: `/assets/${file}`, width, height, alt, aspect_ratio: width / height });

const shineMedia = [
  img('sa-spray.jpg', 1200, 1200, 'Botella de Shine Armor rociando'),
  img('sa-features.jpg', 1200, 1200, 'Beneficios de Shine Armor'),
  img('sa-apply.jpg', 1000, 1000, 'Persona aplicando Shine Armor en un auto negro'),
  img('sa-step-3.jpg', 540, 356, 'Puliendo la pintura con microfibra'),
].map((m, i) => ({ id: 9000 + i, media_type: 'image', alt: m.alt, preview_image: m, src: m.src, width: m.width, height: m.height }));

const variant = (id, price, compare, extra = {}) => ({
  id,
  title: 'Default Title',
  price,
  compare_at_price: compare,
  available: true,
  inventory_management: 'shopify',
  inventory_quantity: 120,
  sku: 'SA-100',
  options: ['Default Title'],
  featured_media: null,
  ...extra,
});

const shineVariant = variant(47163549745249, 39900, 66500);

export const shineArmor = {
  id: 1001,
  handle: 'shine-armor',
  title: 'SHINE ARMOR QUICK COAT | Revestimiento Cerámico 3 en 1',
  url: '/products/shine-armor',
  vendor: 'Shine Armor',
  available: true,
  price: 39900,
  price_varies: false,
  has_only_default_variant: true,
  description:
    '<p>Devuélvele la vida a tu auto en minutos. Shine Armor combina limpieza, brillo y protección cerámica en un solo spray: levanta el polvo y la grasa ligera, realza el color y deja una capa hidrofóbica que hace que el agua resbale.</p><p>Sin manguera, sin cubeta y sin máquinas. Solo necesitas dos paños de microfibra y unos minutos por panel.</p>',
  media: shineMedia,
  featured_media: shineMedia[0],
  featured_image: shineMedia[0].preview_image,
  variants: [shineVariant],
  selected_or_first_available_variant: shineVariant,
  options_with_values: [],
};

// Producto sin plantilla propia: sirve para comprobar que la caja de compra funciona sin contenido extra.
const plainVariant = variant(5555, 24900, 0, { inventory_quantity: 40 });
export const plainProduct = {
  ...shineArmor,
  id: 1002,
  handle: 'producto-nuevo',
  title: 'Producto nuevo',
  url: '/products/producto-nuevo',
  price: 24900,
  media: shineMedia.slice(2, 3),
  featured_media: shineMedia[2],
  featured_image: shineMedia[2].preview_image,
  variants: [plainVariant],
  selected_or_first_available_variant: plainVariant,
};

// Secadora de ropa portátil: usa la plantilla product.secadora.json (paleta Miel y canela).
// Todo su contenido vive en la plantilla. El precio es SOLO de ejemplo para la vista previa.
const secMedia = [
  img('sec-principal.webp', 1000, 1000, 'Secadora de ropa portátil con su base plegada y control remoto'),
  img('sec-calor.webp', 1000, 1000, 'Aire caliente constante dentro de la funda'),
  img('sec-prendas.webp', 1000, 1000, 'Sirve para todo tipo de telas'),
  img('sec-ganchos.webp', 1000, 1000, 'Ganchos de acero inoxidable para 8 a 10 prendas'),
  img('sec-aire-uv.webp', 1000, 1000, 'Modo de aire caliente y luz UV'),
  img('sec-compacta.webp', 1000, 1000, 'Plegada cabe en un cajón, una maleta o el clóset'),
  img('sec-medidas.webp', 1000, 1095, 'Medidas: 111 × 60.5 cm armada, 21.5 × 21.5 × 11 cm plegada'),
].map((m, i) => ({ id: 9100 + i, media_type: 'image', alt: m.alt, preview_image: m, src: m.src, width: m.width, height: m.height }));

const secVariant = variant(5600, 89900, 159900, { sku: 'SEC-HP901' });
export const secadora = {
  ...shineArmor,
  id: 1003,
  handle: 'secadora-ropa-portatil',
  title: 'Secadora de Ropa Portátil | Plegable con temporizador',
  url: '/products/secadora-ropa-portatil',
  vendor: 'Axios Market',
  price: 89900,
  description:
    '<p>Seca tu ropa dentro de casa aunque llueva. Cuelgas tus prendas en sus ganchos de acero inoxidable, cierras la funda y el aire caliente circula de forma constante hasta que quedan secas.</p><p>Temporizador de 1 a 8 horas, control remoto y pantalla LED. Cuando terminas, se pliega y la base cabe en un cajón.</p>',
  media: secMedia,
  featured_media: secMedia[0],
  featured_image: secMedia[0].preview_image,
  variants: [secVariant],
  selected_or_first_available_variant: secVariant,
};
