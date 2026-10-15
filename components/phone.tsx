import Image from "next/image";
export function Phone({src,alt,orb=false}:{src:string;alt:string;orb?:boolean}){return <div className="phone"><Image src={src} width={860} height={1864} alt={alt} sizes="(max-width: 800px) 78vw, 360px" priority={orb}/>{orb?<span className="orb" aria-hidden="true">AI</span>:null}</div>}
