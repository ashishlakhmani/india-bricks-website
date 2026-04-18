// Mobile nav toggle
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close nav when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Enquiry form — sends details to WhatsApp
function submitForm(e) {
  e.preventDefault();
  const name     = document.getElementById('name').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const quantity = document.getElementById('quantity').value;
  const message  = document.getElementById('message').value.trim();

  let text = `Hello, I would like to enquire about bricks.\n\nName: ${name}\nPhone: ${phone}`;
  if (quantity) text += `\nQuantity needed: ${quantity}`;
  if (message)  text += `\nMessage: ${message}`;

  const waUrl = `https://wa.me/919415280283?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

// Smooth active link highlight on scroll
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#fff' : '';
  });
}, { passive: true });
