// Typed Text Effect
const roles = [
  "Data Science Enthusiast 📊",
  "Machine Learning Engineer 🤖",
  "Power BI Developer 📈",
  "Python Developer 🐍",
  "Data Visualization Expert 🎨",
  "SQL & Analytics Pro 🗄️"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typed-text");

function typeEffect() {
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);
  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
typeEffect();

// Navbar scroll + back to top
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  backToTop.classList.toggle("show", window.scrollY > 400);
});

// Hamburger
document.getElementById("hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => document.querySelector(".nav-links").classList.remove("open"));
});

// Back to top
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Timeline animation
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: 0.2 });
document.querySelectorAll(".timeline-item").forEach(item => timelineObserver.observe(item));

// Contact form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ── Interactive Particle Background ──────────────────────────────────────────
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("particles").appendChild(canvas);

let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

// Multi-color particles
const colors = [
  "rgba(108,99,255,",
  "rgba(245,0,87,",
  "rgba(52,211,153,",
  "rgba(251,191,36,",
  "rgba(96,165,250,"
];

const particlesArr = Array.from({ length: 100 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 2.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5,
  alpha: Math.random() * 0.5 + 0.1,
  color: colors[Math.floor(Math.random() * colors.length)],
  baseX: 0,
  baseY: 0
}));

particlesArr.forEach(p => { p.baseX = p.x; p.baseY = p.y; });

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArr.forEach(p => {
    // Mouse repulsion
    if (mouse.x !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      const repelRadius = 120;
      if (dist < repelRadius) {
        const force = (repelRadius - dist) / repelRadius;
        p.x += (dx / dist) * force * 3;
        p.y += (dy / dist) * force * 3;
      }
    }

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `${p.color}${p.alpha})`;
    ctx.fill();

    // Move
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  // Connect nearby particles
  for (let i = 0; i < particlesArr.length; i++) {
    for (let j = i + 1; j < particlesArr.length; j++) {
      const dist = Math.hypot(
        particlesArr[i].x - particlesArr[j].x,
        particlesArr[i].y - particlesArr[j].y
      );
      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
        ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
        ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 110)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Mouse glow burst
  if (mouse.x !== null) {
    const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
    grad.addColorStop(0, "rgba(108,99,255,0.08)");
    grad.addColorStop(1, "rgba(108,99,255,0)");
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();

// Click burst effect
canvas.style.pointerEvents = "none";
window.addEventListener("click", (e) => {
  for (let i = 0; i < 8; i++) {
    const burst = {
      x: e.clientX,
      y: e.clientY,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      alpha: 0.8,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    particlesArr.push(burst);
    setTimeout(() => particlesArr.splice(particlesArr.indexOf(burst), 1), 1500);
  }
});

// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".skill-logo-item, .project-card, .cert-card, .stat, .contact-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeObserver.observe(el);
});
