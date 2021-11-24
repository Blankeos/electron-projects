const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  desktopCapturer,
  dialog,
} = require("electron");
const path = require("path");
const { writeFile } = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// function selectSource(source) {
//   // (renderer)
//   // videoSelectBtn.innerText = source.name;

//   const constraints = {
//     audio: false,
//     video: {
//       mandatory: {
//         chromeMediaSource: "desktop",
//         chromeMediaSourceId: source.id,
//       },
//     },
//   };

//   return {
//     constraints,
//     sourceName: source.name,
//   };

// }

ipcMain.on("show-video-sources-contextmenu", async (event) => {
  const inputSources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });

  const template = inputSources.map((source) => {
    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: source.id,
        },
      },
    };

    return {
      id: source.id,
      label: source.name,
      click: () =>
        event.sender.send("on-video-source-item-click", {
          constraints,
          sourceName: source.name,
        }),
    };
  });

  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});

ipcMain.on("on-stop-recording", async (e, { buffer }) => {
  // console.log(buffer);
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: "Save video",
    defaultPath: `vid-${Date.now()}.webm`,
  });

  console.log(filePath);
  writeFile(filePath, buffer, () => console.log("video saved successfully"));
});
