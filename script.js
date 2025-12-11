// =========================
// ENHANCED INTERACTIVE BACKGROUND
// =========================
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
  const ctx = particleCanvas.getContext('2d');
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;

  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = Math.random() > 0.5 ? '#FFD700' : '#b30000';
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        this.x -= (dx / distance) * force * 2;
        this.y -= (dy / distance) * force * 2;
      }

      // Wrap around edges
      if (this.x > particleCanvas.width) this.x = 0;
      if (this.x < 0) this.x = particleCanvas.width;
      if (this.y > particleCanvas.height) this.y = 0;
      if (this.y < 0) this.y = particleCanvas.height;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    const particleCount = Math.min(50, window.innerWidth / 20);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    ctx.strokeStyle = '#FFD700';
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  }

  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    const rect = particleCanvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // Initialize
  resizeCanvas();
  initParticles();
  animateParticles();
}

// =========================
// ENHANCED LOADING SCREEN
// =========================
window.addEventListener('load', () => {
  const loadingContainer = document.getElementById('loadingContainer');
  if (loadingContainer) {
    setTimeout(() => {
      loadingContainer.style.opacity = '0';
      loadingContainer.style.transform = 'scale(0.8)';
      setTimeout(() => {
        loadingContainer.style.display = 'none';
      }, 500);
    }, 2000);
  }
});

// =========================
// DARK MODE TOGGLE ENHANCED
// =========================
const darkBtn = document.getElementById('darkModeBtn');

darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Enhanced icon switching with animation
  if (document.body.classList.contains('dark')) {
    darkBtn.innerHTML = '☀️';
    darkBtn.style.transform = 'rotate(180deg)';
  } else {
    darkBtn.innerHTML = '🌙';
    darkBtn.style.transform = 'rotate(0deg)';
  }

  // Save preference
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  
  // Trigger particle color change
  if (particles && particles.length > 0) {
    particles.forEach(particle => {
      particle.color = document.body.classList.contains('dark') 
        ? '#FFD700' 
        : Math.random() > 0.5 ? '#FFD700' : '#b30000';
    });
  }
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkBtn.innerHTML = '☀️';
  darkBtn.style.transform = 'rotate(180deg)';
}

// =========================
// MOBILE MENU TOGGLE ENHANCED
// =========================
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
  
  // Animate hamburger menu
  if (navbar.classList.contains('active')) {
    menuToggle.innerHTML = '✕';
    menuToggle.style.transform = 'rotate(180deg)';
  } else {
    menuToggle.innerHTML = '☰';
    menuToggle.style.transform = 'rotate(0deg)';
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navbar.classList.contains('active')) {
    navbar.classList.remove('active');
    menuToggle.innerHTML = '☰';
    menuToggle.style.transform = 'rotate(0deg)';
  }
});

// =========================
// SMOOTH SCROLL ENHANCED
// =========================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });

      // Close mobile menu
      navbar.classList.remove('active');
      menuToggle.innerHTML = '☰';
      menuToggle.style.transform = 'rotate(0deg)';
      
      // Highlight the section briefly
      target.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.5)';
      setTimeout(() => {
        target.style.boxShadow = '';
      }, 1000);
    }
  });
});

// =========================
// ENHANCED SCROLL REVEAL ANIMATION
// =========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Add shimmer effect to cards
      if (entry.target.classList.contains('card') || 
          entry.target.classList.contains('ticket-card') ||
          entry.target.classList.contains('sanggar-card')) {
        entry.target.style.animation = 'cardShimmer 0.6s ease-out';
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-up, .zoom-in, .card, .ticket-card, .sanggar-card'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });
});

// =========================
// TICKET BOOKING FUNCTIONALITY
// =========================
let selectedTicketType = '';
let ticketPrices = {
  'regular': 75000,
  'vip': 150000,
  'vvip': 250000
};

function scrollToTickets() {
  const ticketSection = document.getElementById('tiket');
  if (ticketSection) {
    ticketSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Highlight section
    ticketSection.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 255, 255, 0.95))';
    setTimeout(() => {
      ticketSection.style.background = '';
    }, 1500);
  }
}

function openBookingModal(ticketType) {
  selectedTicketType = ticketType;
  const modal = document.getElementById('bookingModal');
  const ticketTypeInput = document.getElementById('ticketType');
  
  if (modal && ticketTypeInput) {
    modal.style.display = 'block';
    ticketTypeInput.value = ticketType.toUpperCase();
    updateTotalPrice();
    
    // Animate modal appearance
    setTimeout(() => {
      modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 100);
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}

function updateTotalPrice() {
  const ticketCount = parseInt(document.getElementById('tickets').value) || 1;
  const price = ticketPrices[selectedTicketType] || 0;
  const total = ticketCount * price;
  const totalPriceElement = document.getElementById('totalPrice');
  
  if (totalPriceElement) {
    totalPriceElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    // Add animation to price change
    totalPriceElement.style.animation = 'pulse 0.3s ease';
    setTimeout(() => {
      totalPriceElement.style.animation = '';
    }, 300);
  }
}

// Event listeners for ticket booking
document.getElementById('tickets')?.addEventListener('change', updateTotalPrice);

document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const bookingData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    date: formData.get('date'),
    tickets: formData.get('tickets'),
    ticketType: formData.get('ticketType'),
    totalPrice: document.getElementById('totalPrice').textContent
  };
  
  // Simulate booking process
  const submitBtn = e.target.querySelector('.submit-booking-btn');
  submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg> Memproses...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert(`🎉 Pemesanan Berhasil!\n\nTerima kasih ${bookingData.name}!\n\nDetail Pemesanan:\nTipe: ${bookingData.ticketType}\nJumlah: ${bookingData.tickets} tiket\nTanggal: ${bookingData.date}\nTotal: ${bookingData.totalPrice}\n\nKonfirmasi telah dikirim ke ${bookingData.email}`);
    
    closeBookingModal();
    e.target.reset();
    submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Konfirmasi Pemesanan';
    submitBtn.disabled = false;
  }, 2000);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('bookingModal');
  if (e.target === modal) {
    closeBookingModal();
  }
});

// =========================
// GOOGLE MAPS FUNCTIONALITY
// =========================
let map;
let marker;

function initMap() {
  // Ponorogo coordinates (example)
  const ponorogoLocation = { lat: -7.8654, lng: 111.4599 };
  
  map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 15,
    center: ponorogoLocation,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#FFD700"}]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#b30000"}]
      }
    ]
  });
  
  marker = new google.maps.Marker({
    position: ponorogoLocation,
    map: map,
    title: 'Gedung Kesenian Reog Ponorogo',
    animation: google.maps.Animation.BOUNCE
  });
  
  // Custom info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px;">
        <h3 style="color: #b30000; margin: 0 0 10px 0;">🏛️ Gedung Kesenian Reog Ponorogo</h3>
        <p style="margin: 5px 0;">📍 Jl. Sudirman No. 123, Ponorogo</p>
        <p style="margin: 5px 0;">📞 (0352) 123-456</p>
        <p style="margin: 5px 0;">🎭 Pertunjukan: Sabtu & Minggu, 19.00 WIB</p>
      </div>
    `
  });
  
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
  
  // Auto-open info window
  setTimeout(() => {
    infoWindow.open(map, marker);
  }, 1000);
}

function getDirections() {
  const destination = 'Gedung Kesenian Reog Ponorogo, Jl. Sudirman No. 123, Ponorogo, Jawa Timur';
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  window.open(url, '_blank');
}

function shareLocation() {
  const locationData = {
    title: 'Gedung Kesenian Reog Ponorogo',
    text: 'Mari menonton pertunjukan Reog yang memukau!',
    url: window.location.href + '#lokasi'
  };
  
  if (navigator.share) {
    navigator.share(locationData);
  } else {
    // Fallback - copy to clipboard
    const text = `${locationData.title}\n${locationData.text}\n${locationData.url}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('📍 Informasi lokasi telah disalin ke clipboard!');
    });
  }
}

// =========================
// VIDEO AUTOPLAY ENHANCED
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.bg-video');
  if (video) {
    // Enhanced video loading
    video.load();
    
    const playVideo = () => {
      video.play().catch(error => {
        console.log('Autoplay prevented, trying muted:', error);
        video.muted = true;
        video.play().catch(mutedError => {
          console.log('Even muted autoplay failed:', mutedError);
          // Add play button overlay
          const playButton = document.createElement('div');
          playButton.innerHTML = '▶️';
          playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 60px;
            cursor: pointer;
            z-index: 10;
            background: rgba(255, 215, 0, 0.8);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
          `;
          playButton.onclick = () => {
            video.play();
            playButton.remove();
          };
          video.parentElement.appendChild(playButton);
        });
      });
    };
    
    playVideo();
    
    // Try to play again when video metadata is loaded
    video.addEventListener('loadedmetadata', playVideo);
  }
});



// =========================
// ENHANCED GALLERY INTERACTIONS
// =========================
document.querySelectorAll('.gallery-grid > div').forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    if (img) {
      // Create lightbox effect
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        cursor: pointer;
      `;
      
      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(255, 215, 0, 0.5);
      `;
      
      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(lightbox);
        }, 300);
      });
    }
  });
});

// =========================
// AUTO SLIDER (GALERI) ENHANCED
// =========================
const slider = document.querySelector('.slides');
if (slider) {
  let slideInterval;
  
  function startSlider() {
    slideInterval = setInterval(() => {
      slider.style.animation = 'slide 12s infinite';
    }, 10);
  }
  
  function stopSlider() {
    slider.style.animation = 'none';
  }
  
  slider.addEventListener('mouseover', stopSlider);
  slider.addEventListener('mouseout', startSlider);
  
  startSlider();
}

// =========================
// PERFORMANCE OPTIMIZATION
// =========================
// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handling
const optimizedScroll = debounce(() => {
  // Parallax effects removed to keep video fixed in place
  // No parallax elements currently active
}, 10);

window.addEventListener('scroll', optimizedScroll);

// =========================
// ADDITIONAL ENHANCEMENTS
// =========================
// Add floating animation to cultural motifs
document.querySelectorAll('.cultural-motif').forEach((motif, index) => {
  motif.style.animationDelay = `${index * 2}s`;
});

// Add hover sound effects (visual feedback)
document.querySelectorAll('button, .nav-links a').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Form validation enhancements
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const inputs = this.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#ff0000';
        input.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
          input.style.borderColor = '';
          input.style.animation = '';
        }, 1000);
      }
    });
    
    if (!isValid) {
      e.preventDefault();
      alert('Silakan lengkapi semua field yang wajib diisi!');
    }
  });
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  @keyframes cardShimmer {
    0% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.4); }
    50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.6); }
    100% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.4); }
  }
`;
document.head.appendChild(style);

// NAV ANCHOR OFFSET FIX (for sticky navbar)
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  const navHeight = nav ? nav.offsetHeight : 80;

  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});

// TIMELINE MODAL BEHAVIOR
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openTimelineBtn');
  const modal = document.getElementById('timelineModal');
  const closeBtn = document.getElementById('closeTimeline');
  const steps = Array.from(document.querySelectorAll('.timeline-step'));
  const container = document.querySelector('.timeline-steps');
  const thumbs = Array.from(document.querySelectorAll('.tl-thumb'));
  const prevBtn = document.getElementById('tlPrev');
  const nextBtn = document.getElementById('tlNext');
  let current = 0;

  function showStep(index) {
    current = (index + steps.length) % steps.length;
    // move the container: each step is 100% width
    if (container) {
      container.style.transform = `translateX(-${current * 100}%)`;
    }

    // active state for steps (optional visual emphasis)
    steps.forEach((s, i) => s.classList.toggle('active', i === current));
    // update thumbnails active state
    thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
  }

  openBtn?.addEventListener('click', () => {
    modal.classList.add('visible');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    showStep(0);
  });

  function closeModal() {
    modal.classList.remove('visible');
    modal.style.display = '';
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  prevBtn?.addEventListener('click', () => showStep(current - 1));
  nextBtn?.addEventListener('click', () => showStep(current + 1));

  thumbs.forEach(t => t.addEventListener('click', () => showStep(parseInt(t.dataset.step, 10))));

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal || modal.style.display !== 'block') return;
    if (e.key === 'ArrowLeft') showStep(current - 1);
    if (e.key === 'ArrowRight') showStep(current + 1);
    if (e.key === 'Escape') closeModal();
  });
});