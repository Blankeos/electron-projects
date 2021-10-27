// Buttons
const videoElement = document.querySelector("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const videoSelectBtn = document.getElementById("videoSelectBtn");
const { ipcRenderer } = require("electron");

videoSelectBtn.onclick = getVideoSources;

async function getVideoSources(e) {
  e.preventDefault();
  ipcRenderer.send("get-video-sources");
  console.log("Getting video sources...");
}

ipcRenderer.on("get-video-sources-command", (e, command) => {
  // ...
});

// // Get the available video sources
// async function getVideoSources() {
//   const inputSources = await desktopCapturer.getSources({
//     types: ["window", "screen"],
//   });

//   console.log(inputSources);

//   const template = inputSources.map((source) => {
//     return {
//       id: source.id,
//       label: source.name,
//       click: () => selectSource(source),
//     };
//   });

//   console.log(template);

//   console.log(Menu);
//   //   const videoOptionsMenu = Menu.buildFromtemplate(template);

//   //   videoOptionsMenu.popup();
// }
