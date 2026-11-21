// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// El libro solo entra al sitemap cuando está marcado "Mostrar en la web" en el panel.
const libro = JSON.parse(readFileSync(new URL('./src/data/libro.json', import.meta.url), 'utf8'));
const libroPublicado = Boolean(libro.publicado && libro.titulo?.trim());

// Dominio oficial (se usa para SEO / links absolutos)
export default defineConfig({
  site: 'https://centroargentinoyogareiki.com.ar',
  integrations: [
    sitemap({
      filter: (pagina) => !pagina.includes('/404') && (libroPublicado || !pagina.includes('/libro')),
    }),
  ],
});
