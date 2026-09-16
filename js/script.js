// script.js - small interactions: theme toggle, smooth scroll, and set year
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');

  function applyTheme(t){
    if(t === 'dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
    if(toggle) toggle.setAttribute('aria-pressed', t === 'dark');
  }

  // restore theme
  try{
    const saved = localStorage.getItem('theme');
    if(saved) applyTheme(saved);
  }catch(e){/* ignore storage errors */}

  if(toggle){
    toggle.addEventListener('click', ()=>{
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next === 'dark' ? 'dark' : 'light');
      try{ localStorage.setItem('theme', next === 'dark' ? 'dark' : 'light'); }catch(e){}
    });
  }

  // smooth scroll for internal anchors
  document.addEventListener('click', e =>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const id = a.getAttribute('href');
    if(id === '#' || id === '#!') return;
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });

  // small entrance animation and set year
  window.addEventListener('DOMContentLoaded', ()=>{
    document.body.classList.add('is-ready');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
