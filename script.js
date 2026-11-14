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

  // 6) Diário: acha a data (dd/mm/aaaa - hh:mm:ss) e joga para o canto direito,
  //    na mesma linha do título. Não depende de nome de classe.
  var reData = /^\s*\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}:\d{2}:\d{2}\s*$/;
  var raiz = document.querySelector("main") || document.body;

  Array.prototype.slice.call(raiz.querySelectorAll("*")).forEach(function (el) {
    if (el.children.length !== 0 || !reData.test(el.textContent)) return;

    // procura o título logo antes da data (ou antes do bloco que a contém)
    var titulo = el.previousElementSibling;
    if (!titulo && el.parentElement && el.parentElement !== raiz) {
      titulo = el.parentElement.previousElementSibling;
    }

    if (titulo && /^H[1-6]$/.test(titulo.tagName)) {
      var span = document.createElement("span");
      span.className = "data-dir";
      span.textContent = el.textContent.trim();
      titulo.classList.add("com-data");
      titulo.appendChild(span);
      el.remove();
    } else {
      el.classList.add("data-linha");
    }
  });
})();
