# Actualización: Autores y bibliografía

La sección **Autores** aparece después de Infografía y antes del pie de página. También se incorpora al menú superior y al selector móvil.

## Archivos que debes subir

| Acción | Archivo | Ubicación |
| --- | --- | --- |
| Reemplazar | `source.html` | Raíz del repositorio |
| Reemplazar | `software.css` | Raíz del repositorio |
| Añadir | `ACTUALIZAR-AUTORES.md` | Raíz del repositorio; esta guía |

1. Descomprime `actualizacion-autores-github.zip`.
2. Abre tu repositorio **Fabri-777/Codigo-etico** y pulsa **Add file → Upload files → choose your files**.
3. Selecciona los tres archivos de la carpeta `actualizacion-autores`. Se suben directamente a la raíz; no necesitas arrastrar ninguna carpeta.
4. Guarda con **Commit changes** en `main`.
5. Espera a que **Actions → Publicar Codigo Etico** termine en verde y recarga tu página con **Ctrl + F5**. Pulsa **Autores** en el menú.

Mantén **Settings → Pages → Source: GitHub Actions**. El proceso compila y publica la actualización automáticamente.

El paquete conserva la biblioteca implementada en la actualización anterior. No reemplaza `content/equipo.json`, `content/temas.json`, los PDF, las portadas ni las fotos del equipo. No necesitas modificar `build.cjs`, `docs/` o `.github/`.

## Contenido y procedencia

Las referencias se identificaron en la conexión teórica de los cuatro PDF suministrados. Se verificaron datos bibliográficos mediante bibliotecas digitales, páginas editoriales y sitios de las propias instituciones. Las tarjetas distinguen **En la ficha** de **Complementaria** y permiten filtrar por AC1, AC2, AC3 o AC4.

| Trabajo | Referencias mencionadas en la ficha |
| --- | --- |
| AC1 | Aristóteles: Ética a Nicómaco. Miguel Giusti: El sentido de la ética. |
| AC2 | Immanuel Kant: Fundamentación de la metafísica de las costumbres. Beauchamp y Childress: principios de bioética. Naciones Unidas: Declaración Universal de Derechos Humanos. |
| AC3 | Max Scheler: El formalismo en la ética y la ética material de los valores. Jostein Gaarder: El mundo de Sofía. |
| AC4 | Platón: La República, libro VII. Radio Ambulante / El hilo: Caravana de la desinformación. |

Se añaden dos referencias expresamente complementarias a AC4: **Apología de Sócrates**, escrita por Platón, para profundizar en el examen crítico; y **WCAG 2.2**, para concretar las pautas de accesibilidad que la ficha menciona sin indicar una versión.

Las fichas no identifican todas las ediciones. Los enlaces de Aristóteles y Kant corresponden a textos de la Biblioteca Virtual Miguel de Cervantes; Scheler enlaza una traducción inglesa de 1973; Gaarder, una edición de Siruela de 2012; y Beauchamp y Childress, la octava edición de 2019. Son ediciones de consulta verificables, no una afirmación de que el equipo haya utilizado esas ediciones específicas. Las fechas originales y las de las ediciones se distinguen en las referencias. `s. f.` indica que no se consigna una fecha de edición del recurso digital.

Para el episodio se cita la transcripción publicada por Radio Ambulante el 28 de diciembre de 2021, con los créditos de producción y edición que aparecen en esa página. No se atribuye erróneamente el episodio a la persona que figura como autora de la publicación web.

Las tarjetas explican la relación de las fuentes con los trabajos del equipo. No presentan esas aplicaciones a la ingeniería de software como citas textuales de los filósofos.

## Fuentes enlazadas

- [Aristóteles: texto en Biblioteca Virtual Miguel de Cervantes](https://www.cervantesvirtual.com/obra/la-etica-de-aristoteles--0/).
- [Giusti: registro de publicaciones de 2007 en la PUCP](https://www.pucp.edu.pe/profesor/miguel-giusti-hundskopf/publicaciones/?anio=2007).
- [Kant: texto en Biblioteca Virtual Miguel de Cervantes](https://www.cervantesvirtual.com/obra/fundamentacion-de-la-metafisica-de-las-costumbres--0/).
- [Beauchamp y Childress: Oxford University Press](https://www.oup.com.au/books/higher-education/health-nursing-social-work/9780190640873).
- [Declaración Universal de Derechos Humanos: Naciones Unidas](https://www.un.org/es/about-us/universal-declaration-of-human-rights).
- [Scheler: Northwestern University Press](https://nupress.northwestern.edu/9780810106208/formalism-in-ethics-and-non-formal-ethics-of-values/).
- [Gaarder: Ediciones Siruela](https://www.siruela.com/catalogo.php?id_libro=1512).
- [Platón, La República VII: MIT](https://classics.mit.edu/Plato/republic.8.vii.html).
- [Caravana de la desinformación: Radio Ambulante](https://radioambulante.org/transcripcion/caravana-de-la-desinformacion-transcripcion).
- [Platón, Apología: MIT](https://classics.mit.edu/Plato/apology.html).
- [WCAG 2.2: recomendación W3C de 2024](https://www.w3.org/TR/2024/REC-WCAG22-20241212/).

## Cómo editar después

Abre `source.html` y busca **AUTORES_Y_BIBLIOGRAFIA**. Debajo encontrarás `bibliographySources`, con los campos de cada tarjeta:

- `author`: autor o institución.
- `contribution`: relación con el trabajo del equipo.
- `reference`: referencia bibliográfica.
- `url`: enlace de consulta.
- `works`: trabajos relacionados, por ejemplo `['AC1']`.
- `kind`: `ficha` para referencias mencionadas en los PDF; `complemento` para ampliaciones.

Conserva las comas, comillas y llaves del código. El diseño se encuentra al final de `software.css`, bajo el comentario **Autores y bibliografia**.

## Verificación

Se comprobó la compilación, el renderizado de las once referencias, los filtros, los enlaces externos, la navegación de ocho secciones y la vista móvil. También se repitieron las pruebas de apertura de resúmenes y descarga de los cuatro PDF para confirmar que la biblioteca sigue funcionando. La publicación en GitHub se ejecutará cuando subas los archivos.
