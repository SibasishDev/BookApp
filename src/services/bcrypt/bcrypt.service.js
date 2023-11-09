"use strict;"
const bcrypt = require('bcrypt');

class BycryptService {
    constructor () {
        this.salatedRounds = 10;
    }
    encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, this.salatedRounds)
                .then(hash => resolve(hash))
                .catch(err => reject("Internal server error."));
        });
    }

    async matchPassword({ password, hash }) {
        return await bcrypt.compare(password, hash);
    }
};

module.exports = new BycryptService();