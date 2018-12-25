import _ from 'lodash';
import CompoundDice from "./compoundDice";

/**
 * Does the actual rolling of the dice;
 * @param die the die size to roll (4, 6, 8, 10, 12, 20, etc)
 * @param amount the number of dice to roll
 * @returns {number} returns the rolled value;
 */
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

/**
 * Calculates the value of a compound dice statement.
 * @param compoundDice The compound dice statment to evaluate (2d10 + 1)
 * @returns {number} The rolled value based on the compound statement.
 */
export function calculateDiceRoll(compoundDice) {
    let dice = new CompoundDice(compoundDice);
    return rollDice(dice.die, dice.multiplier) + dice.modifier;
}


/**
 * Calculates the rolled hp value of a monster based on its compound dice statement for its hp. (2d10 + 1)
 * @param compoundDice The compound dice statement to evaluate.
 * @returns {number} The hp value for the monster.
 */
export function calculateHp(compoundDice) {
    let dice = new CompoundDice(compoundDice);
    let hp = rollDice(dice.die, dice.multiplier) + dice.modifier;
    let minHp = 2 * dice.multiplier;
    console.log(dice);
    return (hp < minHp ? minHp : hp);
}

/**
 * Determines if a monster is still alive.
 * @param hp The current hp of a monster.
 * @returns {boolean} True if the monster is still alive.
 */
export function isAlive(hp) {
    return hp > 0;
}

/**
 * Calculates if a monster is bloody, if they are at 50% of max hp.
 * @param hp The current hp of a monster.
 * @param maxHp The max hp of the monster.
 * @returns {boolean} True if the monster is bloody.
 */
export function isBloody(hp, maxHp) {
    return hp <= (maxHp / 2);
}

/**
 * Calculates the average hp of a monster instead of rolling the value.
 * @param compoundDice The compound dice statement to evaluate.
 * @returns {number} The hp value for the monster.
 */
export function calculateAverageHp(compoundDice) {
    let dice = new CompoundDice(compoundDice);
    let dieAverage = calculateDieTotal(dice.die) / dice.die;
    return Math.floor(dieAverage * dice.multiplier + dice.modifier);
}

/**
 * Calculates the total value of a die, basically its factorial.
 * A d4 is 4 + 3 + 2 + 1 resulting in 10.
 * @param die The die value to calculate.
 * @returns {number} The total value of the die.
 */
export function calculateDieTotal(die) {
    if (die === 0) {
        return 0;
    }
    return (die + calculateDieTotal(die - 1));
}