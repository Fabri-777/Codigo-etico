# Biblioteca de trabajos AC1, AC2, AC3 y AC4

La actualización añade los cuatro trabajos reales del Grupo 2 a la sección Temas / Biblioteca. Cada tarjeta muestra una ilustración del propio documento; al pulsarla se abre su resumen, y debajo hay un botón independiente «Descargar archivo».

## Cómo subir esta actualización a GitHub

1. Descomprime `actualizacion-biblioteca-github.zip`.
2. Abre el repositorio **Fabri-777/Codigo-etico** en GitHub.
3. Pulsa **Add file → Upload files** desde la raíz del repositorio.
4. Arrastra todo lo que está DENTRO de la carpeta `actualizacion-biblioteca`. Conserva las carpetas `content` y `public`. No subas el ZIP ni la carpeta contenedora.
5. Comprueba las rutas de la tabla y guarda con **Commit changes** en `main`.
6. Espera a que **Actions → Publicar Codigo Etico** complete «Comprobar y compilar» y «Publicar pagina» en verde. Después recarga la página con **Ctrl + F5** y entra en **Temas**.

Mantén **Settings → Pages → Source: GitHub Actions**. No cambies a `Deploy from a branch`, porque podría volver a publicar la versión antigua de `docs/`.

| Acción | Archivo o carpeta |
| --- | --- |
| Reemplazar | `source.html` |
| Reemplazar | `software.css` |
| Reemplazar | `content/temas.json` |
| Añadir | Los cuatro PDF dentro de `public/pdfs/` |
| Añadir | Las cuatro imágenes dentro de `public/portadas/` |
| Añadir | `ACTUALIZAR-BIBLIOTECA.md` |

Sube los archivos de cada carpeta sin borrar las carpetas existentes. El paquete no incluye `content/equipo.json`, `content/linkedin.json` ni las fotos del equipo: tus datos actuales se conservan. Tampoco hace falta subir `dist/`, modificar `docs/` o reemplazar `.github/`. La compilación actual ya incorpora los PDF y portadas.

## Trabajos incluidos

| Trabajo original | PDF en el repositorio | Portada |
| --- | --- | --- |
| FICHA_AC1_HUM010 GRUPO 2.pdf | `public/pdfs/ac1-grupo-2.pdf` | `public/portadas/ac1.jpg` |
| FICHA_AC2_HUM010 GRUPO 2.pdf | `public/pdfs/ac2-grupo-2.pdf` | `public/portadas/ac2.jpg` |
| FICHA_AC3_HUM010 GRUPO 2.pdf | `public/pdfs/ac3-grupo-2.pdf` | `public/portadas/ac3.jpg` |
| FICHA_AC4_HUM010 GRUPO 2.pdf | `public/pdfs/ac4-grupo-2.pdf` | `public/portadas/ac4.jpg` |

Solo se simplificaron los nombres de los archivos: el contenido de los PDF originales no se modificó. Las portadas son las ilustraciones extraídas de AC1 página 3, AC2 página 4, AC3 página 4 y AC4 página 5. Los resúmenes se redactaron a partir de las respuestas del equipo, diferenciándolas de las instrucciones de las fichas.

## Cambiar una imagen o un resumen

Los títulos, resúmenes y rutas se editan en `content/temas.json`. Por ejemplo, la entrada del primer trabajo usa:

```json
{
  "id": "ac1",
  "title": "Metáfora y propósito profesional",
  "description": "Escribe aquí el resumen.\n\nUsa dos saltos de línea para separar párrafos.",
  "file": "pdfs/ac1-grupo-2.pdf",
  "cover": "portadas/ac1.jpg"
}
```

Este fragmento representa una entrada del listado: conserva las demás entradas y las comas entre ellas. No contiene el resumen completo que ya está incluido en el archivo entregado.

- Para cambiar la portada, reemplaza `public/portadas/ac1.jpg` por otra imagen con el mismo nombre. Si cambias su nombre o extensión, actualiza también `cover`.
- Para añadir una portada nueva, acepta JPG, PNG o WebP; es recomendable una imagen vertical de alrededor de 800 × 1200 píxeles. La página la muestra completa, sin recortar.
- Para cambiar el documento, reemplaza el PDF correspondiente o actualiza `file` con su nueva ruta.
- Las rutas del JSON comienzan por `pdfs/` y `portadas/`, sin `public/` delante. Respeta mayúsculas y extensiones.
- Para añadir otro trabajo, copia una entrada dentro de la lista, cambia `id` por uno único y completa sus campos. Sube el PDF, la imagen y el JSON juntos antes de guardar el cambio.

## Comportamiento de la biblioteca

En escritorio se muestran cuatro columnas; en pantallas intermedias, dos; y en móvil, una. Las portadas abren un diálogo con el resumen a la izquierda y la ilustración a la derecha. En móvil se apilan. El diálogo permite descargar el archivo o abrir el PDF completo en otra pestaña.

Puedes cerrar con X, Escape o clic fuera. Se restaura el foco a la portada de origen. La apertura y el cierre usan las animaciones GSAP existentes y respetan la preferencia de movimiento reducido.

## Comprobaciones

Compilación de las siete secciones; portadas visibles; resúmenes asociados al documento correcto; descargas byte por byte idénticas a los PDF suministrados; rutas bajo `/Codigo-etico/`; cierre y foco del diálogo; diseño en escritorio y móvil; ausencia de errores JavaScript durante las pruebas. El despliegue público lo realizará GitHub Actions cuando subas esta actualización.
