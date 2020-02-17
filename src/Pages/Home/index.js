const {ipcRenderer} = require('electron');

const copierButtonClasses = 'btn btn-sm btn-link copier';
const copierButtonText = 'Copy public key';

const requestKeys = () => {
    ipcRenderer.send('hey-backend-please-send-me-ssh-keys');
};

const copyPublicKey = event => {
    const button = event.currentTarget;

    button.innerHTML = '';
    button.appendChild(document.createTextNode('Copied'));
    button.setAttribute('class', `${copierButtonClasses} text-success`);
    button.disabled = true;

    ipcRenderer.send('hey-backend-please-copy-the-content-of-this-file', button.dataset.id);

    setTimeout(() => {
        button.innerHTML = '';
        button.appendChild(document.createTextNode(copierButtonText));
        button.setAttribute('class', copierButtonClasses);
        button.disabled = false;
    }, 1500);
};

const renderKeys = keys => {
    const container = document.getElementById('my-ssh-keys');

    container.innerHTML = '';

    keys.forEach(key => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(key.fileName));
        li.setAttribute('class', 'list-group-item list-group-item-dark d-flex justify-content-between align-items-center');
        li.setAttribute('title', key.fullPath);

        const copier = document.createElement('button');
        copier.setAttribute('class', copierButtonClasses);
        copier.appendChild(document.createTextNode(copierButtonText));
        copier.setAttribute('data-id', key.fullPath);

        copier.addEventListener('click', copyPublicKey, false);

        li.appendChild(copier);

        container.appendChild(li);
    });
};

document.getElementById('refresh-files').addEventListener('click', requestKeys);

ipcRenderer.on('there-are-your-ssh-keys-your-welcome', (event, args) => renderKeys(args));

document.getElementById('new-key-modal').addEventListener('click', () => {
    ipcRenderer.send('hey-backend-please-open-the-new-key-modal');
});

(() => requestKeys())();
