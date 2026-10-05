// Vista previa local del tema (solo para revisar diseño; NO se sube a Shopify).
// Renderiza las plantillas JSON con LiquidJS y datos simulados en dev/out/.
// Uso:  cd dev && npm install && node preview.mjs   →   sirve dev/out en http://localhost:4173
import { Liquid, Tag, Hash } from 'liquidjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shineArmor, plainProduct } from './mock-data.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const theme = path.resolve(here, '..');
const out = path.join(here, 'out');
const read = (p) => fs.readFileSync(path.join(theme, p), 'utf8');
const products = [shineArmor];

// Fotos reales: se leen de la página pública del producto en la tienda (sin iniciar sesión).
// Si no hay conexión, se quedan las fotos de ejemplo de mock-data.mjs.
const STORE = 'https://axiosmarketmx.myshopify.com';
async function useStoreImages(product) {
  try {
    const res = await fetch(`${STORE}/products/${product.handle}.js`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const media = data.media
      .filter((m) => m.media_type === 'image')
      .map((m) => {
        const image = { src: m.src, width: m.width, height: m.height, alt: m.alt || data.title, aspect_ratio: m.width / m.height };
        return { id: m.id, media_type: 'image', alt: image.alt, preview_image: image, ...image };
      });
    if (!media.length) throw new Error('sin imágenes');
    product.media = media;
    product.featured_media = media[0];
    product.featured_image = media[0].preview_image;
    console.log(`✓ ${media.length} fotos de Shopify para ${product.handle}`);
  } catch (err) {
    console.log(`! No se pudieron leer las fotos de Shopify (${err.message}); se usan las de ejemplo`);
  }
}
await useStoreImages(shineArmor);
const byHandle = (h) => [shineArmor, plainProduct].find((p) => p.handle === h) || null;

// Sintaxis de Shopify que LiquidJS no entiende tal cual
const shopifyToLiquidjs = (src) => src.replace(/posted_successfully\?/g, 'posted_successfully');

const engine = new Liquid({
  root: [path.join(theme, 'snippets'), path.join(theme, 'sections'), path.join(theme, 'layout')],
  extname: '.liquid',
  strictVariables: false,
  strictFilters: true,
  lenientIf: true,
  fs: {
    exists: async (f) => fs.existsSync(f),
    existsSync: (f) => fs.existsSync(f),
    readFile: async (f) => shopifyToLiquidjs(fs.readFileSync(f, 'utf8')),
    readFileSync: (f) => shopifyToLiquidjs(fs.readFileSync(f, 'utf8')),
    resolve: (root, file, ext) => path.resolve(root, file.endsWith(ext) ? file : file + ext),
    contains: () => true,
    sep: path.sep,
    dirname: path.dirname,
  },
});

/* ---------- Etiquetas de Shopify ---------- */
const swallow = (name) =>
  engine.registerTag(
    name,
    class extends Tag {
      constructor(token, remain, liquid) {
        super(token, remain, liquid);
        while (remain.length) {
          const t = remain.shift();
          if (t.name === 'end' + name) return;
        }
      }
      *render() {}
    }
  );
['schema', 'javascript', 'stylesheet'].forEach(swallow);

const blockTag = (name, render) =>
  engine.registerTag(
    name,
    class extends Tag {
      constructor(token, remain, liquid) {
        super(token, remain, liquid);
        this.args = token.args;
        this.tpls = [];
        let t;
        while ((t = remain.shift())) {
          if (t.name === 'end' + name) return;
          this.tpls.push(liquid.parser.parseToken(t, remain));
        }
      }
      *render(ctx, emitter) {
        yield* render.call(this, ctx, emitter);
      }
    }
  );

blockTag('form', function* (ctx, emitter) {
  const type = (this.args.match(/'([^']+)'/) || [])[1];
  const action = { contact: '/contact', storefront_password: '/password' }[type] || '/';
  emitter.write(`<form method="post" action="${action}" accept-charset="UTF-8">`);
  ctx.push({ form: { posted_successfully: false, errors: null } });
  yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
  ctx.pop();
  emitter.write('</form>');
});

blockTag('paginate', function* (ctx, emitter) {
  ctx.push({ paginate: { pages: 1, parts: [], current_page: 1 } });
  yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
  ctx.pop();
});

engine.registerTag(
  'section',
  class extends Tag {
    constructor(token, remain, liquid) {
      super(token, remain, liquid);
      this.name = token.args.replace(/['"\s]/g, '');
    }
    *render(ctx, emitter) {
      const html = yield renderSection(this.name, null, `static-${this.name}`, ctx.globals);
      emitter.write(html);
    }
  }
);

engine.registerTag(
  'layout',
  class extends Tag {
    *render() {}
  }
);

/* ---------- Filtros de Shopify ---------- */
const kw = (args) => Object.fromEntries(args.filter(Array.isArray));
const money = (cents, trailing = true) => {
  const v = Number(cents || 0) / 100;
  const s = v.toLocaleString('es-MX', { minimumFractionDigits: trailing || v % 1 ? 2 : 0, maximumFractionDigits: 2 });
  return `$${s}`;
};
const filters = {
  asset_url: (f) => `/assets/${f}`,
  shopify_asset_url: (f) => `/assets/${f}`,
  image_url: (o) => (o && typeof o === 'object' ? o.src || o.preview_image?.src : o),
  image_tag: (src, ...args) => {
    const a = kw(args);
    const attrs = Object.entries(a)
      .filter(([k]) => !['widths', 'sizes'].includes(k))
      .map(([k, v]) => `${k}="${String(v ?? '').replace(/"/g, '&quot;')}"`)
      .join(' ');
    return `<img src="${src}" ${attrs}>`;
  },
  stylesheet_tag: (u) => `<link rel="stylesheet" href="${u}">`,
  money: (c) => money(c),
  money_with_currency: (c) => `${money(c)} MXN`,
  money_without_currency: (c) => money(c).replace('$', ''),
  money_without_trailing_zeros: (c) => money(c, false),
  t: (k) => k,
  default_errors: () => '',
  format_code: (c) => c,
  video_tag: () => '',
  external_video_tag: () => '',
  font_face: () => '',
};
Object.entries(filters).forEach(([n, f]) => engine.registerFilter(n, f));

/* ---------- Secciones y plantillas JSON ---------- */
const schemaOf = (type) => {
  const src = read(`sections/${type}.liquid`);
  const m = src.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
  return m ? JSON.parse(m[1]) : {};
};

const resolveSetting = (def, value) => {
  if (!def) return value;
  if (def.type === 'product') return value ? byHandle(value) : null;
  if (def.type === 'collection') return value || null;
  if (def.type === 'image_picker') return null;
  return value;
};

const buildSettings = (defs = [], given = {}) => {
  const s = {};
  defs.forEach((d) => {
    if (!d.id) return;
    const v = d.id in given ? given[d.id] : d.default;
    s[d.id] = resolveSetting(d, v);
  });
  return s;
};

async function renderSection(type, data, id, globals) {
  const schema = schemaOf(type);
  const blocksSource = data
    ? (data.block_order || []).map((k) => data.blocks[k])
    : (schema.default?.blocks || []);
  const section = {
    id,
    settings: buildSettings(schema.settings, data?.settings || {}),
    blocks: blocksSource.map((b) => {
      const def = (schema.blocks || []).find((x) => x.type === b.type) || {};
      return { type: b.type, settings: buildSettings(def.settings, b.settings || {}), shopify_attributes: '' };
    }),
  };
  const html = await engine.renderFile(`${type}`, { section }, { globals });
  return `<div id="shopify-section-${id}" class="shopify-section">${html}</div>`;
}

const settingsSchema = JSON.parse(read('config/settings_schema.json'));
const settingsData = JSON.parse(read('config/settings_data.json').replace(/\/\*[\s\S]*?\*\//, '')).current;
const settings = {};
settingsSchema.forEach((g) => (g.settings || []).forEach((d) => d.id && (settings[d.id] = d.default ?? null)));
Object.assign(settings, settingsData);

const baseGlobals = (template, extra = {}) => ({
  settings,
  shop: {
    name: 'Axios Market MX',
    email: 'axiosmarketmx.soporte@gmail.com',
    description: 'Productos que resuelven problemas reales. Pagas al recibir.',
    url: '/',
    policies: [
      { title: 'Política de envíos', url: '#' },
      { title: 'Política de reembolsos', url: '#' },
      { title: 'Política de privacidad', url: '#' },
      { title: 'Términos del servicio', url: '#' },
    ],
  },
  routes: {
    root_url: '/',
    cart_add_url: '/cart/add',
    cart_url: '/cart',
    cart_clear_url: '/cart/clear',
    all_products_collection_url: '/collections/all/',
    search_url: '/search',
  },
  request: { design_mode: false, page_type: template.name, origin: 'http://localhost:4173', locale: { iso_code: 'es' } },
  cart: { currency: { iso_code: 'MXN' }, item_count: 0 },
  template,
  linklists: {},
  collections: { all: { title: 'Todos los productos', url: '/collections/all/', products, products_count: products.length } },
  canonical_url: 'http://localhost:4173/',
  content_for_header: '',
  current_page: 1,
  ...extra,
});

async function renderPage(templateFile, outPath, template, extra = {}) {
  const tpl = JSON.parse(read(`templates/${templateFile}`));
  const globals = baseGlobals(template, extra);
  const parts = [];
  for (const key of tpl.order) {
    const data = tpl.sections[key];
    if (data.disabled) continue;
    parts.push(await renderSection(data.type, data, `template--${key}`, globals));
  }
  const layout = tpl.layout || 'theme';
  const html = await engine.renderFile(layout, { content_for_layout: parts.join('\n') }, { globals });
  const file = path.join(out, outPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('✓', outPath);
}

fs.mkdirSync(out, { recursive: true });
const assetsLink = path.join(out, 'assets');
if (!fs.existsSync(assetsLink)) fs.symlinkSync(path.join(theme, 'assets'), assetsLink);

await renderPage('index.json', 'index.html', { name: 'index' }, { page_title: 'Axios Market MX' });
await renderPage('product.json', 'products/shine-armor/index.html', { name: 'product' }, { product: shineArmor, page_title: shineArmor.title });
await renderPage('product.json', 'products/producto-nuevo/index.html', { name: 'product' }, { product: plainProduct, page_title: plainProduct.title });
await renderPage('collection.json', 'collections/all/index.html', { name: 'collection' }, {
  collection: { title: 'Todos los productos', description: '', products, products_count: products.length, sort_options: [{ value: 'best-selling', name: 'Más vendidos' }, { value: 'price-ascending', name: 'Precio: menor a mayor' }], default_sort_by: 'best-selling' },
  page_title: 'Todos los productos',
});
await renderPage('page.contact.json', 'pages/contacto/index.html', { name: 'page', suffix: 'contact' }, { page: { title: 'Contacto', content: '<p>Escríbenos y te respondemos lo antes posible.</p>' } });
await renderPage('404.json', '404.html', { name: '404' }, { page_title: 'No encontrada' });
