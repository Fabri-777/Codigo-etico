const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const esbuild = require('esbuild');
const root = __dirname;
process.chdir(root);
const html = fs.readFileSync('source.html', 'utf8');
const {documents, profiles, photos} = require('./content.cjs').loadContent(root);
const content = 'const libraryDocuments = ' + JSON.stringify(documents) + ';\nconst linkedinProfiles = ' + JSON.stringify(profiles) + ';\nconst teamPhotos = ' + JSON.stringify(photos) + ';';
const jsx = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/)[1].replace('/* PROJECT_CONTENT */', () => content).replace('/* EDITOR_COMPONENT */',()=>fs.readFileSync('editor.jsx','utf8')).replace('/* INTRO_COMPONENT */',()=>fs.readFileSync('intro.jsx','utf8')).replace('/* TEAM_PHOTO_COMPONENT */',()=>fs.readFileSync('team-photo.jsx','utf8'));
const config = html.match(/tailwind.config = ([\s\S]*?);\s*<\/script>/)[1];
// Limpia solo la carpeta de salida verificada dentro de este proyecto.
const outputDirectory=path.resolve(root,'dist');
if(path.relative(root,outputDirectory)!=='dist') throw Error('Ruta de salida no válida');
if(fs.existsSync(outputDirectory)) {
  if(fs.realpathSync(outputDirectory)!==path.join(fs.realpathSync(root),'dist')) throw Error('La salida no puede ser un enlace');
  fs.rmSync(outputDirectory,{recursive:true,force:true});
}
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('.build', { recursive: true });
fs.writeFileSync('.build/tailwind.config.cjs', 'module.exports = ' + config.replace('"#D4AF37"', '"#d5b876"') + ';module.exports.content = ["./source.html"];');
fs.writeFileSync('.build/input.css', '@tailwind base;@tailwind components;@tailwind utilities;');
execFileSync(process.execPath, [require.resolve('tailwindcss/lib/cli.js'), '-c', '.build/tailwind.config.cjs', '-i', '.build/input.css', '-o', '.build/utilities.css', '--minify'], { stdio: 'inherit' });
const transformed = esbuild.transformSync(jsx, {loader:'jsx',minify:true,target:'es2020',format:'iife'}).code;
const js = ['node_modules/react/umd/react.production.min.js','node_modules/react-dom/umd/react-dom.production.min.js','node_modules/gsap/dist/gsap.min.js','node_modules/gsap/dist/ScrollTrigger.min.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n') + '\n' + transformed;
new vm.Script(js);
const css = fs.readFileSync('.build/utilities.css', 'utf8') + '\n' + fs.readFileSync('software.css','utf8') + '\n' + fs.readFileSync('experience.css','utf8') + '\n' + fs.readFileSync('team-photo.css','utf8');
let out = html.replace(/\s*<script src="[^"]*"><\/script>/g,'').replace(/<script>\s*tailwind.config[\s\S]*?<\/script>/,'').replace(/<style>[\s\S]*?<\/style>/,'<style>'+css+'</style>');
out = out.replace(/<script type="text\/babel">[\s\S]*?<\/script>/, () => '<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>');
out = out.replace('<div id="root"></div>', '<noscript>Activa JavaScript para consultar las secciones del portafolio Código Ético.</noscript><div id="root"></div>');
fs.writeFileSync('dist/index.html',out);
fs.cpSync('public/assets','dist/assets',{recursive:true});
// Copia únicamente los PDFs y portadas declarados en content/temas.json.
for (const doc of documents) for (const url of [doc.file, doc.cover].filter(Boolean)) {
  const relative = url.split('/').map(decodeURIComponent).join('/');
  fs.mkdirSync(path.dirname(path.join('dist',relative)),{recursive:true});
  fs.copyFileSync(path.join('public',relative),path.join('dist',relative));
}
if(fs.existsSync('.openai/hosting.json')){fs.mkdirSync('dist/.openai',{recursive:true});fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');}
// Render every existing section without a browser to catch component errors and lost content.
const testSource = 'import * as React from "react";import {renderToStaticMarkup} from "react-dom/server";const window={matchMedia:()=>({matches:true})};const gsap={registerPlugin:()=>{}};const ScrollTrigger={};\n' + jsx.replace(/ReactDOM.createRoot[\s\S]*$/, '') + '\nexport function validate(){return [Inicio,Equipo,Manifiesto,Temas,()=>React.createElement(EmptySection,{id:"podcast",label:"Podcast",number:"04"}),()=>React.createElement(EmptySection,{id:"video",label:"Video",number:"05"}),()=>React.createElement(EmptySection,{id:"infografia",label:"Infografía",number:"06"})].map(C=>renderToStaticMarkup(React.createElement(C)));}';
fs.writeFileSync('.build/check.cjs', esbuild.transformSync(testSource,{loader:'jsx',format:'cjs',target:'es2020'}).code);
const sections = require('./.build/check.cjs').validate();
const expected = ['Código','Fabricio Fernandez','Integridad de Datos y Privacidad','BIBLIOTECA','Podcast','Video','Infografía'];
sections.forEach((s,i)=>{if(!s.includes(expected[i])) throw Error('Section failed: '+expected[i]);});
if (out.includes('text/babel') || out.includes('<script src=')) throw Error('Unexpected runtime CDN dependency');
if (!out.includes('prefers-reduced-motion')) throw Error('Reduced motion fallback missing');
console.log('Build OK: seven section states rendered; JSX compiled; scripts bundled; reduced-motion fallback present.');
console.log('Standalone HTML: '+(Buffer.byteLength(out)/1024).toFixed(1)+' KB');

