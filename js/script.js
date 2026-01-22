// -------------------------------
// FUNÇÕES DE TOGGLE
// -------------------------------
function toggleLetra(id) {
  const l = document.getElementById(id);
  if (!l) return;

  const isVisible = l.style.display === "block";
  l.style.display = isVisible ? "none" : "block";
}

function toggleEntidade(id) {
  const e = document.getElementById(id);
  if (!e) return;

  e.classList.toggle("active");
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
          <div class="letra" id="${letraId}">${ponto.letra}</div>
        `;
        pontosContainer.appendChild(pontoDiv);
      });

      // Evento para mostrar/ocultar pontos
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
