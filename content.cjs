// Valida e incorpora los datos editables durante npm run build.
const fs = require('node:fs');
const path = require('node:path');
function loadContent(root) {
  const publicRoot = path.join(root, 'public');
  function asset(relative, directory, extensions) {
    if (typeof relative !== 'string' || !relative.startsWith(directory + '/') || relative.includes('\\') || relative.split('/').some(part => !part || part === '..' || part === '.')) throw Error('Ruta de archivo no válida: ' + relative);
    const filename = path.resolve(publicRoot, relative);
    if (!extensions.includes(path.extname(filename).toLowerCase())) throw Error('Extensión no admitida: ' + relative);
    if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) throw Error('Falta el archivo public/' + relative);
    const resolved = path.relative(fs.realpathSync(publicRoot), fs.realpathSync(filename));
    if (resolved.startsWith('..') || path.isAbsolute(resolved)) throw Error('El archivo debe estar dentro de public/');
    return {filename, url: relative.split('/').map(encodeURIComponent).join('/')};
  }
  const input = JSON.parse(fs.readFileSync(path.join(root, 'content/temas.json'), 'utf8'));
  if (!Array.isArray(input)) throw Error('content/temas.json debe contener una lista: []');
  const ids = new Set();
  const documents = input.map(doc => {
    if (!doc || typeof doc.id !== 'string' || !/^[a-z0-9-]+$/.test(doc.id) || ids.has(doc.id)) throw Error('Cada PDF necesita un id único con letras minúsculas, números o guiones.');
    ids.add(doc.id);
    if (typeof doc.title !== 'string' || !doc.title.trim() || typeof doc.description !== 'string' || !doc.description.trim()) throw Error('Falta título o descripción del tema: ' + doc.id);
    const pdf = asset(doc.file, 'pdfs', ['.pdf']);
    const header = Buffer.alloc(5), fd = fs.openSync(pdf.filename, 'r');
    try { fs.readSync(fd, header, 0, 5, 0); } finally { fs.closeSync(fd); }
    if (header.toString() !== '%PDF-') throw Error('El archivo no es un PDF: ' + doc.file);
    return {id: doc.id, title: doc.title.trim(), description: doc.description.trim(), file: pdf.url, filename: path.basename(pdf.filename), size: fs.statSync(pdf.filename).size, cover: doc.cover ? asset(doc.cover, 'portadas', ['.jpg','.jpeg','.png','.webp','.svg']).url : null};
  });
  const profiles = JSON.parse(fs.readFileSync(path.join(root, 'content/linkedin.json'), 'utf8'));
  if (!profiles || Array.isArray(profiles) || typeof profiles !== 'object') throw Error('content/linkedin.json debe contener un objeto de nombres y enlaces.');
  for (const [name, value] of Object.entries(profiles)) {
    if (typeof value !== 'string') throw Error('El enlace de ' + name + ' debe ser texto.');
    const link = value.trim();
    if (link) {
      const url = new URL(link);
      if (url.protocol !== 'https:' || !['linkedin.com','www.linkedin.com'].includes(url.hostname) || !/^\/in\/[^/]+\/?$/.test(url.pathname) || url.username || url.password) throw Error('Usa la URL HTTPS del perfil de LinkedIn de ' + name);
    }
    profiles[name] = link;
  }
  return {documents, profiles};
}
module.exports = {loadContent};
