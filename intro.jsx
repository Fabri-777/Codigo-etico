// Apertura: 2 s de carga, 1.6 s de código y 0.6 s para revelar el portafolio.
const INTRO_TIMING = { loading: 2000, code: 1600, reveal: 600 };
const bootLines = [
  '> iniciar codigo-etico --seccion 4AH',
  'import { responsabilidad } from "profesion";',
  'await priorizar(interesPublico);',
  'await proteger(privacidad, confidencialidad);',
  'await verificar(calidad, accesibilidad);',
  'await documentar(decisiones, riesgos);',
  'compromisoProfesional.integridad = true;',
  '✓ Código Ético · listo para explorar'
];
function BootScreen({phase}) {
  const [lines,setLines]=useState(0);
  useEffect(()=>{
    if(phase!=='code')return;
    if(reduced()){setLines(bootLines.length);return;}
    const timer=setInterval(()=>setLines(n=>Math.min(n+1,bootLines.length)),145);
    return()=>clearInterval(timer);
  },[phase]);
  return <div className={`boot-screen ${phase==='reveal'?'boot-out':''}`}>
    <div className="boot-brand mono"><Icon name="code" size={23}/><span>CÓDIGO ÉTICO <small>/ 4AH</small></span></div>
    <div className="boot-center">
      {phase==='loading'?<div className="boot-loading"><span className="boot-spinner" aria-hidden="true"/><p role="status">Cargando<span aria-hidden="true">…</span></p><span className="mono boot-caption">ÉTICA Y DEONTOLOGÍA PROFESIONAL</span></div>:<div className="boot-console"><div className="boot-console-head mono"><span>codigo-etico / inicio</span><span>SIMULACIÓN</span></div><div className="boot-code mono" aria-hidden="true">{bootLines.map((line,i)=><p key={line} className={i<lines?'boot-line-visible':''}><span>{String(i+1).padStart(2,'0')}</span>{line}</p>)}</div><p className="sr-only" role="status">{phase==='reveal'?'Contenido listo.':'Preparando el portafolio.'}</p><div className="boot-progress"><span/></div></div>}
    </div>
    <p className="boot-footer mono">INGENIERÍA CON RESPONSABILIDAD</p>
  </div>;
}
function App(){
  const [phase,setPhase]=useState('loading');
  useEffect(()=>{
    const first=setTimeout(()=>setPhase('code'),INTRO_TIMING.loading);
    const second=setTimeout(()=>setPhase('reveal'),INTRO_TIMING.loading+INTRO_TIMING.code);
    const third=setTimeout(()=>setPhase('ready'),INTRO_TIMING.loading+INTRO_TIMING.code+INTRO_TIMING.reveal);
    return()=>{clearTimeout(first);clearTimeout(second);clearTimeout(third);};
  },[]);
  useEffect(()=>{
    if(phase==='ready')return;
    const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=previous;};
  },[phase==='ready']);
  const mounted=phase==='reveal'||phase==='ready';
  return <>{mounted&&<div className="portfolio-reveal" {...(phase!=='ready'?{inert:'','aria-hidden':true}:{})}><Shell ready={phase==='ready'}/></div>}{phase!=='ready'&&<BootScreen phase={phase}/>}</>;
}
