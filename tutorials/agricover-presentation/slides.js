(function () {
  // Line icons in the style of the Agricover icon library (stroke = currentColor).
  const svg = (paths) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

  const ICONS = {
    sprout: svg('<path d="M12 21v-9"/><path d="M12 12C12 7.5 8.8 4.5 3.5 4.5c0 4.8 3.3 7.5 8.5 7.5z"/><path d="M12 14.5c0-4.5 3-7.5 8.5-7.5 0 4.5-3 7.5-8.5 7.5z"/>'),
    truck: svg('<path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4.2l3 3.2v3.3h-7.2z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
    bank: svg('<path d="M3 9.5 12 4l9 5.5"/><path d="M5.5 10v7.5M10 10v7.5M14 10v7.5M18.5 10v7.5"/><path d="M3 20h18"/>'),
    card: svg('<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19"/><path d="M6.5 14.5h4"/>'),
    digital: svg('<rect x="6.5" y="2.5" width="11" height="19" rx="2.2"/><path d="M10.5 18h3"/>'),
    satellite: svg('<path d="m13 7.5 3.5 3.5-5.5 5.5L7.5 13z"/><path d="m15 5.5 2-2 3.5 3.5-2 2"/><path d="m5.5 15-2 2L7 20.5l2-2"/><path d="M14.5 19.5a5 5 0 0 0 5-5"/>')
  };

  const CROP360_MOCKUP = `
    <div class="c360">
      <div class="c360-top">
        <div class="c360-brand"><i></i>Crop360</div>
        <div class="c360-tabs">
          <span class="on">My Farm</span><span>Inventory</span><span>E-Shop</span><span>Credit</span>
        </div>
        <span class="c360-live">LIVE SATELLITE</span>
      </div>
      <div class="c360-body">
        <div class="c360-map">
          <div class="c360-map-head"><span>Parcels · NDVI index</span><span>Sync APIA ✓</span></div>
          <svg viewBox="0 0 420 300" aria-hidden="true">
            <rect width="420" height="300" rx="6" fill="#E3E6D9"/>
            <g stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round">
              <polygon points="18,18 190,10 200,120 28,134" fill="#4E5B31"/>
              <polygon points="206,10 402,24 396,110 212,118" fill="#97D700"/>
              <polygon points="28,144 200,130 210,282 38,286" fill="#97D700"/>
              <polygon points="215,128 396,120 400,200 220,210" fill="#FF8200"/>
              <polygon points="222,218 400,210 398,286 226,288" fill="#FFB549"/>
            </g>
            <circle class="c360-pulse" cx="308" cy="165" r="16" fill="none" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="308" cy="165" r="6" fill="#FFFFFF"/>
            <text x="40" y="44">A1 · Wheat</text>
            <text x="226" y="44">A2 · Corn</text>
            <text x="50" y="170">B1 · Sunflower</text>
            <text x="232" y="148">B4 · Stress</text>
            <text x="240" y="244">B5 · Rapeseed</text>
          </svg>
          <div class="c360-legend">
            <span><i style="background:#4E5B31"></i>Excellent</span>
            <span><i style="background:#97D700"></i>Healthy</span>
            <span><i style="background:#FFB549"></i>Watch</span>
            <span><i style="background:#FF8200"></i>Stress</span>
          </div>
        </div>
        <div class="c360-side">
          <div class="c360-kpi"><small>Active area</small><b>1,240 ha</b><em>5 parcels · 4 crops</em></div>
          <div class="c360-kpi"><small>Average NDVI</small><b>0.72</b><em>+0.06 vs last week</em></div>
          <div class="c360-kpi accent"><small>Available credit</small><b>€450,000</b><em>Cardul Fermier active</em></div>
          <div class="c360-alert">
            <strong>Recommended action:</strong> nitrogen deficiency detected on parcel B4.
            <br><span class="c360-btn">Order foliar nutrition →</span>
          </div>
        </div>
      </div>
    </div>
  `;

  window.PRESENTATION_DATA = {
    id: "agricover-presentation",
    title: "Agricover: The Modern Agribusiness Ecosystem",
    subtitle: "Integrating AgriBusiness, AgriFinance, and AgriTechnology for farmers across Romania",
    theme: {
      accent: "#FF8200",
      accentGlow: "rgba(255, 130, 0, 0.28)",
      badgeColor: "#4E5B31"
    },
    slides: [
      {
        id: "slide-01",
        type: "hero",
        badge: "AGRICOVER HOLDING • ECOSYSTEM OVERVIEW",
        title: "Empowering Modern Agriculture",
        subtitle: "A unified ecosystem connecting farm inputs, specialized finance, and digital intelligence",
        audio: "audio/slide-01.mp3",
        narration: "Welcome to Agricover. With over twenty-five years of experience, Agricover provides an integrated model supporting thousands of farmers across Romania with inputs, financing, and digital tools.",
        content: {
          highlights: [
            {
              icon: ICONS.truck,
              title: "AgriBusiness Distribution",
              text: "Certified seeds, crop nutrition, crop protection, and fuel delivered directly to farm gates."
            },
            {
              icon: ICONS.card,
              title: "AgriFinance Solutions",
              text: "Specialized working capital and equipment credit through Agricover Credit IFN and Cardul Fermier."
            },
            {
              icon: ICONS.satellite,
              title: "AgriTechnology & Crop360",
              text: "Satellite parcel monitoring, farm management, and precision agriculture algorithms."
            }
          ]
        }
      },
      {
        id: "slide-02",
        type: "cards",
        badge: "01 • THREE CORE PILLARS",
        title: "Three Engines Driving Farm Success",
        subtitle: "How physical distribution, specialized credit, and software combine seamlessly",
        audio: "audio/slide-02.mp3",
        narration: "Rather than treating farming services in isolation, Agricover links distribution, financial liquidity, and digital tracking into one unified workflow for the modern producer.",
        content: {
          cards: [
            {
              icon: ICONS.sprout,
              tag: "DISTRIBUTION",
              title: "Agricover AgriBusiness",
              text: "High-grade certified seeds, crop protection technologies, and high-efficiency fertilizers covering every vegetative stage."
            },
            {
              icon: ICONS.bank,
              tag: "FINANCING",
              title: "Agricover Credit IFN",
              text: "Financing tailored to harvest cycles, zero-interest seasonal programs, and dedicated farm debit cards."
            },
            {
              icon: ICONS.digital,
              tag: "TECHNOLOGY",
              title: "Agricover Technology",
              text: "SaaS platform Crop360 turning satellite imagery, weather patterns, and farm logistics into daily decisions."
            }
          ]
        }
      },
      {
        id: "slide-03",
        type: "compare",
        badge: "02 • THE STRATEGIC SHIFT",
        title: "Traditional Agribusiness vs Integrated Platform",
        subtitle: "Why fragmented farm suppliers struggle compared to a closed-loop ecosystem",
        audio: "audio/slide-03.mp3",
        narration: "Traditional agriculture deals with fragmented vendors, delayed bank loans, and paper records. Agricover brings everything under one single sign-on experience.",
        content: {
          left: {
            tag: "TRADITIONAL • FRAGMENTED SUPPLIERS",
            title: "Siloed Operations",
            points: [
              "Separate suppliers for seed, chemical inputs, and diesel.",
              "Long bank underwriting that misses seasonal weather windows.",
              "Manual paper spreadsheets and disjointed crop records."
            ]
          },
          right: {
            tag: "AGRICOVER • INTEGRATED SYNERGY",
            title: "One Connected Ecosystem",
            points: [
              "Single digital access to inputs, warehouse logistics, and delivery.",
              "Instant liquidity through Cardul Fermier linked directly to input orders.",
              "Real-time satellite indices and automatic APIA parcel boundary sync."
            ]
          }
        }
      },
      {
        id: "slide-04",
        type: "mockup",
        badge: "03 • DIGITAL PLATFORM",
        title: "Crop360: The Digital Cockpit",
        subtitle: "Turning satellite data, field boundaries, and inventory into higher yield per hectare",
        audio: "audio/slide-04.mp3",
        narration: "Crop360 is Agricover's proprietary digital platform. Built with Microsoft and ESRI, it allows farmers to track vegetation indexes, weather alerts, and treatment schedules in real time.",
        content: {
          callouts: [
            {
              step: "1",
              title: "APIA Parcel Sync",
              text: "Import cadastral boundaries and farm parcel records in seconds."
            },
            {
              step: "2",
              title: "Satellite Crop Health",
              text: "NDVI vegetation indexes highlight early disease risks and water stress."
            },
            {
              step: "3",
              title: "Direct E-Shop & Credit",
              text: "Order required crop inputs instantly using approved financing lines."
            }
          ],
          mockupHtml: CROP360_MOCKUP
        }
      },
      {
        id: "slide-05",
        type: "mission",
        badge: "04 • KEY TAKEAWAYS",
        title: "The Future of Romanian Agribusiness",
        subtitle: "Three pillars of competitive advantage for sustainable farm profitability",
        audio: "audio/slide-05.mp3",
        narration: "By uniting input logistics, smart financing, and digital precision, Agricover helps farmers boost yield while cutting costs. Let us review the three strategic takeaways.",
        content: {
          goal: "Understand how the integrated Agricover model transforms seasonal agriculture into a data-driven business.",
          steps: [
            {
              number: "01",
              title: "Supply Chain Resilience",
              text: "Direct access to top-tier international seeds, crop protection, and nutrition delivered promptly across all counties."
            },
            {
              number: "02",
              title: "Tailored Financial Agility",
              text: "Fast liquidity adapted to seasonal farm cycles through Agricover Credit IFN and the dedicated Cardul Fermier."
            },
            {
              number: "03",
              title: "Precision Digital Farming",
              text: "Real-time crop intelligence with Crop360 to optimize cost per hectare and meet European sustainability standards."
            }
          ],
          reward: "Partner with Agricover: powering the modern Romanian farm from planting to harvest."
        }
      }
    ]
  };
})();
