const {BrowserWindow, ipcMain, shell} = require('electron');
const path = require('path');
const validator = require('./../../Services/Validator');
const {createKey} = require('./../../Services/CreateKey');

let window;

const createWindow = (parentWindow) => {
    // Create the browser window.
    window = new BrowserWindow({
        minWidth: 400,
        minHeight: 400,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
        parent: parentWindow,
        modal: true
    });

    // and load the index.html of the app.
    window.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    // window.webContents.openDevTools();

    window.once('ready-to-show', () => {
        window.show();
    });

    // Emitted when the window is closed.
    window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null;
    });
};

ipcMain.on('hey-backend-retreat-retreat-retreat', () => {
    window.close();
});

ipcMain.on('hey-backend-please-create-a-new-ssh-key', (event, args) => {
    const valid = validator.validate(args);
    if (valid.length > 0) {
        shell.beep();
        return event.sender.send('hey-frontend-please-show-validation-errors-to-the-user', valid);
    }

    const result = createKey(args);

    if (result === true) {
        ipcMain.send('hey-backend-please-send-me-ssh-keys');
        window.close();
        return
    }

    return event.sender.send('hey-frontend-please-show-shell-errors-to-the-user', result);
});

module.exports = {
    createModal: createWindow
};
