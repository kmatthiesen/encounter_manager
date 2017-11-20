'use strict';

class Responder {

    constructor (res) {
        this.res = res;
    }

    send (code, body) {
        if(body) {
            this.res.status(code).json(body);
        } else {
            this.res.sendStatus(code);
        }
    }
}

module.exports = Responder;
