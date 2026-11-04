window.PRESENTATION_DATA = {
  id: "html-basics",
  format: "desktop",
  lang: "ro",
  sfx: true,
  title: "HTML: Limba Secretă a Paginilor Web",
  subtitle: "Construiește prima ta pagină în 10 minute",
  theme: {
    accent: "#ff7a3d",
    accentGlow: "rgba(255, 122, 61, 0.32)",
    badgeColor: "#fbbf24"
  },
  slides: [
    {
      id: "slide-01",
      type: "hero",
      badge: "MODULUL 1 • INTRODUCERE",
      title: "HTML: Limba Secretă a Web-ului",
      subtitle: "Fiecare site pe care l-ai văzut vreodată e scris în HTML",
      audio: "audio/slide-01.mp3",
      narration: "Salutare! Știai că fiecare pagină de internet, de la YouTube până la Wikipedia, este construită cu aceeași limbă secretă? Se numește HTML, și azi o să înveți să o vorbești și tu!",
      narrationTts: "Salutare! Știai că fiecare pagină de internet, de la Iutub până la Uichipidia, este construită cu aceeași limbă secretă? Se numește, H T M L, și azi o să înveți să o vorbești și tu!",
      content: {
        highlights: [
          { icon: "🧱", title: "Cărămizi de pagină", text: "Titluri, paragrafe, poze și linkuri se pun ca piesele de LEGO.", tts: "Cărămizi de pagină. Titluri, paragrafe, poze și linkuri se pun ca piesele de lego." },
          { icon: "🏷️", title: "Etichete magice", text: "Fiecare piesă are o etichetă care îi spune browserului ce este.", tts: "Etichete magice. Fiecare piesă are o etichetă care îi spune browserului ce este." },
          { icon: "🌍", title: "Merge oriunde", text: "Aceeași pagină se vede pe telefon, tabletă sau calculator.", tts: "Merge oriunde. Aceeași pagină se vede pe telefon, tabletă sau calculator." }
        ]
      }
    },
    {
      id: "slide-02",
      type: "cards",
      badge: "CONCEPT CHEIE",
      title: "Tagurile sunt ca niște cutii",
      subtitle: "Deschizi cutia, pui ceva în ea, apoi o închizi",
      audio: "audio/slide-02.mp3",
      narration: "Imaginează-ți o cutie cu o etichetă pe ea. Deschizi cutia, pui înăuntru un text, apoi o închizi la loc. Exact așa funcționează tagurile în HTML: un tag de deschidere, conținutul, și un tag de închidere.",
      content: {
        cards: [
          { icon: "📦", tag: "PASUL 1", title: "Deschizi cutia: <p>", text: "Tagul de deschidere spune: de aici începe un paragraf.", tts: "Deschizi cutia. Tagul de deschidere spune: de aici începe un paragraf." },
          { icon: "✏️", tag: "PASUL 2", title: "Pui conținutul", text: "Textul dintre taguri este ce vede cititorul pe ecran.", tts: "Pui conținutul. Textul dintre taguri este ce vede cititorul pe ecran." },
          { icon: "🔒", tag: "PASUL 3", title: "Închizi cutia: </p>", text: "Tagul de închidere are o bară oblică în față.", tts: "Închizi cutia. Tagul de închidere are o bară oblică în față." }
        ]
      }
    },
    {
      id: "slide-03",
      type: "code",
      badge: "PRIMA TA PAGINĂ",
      title: "Așa arată o pagină întreagă",
      subtitle: "Apasă → ca să descoperi fiecare bucată",
      audio: "audio/slide-03.mp3",
      narration: "Uite o pagină web completă, are doar șapte rânduri! Pare complicat la prima vedere, dar o luăm pe bucăți. Apasă pe săgeată, și îți arăt ce face fiecare rând, pe rând.",
      content: {
        language: "html",
        filename: "pagina.html",
        code: "<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Salut, lume!</h1>\n    <p>Prima mea pagină.</p>\n  </body>\n</html>",
        steps: [
          { lines: "1", note: "Primul rând îi spune browserului: atenție, urmează o pagină HTML!" },
          { lines: "2,7", note: "Tagul <html> e cutia cea mare care ține toată pagina.", tts: "Tagul html e cutia cea mare care ține toată pagina." },
          { lines: "3,6", note: "În <body> punem tot ce se vede pe ecran.", tts: "În body punem tot ce se vede pe ecran." },
          { lines: "4-5", note: "Un titlu mare cu <h1> și un paragraf cu <p>.", tts: "Un titlu mare cu h unu, și un paragraf cu p." }
        ]
      }
    },
    {
      id: "slide-04",
      type: "quiz",
      badge: "ÎNTREBARE • 1",
      title: "Ce tag face cel mai MARE titlu?",
      subtitle: "Alege un răspuns (sau apasă 1–4)",
      audio: "audio/slide-04.mp3",
      narration: "Hai să vedem dacă ai fost atent! Vrei să scrii un titlu uriaș, cel mai mare de pe pagină. Ce tag alegi? Atinge răspunsul pe care îl crezi corect.",
      content: {
        options: [
          { text: "<p>" },
          { text: "<h1>", correct: true },
          { text: "<h6>" },
          { text: "<img>" }
        ],
        hint: "Titlurile merg de la 1 (cel mai mare) până la 6 (cel mai mic).",
        explanation: "Corect: <h1>! Litera h vine de la heading, adică titlu. Cu cât cifra e mai mică, cu atât titlul e mai mare.",
        explanationTts: "Răspunsul corect este h unu! Litera h vine de la heading, adică titlu. Cu cât cifra e mai mică, cu atât titlul e mai mare."
      }
    },
    {
      id: "slide-05",
      type: "reveal",
      badge: "CARTONAȘE",
      title: "Ghicește ce face fiecare tag",
      subtitle: "Gândește-te întâi, apoi atinge cartonașul",
      audio: "audio/slide-05.mp3",
      narration: "E timpul pentru cartonașe! Pe fiecare e scris un tag. Încearcă să ghicești ce face, apoi atinge cartonașul ca să-l întorci și să vezi dacă ai avut dreptate.",
      content: {
        cards: [
          { front: "<p>", back: "Un paragraf de text", tts: "p înseamnă un paragraf de text." },
          { front: "<img>", back: "O imagine (o poză)", tts: "img înseamnă o imagine, adică o poză." },
          { front: "<ul>", back: "O listă cu buline", tts: "u l înseamnă o listă cu buline." },
          { front: "<a>", back: "Un link spre altă pagină", tts: "a înseamnă un link spre altă pagină." }
        ]
      }
    },
    {
      id: "slide-06",
      type: "code",
      badge: "LINKURI",
      title: "Cum faci un link",
      subtitle: "Tagul <a> te teleportează pe altă pagină",
      audio: "audio/slide-06.mp3",
      narration: "Linkurile sunt ca niște portaluri magice: dai click pe ele și ajungi imediat pe altă pagină. Uite cum se scrie un link în HTML. Apasă pe săgeată ca să vezi fiecare parte.",
      content: {
        language: "html",
        filename: "link.html",
        code: "<a href=\"https://wikipedia.org\">\n  Mergi la Wikipedia\n</a>",
        steps: [
          { lines: "1", note: "Deschidem tagul a. În href scriem adresa unde ne duce linkul.", tts: "Deschidem tagul a. În h ref scriem adresa unde ne duce linkul." },
          { lines: "2", note: "Textul pe care dai click. Poate fi orice vrei tu!" },
          { lines: "3", note: "Închidem tagul cu </a>. Gata portalul!", tts: "Închidem tagul cu bară a. Gata portalul!" }
        ]
      }
    },
    {
      id: "slide-07",
      type: "input",
      badge: "SCRIE RĂSPUNSUL • 2",
      title: "Ce literă are tagul pentru link?",
      subtitle: "Scrie răspunsul și apasă Enter",
      audio: "audio/slide-07.mp3",
      narration: "Acum scrii tu! Tocmai am văzut cum se face un portal spre altă pagină. Ce literă folosim pentru tagul de link? Scrie-o în căsuță și apasă Enter.",
      content: {
        placeholder: "Scrie litera aici…",
        answers: ["a", "<a>"],
        hint: "Este prima literă din alfabet!",
        explanation: "Bravo: tagul <a>! Vine de la anchor, adică ancoră, care leagă pagina ta de altă pagină.",
        explanationTts: "Bravo, tagul a! Vine de la anchor, adică ancoră, care leagă pagina ta de altă pagină."
      }
    },
    {
      id: "slide-08",
      type: "input",
      badge: "SCRIE RĂSPUNSUL • 3",
      title: "Cum se numesc <p>, <a> și <img>?",
      subtitle: "Un singur cuvânt, ai auzit de el de multe ori azi",
      audio: "audio/slide-08.mp3",
      narration: "Ultima întrebare! Toate aceste etichete magice, cu paranteze ascuțite, au un nume special în HTML. Cum se numesc? Scrie cuvântul în căsuță.",
      content: {
        placeholder: "Scrie cuvântul…",
        answers: ["tag", "taguri", "tagurile", "etichetă", "etichete", "etichetele"],
        hint: "Începe cu litera T și are doar trei litere…",
        explanation: "Exact: taguri (în engleză, tags)! Sunt etichetele care îi spun browserului ce este fiecare bucată din pagină.",
        explanationTts: "Exact, taguri! În engleză, tegs. Sunt etichetele care îi spun browserului ce este fiecare bucată din pagină."
      }
    },
    {
      id: "slide-09",
      type: "compare",
      badge: "GREȘEALA CLASICĂ",
      title: "Nu lăsa cutia deschisă!",
      subtitle: "Cea mai des întâlnită greșeală a începătorilor",
      audio: "audio/slide-09.mp3",
      narration: "Atenție la cea mai des întâlnită greșeală! Dacă uiți să închizi un tag, browserul se încurcă, și tot restul paginii poate arăta ciudat. Închide mereu cutia pe care ai deschis-o!",
      content: {
        left: {
          tag: "❌ AȘA NU",
          title: "<p>Salut! (fără închidere)",
          points: [
            "Browserul nu știe unde se termină paragraful.",
            "Restul paginii poate fi stricat.",
            "Greșeala e greu de găsit mai târziu."
          ]
        },
        right: {
          tag: "✅ AȘA DA",
          title: "<p>Salut!</p>",
          points: [
            "Fiecare tag deschis are perechea lui.",
            "Bara oblică / închide cutia.",
            "Pagina arată exact cum vrei."
          ]
        }
      }
    },
    {
      id: "slide-10",
      type: "mission",
      badge: "MISIUNEA TA • 5 MINUTE",
      title: "Construiește prima ta pagină!",
      subtitle: "Ai nevoie doar de Notepad și un browser",
      audio: "audio/slide-10.mp3",
      narration: "Acum e rândul tău să fii programator adevărat! Deschide aplicația Notepad, scrie pagina pe care ai văzut-o, salveaz-o cu numele pagina punct html, și deschide-o în browser. O să fii uimit!",
      content: {
        goal: "Fă o pagină despre jocul sau animalul tău preferat, cu un titlu și un paragraf.",
        steps: [
          { number: "01", title: "Scrie codul", text: "Deschide Notepad și scrie pagina de 7 rânduri, cu titlul și textul tău." },
          { number: "02", title: "Salvează ca .html", text: "File → Save As, numele pagina.html, tipul All Files.", tts: "Salvează ca html. File, Save As, numele pagina punct html, tipul All Files." },
          { number: "03", title: "Deschide în browser", text: "Dublu-click pe fișier și admiră prima ta pagină web!" }
        ],
        reward: "🏆 Felicitări! Tocmai ai făcut ce fac programatorii web în fiecare zi."
      }
    },
    {
      id: "slide-11",
      type: "results",
      badge: "FINAL",
      title: "Gata, ai terminat!",
      subtitle: "Uite cum te-ai descurcat la întrebări",
      audio: "audio/slide-11.mp3",
      narration: "Felicitări, ai ajuns la final! Aici vezi la câte întrebări ai răspuns corect din prima încercare. Oricare ar fi scorul, acum știi mai mult HTML decât știai acum zece minute!",
      content: {
        icon: "🏆",
        tiers: [
          { min: 1, text: "Campion HTML! Toate din prima! 🥇" },
          { min: 0.6, text: "Foarte bine, aproape perfect! 🎉" },
          { min: 0, text: "Bun început! Mai încearcă o dată. 💪" }
        ]
      }
    }
  ]
};
