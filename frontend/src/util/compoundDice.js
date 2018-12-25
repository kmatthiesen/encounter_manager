import _ from "lodash";

/**
 * Holds the values for a compound dice statement.
 *
 * EX) 2d10 + 1;
 * 2 = multiplier;
 * 10 = die;
 * 1 = modifier;
 */
class CompoundDice {
    multiplier;
    die;
    modifier;

    constructor(compoundDice) {
        this.splitStatement(compoundDice);
    }

    splitStatement(compoundDice) {

        let dice = compoundDice.split('d');

        if (compoundDice.indexOf('+') !== -1) {
            let diceAndModifier = dice[1].split('+');
            dice[1] = diceAndModifier[0];
            dice[2] = diceAndModifier[1];
        }

        _.forEach(dice, function(value, index) {
            dice[index] = Number(value);
        });

        this.multiplier = dice[0];
        this.die = dice[1];
        this.modifier = dice[2] || 0;
    }

}

export default CompoundDice;