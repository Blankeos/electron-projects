// Electron API
const { ipcRenderer } = require("electron");

// Global State
let mediaRecorder; // MediaRecorder isntance to capture footage
const recordedChunks = [];

// Buttons
const videoElement = document.querySelector("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const videoSelectBtn = document.getElementById("videoSelectBtn");

videoSelectBtn.onclick = getVideoSources;

startBtn.onclick = (e) => {
  mediaRecorder.start();
  startBtn.classList.add("bg-red-500");
  startBtn.classList.remove("bg-green-500");
  startBtn.innerText = "Recording";
};

stopBtn.onclick = (e) => {
  mediaRecorder.stop();
  startBtn.classList.remove("bg-red-500");
  startBtn.classList.add("bg-green-500");
  startBtn.innerText = "Start";
};

async function getVideoSources(e) {
  e.preventDefault();
  ipcRenderer.send("show-video-sources-contextmenu");
  console.log("Getting video sources...");
}

async function startRecording(e) {
  e.preventDefault();
}

ipcRenderer.on(
  "on-video-source-item-click",
  async (e, { constraints, sourceName }) => {
    videoSelectBtn.innerText = sourceName;
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoElement.srcObject = stream;
    videoElement.play();

    // Create the Media Recorder
    const options = { mimeType: "video/webm; codecs=vp9" };
    mediaRecorder = new MediaRecorder(stream, options);

    // Register Event Handlers
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
  }
);

// Captures all recorded chunks
function handleDataAvailable(e) {
  console.log("video data available");
  recordedChunks.push(e.data);
}

async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: "video/webm; codecs=vp9",
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  // console.log(buffer);
  // Main
  ipcRenderer.send("on-stop-recording", {
    buffer,
  });
}
