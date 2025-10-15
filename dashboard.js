let falhasChart, generoChart, taxaChart;

// Dados simulados
const dados = {
  hoje: {
    resumo: {
      usuarios: 350,
      acessos: 150,
      falhas: 25,
      diversidade: "87%",
    },
    falhas: [10, 5, 8, 7, 3],
    genero: [46, 42, 8, 4],
    taxa: [90, 91, 92, 93, 94],
  },
  semana: {
    resumo: {
      usuarios: 350,
      acessos: 1200,
      falhas: 180,
      diversidade: "85%",
    },
    falhas: [12, 8, 15, 10, 5],
    genero: [45, 40, 10, 5],
    taxa: [88, 90, 91, 93, 95],
  },
  mes: {
    resumo: {
      usuarios: 350,
      acessos: 4800,
      falhas: 740,
      diversidade: "84%",
    },
    falhas: [14, 11, 18, 13, 6],
    genero: [44, 41, 11, 4],
    taxa: [85, 87, 90, 92, 94],
  },
};

// Atualiza o painel de resumo
function atualizarResumo(periodo) {
  const r = dados[periodo].resumo;
  document.getElementById("totalUsuarios").textContent = r.usuarios;
  document.getElementById("acessos").textContent = r.acessos;
  document.getElementById("falhas").textContent = r.falhas;
  document.getElementById("diversidade").textContent = r.diversidade;
}

/* -------------------------------------------------
   Paleta monocromática (tons de cinza) usada
   - do mais claro ao mais escuro
   ------------------------------------------------- */
const grayPalette = {
  light: "#E5E7EB", // cinza claro (destaques)
  soft: "#D1D5DB",
  mid: "#9CA3AF",
  dark: "#6B7280",
  deep: "#374151", // cinza mais profundo
};

// Cria e atualiza os gráficos
function criarGraficos(periodo) {
  if (falhasChart) falhasChart.destroy();
  if (generoChart) generoChart.destroy();
  if (taxaChart) taxaChart.destroy();

  const data = dados[periodo];

  // Gráfico 1 — Falhas por grupo étnico/social
  const ctxFalhas = document.getElementById("falhasChart").getContext("2d");
  falhasChart = new Chart(ctxFalhas, {
    type: "bar",
    data: {
      labels: [
        "Afrodescendentes",
        "Indígenas",
        "Pessoas com Deficiência",
        "Idosos",
        "Outros",
      ],
      datasets: [
        {
          label: "Falhas (%)",
          data: data.falhas,
          backgroundColor: [
            grayPalette.light,
            grayPalette.soft,
            grayPalette.mid,
            grayPalette.dark,
            grayPalette.deep,
          ],
          borderColor: grayPalette.deep,
          borderWidth: 1.5,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { color: "#fff" } },
        x: { ticks: { color: "#fff" } },
      },
    },
  });

  // Gráfico 2 — Distribuição de gênero
  const ctxGenero = document.getElementById("generoChart").getContext("2d");
  generoChart = new Chart(ctxGenero, {
    type: "pie",
    data: {
      labels: ["Feminino", "Masculino", "Não-binário", "Outros"],
      datasets: [
        {
          data: data.genero,
          backgroundColor: [
            grayPalette.light,
            grayPalette.soft,
            grayPalette.mid,
            grayPalette.dark,
          ],
          borderColor: "#1F2937", // cor do background principal para separar fatias
          borderWidth: 0.8,
        },
      ],
    },
    options: {
      plugins: { legend: { labels: { color: "#fff" } } },
    },
  });

  // Gráfico 3 — Taxa de sucesso
  const ctxTaxa = document.getElementById("taxaChart").getContext("2d");
  taxaChart = new Chart(ctxTaxa, {
    type: "line",
    data: {
      labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
      datasets: [
        {
          label: "Taxa de Reconhecimento (%)",
          data: data.taxa,
          borderColor: grayPalette.light, // linha principal clara
          backgroundColor: "rgba(229,231,235,0.12)", // preenchimento muito suave
          pointBackgroundColor: grayPalette.soft,
          pointBorderColor: grayPalette.deep,
          fill: true,
          tension: 0.25,
          borderWidth: 2,
        },
      ],
    },
  options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: grayPalette.light } }
      },
      scales: {
        x: {
          ticks: { color: grayPalette.light },
          grid: { color: "#262A2D" }
        },
        y: {
          beginAtZero: true,
          ticks: { color: grayPalette.light },
          grid: { color: "#262A2D" }
        }
      }
    }
  });
}

/* -------------------------------------------------
   Inicializa o painel com 'semana' como padrão
   ------------------------------------------------- */
atualizarResumo("semana");
criarGraficos("semana");

/* -------------------------------------------------
   Escuta mudanças no seletor de período e atualiza
   resumo + gráficos dinamicamente
   ------------------------------------------------- */
const seletor = document.getElementById("periodo");
if (seletor) {
  seletor.addEventListener("change", (e) => {
    const periodo = e.target.value;
    atualizarResumo(periodo);
    criarGraficos(periodo);
  });
}
