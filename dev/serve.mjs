// Servidor de la vista previa local con datos en vivo.
// Cada vez que se abre o recarga una página, vuelve a generar la vista previa (preview.mjs):
// trae las fotos actuales de Shopify y toma los cambios más recientes del tema.
// Uso:  cd dev && node serve.mjs   →   http://localhost:4173 (y en la red local, para el celular)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'out');
const PORT = Number(process.env.PORT) || 4173;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

// Una sola generación a la vez; las peticiones que llegan mientras tanto esperan a esa misma.
let building = null;
const build = () => {
  if (!building) {
    building = new Promise((resolve) => {
      execFile(process.execPath, [path.join(here, 'preview.mjs')], { cwd: here }, (err, stdout, stderr) => {
        if (err) console.error('✗ Error al generar la vista previa:\n', stderr || err.message);
        else console.log(stdout.split('\n').find((l) => l.includes('Shopify')) || '✓ vista previa generada');
        resolve(!err);
      });
    }).finally(() => {
      building = null;
    });
  }
  return building;
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let file = path.normalize(path.join(out, decodeURIComponent(url.pathname)));
  if (!file.startsWith(out)) {
    res.writeHead(403).end();
    return;
  }
  // Páginas: con o sin "/" al final (como en Shopify: /products/secadora-de-ropa-portatil)
  const isPage = url.pathname.endsWith('/') || url.pathname.endsWith('.html') || !path.extname(url.pathname);
  if (isPage && !url.pathname.endsWith('.html')) file = path.join(file, 'index.html');
  if (isPage) await build();

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No encontrado');
      return;
    }
    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Vista previa en vivo: http://localhost:${PORT}/products/shine-armor/`);
});
