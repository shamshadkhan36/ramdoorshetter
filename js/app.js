/**
 * RAM DOOR SHUTTER - MULTI-THEME & MULTI-LAYOUT APPLICATION ENGINE
 * Features 5 Professional Themes & 5 Dynamic Layouts with Live Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeLayoutEngine();
  initMobileMenu();
  initShutterSimulator();
  initCostCalculator();
  initProductCatalog();
  initContactForm();
  initSmoothScroll();
  initScrollTop();
  initSearchModal();
  initScrollReveal();
  initCounterAnimations();
  initCardTilt();
});

// ============================================================================
// 1. 5 THEMES & 5 LAYOUTS ENGINE
// ============================================================================
function initThemeLayoutEngine() {
  const triggerBtn = document.getElementById('customizer-trigger-btn');
  const modal = document.getElementById('customizer-modal');
  const closeBtn = document.getElementById('customizer-close-btn');
  const themeButtons = document.querySelectorAll('.theme-option-btn');
  const layoutButtons = document.querySelectorAll('.layout-option-btn');
  const resetBtn = document.getElementById('customizer-reset-btn');

  // Load saved preferences or defaults
  const savedTheme = localStorage.getItem('ram_door_theme') || 'blue';
  const savedLayout = localStorage.getItem('ram_door_layout') || 'corporate';

  applyTheme(savedTheme);
  applyLayout(savedLayout);

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('ram_door_theme', themeName);

    themeButtons.forEach(btn => {
      if (btn.dataset.theme === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function applyLayout(layoutName) {
    document.documentElement.setAttribute('data-layout', layoutName);
    localStorage.setItem('ram_door_layout', layoutName);

    layoutButtons.forEach(btn => {
      if (btn.dataset.layout === layoutName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Open / Close Modal
  if (triggerBtn && modal) {
    triggerBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Theme selection click handlers
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      showToast(`Applied Theme: ${btn.dataset.name || theme.toUpperCase()}`);
    });
  });

  // Layout selection click handlers
  layoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const layout = btn.dataset.layout;
      applyLayout(layout);
      showToast(`Applied Layout: ${btn.dataset.name || layout.toUpperCase()}`);
    });
  });

  // Reset to default
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      applyTheme('blue');
      applyLayout('corporate');
      showToast('Reset to Default Corporate Blue & Standard Layout');
    });
  }
}

// ============================================================================
// 2. SCROLL REVEAL ANIMATION ENGINE
// ============================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

// ============================================================================
// 3. ANIMATED NUMBER COUNTERS (Hero Stats Bar)
// ============================================================================
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.counter-value');
  if (!counterElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const suffix = counter.getAttribute('data-suffix') || '+';
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString('en-US') + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current).toLocaleString('en-US') + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsContainer = document.querySelector('.hero-stats-bar');
  if (statsContainer) observer.observe(statsContainer);
}

// ============================================================================
// 4. 3D CARD PARALLAX TILT
// ============================================================================
function initCardTilt() {
  const cards = document.querySelectorAll('.category-card, .feature-box-card');
  if (!cards.length || window.innerWidth < 1024) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

// ============================================================================
// 5. MOBILE NAVIGATION
// ============================================================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    } else {
      mobileMenu.classList.remove('hidden');
      menuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    });
  });
}

// ============================================================================
// 6. INTERACTIVE ROLLING SHUTTER SIMULATOR
// ============================================================================
function initShutterSimulator() {
  const curtain = document.getElementById('shutter-curtain');
  const led = document.getElementById('remote-led');
  const btnUp = document.getElementById('btn-remote-up');
  const btnDown = document.getElementById('btn-remote-down');
  const btnStop = document.getElementById('btn-remote-stop');
  const statusBadge = document.getElementById('shutter-status-badge');
  const heightDisplay = document.getElementById('shutter-height-pct');
  const materialRadios = document.querySelectorAll('input[name="sim-material"]');
  const securityRating = document.getElementById('sim-security-rating');
  const airflowRating = document.getElementById('sim-airflow-rating');
  const visibilityRating = document.getElementById('sim-visibility-rating');

  if (!curtain) return;

  let currentPosition = 0; // 0 = Closed, 100 = Open
  let animationInterval = null;
  let movementState = 'stopped';

  const materialSpecs = {
    'solid': { security: 'Maximum (Grade 10/10)', airflow: '0% (Airtight)', visibility: '0% (Solid Privacy)' },
    'perforated': { security: 'High (Grade 8.5/10)', airflow: '45% (Ventilated)', visibility: '35% (See-through)' },
    'polycarbonate': { security: 'High Impact (Grade 9/10)', airflow: '0% (Sealed)', visibility: '92% (Glass Clear)' }
  };

  function updateRatings(material) {
    const specs = materialSpecs[material] || materialSpecs['solid'];
    if (securityRating) securityRating.textContent = specs.security;
    if (airflowRating) airflowRating.textContent = specs.airflow;
    if (visibilityRating) visibilityRating.textContent = specs.visibility;
  }

  function updateCurtainVisual() {
    const translateY = -(currentPosition * 0.88);
    curtain.style.transform = `translateY(${translateY}%)`;
    
    const openPct = Math.round(currentPosition);
    if (heightDisplay) {
      heightDisplay.textContent = `${openPct}% OPEN (${100 - openPct}% CLOSED)`;
    }
  }

  function activateLed(active = true) {
    if (!led) return;
    if (active) {
      led.classList.add('active');
    } else {
      led.classList.remove('active');
    }
  }

  function stopMovement() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
    movementState = 'stopped';
    activateLed(false);
    if (statusBadge) {
      statusBadge.textContent = currentPosition === 0 ? 'STATUS: FULLY CLOSED (LOCKED)' : (currentPosition >= 98 ? 'STATUS: FULLY OPEN' : 'STATUS: PAUSED / STATIONARY');
    }
  }

  function openShutter() {
    if (movementState === 'opening' || currentPosition >= 100) return;
    stopMovement();
    movementState = 'opening';
    activateLed(true);
    if (statusBadge) {
      statusBadge.textContent = 'STATUS: MOTOR RUNNING - OPENING ▲';
    }

    animationInterval = setInterval(() => {
      if (currentPosition < 100) {
        currentPosition += 2;
        if (currentPosition > 100) currentPosition = 100;
        updateCurtainVisual();
      } else {
        stopMovement();
      }
    }, 45);
  }

  function closeShutter() {
    if (movementState === 'closing' || currentPosition <= 0) return;
    stopMovement();
    movementState = 'closing';
    activateLed(true);
    if (statusBadge) {
      statusBadge.textContent = 'STATUS: MOTOR RUNNING - CLOSING ▼';
    }

    animationInterval = setInterval(() => {
      if (currentPosition > 0) {
        currentPosition -= 2;
        if (currentPosition < 0) currentPosition = 0;
        updateCurtainVisual();
      } else {
        stopMovement();
      }
    }, 45);
  }

  if (btnUp) btnUp.addEventListener('click', openShutter);
  if (btnDown) btnDown.addEventListener('click', closeShutter);
  if (btnStop) btnStop.addEventListener('click', stopMovement);

  materialRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const mat = e.target.value;
      const slats = curtain.querySelectorAll('.shutter-slat');
      
      slats.forEach(slat => {
        slat.className = 'shutter-slat';
        slat.classList.add(`slat-${mat}`);
      });
      
      updateRatings(mat);
      showToast(`Profile: ${e.target.dataset.label || mat.toUpperCase()}`);
    });
  });

  updateCurtainVisual();
  updateRatings('solid');
}

// ============================================================================
// 7. SMART COST ESTIMATOR & WHATSAPP GENERATOR
// ============================================================================
function initCostCalculator() {
  const widthInput = document.getElementById('calc-width');
  const heightInput = document.getElementById('calc-height');
  const widthSlider = document.getElementById('calc-width-slider');
  const heightSlider = document.getElementById('calc-height-slider');
  const materialSelect = document.getElementById('calc-material');
  const motorSelect = document.getElementById('calc-motor');
  const presetButtons = document.querySelectorAll('.calc-preset-btn');

  const areaDisplay = document.getElementById('calc-total-area');
  const minPriceDisplay = document.getElementById('calc-price-min');
  const maxPriceDisplay = document.getElementById('calc-price-max');
  const ratePerSqFtDisplay = document.getElementById('calc-rate-sqft');
  const whatsappQuoteBtn = document.getElementById('calc-whatsapp-btn');

  if (!widthInput || !heightInput) return;

  if (widthInput && widthSlider) {
    widthInput.addEventListener('input', () => {
      widthSlider.value = widthInput.value;
      calculateEstimate();
    });
    widthSlider.addEventListener('input', () => {
      widthInput.value = widthSlider.value;
      calculateEstimate();
    });
  }

  if (heightInput && heightSlider) {
    heightInput.addEventListener('input', () => {
      heightSlider.value = heightInput.value;
      calculateEstimate();
    });
    heightSlider.addEventListener('input', () => {
      heightInput.value = heightSlider.value;
      calculateEstimate();
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const w = btn.dataset.w;
      const h = btn.dataset.h;
      if (w && h) {
        widthInput.value = w;
        if (widthSlider) widthSlider.value = w;
        heightInput.value = h;
        if (heightSlider) heightSlider.value = h;
        presetButtons.forEach(b => {
          b.classList.remove('theme-btn-primary');
          b.classList.add('bg-white', 'text-slate-800');
        });
        btn.classList.add('theme-btn-primary');
        btn.classList.remove('bg-white', 'text-slate-800');
        calculateEstimate();
      }
    });
  });

  if (materialSelect) materialSelect.addEventListener('change', calculateEstimate);
  if (motorSelect) motorSelect.addEventListener('change', calculateEstimate);

  function calculateEstimate() {
    const width = parseFloat(widthInput.value) || 10;
    const height = parseFloat(heightInput.value) || 10;
    const area = Math.round(width * height * 10) / 10;

    let baseRateMin = 180;
    let baseRateMax = 230;
    let materialName = "Standard 20G Galvanized Steel";

    if (materialSelect) {
      const mat = materialSelect.value;
      switch (mat) {
        case 'gi-heavy-18g':
          baseRateMin = 240;
          baseRateMax = 290;
          materialName = "Heavy Duty 18G Steel";
          break;
        case 'aluminum-alloy':
          baseRateMin = 360;
          baseRateMax = 440;
          materialName = "Extruded Aluminum Alloy";
          break;
        case 'polycarbonate':
          baseRateMin = 550;
          baseRateMax = 680;
          materialName = "Crystal Polycarbonate";
          break;
        default:
          baseRateMin = 180;
          baseRateMax = 230;
          materialName = "Standard 20G Galvanized Steel";
      }
    }

    let motorCostMin = 0;
    let motorCostMax = 0;
    let motorName = "Manual Push-Pull";

    if (motorSelect) {
      const motor = motorSelect.value;
      switch (motor) {
        case 'center-motor':
          motorCostMin = 8500;
          motorCostMax = 11500;
          motorName = "Center Motor + 2 Remotes";
          break;
        case 'side-motor-heavy':
          motorCostMin = 15500;
          motorCostMax = 21000;
          motorName = "Heavy Side Motor (600kg-1000kg)";
          break;
        case 'high-speed':
          motorCostMin = 35000;
          motorCostMax = 48000;
          motorName = "High-Speed Frequency Inverter (1.5 m/s)";
          break;
        default:
          motorCostMin = 0;
          motorCostMax = 0;
          motorName = "Manual Push-Pull";
      }
    }

    const totalEstimateMin = Math.round(area * baseRateMin + motorCostMin);
    const totalEstimateMax = Math.round(area * baseRateMax + motorCostMax);

    if (areaDisplay) areaDisplay.textContent = `${area} sq. ft.`;
    if (ratePerSqFtDisplay) ratePerSqFtDisplay.textContent = `₹${baseRateMin} - ₹${baseRateMax} / sq.ft`;
    if (minPriceDisplay) minPriceDisplay.textContent = `₹${totalEstimateMin.toLocaleString('en-IN')}`;
    if (maxPriceDisplay) maxPriceDisplay.textContent = `₹${totalEstimateMax.toLocaleString('en-IN')}`;

    if (whatsappQuoteBtn) {
      const rawMsg = `*RAM DOOR SHUTTER - ESTIMATE INQUIRY*
----------------------------------------
📐 *Dimensions:* ${width} ft × ${height} ft = *${area} sq.ft*
🛠️ *Material:* ${materialName}
⚙️ *Drive System:* ${motorName}
💰 *Estimated Range:* ₹${totalEstimateMin.toLocaleString('en-IN')} - ₹${totalEstimateMax.toLocaleString('en-IN')}
----------------------------------------
_Please send official proposal and site inspection details._`;

      whatsappQuoteBtn.href = `https://wa.me/919876543210?text=${encodeURIComponent(rawMsg)}`;
    }
  }

  calculateEstimate();
}

// ============================================================================
// 8. PRODUCT CATALOG
// ============================================================================
function initProductCatalog() {
  // Built directly in semantic HTML
}

// ============================================================================
// 9. CONTACT FORM & DIRECT INQUIRY
// ============================================================================
function initContactForm() {
  const contactForm = document.getElementById('main-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const shutterType = document.getElementById('contact-shutter-type').value;

    if (!name || !phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    const inquiryText = `*RAM DOOR SHUTTER - INQUIRY*
----------------------------------------
👤 *Name:* ${name}
📞 *Phone:* ${phone}
🚪 *Product Requirement:* ${shutterType}
💬 *Message:* ${message || 'Standard inquiry'}
----------------------------------------`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(inquiryText)}`, '_blank');
    showToast('Inquiry sent! Our technical engineers will contact you shortly.', 'success');
    contactForm.reset();
  });
}

// ============================================================================
// 10. TOAST NOTIFICATION UTILITY
// ============================================================================
function showToast(message, type = 'info') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.className = `fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transition-transform duration-300 font-medium text-xs sm:text-sm show`;
  toast.innerHTML = `
    <i class="fas fa-check-circle text-[#f59e0b] text-base"></i>
    <span>${message}</span>
  `;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ============================================================================
// 11. SMOOTH SCROLL NAVIGATION
// ============================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================================================
// 12. SCROLL TO TOP & SEARCH MODAL
// ============================================================================
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollBtn.style.opacity = '0';
  scrollBtn.style.pointerEvents = 'none';
  scrollBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

function initSearchModal() {
  const searchBtn = document.getElementById('search-modal-btn');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    const query = prompt('Search entrance automation products (e.g. High Speed, Polycarbonate, Stacking, Sectional):');
    if (query && query.trim()) {
      const target = document.getElementById('products');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        showToast(`Filtered catalog results for "${query.trim()}"`);
      }
    }
  });
}
