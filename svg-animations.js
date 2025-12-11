// ===========================
// SVG ANIMATIONS SCRIPT
// ===========================

// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
  const loadingContainer = document.getElementById('loadingContainer');
  
  // Hide loading screen after page loads
  setTimeout(() => {
    loadingContainer.classList.add('hidden');
  }, 2000);
});

// ===========================
// SCROLL-TRIGGERED SVG ANIMATIONS
// ===========================
function observeSVGElements() {
  const svgElements = document.querySelectorAll('.svg-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger specific animations based on element type
        if (entry.target.classList.contains('card')) {
          animateCardSVG(entry.target);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  svgElements.forEach(element => {
    observer.observe(element);
  });
}

// ===========================
// CARD SVG ANIMATIONS
// ===========================
function animateCardSVG(card) {
  const svgDecoration = card.querySelector('.card-svg-decoration');
  if (svgDecoration) {
    svgDecoration.style.animation = 'pulse 2s ease-in-out infinite';
  }
}

// ===========================
// INTERACTIVE SVG ELEMENTS
// ===========================
document.querySelectorAll('.interactive-svg').forEach(svg => {
  svg.addEventListener('mouseenter', function() {
    this.style.filter = 'brightness(1.3) saturate(1.5) drop-shadow(0 4px 8px rgba(230, 161, 0, 0.5))';
  });
  
  svg.addEventListener('mouseleave', function() {
    this.style.filter = 'brightness(1) saturate(1) drop-shadow(0 0 0 rgba(230, 161, 0, 0))';
  });
  
  svg.addEventListener('click', function() {
    // Create ripple effect
    const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ripple.setAttribute('cx', '15');
    ripple.setAttribute('cy', '15');
    ripple.setAttribute('r', '0');
    ripple.setAttribute('fill', 'rgba(230, 161, 0, 0.5)');
    
    this.appendChild(ripple);
    
    // Animate ripple
    ripple.animate([
      { r: '0', opacity: 1 },
      { r: '30', opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out'
    }).onfinish = () => ripple.remove();
  });
});

// ===========================
// NAVIGATION SVG ICONS
// ===========================
document.querySelectorAll('.nav-links a').forEach(link => {
  const svgIcon = link.querySelector('.nav-svg-icon');
  if (svgIcon) {
    link.addEventListener('mouseenter', function() {
      svgIcon.style.animation = 'bounce 0.5s ease';
    });
    
    link.addEventListener('animationend', function(e) {
      if (e.target === svgIcon) {
        svgIcon.style.animation = '';
      }
    });
  }
});

// ===========================
// HERO SVG ANIMATION
// ===========================
function animateHeroSVG() {
  const heroSVG = document.querySelector('.reog-mascot');
  if (heroSVG) {
    // Add subtle floating animation
    let startTime = null;
    function floatAnimation(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 6000; // 6 second cycle
      
      const y = Math.sin(progress * Math.PI * 2) * 20;
      const rotation = Math.sin(progress * Math.PI * 2) * 5;
      
      heroSVG.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
      
      requestAnimationFrame(floatAnimation);
    }
    
    requestAnimationFrame(floatAnimation);
  }
}

// ===========================
// FLOATING PARTICLES ANIMATION
// ===========================
function animateFloatingParticles() {
  const particles = document.querySelectorAll('.floating-svg');
  
  particles.forEach((particle, index) => {
    const speed = 15 + (index * 5); // Different speeds for each particle
    const amplitude = 30 + (index * 10);
    
    let startTime = null;
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (speed * 1000);
      
      const x = Math.sin(progress * Math.PI * 2) * amplitude;
      const y = Math.cos(progress * Math.PI * 2) * amplitude;
      const rotation = (progress * 360) % 360;
      
      particle.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      
      requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
  });
}

// ===========================
// SECTION DIVIDER ANIMATION
// ===========================
function animateSectionDividers() {
  const dividers = document.querySelectorAll('.section-divider path');
  
  dividers.forEach(divider => {
    const length = divider.getTotalLength();
    divider.style.strokeDasharray = length;
    divider.style.strokeDashoffset = length;
    
    // Animate stroke drawing
    setTimeout(() => {
      divider.animate([
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ], {
        duration: 3000,
        fill: 'forwards',
        easing: 'ease-in-out'
      });
    }, 500);
  });
}

// ===========================
// CONTACT FORM SVG ENHANCEMENT
// ===========================
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show success animation
  const button = this.querySelector('button[type="submit"]');
  const originalContent = button.innerHTML;
  
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
    Terkirim!
  `;
  
  button.style.background = '#28a745';
  
  // Reset form after 3 seconds
  setTimeout(() => {
    this.reset();
    button.innerHTML = originalContent;
    button.style.background = '';
  }, 3000);
});

// ===========================
// CUSTOM CSS ANIMATIONS
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.1) rotate(10deg); opacity: 0.6; }
  }
`;
document.head.appendChild(style);

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  observeSVGElements();
  animateHeroSVG();
  animateFloatingParticles();
  animateSectionDividers();
  // Fallback: ensure svg-reveal elements become visible if intersection observer
  // fails to add the `revealed` class (some browsers / timing issues).
  setTimeout(() => {
    document.querySelectorAll('.svg-reveal:not(.revealed)').forEach(el => {
      el.classList.add('revealed');
    });
  }, 1000);

  // Temporary visual debug for #sejarah: highlight its bounding box for 10s
  const sejarahEl = document.getElementById('sejarah');
  if (sejarahEl) {
    const origOutline = sejarahEl.style.outline;
    const origBackground = sejarahEl.style.background;
    sejarahEl.style.outline = '3px solid rgba(255,0,0,0.9)';
    sejarahEl.style.background = 'rgba(255,0,0,0.03)';
    setTimeout(() => {
      sejarahEl.style.outline = origOutline || '';
      sejarahEl.style.background = origBackground || '';
    }, 10000); // remove after 10s
  }
});

// ===========================
// PARALLAX SVG EFFECT
// ===========================
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.svg-hero-container, .floating-svg');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===========================
// RESPONSIVE SVG ADJUSTMENTS
// ===========================
function adjustSVGForMobile() {
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.floating-svg').forEach(svg => {
      svg.style.transform = 'scale(0.7)';
    });
    
    document.querySelectorAll('.reog-mascot').forEach(svg => {
      svg.style.width = '200px';
      svg.style.height = '200px';
    });
  }
}

window.addEventListener('resize', adjustSVGForMobile);
adjustSVGForMobile();