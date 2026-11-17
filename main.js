const pal=["#EBD842","#A8261E","#2E58B0","#FF9100","#F3ECDC"];
document.querySelectorAll(".p").forEach(el=>el.addEventListener("click",()=>{
  const i=pal.indexOf(el.getAttribute("fill").toUpperCase());
  el.setAttribute("fill",pal[(i+1)%pal.length]);
}));

/* desfile: los personajes cruzan la pantalla; toca uno para que hable */
(function(){
  const box=document.getElementById("desfile");if(!box)return;
  const quiet=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const data=[{e:"🦸",img:"img/luchador.png",h:84,s:"¡Soy memito el toro!",v:60},{e:"👧🏽",img:"img/nina.png",h:108,s:"¡Me encanta ayudar!",v:60},{e:"🐕",img:"img/perro.png",h:108,s:"¡Tap,tap!",v:60}];
  const items=data.map((d,i)=>{
    const el=document.createElement("div");el.className="ch"+(d.f?" flip":"");
    el.innerHTML='<span class="b"><img alt="" style="height:'+d.h+'px" src="'+d.img+'"></span><span class="say">'+d.s+'</span>';
    const im=el.querySelector("img");
    im.onerror=()=>{im.replaceWith(Object.assign(document.createElement("span"),{className:"em",textContent:d.e}))};
    box.appendChild(el);
    const it={el,v:d.v,x:-100-i*230};
    el.addEventListener("click",()=>{
      el.classList.remove("jump");void el.offsetWidth;el.classList.add("jump","talk");
      setTimeout(()=>el.classList.remove("talk"),1600);
    });
    el.addEventListener("pointerenter",()=>it.stop=1);
    el.addEventListener("pointerleave",()=>it.stop=0);
    return it;
  });
  let last=performance.now();
  function tick(t){
    const dt=Math.min(.05,(t-last)/1000);last=t;const W=box.clientWidth;
    items.forEach((it,i)=>{
      if(quiet){it.x=W*(.2+.3*i)}
      else if(!it.stop){it.x+=it.v*dt;if(it.x>W+100)it.x=-120}
      it.el.style.transform="translateX("+it.x+"px)";
    });
    if(!quiet)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
