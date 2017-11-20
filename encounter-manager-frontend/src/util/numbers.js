import _ from 'lodash';

export function rollDice(die, amount) {
    if (!amount) {
        amount = 1;
    }
    let min = 1;
    let total = 0;
    for (let i = 0; i < amount; i++) {
        total += Math.floor(Math.random() * (die - min + 1) + min)
    }
    return total;
}

export function splitDice(compoundDice) {
    compoundDice = compoundDice.trim();
    let dice = compoundDice.split('d');
    _.forEach(dice, function(value, index) {
        dice[index] = Number(value);
    });
    return dice;
}

export function splitHpDice(compoundDice) {
    let dice = [];
    if (compoundDice.indexOf('+') !== -1) {
        dice = compoundDice.split('+');
        dice[1] = Number(dice[1]);
    } else {
        dice.push(compoundDice);
        dice.push(0);
    }
    return dice;
}

export function calculateHp(compoundDice) {

    let compoundHp = splitHpDice(compoundDice);
    let hpDice = splitDice(compoundHp[0]);
    return rollDice(hpDice[0], hpDice[1]) + compoundHp[1];
}

export function isAlive(hp) {
    return hp > 0;
}

export function isBloody(hp, maxHp) {
    return hp <= (maxHp / 2);
}