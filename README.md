# RAM DOOR SHUTTER - Official Manufacturer Website

A website for **RAM DOOR SHUTTER** (Door Shop & Heavy Duty Rolling Shutter Manufacturer and Fabricator), styled in an industrial **Red, White, and Black** visual theme.

---

## 🚀 Key Features

1. **Interactive Rolling Shutter Visualizer & Simulator**
   - Motorized remote control with animated UP, STOP, DOWN buttons.
   - Slat Profile Switcher: Solid Galvanized Steel, Perforated Retail Mesh, Crystal Polycarbonate Clear, Commercial Security Grill.
   - Electrostatic Powder Coat Color Swatches: Signal Red, Matte Black, Machine Gray, Pure White, Royal Blue, Forest Green.
   - Real-time HUD ratings for Security Grade, Airflow/Ventilation %, and Visibility %.

2. **Instant Shutter Cost Estimator & Quote Pre-filler**
   - Preset opening sizes (Shop 10x10, Garage 12x10, Warehouse 16x14, Industrial Bay 20x18).
   - Real-time width and height sliders with automatic area calculation.
   - Material & Gauge dropdown (20G GI, 18G Heavy GI, Aluminum Alloy, Polycarbonate, Fire-Rated).
   - Motor & Drive System selection (Manual, Gearbox, Center Motor, Heavy Industrial Side Drive, High-Speed Inverter).
   - Add-on accessories (Anti-drop brake, UPS Battery backup, Safety sensors, Powder coating).
   - 1-Click **"Send Estimate on WhatsApp"** button that pre-formats the exact dimensions and estimated quote into a ready-to-send WhatsApp message.
   - 1-Click **"Print / Save Spec Sheet"** for quotations.

3. **Complete Product Catalog & Technical Spec Modals**
   - Motorized Rolling Shutters, Perforated Showroom Grills, Crystal Polycarbonate Shutters, Industrial Heavy Duty Doors, Fire-Rated Certified Shutters, Insulated Aluminum Shutters, High-Speed Rapid Roll Doors, Collapsible Lattice Gates.
   - Filter tabs by category.
   - Interactive modal popup with gauge specs, motor capacity, and wind resistance ratings.

4. **24/7 Emergency Repair & Service Dispatch Unit**
   - Rapid response form with direct WhatsApp SOS alert for technician dispatch.
   - Retrofit upgrades (Manual to Motorized in 4 hours).
   - Annual Maintenance Contracts (AMC) and spring replacement services.

5. **Direct Manufacturer Advantages & 6-Stage Engineering Process**
   - Coil Slitting, CNC Roll Forming, 200°C Powder Coating, Motor Integration, QA Cycle Testing, Site Delivery.

6. **Responsive Red-White-Black Industrial UI**
   - Mobile-first drawer navigation.
   - Floating WhatsApp and Quick Call action buttons.
   - Smooth scrolling and interactive toast notifications.

---

## 📁 File Structure

```
ramdoorshetter/
├── index.html        # Main webpage layout & components
├── css/
│   └── styles.css    # Custom industrial Red/White/Black styling & animations
├── js/
│   └── app.js        # Simulator engine, cost estimator & interactivity
├── images/           # Local assets / images folder
└── README.md         # Documentation
```

---

## 💻 How to View & Run the Website

### Option 1: Double-Click
Simply double-click `index.html` in your file explorer to open it in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Run a Local Server (PowerShell)
```powershell
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🛠️ Customization Details

- **Change Phone Numbers / WhatsApp**:
  In `index.html` and `js/app.js`, replace `9876543210` with your actual phone/WhatsApp number.
- **Change Office Address / Email**:
  Update the address and email fields in the `contact` section of `index.html`.
- **Change Pricing Multipliers**:
  Adjust the base per-sq-ft rates in `js/app.js` inside the `initCostCalculator` function.
