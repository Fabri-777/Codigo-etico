# Código Ético — 4AH

Portafolio de Ingeniería de Software y Sistemas. Conserva los nombres, biografías y principios aportados por el equipo.

## Novedades de esta versión

- Al abrir: spinner con «Cargando» durante 2 segundos, código rápido durante 1.6 segundos y revelado del contenido durante 0.6 segundos. La apertura se repite al recargar; no aparece al navegar entre secciones.
- Fondo propio de ingeniería de software en Inicio, Equipo, Manifiesto y Temas, con capas oscuras para mantener la lectura.
- Editor sobre deontología y ética profesional: dos conceptos seleccionables, botón Ejecutar y pausa.
- JetBrains Mono para código, roles, iniciales y etiquetas; Inter para títulos, nombres y texto principal.

Edita **intro.jsx** para cambiar la secuencia y sus tiempos (`INTRO_TIMING`); **editor.jsx** para cambiar los fragmentos de código y mensajes; **experience.css** para fondos y estilos nuevos. El fondo está en **public/assets/software-background.png** y el prompt utilizado está documentado en **IMAGE-PROMPT.md**.

## Subir a tu repositorio de GitHub

El ZIP de esta versión incluye **docs/** con la página compilada y su imagen, además de todo el código editable. Sube el contenido de la carpeta del proyecto a la raíz de tu repositorio. No subas `node_modules`, `.build` ni credenciales.

En **Settings → Pages**, selecciona **Deploy from a branch**, la rama **main** y la carpeta **/docs**, y guarda. No basta con subir únicamente el HTML: mantén **docs/assets/** junto a **docs/index.html** para conservar el fondo.

Después de modificar el código, ejecuta `npm run build`, reemplaza el contenido de **docs/** por el contenido nuevo de **dist/** y sube ambos cambios: fuentes y página compilada. Conserva los PDFs y portadas que se generen dentro de esa salida.

## Abrir en Visual Studio Code

1. Descomprime el ZIP completo.
2. En VS Code, usa **Archivo → Abrir carpeta** y selecciona **codigo-etico**, la carpeta que contiene este README y `package.json`.
3. Abre **Terminal → Nueva terminal** y ejecuta:

```sh
npm ci
npm run build
npm run dev
```

Requiere Node.js y npm; compilado con Node.js 24.14.1. Abre http://127.0.0.1:4173. Tras editar, ejecuta de nuevo `npm run build` en otra terminal y recarga el navegador. Ctrl+C detiene el servidor.

Para ver la versión incluida sin instalar nada, abre **dist/index.html** en tu navegador. Mantén la carpeta `dist` completa para que los enlaces a PDFs y portadas funcionen. **source.html es el archivo editable, no la página compilada que debes abrir en el navegador.**

## Añadir PDFs desde el código

No hay formularios ni botones de subida en la página. Los documentos se agregan al proyecto antes de compilar:

1. Copia tu PDF en **public/pdfs/**, por ejemplo `tema-01.pdf`.
2. Si tienes una portada, cópiala en **public/portadas/**, por ejemplo `tema-01.jpg`.
3. Abre **content/temas.json**. Sustituye `[]` por este listado y escribe tus propios textos y nombres de archivo:

```json
[
  {
    "id": "tema-01",
    "title": "Ética en el desarrollo de software",
    "description": "Escribe el resumen y contexto del PDF.\n\nSepara los párrafos con dos saltos de línea.",
    "file": "pdfs/tema-01.pdf",
    "cover": "portadas/tema-01.jpg"
  }
]
```

También tienes **content/temas.ejemplo.json** como plantilla. Ese archivo es solo un ejemplo y no se muestra en la biblioteca. El proyecto se entrega sin documentos ficticios.

Para varios PDFs, agrega más objetos separados por comas dentro de `[]`, cada uno con un `id` diferente. Usa minúsculas, números y guiones en el ID. Las rutas no llevan `public/` al comienzo. Si no tienes portada, elimina `cover` o déjalo como `"cover": ""`; la página crea una portada tipográfica.

Ejecuta **npm run build**. El tamaño y nombre del archivo se calculan automáticamente. La compilación comprueba que el PDF exista, tenga cabecera PDF y que la portada indicada exista. Solo copia los archivos declarados en el listado a `dist/`; limpia los resultados de compilaciones anteriores.

Las tarjetas abren una ventana con explicación a la izquierda y portada a la derecha. En móvil se apilan. Puedes descargar el PDF o abrirlo completo en otra pestaña. X, Escape y clic fuera cierran el modal.

Los cambios locales aparecen en la página publicada cuando vuelvas a publicar la carpeta compilada. No se sincronizan por el hecho de editar los archivos en tu PC.

## Enlaces de LinkedIn

Abre **content/linkedin.json** y pega la URL real del perfil entre las comillas junto al nombre correspondiente. Formato: `https://www.linkedin.com/in/identificador-real/`.

Mantén los nombres exactamente iguales a los del equipo en `source.html`. Cuando una URL está vacía, se muestra el logo y texto de LinkedIn con el perfil pendiente; al completar la URL y compilar, se convierte en un enlace que abre el perfil en otra pestaña. No se han inventado URLs de personas.

## Qué editar

| Archivo | Contenido |
| --- | --- |
| **source.html** | Textos, nombres, biografías y componentes. Los fragmentos del editor están en `editor.jsx`. |
| **software.css** | Diseño, sombras, colores, columnas del equipo, adaptación móvil y editor animado. |
| **content/temas.json** | Listado de PDFs con título, explicación y portada opcional. |
| **public/pdfs/** | Tus archivos PDF. |
| **public/portadas/** | Imágenes de portada. |
| **content/linkedin.json** | URLs reales de cada integrante. |
| **content.cjs** | Validación de PDFs, portadas y enlaces durante la compilación. |
| **build.cjs** | Generación de `dist/index.html` con scripts, estilos y datos incorporados. |
| **dev.cjs** | Servidor local para abrir el proyecto y los documentos. |
| **package.json / package-lock.json** | Comandos y versiones exactas de las dependencias. |
| **dist/** | Página y archivos listos para abrir o alojar. Se regenera; no lo edites. |

## Diseño e interacciones

- Orden: Inicio, Equipo, Manifiesto, Temas, Podcast, Video, Infografía.
- Identidad **Código Ético**, sección **4AH** y metáfora de la arquitectura ética del software.
- El cuadro **CÓDIGOS** muestra escritura progresiva, resaltado de sintaxis y mensajes de una terminal simulada en bucle. No ejecuta el código mostrado ni necesita un GIF o WebGL. Incluye pausa y se detiene cuando queda fuera de pantalla o se oculta la pestaña.
- Las columnas contiguas del equipo se expanden a `flex: 2.2`, con borde `#3b82f6`, luz radial que sigue el puntero y entrada en cascada mediante GSAP + ScrollTrigger. LinkedIn es un enlace independiente del botón del perfil. En móvil las columnas se recorren horizontalmente y las biografías permanecen visibles.
- Nombres y textos en Inter; roles, etiquetas, iniciales y código en JetBrains Mono.
- `prefers-reduced-motion` reduce el movimiento y muestra el código completo de forma estática al iniciar.
- Podcast, Video e Infografía permanecen sin contenido, con el estado Próximamente.

## Todo lo utilizado

HTML, CSS y JavaScript con JSX; React y React DOM 18.3.1; GSAP 3.13.0 y ScrollTrigger; Tailwind CSS 3.4.17; esbuild 0.25.5. La apertura y el editor animado usan React y CSS. Los iconos, incluido LinkedIn, son SVG incorporados. El fondo generado se incluye como archivo local en public/assets/.

React, GSAP y los estilos se incorporan a `dist/index.html`; solo las fuentes Inter e JetBrains Mono se solicitan a Google Fonts, con alternativas del sistema si no hay conexión. Las dependencias se instalan con `npm ci`, usando el archivo de versiones incluido. Las licencias se entregan en `licenses/`.

La página es estática: no requiere base de datos, API de subida ni servidor de almacenamiento. Puedes alojar **todo el contenido de dist/** en un servidor de archivos estáticos. El paquete no incluye credenciales ni identificadores de cuenta.

## Verificación

Compilación y renderizado de las siete secciones; conservación de nombres y biografías; ausencia de etiquetas antiguas y de formularios de carga; configuración de PDFs y portadas; enlaces y estructura del modal; descarga local completa y parcial de un PDF de prueba. Los documentos de prueba no se incluyen en la biblioteca final.

