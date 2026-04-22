// ================================
// TRAP & TAP — Script bestand
// ================================

// Navigatie: wissel tussen pagina's
function showPage(paginaNaam) {

  // Verberg alle pagina's
  document.querySelectorAll('.pagina').forEach(function(pagina) {
    pagina.style.display = 'none';
  });

  // Toon de gewenste pagina
  document.getElementById(paginaNaam).style.display = 'block';

  // Markeer de actieve navigatieknop
  document.querySelectorAll('.nav-link').forEach(function(knop) {
    knop.classList.remove('actief');
  });
  document.getElementById('nav-' + paginaNaam).classList.add('actief');
}
