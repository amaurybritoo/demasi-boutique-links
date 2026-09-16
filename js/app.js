const SUPABASE_URL='https://swuyvugjtmszeyiitfvn.supabase.co';
const SUPABASE_KEY='sb_publishable_R0KxAD5of9g5sQXeQzYEIw_3UMrVryG';
const VIP='https://chat.whatsapp.com/FbHcH09HqTsF61CAkp1VCK?s=cl&p=i&mlu=4&ilr=4';
const DEFAULT={name:'Demasi Boutique',bio:'Elegância que combina com você.',logo_url:'assets/logo.svg',background_url:'assets/background-default.jpg',address:'Rua Dom Milton Correia Pereira, 1010, Parque 10 de Novembro, Manaus — AM, 69055-440, Brasil',whatsapp:'https://api.whatsapp.com/send/?phone=92984194325&text=Ol%C3%A1%2C+Demasi%21+Vim+pelo+Instagram+e+gostaria+de+conhecer+as+pe%C3%A7as.&type=phone_number&app_absent=0',instagram:'https://www.instagram.com/demasi.boutique/',tiktok:'',vip:VIP,catalogo:'https://demasi-boutique.vercel.app/#catalogo',location_query:'Demasi Boutique, Rua Dom Milton Correia Pereira, 1010, Parque 10 de Novembro, Manaus, AM, 69055-440'};
const ICONS={
 catalogo:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M8 8a4 4 0 0 1 8 0"/><path d="M9 12h.01M15 12h.01"/></svg>`,
 whatsapp:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"><path d="M20.1 11.5a8.1 8.1 0 0 1-12 7.05L4 20l1.45-4.15A8.1 8.1 0 1 1 20.1 11.5Z"/><path d="M9.05 8.55c.22 1.75 2 3.5 3.65 4.2l1.25-1.05 1.7.78c.23.1.34.37.25.6-.38.94-1.1 1.45-2.05 1.32-3.33-.46-6.06-3.2-6.52-6.52-.13-.95.38-1.67 1.32-2.05.23-.09.5.02.6.25l.78 1.7-1.05 1.25Z"/></svg>`,
 instagram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.8" r=".8" fill="currentColor" stroke="none"/></svg>`,
 tiktok:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.7 3h2.8c.3 1.9 1.4 3.3 3.2 4v2.8c-1.2-.1-2.3-.5-3.3-1.1v6.1a6.2 6.2 0 1 1-5.3-6.1v2.9a3.4 3.4 0 1 0 2.6 3.2V3Z"/></svg>`,
 location:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
 youtube:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/></svg>`,
 link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13.5 8.5 15a3.2 3.2 0 0 1-4.5-4.5l3-3A3.2 3.2 0 0 1 11.5 7"/><path d="m14 10.5 1.5-1.5A3.2 3.2 0 0 1 20 13.5l-3 3a3.2 3.2 0 0 1-4.5 0"/><path d="m8.5 12.5 7-1"/></svg>`,
 vip:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.1 4.25 4.69.68-3.4 3.31.8 4.67L12 13.7l-4.19 2.21.8-4.67-3.4-3.31 4.69-.68L12 3Z"/><path d="M7 18.2h10M8.5 21h7"/></svg>`
};
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
async function getJSON(path){const r=await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`}});if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}
function currentSlug(){const m=location.pathname.match(/^\/loja\/([^/]+)/i);return m?decodeURIComponent(m[1]):new URLSearchParams(location.search).get('loja')}
function mapDestination(q){return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`}
function makeMap(q){const encoded=encodeURIComponent(q);document.getElementById('mapFrame').src=`https://www.google.com/maps?q=${encoded}&z=18&hl=pt-BR&output=embed`;document.getElementById('mapLink').href=mapDestination(q)}
function iconFor(type){const t=String(type||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');if(t.includes('whatsapp'))return ICONS.whatsapp;if(t.includes('instagram'))return ICONS.instagram;if(t.includes('tiktok'))return ICONS.tiktok;if(t.includes('youtube'))return ICONS.youtube;if(t.includes('vip'))return ICONS.vip;if(t.includes('local')||t.includes('mapa')||t.includes('endereco'))return ICONS.location;if(t.includes('catalog'))return ICONS.catalogo;return ICONS.link}
function renderLinks(s,rows){
  const links=document.getElementById('links');
  let list=(rows||[]).filter(x=>x.enabled!==false&&x.url).sort((a,b)=>(a.sort_order??0)-(b.sort_order??0));
  if(!list.length){
    list=[['catalogo','Ver nosso catálogo','Explore nossas peças',s.catalogo],['whatsapp','Falar no WhatsApp','Atendimento e novidades',s.whatsapp],['instagram','Instagram','Acompanhe a Demasi',s.instagram],['tiktok','TikTok','Siga a Demasi',s.tiktok],['vip','Grupo VIP','Ofertas exclusivas e novidades',VIP]]
      .filter(x=>x[3]).map((x,i)=>({type:x[0],title:x[1],subtitle:x[2],url:x[3],enabled:true,sort_order:i}));
  }
  links.innerHTML=list.map((x,i)=>`<a class="link-card${x.type==='vip'?' vip-card':''}" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" style="--delay:${i*70}ms"><span class="link-shimmer"></span><span class="link-icon">${iconFor(x.type)}</span><span class="link-copy"><b>${esc(x.title)}</b>${x.subtitle?`<small>${esc(x.subtitle)}</small>`:''}</span>${x.type==='vip'?'<em class="vip-badge">EXCLUSIVO</em>':''}<span class="link-arrow">→</span></a>`).join('');
}
function formatAddress(value){const parts=String(value||DEFAULT.address).split(',').map(x=>x.trim()).filter(Boolean);if(parts.length>=4)return `${esc(parts[0])}, ${esc(parts[1])}<br>${esc(parts.slice(2,4).join(' • '))}<br>${esc(parts.slice(4).join(' • '))}`;return esc(value||DEFAULT.address)}
function apply(s){
 document.title=`${s.name||DEFAULT.name} • Links`;document.querySelector('meta[name="description"]').setAttribute('content',`${s.name||DEFAULT.name} — todos os nossos links em um só lugar.`);document.getElementById('name').textContent=s.name||DEFAULT.name;document.getElementById('bio').textContent=s.bio||DEFAULT.bio;
 const logo=document.getElementById('logo');logo.src=s.logo_url||DEFAULT.logo_url;logo.alt=s.name||DEFAULT.name;document.getElementById('address').innerHTML=formatAddress(s.address);
 const bg=s.background_url||DEFAULT.background_url;document.getElementById('backdrop').style.backgroundImage=`url('${String(bg).replace(/'/g,"%27")}')`;makeMap(s.location_query||s.address||DEFAULT.location_query);
 document.getElementById('footerName').textContent=(s.name||DEFAULT.name).toUpperCase();document.getElementById('footerYear').textContent=new Date().getFullYear();
}
function createStars(){const box=document.getElementById('goldStars');if(!box)return;box.innerHTML='';for(let i=0;i<22;i++){const star=document.createElement('span');star.className='gold-star';star.textContent='✦';star.style.left=(Math.random()*100).toFixed(2)+'%';star.style.top=(-10-Math.random()*40).toFixed(2)+'%';star.style.setProperty('--fall', (11+Math.random()*9).toFixed(2)+'s');star.style.setProperty('--delay', (-Math.random()*18).toFixed(2)+'s');star.style.setProperty('--drift', ((Math.random()-.5)*70).toFixed(1)+'px');star.style.setProperty('--scale',(0.45+Math.random()*.55).toFixed(2));box.appendChild(star)}}
createStars();
async function boot(){let s={...DEFAULT},rows=[];const slug=currentSlug();try{if(slug){const p=await getJSON(`link_page_profiles?slug=eq.${encodeURIComponent(slug)}&enabled=eq.true&select=*`);if(p[0]){s={...s,...p[0]};rows=await getJSON(`link_page_links?profile_id=eq.${p[0].id}&enabled=eq.true&select=*&order=sort_order.asc`)}}else{const a=await getJSON('link_page_settings?id=eq.1&select=*');if(a[0])s={...s,...a[0]};rows=await getJSON('link_page_links?profile_id=is.null&enabled=eq.true&select=*&order=sort_order.asc')}}catch(e){console.warn('[DEMASI LINKS] usando configuração local:',e)}apply(s);renderLinks(s,rows)}
document.getElementById('shareBtn').addEventListener('click',async()=>{const b=document.getElementById('shareBtn'),label=b.querySelector('.share-label');try{if(navigator.share){await navigator.share({title:document.title,url:location.href});return}if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(location.href)}else{const ta=document.createElement('textarea');ta.value=location.href;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}b.classList.add('copied');if(label){label.textContent='Link copiado';setTimeout(()=>label.textContent='Compartilhar',1600)}setTimeout(()=>b.classList.remove('copied'),1600)}catch(e){if(e&&e.name!=='AbortError'){b.classList.add('copied');if(label){label.textContent='Toque para compartilhar';setTimeout(()=>label.textContent='Compartilhar',1800)}setTimeout(()=>b.classList.remove('copied'),1800)}}});boot();

// Microestrelas douradas: leves, aleatórias e não interativas.
(function createSparkles(){
  const field=document.getElementById('sparkleField');
  if(!field || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const count=18;
  for(let i=0;i<count;i++){
    const s=document.createElement('span');
    s.className='sparkle';
    s.style.left=(Math.random()*100)+'%';
    s.style.setProperty('--dur',(10+Math.random()*9).toFixed(2)+'s');
    s.style.setProperty('--delay',(-Math.random()*18).toFixed(2)+'s');
    s.style.setProperty('--drift',(-28+Math.random()*56).toFixed(1)+'px');
    s.style.setProperty('--op',(0.34+Math.random()*0.42).toFixed(2));
    s.style.transform=`scale(${0.65+Math.random()*0.7})`;
    field.appendChild(s);
  }
})();
