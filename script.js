document.addEventListener('DOMContentLoaded', () => {
  const infoPanel = document.getElementById('infoPanel');
  const search = document.getElementById('search');
  const randomFact = document.getElementById('randomFact');

  // facts
  const facts = [
    "India has the world's largest postal network.",
    "The Kumbh Mela is so large it is visible from space.",
    "Chess originated in India.",
    "India is the second-largest English-speaking country.",
    "The Indian Railways is one of the world's largest employers."
  ];
  randomFact.textContent = facts[Math.floor(Math.random()*facts.length)];

  // helper to show info
  function showInfo(data){
    infoPanel.classList.remove('fade-in');
    void infoPanel.offsetWidth; // reflow to restart animation
    infoPanel.classList.add('fade-in');
    infoPanel.innerHTML = `
      <h2 class="region-title">${data.name}</h2>
      <div class="region-meta"><strong>Capital:</strong> ${data.capital} • <strong>Area:</strong> ${data.area}</div>
      <div class="region-desc">
        <p><strong>Geography:</strong> ${data.geography}</p>
        <p><strong>Significance:</strong> ${data.significance}</p>
      </div>
      <div style="margin-top:10px;">
        <img src="${data.image}" alt="${data.name}" style="width:100%;border-radius:8px;box-shadow:0 6px 16px rgba(3,41,35,0.06)">
      </div>
    `;
  }

  // load data
  fetch('states.json').then(r=>r.json()).then(regions=>{
    // setup search
    search.addEventListener('input', e=>{
      const q = e.target.value.trim().toLowerCase();
      if(!q) return;
      const found = regions.find(r=>r.name.toLowerCase().includes(q));
      if(found) showInfo(found);
    });

    // hook svg
    const svgObject = document.getElementById('indiaMap');
    svgObject.addEventListener('load', ()=>{
      const svgDoc = svgObject.contentDocument;
      regions.forEach(reg=>{
        const el = svgDoc.getElementById(reg.id);
        if(el){
          el.style.cursor = 'pointer';
          el.addEventListener('click', ()=> showInfo(reg));
          // hover highlight
          el.addEventListener('mouseenter', ()=> el.setAttribute('fill-opacity','0.8'));
          el.addEventListener('mouseleave', ()=> el.setAttribute('fill-opacity','1'));
        }
      });
    });
  }).catch(err=>{
    infoPanel.innerHTML = '<p style="color:#a94442">Failed to load data.</p>';
    console.error(err);
  });
});