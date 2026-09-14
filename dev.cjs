const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = path.join(__dirname, 'dist');
const mime = {'.html':'text/html; charset=utf-8','.pdf':'application/pdf','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer((req,res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
    const url = new URL(req.url,'http://127.0.0.1:4173');
    const pathname = decodeURIComponent(url.pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (relative.split(/[\\/]/).some(part=>part.startsWith('.'))) {res.writeHead(404);res.end();return;}
    const file = path.resolve(root,relative);
    const inside = path.relative(root,file);
    if (inside.startsWith('..') || path.isAbsolute(inside) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404);res.end('Archivo no encontrado');return;}
    const size = fs.statSync(file).size;
    let start=0,end=size-1,status=200;
    const headers={'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
    if(req.headers.range) {
      const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if(match){start=Number(match[1]);end=match[2]?Math.min(Number(match[2]),end):end;
        if(start>end||start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
        status=206;headers['Content-Range']=`bytes ${start}-${end}/${size}`;
      }
    }
    headers['Content-Length']=String(Math.max(0,end-start+1));res.writeHead(status,headers);
    if(req.method==='HEAD'||!size)res.end();else fs.createReadStream(file,{start,end}).pipe(res);
  }catch{res.writeHead(400);res.end('Solicitud no válida');}
}).listen(4173,'127.0.0.1',()=>console.log('Código Ético: http://127.0.0.1:4173'));
