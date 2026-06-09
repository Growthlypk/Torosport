// ===== STATE =====
let selectedColor = 'blue';
let selectedSize = 'L';
let quantity = 1;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initHeader();
  initReveal();
  preselectFromURL();
});

// ===== HEADER SCROLL =====
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ===== MOBILE NAV =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

// ===== COLOR SELECTOR =====
function setColor(color) {
  selectedColor = color;
  document.getElementById('colorBlue').classList.toggle('active', color === 'blue');
  document.getElementById('colorRed').classList.toggle('active', color === 'red');

  const previewImg = document.getElementById('previewImg');
  if (color === 'blue') {
    previewImg.src = 'assets/blue-shirt-grass.png';
    previewImg.alt = 'Blue Independence Day Shirt';
  } else {
    previewImg.src = 'assets/red-shirt-grass.png';
    previewImg.alt = 'Red Independence Day Shirt';
  }
  previewImg.style.opacity = '0.5';
  setTimeout(() => { previewImg.style.opacity = '1'; }, 200);
}

function selectColor(color) {
  setColor(color);
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// ===== SIZE SELECTOR =====
function setSize(btn) {
  selectedSize = btn.textContent.trim();
  document.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ===== QUANTITY =====
function changeQty(delta) {
  quantity = Math.max(1, Math.min(50, quantity + delta));
  document.getElementById('qtyVal').textContent = quantity;
}

// ===== ADD TO CART (toast) =====
function addToCart() {
  showToast(`✓ Added ${quantity}× ${selectedColor === 'blue' ? 'Blue' : 'Red'} Edition (${selectedSize}) to cart`);
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `
      position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
      background:#0f0f0f;color:#fff;
      padding:12px 24px;border-radius:50px;
      font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1rem;
      z-index:3000;white-space:nowrap;
      box-shadow:0 8px 32px rgba(0,0,0,0.3);
      transition:opacity 0.3s;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 2800);
}

// ===== ORDER MODAL =====
function openOrderModal() {
  const modal = document.getElementById('orderModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Pre-fill selections
  const colorSelect = document.getElementById('f_color');
  colorSelect.value = selectedColor === 'blue' ? 'Blue Edition' : 'Red Edition';
  document.getElementById('f_size').value = selectedSize;
  document.getElementById('f_qty').value = quantity;
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('orderModal')) closeOrderModal();
}

// ===== ORDER SUBMIT → WHATSAPP =====
function submitOrder(e) {
  e.preventDefault();
  const name     = document.getElementById('f_name').value.trim();
  const wa       = document.getElementById('f_wa').value.trim();
  const country  = document.getElementById('f_country').value.trim();
  const city     = document.getElementById('f_city').value.trim();
  const color    = document.getElementById('f_color').value;
  const size     = document.getElementById('f_size').value;
  const qty      = document.getElementById('f_qty').value;
  const address  = document.getElementById('f_address').value.trim();
  const notes    = document.getElementById('f_notes').value.trim();

  const msg = [
    '🛒 *NEW ORDER — ToroSports*',
    '━━━━━━━━━━━━━━━━━━━━',
    `👤 *Name:* ${name}`,
    `📱 *WhatsApp:* ${wa}`,
    `🌍 *Country:* ${country}`,
    `🏙️ *City:* ${city}`,
    '━━━━━━━━━━━━━━━━━━━━',
    `👕 *Product:* Liberia Independence Day Special Edition Tee`,
    `🎨 *Color:* ${color}`,
    `📏 *Size:* ${size}`,
    `🔢 *Quantity:* ${qty}`,
    '━━━━━━━━━━━━━━━━━━━━',
    `📦 *Delivery Address:* ${address}`,
    notes ? `📝 *Notes:* ${notes}` : '',
    '━━━━━━━━━━━━━━━━━━━━',
    '⚡ Sent via ToroSports Official Website'
  ].filter(Boolean).join('\n');

  const encoded = encodeURIComponent(msg);
  const phone = '923454550015';
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  closeOrderModal();
  showToast('✓ Redirecting to WhatsApp...');
}

// ===== GALLERY TABS =====
const galleryData = {
  product: [
    { src: 'assets/red-shirt-product.png',  alt: 'Red shirt product view',   caption: 'Red Edition — Front View', cls: 'tall' },
    { src: 'assets/blue-shirt-grass.png',   alt: 'Blue shirt flat lay',       caption: 'Blue Edition — Flat Lay',  cls: '' },
    { src: 'assets/red-shirt-grass.png',    alt: 'Red shirt flat lay',        caption: 'Red Edition — Flat Lay',   cls: '' },
    { src: 'assets/both-shirts-wood.png',   alt: 'Both shirts together',      caption: 'Both Editions — Together', cls: 'wide' },
  ],
  lifestyle: [
    { src: 'assets/blue-shirt-celebration.png', alt: 'Model celebrating',     caption: 'Blue Edition — Victory',  cls: 'tall' },
    { src: 'assets/blue-shirt-stadium.png',     alt: 'Stadium hero shot',     caption: 'Blue Edition — Stadium',  cls: '' },
    { src: 'assets/red-shirt-model-outdoor.png',alt: 'Red edition outdoors',  caption: 'Red Edition — Outdoor',   cls: '' },
    { src: 'assets/both-shirts-poster.png',     alt: 'Official campaign poster', caption: 'Campaign Poster',      cls: 'wide' },
  ]
};

function setGalleryTab(btn, tab) {
  document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('galleryGrid');
  grid.style.opacity = '0';
  setTimeout(() => {
    grid.innerHTML = galleryData[tab].map(item => `
      <div class="gallery-item ${item.cls}">
        <img src="${item.src}" alt="${item.alt}" loading="lazy"/>
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `).join('');
    grid.style.opacity = '1';
    grid.style.transition = 'opacity 0.3s';
  }, 200);
}

// ===== FAQ =====
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const targets = document.querySelectorAll(
    '.benefit-card, .product-card, .trust-item, .gallery-item, .faq-item, .hero-badges .badge'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
}

// ===== SMOOTH SCROLL =====
function initScrollEffects() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== PRE-SELECT FROM URL =====
function preselectFromURL() {
  const params = new URLSearchParams(window.location.search);
  const c = params.get('color');
  if (c === 'red' || c === 'blue') setColor(c);
}
