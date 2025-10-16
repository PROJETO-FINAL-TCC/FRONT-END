// =====================
// Chart.js - Dashboard
// =====================

// === Gráfico de Barras: Sucesso por grupo demográfico ===
const barCtx = document.getElementById("barChart").getContext("2d");
new Chart(barCtx, {
    type: "bar",
    data: {
        labels: ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E"],
        datasets: [{
            label: "Taxa de sucesso (%)",
            data: [98, 88, 90, 92, 89],
            backgroundColor: ["#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151"],
            borderRadius: 8,
        }, ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: "#d1d5db" },
                grid: { color: "#374151" },
            },
            x: {
                ticks: { color: "#d1d5db" },
                grid: { display: false },
            },
        },
        plugins: {
            legend: { display: false },
        },
    },
});

// === Gráfico de Pizza: RF vs NFC ===
const pieCtx = document.getElementById("pieChart").getContext("2d");
new Chart(pieCtx, {
    type: "pie",
    data: {
        labels: ["RF", "NFC"],
        datasets: [{
            data: [330, 120],
            backgroundColor: ["#6b7280", "#9ca3af"],
        }, ],
    },
    options: {
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: "#d1d5db" },
            },
        },
    },
});

// === Gráfico de Linha: Evolução temporal ===
const lineCtx = document.getElementById("lineChart").getContext("2d");
new Chart(lineCtx, {
    type: "line",
    data: {
        labels: ["Jun", "Jul", "Ago", "Set"],
        datasets: [{
            label: "Taxa de sucesso (%)",
            data: [89, 91, 93, 95],
            borderColor: "#d1d5db",
            backgroundColor: "rgba(156, 163, 175, 0.3)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
        }, ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                ticks: { color: "#d1d5db" },
                grid: { color: "#374151" },
            },
            x: {
                ticks: { color: "#d1d5db" },
                grid: { display: false },
            },
        },
        plugins: {
            legend: { display: false },
        },
    },
});