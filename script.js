// Theme toggle (persisted)
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

// Mobile menu
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Scroll reveal
const revealEls = document.querySelectorAll(
  ".section__title, .about, .skill-card, .timeline__item, .project, .hero__text, .hero__card, .contact__intro, .contact__form"
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
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Contact form (demo validation, no backend)
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message) {
    status.textContent = "Merci de remplir tous les champs.";
    status.className = "contact__status err";
    return;
  }
  if (!emailOk) {
    status.textContent = "Adresse email invalide.";
    status.className = "contact__status err";
    return;
  }
  status.textContent = `Merci ${name} ! Votre message a bien été envoyé (démo).`;
  status.className = "contact__status ok";
  form.reset();
});

// Footer year
const yearEl = document.querySelector(".footer p");
