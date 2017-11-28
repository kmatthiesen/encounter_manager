const mongoClient = require('../lib/mongo-client.js');
const Collections = require('../constants/collections');

class MonsterService {

    constructor() {

    }

    getById(id) {
        // return monsterData.getById(id);
    }

    getAll(responder) {

        mongoClient.queryAsync(Collections.MONSTERS, {}).then((data) => {
            responder.send(200, data);
        }).catch((error) => {
            responder.send(500, error);
        });
    }

    add(responder, monster) {

        mongoClient.queryAsync(Collections.MONSTERS, {'type': monster.type}).then((data) => {
            if (data.length === 0) {
                mongoClient.insertAsync(Collections.MONSTERS, monster).then(() => {
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

