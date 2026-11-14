// Script mínimo, sem dependências e sem animações.
(function () {
  "use strict";

  // 1) Sublinha no menu a página atual
  var arquivo = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(function (link) {
    if (link.getAttribute("href") === arquivo) {
      link.classList.add("atual");
    }
  });

  // 2) Monta estrelas a partir de data-nota="0..5"
  //    Exemplo: <span class="estrelas" data-nota="4"></span>  ->  ★★★★☆
  document.querySelectorAll(".estrelas[data-nota]").forEach(function (el) {
    var texto = el.getAttribute("data-nota");
    if (texto === "") return;
    var nota = Math.max(0, Math.min(5, parseInt(texto, 10) || 0));
    el.textContent = "★".repeat(nota) + "☆".repeat(5 - nota);
  });

  // 3) Preenche "última atualização" com a data de modificação da página
  var alvo = document.getElementById("atualizado");
  if (alvo && document.lastModified) {
    var d = new Date(document.lastModified);
    if (!isNaN(d.getTime())) {
      var dd = String(d.getDate()).padStart(2, "0");
      var mm = String(d.getMonth() + 1).padStart(2, "0");
      alvo.textContent = dd + "/" + mm + "/" + d.getFullYear();
    }
  }

  // 4) Links externos abrem em nova aba
  document.querySelectorAll("a[href^='http']").forEach(function (a) {
    if (a.hostname !== window.location.hostname) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  });

  // 5) Ano atual no rodapé: <span id="ano"></span>
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
