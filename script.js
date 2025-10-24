// === VARIÁVEIS BÁSICAS ===
const video = document.getElementById("video");
const btnCapturar = document.getElementById("btnCapturar");
const statusTxt = document.getElementById("status");

// === CARREGAR MODELOS FACEAPI ===
window.addEventListener("load", async () => {
  console.log("Carregando modelos da FaceAPI...");
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/weights"),
    faceapi.nets.faceLandmark68Net.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/weights"),
    faceapi.nets.faceRecognitionNet.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/weights")
  ]);
  console.log("Modelos da FaceAPI carregados!");
});

// === CONFIGURAR FACEMESH ===
const faceMesh = new FaceMesh({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

faceMesh.onResults((results) => {
  if (results.multiFaceLandmarks?.length) {
    const pontos = results.multiFaceLandmarks[0];
    console.log("Coordenadas capturadas:", pontos);
  }
});

// === INTEGRAR FACEMESH COM CÂMERA ===
let camera;
function iniciarFaceMesh() {
  camera = new Camera(video, {
    onFrame: async () => {
      await faceMesh.send({ image: video });
    },
    width: 640,
    height: 480,
  });
  camera.start();
  console.log("FaceMesh conectado à câmera!");
}

// === RECONHECER ROSTO COM FACEAPI ===
btnCapturar.addEventListener("click", async () => {
  statusTxt.textContent = "Analisando...";
  const detections = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detections) {
    statusTxt.textContent = "Nenhum rosto detectado 😕";
    return;
  }

  // 👉 Aqui seria o descritor salvo no banco (mock para teste)
  const rostoSalvo = { descriptor: detections.descriptor };

  const distancia = faceapi.euclideanDistance(
    detections.descriptor,
    rostoSalvo.descriptor
  );

  document.getElementById("simVal").textContent = distancia.toFixed(3);

  if (distancia < 0.5) {
    liberarCatraca();
  } else {
    bloquearCatraca();
  }
});

// === FUNÇÕES DE CONTROLE DA CATRACA ===
function liberarCatraca() {
  document.getElementById("statusCatraca").textContent = "Catraca Liberada ✅";
  document.getElementById("statusCatraca").style.backgroundColor = "green";
  statusTxt.textContent = "Acesso permitido!";
}

function bloquearCatraca() {
  document.getElementById("statusCatraca").textContent = "Catraca Bloqueada 🚫";
  document.getElementById("statusCatraca").style.backgroundColor = "red";
  statusTxt.textContent = "Acesso negado.";
}