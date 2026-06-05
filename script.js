// === TYPING EFFECT ===
const roles = [
  "Spécialiste IT polyvalent",
  "Technicien Systèmes & Réseaux",
  "Développeur Web",
  "Chargé de Communication Digitale",
  "Expert en Digitalisation (ICT4D)"
];
const typingEl = document.getElementById("typingText");
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 70);
  } else {
    typingEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

// === THEME TOGGLE (persisted) ===
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) {
  root.setAttribute("data-theme", saved);
  themeToggle.textContent = saved === "light" ? "☀️" : "🌙";
}
themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  themeToggle.textContent = next === "light" ? "☀️" : "🌙";
  localStorage.setItem("theme", next);
});

// === MOBILE MENU ===
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll(
  ".section__title, .about, .skill-card, .timeline__item, .project, .hero__text, .hero__photo, .contact__intro, .contact__form, .contact__info, .certs li, .two-col"
);
revealEls.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach((el) => io.observe(el));

// === ACTIVE NAV ON SCROLL ===
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav__links a");
function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach((a) => {
        a.style.color = "";
        if (a.getAttribute("href") === `#${id}`) {
          a.style.color = "var(--accent)";
        }
      });
    }
  });
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// === COUNTER ANIMATION ===
const counters = document.querySelectorAll(".about__num");
let counterDone = false;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !counterDone) {
      counterDone = true;
      counters.forEach((el) => {
        const text = el.textContent.trim();
        const num = parseInt(text);
        if (isNaN(num)) return;
        const suffix = text.replace(String(num), "");
        let current = 0;
        const step = Math.max(1, Math.floor(num / 30));
        const timer = setInterval(() => {
          current += step;
          if (current >= num) { current = num; clearInterval(timer); }
          el.textContent = current + suffix;
        }, 30);
      });
    }
  });
}, { threshold: 0.3 });
if (counters.length) counterObserver.observe(counters[0].closest("ul"));

// === SMOOTH SCROLL FOR ANCHORS ===
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
