let monsterData = require('./monster-data.js');


class MonsterService {

    constructor() {

    }

    getById(id) {
        return monsterData.getById(id);
    }

    getAll(responder) {
        responder.send(200, monsterData.getAll());
    }

    add(responder, monster) {
        monsterData.add(monster, (data) => {
            responder.send(201, data);
        });
    }
}

module.exports = new MonsterService();

