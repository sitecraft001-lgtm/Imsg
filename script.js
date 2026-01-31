// script.js
const packages = [
  {
    id:'bali', title:'Bali Serenity Escape', duration:'6 nights', price:'₹58,000',
    theme:'Wellness', dest:'Bali',
    image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    overview:'Unwind in lush Ubud and sun‑kissed beaches with spa rituals and temple sunsets.',
    highlights:['Ubud rice terraces','Tanah Lot sunset','Balinese spa day']
  },
  {
    id:'paris', title:'Paris Art & Café Trail', duration:'5 nights', price:'₹92,000',
    theme:'City', dest:'Paris',
    image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    overview:'A chic stroll through galleries, patisseries, and riverside evenings.',
    highlights:['Louvre & Orsay','Montmartre walk','Seine cruise']
  },
  {
    id:'swiss', title:'Swiss Alps Panorama', duration:'7 nights', price:'₹1,35,000',
    theme:'Adventure', dest:'Switzerland',
    image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
    overview:'Scenic rail journeys, alpine villages, and glacier viewpoints.',
    highlights:['Glacier Express','Interlaken','Lake Lucerne']
  }
];

function toggleMenu(){
  const nav = document.getElementById('navLinks');
  if(!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
  nav.style.gap = '8px';
}

function quickSearch(){
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const month = document.getElementById('monthSelect')?.value;
  const match = packages.find(p => p.dest.toLowerCase().includes(q) || p.title.toLowerCase().includes(q));
  if(match){
    window.location.href = `package.html?id=${match.id}`;
  }else{
    toast('No exact match—showing all packages.'); 
    window.location.href = 'packages.html';
  }
}

function applyFilters(){
  const q = (document.getElementById('filterInput')?.value || '').toLowerCase();
  const dur = document.getElementById('durationSelect')?.value;
  const grid = document.getElementById('packageGrid');
  if(!grid) return;
  grid.innerHTML = '';
  const filtered = packages.filter(p=>{
    const textMatch = p.title.toLowerCase().includes(q) || p.dest.toLowerCase().includes(q) || p.theme.toLowerCase().includes(q);
    const durMatch = dur === '' ||
      (dur==='short' && parseInt(p.duration) <= 4) ||
      (dur==='medium' && parseInt(p.duration) >=5 && parseInt(p.duration) <=7) ||
      (dur==='long' && parseInt(p.duration) >=8);
    return textMatch && durMatch;
  });
  if(filtered.length===0){ grid.innerHTML = `<p class="muted">No packages found. Try a different filter.</p>`; return; }
  filtered.forEach(p=>{
    grid.appendChild(cardEl(p));
  });
}

function cardEl(p){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <img src="${p.image}" alt="${p.dest}">
    <div class="card-body">
      <h3 class="card-title">${p.title}</h3>
      <div class="meta"><span>${p.duration}</span>•<span>${p.theme}</span></div>
      <div class="price">${p.price}</div>
      <div class="card-actions">
        <a class="btn" href="package.html?id=${p.id}">View Details</a>
        <a class="btn secondary" href="booking.html?pkg=${p.id}">Book Now</a>
      </div>
    </div>`;
  return el;
}

(function initPackagePage(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if(!id) return;
  const p = packages.find(x=>x.id===id);
  if(!p) return;
  const t = document.getElementById('pkgTitle');
  const img = document.getElementById('pkgImage');
  const ov = document.getElementById('pkgOverview');
  const dur = document.getElementById('pkgDuration');
  const price = document.getElementById('pkgPrice');
  const btn = document.getElementById('bookBtn');
  const hl = document.getElementById('pkgHighlights');
  if(t) t.textContent = p.title;
  if(img) img.src = p.image;
  if(ov) ov.textContent = p.overview;
  if(dur) dur.textContent = p.duration;
  if(price) price.textContent = p.price;
  if(btn) btn.href = `booking.html?pkg=${p.id}`;
  if(hl){ hl.innerHTML = p.highlights.map(h=>`<li>${h}</li>`).join(''); }
})();

function submitBooking(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const pkg = document.getElementById('pkg').value.trim();
  const msg = document.getElementById('bookingMsg');
  if(!name || !email){ toast('Please fill required fields.'); return false; }
  msg.textContent = `Thanks ${name}! Your request for "${pkg || 'selected package'}" is received. We’ll email you shortly.`;
  toast('Booking request submitted.');
  return false;
}

function submitContact(e){
  e.preventDefault();
  const name = document.getElementById('cname').value.trim();
  const msg = document.getElementById('contactMsg');
  msg.textContent = `Thanks ${name}! We’ll get back within 24 hours.`;
  toast('Message sent.');
  return false;
}

function toast(text){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div'); t.id='toast';
    t.style.position='fixed'; t.style.bottom='20px'; t.style.right='20px';
    t.style.background='var(--card)'; t.style.border='1px solid rgba(255,255,255,.1)';
    t.style.color='var(--text)'; t.style.padding='12px 14px'; t.style.borderRadius='12px';
    t.style.boxShadow='var(--shadow)'; t.style.zIndex='100';
    document.body.appendChild(t);
  }
  t.textContent = text; t.style.opacity='1';
  setTimeout(()=>{ t.style.opacity='0'; }, 2200);
}