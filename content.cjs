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
  // Un archivo para las fotos y LinkedIn. Conserva los enlaces antiguos si el nuevo campo está vacío.
  const members = JSON.parse(fs.readFileSync(path.join(root, 'content/equipo.json'), 'utf8'));
  if (!members || Array.isArray(members) || typeof members !== 'object') throw Error('content/equipo.json debe ser un objeto de integrantes.');
  const photos = {};
  for (const [name, member] of Object.entries(members)) {
    if (!Object.hasOwn(profiles,name)) throw Error('Nombre no reconocido en equipo.json: ' + name + '. Conserva los nombres originales.');
    if (!member || typeof member.foto !== 'string' || typeof member.linkedin !== 'string') throw Error('Cada integrante necesita foto y linkedin como texto: ' + name);
    const link=member.linkedin.trim();
    if (link) {
      let url; try { url=new URL(link); } catch { throw Error('LinkedIn no válido para ' + name); }
      if (url.protocol!=='https:' || !['linkedin.com','www.linkedin.com'].includes(url.hostname) || !/^\/in\/[^/]+\/?$/.test(url.pathname) || url.username || url.password || url.port) throw Error('Usa la URL HTTPS del perfil de LinkedIn de ' + name);
      profiles[name]=link;
    }
    photos[name]='';
    if(member.foto.trim()) {
      const photo=asset(member.foto.trim(),'assets/equipo',['.jpg','.jpeg','.png','.webp']);
      const bytes=fs.readFileSync(photo.filename);
      if(bytes.length>5*1024*1024) throw Error('La foto de ' + name + ' supera los 5 MB.');
      const ext=path.extname(photo.filename).toLowerCase();
      const png=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
      const jpg=bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
      const webp=bytes.subarray(0,4).toString()==='RIFF' && bytes.subarray(8,12).toString()==='WEBP';
      if(!(ext==='.png'?png:ext==='.webp'?webp:jpg)) throw Error('La foto de ' + name + ' no coincide con su formato JPG, PNG o WebP.');
      photos[name]=photo.url;
    }
  }
  return {documents, profiles, photos};
}
module.exports = {loadContent};
