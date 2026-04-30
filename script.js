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
  if (paginaNaam === 'ritten') {
    bouwAgenda();
  }
}

// --------------------------------
// GOOGLE DRIVE LINKS PER RIT
// --------------------------------
var gpxLinks = [
  'https://drive.google.com/uc?export=download&id=1dYJsDtUEdJrNbDtOSIS_4jdJzPRZAlBG',
  'https://drive.google.com/uc?export=download&id=1do9zKU0h3VHMWyGZT2Z4LMbCYwj4pYMx',
  'https://drive.google.com/uc?export=download&id=1WByQbEI8QolPRgxpGkrUVdn96rHRUe-a',
  'https://drive.google.com/uc?export=download&id=1kmRmBBcy2td1gnXzbjF1PhwKLdiCVnnw',
  'https://drive.google.com/uc?export=download&id=1r2bCymnS2Pad6FixOYm3Liwqmms2ySh1',
  'https://drive.google.com/uc?export=download&id=1_fIH_V6s8zIq9kmVW3JvjAgve8b_I9XZ',
  'https://drive.google.com/uc?export=download&id=11N5pbg16gi-mWjDceyDoN5pIupxsm5CM',
  'https://drive.google.com/uc?export=download&id=1BbW4Uv4VDnT_OgyN7gE_OHH8bNeNHpNT',
  'https://drive.google.com/uc?export=download&id=1p84nmRAjAIXMxTYGmHKvH_w5ZOoYGTK1',
  'https://drive.google.com/uc?export=download&id=1tHkPFzC3J08S7KMb-XyJz5p_v5OUsS7q',
  'https://drive.google.com/uc?export=download&id=1KIDoniEKQOJpgjJhTA5QL5dQbb5nt7HE',
  'https://drive.google.com/uc?export=download&id=1g1Hmq3PON7TR4DqDLcF77sj9AijgDozb',
  'https://drive.google.com/uc?export=download&id=13fMBU7ZuXtOtXS2l_-n366ChFcl9MphZ',
  'https://drive.google.com/uc?export=download&id=1zzb0r56bnXLfQvdIpHbCoFkLJx0Wh_ua',
  'https://drive.google.com/uc?export=download&id=1o79RISm5-uFyfvuVNjSkLOVaGijXO4gS',
  'https://drive.google.com/uc?export=download&id=1q9eU-mPh57I184X98dCYS28tIISl8UWv',
  'https://drive.google.com/uc?export=download&id=1TJBTOBj6jeuuEMwzV3CrlxU1doBpUv_2',
  'https://drive.google.com/uc?export=download&id=1dmg0oGX1T9UgNqYsf6HQ-xnLu9FPMVBG',
  'https://drive.google.com/uc?export=download&id=1C4OKcqMC_e65Yn0OvM1mBaYuguGBKJIm',
  'https://drive.google.com/uc?export=download&id=1HhsipY7NgxvUvwcfhngSwZQ4qKN9nk6V',
  'https://drive.google.com/uc?export=download&id=1BS5jo9ktWxL5voEAMX8tGv1QrnzkLu0q',
  'https://drive.google.com/uc?export=download&id=11x8gPtNymg8MP0q9r3-Z_wZ5UzemUdY8',
  'https://drive.google.com/uc?export=download&id=1utZc39ahzsNo_xC7u_shmi23SjABYWvK',
  'https://drive.google.com/uc?export=download&id=1zcXqS-sQdqIG7wfN61GUwneIO0xqqiBS',
  'https://drive.google.com/uc?export=download&id=1jjXzBBjLi5iX2Li4m1kfDQB465zLg--5',
  'https://drive.google.com/uc?export=download&id=1EeFS4rzjCN4bOkJcmzi5e8pXvMrmHc08',
  'https://drive.google.com/uc?export=download&id=162RKH9bhzNM-nkQcIlMvEwIeEJkLpxs3',
  'https://drive.google.com/uc?export=download&id=1wKbBY756asPNU-LrHmmf1MADNI9Lx9Xe',
  'https://drive.google.com/uc?export=download&id=1k0VxLaH8A1IcPiZe_9AZwIe3Vq2oWpLj',
  'https://drive.google.com/uc?export=download&id=1tcdCUTdYzXKB9b-NXyJm2jEref10YvQZ',
  'https://drive.google.com/uc?export=download&id=1Le8EGwJnk1ZflXoaejy_ANlj1901-zJO',
  'https://drive.google.com/uc?export=download&id=1wkRqDsuw61l2HshosMzKs_8SBbQmGuev',
  'https://drive.google.com/uc?export=download&id=1QSqA-SLsd3C4MrUaD3a6EsbQhIHOMRuN'
];

// --------------------------------
// HULPFUNCTIES VOOR WEER
// --------------------------------

// Zet graden om naar kompasrichting
function gradenNaarKompas(graden) {
  var richtingen = ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW'];
  var index = Math.round(graden / 45) % 8;
  return richtingen[index];
}

// Zet weathercode om naar emoji
function weerIcoon(code) {
  if (code === 0) return '☀️';
  if (code <= 2) return '⛅';
  if (code <= 3) return '☁️';
  if (code <= 49) return '🌫️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  return '⛈️';
}

// Globale variabele om weerdata bij te houden
var weerData = null;

// Haal weerdata op van Open-Meteo API
function haalWeerOp() {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=50.88&longitude=5.45&daily=temperature_2m_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,weathercode&timezone=Europe/Brussels')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      weerData = data.daily;
      // Herlaad de agenda en homepage met weerdata
      toonRitten();
      toonVolgendeRit();
    });
}

// Zoek weerinfo op voor een bepaalde datum
function getWeerVoorDatum(datum) {
  if (!weerData) return null;
  var index = weerData.time.indexOf(datum);
  if (index === -1) return null;
  return {
    temp: weerData.temperature_2m_max[index],
    regen: weerData.precipitation_probability_max[index],
    wind: weerData.wind_speed_10m_max[index],
    windrichting: gradenNaarKompas(weerData.wind_direction_10m_dominant[index]),
    icoon: weerIcoon(weerData.weathercode[index])
  };
}

// Bouw het HTML blokje voor weerinfo
function weerHtml(weer) {
  if (!weer) return '';
  return '<div class="weer-info">' +
    '<span class="weer-icoon">' + weer.icoon + '</span>' +
    '<span class="weer-temp">' + weer.temp + '°C</span>' +
    '<span class="weer-regen">&#127783; ' + weer.regen + '%</span>' +
    '<span class="weer-wind">&#127788; ' + weer.wind + ' km/h ' + weer.windrichting + '</span>' +
  '</div>';
}

// --------------------------------
// ALLE RITTEN
// --------------------------------
var ritten = [
  { rit:1,  dag:"01", maand:"mar", datum:"2026-03-01", km:61, bestemming:"Schakkebroek Kortebos",     hm:null },
  { rit:2,  dag:"08", maand:"mar", datum:"2026-03-08", km:63, bestemming:"Diepenbeek en omgeving",    hm:275  },
  { rit:3,  dag:"15", maand:"mar", datum:"2026-03-15", km:68, bestemming:"Zelem",                     hm:80   },
  { rit:4,  dag:"22", maand:"mar", datum:"2026-03-22", km:69, bestemming:"Melveren",                  hm:239  },
  { rit:5,  dag:"29", maand:"mar", datum:"2026-03-29", km:72, bestemming:"Wonck",                     hm:628  },
  { rit:6,  dag:"05", maand:"apr", datum:"2026-04-05", km:73, bestemming:"Herstappen",                hm:468  },
  { rit:7,  dag:"12", maand:"apr", datum:"2026-04-12", km:75, bestemming:"Duras",                     hm:253  },
  { rit:8,  dag:"19", maand:"apr", datum:"2026-04-19", km:76, bestemming:"Sonnis",                    hm:225  },
  { rit:9,  dag:"26", maand:"apr", datum:"2026-04-26", km:80, bestemming:"Zutendaal",                 hm:null },
  { rit:10, dag:"03", maand:"mei", datum:"2026-05-03", km:80, bestemming:"Freloux",                   hm:159  },
  { rit:11, dag:"10", maand:"mei", datum:"2026-05-10", km:81, bestemming:"Stein",                     hm:346  },
  { rit:12, dag:"17", maand:"mei", datum:"2026-05-17", km:84, bestemming:"Peer",                      hm:241  },
  { rit:13, dag:"24", maand:"mei", datum:"2026-05-24", km:84, bestemming:"Des Bles D'or",             hm:572  },
  { rit:14, dag:"31", maand:"mei", datum:"2026-05-31", km:85, bestemming:"Hermalle sur Argenteau",    hm:672  },
  { rit:15, dag:"07", maand:"jun", datum:"2026-06-07", km:92, bestemming:"Tongelo",                   hm:281  },
  { rit:16, dag:"14", maand:"jun", datum:"2026-06-14", km:80, bestemming:"Hallembay",                 hm:578  },
  { rit:17, dag:"21", maand:"jun", datum:"2026-06-21", km:85, bestemming:"Oudsbergen",                hm:258  },
  { rit:18, dag:"28", maand:"jun", datum:"2026-06-28", km:86, bestemming:"Lexhy",                     hm:660  },
  { rit:19, dag:"05", maand:"jul", datum:"2026-07-05", km:90, bestemming:"Kerkhoven",                 hm:259  },
  { rit:20, dag:"12", maand:"jul", datum:"2026-07-12", km:82, bestemming:"Schulensmeer",              hm:233  },
  { rit:21, dag:"19", maand:"jul", datum:"2026-07-19", km:82, bestemming:"Vechmaal / s'Herenelderen", hm:null },
  { rit:22, dag:"26", maand:"jul", datum:"2026-07-26", km:79, bestemming:"Dilsen-Stokkem",            hm:321  },
  { rit:23, dag:"02", maand:"aug", datum:"2026-08-02", km:78, bestemming:"Wilderen",                  hm:398  },
  { rit:24, dag:"09", maand:"aug", datum:"2026-08-09", km:78, bestemming:"Niel bij As",               hm:286  },
  { rit:25, dag:"16", maand:"aug", datum:"2026-08-16", km:76, bestemming:"Lantin",                    hm:null },
  { rit:26, dag:"23", maand:"aug", datum:"2026-08-23", km:73, bestemming:"Sluizen",                   hm:357  },
  { rit:27, dag:"30", maand:"aug", datum:"2026-08-30", km:73, bestemming:"Borgworm",                  hm:406  },
  { rit:28, dag:"06", maand:"sep", datum:"2026-09-06", km:68, bestemming:"Heusden Zolder",            hm:165  },
  { rit:29, dag:"13", maand:"sep", datum:"2026-09-13", km:68, bestemming:"Ter Dolen",                 hm:202  },
  { rit:30, dag:"20", maand:"sep", datum:"2026-09-20", km:65, bestemming:"Riemst",                    hm:343  },
  { rit:31, dag:"27", maand:"sep", datum:"2026-09-27", km:62, bestemming:"Rosmeer-Henis",             hm:338  },
  { rit:32, dag:"04", maand:"okt", datum:"2026-10-04", km:60, bestemming:"Roclenge sur Geer",         hm:364  },
  { rit:33, dag:"11", maand:"okt", datum:"2026-10-11", km:61, bestemming:"Koersel Kapelletje",        hm:186  }
];

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
    mar: "Maart", apr: "April",   mei: "Mei",
    jun: "Juni",  jul: "Juli",    aug: "Augustus",
    sep: "September", okt: "Oktober"
  };
  var balk = document.getElementById('filter-balk');
  balk.innerHTML = '';
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
  if (!lijst) return;
  lijst.innerHTML = '';
  var gefilterd = ritten.filter(function(r) {
    if (actieveFilter === 'alle') return true;
    return r.maand === actieveFilter;
  });
  var eersteToekoms = true;
  gefilterd.forEach(function(r) {
    var ritDatum = new Date(r.datum);
    var isVerleden = ritDatum < vandaag;
    var isVolgende = !isVerleden && eersteToekoms;
    if (isVolgende) eersteToekoms = false;
    var gpxUrl = gpxLinks[r.rit - 1];
    var hmTag = r.hm ? '<span class="tag-hm">' + r.hm + ' hm</span>' : '';
    var volgendLabel = isVolgende ? '<span class="volgende-label">volgende rit</span>' : '';
    var klassen = 'agenda-item';
    if (isVerleden) klassen += ' verleden';
    if (isVolgende) klassen += ' volgende';

    // Weerinfo enkel voor toekomstige ritten binnen 7 dagen
    var weer = getWeerVoorDatum(r.datum);
    var weerBlok = (!isVerleden && weer) ? weerHtml(weer) : '';

    var html =
      '<div class="' + klassen + '">' +
        '<div class="agenda-datum">' +
          '<div class="dag">' + r.dag + '</div>' +
          '<div class="maand">' + r.maand + '</div>' +
        '</div>' +
        '<div class="agenda-info">' +
          '<h4>Rit ' + r.rit + ' &mdash; ' + r.bestemming + volgendLabel + '</h4>' +
          weerBlok +
        '</div>' +
        '<div class="agenda-rechts">' +
          '<span class="tag-km">' + r.km + ' km</span>' +
          hmTag +
          '<a class="gpx-knop" href="' + gpxUrl + '" target="_blank">&#11015; GPX</a>' +
        '</div>' +
      '</div>';
    lijst.innerHTML += html;
  });
}

// --------------------------------
// VOLGENDE RIT OP HOMEPAGE
// --------------------------------
function toonVolgendeRit() {
  var vandaag = new Date();
  var jaar = new Date().getFullYear();
  var volgende = ritten.find(function(r) {
    var ritEinde = new Date(r.datum);
    ritEinde.setHours(13, 0, 0);
    return ritEinde >= vandaag;
  });
  if (!volgende) {
    document.getElementById('volgende-rit-blok').style.display = 'none';
    return;
  }
  document.getElementById('volgende-rit-bestemming').textContent = volgende.bestemming;
  document.getElementById('volgende-rit-datum').textContent = volgende.dag + ' ' + volgende.maand + ' ' + jaar;
  document.getElementById('volgende-rit-km').textContent = volgende.km + ' km';
  var hmElement = document.getElementById('volgende-rit-hm');
  if (volgende.hm) {
    hmElement.textContent = volgende.hm + ' hm';
  } else {
    hmElement.style.display = 'none';
  }
  var gpxUrl = gpxLinks[volgende.rit - 1];
  document.getElementById('volgende-rit-gpx').href = gpxUrl;
  var weer = getWeerVoorDatum(volgende.datum);
  var weerContainer = document.getElementById('volgende-rit-weer');
  if (weer && weerContainer) {
    weerContainer.innerHTML = weerHtml(weer);
  }
}

// --------------------------------
// OPSTARTEN
// --------------------------------
// Haal eerst weerdata op, daarna worden homepage en agenda automatisch bijgewerkt
haalWeerOp();
