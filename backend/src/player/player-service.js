const mongoClient = require('../lib/mongo-client.js');
const Collections = require('../constants/collections');

class MonsterService {

    constructor() {

    }

    getById(id) {
        // return monsterData.getById(id);
    }

    getGroup(responder, group) {

        mongoClient.queryAsync(Collections.PLAYERS, {'name': group}).then((data) => {
            responder.send(200, data);
        }).catch((error) => {
            responder.send(500, error);
        })
    }

    getAll(responder) {

        let sampleData = [{
            name: 'Test Group',
            players: [
                {
                    name: 'Player 1',
                    initiativeMod: 5,
                },
                {
                    name: 'Player 2',
                    initiativeMod: 3
                }
            ]
        }];

        responder.send(200, sampleData);

        // mongoClient.queryAsync(Collections.PLAYERS, {}).then((data) => {
        //     responder.send(200, data);
        // }).catch((error) => {
        //     responder.send(500, error);
        // });
    }

    add(responder, player) {

        mongoClient.queryAsync(Collections.PLAYERS, {'name': player.type}).then((data) => {
            if (data.length === 0) {
                // mongoClient.insertAsync(Collections.PLAYERS, player).then(() => {
                //     responder.send(200);
                // }).catch((error) => {
                //     responder.send(500, error);
                // })
            } else {
                responder.send(409, 'Player already exists');
            }
        }).catch((error) => {
            responder.send(500, error);
        });
    }
}

module.exports = new MonsterService();

