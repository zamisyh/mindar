function checkWebGL() {
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (gl && gl instanceof WebGLRenderingContext) {
    console.log("WebGL is Supported");
  } else {
    alert("WebGL is not supported");
  }
}

function checkWebRTC() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("WebRTC is supported");
  } else {
    alert("WebRTC is not supported");
  }
}

function checkARSupport() {
  if (!"IntersectionObserver" in window) {
    alert("This browser does not support AR features.");
  }

  if (!window.WebGLRenderingContext) {
    alert("Your browser does not support WebGL. Please use a more modern browser.");
  }
}

function loadAllNFTMarkers() {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        console.log(response)
        console.log(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((nftData) => {
      nftData.forEach(createNFTElement);
    })
    .catch((error) => {
      console.error("Error fetching NFT data:", error);
    });
}

function createNFTElement(item) {
  const scene = document.getElementById("scene");
  const nft = document.createElement("a-nft");
  nft.setAttribute("type", "nft");
  nft.setAttribute("url", item.nftUrl);
  nft.setAttribute("smooth", "true");
  nft.setAttribute("smoothCount", "10");
  nft.setAttribute("smoothTolerance", ".01");
  nft.setAttribute("smoothThreshold", "5");
  nft.setAttribute("raycaster", "objects: .clickable");
  nft.setAttribute("emitevents", "true");
  nft.setAttribute("cursor", "fuse: false; rayOrigin: mouse;");

  const entity = document.createElement("a-entity");
  entity.setAttribute("gltf-model", item.gltfModel);
  entity.setAttribute("scale", item.scale || "1 1 1"); 
  entity.setAttribute("position", item.position || "0 0 0");
  entity.setAttribute("class", "clickable");
  entity.setAttribute("animation-mixer");
  entity.setAttribute("gesture-handler", "minScale: 0.25; maxScale: 10");
  // entity.setAttribute("model-opacity", "9")
  entity.setAttribute("material", "shader: standard; roughness: 0.5; metalness: 0.8;")

  nft.appendChild(entity);

  nft.addEventListener("markerFound", () => {
    console.log(`${item.gltfModel} marker found!`);
    const overlay = document.getElementById('example-scanning-overlay');
    overlay.classList.add('hidden'); 
  });

  nft.addEventListener("markerLost", () => {
    console.log(`${item.gltfModel} marker lost!`);
    const overlay = document.getElementById('example-scanning-overlay');
    overlay.classList.remove('hidden');
  });

  scene.appendChild(nft);
}


function initialize() {
  console.log("Initializing application...");
  loadAllNFTMarkers();
  checkWebGL();
  checkWebRTC();
  checkARSupport();
}

document.addEventListener("DOMContentLoaded", initialize);
