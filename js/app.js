/**
 * RAM DOOR SHUTTER - INTERACTIVE JAVASCRIPT APPLICATION
 * Clean White & Premium Industrial Theme
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initShutterSimulator();
  initCostCalculator();
  initProductCatalog();
  initEmergencyRepair();
  initContactForm();
  initSmoothScroll();
});

// ============================================================================
// 1. MOBILE NAVIGATION
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
// 2. INTERACTIVE ROLLING SHUTTER SIMULATOR
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
  const colorSwatches = document.querySelectorAll('.color-swatch-btn');
  const securityRating = document.getElementById('sim-security-rating');
  const airflowRating = document.getElementById('sim-airflow-rating');
  const visibilityRating = document.getElementById('sim-visibility-rating');

  if (!curtain) return;

  let currentPosition = 0; // 0 = Closed (100% covered), 100 = Fully Open (0% covered)
  let animationInterval = null;
  let movementState = 'stopped'; // 'opening', 'closing', 'stopped'

  const materialSpecs = {
    'solid': { security: 'Maximum (Grade 10/10)', airflow: '0% (Airtight)', visibility: '0% (Solid Privacy)' },
    'perforated': { security: 'High (Grade 8.5/10)', airflow: '45% (Ventilated)', visibility: '35% (See-through)' },
    'polycarbonate': { security: 'High Impact (Grade 9/10)', airflow: '0% (Sealed)', visibility: '92% (Glass Clear)' },
    'grill': { security: 'Medium-High (Grade 8/10)', airflow: '80% (Maximum Air)', visibility: '85% (Open View)' },
    'insulated': { security: 'Maximum (Grade 10/10)', airflow: 'Thermal Barrier', visibility: '0% (Acoustic Foam)' }
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
      statusBadge.className = 'px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase ' + (currentPosition === 0 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700 border border-slate-200');
    }
  }

  function openShutter() {
    if (movementState === 'opening' || currentPosition >= 100) return;
    stopMovement();
    movementState = 'opening';
    activateLed(true);
    if (statusBadge) {
      statusBadge.textContent = 'STATUS: MOTOR RUNNING - OPENING ▲';
      statusBadge.className = 'px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse';
    }

    animationInterval = setInterval(() => {
      if (currentPosition < 100) {
        currentPosition += 2;
        if (currentPosition > 100) currentPosition = 100;
        updateCurtainVisual();
      } else {
        stopMovement();
      }
    }, 50);
  }

  function closeShutter() {
    if (movementState === 'closing' || currentPosition <= 0) return;
    stopMovement();
    movementState = 'closing';
    activateLed(true);
    if (statusBadge) {
      statusBadge.textContent = 'STATUS: MOTOR RUNNING - CLOSING ▼';
      statusBadge.className = 'px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 animate-pulse';
    }

    animationInterval = setInterval(() => {
      if (currentPosition > 0) {
        currentPosition -= 2;
        if (currentPosition < 0) currentPosition = 0;
        updateCurtainVisual();
      } else {
        stopMovement();
      }
    }, 50);
  }

  // Button Listeners
  if (btnUp) btnUp.addEventListener('click', openShutter);
  if (btnDown) btnDown.addEventListener('click', closeShutter);
  if (btnStop) btnStop.addEventListener('click', stopMovement);

  // Material Switcher
  materialRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const mat = e.target.value;
      const slats = curtain.querySelectorAll('.shutter-slat');
      
      slats.forEach(slat => {
        slat.className = 'shutter-slat';
        slat.classList.add(`slat-${mat}`);
      });
      
      updateRatings(mat);
      showToast(`Shutter Profile changed to: ${e.target.dataset.label || mat.toUpperCase()}`);
    });
  });

  // Color Swatches
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('ring-4', 'ring-red-600', 'scale-110'));
      swatch.classList.add('ring-4', 'ring-red-600', 'scale-110');

      const colorBg = swatch.dataset.colorBg || '#475569';
      const colorDark = swatch.dataset.colorDark || '#334155';
      const colorName = swatch.dataset.colorName || 'Selected Color';

      document.documentElement.style.setProperty('--slat-bg', colorBg);
      document.documentElement.style.setProperty('--slat-dark', colorDark);

      showToast(`Applied Powder Coating: ${colorName}`);
    });
  });

  // Initial State
  updateCurtainVisual();
  updateRatings('solid');
}

// ============================================================================
// 3. SMART COST ESTIMATOR & WHATSAPP GENERATOR
// ============================================================================
function initCostCalculator() {
  const widthInput = document.getElementById('calc-width');
  const heightInput = document.getElementById('calc-height');
  const widthSlider = document.getElementById('calc-width-slider');
  const heightSlider = document.getElementById('calc-height-slider');
  const materialSelect = document.getElementById('calc-material');
  const motorSelect = document.getElementById('calc-motor');
  const addonCheckboxes = document.querySelectorAll('input[name="calc-addon"]');
  const presetButtons = document.querySelectorAll('.calc-preset-btn');

  const areaDisplay = document.getElementById('calc-total-area');
  const minPriceDisplay = document.getElementById('calc-price-min');
  const maxPriceDisplay = document.getElementById('calc-price-max');
  const ratePerSqFtDisplay = document.getElementById('calc-rate-sqft');
  const whatsappQuoteBtn = document.getElementById('calc-whatsapp-btn');
  const printQuoteBtn = document.getElementById('calc-print-btn');

  if (!widthInput || !heightInput) return;

  // Sync inputs with range sliders
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

  // Preset Buttons
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
          b.classList.remove('bg-red-600', 'text-white', 'border-red-600');
          b.classList.add('bg-white', 'text-slate-800', 'border-slate-300');
        });
        btn.classList.add('bg-red-600', 'text-white', 'border-red-600');
        btn.classList.remove('bg-white', 'text-slate-800', 'border-slate-300');
        calculateEstimate();
      }
    });
  });

  if (materialSelect) materialSelect.addEventListener('change', calculateEstimate);
  if (motorSelect) motorSelect.addEventListener('change', calculateEstimate);
  addonCheckboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));

  function calculateEstimate() {
    const width = parseFloat(widthInput.value) || 10;
    const height = parseFloat(heightInput.value) || 10;
    const area = Math.round(width * height * 10) / 10; // sq ft

    let baseRateMin = 180;
    let baseRateMax = 230;
    let materialName = "Standard 20G Galvanized Steel (GI)";

    if (materialSelect) {
      const mat = materialSelect.value;
      switch (mat) {
        case 'gi-heavy-18g':
          baseRateMin = 240;
          baseRateMax = 290;
          materialName = "Heavy Duty 18G Galvanized Steel";
          break;
        case 'aluminum-alloy':
          baseRateMin = 360;
          baseRateMax = 440;
          materialName = "Extruded Aluminum Alloy (Anodized)";
          break;
        case 'polycarbonate':
          baseRateMin = 550;
          baseRateMax = 680;
          materialName = "Crystal Clear Polycarbonate (Showroom Grade)";
          break;
        case 'fire-rated':
          baseRateMin = 650;
          baseRateMax = 820;
          materialName = "2-Hour Certified Fire Rated Slat";
          break;
        case 'perforated-gi':
          baseRateMin = 210;
          baseRateMax = 260;
          materialName = "Perforated Mesh 20G Steel";
          break;
        default:
          baseRateMin = 180;
          baseRateMax = 230;
          materialName = "Standard 20G Galvanized Steel";
      }
    }

    let motorCostMin = 0;
    let motorCostMax = 0;
    let motorName = "Manual Push-Pull (Spring Loaded)";

    if (motorSelect) {
      const motor = motorSelect.value;
      switch (motor) {
        case 'gearbox':
          motorCostMin = 3500;
          motorCostMax = 5000;
          motorName = "Mechanical Heavy Gearbox + Chain Hoist";
          break;
        case 'center-motor':
          motorCostMin = 8500;
          motorCostMax = 11500;
          motorName = "Center Motor System + 2 Remote Keyfobs";
          break;
        case 'side-motor-heavy':
          motorCostMin = 15500;
          motorCostMax = 21000;
          motorName = "Heavy Duty Side Motor (600kg-1000kg) + Smart Control";
          break;
        case 'high-speed':
          motorCostMin = 35000;
          motorCostMax = 48000;
          motorName = "High-Speed Rapid Drive Frequency Inverter (0.8-1.5 m/s)";
          break;
        default:
          motorCostMin = 0;
          motorCostMax = 0;
          motorName = "Manual Push-Pull (Spring Loaded)";
      }
    }

    let addonsTotalMin = 0;
    let addonsTotalMax = 0;
    const selectedAddons = [];

    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const costMin = parseFloat(cb.dataset.costMin) || 0;
        const costMax = parseFloat(cb.dataset.costMax) || 0;
        addonsTotalMin += costMin;
        addonsTotalMax += costMax;
        selectedAddons.push(cb.dataset.label || cb.value);
      }
    });

    const curtainCostMin = area * baseRateMin;
    const curtainCostMax = area * baseRateMax;

    const totalEstimateMin = Math.round(curtainCostMin + motorCostMin + addonsTotalMin);
    const totalEstimateMax = Math.round(curtainCostMax + motorCostMax + addonsTotalMax);

    if (areaDisplay) areaDisplay.textContent = `${area} sq. ft. (${width} ft × ${height} ft)`;
    if (ratePerSqFtDisplay) ratePerSqFtDisplay.textContent = `₹${baseRateMin} - ₹${baseRateMax} / sq.ft`;
    if (minPriceDisplay) minPriceDisplay.textContent = `₹${totalEstimateMin.toLocaleString('en-IN')}`;
    if (maxPriceDisplay) maxPriceDisplay.textContent = `₹${totalEstimateMax.toLocaleString('en-IN')}`;

    if (whatsappQuoteBtn) {
      const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None';
      const rawMsg = `*RAM DOOR SHUTTER - NEW ESTIMATE INQUIRY*
----------------------------------------
📐 *Dimensions:* ${width} ft (W) × ${height} ft (H) = *${area} sq.ft*
🛠️ *Material:* ${materialName}
⚙️ *Drive System:* ${motorName}
✨ *Selected Add-ons:* ${addonsText}
💰 *Estimated Range:* ₹${totalEstimateMin.toLocaleString('en-IN')} - ₹${totalEstimateMax.toLocaleString('en-IN')}
----------------------------------------
_Please send final quotation with installation & warranty details for my site._`;

      const encodedMsg = encodeURIComponent(rawMsg);
      whatsappQuoteBtn.href = `https://wa.me/919876543210?text=${encodedMsg}`;
    }
  }

  if (printQuoteBtn) {
    printQuoteBtn.addEventListener('click', () => {
      window.print();
    });
  }

  calculateEstimate();
}

// ============================================================================
// 4. PRODUCT CATALOG & QUICK SPEC MODAL
// ============================================================================
const productsData = [
  {
    id: 'motorized-rolling-shutter',
    name: 'Motorized Rolling Shutter',
    category: 'motorized',
    tag: 'Best Seller',
    tagColor: 'bg-red-600',
    shortDesc: 'Automated heavy-gauge steel shutter equipped with high-torque motor and wireless remote control.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    features: ['German/Italian drive motors', 'Dual remote keyfob included', 'Manual chain override in power cuts', 'Ultra-quiet nylon side guides'],
    specs: {
      gauge: '18 / 20 / 22 Gauge GI Steel',
      maxSpan: 'Up to 32 feet width',
      motorCapacity: '300 kg to 1500 kg lifting force',
      operatingSpeed: '0.15 - 0.20 m/sec',
      warranty: '5 Years Motor & 10 Years Mechanical'
    }
  },
  {
    id: 'perforated-showroom-shutter',
    name: 'Perforated Showroom Shutter',
    category: 'commercial',
    tag: 'Retail Grade',
    tagColor: 'bg-slate-800',
    shortDesc: 'Precision micro-punched interlocking slats allowing after-hours shop window display with full security.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    features: ['High ventilation & visibility', 'Powder coated custom RAL shades', 'Anti-rust zinc galvanization', 'Deterrent against burglary & vandalism'],
    specs: {
      gauge: '20 / 22 Gauge CRCA / GI',
      ventilationRatio: '35% to 45% Airflow Area',
      holeDiameter: '2.5mm to 4.0mm CNC punched',
      finish: 'Pure Polyester Electrostatic Powder Coat',
      warranty: '5 Years Structural'
    }
  },
  {
    id: 'polycarbonate-crystal-shutter',
    name: 'Crystal Polycarbonate Shutter',
    category: 'polycarbonate',
    tag: 'Luxury Mall Grade',
    tagColor: 'bg-red-600',
    shortDesc: 'Unbreakable 92% optical transparency polycarbonate panels linked with heavy aluminum joiners.',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    features: ['UV-stabilized anti-yellowing panels', '250x stronger than standard glass', 'Fire retardant Class 1 material', 'Premium showroom aesthetics'],
    specs: {
      slatThickness: '3.0mm to 4.5mm High Impact Polycarbonate',
      joiners: 'Heavy Extruded Aluminum (6063-T6)',
      lightTransmittance: '90% - 93% Crystal Clear',
      uvProtection: 'Dual-side Co-extruded UV Filter',
      warranty: '7 Years Clarity Guarantee'
    }
  },
  {
    id: 'industrial-heavy-duty-shutter',
    name: 'Industrial Heavy Duty Shutter',
    category: 'industrial',
    tag: 'Heavy Industrial',
    tagColor: 'bg-slate-900',
    shortDesc: 'Designed for logistics hubs, factories, and warehouses with extreme wind-load resistance and heavy cycle life.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    features: ['Wind-lock guide rail systems', 'Tri-phase industrial side drive', 'Drop-safe centrifugal brake', 'Heavy cold-rolled double rib slats'],
    specs: {
      gauge: '16 / 18 Gauge Heavy Cold Rolled Steel',
      windResistance: 'Class 4 (Up to 140 km/h wind force)',
      motorType: '3-Phase 415V Heavy Duty Flange Motor',
      dailyCycles: 'Over 100+ cycles/day capability',
      warranty: '10 Years Heavy Duty Warranty'
    }
  },
  {
    id: 'fire-rated-rolling-shutter',
    name: 'Certified Fire-Rated Shutter',
    category: 'fire',
    tag: 'Safety Certified',
    tagColor: 'bg-red-700',
    shortDesc: 'Tested and certified for 2-hour and 4-hour fire integrity with auto-descent fusible link triggers.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    features: ['Auto gravity fall on smoke/fire signal', 'Mineral wool thermal core', 'BS 476 / IS 3614 Compliance', 'Integrated acoustic smoke seal'],
    specs: {
      fireRating: '120 Minutes & 240 Minutes Certified',
      coreMaterial: 'Ceramic / High Density Rockwool Insulation',
      triggerMechanism: 'Fusible Link (68°C / 93°C) + BMS Interface',
      finish: 'Heat-Resistant Epoxy Primer & Topcoat',
      warranty: '5 Years Compliance Guarantee'
    }
  },
  {
    id: 'insulated-aluminum-shutter',
    name: 'Insulated Aluminum Shutter',
    category: 'commercial',
    tag: 'Energy Saving',
    tagColor: 'bg-slate-800',
    shortDesc: 'Double-walled aluminum profile injected with CFC-free polyurethane foam for thermal and sound insulation.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    features: ['Reduces AC/Heating energy loss up to 40%', 'Sound dampening up to 22dB', 'Rust-proof marine grade alloy', 'Smooth, noiseless operation'],
    specs: {
      profileHeight: '77mm / 95mm Double Wall',
      insulationDensity: '45 kg/m³ Polyurethane (PUF)',
      thermalConductivity: 'U-Value 1.5 W/m²K',
      colors: 'Anodized Silver, Charcoal Black, Custom',
      warranty: '8 Years All-Weather Warranty'
    }
  },
  {
    id: 'high-speed-rapid-door',
    name: 'High-Speed Rapid Roll Door',
    category: 'industrial',
    tag: 'Cleanroom / Warehouse',
    tagColor: 'bg-red-600',
    shortDesc: 'Ultra-fast flexible PVC roll door for cold storage, pharmaceutical cleanrooms, and automated production bays.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    features: ['Opening speed up to 1.5 meters/second', 'Self-repairing zipper track option', 'Radar sensor + magnetic loop triggers', 'Wind-resistant aluminum stiffener bars'],
    specs: {
      curtainFabric: '0.9mm - 1.2mm High-Density Industrial PVC',
      speed: '0.8 to 1.8 m/sec (Adjustable Inverter)',
      temperatureRange: '-25°C to +70°C',
      safety: 'Infrared Safety Curtains + Bottom Reversing Edge',
      warranty: '3 Years Complete Drive System'
    }
  },
  {
    id: 'collapsible-security-gates',
    name: 'Heavy Collapsible Channel Gate',
    category: 'commercial',
    tag: 'Traditional Security',
    tagColor: 'bg-slate-900',
    shortDesc: 'Double-channel lattice collapsible sliding gates with ball-bearing rollers for shop fronts and factory entrances.',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    features: ['Solid mild steel flat and channel lattice', 'Smooth bottom track with brass bearings', 'Heavy padlock hasps & lever locks', 'Zero power required'],
    specs: {
      channelSize: '19mm × 10mm × 2.5mm MS Channel',
      latticeFlat: '16mm × 4mm Double Bar Lattice',
      pulleys: 'Hardened Steel Ball Bearings',
      finish: 'Red Oxide Primer + Synthetic Enamel Paint',
      warranty: '10 Years Heavy Steel Life'
    }
  }
];

function initProductCatalog() {
  const container = document.getElementById('products-grid');
  const filterTabs = document.querySelectorAll('.product-filter-tab');
  const modal = document.getElementById('product-modal');
  const modalClose = document.getElementById('modal-close-btn');

  if (!container) return;

  function renderProducts(category = 'all') {
    container.innerHTML = '';
    const filtered = category === 'all' 
      ? productsData 
      : productsData.filter(p => p.category === category);

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'clean-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 flex flex-col justify-between group';
      card.innerHTML = `
        <div>
          <div class="relative h-56 bg-slate-900 overflow-hidden">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 opacity-95" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <span class="absolute top-3 right-3 ${p.tagColor} text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-md">${p.tag}</span>
            <div class="absolute bottom-3 left-3 text-white">
              <span class="text-xs uppercase font-mono tracking-widest text-red-400 font-bold">RAM PRECISION</span>
              <h3 class="text-lg font-bold text-white">${p.name}</h3>
            </div>
          </div>
          <div class="p-5">
            <p class="text-xs text-slate-600 mb-4 leading-relaxed">${p.shortDesc}</p>
            <ul class="space-y-2 mb-5">
              ${p.features.slice(0, 3).map(f => `
                <li class="text-xs text-slate-700 flex items-center gap-2">
                  <i class="fas fa-check-circle text-red-600 shrink-0"></i>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
        <div class="p-5 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
          <button class="view-spec-btn flex-1 py-2.5 px-4 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase rounded-xl transition duration-200 text-center tracking-wider shadow-sm" data-id="${p.id}">
            View Technical Specs
          </button>
          <a href="https://wa.me/919876543210?text=${encodeURIComponent(`Hi RAM Door Shutter, I am interested in getting a quote for ${p.name}.`)}" target="_blank" class="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition text-center shadow-sm" title="Chat on WhatsApp">
            <i class="fab fa-whatsapp text-lg"></i>
          </a>
        </div>
      `;
      container.appendChild(card);
    });

    container.querySelectorAll('.view-spec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openProductModal(btn.dataset.id);
      });
    });
  }

  // Filter tab interactions
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('bg-red-600', 'text-white', 'active');
        t.classList.add('bg-white', 'text-slate-700');
      });
      tab.classList.add('bg-red-600', 'text-white', 'active');
      tab.classList.remove('bg-white', 'text-slate-700');
      renderProducts(tab.dataset.filter);
    });
  });

  function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product || !modal) return;

    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-category').textContent = `Category: ${product.category.toUpperCase()}`;
    document.getElementById('modal-desc').textContent = product.shortDesc;
    document.getElementById('modal-img').src = product.image;

    const specsContainer = document.getElementById('modal-specs-list');
    specsContainer.innerHTML = '';
    for (const [key, value] of Object.entries(product.specs)) {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      const row = document.createElement('div');
      row.className = 'flex justify-between py-2 border-b border-slate-200 text-xs';
      row.innerHTML = `<span class="font-bold text-slate-600 uppercase">${formattedKey}:</span> <span class="font-semibold text-slate-900 text-right">${value}</span>`;
      specsContainer.appendChild(row);
    }

    const featuresContainer = document.getElementById('modal-features-list');
    featuresContainer.innerHTML = product.features.map(f => `
      <li class="flex items-start gap-2 text-xs text-slate-700">
        <i class="fas fa-shield-alt text-red-600 mt-0.5 shrink-0"></i>
        <span>${f}</span>
      </li>
    `).join('');

    const modalQuoteBtn = document.getElementById('modal-quote-btn');
    if (modalQuoteBtn) {
      modalQuoteBtn.href = `https://wa.me/919876543210?text=${encodeURIComponent(`Hi Ram Door Shutter, I would like a quote and site visit for: ${product.name}.`)}`;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }

  renderProducts('all');
}

// ============================================================================
// 5. 24/7 EMERGENCY REPAIR DISPATCH
// ============================================================================
function initEmergencyRepair() {
  const repairForm = document.getElementById('emergency-repair-form');
  if (!repairForm) return;

  repairForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('repair-name').value.trim();
    const phone = document.getElementById('repair-phone').value.trim();
    const issue = document.getElementById('repair-issue').value;
    const location = document.getElementById('repair-location').value.trim();

    if (!name || !phone || !location) {
      showToast('Please fill in all required fields for fast technician dispatch.', 'error');
      return;
    }

    const sosMessage = `🚨 *RAM DOOR SHUTTER - 24/7 EMERGENCY REPAIR SOS* 🚨
----------------------------------------
👤 *Client Name:* ${name}
📞 *Contact Phone:* ${phone}
📍 *Site Location:* ${location}
⚠️ *Issue:* ${issue}
⏰ *Time Sent:* ${new Date().toLocaleTimeString()}
----------------------------------------
_Urgent technician dispatch requested!_`;

    const encoded = encodeURIComponent(sosMessage);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');

    showToast('Emergency SOS Sent! Dispatching technician team to your WhatsApp.', 'success');
    repairForm.reset();
  });
}

// ============================================================================
// 6. CONTACT FORM & DIRECT INQUIRY
// ============================================================================
function initContactForm() {
  const contactForm = document.getElementById('main-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const shutterType = document.getElementById('contact-shutter-type').value;

    if (!name || !phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    const inquiryText = `*RAM DOOR SHUTTER - WEBSITE INQUIRY*
----------------------------------------
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email || 'Not provided'}
🚪 *Product Requirement:* ${shutterType}
💬 *Message / Site Details:* ${message || 'Standard quotation requested'}
----------------------------------------`;

    const encoded = encodeURIComponent(inquiryText);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');

    showToast('Thank you! Your quote request has been routed to our fabrication engineers.', 'success');
    contactForm.reset();
  });
}

// ============================================================================
// 7. TOAST NOTIFICATION UTILITY
// ============================================================================
function showToast(message, type = 'info') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'success' ? 'fa-check-circle text-emerald-600' : (type === 'error' ? 'fa-exclamation-triangle text-amber-600' : 'fa-info-circle text-red-600');
  const borderClass = type === 'success' ? 'border-emerald-500' : (type === 'error' ? 'border-amber-500' : 'border-red-600');

  toast.className = `fixed bottom-6 left-6 z-50 bg-white text-slate-900 px-5 py-3.5 rounded-2xl border-2 ${borderClass} shadow-2xl flex items-center gap-3 transition-transform duration-300 font-medium text-sm show`;
  toast.innerHTML = `
    <i class="fas ${iconClass} text-lg"></i>
    <span>${message}</span>
  `;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ============================================================================
// 8. SMOOTH SCROLL NAVIGATION
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
