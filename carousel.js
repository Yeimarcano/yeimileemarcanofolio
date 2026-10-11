(function(){
  const carousels = document.querySelectorAll('.carousel');
  if(!carousels.length) return;

  carousels.forEach((carousel)=>{
    const track = carousel.querySelector('.carousel-track');
    if(!track) return;
    const slides = Array.from(track.children);
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    let indicators = carousel.querySelector('.carousel-indicators');
    let index = 0;
    let interval = null;

    if(!indicators){
      indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';
      carousel.appendChild(indicators);
    }

    function createIndicators(){
      indicators.innerHTML = '';
      slides.forEach((s,i)=>{
        const b = document.createElement('button');
        if(i===0) b.classList.add('active');
        b.addEventListener('click',()=>{ goTo(i); resetAuto(); });
        indicators.appendChild(b);
      });
    }

    function update(){
      track.style.transform = `translateX(-${index*100}%)`;
      const buttons = indicators.querySelectorAll('button');
      buttons.forEach((b,i)=> b.classList.toggle('active', i===index));
    }

    function next(){ index = (index+1) % slides.length; update(); }
    function prev(){ index = (index-1 + slides.length) % slides.length; update(); }
    function goTo(i){ index = i; update(); }

    if(nextBtn) nextBtn.addEventListener('click', ()=>{ next(); resetAuto(); });
    if(prevBtn) prevBtn.addEventListener('click', ()=>{ prev(); resetAuto(); });

    function startAuto(){ interval = setInterval(next, 6000); }
    function stopAuto(){ clearInterval(interval); interval = null; }
    function resetAuto(){ stopAuto(); startAuto(); }

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // make focusable for keyboard control
    if(!carousel.hasAttribute('tabindex')) carousel.setAttribute('tabindex','0');
    carousel.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowRight'){ next(); resetAuto(); }
      if(e.key==='ArrowLeft'){ prev(); resetAuto(); }
    });

    createIndicators();
    update();
    startAuto();
  });
})();