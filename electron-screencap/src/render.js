// Buttons
const videoElement = document.querySelector("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const videoSelectBtn = document.getElementById("videoSelectBtn");
const { ipcRenderer } = require("electron");

videoSelectBtn.onclick = getVideoSources;

async function getVideoSources(e) {
  e.preventDefault();
  ipcRenderer.send("show-video-sources-contextmenu");
  console.log("Getting video sources...");
}

ipcRenderer.on(
  "on-video-source-item-click",
  async (e, { constraints, sourceName }) => {
    videoSelectBtn.innerText = sourceName;
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoElement.srcObject = stream;
    videoElement.play();
  }
);
