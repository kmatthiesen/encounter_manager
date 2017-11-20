import _ from 'lodash';
import {rollDice, calculateHp} from './numbers';

export function nameCritters(critters) {
    let newCritters = _.cloneDeep(critters);
    let typeCounter = {};

    _.forEach(newCritters, function(critter) {
        if (!critter.name) {
            let num = typeCounter[critter.type] ? typeCounter[critter.type].current : 1;
            critter.name = critter.type + ' ' + num++;
            typeCounter[critter.type] = {current: num};
        }
    });

    return newCritters;
}

export function orderCritters(critters) {
    let orderCritters = _.orderBy(critters, ['initiative'], ['desc']);
    orderCritters = nameCritters(orderCritters);

    return orderCritters;
}

export function initMonsters(monsters) {
    let newMonsters = [];
    _.forEach(monsters, function(monster) {

        let newMonster = _.cloneDeep(monster);
        newMonster.initiative = rollDice(20, 1) + Number(monster.initiativeMod);
        newMonster.hp = calculateHp(monster.hpDice);
        newMonster.maxHp = newMonster.hp;
        newMonster.isAlive = true;
        newMonster.isBloody = false;

        newMonsters.push(newMonster);
    });

    return newMonsters;
}