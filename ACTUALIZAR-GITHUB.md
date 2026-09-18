# Actualización: fotos, LinkedIn y publicación automática

Esta actualización corresponde al repositorio **Fabri-777/Codigo-etico**. No necesita Supabase, contraseñas dentro del código ni claves adicionales.

## 1. Cambia la fuente de publicación una sola vez

En tu repositorio abre **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**.

La selección anterior **Deploy from a branch → main → /docs** deja de utilizarse. Puedes conservar `docs/` en el repositorio; no necesitas borrarla, reemplazarla ni volver a editarla. El nuevo proceso compila el código y publica `dist/` automáticamente, sin guardar esa salida en Git.

## 2. Sube el paquete de actualización

Descomprime el ZIP. En el repositorio abre **Add file → Upload files** y arrastra el contenido que está dentro de `actualizacion-equipo`, conservando las carpetas. No subas el ZIP ni la carpeta contenedora.

| Acción | Ruta en el repositorio |
| --- | --- |
| Reemplazar | `source.html` |
| Reemplazar | `build.cjs` |
| Reemplazar | `content.cjs` |
| Reemplazar | `README.md` |
| Añadir | `team-photo.jsx` |
| Añadir | `team-photo.css` |
| Añadir | `content/equipo.json` |
| Añadir | `.github/workflows/pages.yml` |
| Añadir | `public/assets/equipo/LEEME.txt` |
| Añadir | `ACTUALIZAR-GITHUB.md` |

Guarda con **Commit changes**, directamente en `main`. El paquete no reemplaza `content/temas.json`, los PDFs, las portadas ni `content/linkedin.json`.

Si ya modificaste textos dentro de `source.html` después de descargar la versión anterior, conserva una copia e incorpora esos cambios en el nuevo archivo antes de subirlo.

**Comprueba la carpeta con punto:** `.github/workflows/pages.yml` debe aparecer exactamente en esa ruta. Si GitHub no sube la carpeta `.github`, usa **Add file → Create new file**, escribe `.github/workflows/pages.yml`, pega el contenido del archivo incluido y guarda.

## 3. Comprueba la primera publicación

Ve a **Actions → Publicar Codigo Etico**. Deben completarse **Comprobar y compilar** y **Publicar pagina** con marcas verdes. Si no arranca, abre ese workflow y pulsa **Run workflow → main → Run workflow**.

El enlace seguirá siendo `https://fabri-777.github.io/Codigo-etico/`. No hay que crear otro repositorio ni otro sitio.

## 4. Lo que hace cada integrante

Primero debe aceptar tu invitación como colaborador del repositorio.

Para invitarlo, abre **Settings → Collaborators → Add people**, busca su usuario de GitHub y envía la invitación. Este acceso permite editar el repositorio, no solamente su propia tarjeta; acuerden que cada integrante cambie únicamente sus datos.

### Subir su foto

En GitHub abre **public → assets → equipo → Add file → Upload files**, sube la foto y pulsa **Commit changes**. Usa JPG, PNG o WebP, de hasta 5 MB. Es recomendable una foto vertical y un nombre sencillo, por ejemplo `fabricio.jpg`.

### Escribir sus datos

Abre **content/equipo.json**, pulsa el lápiz y cambia únicamente los campos junto a tu nombre. Ejemplo para Fabricio:

```json
"Fabricio Fernandez": {
  "foto": "assets/equipo/fabricio.jpg",
  "linkedin": "https://www.linkedin.com/in/tu-perfil-real/"
}
```

El enlace es un ejemplo: reemplázalo por tu perfil real. No modifiques el nombre de la persona. Conserva las llaves, comillas y comas del archivo. La ruta de la foto no empieza por `public/` y debe coincidir exactamente con el archivo, incluidas mayúsculas y extensión.

Guarda con **Commit changes**. GitHub compila y publica automáticamente. Al terminar, cualquier visitante verá la foto y podrá abrir LinkedIn desde la tarjeta. No hace falta usar VS Code ni ejecutar comandos para estos cambios.

- Si `foto` queda vacía, aparecen las iniciales. Si una imagen falla en el navegador, también se muestran las iniciales.
- Si `linkedin` queda vacío, se conserva el enlace antiguo de `content/linkedin.json`, si existía. Para quitarlo por completo, vacía ambos campos.
- Sube primero la imagen y después cambia el JSON. También puedes subir ambos en un solo commit.
- Si la compilación falla, la página pública anterior permanece disponible. Abre el paso rojo en Actions: indicará qué archivo o enlace corregir.
- Si el cambio se hace en otra rama, aparecerá en la página después de integrarlo en `main`.

## Archivos antiguos

`content/linkedin.json` se conserva por compatibilidad. Para nuevos cambios del equipo utiliza `content/equipo.json`. Los temas y PDFs continúan configurándose en `content/temas.json` y sus carpetas originales.

## Verificación realizada

Se comprobó la compilación y el renderizado de las siete secciones; carga de una foto local con ruta codificada; enlace de LinkedIn; permanencia de los seis integrantes; copia de la imagen a la salida; rechazo de rutas y enlaces inválidos; y estructura YAML del workflow. La imagen de prueba se retiró. La ejecución en GitHub se comprobará cuando subas estos archivos y selecciones GitHub Actions como fuente de Pages.

Guía oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
