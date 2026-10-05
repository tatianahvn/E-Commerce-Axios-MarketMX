// Datos simulados para la vista previa local.
// Los metacampos de Shine Armor son los mismos que hay que capturar en Shopify
// (ver docs/CONTENIDO-SHINE-ARMOR.md).

const img = (file, width, height, alt = '') => ({ src: `/assets/${file}`, width, height, alt, aspect_ratio: width / height });
const mf = (value) => ({ value });

const inDays = (days) => new Date(Date.now() + days * 86400000).toISOString();

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
  inventory_quantity: 12,
  sku: 'SA-100',
  options: ['Default Title'],
  featured_media: null,
  ...extra,
});

const shineVariant = variant(47163549745249, 39900, 53900);

export const shineArmor = {
  id: 1001,
  handle: 'shine-armor',
  title: 'SHINE ARMOR | Revestimiento Cerámico 3 en 1',
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
  metafields: {
    ax: {
      subtitle: mf('Cera cerámica en spray 3 en 1'),
      hook: mf('Brillo de agencia en minutos. *Sin agua, sin cubeta y sin autolavado.*'),
      badge: mf('Más vendido'),
      offer_label: mf('Precio de lanzamiento'),
      offer_ends: mf(inDays(3)),
      rating: mf(4.8),
      rating_count: mf(10),
      highlights: mf([
        'Limpia, abrillanta y protege en un solo paso',
        'Capa cerámica: el agua resbala y se lleva el polvo',
        'Sin agua, sin máquinas y sin experiencia',
      ]),
      bundles: mf(['¡Compra 1! | 1 | 399', '¡Compra 2! | 2 | 599 | ⭐ Más pedido', '¡Compra 3! | 3 | 799 | Mejor precio']),
      specs: mf([
        'Tipo | Spray cerámico 3 en 1',
        'Contenido | 100 ml (3.4 fl oz)',
        'Superficies | Pintura, metal, vidrio y plástico exterior',
        'Vehículos | Autos, motos, camionetas, lanchas y RVs',
        'Incluye | 1 botella con atomizador. Paños de microfibra no incluidos.',
      ]),
      problem_title: mf('¿Cansado de la *pintura opaca y la acumulación de polvo*?'),
      problem_text: mf(
        'No es tu culpa: el sol, la lluvia y el polvo atacan el barniz todos los días. Primero se pierde el brillo, luego el color se apaga y al final la pintura queda desprotegida.'
      ),
      problem_points: mf([
        'Sol y rayos UV | Oxidan el barniz y apagan el color, sobre todo si tu auto duerme en la calle.',
        'Lluvia y sarro | El agua con minerales se seca sobre la pintura y deja manchas que el lavado normal no quita.',
        'Sin tiempo para encerar | La cera tradicional toma horas y el autolavado cuesta dinero cada semana.',
      ]),
      problem_images: mf([
        img('sa-pain-sun.webp', 1280, 720, 'Auto bajo el sol'),
        img('sa-pain-rain.webp', 1280, 720, 'Gotas de lluvia sobre la pintura'),
        img('sa-pain-time.webp', 1600, 900, 'Persona sin tiempo para encerar'),
      ]),
      solution_title: mf('¡Abrillanta, limpia y *protege tu auto*!'),
      solution_text: mf('Con Shine Armor 3 en 1, limpias tu auto, devuelves el brillo y proteges tu auto con un acabado hidrofóbico que repele el agua y el polvo, con una fácil aplicación desde casa.'),
      solution_points: mf([
        'Se adhiere al barniz | El SiO₂ entra en los poros microscópicos de la pintura y se fija.',
        'Forma una película lisa | Nivela la superficie: más color y efecto espejo.',
        'Repele agua y suciedad | El agua forma gotas y resbala llevándose el polvo.',
      ]),
      solution_image: mf(img('sa-hydrophobic.webp', 1280, 720, 'Gotas de agua sobre pintura protegida')),
      solution_note: mf('Vuelve a aplicar cuando el agua deje de formar gotas.'),
      benefits: mf([
        'Protección duradera | Su capa resbalosa hace que la suciedad, los insectos y el excremento de aves se quiten fácil.',
        'Brillo de espejo | Un acabado profundo que llama la atención, incluso en pintura con años.',
        'Detallado en minutos | Rocía y retira. Sirve en pintura, vidrio, plástico y cromo.',
      ]),
      benefit_images: mf([
        img('sa-gif-1.webp', 379, 213, 'El agua resbala sobre el cofre de un auto blanco'),
        img('sa-gif-2.webp', 379, 213, 'Reflejo tipo espejo en pintura roja'),
        img('sa-gif-3.webp', 379, 213, 'Persona rociando la puerta de una camioneta'),
      ]),
      before_image: mf(img('sa-ba-antes.jpg', 1400, 1400, 'Auto negro con la pintura opaca y sucia')),
      after_image: mf(img('sa-ba-despues.jpg', 1400, 1400, 'El mismo auto con brillo y gotas de agua que resbalan')),
      ba_note: mf('Imagen ilustrativa.'),
      howto_title: mf('3 pasos para un *acabado profesional*'),
      steps: mf([
        'Rocía | Aplica sobre un paño de microfibra limpio y ligeramente húmedo.',
        'Extiende | Limpia con movimientos rectos. El producto levanta el polvo y deja la capa cerámica.',
        'Pule | Con una microfibra seca frota suavemente para quitar el excedente y dar más brillo.',
      ]),
      step_images: mf([
        img('sa-step-1.webp', 1248, 832, 'Rociando el producto'),
        img('sa-step-2.webp', 1248, 832, 'Extendiendo con microfibra'),
        img('sa-step-3.webp', 1248, 832, 'Puliendo la superficie'),
      ]),
      howto_tip: mf(
        'Aplícalo a la sombra y con la superficie fría. Si el auto tiene lodo o arena, enjuágalo antes para no rayar la pintura. Necesitas dos paños de microfibra (no incluidos).'
      ),
      compare_headers: mf('Shine Armor | Cera tradicional | Autolavado'),
      compare_rows: mf([
        'Listo en minutos | si | no | parcial',
        'Sin manguera ni cubeta | si | no | si',
        'Capa cerámica que repele el agua | si | no | parcial',
        'Limpia, abrillanta y protege a la vez | si | no | parcial',
        'Lo haces tú en casa | si | si | no',
      ]),
      compare_note: mf('*Ahorra dinero* desde la primera aplicación | Con Shine Armor 3 en 1 dejas de pagar el autolavado cada semana y de perder horas encerando: limpias, abrillantas y proteges tu auto tú mismo, en minutos y sin manguera.'),
      faq: mf([
        '¿Qué incluye? | Una botella de 100 ml con atomizador. Los paños de microfibra no vienen incluidos.',
        '¿Cuánto dura el efecto? | Depende del clima y de qué tan seguido lavas tu auto. Vuelve a aplicar cuando el agua deje de formar gotas.',
        '¿Es seguro para mi auto? | Sí, para el exterior: pintura, vidrio, metal y plástico. Aplícalo a la sombra y con la superficie fría.',
        '¿Sirve para moto o camioneta? | Sí: autos, motos, camionetas, lanchas y RVs.',
      ]),
      final_title: mf('Haz que voltee a verlo *cualquiera que pase*'),
      final_text: mf('Pídelo hoy, págalo al recibirlo y este fin de semana dale a tu auto un brillo que se nota desde lejos.'),
    },
  },
};

// Producto sin metacampos: sirve para comprobar que las secciones vacías se ocultan solas.
const plainVariant = variant(5555, 24900, 0, { inventory_quantity: 40 });
export const plainProduct = {
  ...shineArmor,
  id: 1002,
  handle: 'producto-nuevo',
  title: 'Producto nuevo sin metacampos',
  url: '/products/producto-nuevo',
  price: 24900,
  media: shineMedia.slice(2, 3),
  featured_media: shineMedia[2],
  featured_image: shineMedia[2].preview_image,
  variants: [plainVariant],
  selected_or_first_available_variant: plainVariant,
  metafields: { ax: {} },
};
