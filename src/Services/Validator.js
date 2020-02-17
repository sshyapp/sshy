let errors = [];

const validateKeyName = keyName => {
    if (!keyName) {
        errors.push('Key name is required!')
    }
};

const validateKeyType = keyType => {
    if (!['rsa', 'dsa', 'ecdsa', 'ed25519'].includes(keyType)) {
        errors.push('Key type must be rsa, dsa, ecdsa or ed25519!');
    }
};

const validateKeyBits = keyBits => {
    if (![1024, 2048, 4096].includes(parseInt(keyBits))) {
        errors.push('Key bits must be 1024, 2048 or 4096!');
    }
};

const validateKeyPassphrase = (passphrase, passphraseConfirmation) => {
    if (passphrase !== passphraseConfirmation) {
        errors.push('Key passphrase conformation must be same as passphrase!');
    }
};

const getErrors = () => {
    const returnErrors = errors;

    errors = [];

    return returnErrors;
};

const validate = params => {
    validateKeyName(params.keyName);
    validateKeyType(params.keyType);
    validateKeyBits(params.keyBits);
    validateKeyPassphrase(params.keyPassphrase, params.keyPassphraseConformation);

    return getErrors();
};

module.exports = {
    validate
};
