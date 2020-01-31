const excludedFiles = require('./../../config/excludedFiles').files;
const fs = require('fs');
const helper = require('@grafite/helpers');

/**
 * @param {array} folderContent
 * @returns {array}
 */
const cleanup = folderContent => {
    excludedFiles.forEach(excludedFile => {
        folderContent.forEach((absolutePath, index) => {
            if (helper(absolutePath).endsWith(excludedFile)) {
                folderContent.splice(index, 1);
            }
        })
    });

    return folderContent.sort();
};

/**
 * @param {array} folderContent
 * @returns {array}
 */
const pairPrivateAnPublicKeys = (folderContent) => {
    let pairs = [];
    folderContent.forEach(fileName => {
        if (folderContent.includes(`${fileName}.pub`)) {
            pairs.push(fileName);
        }
    });

    return pairs;
};

/**
 * @param {string} absolutePath
 * @returns {{fullPath: string, fileName: string, birth: Date}}
 */
const compressMeta = (absolutePath) => {
    return {
        fullPath: absolutePath,
        fileName: helper(absolutePath).afterLast('/'),
        birth: fs.statSync(absolutePath).birthtime
    }
};

module.exports = {
    clean: cleanup,
    pairing: pairPrivateAnPublicKeys,
    compress: compressMeta
};
