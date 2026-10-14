// Add only real business details. The static website does not store or send form submissions itself.
const CONTACT = {
  email: 'tahawarabbas76@gmail.com',
  whatsapp: '923187067972'
};
const $=s=>document.querySelector(s);
const menu=$('.menu-btn'),nav=$('#primary-nav');
menu?.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(isOpen));menu.setAttribute('aria-label',isOpen?'Close menu':'Open menu');});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
$('#year').textContent=new Date().getFullYear();
const realEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT.email);
const wa=CONTACT.whatsapp.replace(/\D/g,'');const realWA=wa.length>=8&&wa.length<=15;
const waLink='https://wa.me/'+wa+'?text='+encodeURIComponent('Hello Zovariq Digital, I would like to discuss your services.');
if(realEmail){$('#emailLink').href='mailto:'+CONTACT.email;$('#emailLink').textContent=CONTACT.email;}
if(realWA){$('#whatsappLink').href=waLink;$('#whatsappLink').textContent='+92 318 7067972 · Chat now ↗';$('#floatingWhatsApp').href=waLink;}
// Avoid overlapping the enquiry form with floating contact buttons.
if('IntersectionObserver' in window){
  const quickContact=$('.floating-contact');
  new IntersectionObserver(entries=>{
    quickContact?.classList.toggle('is-hidden',entries[0].isIntersecting);
  },{threshold:0.02}).observe($('#contact'));
}
document.querySelectorAll('[data-service]').forEach(el=>el.addEventListener('click',()=>{$('#serviceSelect').value=el.dataset.service;}));
$('#enquiryForm').addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const get=k=>String(data.get(k)||'').trim();
  const message=`Name: ${get('name')}\nEmail: ${get('email')}\nCompany: ${get('company')||'Not provided'}\nService: ${get('service')}\n\nProject details:\n${get('message')}`;
  const method=e.submitter?.value||'whatsapp';
  const status=$('#formStatus');
  if(method==='email'){
    if(!realEmail){status.textContent='Email is unavailable. Please use WhatsApp instead.';return;}
    status.textContent='Your email app will open with the enquiry. Please review and press Send.';
    const subject=encodeURIComponent('Zovariq Digital project enquiry — '+get('service'));
    location.href=`mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
  }else{
    if(!realWA){status.textContent='WhatsApp is unavailable. Please email us instead.';return;}
    status.textContent='WhatsApp will open with your enquiry. Please review it and press Send.';
    const url='https://wa.me/'+wa+'?text='+encodeURIComponent('Hello Zovariq Digital!\n\n'+message);
    window.open(url,'_blank','noopener,noreferrer');
  }
});
if('IntersectionObserver'in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}})},{threshold:.05});document.querySelectorAll('.service-card,.section-head,.solutions-copy,.solution-display,.step,.about-layout>div,.faq-layout>div,.contact-head,.contact-grid>div,.enquiry-form').forEach(node=>{node.classList.add('reveal');observer.observe(node)});}
let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const height=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=(height>0?Math.min(100,scrollY/height*100):0)+'%';ticking=false;});},{passive:true});
