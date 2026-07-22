// ---- mobile menu ----
const burger = document.getElementById('burger');
const panel = document.getElementById('mobilePanel');
burger.addEventListener('click', () => {
  const open = panel.classList.toggle('show');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  panel.classList.remove('show'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', false);
}));

// ---- scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.14 });
revealEls.forEach(el => io.observe(el));

// ---- spine fill (progresso geral da página) ----
const spineFill = document.getElementById('spineFill');
function updateSpine(){
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (spineFill) spineFill.style.height = pct + '%';
}

// ---- timeline fill (progresso local da seção "Como funciona") ----
const timeline = document.getElementById('timeline');
const timelineFill = document.getElementById('timelineFill');
function updateTimeline(){
  if (!timeline || !timelineFill) return;
  const rect = timeline.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = rect.height + vh * 0.5;
  const seen = Math.min(Math.max(vh * 0.85 - rect.top, 0), total);
  const pct = total > 0 ? (seen / total) * 100 : 0;
  timelineFill.style.height = pct + '%';
}

function onScroll(){
  updateSpine();
  updateTimeline();
}
document.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// ---- núcleos tabs ----
const nucTabs = document.querySelectorAll('.nuctab');
const nucPanels = document.querySelectorAll('.nucpanel');
nucTabs.forEach(tab => tab.addEventListener('click', () => {
  nucTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  nucPanels.forEach(p => p.classList.remove('active'));
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  const target = tab.dataset.nuc;
  document.querySelector('.nucpanel[data-panel="' + target + '"]').classList.add('active');
}));

// ---- accordion Gestão de Fornecedores ----
const accItems = document.querySelectorAll('.acc-item');
accItems.forEach(item => {
  const head = item.querySelector('.acc-head');
  head.addEventListener('click', () => {
    const wasActive = item.classList.contains('active');
    accItems.forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// ---- header: leve sombra ao rolar ----
const header = document.getElementById('siteHeader');
function onHeaderScroll(){
  if (window.scrollY > 8) header.style.boxShadow = '0 12px 30px -20px rgba(0,0,0,0.6)';
  else header.style.boxShadow = 'none';
}
document.addEventListener('scroll', onHeaderScroll, { passive: true });
onHeaderScroll();
