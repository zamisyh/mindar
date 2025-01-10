function checkWebRTC() {
  const webRtcStatus = document.getElementById("webrtc-status");
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("WebRTC is supported");
  } else {
    alert("WebRTC is not supported");
  }
}

function checkWebGL() {
  const webGLStatus = document.getElementById("webgl-status");
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (gl && gl instanceof WebGLRenderingContext) {
    console.log("WebGL is Supported");
  } else {
    alert("WebGL is not supported");
  }
}

if (!"IntersectionObserver" in window) {
  alert("This browser does not support AR features.");
}

if (!window.WebGLRenderingContext) {
  alert(
    "Your browser does not support WebGL. Please use a more modern browser."
  );
}

function updateLoadingProgress(percent) {
  const percentElement = document.querySelector(".percent");
  if (percentElement) {
    percentElement.textContent = `${percent}%`;
  } else {
    console.error("Element with class 'percent' not found");
  }
}

function loadAllNFTMarkers() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const scene = document.querySelector("a-scene");
      const totalMarkers = Object.values(data.categories).flat().length;
      let loadedMarkers = 0;

      Object.keys(data.categories).forEach((category) => {
        const nftMarkers = data.categories[category];

        nftMarkers.forEach((item) => {
          const nftElement = document.createElement("a-nft");
          nftElement.setAttribute("type", "nft");
          nftElement.setAttribute("url", `https://zamisyh.github.io/mindar/${item.nft}`);
          nftElement.setAttribute("smooth", "true");
          nftElement.setAttribute("smoothCount", "10");
          nftElement.setAttribute("smoothTolerance", ".01");
          nftElement.setAttribute("smoothThreshold", "5");
          nftElement.setAttribute("id", item.name);

          nftElement.addEventListener("markerFound", (event) =>
            onMarkerFound(event, item.redirectUrl)
          );
          nftElement.addEventListener("markerLost", onMarkerLost);

          nftElement.addEventListener("model-progress", () => {
            document.querySelector(".arjs-loader").style.display = "none";
          });

          scene.appendChild(nftElement);
        });
      });
    })
    .catch((error) => console.error("Error loading JSON data:", error));
}

function onMarkerFound(event, redirectUrl) {
  console.log(`Marker found: ${event.target.id}`);
  showModal(event.target.id, redirectUrl);
}

function onMarkerLost(event) {
  console.log(`Marker lost: ${event.target.id}`);
}

function showModal(markerId, redirectUrl) {
  const modal = document.getElementById("modal");
  const nftName = document.getElementById("nft-name");
  const autoRedirectTimer = document.getElementById("auto-redirect-timer");

  nftName.innerText = markerId.toUpperCase();
  modal.style.display = "flex";

  let countdown = 5;
  const countdownInterval = setInterval(() => {
    countdown--;
    autoRedirectTimer.innerText = `Redirecting in ${countdown} seconds...`;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      window.location.href = redirectUrl;
    }
  }, 1000);
}

loadAllNFTMarkers();
checkWebGL();
checkWebRTC();
