/* Exersăm pentru Evaluarea Națională – logica paginii (fără build, fără server). */
(function () {
  'use strict';
  const R = String.raw;

  const URL_VI_2025 = 'https://subiecte.edu.ro/2025/evaluarenationala6/teste/EN_VI_2025_Matematica_si_stiinte_.zip';
  const URL_VI_2024 = 'https://subiecte.edu.ro/2024/evaluarenationala6/teste/EN_VI_2024_Matematica_si_stiinte.zip';
  const URL_VIII_2025 = 'https://subiecte.edu.ro/2025/evaluarenationala/Subiecte_si_bareme/EN_VIII_2025_Matematica.zip';
  const URL_VIII_2026 = 'https://mateinfo.ro/evaluare-nationala-matematica/examene-matematica-gimnaziu/variante-evaluare-nationala-matematica/subiecte-evaluare-nationala-la-matematica-2026/2144-subiect-oficial-evaluare-nationala-24-06-2026';

  const SOL_VI = 'Rezolvare propusă de noi (pentru clasa a VI-a Ministerul nu publică barem), verificată prin calcul.';
  const SOL_VIII = 'Pașii urmează baremul oficial de evaluare și de notare.';
  const SOL_VIII_GRILA = 'Baremul oficial dă doar litera corectă; pașii de calcul sunt explicația noastră.';

  const DELTA_CONTEXT = R`<p>Pentru studierea comportamentului păsărilor din Delta Dunării, elevii au ales mai multe locuri de observație. În schița din figura alăturată, în punctele \(A, B, C, D, E\) și \(F\) sunt poziționate locurile de observație alese.</p>
<p>Punctele \(A\), \(B\) și \(C\) sunt coliniare, triunghiul \(ABD\) este isoscel, cu \(AB = AD\) și măsura unghiului \(ABD\) egală cu \(30^\circ\), iar punctul \(F\) este mijlocul segmentului \(BD\). Triunghiul \(BCE\) este dreptunghic în \(E\) și dreptele \(BD\) și \(CE\) sunt paralele.</p>`;

  const LAKES_TABLE = R`<table><tr><th>Caracteristici</th><th>Lacul Fortuna</th><th>Lacul Gorgova</th><th>Lacul Puiu</th><th>Lacul Uzlina</th></tr>
<tr><th>aria suprafeței (ha)</th><td>978</td><td>1377</td><td>860</td><td>508</td></tr>
<tr><th>adâncimea maximă (cm)</th><td>280</td><td>250</td><td>230</td><td>120</td></tr></table>`;

  const PROBLEMS = [
    /* ---------------- CLASA a VI-a ---------------- */
    {
      id: 'vi25-2', grade: 6, source: 'EN VI 2025, Matematică și științe, item 2', url: URL_VI_2025,
      statement: R`<p>În timpul excursiei în Delta Dunării, elevii au notat într-un tabel informații despre lacurile vizitate:</p>${''}` + LAKES_TABLE +
        R`<p>Conform informațiilor din tabel, aria suprafeței lacului Uzlina este mai mică decât aria suprafeței lacului Puiu cu:</p>`,
      parts: [{ type: 'mc', options: ['A. 352 ha', 'B. 362 ha', 'C. 508 ha', 'D. 1368 ha'], correct: 0 }],
      hint: 'Găsește în tabel aria lacului Puiu și aria lacului Uzlina. „Mai mică cu” înseamnă o scădere.',
      solNote: SOL_VI,
      solution: [R`Aria lacului Puiu: \(860\ \text{ha}\). Aria lacului Uzlina: \(508\ \text{ha}\).`, R`\(860 - 508 = 352\ \text{ha}\).`, 'Răspuns: A.']
    },
    {
      id: 'vi25-4', grade: 6, source: 'EN VI 2025, Matematică și științe, item 4', url: URL_VI_2025,
      statement: R`<p>Elevii au observat că timpul necesar traversării lacului Uzlina cu o barcă ce avea viteza constantă de \(5\ \text{km/h}\) este de 24 de minute. Calculează lungimea traseului parcurs de barcă în acest timp. Exprimă rezultatul în metri.</p>`,
      parts: [{ type: 'num', correct: 2000, tol: 0.5, unit: 'm' }],
      hint: 'Transformă 24 de minute în ore (o oră are 60 de minute). Apoi distanța = viteza × timpul.',
      solNote: SOL_VI,
      solution: [R`\(t = 24\ \text{min} = \dfrac{24}{60}\ \text{h} = 0{,}4\ \text{h}\).`, R`\(d = v \cdot t = 5 \cdot 0{,}4 = 2\ \text{km}\).`, R`\(2\ \text{km} = 2000\ \text{m}\).`]
    },
    {
      id: 'vi25-6', grade: 6, source: 'EN VI 2025, Matematică și științe, item 6', url: URL_VI_2025,
      adapt: 'Adaptat: cerința originală este „Arată că măsura unghiului EBC este egală cu 60°”; aici întrebăm cât este.',
      statement: DELTA_CONTEXT + R`<p><b>Cât este măsura unghiului \(EBC\)?</b></p>`,
      fig: { id: 'figDelta', h: 270, cap: 'Figură interactivă: trage punctul C pe dreaptă. Unghiul EBC se schimbă? Calculează-l.' },
      parts: [{ type: 'num', correct: 60, tol: 0.01, unit: '°' }],
      hint: R`Unghiurile \(ABD\) și \(DBC\) sunt suplementare (A, B, C sunt coliniare). Apoi folosește paralelele \(BD \parallel CE\) tăiate de secanta \(BC\).`,
      solNote: SOL_VI,
      solution: [R`\(A, B, C\) coliniare \(\Rightarrow \angle ABD + \angle DBC = 180^\circ \Rightarrow \angle DBC = 150^\circ\).`,
        R`\(BD \parallel CE\), cu secanta \(BC\): \(\angle DBC\) și \(\angle BCE\) sunt unghiuri interne de aceeași parte a secantei, deci suplementare \(\Rightarrow \angle BCE = 30^\circ\).`,
        R`În triunghiul \(BCE\), \(\angle BEC = 90^\circ\), deci \(\angle EBC = 180^\circ - 90^\circ - 30^\circ = 60^\circ\).`]
    },
    {
      id: 'vi25-7', grade: 6, source: 'EN VI 2025, Matematică și științe, item 7', url: URL_VI_2025,
      statement: R`<p>(Aceeași schiță ca la problema anterioară.)</p><p>Știind că \(AB = 2 \cdot BC\) și că distanța dintre punctele \(B\) și \(E\) este de \(50\ \text{m}\), calculează distanța dintre punctele \(A\) și \(F\).</p>`,
      parts: [{ type: 'num', correct: 100, tol: 0.01, unit: 'm' }],
      hint: R`În triunghiul dreptunghic \(BCE\), unghiul \(C\) are \(30^\circ\). Ce știi despre cateta opusă unghiului de \(30^\circ\)? Apoi: în triunghiul isoscel \(ABD\), mediana \(AF\) este și înălțime.`,
      solNote: SOL_VI,
      solution: [R`Din problema anterioară, \(\angle BCE = 30^\circ\). În \(\triangle BCE\) dreptunghic în \(E\), cateta opusă unghiului de \(30^\circ\) este jumătate din ipotenuză: \(BE = \dfrac{BC}{2} \Rightarrow BC = 100\ \text{m}\).`,
        R`\(AB = 2 \cdot BC = 200\ \text{m}\).`,
        R`\(\triangle ABD\) isoscel (\(AB = AD\)) și \(F\) mijlocul lui \(BD\) \(\Rightarrow AF\) este mediană, deci și înălțime: \(AF \perp BD\).`,
        R`În \(\triangle AFB\) dreptunghic în \(F\), \(\angle ABF = 30^\circ \Rightarrow AF = \dfrac{AB}{2} = 100\ \text{m}\).`]
    },
    {
      id: 'vi25-11', grade: 6, source: 'EN VI 2025, Matematică și științe, item 11', url: URL_VI_2025,
      statement: R`<p>Elevii au parcurs traseul de la pensiune către lacul Puiu în trei etape. În prima etapă au parcurs \(50\%\) din distanță, în a doua etapă au parcurs o treime din distanța rămasă, iar în cea de-a treia etapă au parcurs ultimii \(8\ \text{km}\) din lungimea traseului.</p><p>Pentru realizarea unui jurnal, pe tot parcursul călătoriei, elevii au fotografiat peisajele înconjurătoare. Știind că în jurnal vor fi câte 5 fotografii pentru fiecare kilometru din lungimea traseului, determină numărul total de fotografii din jurnal.</p>`,
      parts: [{ type: 'num', correct: 120, tol: 0.01, unit: 'fotografii' }],
      hint: R`După prima etapă rămâne jumătate din traseu. O treime din această jumătate înseamnă \(\frac{1}{6}\) din traseu. Ce fracție din traseu reprezintă cei 8 km?`,
      solNote: SOL_VI,
      solution: [R`Etapa 1: \(50\% = \dfrac{1}{2}\) din traseu; rămâne \(\dfrac{1}{2}\).`, R`Etapa 2: \(\dfrac{1}{3} \cdot \dfrac{1}{2} = \dfrac{1}{6}\) din traseu.`,
        R`Etapa 3: \(1 - \dfrac{1}{2} - \dfrac{1}{6} = \dfrac{1}{3}\) din traseu \(= 8\ \text{km}\), deci traseul are \(3 \cdot 8 = 24\ \text{km}\).`, R`Fotografii: \(24 \cdot 5 = 120\).`]
    },
    {
      id: 'vi24-6', grade: 6, source: 'EN VI 2024, Matematică și Științe ale naturii, Test 1, itemii 6–7', url: URL_VI_2024,
      adapt: 'Adaptat: la itemul 6, cerința „Arată că măsura arcului mic AC este egală cu 60°” a devenit întrebare.',
      statement: R`<p>Fiecare elev a pornit din punctul \(C\) și a parcurs traseul \(C - A - O - B\). În figură, punctele \(A\), \(B\) și \(C\) sunt situate pe cercul de centru \(O\) astfel încât punctele \(B\) și \(C\) sunt diametral opuse și măsura arcului mic \(AB\) este egală cu \(120^\circ\).</p>`,
      fig: { id: 'figCircle', cap: 'Figură interactivă: trage punctul A pe cerc. Poziția din problemă: arcul mic AB = 120°.' },
      parts: [
        { q: R`a) (item 6) Cât este măsura arcului mic \(AC\)?`, type: 'num', correct: 60, tol: 0.01, unit: '°' },
        { q: R`b) (item 7) Știind că raza cercului este egală cu \(20\ \text{m}\), determină lungimea traseului \(C - A - O - B\).`, type: 'num', correct: 60, tol: 0.01, unit: 'm' }
      ],
      hint: R`B și C diametral opuse: arcul de la B la C (prin A) are \(180^\circ\). Pentru b): cum arată triunghiul \(AOC\) dacă \(\angle AOC = 60^\circ\) și \(OA = OC\)?`,
      solNote: SOL_VI,
      solution: [R`\(BC\) diametru \(\Rightarrow\) arcul \(BAC\) are \(180^\circ\), deci arcul mic \(AC = 180^\circ - 120^\circ = 60^\circ\).`,
        R`Unghiul la centru \(AOC\) are măsura arcului: \(\angle AOC = 60^\circ\).`,
        R`\(OA = OC = 20\ \text{m}\) (raze) \(\Rightarrow \triangle AOC\) isoscel cu un unghi de \(60^\circ\), deci echilateral: \(CA = 20\ \text{m}\).`,
        R`Traseul: \(CA + AO + OB = 20 + 20 + 20 = 60\ \text{m}\).`]
    },
    {
      id: 'vi24-11', grade: 6, source: 'EN VI 2024, Matematică și Științe ale naturii, Test 1, item 11', url: URL_VI_2024,
      statement: R`<p>Pentru a realiza un album al taberei, elevii au stabilit că este necesară o bază de date cu 1500 de fotografii, care să surprindă aspecte legate de floră, faună și peisaje. Fotografiile referitoare la floră reprezintă o treime din numărul total de fotografii, cele referitoare la faună reprezintă \(25\%\) din rest, iar cele rămase surprind peisaje din Parcul Natural Munții Maramureșului.</p><p>Știind că pentru a realiza 250 de fotografii cu peisaje elevii au nevoie de 1 oră, determină câte ore sunt necesare elevilor pentru a realiza numărul stabilit de fotografii cu peisaje.</p>`,
      parts: [{ type: 'num', correct: 3, tol: 0.001, unit: 'ore' }],
      hint: 'Atenție: 25% se calculează din REST (ce rămâne după floră), nu din 1500.',
      solNote: SOL_VI,
      solution: [R`Floră: \(\dfrac{1}{3} \cdot 1500 = 500\); restul: \(1500 - 500 = 1000\).`, R`Faună: \(25\% \cdot 1000 = 250\).`,
        R`Peisaje: \(1000 - 250 = 750\) de fotografii.`, R`Timp: \(750 : 250 = 3\) ore.`]
    },
    {
      id: 'vi24-4', grade: 6, source: 'EN VI 2024, Matematică și Științe ale naturii, Test 1, item 4', url: URL_VI_2024,
      statement: R`<p>Elevii au mers cu Mocănița și au parcurs traseul turistic cu lungimea de \(21{,}6\ \text{km}\), pe Valea Vaserului până la stația Paltinul, în 120 de minute. Calculează valoarea vitezei medii. Exprimă rezultatul în \(\text{m/s}\).</p>`,
      parts: [{ type: 'num', correct: 3, tol: 0.001, unit: 'm/s' }],
      hint: 'Transformă totul în metri și secunde: 1 km = 1000 m, 1 min = 60 s.',
      solNote: SOL_VI,
      solution: [R`\(d = 21{,}6\ \text{km} = 21\,600\ \text{m}\); \(t = 120\ \text{min} = 7200\ \text{s}\).`, R`\(v = \dfrac{d}{t} = \dfrac{21\,600}{7200} = 3\ \text{m/s}\).`]
    },

    /* ---------------- CLASA a VIII-a ---------------- */
    {
      id: 'viii25-I5', grade: 8, source: 'EN VIII 2025, Matematică, Varianta 7, Subiectul I, item 5', url: URL_VIII_2025,
      statement: R`<p>Patru elevi, Ana, Maria, Dan și Vlad, calculează suma numerelor \(a = \sqrt{3^2 + 4^2}\) și \(b = \sqrt{3^2 \cdot 4^2}\). Rezultatele obținute sunt prezentate în tabelul de mai jos:</p>
<table><tr><th>Ana</th><th>Maria</th><th>Dan</th><th>Vlad</th></tr><tr><td>17</td><td>19</td><td>37</td><td>43</td></tr></table>
<p>Conform informațiilor din tabel, rezultatul corect a fost obținut de:</p>`,
      parts: [{ type: 'mc', options: ['a) Ana', 'b) Maria', 'c) Dan', 'd) Vlad'], correct: 0 }],
      hint: R`Calculează întâi ce e sub radical. Atenție: \(\sqrt{9+16}\) NU este \(3+4\).`,
      solNote: SOL_VIII_GRILA,
      solution: [R`\(a = \sqrt{9 + 16} = \sqrt{25} = 5\).`, R`\(b = \sqrt{9 \cdot 16} = \sqrt{144} = 12\).`, R`\(a + b = 17\) \(\Rightarrow\) Ana. Baremul oficial: a).`]
    },
    {
      id: 'viii25-II2', grade: 8, source: 'EN VIII 2025, Matematică, Varianta 7, Subiectul al II-lea, item 2', url: URL_VIII_2025,
      statement: R`<p>În figura alăturată sunt reprezentate unghiurile adiacente \(AOB\) și \(BOC\), \(\angle BOC = 2 \cdot \angle AOB\). Măsura unghiului \(AOC\) este egală cu \(120^\circ\) și semidreapta \(OM\) este bisectoarea unghiului \(BOC\). Măsura unghiului \(AOM\) este egală cu:</p>`,
      fig: { id: 'figAngles', cap: 'Figură interactivă: trage punctul B până când ∠BOC = 2 · ∠AOB.' },
      parts: [{ type: 'mc', options: [R`a) \(30^\circ\)`, R`b) \(40^\circ\)`, R`c) \(60^\circ\)`, R`d) \(80^\circ\)`], correct: 3 }],
      hint: R`Notează \(\angle AOB = x\). Atunci \(\angle BOC = 2x\) și \(x + 2x = 120^\circ\).`,
      solNote: SOL_VIII_GRILA,
      solution: [R`\(\angle AOB + \angle BOC = 120^\circ\) și \(\angle BOC = 2\angle AOB \Rightarrow 3\angle AOB = 120^\circ \Rightarrow \angle AOB = 40^\circ,\ \angle BOC = 80^\circ\).`,
        R`\(OM\) bisectoare \(\Rightarrow \angle BOM = 40^\circ\).`, R`\(\angle AOM = \angle AOB + \angle BOM = 40^\circ + 40^\circ = 80^\circ\). Baremul oficial: d).`]
    },
    {
      id: 'viii25-II6', grade: 8, source: 'EN VIII 2025, Matematică, Varianta 7, Subiectul al II-lea, item 6', url: URL_VIII_2025,
      statement: R`<p>În figura alăturată este reprezentat conul circular drept cu secțiunea axială triunghiul echilateral \(VAB\), cu \(AB = 6\ \text{cm}\). Aria laterală a conului este egală cu:</p>`,
      fig: { id: 'figCone', cap: 'Conul, cu secțiunea axială VAB (triunghi echilateral).' },
      parts: [{ type: 'mc', options: [R`a) \(18\pi\ \text{cm}^2\)`, R`b) \(27\pi\ \text{cm}^2\)`, R`c) \(36\pi\ \text{cm}^2\)`, R`d) \(54\pi\ \text{cm}^2\)`], correct: 0 }],
      hint: R`Aria laterală a conului: \(A_l = \pi \cdot R \cdot G\). \(AB\) este diametrul bazei, iar \(VA\) este generatoarea.`,
      solNote: SOL_VIII_GRILA,
      solution: [R`\(AB\) este diametrul bazei \(\Rightarrow R = 3\ \text{cm}\).`, R`\(\triangle VAB\) echilateral \(\Rightarrow G = VA = AB = 6\ \text{cm}\).`, R`\(A_l = \pi R G = \pi \cdot 3 \cdot 6 = 18\pi\ \text{cm}^2\). Baremul oficial: a).`]
    },
    {
      id: 'viii25-III1', grade: 8, source: 'EN VIII 2025, Matematică, Varianta 7, Subiectul al III-lea, item 1', url: URL_VIII_2025,
      statement: R`<p>Ana a cumpărat de la o librărie caiete, pixuri și creioane. Prețul unui pix este egal cu \(75\%\) din prețul unui caiet, iar prețul unui creion este egal cu \(40\%\) din prețul unui pix.</p>`,
      parts: [
        { q: 'a) Este posibil ca prețul a opt pixuri să fie egal cu prețul a cinci caiete? (Justifică pe hârtie.)', type: 'mc', options: ['Da', 'Nu'], correct: 1 },
        { q: 'b) Dacă Ana a plătit pentru trei caiete, patru pixuri și cinci creioane suma de 45 de lei, determină prețul unui caiet.', type: 'num', correct: 6, tol: 0.001, unit: 'lei' }
      ],
      hint: R`Notează cu \(x\) prețul unui caiet. Pixul costă \(\frac{3}{4}x\), iar creionul \(\frac{40}{100}\cdot\frac{3}{4}x\).`,
      solNote: SOL_VIII,
      solution: [R`a) Prețul unui pix este \(\dfrac{75}{100} \cdot x = \dfrac{3}{4}x\), unde \(x\) este prețul unui caiet.`,
        R`Opt pixuri costă \(8 \cdot \dfrac{3}{4}x = 6x\) și, cum \(6x \ne 5x\), nu este posibil.`,
        R`b) Prețul unui creion este \(\dfrac{40}{100} \cdot \dfrac{3}{4}x = \dfrac{3}{10}x\).`,
        R`\(3x + 4 \cdot \dfrac{3}{4}x + 5 \cdot \dfrac{3}{10}x = 45\).`, R`\(15x = 90 \Rightarrow x = 6\), deci un caiet costă 6 lei.`]
    },
    {
      id: 'viii25-III3', grade: 8, source: 'EN VIII 2025, Matematică, Varianta 7, Subiectul al III-lea, item 3', url: URL_VIII_2025,
      adapt: 'Adaptat: la b), cerința originală este „Arată că perimetrul triunghiului ABC este egal cu 4(√5 + 1)”; aici îl calculezi tu.',
      statement: R`<p>Se consideră funcția \(f : \mathbb{R} \to \mathbb{R}\), \(f(x) = 2x - 4\).</p>`,
      fig: { id: 'figGraph', cap: 'Graficul funcției f și triunghiul ABC.' },
      parts: [
        { q: R`a) Calculează \(f(2) - f(0)\). (Original: „Arată că \(f(2) - f(0) = 4\)”.)`, type: 'num', correct: 4, tol: 0.001 },
        { q: R`b) Reprezentarea geometrică a graficului funcției \(f\) intersectează axele \(Ox\) și \(Oy\) în punctele \(A\), respectiv \(B\). Punctul \(C\) este simetricul punctului \(A\) față de axa \(Oy\). Calculează perimetrul triunghiului \(ABC\). (poți scrie cu √, de ex. 4(√5+1))`, type: 'num', correct: 4 * (Math.sqrt(5) + 1), tol: 0.01 }
      ],
      hint: R`Intersecția cu \(Ox\): rezolvă \(f(x) = 0\). Intersecția cu \(Oy\): calculează \(f(0)\). Pentru laturile oblice, folosește teorema lui Pitagora.`,
      solNote: SOL_VIII,
      solution: [R`a) \(f(2) = 0\), \(f(0) = -4\), deci \(f(2) - f(0) = 0 - (-4) = 4\).`,
        R`b) \(A(2, 0)\), \(B(0, -4)\).`, R`\(C\) simetricul lui \(A\) față de \(Oy\) \(\Rightarrow OC = OA = 2\), deci \(CA = 4\).`,
        R`\(AB = BC = \sqrt{2^2 + 4^2} = 2\sqrt{5}\), deci \(P_{\triangle ABC} = 2\sqrt5 + 2\sqrt5 + 4 = 4(\sqrt5 + 1) \approx 12{,}94\).`]
    },
    {
      id: 'viii25-III5', grade: 8, source: 'EN VIII 2025, Matematică, Varianta 7, Subiectul al III-lea, item 5', url: URL_VIII_2025,
      adapt: 'Adaptat: la a), cerința originală este „Arată că BC = 4√2 cm”; aici o calculezi.',
      statement: R`<p>În figura alăturată este reprezentat trapezul dreptunghic \(ABCD\), cu \(AB \parallel DC\), \(\angle DAB = 90^\circ\), \(AB = 8\ \text{cm}\) și \(AD = DC = 4\ \text{cm}\). Punctul \(M\) este mijlocul segmentului \(DC\) și \(P\) este punctul de intersecție a dreptelor \(AM\) și \(BD\).</p>`,
      fig: { id: 'figTrapez', cap: 'Trapezul dreptunghic ABCD; patrulaterul MPBC este colorat.' },
      parts: [
        { q: R`a) Calculează lungimea segmentului \(BC\) (în cm; poți scrie 4√2).`, type: 'num', correct: 4 * Math.SQRT2, tol: 0.01, unit: 'cm' },
        { q: R`b) Calculează aria patrulaterului \(MPBC\).`, type: 'num', correct: 7.2, tol: 0.001, unit: 'cm²' }
      ],
      hint: R`a) Coboară înălțimea din \(C\) pe \(AB\). b) \(DM \parallel AB\), deci triunghiurile \(DPM\) și \(BPA\) sunt asemenea. Aria \(MPBC\) = aria \(ABCM\) − aria \(APB\).`,
      solNote: SOL_VIII,
      solution: [R`a) \(CN \perp AB\), \(N \in AB\), deci \(CN = 4\ \text{cm}\) și \(NB = 4\ \text{cm}\); \(BC^2 = CN^2 + BN^2 \Rightarrow BC = 4\sqrt2\ \text{cm}\).`,
        R`b) \(DM \parallel AB \Rightarrow \triangle DPM \sim \triangle BPA\), deci \(\dfrac{PM}{PA} = \dfrac{DM}{BA} = \dfrac{1}{4}\).`,
        R`\(EF \perp AB\), \(P \in EF\), \(E \in CD\), \(F \in AB\): \(\triangle PME \sim \triangle PAF \Rightarrow \dfrac{PE}{PF} = \dfrac{1}{4}\), de unde \(PF = \dfrac{16}{5}\ \text{cm}\), deci \(A_{\triangle APB} = \dfrac{AB \cdot PF}{2} = \dfrac{64}{5}\ \text{cm}^2\).`,
        R`\(A_{ABCM} = 20\ \text{cm}^2\), deci \(A_{MPBC} = 20 - \dfrac{64}{5} = \dfrac{36}{5} = 7{,}2\ \text{cm}^2\).`]
    },
    {
      id: 'viii25-III6', grade: 8, source: 'EN VIII 2025, Matematică, Varianta 7, Subiectul al III-lea, item 6', url: URL_VIII_2025,
      statement: R`<p>În figura alăturată este reprezentat cubul \(ABCDA'B'C'D'\), cu \(AB = 8\ \text{cm}\). Dreptele \(AC\) și \(BD\) se intersectează în punctul \(O\), iar dreptele \(A'B\) și \(AB'\) se intersectează în punctul \(E\). Punctul \(F\) este mijlocul segmentului \(CC'\).</p>`,
      fig: { id: 'figCube', cap: 'Cubul (desen în perspectivă). Verde: FO; galben: DE.' },
      parts: [
        { q: R`a) Calculează volumul cubului (original: „Arată că volumul este egal cu \(512\ \text{cm}^3\)”).`, type: 'num', correct: 512, tol: 0.001, unit: 'cm³' },
        { q: R`b) Demonstrează că dreptele \(FO\) și \(DE\) sunt perpendiculare.`, type: 'proof' }
      ],
      hint: R`b) \(FO\) este linie mijlocie în triunghiul \(ACC'\), deci \(FO \parallel AC'\). E suficient să arăți că \(AC' \perp DE\).`,
      solNote: SOL_VIII,
      solution: [R`a) \(V = AB^3 = 8^3 = 512\ \text{cm}^3\).`,
        R`b) \(FO\) este linie mijlocie în \(\triangle ACC' \Rightarrow FO \parallel AC'\), deci \(\angle(FO, DE) = \angle(AC', DE)\).`,
        R`\(AB' \parallel DC'\) \(\Rightarrow \triangle AQE \sim \triangle C'QD\), unde \(\{Q\} = DE \cap AC'\): \(\dfrac{AQ}{C'Q} = \dfrac{QE}{QD} = \dfrac{AE}{C'D} = \dfrac12\), deci \(QD = \dfrac23 DE\) și \(C'Q = \dfrac23 C'A\).`,
        R`\(DE = 4\sqrt6\ \text{cm}\), \(C'A = 8\sqrt3\ \text{cm} \Rightarrow QD = \dfrac{8\sqrt6}{3}\ \text{cm}\), \(C'Q = \dfrac{16\sqrt3}{3}\ \text{cm}\); \(C'D = 8\sqrt2\ \text{cm}\).`,
        R`\(QD^2 + C'Q^2 = \dfrac{384}{9} + \dfrac{768}{9} = 128 = C'D^2 \Rightarrow \angle DQC' = 90^\circ\) (reciproca teoremei lui Pitagora), deci \(FO \perp DE\).`]
    },
    {
      id: 'viii26-III1', grade: 8, source: 'EN VIII 2026, Matematică, Varianta 1, Subiectul al III-lea, item 1', url: URL_VIII_2026,
      statement: R`<p>Mai mulți copii doresc să cumpere împreună o minge. Dacă fiecare copil contribuie cu câte 18 lei, mai sunt necesari 30 de lei.</p>`,
      parts: [
        { q: 'a) Este posibil ca mingea să coste 153 de lei? (Justifică pe hârtie.)', type: 'mc', options: ['Da', 'Nu'], correct: 1 },
        { q: 'b) Dacă fiecare copil contribuie cu câte 24 de lei, atunci sunt în plus 12 lei. Determină cât costă mingea.', type: 'num', correct: 156, tol: 0.001, unit: 'lei' }
      ],
      hint: R`Notează cu \(n\) numărul de copii. Prețul mingii este \(18n + 30\). Numărul de copii trebuie să fie număr natural!`,
      solNote: SOL_VIII,
      solution: [R`a) Prețul mingii este \(18n + 30\), unde \(n\) este numărul de copii.`, R`\(18n + 30 = 153 \Rightarrow n = \dfrac{123}{18}\), care nu este număr natural, deci nu este posibil.`,
        R`b) \(18n + 30 = 24n - 12\).`, R`\(6n = 42 \Rightarrow n = 7\).`, R`Mingea costă \(18 \cdot 7 + 30 = 156\) de lei.`]
    }
  ];

  /* ---------- verificarea răspunsurilor numerice ---------- */
  function parseNum(raw) {
    if (raw == null) return NaN;
    let s = String(raw).trim().toLowerCase().replace(/\s+/g, '');
    s = s.replace(/(cm²|cm\^2|cm2|cm³|cm\^3|cm3|m\/s|km|cm|m|lei|ore|ora|h|fotografii|°|grade)$/i, '');
    s = s.replace(/,/g, '.').replace(/[·×]/g, '*').replace(/:/g, '/').replace(/π/g, 'pi');
    s = s.replace(/√\(/g, 'sqrt(').replace(/√(\d+(?:\.\d+)?)/g, 'sqrt($1)');
    s = s.replace(/(\d|\))(?=(sqrt|pi|\())/g, '$1*');
    if (!s || s.replace(/sqrt|pi/g, '').match(/[^0-9.+\-*/()]/)) return NaN;
    const expr = s.replace(/sqrt/g, 'Math.sqrt').replace(/pi/g, 'Math.PI');
    try { const v = Function('"use strict";return (' + expr + ');')(); return typeof v === 'number' ? v : NaN; }
    catch (e) { return NaN; }
  }

  /* ---------- scor ---------- */
  const STORE = 'en-practice-solved-v1';
  let solved = new Set();
  try { solved = new Set(JSON.parse(localStorage.getItem(STORE) || '[]')); } catch (e) { /* ignorăm */ }
  let total = 0;
  function saveScore() {
    document.getElementById('score').textContent = solved.size;
    document.getElementById('total').textContent = total;
    try { localStorage.setItem(STORE, JSON.stringify([...solved])); } catch (e) { /* ignorăm */ }
  }

  /* ---------- construirea cardurilor ---------- */
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function buildCard(p, n) {
    const card = el('article', 'card'); card.id = p.id;
    const src = el('a', 'src', p.source); src.href = p.url; src.target = '_blank'; src.rel = 'noopener';
    card.append(src, el('h3', null, 'Problema ' + n));
    if (p.adapt) card.append(el('p', 'adapt', '✎ ' + p.adapt));
    card.append(el('div', 'statement', p.statement));
    if (p.fig) {
      const f = el('div', 'fig');
      const box = el('div', 'jxgbox'); box.id = p.fig.id; if (p.fig.h) box.style.height = p.fig.h + 'px';
      f.append(box, el('div', 'live', ''), el('div', 'cap', p.fig.cap));
      f.querySelector('.live').id = p.fig.id + '-live';
      card.append(f);
    }
    p.parts.forEach((part, i) => {
      const key = p.id + '#' + i;
      const wrap = el('div', 'part');
      if (part.q) wrap.append(el('p', 'part-q', part.q));
      if (part.type === 'proof') {
        wrap.append(el('p', 'proof-note', 'Demonstrație: scrie-o pe hârtie, apoi compar-o cu rezolvarea de mai jos. (Nu se punctează aici.)'));
        card.append(wrap); return;
      }
      total++;
      const fb = el('div', 'fb');
      let getVal;
      if (part.type === 'mc') {
        const opts = el('div', 'opts');
        part.options.forEach((o, j) => {
          const lab = el('label', 'opt');
          const r = document.createElement('input'); r.type = 'radio'; r.name = key; r.value = j;
          lab.append(r, el('span', null, o)); opts.append(lab);
        });
        wrap.append(opts);
        getVal = () => { const c = wrap.querySelector('input:checked'); return c ? Number(c.value) : null; };
      } else {
        const row = el('div', 'row');
        const inp = document.createElement('input'); inp.className = 'num'; inp.type = 'text'; inp.inputMode = 'decimal';
        inp.placeholder = 'răspunsul tău'; inp.setAttribute('aria-label', 'Răspuns');
        row.append(inp); if (part.unit) row.append(el('span', 'unit', part.unit));
        wrap.append(row);
        getVal = () => inp.value;
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
      }
      const btn = el('button', 'btn', 'Verifică'); btn.type = 'button';
      const row2 = el('div', 'row'); row2.style.marginTop = '8px'; row2.append(btn);
      wrap.append(row2, fb);
      function check() {
        const v = getVal(); let ok = false;
        if (part.type === 'mc') {
          if (v === null) { fb.className = 'fb no'; fb.textContent = 'Alege o variantă.'; return; }
          ok = v === part.correct;
        } else {
          const x = parseNum(v);
          if (isNaN(x)) { fb.className = 'fb no'; fb.textContent = 'Scrie un număr (ex. 12, 7,2, 36/5, 4√2).'; return; }
          ok = Math.abs(x - part.correct) <= part.tol;
        }
        if (ok) { fb.className = 'fb ok'; fb.textContent = '✔ Corect! Bravo!'; solved.add(key); }
        else { fb.className = 'fb no'; fb.textContent = '✘ Nu încă. Mai încearcă sau cere un indiciu.'; }
        saveScore(); markCard(card, p);
      }
      btn.addEventListener('click', check);
      if (solved.has(key)) { fb.className = 'fb ok'; fb.textContent = '✔ Rezolvat anterior.'; }
      card.append(wrap);
    });
    const hintBtn = el('button', 'btn ghost', 'Indiciu'); hintBtn.type = 'button';
    const hint = el('div', 'hint', '💡 ' + p.hint);
    hintBtn.addEventListener('click', () => hint.classList.toggle('show'));
    const r = el('div', 'row'); r.style.marginTop = '14px'; r.append(hintBtn);
    card.append(r, hint);
    const det = el('details', 'sol');
    det.append(el('summary', null, 'Arată rezolvarea'), el('p', 'muted', p.solNote));
    const ol = el('ol'); p.solution.forEach(s => ol.append(el('li', null, s))); det.append(ol);
    card.append(det);
    markCard(card, p);
    return card;
  }
  function markCard(card, p) {
    const keys = p.parts.map((x, i) => x.type === 'proof' ? null : p.id + '#' + i).filter(Boolean);
    card.classList.toggle('solved', keys.length > 0 && keys.every(k => solved.has(k)));
  }

  /* ---------- figuri JSXGraph ---------- */
  const ACC = '#00ff85', LINE = '#9fb3c8', HI = '#ffd166', TXT = '#e6edf3';
  function board(id, bb, extra) {
    return JXG.JSXGraph.initBoard(id, Object.assign({
      boundingbox: bb, axis: false, keepaspectratio: true, showCopyright: false, showNavigation: false,
      pan: { enabled: false }, zoom: { enabled: false, wheel: false }
    }, extra || {}));
  }
  function pt(b, xy, name, opt) {
    return b.create('point', xy, Object.assign({ name: name, fixed: true, size: 3, strokeColor: ACC, fillColor: ACC,
      label: { strokeColor: TXT, fontSize: 18, offset: [6, 8] } }, opt || {}));
  }
  function seg(b, a, c, opt) { return b.create('segment', [a, c], Object.assign({ strokeColor: LINE, strokeWidth: 2, fixed: true, highlight: false }, opt || {})); }
  const deg = (a, b, c) => JXG.Math.Geometry.trueAngle(a, b, c);
  const ndeg = (a, b, c) => { const v = deg(a, b, c); return v > 180 ? 360 - v : v; };
  function setLive(id, html) { const e = document.getElementById(id + '-live'); if (e) e.innerHTML = html; }

  const FIGS = {
    figDelta(id) {
      const b = board(id, [-3.5, 2.2, 2.9, -0.5]);
      b.create('line', [[-3.4, 0], [2.8, 0]], { straightFirst: false, straightLast: false, strokeColor: '#33414f', strokeWidth: 1, fixed: true, highlight: false });
      const A = pt(b, [-2, 0], 'A'), B = pt(b, [0, 0], 'B', { label: { strokeColor: TXT, fontSize: 18, offset: [-4, -16] } });
      const D = pt(b, [-3, Math.sqrt(3)], 'D');
      const track = b.create('segment', [[0.35, 0], [2.7, 0]], { visible: false });
      const C = b.create('glider', [1, 0, track], { name: 'C', size: 6, strokeColor: HI, fillColor: HI, label: { strokeColor: HI, fontSize: 18, offset: [4, -16] } });
      const F = b.create('midpoint', [B, D], { name: 'F', size: 3, strokeColor: ACC, fillColor: ACC, label: { strokeColor: TXT, fontSize: 18 } });
      const lBD = b.create('line', [B, D], { visible: false });
      const par = b.create('parallel', [lBD, C], { visible: false });
      const E = b.create('orthogonalprojection', [B, par], { name: 'E', size: 3, strokeColor: ACC, fillColor: ACC, label: { strokeColor: TXT, fontSize: 18 } });
      seg(b, A, D); seg(b, B, D); seg(b, A, C); seg(b, B, E); seg(b, E, C); seg(b, A, F, { dash: 2, strokeColor: '#5d6f82' });
      b.create('nonreflexangle', [D, B, A], { radius: 0.45, name: '30°', fillColor: LINE, fillOpacity: 0.2, strokeColor: LINE, label: { strokeColor: TXT, fontSize: 14 }, fixed: true });
      b.create('nonreflexangle', [C, B, E], { radius: 0.35, name: '?', fillColor: ACC, fillOpacity: 0.3, strokeColor: ACC, label: { strokeColor: ACC, fontSize: 16 } });
      b.create('nonreflexangle', [B, E, C], { radius: 0.18, name: '', fillColor: HI, fillOpacity: 0.3, strokeColor: HI });
      const upd = () => setLive(id, '∠EBC = ?  ·  BC = ' + Math.round(C.X() * 100) + ' m, BE = ' + Math.round(B.Dist(E) * 100) + ' m');
      b.on('update', upd); upd();
    },
    figCircle(id) {
      const b = board(id, [-2.8, 2.6, 2.8, -2.6]);
      const O = pt(b, [0, 0], 'O', { size: 2 });
      b.create('circle', [O, 2], { strokeColor: '#5d6f82', strokeWidth: 2, fixed: true, highlight: false });
      const t = 15 * Math.PI / 180;
      const B = pt(b, [2 * Math.cos(t), 2 * Math.sin(t)], 'B');
      const C = pt(b, [-2 * Math.cos(t), -2 * Math.sin(t)], 'C', { label: { strokeColor: TXT, fontSize: 18, offset: [-18, -6] } });
      const circ = b.create('circle', [O, 2], { visible: false });
      const a0 = 135 * Math.PI / 180;
      const A = b.create('glider', [2 * Math.cos(a0), 2 * Math.sin(a0), circ], { name: 'A', size: 6, strokeColor: HI, fillColor: HI, label: { strokeColor: HI, fontSize: 18, offset: [-8, 14] } });
      seg(b, C, A, { strokeColor: ACC, strokeWidth: 3 }); seg(b, A, O, { strokeColor: ACC, strokeWidth: 3 }); seg(b, O, B, { strokeColor: ACC, strokeWidth: 3 });
      seg(b, B, C, { dash: 2, strokeColor: '#5d6f82', strokeWidth: 1 });
      b.create('nonreflexangle', [C, O, A], { radius: 0.4, name: '?', fillColor: ACC, fillOpacity: 0.25, strokeColor: ACC, label: { strokeColor: ACC, fontSize: 15 } });
      const upd = () => {
        let ac = deg(A, O, C); if (ac > 180) ac = 360 - ac;
        const ab = 180 - ac, ca = C.Dist(A) * 10;
        setLive(id, 'arc mic AC = ? · traseu = ?');
      };
      b.on('update', upd); upd();
    },
    figAngles(id) {
      const b = board(id, [-2.6, 4.0, 4.8, -0.7]);
      const O = pt(b, [0, 0], 'O', { label: { strokeColor: TXT, fontSize: 18, offset: [-6, -18] } });
      const A = pt(b, [4.2, 0], 'A', { label: { strokeColor: TXT, fontSize: 18, offset: [-6, -18] } });
      const c = 120 * Math.PI / 180;
      const C = pt(b, [3.6 * Math.cos(c), 3.6 * Math.sin(c)], 'C');
      const hid = { visible: false, fixed: true, withLabel: false };
      const q1 = b.create('point', [3.4 * Math.cos(0.09), 3.4 * Math.sin(0.09)], hid), q2 = b.create('point', [3.4 * Math.cos(c - 0.09), 3.4 * Math.sin(c - 0.09)], hid);
      const arc = b.create('arc', [O, q1, q2], { visible: false });
      const b0 = 25 * Math.PI / 180;
      const B = b.create('glider', [3.4 * Math.cos(b0), 3.4 * Math.sin(b0), arc], { name: 'B', size: 6, strokeColor: HI, fillColor: HI, label: { strokeColor: HI, fontSize: 18 } });
      const M = b.create('point', [() => { const m = (Math.atan2(B.Y(), B.X()) + c) / 2; return 3.2 * Math.cos(m); }, () => { const m = (Math.atan2(B.Y(), B.X()) + c) / 2; return 3.2 * Math.sin(m); }],
        { name: 'M', size: 3, strokeColor: ACC, fillColor: ACC, label: { strokeColor: TXT, fontSize: 18 } });
      seg(b, O, A); seg(b, O, C); seg(b, O, B, { strokeColor: HI }); seg(b, O, M, { strokeColor: ACC, dash: 2 });
      b.create('nonreflexangle', [A, O, B], { radius: 0.9, name: '', fillColor: HI, fillOpacity: 0.2, strokeColor: HI });
      b.create('nonreflexangle', [B, O, C], { radius: 0.6, name: '', fillColor: ACC, fillOpacity: 0.2, strokeColor: ACC });
      const upd = () => {
        const aob = Math.round(deg(A, O, B)), boc = 120 - aob, aom = Math.round(aob + boc / 2);
        const ok = Math.abs(boc - 2 * aob) <= 1;
        setLive(id, '∠AOB = ' + aob + '° · ∠BOC = ' + boc + '° · ∠AOM = ' + aom + '° ' + (ok ? '<span style="color:#00ff85">✔ acum ∠BOC = 2·∠AOB</span>' : '<span style="color:#8b9bb0">(încă nu e 2·∠AOB)</span>'));
      };
      b.on('update', upd); upd();
    },
    figCone(id) {
      const h = 3 * Math.sqrt(3);
      const b = board(id, [-4.6, 6.0, 4.6, -1.4]);
      b.create('curve', [t => 3 * Math.cos(t), t => 0.8 * Math.sin(t), Math.PI, 2 * Math.PI], { strokeColor: LINE, strokeWidth: 2, fixed: true, highlight: false });
      b.create('curve', [t => 3 * Math.cos(t), t => 0.8 * Math.sin(t), 0, Math.PI], { strokeColor: LINE, strokeWidth: 1.5, dash: 2, fixed: true, highlight: false });
      const A = pt(b, [-3, 0], 'A', { label: { strokeColor: TXT, fontSize: 18, offset: [-18, -4] } }), B = pt(b, [3, 0], 'B'), V = pt(b, [0, h], 'V'), O = pt(b, [0, 0], 'O', { size: 2 });
      b.create('polygon', [V, A, B], { fillColor: ACC, fillOpacity: 0.12, borders: { strokeColor: ACC, strokeWidth: 2 }, vertices: { visible: false }, fixed: true, highlight: false });
      seg(b, V, O, { dash: 2, strokeColor: '#5d6f82' });
      b.create('text', [-0.9, -0.45, 'AB = 6 cm'], { strokeColor: HI, fontSize: 16, fixed: true });
    },
    figGraph(id) {
      const ax = { strokeColor: '#5d6f82', ticks: { strokeColor: '#33414f', label: { strokeColor: '#8b9bb0', fontSize: 13 }, minorTicks: 0 } };
      const b = board(id, [-4.5, 2.5, 5.5, -6.5], { axis: true, defaultAxes: { x: ax, y: ax } });
      b.create('functiongraph', [x => 2 * x - 4, -1, 4.2], { strokeColor: HI, strokeWidth: 3 });
      b.create('text', [3.3, 1.2, 'f(x) = 2x − 4'], { strokeColor: HI, fontSize: 16, fixed: true });
      const A = pt(b, [2, 0], 'A(2, 0)', { label: { strokeColor: TXT, fontSize: 15, offset: [6, 12] } });
      const B = pt(b, [0, -4], 'B(0, −4)', { label: { strokeColor: TXT, fontSize: 15, offset: [8, -6] } });
      const C = pt(b, [-2, 0], 'C(−2, 0)', { label: { strokeColor: TXT, fontSize: 15, offset: [-70, 12] } });
      b.create('polygon', [A, B, C], { fillColor: ACC, fillOpacity: 0.15, borders: { strokeColor: ACC, strokeWidth: 2 }, vertices: { visible: false }, fixed: true, highlight: false });
    },
    figTrapez(id) {
      const b = board(id, [-1, 5, 9, -1]);
      const A = pt(b, [0, 0], 'A', { label: { strokeColor: TXT, fontSize: 18, offset: [-16, -10] } }), B = pt(b, [8, 0], 'B', { label: { strokeColor: TXT, fontSize: 18, offset: [6, -10] } });
      const C = pt(b, [4, 4], 'C'), D = pt(b, [0, 4], 'D', { label: { strokeColor: TXT, fontSize: 18, offset: [-16, 8] } });
      const M = pt(b, [2, 4], 'M'), P = pt(b, [1.6, 3.2], 'P', { label: { strokeColor: TXT, fontSize: 18, offset: [-18, -8] } });
      b.create('polygon', [M, P, B, C], { fillColor: ACC, fillOpacity: 0.25, borders: { strokeColor: ACC, strokeWidth: 1 }, vertices: { visible: false }, fixed: true, highlight: false });
      seg(b, A, B); seg(b, B, C); seg(b, C, D); seg(b, D, A); seg(b, A, M, { strokeColor: HI }); seg(b, B, D, { strokeColor: HI });
      b.create('nonreflexangle', [B, A, D], { radius: 0.4, name: '', fillColor: LINE, fillOpacity: 0.2, strokeColor: LINE, fixed: true });
      b.create('text', [3.6, -0.5, '8 cm'], { strokeColor: '#8b9bb0', fontSize: 14, fixed: true });
      b.create('text', [-0.9, 2, '4 cm'], { strokeColor: '#8b9bb0', fontSize: 14, fixed: true });
    },
    figCube(id) {
      const k = 0.5, cs = Math.cos(Math.PI / 6), sn = Math.sin(Math.PI / 6);
      const P3 = (x, y, z) => [x + k * y * cs, z + k * y * sn];
      const b = board(id, [-1.5, 11.2, 13.5, -1.5]);
      const V = {
        A: [0, 0, 0], B: [8, 0, 0], C: [8, 8, 0], D: [0, 8, 0], "A'": [0, 0, 8], "B'": [8, 0, 8], "C'": [8, 8, 8], "D'": [0, 8, 8],
        O: [4, 4, 0], E: [4, 0, 4], F: [8, 8, 4]
      };
      const off = { A: [-16, -10], B: [6, -12], C: [8, -4], D: [-18, 4], "A'": [-20, 6], "B'": [4, 10], "C'": [6, 8], "D'": [-8, 12], O: [-6, -16], E: [-16, 6], F: [8, 0] };
      const p = {};
      Object.keys(V).forEach(n => { p[n] = pt(b, P3(...V[n]), n, { size: (n === 'O' || n === 'E' || n === 'F') ? 3 : 2, label: { strokeColor: TXT, fontSize: 16, offset: off[n] } }); });
      const solid = [['A', 'B'], ['B', 'C'], ["A'", "B'"], ["B'", "C'"], ["C'", "D'"], ["D'", "A'"], ['A', "A'"], ['B', "B'"], ['C', "C'"]];
      const hidden = [['A', 'D'], ['D', 'C'], ['D', "D'"]];
      solid.forEach(([u, v]) => seg(b, p[u], p[v]));
      hidden.forEach(([u, v]) => seg(b, p[u], p[v], { dash: 2, strokeColor: '#5d6f82' }));
      [['A', 'C'], ['B', 'D']].forEach(([u, v]) => seg(b, p[u], p[v], { dash: 2, strokeColor: '#5d6f82', strokeWidth: 1 }));
      [["A'", 'B'], ['A', "B'"]].forEach(([u, v]) => seg(b, p[u], p[v], { strokeColor: '#5d6f82', strokeWidth: 1 }));
      seg(b, p.F, p.O, { strokeColor: ACC, strokeWidth: 3 });
      seg(b, p.D, p.E, { strokeColor: HI, strokeWidth: 3 });
    }
  };

  function init() {
    const lists = { 6: document.getElementById('list6'), 8: document.getElementById('list8') };
    const counters = { 6: 0, 8: 0 };
    PROBLEMS.forEach(p => { counters[p.grade]++; lists[p.grade].append(buildCard(p, counters[p.grade])); });
    saveScore();
    document.getElementById('reset').addEventListener('click', () => {
      solved.clear(); saveScore();
      document.querySelectorAll('.fb').forEach(f => { f.textContent = ''; f.className = 'fb'; });
      document.querySelectorAll('input.num').forEach(i => { i.value = ''; });
      document.querySelectorAll('input[type=radio]').forEach(i => { i.checked = false; });
      document.querySelectorAll('.card').forEach(c => c.classList.remove('solved'));
    });
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [{ left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }],
        throwOnError: false
      });
    }
    if (window.JXG) {
      Object.assign(JXG.Options.text, { strokeColor: TXT });
      PROBLEMS.forEach(p => { if (p.fig && FIGS[p.fig.id]) { try { FIGS[p.fig.id](p.fig.id); } catch (e) { console.error('Figura ' + p.fig.id, e); } } });
    } else {
      document.querySelectorAll('.jxgbox').forEach(b => { b.textContent = 'Figura nu s-a putut încărca (verifică conexiunea la internet).'; });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
