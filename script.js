// ================================
// TRAP & TAP — Script bestand
// ================================

// --------------------------------
// PAGINA WISSELEN
// --------------------------------
function showPage(paginaNaam) {
  document.querySelectorAll('.pagina').forEach(function(pagina) {
    pagina.style.display = 'none';
  });
  document.getElementById(paginaNaam).style.display = 'block';
  document.querySelectorAll('.nav-link').forEach(function(knop) {
    knop.classList.remove('actief');
  });
  document.getElementById('nav-' + paginaNaam).classList.add('actief');

  // Als we naar ritten gaan, bouw de agenda op
  if (paginaNaam === 'ritten') {
    bouwAgenda();
  }
}

// --------------------------------
// ALLE RITTEN (array van objecten)
// --------------------------------
// Een array [ ] bevat meerdere objecten { }
// Elk object is één rit met zijn eigen gegevens
var ritten = [
  { rit:1,  dag:"01", maand:"mar", datum:"2026-03-01", km:61, bestemming:"Schakkebroek Kortebos",      hm:null },
  { rit:2,  dag:"08", maand:"mar", datum:"2026-03-08", km:63, bestemming:"Diepenbeek en omgeving",     hm:275  },
  { rit:3,  dag:"15", maand:"mar", datum:"2026-03-15", km:68, bestemming:"Zelem",                      hm:80   },
  { rit:4,  dag:"22", maand:"mar", datum:"2026-03-22", km:69, bestemming:"Melveren",                   hm:239  },
  { rit:5,  dag:"29", maand:"mar", datum:"2026-03-29", km:72, bestemming:"Wonck",                      hm:628  },
  { rit:6,  dag:"05", maand:"apr", datum:"2026-04-05", km:73, bestemming:"Herstappen",                 hm:468  },
  { rit:7,  dag:"12", maand:"apr", datum:"2026-04-12", km:75, bestemming:"Duras",                      hm:253  },
  { rit:8,  dag:"19", maand:"apr", datum:"2026-04-19", km:76, bestemming:"Sonnis",                     hm:225  },
  { rit:9,  dag:"26", maand:"apr", datum:"2026-04-26", km:80, bestemming:"Zutendaal",                  hm:null },
  { rit:10, dag:"03", maand:"mei", datum:"2026-05-03", km:80, bestemming:"Freloux",                    hm:159  },
  { rit:11, dag:"10", maand:"mei", datum:"2026-05-10", km:81, bestemming:"Stein",                      hm:346  },
  { rit:12, dag:"17", maand:"mei", datum:"2026-05-17", km:84, bestemming:"Peer",                       hm:241  },
  { rit:13, dag:"24", maand:"mei", datum:"2026-05-24", km:84, bestemming:"Des Bles D'or",              hm:572  },
  { rit:14, dag:"31", maand:"mei", datum:"2026-05-31", km:85, bestemming:"Hermalle sur Argenteau",     hm:672  },
  { rit:15, dag:"07", maand:"jun", datum:"2026-06-07", km:92, bestemming:"Tongelo",                    hm:281  },
  { rit:16, dag:"14", maand:"jun", datum:"2026-06-14", km:80, bestemming:"Hallembay",                  hm:578  },
  { rit:17, dag:"21", maand:"jun", datum:"2026-06-21", km:85, bestemming:"Oudsbergen",                 hm:258  },
  { rit:18, dag:"28", maand:"jun", datum:"2026-06-28", km:86, bestemming:"Lexhy",                      hm:660  },
  { rit:19, dag:"05", maand:"jul", datum:"2026-07-05", km:90, bestemming:"Kerkhoven",                  hm:259  },
  { rit:20, dag:"12", maand:"jul", datum:"2026-07-12", km:82, bestemming:"Schulensmeer",               hm:233  },
  { rit:21, dag:"19", maand:"jul", datum:"2026-07-19", km:82, bestemming:"Vechmaal / s'Herenelderen",  hm:null },
  { rit:22, dag:"26", maand:"jul", datum:"2026-07-26", km:79, bestemming:"Dilsen-Stokkem",             hm:321  },
  { rit:23, dag:"02", maand:"aug", datum:"2026-08-02", km:78, bestemming:"Wilderen",                   hm:398  },
  { rit:24, dag:"09", maand:"aug", datum:"2026-08-09", km:78, bestemming:"Niel bij As",                hm:286  },
  { rit:25, dag:"16", maand:"aug", datum:"2026-08-16", km:76, bestemming:"Lantin",                     hm:null },
  { rit:26, dag:"23", maand:"aug", datum:"2026-08-23", km:73, bestemming:"Sluizen",                    hm:357  },
  { rit:27, dag:"30", maand:"aug", datum:"2026-08-30", km:73, bestemming:"Borgworm",                   hm:406  },
  { rit:28, dag:"06", maand:"sep", datum:"2026-09-06", km:68, bestemming:"Heusden Zolder",             hm:165  },
  { rit:29, dag:"13", maand:"sep", datum:"2026-09-13", km:68, bestemming:"Ter Dolen",                  hm:202  },
  { rit:30, dag:"20", maand:"sep", datum:"2026-09-20", km:65, bestemming:"Riemst",                     hm:343  },
  { rit:31, dag:"27", maand:"sep", datum:"2026-09-27", km:62, bestemming:"Rosmeer-Henis",              hm:338  },
  { rit:32, dag:"04", maand:"okt", datum:"2026-10-04", km:60, bestemming:"Roclenge sur Geer",          hm:364  },
  { rit:33, dag:"11", maand:"okt", datum:"2026-10-11", km:61, bestemming:"Koersel Kapelletje",         hm:186  }
];

// Welke maand is momenteel geselecteerd als filter
var actieveFilter = "alle";

// --------------------------------
// AGENDA OPBOUWEN
// --------------------------------
function bouwAgenda() {
  bouwFilterKnoppen();
  toonRitten();
}

function bouwFilterKnoppen() {
  var maanden = ["alle", "mar", "apr", "mei", "jun", "jul", "aug", "sep", "okt"];
  var maandNamen = {
    alle: "Alle ritten",
    mar: "Maart", apr: "April", mei: "Mei",
    jun: "Juni",  jul: "Juli",  aug: "Augustus",
    sep: "September", okt: "Oktober"
  };

  var balk = document.getElementById('filter-balk');
  balk.innerHTML = '';

  // Loop over elke maand en maak een knop aan
  maanden.forEach(function(maand) {
    var knop = document.createElement('button');
    knop.className = 'filter-knop' + (maand === actieveFilter ? ' actief' : '');
    knop.textContent = maandNamen[maand];
    knop.onclick = function() {
      actieveFilter = maand;
      bouwAgenda();
    };
    balk.appendChild(knop);
  });
}

function toonRitten() {
  var vandaag = new Date();
  var lijst = document.getElementById('agenda-lijst');
  lijst.innerHTML = '';

  // Filter de ritten op de actieve maand
  var gefilterd = ritten.filter(function(r) {
    if (actieveFilter === 'alle') return true;
    return r.maand === actieveFilter;
  });

  // Vind de eerste rit die nog niet geweest is
  var eersteToekoms = true;

  // Loop over elke rit en maak HTML aan
  gefilterd.forEach(function(r) {
    var ritDatum = new Date(r.datum);
    var isVerleden = ritDatum < vandaag;
    var isVolgende = !isVerleden && eersteToekoms;
    if (isVolgende) eersteToekoms = false;

    // GPX bestandsnaam automatisch opbouwen
    var gpxNaam = 'gpx/rit' + String(r.rit).padStart(2, '0') + '_' +
      r.bestemming.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '') + '.gpx';

    // Hoogtemeters tag — alleen tonen als er een waarde is
    var hmTag = r.hm ? '<span class="tag-hm">' + r.hm + ' hm</span>' : '';

    // Volgende rit label
    var volgendLabel = isVolgende ? '<span class="volgende-label">volgende rit</span>' : '';

    // Klassen bepalen
    var klassen = 'agenda-item';
    if (isVerleden) klassen += ' verleden';
    if (isVolgende) klassen += ' volgende';

    // HTML aanmaken voor deze rit
    var html =
      '<div class="' + klassen + '">' +
        '<div class="agenda-datum">' +
          '<div class="dag">' + r.dag + '</div>' +
          '<div class="maand">' + r.maand + '</div>' +
        '</div>' +
        '<div class="agenda-info">' +
          '<h4>Rit ' + r.rit + ' &mdash; ' + r.bestemming + volgendLabel + '</h4>' +
          '<p>Vertrek 9u00 &middot; Parking Demerstrand, Diepenbeek</p>' +
        '</div>' +
        '<div class="agenda-rechts">' +
          '<span class="tag-km">' + r.km + ' km</span>' +
          hmTag +
          '<a class="gpx-knop" href="' + gpxNaam + '" download>&#11015; GPX</a>' +
        '</div>' +
      '</div>';

    lijst.innerHTML += html;
  });
}
