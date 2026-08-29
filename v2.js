(() => {
  const css = `
  .creative-proof{padding:110px 0;border-top:1px solid var(--line)}
  .proof-head{display:grid;grid-template-columns:1.15fr .85fr;gap:60px;align-items:end;margin:28px 0 48px}
  .proof-head h2{font-family:Manrope,Inter,sans-serif;font-size:clamp(52px,6.8vw,105px);font-weight:500;letter-spacing:-.055em;line-height:.9;margin:0}
  .proof-head p{max-width:520px;color:#aaa;font-size:17px;margin:0}
  .proof-grid{display:grid;grid-template-columns:1.35fr .65fr;grid-template-rows:340px 340px;gap:12px}
  .proof-card{position:relative;overflow:hidden;border-radius:20px;border:1px solid #292929;background:#111;isolation:isolate}
  .proof-card:first-child{grid-row:1/3}
  .proof-card img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92) contrast(1.06);transition:transform .8s cubic-bezier(.2,.7,.2,1)}
  .proof-card:hover img{transform:scale(1.035)}
  .proof-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 35%,rgba(0,0,0,.78));z-index:1}
  .proof-meta{position:absolute;z-index:2;left:24px;right:24px;bottom:22px;display:flex;justify-content:space-between;gap:20px;align-items:end}
  .proof-meta span{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#ddd}
  .proof-meta h3{font-family:Manrope;margin:5px 0 0;font-size:clamp(26px,3vw,48px);letter-spacing:-.04em;line-height:.95}
  .proof-meta b{font-size:11px;font-weight:500;border:1px solid rgba(255,255,255,.5);padding:8px 10px;border-radius:99px;white-space:nowrap}
  .proof-note{margin-top:14px;color:#686868;font-size:10px;letter-spacing:.08em;text-transform:uppercase}
  .portrait-art{background-image:linear-gradient(90deg,rgba(0,0,0,.12),rgba(0,0,0,.05)),url('https://unsplash.com/photos/Vrgdmfy-Tos/download?force=true&w=1400')!important;background-size:cover!important;background-position:center!important}
  .portrait-core,.portrait-glow{display:none!important}
  .image-card{background-image:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.7)),url('https://unsplash.com/photos/TxiE5gN9N9s/download?force=true&w=900')!important;background-size:cover!important;background-position:center!important}
  .image-card .orb{display:none}
  .nav{backdrop-filter:blur(14px);background:rgba(7,7,7,.72);position:sticky;top:0}
  @media(max-width:900px){.proof-head{grid-template-columns:1fr}.proof-grid{grid-template-columns:1fr;grid-template-rows:520px 330px 330px}.proof-card:first-child{grid-row:auto}.creative-proof{padding:80px 0}}
  @media(max-width:560px){.proof-grid{grid-template-rows:430px 280px 280px}.proof-meta{left:16px;right:16px;bottom:16px}.proof-meta b{display:none}}
  `;
  const style=document.createElement('style'); style.textContent=css; document.head.appendChild(style);

  const section=document.createElement('section');
  section.className='creative-proof shell';
  section.id='work';
  section.innerHTML=`
    <div class="section-index">[02.5] <span class="proof-label">CREATIVE EXPLORATIONS</span></div>
    <div class="proof-head"><h2 class="proof-title">NO MOSTRAMOS<br>MODELOS.<br><span class="accent">MOSTRAMOS IDEAS.</span></h2><p class="proof-copy">La tecnología desaparece detrás del resultado. De una dirección visual a una pieza terminada, IMPROMPTTU conecta generación, criterio y craft en un mismo flujo.</p></div>
    <div class="proof-grid">
      <article class="proof-card"><img loading="lazy" src="https://unsplash.com/photos/Vrgdmfy-Tos/download?force=true&w=1400" alt="Exploración visual editorial"><div class="proof-meta"><div><span>FASHION / MOTION / IMAGE</span><h3>MOVE DIFFERENT.</h3></div><b>CREATIVE STUDY 01</b></div></article>
      <article class="proof-card"><img loading="lazy" src="https://unsplash.com/photos/TxiE5gN9N9s/download?force=true&w=1000" alt="Exploración visual de campaña"><div class="proof-meta"><div><span>CAMPAIGN / ART DIRECTION</span><h3>BE SEEN.</h3></div><b>STUDY 02</b></div></article>
      <article class="proof-card"><img loading="lazy" src="https://unsplash.com/photos/1pbJGBBxc94/download?force=true&w=1000" alt="Exploración editorial de marca"><div class="proof-meta"><div><span>BRAND / EDITORIAL</span><h3>HUMAN, AMPLIFIED.</h3></div><b>STUDY 03</b></div></article>
    </div>
    <div class="proof-note">Creative explorations — visual references shown for concept demonstration, not client work.</div>`;
  const platform=document.querySelector('#platform');
  if(platform) platform.insertAdjacentElement('afterend',section);

  function localizeProof(){
    const isEs=document.documentElement.lang!=='en';
    const label=section.querySelector('.proof-label'), title=section.querySelector('.proof-title'), copy=section.querySelector('.proof-copy'), note=section.querySelector('.proof-note');
    if(isEs){label.textContent='EXPLORACIONES CREATIVAS';title.innerHTML='NO MOSTRAMOS<br>MODELOS.<br><span class="accent">MOSTRAMOS IDEAS.</span>';copy.textContent='La tecnología desaparece detrás del resultado. De una dirección visual a una pieza terminada, IMPROMPTTU conecta generación, criterio y craft en un mismo flujo.';note.textContent='Exploraciones creativas — referencias visuales mostradas como demostración conceptual, no como trabajo para clientes.';}
    else{label.textContent='CREATIVE EXPLORATIONS';title.innerHTML='WE DON’T SHOW<br>MODELS.<br><span class="accent">WE SHOW IDEAS.</span>';copy.textContent='The technology disappears behind the result. From visual direction to finished piece, IMPROMPTTU connects generation, judgment and craft in one flow.';note.textContent='Creative explorations — visual references shown for concept demonstration, not client work.';}
  }
  localizeProof();
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setTimeout(localizeProof,0)));
})();