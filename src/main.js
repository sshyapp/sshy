const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const {getFiles} = require('./Services/ReadKeys');
const {copy} = require('./Services/CopyContent');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 400,
        minHeight: 400,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'Pages/Home/index.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    ipcMain.on('hey-backend-please-send-me-ssh-keys', (event, args) => {
        event.reply('there-are-your-ssh-keys-your-welcome', getFiles);
    });

    ipcMain.on('hey-backend-please-copy-the-content-of-this-file', (event, args) => {
        copy(args);
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
