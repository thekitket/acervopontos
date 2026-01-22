// -------------------------------
// FUNÇÕES DE TOGGLE
// -------------------------------
function toggleLetra(id) {
  const letra = document.getElementById(id);
  if (!letra) return;

  if (letra.style.maxHeight && letra.style.maxHeight !== "0px") {
    // fecha
    letra.style.maxHeight = "0";
    letra.style.opacity = "0";
  } else {
    // abre com altura automática
    letra.style.maxHeight = letra.scrollHeight + "px";
    letra.style.opacity = "1";
  }
}

function toggleEntidade(id) {
  const pontos = document.getElementById(id);
  if (!pontos) return;

  if (pontos.style.display === "block") {
    pontos.style.maxHeight = "0";
    pontos.style.opacity = "0";
    setTimeout(() => { pontos.style.display = "none"; }, 300);
  } else {
    pontos.style.display = "block";
    setTimeout(() => {
      pontos.style.maxHeight = pontos.scrollHeight + "px";
      pontos.style.opacity = "1";
    }, 10);
  }
}

// -------------------------------
// RENDERIZAÇÃO DO ACERVO
// -------------------------------
function renderAcervo(acervo, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  acervo.forEach((linha, linhaIdx) => {
    const sec = document.createElement("section");
    sec.className = "linha";
    sec.innerHTML = `<h2>${linha.nome}</h2>`;

    linha.entidades.forEach((entidade, entIdx) => {
      const div = document.createElement("div");
      div.className = "entidade";

      const pontosId = `linha${linhaIdx}-entidade${entIdx}`;
      div.innerHTML = `
        <h3>${entidade.nome}</h3>
        <div class="pontos" id="${pontosId}"></div>
      `;

      const pontosContainer = div.querySelector(".pontos");
      entidade.pontos.forEach((ponto, pIdx) => {
        const letraId = `${pontosId}-ponto${pIdx}`;
        const pontoDiv = document.createElement("div");
        pontoDiv.className = "ponto";
        pontoDiv.innerHTML = `
          <strong>${ponto.titulo}</strong>
          <audio controls>
            <source src="${ponto.audio}.mp3" type="audio/mpeg">
            <source src="${ponto.audio}.ogg" type="audio/ogg">
            Seu navegador não suporta áudio.
          </audio>
          <button onclick="toggleLetra('${letraId}')">Ver letra</button>
          <div class="letra" id="${letraId}" style="max-height:0; overflow:hidden; opacity:0; transition: all 0.3s ease;">${ponto.letra}</div>
        `;
        pontosContainer.appendChild(pontoDiv);
      });

      const titulo = div.querySelector("h3");
      titulo.addEventListener("click", () => toggleEntidade(pontosId));

      sec.appendChild(div);
    });

    container.appendChild(sec);
  });
}

// -------------------------------
// SEARCH
// -------------------------------
function searchPontos() {
  const term = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".ponto").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(term) ? "block" : "none";
  });
}
