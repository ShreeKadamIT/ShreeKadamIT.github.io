const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

const toggle=$("#themeToggle");
toggle?.addEventListener("click",()=>{
  document.body.classList.toggle("light-mode");
  localStorage.setItem("sk-theme",document.body.classList.contains("light-mode")?"light":"dark");
});
if(localStorage.getItem("sk-theme")==="light") document.body.classList.add("light-mode");

const menu=$(".menu-toggle"), nav=$(".nav");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
$$(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

const statsObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    $$(".stats-grid strong").forEach(el=>{
      const target=Number(el.dataset.count||0); let n=0;
      const step=Math.max(1,Math.ceil(target/35));
      const timer=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(timer)}el.textContent=n},25);
    });
    statsObserver.disconnect();
  });
},{threshold:.4});
const stats=$(".stats-strip"); if(stats)statsObserver.observe(stats);

const title=$("#connectTitle"), text=$("#connectText");
$$(".connect-options button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const topic=btn.dataset.topic;
    title.textContent=`Let's connect about ${topic}.`;
    text.textContent={
      "Healthcare IT":"For HMIS, hospital technology, digital transformation and IT strategy.",
      "AI & Data":"For AI, analytics, automation, data engineering and healthcare intelligence.",
      "Speaking":"For conferences, workshops, panels and knowledge-sharing opportunities.",
      "DPDP & Privacy":"For healthcare privacy, DPDP awareness and data governance discussions.",
      "Collaboration":"For professional collaboration, ideas and technology initiatives."
    }[topic] || "Choose a contact option below.";
  });
});

$("#shareBtn")?.addEventListener("click",async()=>{
  const data={title:"Shree Kadam | CIO & Healthcare Technology Leader",text:"Connect with Shree Kadam",url:window.location.href};
  if(navigator.share){try{await navigator.share(data)}catch(e){}}
  else{await navigator.clipboard?.writeText(window.location.href); alert("Profile link copied.");}
});

const glow=$(".cursor-glow");
window.addEventListener("pointermove",e=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}});

$$("img").forEach(img=>img.addEventListener("error",()=>img.style.display="none"));
