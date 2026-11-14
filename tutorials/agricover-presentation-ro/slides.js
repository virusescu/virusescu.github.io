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
          <span class="on">Ferma Mea</span><span>Stocuri</span><span>Magazin</span><span>Credit</span>
        </div>
        <span class="c360-live">SATELIT LIVE</span>
      </div>
      <div class="c360-body">
        <div class="c360-map">
          <div class="c360-map-head"><span>Parcele · indice NDVI</span><span>Sincronizat APIA ✓</span></div>
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
            <text x="40" y="44">A1 · Grâu</text>
            <text x="226" y="44">A2 · Porumb</text>
            <text x="50" y="170">B1 · Floarea-soarelui</text>
            <text x="232" y="148">B4 · Stres</text>
            <text x="240" y="244">B5 · Rapiță</text>
          </svg>
          <div class="c360-legend">
            <span><i style="background:#4E5B31"></i>Excelent</span>
            <span><i style="background:#97D700"></i>Sănătos</span>
            <span><i style="background:#FFB549"></i>Atenție</span>
            <span><i style="background:#FF8200"></i>Stres</span>
          </div>
        </div>
        <div class="c360-side">
          <div class="c360-kpi"><small>Suprafață activă</small><b>1.240 ha</b><em>5 parcele · 4 culturi</em></div>
          <div class="c360-kpi"><small>NDVI mediu</small><b>0,72</b><em>+0,06 față de săptămâna trecută</em></div>
          <div class="c360-kpi accent"><small>Credit disponibil</small><b>450.000 €</b><em>Cardul Fermierului activ</em></div>
          <div class="c360-alert">
            <strong>Acțiune recomandată:</strong> deficit de azot detectat pe parcela B4.
            <br><span class="c360-btn">Comandă fertilizant foliar →</span>
          </div>
        </div>
      </div>
    </div>
  `;

  window.PRESENTATION_DATA = {
    id: "agricover-presentation-ro",
    title: "Agricover: Ecosistemul Modern de Agribusiness",
    subtitle: "Distribuție, finanțare și tehnologie integrate pentru fermierii din România",
    theme: {
      accent: "#FF8200",
      accentGlow: "rgba(255, 130, 0, 0.28)",
      badgeColor: "#4E5B31"
    },
    slides: [
      {
        id: "slide-01",
        type: "hero",
        badge: "AGRICOVER HOLDING • PREZENTARE GENERALĂ",
        title: "Sprijinim Agricultura Modernă",
        subtitle: "Un ecosistem unic care conectează inputurile agricole, finanțarea specializată și inteligența digitală",
        audio: "audio/slide-01.mp3",
        narration: "Bine ați venit la Agricover! Cu peste douăzeci și cinci de ani de experiență, Agricover oferă un model integrat care sprijină mii de fermieri din România cu inputuri, finanțare și instrumente digitale.",
        narrationTts: "Bine ați venit la AgriCavăr! Cu peste douăzeci și cinci de ani de experiență, AgriCavăr oferă un model integrat care sprijină mii de fermieri din România cu inputuri, finanțare și instrumente digitale.",
        content: {
          highlights: [
            {
              icon: ICONS.truck,
              title: "Distribuție AgriBusiness",
              text: "Semințe certificate, nutriție și protecția plantelor, plus motorină, livrate direct la poarta fermei.",
              tts: "Distribuție Agri Biznis. Semințe certificate, nutriție și protecția plantelor, plus motorină, livrate direct la poarta fermei."
            },
            {
              icon: ICONS.card,
              title: "Soluții AgriFinance",
              text: "Capital de lucru și credite pentru utilaje prin Agricover Credit IFN și Cardul Fermierului.",
              tts: "Soluții Agri Fainans. Capital de lucru și credite pentru utilaje prin AgriCavăr Credit I F N și Cardul Fermierului."
            },
            {
              icon: ICONS.satellite,
              title: "AgriTehnologie & Crop360",
              text: "Monitorizarea parcelelor din satelit, managementul fermei și algoritmi de agricultură de precizie.",
              tts: "Agri Tehnologie și Crop trei sute șaizeci. Monitorizarea parcelelor din satelit, managementul fermei și algoritmi de agricultură de precizie."
            }
          ]
        }
      },
      {
        id: "slide-02",
        type: "cards",
        badge: "01 • TREI PILONI",
        title: "Trei Motoare ale Succesului în Fermă",
        subtitle: "Cum se îmbină distribuția fizică, creditul specializat și software-ul",
        audio: "audio/slide-02.mp3",
        narration: "În loc să trateze separat serviciile pentru fermă, Agricover leagă distribuția, lichiditatea financiară și monitorizarea digitală într-un singur flux de lucru, pentru fermierul modern.",
        narrationTts: "În loc să trateze separat serviciile pentru fermă, AgriCavăr leagă distribuția, lichiditatea financiară și monitorizarea digitală într-un singur flux de lucru, pentru fermierul modern.",
        content: {
          cards: [
            {
              icon: ICONS.sprout,
              tag: "DISTRIBUȚIE",
              title: "Agricover AgriBusiness",
              text: "Semințe certificate de top, tehnologii de protecție a plantelor și fertilizanți eficienți pentru fiecare etapă de vegetație.",
              tts: "AgriCavăr Agri Biznis. Semințe certificate de top, tehnologii de protecție a plantelor și fertilizanți eficienți pentru fiecare etapă de vegetație."
            },
            {
              icon: ICONS.bank,
              tag: "FINANȚARE",
              title: "Agricover Credit IFN",
              text: "Finanțare adaptată ciclului agricol, programe sezoniere cu dobândă zero și carduri dedicate fermierilor.",
              tts: "AgriCavăr Credit I F N. Finanțare adaptată ciclului agricol, programe sezoniere cu dobândă zero și carduri dedicate fermierilor."
            },
            {
              icon: ICONS.digital,
              tag: "TEHNOLOGIE",
              title: "Agricover Technology",
              text: "Platforma Crop360 transformă imaginile din satelit, vremea și logistica fermei în decizii zilnice.",
              tts: "AgriCavăr Tehnologii. Platforma Crop trei sute șaizeci transformă imaginile din satelit, vremea și logistica fermei în decizii zilnice."
            }
          ]
        }
      },
      {
        id: "slide-03",
        type: "compare",
        badge: "02 • SCHIMBAREA STRATEGICĂ",
        title: "Agribusiness Tradițional vs Platformă Integrată",
        subtitle: "De ce furnizorii fragmentați pierd teren în fața unui ecosistem complet",
        audio: "audio/slide-03.mp3",
        narration: "Agricultura tradițională înseamnă furnizori fragmentați, credite bancare întârziate și evidențe pe hârtie. Agricover aduce totul într-o singură experiență, cu un singur cont.",
        narrationTts: "Agricultura tradițională înseamnă furnizori fragmentați, credite bancare întârziate și evidențe pe hârtie. AgriCavăr aduce totul într-o singură experiență, cu un singur cont.",
        content: {
          left: {
            tag: "TRADIȚIONAL • FURNIZORI FRAGMENTAȚI",
            title: "Operațiuni în Silozuri",
            points: [
              "Furnizori separați pentru semințe, inputuri chimice și motorină.",
              "Aprobări bancare lente, care ratează ferestrele sezoniere.",
              "Registre pe hârtie și evidențe ale culturilor împrăștiate."
            ]
          },
          right: {
            tag: "AGRICOVER • SINERGIE INTEGRATĂ",
            title: "Un Singur Ecosistem Conectat",
            points: [
              "Acces digital unic la inputuri, logistică de depozit și livrare.",
              "Lichiditate imediată prin Cardul Fermierului, legat direct de comenzi.",
              "Indici din satelit în timp real și sincronizare automată cu parcelele APIA."
            ]
          }
        }
      },
      {
        id: "slide-04",
        type: "mockup",
        badge: "03 • PLATFORMA DIGITALĂ",
        title: "Crop360: Cockpitul Digital al Fermei",
        subtitle: "Date din satelit, limite de parcele și stocuri transformate în randament mai mare la hectar",
        audio: "audio/slide-04.mp3",
        narration: "Crop360 este platforma digitală proprie Agricover. Construită împreună cu Microsoft și ESRI, le permite fermierilor să urmărească indicii de vegetație, alertele meteo și programul tratamentelor, în timp real.",
        narrationTts: "Crop trei sute șaizeci este platforma digitală proprie AgriCavăr. Construită împreună cu Microsoft și Esri, le permite fermierilor să urmărească indicii de vegetație, alertele meteo și programul tratamentelor, în timp real.",
        content: {
          callouts: [
            {
              step: "1",
              title: "Sincronizare cu APIA",
              text: "Importă în câteva secunde limitele cadastrale și evidența parcelelor.",
              tts: "Sincronizare cu apia. Importă în câteva secunde limitele cadastrale și evidența parcelelor."
            },
            {
              step: "2",
              title: "Sănătatea Culturilor din Satelit",
              text: "Indicii de vegetație NDVI semnalează din timp riscul de boli și stresul hidric.",
              tts: "Sănătatea Culturilor din Satelit. Indicii de vegetație N D V I semnalează din timp riscul de boli și stresul hidric."
            },
            {
              step: "3",
              title: "Magazin Online & Credit",
              text: "Comandă instant inputurile necesare, folosind liniile de finanțare aprobate.",
              tts: "Magazin Online și Credit. Comandă instant inputurile necesare, folosind liniile de finanțare aprobate."
            }
          ],
          mockupHtml: CROP360_MOCKUP
        }
      },
      {
        id: "slide-05",
        type: "mission",
        badge: "04 • IDEI DE REȚINUT",
        title: "Viitorul Agribusiness-ului Românesc",
        subtitle: "Trei piloni ai avantajului competitiv pentru o fermă profitabilă și durabilă",
        audio: "audio/slide-05.mp3",
        narration: "Unind logistica inputurilor, finanțarea inteligentă și precizia digitală, Agricover îi ajută pe fermieri să crească producția și să reducă costurile. Hai să recapitulăm cele trei idei principale.",
        narrationTts: "Unind logistica inputurilor, finanțarea inteligentă și precizia digitală, AgriCavăr îi ajută pe fermieri să crească producția și să reducă costurile. Hai să recapitulăm cele trei idei principale.",
        content: {
          goal: "Înțelege cum modelul integrat Agricover transformă agricultura sezonieră într-o afacere bazată pe date.",
          steps: [
            {
              number: "01",
              title: "Lanț de Aprovizionare Solid",
              text: "Acces direct la semințe, produse de protecție și nutriție de top, livrate rapid în toate județele.",
              tts: "Lanț de Aprovizionare Solid. Acces direct la semințe, produse de protecție și nutriție de top, livrate rapid în toate județele."
            },
            {
              number: "02",
              title: "Flexibilitate Financiară",
              text: "Lichiditate rapidă, adaptată ciclului agricol, prin Agricover Credit IFN și Cardul Fermierului.",
              tts: "Flexibilitate Financiară. Lichiditate rapidă, adaptată ciclului agricol, prin AgriCavăr Credit I F N și Cardul Fermierului."
            },
            {
              number: "03",
              title: "Agricultură Digitală de Precizie",
              text: "Informații în timp real cu Crop360, pentru costuri optime la hectar și standarde europene de sustenabilitate.",
              tts: "Agricultură Digitală de Precizie. Informații în timp real cu Crop trei sute șaizeci, pentru costuri optime la hectar și standarde europene de sustenabilitate."
            }
          ],
          reward: "Alături de Agricover: sprijinim ferma românească modernă, de la semănat până la recoltă."
        }
      }
    ]
  };
})();
