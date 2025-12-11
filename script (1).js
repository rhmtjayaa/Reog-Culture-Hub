// =========================
// DARK MODE TOGGLE
// =========================
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Ganti icon
  darkBtn.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";

  // Simpan preferensi
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Load preferensi dark mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkBtn.textContent = "☀️";
}



// =========================
// MOBILE MENU TOGGLE
// =========================
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});



// =========================
// SMOOTH SCROLL
// =========================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });

    navbar.classList.remove("active"); // tutup menu setelah klik
  });
});



// =========================
// AUTO SLIDER (GALERI)
// + Pause on Hover
// =========================
const slider = document.querySelector(".slides");
let slideInterval;

function startSlider() {
  slideInterval = setInterval(() => {
    slider.style.animation = "slide 12s infinite";
  }, 10);
}

function stopSlider() {
  slider.style.animation = "none";
}

slider.addEventListener("mouseover", stopSlider);
slider.addEventListener("mouseout", startSlider);

startSlider();



// =========================
// SCROLL REVEAL ANIMATION
// =========================
// elemen yang akan dianimasikan
const elements = document.querySelectorAll(".fade-in, .slide-up, .zoom-in");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Tambahan efek animasi saat aktif
// (CSS harus punya kelas .active pada animasi)

// Pastikan video autoplay lancar di mobile/tablet
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".bg-video");
  if (video) {
    video.play().catch(() => {
      video.muted = true;
      video.play();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".bg-video");
  if (video) {
    video.play().catch(() => {
      video.muted = true;
      video.play();
    });
  }
});

// =========================
// HEADER INTERACTIVE TOGGLE
// =========================
const header = document.querySelector(".header");

header.addEventListener("click", () => {
  if (header.classList.contains("red")) {
    header.classList.remove("red");
    header.classList.add("black");
  } else if (header.classList.contains("black")) {
    header.classList.remove("black");
    header.classList.add("red");
  } else {
    header.classList.add("red");
  }
});
