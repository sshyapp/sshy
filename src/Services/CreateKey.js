const {execSync} = require('child_process');
const {app} = require('electron');
const path = require('path');

const buildCommand = params => {
    let command = 'ssh-keygen';

    command += ` -b ${params.keyBits}`;

    command += ` -t ${params.keyType}`;

    command += ` -f ${path.join(app.getPath('home'), '.ssh', params.keyName)}`;

    if (params.keyComment) {
        command += ` -C ${params.keyComment}`;
    }

    command += ` -q -N ${params.keyPassphrase || ''}`;

    console.log(command);

    return command;
};

const createKey = (params) => {
    try {
        execSync(buildCommand(params)).toString();
        return true;
    } catch (e) {
        return e.message;
    }
};

module.exports = {
    createKey
};
