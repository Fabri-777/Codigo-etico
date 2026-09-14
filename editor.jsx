// Fragmentos ilustrativos: explican deberes profesionales, no ejecutan código externo.
const codeSamples = [
  {file:'deontologia.ts',label:'Deber profesional',lines:['const deberProfesional = {','  interesPublico: "primero",','  integridad: "sin excepciones",','  competencia: "mejora continua"','};','','await proteger(datosPrivados);','await comunicar(riesgosReales);','return actuarConResponsabilidad();'],logs:['✓ Interés público priorizado','✓ Riesgos comunicados con honestidad','→ Responsabilidad profesional asumida']},
  {file:'etica-profesional.ts',label:'Decisión ética',lines:['async function decidir(cambio) {','  const impacto = evaluar(cambio);','','  if (impacto.perjudicaPersonas) {','    return revisarAlternativas();','  }','','  await documentar(decision);','  return construirConIntegridad();','}'],logs:['✓ Impacto en las personas evaluado','✓ Alternativas y decisiones documentadas','→ Integridad antes de entregar']}
];
function Syntax({text}){return text.split(/("[^"]*"|\b(?:const|await|return|async|function|if)\b)/g).map((part,i)=><span key={i} className={part.startsWith('"')?'syntax-string':/^(const|await|return|async|function|if)$/.test(part)?'syntax-keyword':undefined}>{part}</span>);}
function CodeWindow(){
  const stage=useRef(null);
  const [paused,setPaused]=useState(reduced),[visible,setVisible]=useState(true),[pageVisible,setPageVisible]=useState(true),[frame,setFrame]=useState({sample:0,tick:0});
  const sample=codeSamples[frame.sample],total=sample.lines.join('\n').length;
  const typed=paused&&reduced()?total:Math.min(total,frame.tick*3);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));observer.observe(stage.current);
    const visibility=()=>setPageVisible(!document.hidden),media=matchMedia('(prefers-reduced-motion: reduce)'),preference=e=>{if(e.matches)setPaused(true);};
    document.addEventListener('visibilitychange',visibility);media.addEventListener('change',preference);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',preference);};
  },[]);
  useEffect(()=>{
    if(paused||!visible||!pageVisible)return;
    const timer=setInterval(()=>setFrame(prev=>{
      const length=codeSamples[prev.sample].lines.join('\n').length;
      return prev.tick*3>length+150?{sample:(prev.sample+1)%codeSamples.length,tick:0}:{...prev,tick:prev.tick+1};
    }),45);
    return()=>clearInterval(timer);
  },[paused,visible,pageVisible]);
  function selectSample(index){setFrame({sample:index,tick:paused?Math.ceil(codeSamples[index].lines.join('\n').length/3):0});}
  let offset=0;
  return <div ref={stage} className={`code-window ${paused?'is-paused':''}`}>
    <div className="code-window-header"><div><Icon name="code" size={19}/><h2 className="mono">CÓDIGOS <span>/ ÉTICA PROFESIONAL</span></h2></div><button className="icon-button" onClick={()=>setPaused(!paused)} aria-label={paused?'Reproducir animación de código':'Pausar animación de código'}><Icon name={paused?'play':'pause'} size={16}/></button></div>
    <div className="ethics-tabs mono" role="group" aria-label="Concepto del editor">{codeSamples.map((item,i)=><button type="button" key={item.file} aria-pressed={frame.sample===i} onClick={()=>selectSample(i)}>{item.label}</button>)}</div>
    <div className="editor-tab mono"><span>{sample.file}</span><span>TypeScript</span></div>
    <div className="code-editor" aria-hidden="true">{sample.lines.map((line,i)=>{const start=offset;offset+=line.length+1;const count=Math.max(0,Math.min(line.length,typed-start));const current=typed>=start&&typed<=start+line.length;return <div className={`code-line ${current?'current-line':''}`} key={i}><span className="line-number">{String(i+1).padStart(2,'0')}</span><code><Syntax text={line.slice(0,count)}/>{current&&<span className="code-caret"/>}</code></div>;})}</div>
    <p className="sr-only">{sample.label}: {sample.lines.join(' ')}</p>
    <div className="code-terminal mono"><div className="terminal-heading"><span>TERMINAL <span className="terminal-simulation">/ SIMULACIÓN</span></span><button type="button" className="terminal-run" onClick={()=>{setFrame(prev=>({...prev,tick:0}));setPaused(false);}}><Icon name="play" size={12}/> Ejecutar</button></div><div aria-hidden="true">{sample.logs.map((log,i)=><p className={typed>=total*(.5+i*.25)?'log-visible':'log-pending'} key={i}>{log}</p>)}</div></div>
  </div>;
}
