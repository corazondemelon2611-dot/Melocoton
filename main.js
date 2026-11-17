const pal=["#EBD842","#A8261E","#2E58B0","#FF9100","#F3ECDC"];
document.querySelectorAll(".p").forEach(el=>el.addEventListener("click",()=>{
  const i=pal.indexOf(el.getAttribute("fill").toUpperCase());
  el.setAttribute("fill",pal[(i+1)%pal.length]);
}));
