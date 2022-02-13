const path = require("path");
const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;

const isDev = process.env.NODE_ENV === "development";

let win;

const enableClickThrough = () => {
  win.setIgnoreMouseEvents(true);
};

const disableClickThrough = () => {
  win.setIgnoreMouseEvents(false);
};

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const filter = {
    urls: ["*://*.bilibili.com/*", "*://*.hdslb.com/*"],
  };
  const session = electron.session;
  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders["Origin"] = "https://live.bilibili.com";
      details.requestHeaders["referer"] = "https://www.bilibili.com";
      callback({ requestHeaders: details.requestHeaders });
    }
  );
  session.defaultSession.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
      delete details.responseHeaders["access-control-allow-origin"];
      details.responseHeaders["Access-Control-Allow-Origin"] = "*";
      callback({ responseHeaders: details.responseHeaders });
    }
  );

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./build/index.html")}`
  );
}

if (process.platform === "linux") {
  app.commandLine.appendSwitch("enable-transparent-visuals");
  app.commandLine.appendSwitch("disable-gpu");
}

app.on("ready", () => setTimeout(createWindow, 300));

app.on("window-all-closed", function () {
  app.quit();
  win = null;
});

ipcMain.handle("disableClickThrough", () => {
  disableClickThrough();
});

ipcMain.handle("enableClickThrough", () => {
  enableClickThrough();
});
