// メニュー開閉
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
  }));
}

// スクロールで表示
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ギャラリー拡大
const lb = document.querySelector('.lightbox');
if (lb) {
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('[data-full]').forEach(b => b.addEventListener('click', () => {
    lbImg.src = b.dataset.full;
    lb.classList.add('open');
  }));
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

// モーダル（FDDFのルール等）
document.querySelectorAll('[data-modal]').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById(btn.dataset.modal)?.showModal();
}));
document.querySelectorAll('dialog').forEach(d => {
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
  d.querySelector('.modal-close')?.addEventListener('click', () => d.close());
});

// トップ写真のスライド（6秒ごとに切り替え）
const slides = document.querySelectorAll('.hero .slides .photo');
const dots = document.querySelectorAll('.slide-dots i');
if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let cur = 0;
  setInterval(() => {
    slides[cur].classList.remove('is-on'); dots[cur]?.classList.remove('is-on');
    cur = (cur + 1) % slides.length;
    slides[cur].classList.add('is-on'); dots[cur]?.classList.add('is-on');
  }, 6000);
}
