import _ from 'lodash';
import {rollDice, calculateHp, calculateAverageHp} from './numbers';

export function nameCritters(critters, reinforcements) {
    let newCritters = _.cloneDeep(critters);
    let typeCounter = {};

    if (reinforcements) {
        _.forEach(newCritters, function(critter) {
            if (critter.name) {
                let num = typeCounter[critter.type] ? typeCounter[critter.type].current : 1;
                typeCounter[critter.type] = {current: ++num};
            }
        });
    }

    _.forEach(newCritters, function(critter) {
        if (!critter.name) {
            let num = typeCounter[critter.type] ? typeCounter[critter.type].current : 1;
            critter.name = critter.type + ' ' + num++;
            typeCounter[critter.type] = {current: num};
        }
    });

    return newCritters;
}

export function orderCritters(critters, reinforcements) {
    let orderCritters = _.orderBy(critters, ['initiative', 'initiativeMod'], ['desc', 'desc']);
    orderCritters = nameCritters(orderCritters, reinforcements);

    return orderCritters;
}

export function initMonsters(monsters) {
    let newMonsters = [];
    _.forEach(monsters, function(monster) {

        let newMonster = _.cloneDeep(monster);
        newMonster.initiative = rollDice(20, 1) + Number(monster.initiativeMod);
        newMonster.hp = monster.rollHp ? calculateHp(monster.hpDice) : calculateAverageHp(monster.hpDice);
        newMonster.maxHp = newMonster.hp;
        newMonster.isAlive = true;
        newMonster.isBloody = false;

        newMonsters.push(newMonster);
    });

    return newMonsters;
}