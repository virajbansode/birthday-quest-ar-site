
(function(){
  const cfg = window.QUEST_CONFIG||{}; const steps = cfg.steps||[]; const grid = document.getElementById('grid');
  const base = cfg.domain || (location.origin + location.pathname.replace(/qr\.html$/,''));
  steps.forEach((s, i)=>{
    const card = document.createElement('div'); card.className='qr-card';
    const title = document.createElement('div'); title.textContent = `Step ${i+1}: ${s.title||''}`; title.style.fontWeight='700'; title.style.marginBottom='6px';
    const codeEl = document.createElement('div'); codeEl.className='qr';
    const url = `${base}quest.html?step=${i}&token=${encodeURIComponent(s.token||'')}`;
    card.appendChild(title); card.appendChild(codeEl);
    const small = document.createElement('div'); small.className='caption'; small.textContent = url; small.style.wordBreak='break-all'; small.style.marginTop='6px';
    card.appendChild(small);
    grid.appendChild(card);
    new QRCode(codeEl, {text: url, width: 180, height: 180});
  });
})();
