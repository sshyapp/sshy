const {ipcRenderer} = require('electron');
const helper = require('@grafite/helpers');

const cancelModalBtn = document.getElementById('cancel-modal');
const submitBtn = document.getElementById('create-key');

const cancelModal = () => {
    ipcRenderer.send('hey-backend-retreat-retreat-retreat');
};

const sendData = () => {
    const keyName = document.getElementById('key_name').value;
    const keyType = document.getElementById('key_type').value;
    const keyBits = document.getElementById('key_bits').value;
    const keyComment = document.getElementById('key_comment').value || false;
    const keyPassphrase = document.getElementById('key_passphrase').value || false;
    const keyPassphraseConformation = document.getElementById('key_passphrase_conformation').value || false;

    ipcRenderer.send('hey-backend-please-create-a-new-ssh-key', {
        keyName,
        keyType,
        keyBits,
        keyComment,
        keyPassphrase,
        keyPassphraseConformation
    });
};

ipcRenderer.on('hey-frontend-please-show-validation-errors-to-the-user', (event, args) => {
    alert('Data is invalid! \n\n' + helper(args).implode('\n'));
});

ipcRenderer.on('hey-frontend-please-show-shell-errors-to-the-user', (event, args) => {
    alert(args);
});

cancelModalBtn.addEventListener('click', cancelModal);
submitBtn.addEventListener('click', sendData);
