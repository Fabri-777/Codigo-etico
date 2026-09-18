// Componente compartido para mostrar una foto o mantener las iniciales.
function MemberPortrait({name,src}) {
  const [failed,setFailed]=useState(false);
  useEffect(()=>setFailed(false),[src]);
  const initials=name.split(' ').filter(word=>word.length>3).slice(0,2).map(word=>word[0]).join('');
  return <span className={`member-portrait ${src&&!failed?'has-photo':''}`}>
    {src&&!failed?<img src={src} alt={`Foto de ${name}`} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>:<span className="member-initials mono" aria-hidden="true">{initials}</span>}
  </span>;
}
