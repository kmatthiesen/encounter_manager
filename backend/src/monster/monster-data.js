let _ = require('lodash');
let fs = require('fs');

class MonsterData {

    constructor() {
        this.updateData();
    }

    getById(id) {
        return _.find(this.data, {id: id});
    }

    getAll() {
        return this.data;
    }

    add(monster, callback) {
        monster.id = 0;
        _.forEach(this.data, function(value) {
            monster.id = (value.id >= monster.id) ? value.id + 1 : monster.id;
        });

        let newData = this.data;
        newData.push(monster);

        let json = JSON.stringify(newData);
        fs.writeFile('./src/monster/monster.json', json, 'utf8', () => {
            this.updateData();
            callback(this.data);
        });

    }

    edit(monster) {

    }

    updateData() {
        this.data = require('./monster.json');
    }
}

module.exports = new MonsterData();