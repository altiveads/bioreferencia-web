# BioReferencia – sitio web (propuesta 1, Precisión clínica)

Next.js 14 (export estático) + Tailwind. Español en `/`, inglés en `/en/`. Tema oscuro/claro con botón.

## Publicar en Netlify (versión de revisión)
1. Sube esta carpeta a un repositorio de GitHub.
2. Netlify → Add new site → Import from Git → elige el repo (usa `netlify.toml`, no hay que configurar nada más).
3. Sin la variable `NEXT_PUBLIC_SITE_URL` el sitio sale con `noindex` (ideal para que el cliente lo revise).

## Producción (después)
Variables en Netlify: `NEXT_PUBLIC_SITE_URL=https://bioreferencia.com` (activa indexación, sitemap y canonical) y `NEXT_PUBLIC_GTM_ID=GTM-XXXX` (activa Tag Manager).
Los clics a WhatsApp/llamada/resultados ya envían eventos al `dataLayer` (`whatsapp_click`, `call_click`, `results_click`).

## Catálogo completo de exámenes
Guarda el JSON de `https://bioreferencia.com/wp-json/brp/v1/examenes` como `data/catalogo.json` y vuelve a compilar: se genera una página por examen (ES y EN) y el buscador los incluye.
Las 56 fichas funcionales están en `data/funcionales.json`.

## Comandos
`npm install` · `npm run dev` · `npm run build` (genera `out/`)

## Qué incluye
Inicio · Exámenes (buscador + una página por examen) · A domicilio · Convenios (8 aseguradoras) · Sedes (6 + una página por sede) · Laboratorio de referencia · Resultados · Preguntas frecuentes · Quiénes somos · Blog (16 artículos migrados) · Usuario Élite · Chequeos.
Tema oscuro/claro, ES/EN, animaciones suaves (respetan `prefers-reduced-motion`), JSON-LD, sitemap con hreflang, `public/_redirects` con las 301 del sitio anterior.

## Pendiente de datos del cliente
- Política de tratamiento de datos (Habeas Data), PQRSF y "Trabaja con nosotros" (siguen en el sitio anterior; no se migraron).
- Reseñas reales y revisión clínica (bacteriólogo con nombre y registro) del contenido médico.
- Las páginas antiguas de contenido (tuberculosis, dengue, etc.) redirigen a `/blog/`.

## Catálogo
`data/catalogo.json` (1.415 exámenes de la API de BioReferencia) ya está incluido: genera 1.471 páginas de examen (con los 56 funcionales), el buscador y el sitemap. Para actualizarlo, reemplaza ese archivo con la respuesta de `https://bioreferencia.com/wp-json/brp/v1/examenes` y vuelve a desplegar.
