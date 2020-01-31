const fs = require('fs');
const path = require('path');
const {app} = require('electron');
const cleaner = require('./Cleanup');

const SSH_FOLDER = path.join(app.getPath('home'), '.ssh');

let processed = [];

const folderHell = absolutePath => {
    let tempFiles = [];

    const contents = fs.readdirSync(absolutePath);

    contents.forEach(content => {
        let absoluteCurrentContent = path.join(absolutePath, '/', content);

        if (fs.statSync(absoluteCurrentContent).isDirectory()) {
            folderHell(absoluteCurrentContent);
        } else {
            tempFiles.push(absoluteCurrentContent);
        }
    });

    tempFiles = cleaner.pairing(tempFiles);

    tempFiles.forEach(file => processed.push(cleaner.compress(file)));

    return processed;
};

const contents = folderHell(SSH_FOLDER).sort((a, b) => (a.fileName > b.fileName) ? 1 : -1);

module.exports = {
    getFiles: contents
};
