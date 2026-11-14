/* Olimpiada de matematică – clasa a VI-a: logica paginii (fără build, fără server). */
(function () {
  'use strict';
  const R = String.raw;

  const URL_BACAU_25 = 'https://cdn.edupedu.ro/wp-content/uploads/2025/02/SUBIECT-etapa-locala-ONM_08feb2025-clasa-6.pdf';
  const URL_TULCEA_25 = 'https://cdn.edupedu.ro/wp-content/uploads/2025/02/Subiecte-ONGM-ETAPA-LOCALA-clasa-a-VI-aTulcea-8-februarie-2025.pdf';
  const URL_VALCEA_25 = 'https://cdn.edupedu.ro/wp-content/uploads/2025/02/Barem_6_OLM_2025.pdf';
  const URL_JUD_26 = 'https://ssmr.ro/files/onm2026/faza_municipiu/barem_clasa6.pdf';
  const URL_JUD_25 = 'https://ssmr.ro/files/onm2025/faza_municipiu/barem_clasa6.pdf';
  const URL_NAT_22 = 'https://ssmr.ro/files/onm2022/finala/cl6_nationala.pdf';
  const URL_NAT_24 = 'https://ssmr.ro/files/onm2024/faza_nationala/06_solutii_bareme_ONM_2024.pdf';
  const URL_NAT_25 = 'https://ssmr.ro/files/onm2025/faza_nationala/06_solutii_bareme_ONM_2025.pdf';
  const URL_NAT_26 = 'https://ssmr.ro/files/onm2026/faza_nationala/06_solutii_bareme_ONM_2026.pdf';

  const SOL_LOC = 'Pașii urmează baremul oficial publicat pentru această etapă locală, reformulați pe înțelesul unui elev de clasa a VI-a. Răspunsul l-am verificat și noi prin calcul.';
  const SOL_SSMR = 'Pașii urmează soluția oficială (SSMR), reformulați pe înțelesul unui elev de clasa a VI-a. Răspunsul l-am verificat și noi prin calcul.';

  const PROBLEMS = [
    /* ================= ETAPA LOCALĂ ================= */
    {
      id: 'loc25-bc-1', stage: 'loc', source: 'Etapa locală 2025 · jud. Bacău · Subiectul I', url: URL_BACAU_25,
      statement: R`<p>Dan și Alex joacă de mai multe ori un joc din aplicația Roblox în urma căruia câștigătorul primește \(x\) puncte, iar cel care pierde primește \(y\) puncte. \(x, y\) sunt numere naturale nenule cu \(x > y\). La fiecare joc unul dintre copii câștigă și celălalt copil pierde. Scorul final este 147 la 123 în favoarea lui Alex. Dan a câștigat 6 partide. Aflați numerele \(x\) și \(y\).</p>`,
      parts: [
        { q: R`\(x = ?\)`, type: 'num', correct: 13, tol: 0.001, unit: 'puncte' },
        { q: R`\(y = ?\)`, type: 'num', correct: 5, tol: 0.001, unit: 'puncte' }
      ],
      hint: R`Notează cu \(a\) numărul jocurilor câștigate de Alex. Scrie punctajul fiecăruia (Alex: \(a\) victorii și 6 înfrângeri). Scade cele două relații și dă factor comun. Apoi uită-te la paritate: \(147\) este impar.`,
      solNote: SOL_LOC,
      solution: [
        R`Fie \(a\) numărul jocurilor câștigate de Alex. Atunci \(a \cdot x + 6 \cdot y = 147\) (Alex) și \(6 \cdot x + a \cdot y = 123\) (Dan).`,
        R`Scăzând: \(ax + 6y - 6x - ay = 24\), adică \((a - 6)(x - y) = 24\). Cum Alex a câștigat mai multe jocuri, \(a > 6\), iar \(x > y\).`,
        R`Din \(ax + 6y = 147\) (impar), \(ax\) este impar, deci \(a\) este impar, iar \(a - 6\) este un divizor impar al lui 24: \(1\) sau \(3\).`,
        R`Dacă \(a - 6 = 1\) și \(x - y = 24\): \(7(y + 24) + 6y = 147 \Rightarrow 13y = -21\), imposibil.`,
        R`Dacă \(a - 6 = 3\) și \(x - y = 8\): \(9(y + 8) + 6y = 147 \Rightarrow 15y = 75 \Rightarrow y = 5,\ x = 13\).`,
        R`Verificare: Alex \(9 \cdot 13 + 6 \cdot 5 = 147\), Dan \(6 \cdot 13 + 9 \cdot 5 = 123\). ✔`
      ]
    },
    {
      id: 'loc25-tl-1', stage: 'loc', source: 'Etapa locală 2025 · jud. Tulcea · Problema 1', url: URL_TULCEA_25,
      statement: R`<p>Determinați numerele naturale \(x, y, z, t\) știind că sunt îndeplinite simultan relațiile</p>
<p>\[x^2 + y^2 + z^2 + t^2 = 12000 \quad \text{și} \quad \frac{x}{x+2} = \frac{y}{y+4} = \frac{z}{z+6} = \frac{t}{t+8}.\]</p>`,
      parts: [
        { q: R`\(x = ?\)`, type: 'num', correct: 20, tol: 0.001 },
        { q: R`\(y = ?\)`, type: 'num', correct: 40, tol: 0.001 },
        { q: R`\(z = ?\)`, type: 'num', correct: 60, tol: 0.001 },
        { q: R`\(t = ?\)`, type: 'num', correct: 80, tol: 0.001 }
      ],
      hint: R`Răstoarnă fracțiile: \(\frac{x+2}{x} = 1 + \frac{2}{x}\). Ce obții dacă scazi 1 din fiecare raport? Notează valoarea comună cu \(k\) și exprimă \(x, y, z, t\) cu ajutorul lui \(k\).`,
      solNote: SOL_LOC,
      solution: [
        R`Numerele nu pot fi 0 (altfel toate ar fi 0 și suma pătratelor n-ar fi 12000). Inversând rapoartele: \(1 + \frac{2}{x} = 1 + \frac{4}{y} = 1 + \frac{6}{z} = 1 + \frac{8}{t}\).`,
        R`Deci \(\frac{x}{2} = \frac{y}{4} = \frac{z}{6} = \frac{t}{8} = k\), adică \(x = 2k,\ y = 4k,\ z = 6k,\ t = 8k\).`,
        R`Înlocuim: \(4k^2 + 16k^2 + 36k^2 + 64k^2 = 120k^2 = 12000 \Rightarrow k^2 = 100 \Rightarrow k = 10\).`,
        R`\(x = 20,\ y = 40,\ z = 60,\ t = 80\).`
      ]
    },
    {
      id: 'loc25-tl-2', stage: 'loc', source: 'Etapa locală 2025 · jud. Tulcea · Problema 2', url: URL_TULCEA_25,
      statement: R`<p>Se dau mulțimile \(A = \{n \in \mathbb{N} \mid 75 \text{ divide } n,\ n \le 2025\}\) și \(B = \{m \in \mathbb{N}^* \mid m\ ⋮\ 30,\ m \le 2025\}\).</p>`,
      parts: [
        { q: R`a) Care este cel mai mare element al mulțimii \(B\)?`, type: 'num', correct: 2010, tol: 0.001 },
        { q: R`a) Care este cel mai mic element al mulțimii \(A\)?`, type: 'num', correct: 0, tol: 0.001 },
        { q: R`b) Calculați cardinalul mulțimii \(A \setminus B\).`, type: 'num', correct: 15, tol: 0.001, unit: 'elemente' }
      ],
      hint: R`Atenție: \(A\) conține numere naturale (deci și 0), \(B\) doar numere nenule. Pentru b): care multipli ai lui 75 sunt și multipli ai lui 30? Gândește-te la \([75, 30]\).`,
      solNote: SOL_LOC,
      solution: [
        R`a) \(2025 : 30 = 67\) rest \(15\), deci cel mai mare element al lui \(B\) este \(67 \cdot 30 = 2010\).`,
        R`Cel mai mic element al lui \(A\) este \(0\) (0 se divide cu 75 și \(0 \in \mathbb{N}\)).`,
        R`b) \(A = \{0 \cdot 75, 1 \cdot 75, \ldots, 27 \cdot 75\}\) (căci \(27 \cdot 75 = 2025\)), deci \(\text{card}(A) = 28\).`,
        R`Elementele comune sunt multiplii nenuli ai lui \([75, 30] = 150\) până la 2025: \(1 \cdot 150, \ldots, 13 \cdot 150\), adică 13 numere.`,
        R`\(\text{card}(A \setminus B) = 28 - 13 = 15\).`
      ]
    },
    {
      id: 'loc25-tl-4', stage: 'loc', source: 'Etapa locală 2025 · jud. Tulcea · Problema 4', url: URL_TULCEA_25,
      statement: R`<p>Punctele \(M\) și \(N\) se află pe cercul de centru \(O\) și rază \(r\) astfel încât măsura arcului \(\overset{\frown}{MN}\) este de \(75^\circ\) și dreapta \(t\) este tangentă la cerc în punctul \(M\). Paralela prin \(O\) la dreapta \(t\) intersectează cercul în punctele \(P\) și \(Q\), unde \(P\) se află în același semiplan cu \(N\) față de \(OM\).</p>`,
      fig: { id: 'figTangent', h: 330, cap: 'Figură desenată de noi după enunț (unghiurile cerute sunt marcate cu „?”).' },
      parts: [
        { q: R`a) Aflați măsura \(\angle PON\).`, type: 'num', correct: 15, tol: 0.01, unit: '°' },
        { q: R`b) Dacă bisectoarea \(\angle MON\) intersectează dreapta \(t\) în \(R\), determinați măsura \(\angle ORM\). <span class="muted">(Poți scrie cu minute, ex. 40°30', sau cu zecimale, ex. 40,5.)</span>`, type: 'num', correct: 52.5, tol: 0.01, unit: '°' }
      ],
      hint: R`Tangenta este perpendiculară pe raza dusă în punctul de tangență, deci \(OM \perp t\). Cum \(PQ \parallel t\), ce unghi fac \(OP\) și \(OM\)? Pentru b): la paralelele \(PQ\) și \(t\) cu secanta \(OR\), caută unghiuri alterne interne.`,
      solNote: SOL_LOC,
      solution: [
        R`a) \(OM \perp t\) și \(PQ \parallel t\) \(\Rightarrow\) \(\angle POM = 90^\circ\).`,
        R`\(\angle MON = 75^\circ\) (unghi la centru = măsura arcului), deci \(\angle PON = 90^\circ - 75^\circ = 15^\circ\).`,
        R`b) \(OR\) este bisectoarea lui \(\angle MON\): \(\angle RON = 75^\circ : 2 = 37^\circ 30'\).`,
        R`\(\angle POR = \angle PON + \angle NOR = 15^\circ + 37^\circ 30' = 52^\circ 30'\).`,
        R`\(PQ \parallel t\), secanta \(OR\): \(\angle ORM = \angle POR = 52^\circ 30'\) (alterne interne).`
      ]
    },
    {
      id: 'loc25-vl-3', stage: 'loc', source: 'Etapa locală 2025 · jud. Vâlcea · Problema 3', url: URL_VALCEA_25,
      statement: R`<p>Un număr natural de forma \(\overline{abcd}\) se numește „îndrăzneț” dacă \(5 \cdot \overline{ab} = 7 \cdot \overline{cd}\).</p>`,
      parts: [
        { q: R`a) Arătați că orice număr „îndrăzneț” se divide cu 141.`, type: 'proof' },
        { q: R`b) Calculați suma tuturor numerelor „îndrăznețe”.`, type: 'num', correct: 73320, tol: 0.001 }
      ],
      hint: R`Scrie \(\overline{abcd} = 100 \cdot \overline{ab} + \overline{cd}\) și \(100 = 20 \cdot 5\). Pentru b): din \(5 \cdot \overline{ab} = 7 \cdot \overline{cd}\), cu ce trebuie să se dividă \(\overline{cd}\)? Și cât de mare poate fi \(\overline{cd}\), dacă \(\overline{ab}\) are două cifre?`,
      solNote: SOL_LOC,
      solution: [
        R`a) \(\overline{abcd} = 100 \cdot \overline{ab} + \overline{cd} = 20 \cdot (5 \cdot \overline{ab}) + \overline{cd} = 20 \cdot 7 \cdot \overline{cd} + \overline{cd} = 141 \cdot \overline{cd}\), deci se divide cu 141.`,
        R`b) Din \(5 \cdot \overline{ab} = 7 \cdot \overline{cd}\) și \((5, 7) = 1\), \(\overline{cd}\) se divide cu 5: \(\overline{cd} = 5k\) și atunci \(\overline{ab} = 7k\).`,
        R`\(\overline{ab}\) are două cifre: \(10 \le 7k \le 99 \Rightarrow k \in \{2, 3, \ldots, 14\}\). Cel mai mic număr este \(141 \cdot 10\), cel mai mare \(141 \cdot 70\).`,
        R`Suma: \(141 \cdot (10 + 15 + \ldots + 70) = 141 \cdot 5 \cdot (2 + 3 + \ldots + 14) = 141 \cdot 5 \cdot 104 = 73\,320\).`
      ]
    },

    /* ================= ETAPA JUDEȚEANĂ / A SECTOARELOR ================= */
    {
      id: 'jud26-1', stage: 'jud', source: 'Etapa județeană / a sectoarelor 2026 · Problema 1', url: URL_JUD_26,
      statement: R`<p>Considerăm mulțimile:</p>
<p>\(A = \{n \in \mathbb{N} \mid n \le 1000 \text{ și } n \text{ dă restul 2 la împărțirea cu 3}\}\),</p>
<p>\(B = \{n \in \mathbb{N} \mid n \le 1000 \text{ și } n \text{ dă restul 1 la împărțirea cu 7}\}\).</p>`,
      parts: [
        { q: R`a) Care este cel mai mic element al mulțimii \(A \cap B\)?`, type: 'num', correct: 8, tol: 0.001 },
        { q: R`b) Aflați numărul elementelor mulțimii \(A \cup B\).`, type: 'num', correct: 428, tol: 0.001, unit: 'elemente' }
      ],
      hint: R`Scrie primele elemente din \(A\) și din \(B\). Pentru b): \(\text{card}(A \cup B) = \text{card}(A) + \text{card}(B) - \text{card}(A \cap B)\). Elementele comune: dacă \(x\) și 8 dau aceleași resturi la 3 și la 7, atunci \(x - 8\) se divide cu 21.`,
      solNote: SOL_SSMR,
      solution: [
        R`a) \(A = \{2, 5, 8, \ldots\}\), \(B = \{1, 8, 15, \ldots\}\), deci cel mai mic element comun este \(8\).`,
        R`b) \(A\): \(n = 3m + 2 \le 1000 \Rightarrow m \le 332\), deci \(m = 0, 1, \ldots, 332\): 333 de elemente.`,
        R`\(B\): \(n = 7p + 1 \le 1000 \Rightarrow p \le 142\): 143 de elemente.`,
        R`\(x \in A \cap B \iff 21 \mid x - 8\), adică \(x = 21k + 8 \le 1000 \Rightarrow k = 0, 1, \ldots, 47\): 48 de elemente.`,
        R`\(\text{card}(A \cup B) = 333 + 143 - 48 = 428\).`
      ]
    },
    {
      id: 'jud26-2', stage: 'jud', source: 'Etapa județeană / a sectoarelor 2026 · Problema 2', url: URL_JUD_26,
      statement: R`<p>Determinați numărul natural prim \(x\) și numărul natural nenul \(y\) având proprietatea</p><p>\[\frac{x}{2y} = \frac{x+1}{x+y+8}.\]</p>`,
      parts: [
        { q: R`\(x = ?\)`, type: 'num', correct: 2, tol: 0.001 },
        { q: R`\(y = ?\)`, type: 'num', correct: 5, tol: 0.001 }
      ],
      hint: R`Folosește proprietatea fundamentală a proporțiilor și desfă parantezele: ajungi la \(x^2 + 8x = y(x + 2)\). Atunci \(x + 2\) divide \(x^2 + 8x\). Scade un multiplu potrivit al lui \(x + 2\) ca să scapi de \(x^2\).`,
      solNote: SOL_SSMR + ' (Aici: soluția alternativă din barem.)',
      solution: [
        R`Produsul mezilor = produsul extremilor: \(x(x + y + 8) = 2y(x + 1)\), adică \(x^2 + 8x = y(x + 2)\).`,
        R`Deci \(x + 2 \mid x^2 + 8x\). Cum \(x + 2 \mid x(x + 2) = x^2 + 2x\), rezultă \(x + 2 \mid 6x\).`,
        R`Apoi \(x + 2 \mid 6(x + 2) - 6x = 12\), deci \(x + 2 \in \{1, 2, 3, 4, 6, 12\}\), adică \(x \in \{1, 2, 4, 10\}\). Singurul număr prim este \(x = 2\).`,
        R`Pentru \(x = 2\): \(4 + 16 = 4y \Rightarrow y = 5\). Verificare: \(\frac{2}{10} = \frac{3}{15}\). ✔`
      ]
    },
    {
      id: 'jud25-2', stage: 'jud', source: 'Etapa județeană / a sectoarelor 2025 · Problema 2', url: URL_JUD_25,
      statement: R`<p>Aflați numerele naturale nenule \(a\) și \(b\) pentru care</p>
<p>\[\frac{a}{(a,b)} = b + \frac{48 \cdot (a,b)}{[a,b]} \quad \text{și} \quad \frac{b}{(a,b)} = a - \frac{312 \cdot (a,b)}{[a,b]}.\]</p>
<p>Am notat cu \((a,b)\) cel mai mare divizor comun al numerelor \(a\) și \(b\), iar cu \([a,b]\) cel mai mic multiplu comun al lor.</p>`,
      parts: [
        { q: R`\(a = ?\)`, type: 'num', correct: 16, tol: 0.001 },
        { q: R`\(b = ?\)`, type: 'num', correct: 6, tol: 0.001 }
      ],
      hint: R`Notează \(d = (a,b)\), \(a = dx\), \(b = dy\) cu \((x, y) = 1\). Atunci \([a,b] = dxy\). Înlocuiește: vei vedea că \(xy\) trebuie să dividă și 48, și 312. Apoi încearcă pe rând cazurile posibile.`,
      solNote: SOL_SSMR,
      solution: [
        R`Fie \(d = (a,b)\), \(a = dx\), \(b = dy\), \((x, y) = 1\), \([a,b] = dxy\). Relațiile devin \(x = dy + \frac{48}{xy}\) și \(y = dx - \frac{312}{xy}\).`,
        R`Deci \(xy \mid 48\) și \(xy \mid 312\), adică \(xy \mid (48, 312) = 24\). Din prima relație, \(a \ge \frac{a}{d} > b\), deci \(x > y\).`,
        R`Cazurile \((x, y) \in \{(2,1), (3,1), (4,1), (6,1), (3,2), (8,1), (12,1), (4,3), (24,1), (8,3)\}\) se verifică pe rând; merge doar \(x = 8,\ y = 3\), care dă \(d = 2\): \(8 = 2 \cdot 3 + \frac{48}{24}\) și \(3 = 2 \cdot 8 - \frac{312}{24}\). ✔`,
        R`Așadar \(a = dx = 16\) și \(b = dy = 6\).`
      ]
    },

    /* ================= ETAPA NAȚIONALĂ ================= */
    {
      id: 'nat22-1', stage: 'nat', source: 'ONM 2022 · Etapa națională, Constanța · Problema 1', url: URL_NAT_22,
      statement: R`<p>Câte numere naturale \(n\) au proprietatea \(P(n) = S(n) = 8\), unde \(P(n)\) și \(S(n)\) reprezintă produsul, respectiv suma cifrelor numărului \(n\) (scris în baza 10)? Justificați răspunsul!</p>`,
      parts: [{ type: 'num', correct: 23, tol: 0.001, unit: 'numere' }],
      hint: R`Cifrele au produsul 8, deci pot fi doar 1, 2, 4 sau 8. Scrie toate „rețetele” de cifre cu produsul 8 și adaugă cifre de 1 până suma devine 8. Apoi numără în câte ordini poți așeza cifrele.`,
      solNote: SOL_SSMR,
      solution: [
        R`Tipul I: o cifră 4, o cifră 2 și două cifre 1 (\(4 \cdot 2 = 8\), \(4 + 2 + 1 + 1 = 8\)). Cifra 4 are 4 poziții posibile, apoi cifra 2 are 3: \(4 \cdot 3 = 12\) numere.`,
        R`Tipul II: trei cifre 2 și două cifre 1. Alegem pozițiile celor doi de 1 din 5 poziții: 10 moduri, deci 10 numere.`,
        R`Tipul III: numărul 8.`,
        R`Total: \(12 + 10 + 1 = 23\) de numere.`
      ]
    },
    {
      id: 'nat24-1', stage: 'nat', source: 'ONM 2024 · Etapa națională · Problema 1', url: URL_NAT_24,
      statement: R`<p>Numerele naturale \(1, 2, 3, \ldots, 2024\) sunt scrise pe 2024 cartonașe identice, așezate pe o masă cu fața scrisă în jos. Spunem că un cartonaș este câștigător dacă numărul scris pe el este divizibil cu 13 sau 100. Care este cel mai mic număr de cartonașe pe care trebuie să le întoarcem, fără a le privi, pentru a fi siguri că am întors un cartonaș câștigător?</p>`,
      parts: [{ type: 'num', correct: 1851, tol: 0.001, unit: 'cartonașe' }],
      hint: R`Gândește-te la cel mai ghinionist caz: întorci pe rând toate cartonașele necâștigătoare. Câte sunt? Atenție la numerele care se divid și cu 13, și cu 100 (să nu le numeri de două ori).`,
      solNote: SOL_SSMR,
      solution: [
        R`Ca să fim siguri, trebuie să întoarcem cu unul mai mult decât numărul cartonașelor necâștigătoare.`,
        R`Multipli de 13 până la 2024: \(13 \cdot 1, \ldots, 13 \cdot 155\), adică 155. Multipli de 100: \(100 \cdot 1, \ldots, 100 \cdot 20\), adică 20.`,
        R`Multiplu comun al lui 13 și 100 până la 2024: doar 1300.`,
        R`Câștigătoare: \(155 + 20 - 1 = 174\); necâștigătoare: \(2024 - 174 = 1850\).`,
        R`Răspuns: \(1850 + 1 = 1851\) de cartonașe.`
      ]
    },
    {
      id: 'nat24-2', stage: 'nat', source: 'ONM 2024 · Etapa națională · Problema 2', url: URL_NAT_24,
      statement: R`<p>Se consideră mulțimea \(A_n = \{1, 3, 5, \ldots, 2n - 1\}\), \(n \in \mathbb{N}^*\). Pentru o pereche \((a, b)\), unde \(a, b \in A_n\), se formează numărul \(m = \overline{ab}\) obținut prin alipirea (concatenarea) celor două numere \(a\) și \(b\). De exemplu, pentru numerele \(19, 37 \in A_{30}\), prin alipire se obține numărul \(m = 1937\).</p>`,
      parts: [
        { q: R`a) Care este cel mai mic număr \(n \in \mathbb{N}^*\) pentru care există \(m\) pătrat perfect?`, type: 'num', correct: 11, tol: 0.001 },
        { q: R`b) Determinați cel mai mare pătrat perfect \(m\) care se poate obține pentru \(n = 50\).`, type: 'num', correct: 7921, tol: 0.001 }
      ],
      hint: R`Toate numerele din \(A_n\) sunt impare. Pentru a): încearcă pătratele mici de două și trei cifre și vezi dacă se pot „tăia” în două numere impare. Pentru b): \(A_{50}\) merge până la 99, deci \(m\) are cel mult 4 cifre; ia pătratele de 4 cifre de la cel mai mare în jos și verifică dacă prima „bucată” e impară.`,
      solNote: SOL_SSMR,
      solution: [
        R`a) Din \(A_{10} = \{1, 3, \ldots, 19\}\) nu se poate forma niciun pătrat perfect prin alipire.`,
        R`Din \(A_{11} = \{1, 3, \ldots, 21\}\), alipind 1 și 21, obținem \(121 = 11^2\). Deci \(n = 11\).`,
        R`b) \(A_{50} = \{1, 3, \ldots, 99\}\), deci \(m\) are cel mult 4 cifre.`,
        R`\(99^2 = 9801\), \(97^2 = 9409\), \(95^2 = 9025\), \(93^2 = 8649\), \(91^2 = 8281\) nu convin: prima parte (98, 94, 90, 86, 82) e pară.`,
        R`\(89^2 = 7921\) se obține alipind 79 și 21, ambele în \(A_{50}\). Deci cel mai mare pătrat este \(7921\).`
      ]
    },
    {
      id: 'nat24-4', stage: 'nat', source: 'ONM 2024 · Etapa națională · Problema 4', url: URL_NAT_24,
      statement: R`<p>Ne interesează numerele naturale care au numărul divizorilor naturali o putere a lui 2 (adică 1, 2, 4, 8, 16, …).</p>`,
      parts: [
        { q: R`a) Arătați că fiecare dintre numerele 137, 138 și 139 are numărul divizorilor naturali o putere a lui 2.`, type: 'proof' },
        { q: R`b) Care este numărul maxim de numere naturale consecutive cu proprietatea că fiecare dintre ele are numărul divizorilor naturali o putere a lui 2?`, type: 'num', correct: 7, tol: 0.001, unit: 'numere' }
      ],
      hint: R`Dacă \(n = p^a \cdot q^b \cdots\), numărul divizorilor este \((a+1)(b+1)\cdots\). Pentru b): extinde șirul 137, 138, 139 în jos (136, 135, …). Apoi gândește-te la numerele de forma \(8k + 4 = 4 \cdot (2k + 1)\): ce exponent are 2 în descompunerea lor?`,
      solNote: SOL_SSMR,
      solution: [
        R`a) 137 și 139 sunt prime (nu se divid cu 2, 3, 5, 7, 11, 13), deci au câte \(2 = 2^1\) divizori. \(138 = 2 \cdot 3 \cdot 23\) are \(2 \cdot 2 \cdot 2 = 2^3\) divizori.`,
        R`b) \(136 = 2^3 \cdot 17\) (8 divizori), \(135 = 3^3 \cdot 5\) (8), \(134 = 2 \cdot 67\) (4), \(133 = 7 \cdot 19\) (4). Așadar 133, 134, …, 139 sunt 7 numere consecutive bune.`,
        R`Între oricare 8 numere consecutive există unul care dă restul 4 la împărțirea cu 8: \(8k + 4 = 2^2 \cdot (2k + 1)\). Factorul 2 apare la puterea a doua, deci numărul divizorilor se divide cu \(2 + 1 = 3\) și nu poate fi o putere a lui 2.`,
        R`Deci maximul este \(7\).`
      ]
    },
    {
      id: 'nat25-1', stage: 'nat', source: 'ONM 2025 · Etapa națională, Buzău · Problema 1', url: URL_NAT_25,
      statement: R`<p>Se consideră mulțimea \(A = \{1, 2, 3, \ldots, 2025\}\). Spunem că o submulțime \(B\) a mulțimii \(A\) este <i>interesantă</i> dacă are 3 elemente, dintre care unul este media aritmetică a celorlalte două și există \(b \in B\) pentru care \(5 \cdot b \in B\).</p>`,
      parts: [
        { q: R`a) Calculați câte submulțimi interesante conțin numărul 225.`, type: 'num', correct: 6, tol: 0.001, unit: 'submulțimi' },
        { q: R`b) Determinați numărul tuturor submulțimilor interesante ale mulțimii \(A\).`, type: 'num', correct: 630, tol: 0.001, unit: 'submulțimi' }
      ],
      hint: R`Scrie \(B = \{b, 5b, a\}\) și ia pe rând cazurile: cine este media aritmetică? \(a\), \(5b\) sau \(b\)? Vei obține două „forme” de mulțimi. La a), 225 poate fi oricare dintre elemente.`,
      solNote: SOL_SSMR,
      solution: [
        R`Fie \(B = \{b, 5b, a\}\). Cazul I: \(a = \frac{b + 5b}{2} = 3b\), deci \(B = \{b, 3b, 5b\}\). Cazul II: \(5b = \frac{a + b}{2}\), deci \(a = 9b\) și \(B = \{b, 5b, 9b\}\). Cazul III: \(b = \frac{a + 5b}{2}\) dă \(a + 3b = 0\), imposibil.`,
        R`a) 225 se divide cu 3, 5 și 9, deci poate fi oricare element: \(\{225, 675, 1125\}\), \(\{75, 225, 375\}\), \(\{45, 135, 225\}\), \(\{225, 1125, 2025\}\), \(\{45, 225, 405\}\), \(\{25, 125, 225\}\): 6 submulțimi.`,
        R`b) Cazul I: câte una pentru fiecare \(b\) cu \(5b \le 2025\): \(2025 : 5 = 405\). Cazul II: \(9b \le 2025\): \(2025 : 9 = 225\).`,
        R`O mulțime nu poate fi de ambele tipuri (din \(\{x, 3x, 5x\} = \{y, 5y, 9y\}\) ar rezulta \(x = y\) și \(3x = 9y\), contradicție). Total: \(405 + 225 = 630\).`
      ]
    },
    {
      id: 'nat25-3', stage: 'nat', source: 'ONM 2025 · Etapa națională, Buzău · Problema 3', url: URL_NAT_25,
      statement: R`<p>Fie \(ABC\) un triunghi cu \(\angle BAC = 40^\circ\) și \(\angle ABC = 80^\circ\). Notăm cu \(I\) intersecția bisectoarelor triunghiului. Arătați că \(AI = BC\).</p>`,
      fig: { id: 'figIncenter', h: 360, cap: 'Figură desenată de noi după enunț. Segmentele AI și BC sunt evidențiate.' },
      parts: [{ type: 'proof' }],
      hint: R`Fie \(D\) intersecția lui \(BI\) cu \(AC\). Calculează unghiurile triunghiului \(ABD\): ce fel de triunghi este? Apoi duci bisectoarea \(BM\) a unghiului \(DBA\) (\(M \in AC\)) și compari triunghiurile \(IAB\) și \(MBA\). Triunghiul \(MBC\) are ceva special?`,
      solNote: SOL_SSMR + ' (Construcția 1 din barem; baremul mai dă alte trei construcții.)',
      solution: [
        R`\(\angle ACB = 180^\circ - 40^\circ - 80^\circ = 60^\circ\). Bisectoarele împart unghiurile: \(\angle IAB = 20^\circ\), \(\angle IBA = \angle IBC = 40^\circ\).`,
        R`Fie \(D = BI \cap AC\). \(\angle BAD = \angle ABD = 40^\circ\), deci \(\triangle ABD\) este isoscel.`,
        R`Ducem \(BM\), \(M \in AC\), bisectoarea lui \(\angle DBA\): \(\angle ABM = 20^\circ = \angle IAB\). Triunghiurile \(IAB\) și \(MBA\) au \(\angle IAB = \angle MBA = 20^\circ\), \(\angle IBA = \angle MAB = 40^\circ\) și latura comună \(AB\), deci \(\triangle IAB \equiv \triangle MBA\) (U.L.U.) și \(AI = BM\).`,
        R`\(\angle CBM = \angle CBD + \angle DBM = 40^\circ + 20^\circ = 60^\circ\) și \(\angle MCB = 60^\circ\), deci \(\triangle MBC\) este echilateral: \(BC = BM\).`,
        R`Din \(AI = BM\) și \(BM = BC\) rezultă \(AI = BC\).`
      ]
    },
    {
      id: 'nat26-2', stage: 'nat', source: 'ONM 2026 · Etapa națională, Drobeta-Turnu Severin · Problema 2', url: URL_NAT_26,
      statement: R`<p>Pe o foaie cu pătrățele a fost evidențiată o mulțime \(M\) de 36 de puncte, situate ca în figura alăturată. Considerăm mulțimea \(T\) a triunghiurilor (nedegenerate) care au toate cele trei vârfuri în \(M\).</p>`,
      fig: { id: 'figGrid', h: 330, cap: 'Mulțimea M: 36 de puncte, nodurile unei rețele 6 × 6 (un pătrat cu latura de 5 pătrățele). Figură redesenată după cea din documentul oficial.' },
      parts: [
        { q: R`a) Câte dintre punctele mulțimii \(M\) sunt ortocentre ale unor triunghiuri din \(T\)?`, type: 'num', correct: 36, tol: 0.001, unit: 'puncte' },
        { q: R`b) Câte dintre punctele mulțimii \(M\) sunt centre de greutate ale unor triunghiuri din \(T\)?`, type: 'num', correct: 16, tol: 0.001, unit: 'puncte' },
        { q: R`c) Câte dintre punctele mulțimii \(M\) sunt centre ale cercurilor circumscrise unor triunghiuri din \(T\)?`, type: 'num', correct: 36, tol: 0.001, unit: 'puncte' }
      ],
      hint: R`a) Unde este ortocentrul unui triunghi dreptunghic? b) Centrul de greutate este mereu <i>în interiorul</i> triunghiului. c) Centrul cercului circumscris unui triunghi dreptunghic este mijlocul ipotenuzei. Pentru colțuri, gândește-te la \(3^2 + 4^2 = 5^2\).`,
      solNote: SOL_SSMR,
      solution: [
        R`Luăm latura unui pătrățel ca unitate: \(M\) este format din punctele de pe laturile și din interiorul unui pătrat \(P\) de latură 5.`,
        R`a) Fiecare punct din \(M\) este vârful unghiului drept al unui triunghi dreptunghic din \(T\) cu catetele de lungime 1, iar ortocentrul unui triunghi dreptunghic este vârful unghiului drept. Deci toate cele 36 de puncte.`,
        R`b) Punctele de pe laturile lui \(P\) (20 de puncte) nu sunt în interiorul niciunui triunghi din \(T\), deci nu pot fi centre de greutate. Fiecare dintre cele 16 puncte interioare este centrul de greutate al unui triunghi isoscel cu baza 2 și înălțimea 3. Deci 16.`,
        R`c) Orice punct care nu este vârf al lui \(P\) este mijlocul unei ipotenuze de lungime 2 a unui triunghi dreptunghic din \(T\). Fiecare vârf al lui \(P\) este centrul unui cerc de rază 5 care trece prin alte două vârfuri ale lui \(P\) și (cum \(5^2 = 3^2 + 4^2\)) printr-un punct din interior aflat la 4 unități pe orizontală și 3 pe verticală. Deci toate cele 36.`
      ]
    },
    {
      id: 'nat26-4', stage: 'nat', source: 'ONM 2026 · Etapa națională, Drobeta-Turnu Severin · Problema 4', url: URL_NAT_26,
      statement: R`<p>Pentru \(n\) număr natural nenul considerăm mulțimea \(A_n\) a numerelor întregi având modulul mai mic sau egal cu \(n\). Determinați pentru câte valori \(n \le 2026\) este îndeplinită condiția:</p>
<p style="margin-left:1.2em"><i>Mulțimea \(A_n\) poate fi împărțită în trei submulțimi disjuncte \(X, Y, Z\) având același număr de elemente, iar \(s(X) = s(Y) = s(Z)\).</i></p>
<p>Am notat cu \(s(M)\) suma elementelor mulțimii \(M \subset \mathbb{Z}\).</p>`,
      parts: [{ type: 'num', correct: 675, tol: 0.001, unit: 'valori' }],
      hint: R`Câte elemente are \(A_n\)? Numărul lor trebuie să se împartă exact la 3. Suma tuturor elementelor este 0, deci fiecare submulțime trebuie să aibă suma 0. Verifică de mână cazurile mici (\(n = 1\), \(n = 4\)) și gândește-te cum poți adăuga perechi de numere opuse.`,
      solNote: SOL_SSMR,
      solution: [
        R`\(A_n = \{-n, \ldots, -1, 0, 1, \ldots, n\}\) are \(2n + 1\) elemente; trebuie ca \(3 \mid 2n + 1\), adică \(n = 3k + 1\).`,
        R`\(k = 0\): \(A_1 = \{-1, 0, 1\}\) – fiecare submulțime ar avea un singur element, cu sume diferite: nu merge.`,
        R`\(k = 1\): \(A_4\): \(X = \{1, 3, -4\}\), \(Y = \{-1, -3, 4\}\), \(Z = \{-2, 0, 2\}\), toate cu suma 0. Merge.`,
        R`\(k \ge 2\): împărțim \(\{\pm 5, \pm 6, \ldots, \pm(3k + 1)\}\) în \(3(k - 1)\) perechi de numere opuse și adăugăm câte \(k - 1\) perechi la \(X\), \(Y\), \(Z\) de mai sus. Merge.`,
        R`Deci convin \(n = 3k + 1\) cu \(k \ge 1\) și \(3k + 1 \le 2026\), adică \(k = 1, 2, \ldots, 675\): exact 675 de valori.`
      ]
    }
  ];
  /* ---------- verificarea răspunsurilor numerice ---------- */
  function parseNum(raw) {
    if (raw == null) return NaN;
    let s = String(raw).trim().toLowerCase().replace(/\s+/g, '');
    const dm = s.replace(/,/g, '.').match(/^(\d+(?:\.\d+)?)(?:°|grade)(\d+(?:\.\d+)?)(?:'|′|min)?$/);
    if (dm) return Number(dm[1]) + Number(dm[2]) / 60;
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, ''); // 73.320 = 73 320 (separator de mii)
    s = s.replace(/(puncte|elemente|numere|cartonașe|submulțimi|valori|°|grade)$/i, '');
    s = s.replace(/,/g, '.').replace(/[·×]/g, '*').replace(/:/g, '/').replace(/π/g, 'pi');
    s = s.replace(/√\(/g, 'sqrt(').replace(/√(\d+(?:\.\d+)?)/g, 'sqrt($1)');
    s = s.replace(/(\d|\))(?=(sqrt|pi|\())/g, '$1*');
    if (!s || s.replace(/sqrt|pi/g, '').match(/[^0-9.+\-*/()]/)) return NaN;
    const expr = s.replace(/sqrt/g, 'Math.sqrt').replace(/pi/g, 'Math.PI');
    try { const v = Function('"use strict";return (' + expr + ');')(); return typeof v === 'number' ? v : NaN; }
    catch (e) { return NaN; }
  }

  /* ---------- scor ---------- */
  const STORE = 'onm6-practice-solved-v1';
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
          if (isNaN(x)) { fb.className = 'fb no'; fb.textContent = 'Scrie un număr (ex. 12, 7,2 sau 36/5).'; return; }
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
    figTangent(id) {
      const b = board(id, [-3.0, 2.5, 3.9, -2.7]);
      const O = pt(b, [0, 0], 'O', { size: 2, label: { strokeColor: TXT, fontSize: 18, offset: [-18, 10] } });
      b.create('circle', [O, 2], { strokeColor: '#5d6f82', strokeWidth: 2, fixed: true, highlight: false });
      const rad = d => d * Math.PI / 180;
      const M = pt(b, [0, -2], 'M', { label: { strokeColor: TXT, fontSize: 18, offset: [-18, -14] } });
      const N = pt(b, [2 * Math.cos(rad(-15)), 2 * Math.sin(rad(-15))], 'N', { label: { strokeColor: TXT, fontSize: 18, offset: [8, -2] } });
      const P = pt(b, [2, 0], 'P', { label: { strokeColor: TXT, fontSize: 18, offset: [6, 10] } });
      const Q = pt(b, [-2, 0], 'Q', { label: { strokeColor: TXT, fontSize: 18, offset: [-20, 10] } });
      const xr = 2 / Math.tan(rad(52.5));
      const Rp = pt(b, [xr, -2], 'R', { strokeColor: HI, fillColor: HI, label: { strokeColor: HI, fontSize: 18, offset: [4, -16] } });
      b.create('segment', [[-3.1, -2], [3.5, -2]], { strokeColor: LINE, strokeWidth: 2, fixed: true, highlight: false });
      b.create('text', [3.2, -1.75, 't'], { strokeColor: LINE, fontSize: 18, fixed: true });
      seg(b, Q, P); seg(b, O, M); seg(b, O, N); seg(b, O, Rp, { strokeColor: HI, dash: 2 });
      b.create('arc', [O, M, N], { strokeColor: ACC, strokeWidth: 4, fixed: true, highlight: false });
      b.create('text', [2.3 * Math.cos(rad(-38)), 2.3 * Math.sin(rad(-38)), 'arc 75°'], { strokeColor: ACC, fontSize: 15, fixed: true, anchorX: 'left', anchorY: 'middle' });
      b.create('nonreflexangle', [N, O, P], { radius: 0.75, name: '?', fillColor: ACC, fillOpacity: 0.25, strokeColor: ACC, label: { strokeColor: ACC, fontSize: 15 }, fixed: true });
      b.create('nonreflexangle', [O, Rp, M], { radius: 0.45, name: '?', fillColor: HI, fillOpacity: 0.25, strokeColor: HI, label: { strokeColor: HI, fontSize: 15 }, fixed: true });
      b.create('nonreflexangle', [P, O, M], { radius: 0.3, name: '', fillColor: LINE, fillOpacity: 0.12, strokeColor: LINE, fixed: true });
    },
    figIncenter(id) {
      const rad = d => d * Math.PI / 180;
      const a = 4, c = a * Math.sin(rad(60)) / Math.sin(rad(40)), bb = a * Math.sin(rad(80)) / Math.sin(rad(40));
      const Bp = [0, 0], Cp = [a, 0], Ap = [c * Math.cos(rad(80)), c * Math.sin(rad(80))];
      const s = a + bb + c;
      const Ip = [(a * Ap[0] + bb * Bp[0] + c * Cp[0]) / s, (a * Ap[1] + bb * Bp[1] + c * Cp[1]) / s];
      const b = board(id, [-1.3, 5.9, 5.0, -0.8]);
      const A = pt(b, Ap, 'A', { label: { strokeColor: TXT, fontSize: 18, offset: [-6, 12] } });
      const B = pt(b, Bp, 'B', { label: { strokeColor: TXT, fontSize: 18, offset: [-16, -12] } });
      const C = pt(b, Cp, 'C', { label: { strokeColor: TXT, fontSize: 18, offset: [6, -12] } });
      const I = pt(b, Ip, 'I', { strokeColor: HI, fillColor: HI, label: { strokeColor: HI, fontSize: 18, offset: [8, 4] } });
      seg(b, A, B); seg(b, A, C);
      seg(b, B, C, { strokeColor: ACC, strokeWidth: 4 });
      seg(b, A, I, { strokeColor: ACC, strokeWidth: 4 });
      seg(b, B, I, { dash: 2, strokeColor: '#5d6f82' }); seg(b, C, I, { dash: 2, strokeColor: '#5d6f82' });
      b.create('nonreflexangle', [B, A, C], { radius: 0.6, name: '40°', fillColor: LINE, fillOpacity: 0.15, strokeColor: LINE, label: { strokeColor: TXT, fontSize: 14 }, fixed: true });
      b.create('nonreflexangle', [C, B, A], { radius: 0.5, name: '80°', fillColor: LINE, fillOpacity: 0.15, strokeColor: LINE, label: { strokeColor: TXT, fontSize: 14 }, fixed: true });
    },
    figGrid(id) {
      const b = board(id, [-0.9, 5.9, 5.9, -0.9]);
      for (let k = 0; k <= 5; k++) {
        b.create('segment', [[k, 0], [k, 5]], { strokeColor: '#33414f', strokeWidth: 1, fixed: true, highlight: false });
        b.create('segment', [[0, k], [5, k]], { strokeColor: '#33414f', strokeWidth: 1, fixed: true, highlight: false });
      }
      for (let x = 0; x <= 5; x++) for (let y = 0; y <= 5; y++) {
        b.create('point', [x, y], { name: '', withLabel: false, fixed: true, size: 3, strokeColor: ACC, fillColor: ACC, highlight: false, showInfobox: false });
      }
    }
  };

  function init() {
    const lists = { loc: document.getElementById('listLoc'), jud: document.getElementById('listJud'), nat: document.getElementById('listNat') };
    const counters = { loc: 0, jud: 0, nat: 0 };
    PROBLEMS.forEach(p => { counters[p.stage]++; lists[p.stage].append(buildCard(p, counters[p.stage])); });
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
