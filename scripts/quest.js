
(function(){
  const cfg = window.QUEST_CONFIG || {steps:[]};
  const steps = cfg.steps || [];
  const herName = cfg.herName || 'Star';
  document.getElementById('herName').textContent = herName;

  function norm(s){ return (s||'').toString().trim().toLowerCase(); }
  function confettiBlast(){
    if(!window.confetti) return; const base = {spread:70, origin:{y:.6}};
    confetti(Object.assign({particleCount:160}, base));
    setTimeout(()=>confetti(Object.assign({particleCount:140, angle:60, origin:{x:0}}, base)),220);
    setTimeout(()=>confetti(Object.assign({particleCount:140, angle:120, origin:{x:1}}, base)),360);
  }

  // progress
  let idx = Number(new URLSearchParams(location.search).get('step'));
  if(!Number.isInteger(idx)) idx = Number(localStorage.getItem('bquest.progress')||0);
  if(idx<0) idx=0; if(idx>=steps.length) idx = steps.length-1;

  // QR token gating — optional
  const urlToken = new URLSearchParams(location.search).get('token');
  function canAccessStep(i){
    // If step has a token and URL doesn't include the right one, we still allow access sequentially
    // but block direct navigation unless token matches or previous steps are completed.
    const requiredToken = steps[i]?.token;
    const completed = Number(localStorage.getItem('bquest.progress')||0);
    if(i <= completed) return true; // already unlocked
    if(requiredToken && urlToken === requiredToken) return true; // QR used
    // otherwise, only next sequential step is allowed without token
    return i === completed;
  }

  function render(i){
    if(i<0 || i>=steps.length){ location.href = 'win.html'; return; }
    if(!canAccessStep(i)){
      // bounce to last unlocked
      const completed = Number(localStorage.getItem('bquest.progress')||0);
      location.href = `quest.html?step=${completed}`;
      return;
    }
    const s = steps[i];
    document.getElementById('stepBadge').textContent = `Step ${i+1} of ${steps.length}`;
    document.getElementById('stepTitle').textContent = s.title || `Step ${i+1}`;
    document.getElementById('clue').innerHTML = s.clue || '';
    document.getElementById('hint').textContent = s.hint || '';
    document.getElementById('feedback').textContent = '';
    const pct = Math.round((Math.max(i, Number(localStorage.getItem('bquest.progress')||0))/steps.length)*100);
    document.querySelector('#progress>div').style.width = pct + '%';
    document.getElementById('answer').value='';
    history.replaceState(null, '', `?step=${i}`);
  }

  function check(i, user){
    const s = steps[i]; const a = norm(s.answer);
    const ok = norm(user) === a || (Array.isArray(s.accept)&&s.accept.some(x=>norm(x)===norm(user)));
    return ok;
  }

  function submit(){
    const user = document.getElementById('answer').value;
    if(!user){ document.getElementById('feedback').textContent = 'Type your answer first 🙂'; return; }
    if(check(idx, user)){
      confettiBlast();
      document.getElementById('feedback').textContent = 'Correct! 🎉';
      // update progress
      const prev = Number(localStorage.getItem('bquest.progress')||0);
      const next = Math.max(prev, idx+1);
      localStorage.setItem('bquest.progress', String(next));
      setTimeout(()=>{
        if(next >= steps.length) location.href = 'win.html';
        else { idx = next; render(idx); }
      }, 900);
    } else {
      document.getElementById('feedback').textContent = 'Not quite. Try again or use a hint.';
    }
  }

  document.getElementById('submitBtn').addEventListener('click', submit);
  document.getElementById('answer').addEventListener('keydown', (e)=>{ if(e.key==='Enter') submit(); });
  document.getElementById('hintBtn').addEventListener('click', ()=>{
    const el = document.getElementById('hint'); el.style.display = el.style.display==='none'?'block':'none';
  });
  document.getElementById('skipBtn').addEventListener('click', ()=>{
    alert('Use the printed QR for this step to jump here instantly. Or keep solving in order!');
  });

  render(idx);
})();
