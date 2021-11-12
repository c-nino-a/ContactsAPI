const se = require('simple-encryptor')(process.env.PASSPHRASE);

const x = {
    encrypt: val => {
        var result = se.encrypt(val);
        result = encodeURIComponent(result)
        return result;
    },

    decrypt: val => {
        let result = decodeURIComponent(val)
        result = se.decrypt(result);
        return result;
    }
}

module.exports = x