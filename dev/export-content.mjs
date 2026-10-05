// Genera docs/CONTENIDO-SHINE-ARMOR.md a partir de mock-data.mjs (una sola fuente de verdad).
import fs from 'node:fs';
import { shineArmor } from './mock-data.mjs';

const ax = shineArmor.metafields.ax;
const fileName = (v) => v.src.split('/').pop();
const lines = [
  '# Contenido de Shine Armor para sus metacampos',
  '',
  'Copia cada valor en **Productos → Shine Armor → Metacampos**. En los campos de tipo *lista*, cada viñeta es un renglón (botón "Agregar elemento").',
  'Las imágenes están en la carpeta `assets/` del tema: súbelas una vez en **Contenido → Archivos** y luego elígelas en el metacampo.',
  '',
  '> ⚠️ `ax.offer_ends` debe ser una fecha REAL en la que termina tu promoción. Cuando pasa, el contador desaparece solo.',
  '',
];
for (const [key, { value }] of Object.entries(ax)) {
  lines.push(`### \`ax.${key}\``);
  if (key === 'offer_ends') {
    lines.push('', 'Fecha y hora real de fin de tu promoción (ej. domingo 12 de octubre, 23:59).', '');
    continue;
  }
  if (Array.isArray(value)) {
    lines.push('');
    value.forEach((v) => lines.push(`- ${typeof v === 'object' ? '`' + fileName(v) + '`' : v}`));
    lines.push('');
  } else if (value && typeof value === 'object') {
    lines.push('', `\`${fileName(value)}\``, '');
  } else {
    lines.push('', String(value), '');
  }
}
fs.writeFileSync(new URL('../docs/CONTENIDO-SHINE-ARMOR.md', import.meta.url), lines.join('\n'));
console.log('✓ docs/CONTENIDO-SHINE-ARMOR.md');
