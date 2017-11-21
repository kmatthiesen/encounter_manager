const mongoClient = require('../lib/mongo-client.js');

class MonsterService {

    constructor() {

    }

    getById(id) {
        // return monsterData.getById(id);
    }

    getAll(responder) {

        mongoClient.queryAsync('monsters', {}).then((data) => {
            responder.send(200, data);
        }).catch((error) => {
            responder.send(500, error);
        });
    }

    add(responder, monster) {

        mongoClient.queryAsync('monsters', {'type': monster.type}).then((data) => {
            if (data.length === 0) {
                mongoClient.insertAsync('monsters', monster).then(() => {
                    responder.send(200);
                }).catch((error) => {
                    responder.send(500, error);
                })
            } else {
                responder.send(409, 'Monster already exists');
            }
        }).catch((error) => {
            responder.send(500, error);
        });
    }
}

module.exports = new MonsterService();

