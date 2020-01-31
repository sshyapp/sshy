const {clipboard} = require('electron');
const fs = require('fs');

const copyContent = fullPath => {
    const content = fs.readFileSync(`${fullPath}.pub`, 'utf8').toString();

    clipboard.writeText(content, 'clipboard')
};

module.exports = {
    copy: copyContent
};
