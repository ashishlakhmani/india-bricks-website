// ===== NAV SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== MOBILE NAV =====
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ===== ANIMATED COUNTERS =====
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// Trigger counters when stats band enters viewport
const statsBand = document.querySelector('.stats-band');
if (statsBand) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(statsBand);
}

// ===== BRICK CALCULATOR =====
function calculateBricks() {
  const length = parseFloat(document.getElementById('wallLength').value);
  const height = parseFloat(document.getElementById('wallHeight').value);
  const thick  = parseFloat(document.getElementById('wallThick').value);
  const result = document.getElementById('calcResult');

  if (!length || !height || length <= 0 || height <= 0) {
    result.className = 'calc-result show';
    result.innerHTML = '⚠️ Please enter valid wall length and height.';
    return;
  }

  // Area in sq ft → sq metres
  const areaSqFt = length * height;
  const areaSqM  = areaSqFt * 0.0929;

  // Standard brick: 230mm x 70mm face, ~10mm mortar → ~239mm x 79mm per brick
  // Bricks per sq metre (single skin) ≈ 59
  const bricksPerSqM = thick === 9 ? 118 : 59;
  const bricks = Math.ceil(areaSqM * bricksPerSqM * 1.05); // 5% wastage

  result.className = 'calc-result show';
  result.innerHTML = `
    🧱 <strong>Estimated Bricks Needed: ~${bricks.toLocaleString('en-IN')} bricks</strong><br>
    <span style="font-weight:400; color: #7A6050; font-size:0.88rem;">
      Wall: ${length} ft × ${height} ft (${thick}" thick) · Includes 5% wastage<br>
      <a href="https://wa.me/919415280283?text=Hello%2C%20I%20need%20a%20quote%20for%20${bricks}%20bricks." target="_blank" style="color: #E8510A; font-weight:600;">→ WhatsApp us for a price quote</a>
    </span>
  `;
}

// Allow Enter key in calculator inputs
['wallLength','wallHeight'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => {
    if (e.key === 'Enter') calculateBricks();
  });
});

// ===== FAQ ACCORDION =====
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
  });

  // Open clicked if it wasn't already open
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ===== ENQUIRY FORM → WHATSAPP =====
function submitEnquiry(e) {
  e.preventDefault();
  const name  = document.getElementById('eName').value.trim();
  const phone = document.getElementById('ePhone').value.trim();
  const city  = document.getElementById('eCity').value.trim();
  const qty   = document.getElementById('eQty').value;
  const msg   = document.getElementById('eMsg').value.trim();

  let text = `Hello, I would like to enquire about bricks.\n\nName: ${name}\nPhone: ${phone}`;
  if (city) text += `\nCity: ${city}`;
  if (qty)  text += `\nQuantity: ${qty}`;
  if (msg)  text += `\nMessage: ${msg}`;

  window.open(`https://wa.me/919415280283?text=${encodeURIComponent(text)}`, '_blank');
}

// ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) current = s.id; });
  navAnchors.forEach(a => {
    a.style.color = (a.getAttribute('href') === `#${current}`) ? 'var(--orange)' : '';
    a.style.background = (a.getAttribute('href') === `#${current}`) ? '#FFF0E8' : '';
  });
}, { passive: true });
