import _ from 'lodash';

export function rollDice(die, amount) {
    if (!amount) {
        amount = 1;
    }
    let min = 1;
    let total = 0;
    for (let i = 0; i < amount; i++) {
        total += _.random(min, die);
    }
    return total;
}

export function splitStatement(compoundDice) {
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

export function calculateDiceStatement(compoundDice) {

    let compoundHp = splitHpDice(compoundDice);
    let hpDice = splitStatement(compoundHp[0]);
    return rollDice(hpDice[1], hpDice[0]) + compoundHp[1];
}

export function calculateHp(compoundDice) {
    let compoundHp = splitHpDice(compoundDice);
    let hpDice = splitStatement(compoundHp[0]);
    let hp = rollDice(hpDice[1], hpDice[0]) + compoundHp[1];
    let minHp = 2 * hpDice[0];
    return (hp < minHp ? minHp : hp);
}

export function isAlive(hp) {
    return hp > 0;
}

export function isBloody(hp, maxHp) {
    return hp <= (maxHp / 2);
}

export function calculateAverageHp(compoundDice) {
    let compoundHp = splitHpDice(compoundDice);
    let hpDice = splitStatement(compoundHp[0]);
    let dieAverage = calculateDieTotal(hpDice[1]) / hpDice[1];
    return Math.floor(dieAverage * hpDice[0] + compoundHp[1]);
}

export function calculateDieTotal(die) {
    if (die === 0) {
        return 0;
    }
    return (die + calculateDieTotal(die - 1));
}