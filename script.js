/* Lightweight, defensive enhancement only: site remains readable without JS. */
(()=>{'use strict';
 const button=document.querySelector('.menu-btn');
 const menu=document.querySelector('.nav-links');
 if(button&&menu){button.addEventListener('click',()=>{const open=menu.classList.toggle('open');button.setAttribute('aria-expanded',String(open))});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');button.setAttribute('aria-expanded','false')}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.classList.remove('open');button.setAttribute('aria-expanded','false')}});}
 const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
 if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 if(!('IntersectionObserver' in window))return;
 const targets=document.querySelectorAll('.reveal');if(!targets.length)return;
 // Enable scroll reveals only after observer exists.
 document.documentElement.classList.add('js-motion');
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:0.05,rootMargin:'0px 0px 40px 0px'});
 targets.forEach(el=>observer.observe(el));
})();
