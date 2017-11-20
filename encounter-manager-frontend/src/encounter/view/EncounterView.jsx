import React from 'react';
import _ from 'lodash';
import {RaisedButton} from 'material-ui';
import MonsterEncounter from '../../monster/encounter/MonsterRow.jsx';
import AddMonster from '../../monster/encounter/AddMonster.jsx';
import PlayerManager from './PlayerManager.jsx';

import {rollDice, calculateHp, isAlive, isBloody} from "../../util/numbers";


const style = {
    divider: {
        marginTop: '15px'
    }
};

class EncounterView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            monsters: [],
            players: [],
            critters: []
        };

        this.startEncounter = this.startEncounter.bind(this);
        this.changeHp = this.changeHp.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.addMonsters = this.addMonsters.bind(this);
        this.resetEncounter = this.resetEncounter.bind(this);
    }

    startEncounter() {
        let newMonsters = [];
        _.forEach(this.state.monsters, function(monster) {

            let newMonster = _.cloneDeep(monster);
            newMonster.initiative = rollDice(20, 1) + Number(monster.initiativeMod);
            newMonster.hp = calculateHp(monster.hpDice);
            newMonster.maxHp = newMonster.hp;
            newMonster.isAlive = true;
            newMonster.isBloody = false;

            newMonsters.push(newMonster);
        });

        let newCritters = _.concat(newMonsters, this.state.players);
        newCritters = _.orderBy(newCritters, ['initiative'], ['desc']);

        this.setState({
            critters: newCritters
        })
    }

    resetEncounter() {
        this.setState({
            monsters: [],
            critters: []
        })
    }

    changeHp(index, mod) {
        let newCritters = _.cloneDeep(this.state.critters);

        let newCritter = newCritters[index];

        newCritter.hp += Number(mod);
        newCritter.isAlive = isAlive(newCritter.hp);
        newCritter.isBloody = isBloody(newCritter.hp, newCritter.maxHp);

        newCritters[index] = newCritter;

        this.setState({
            critters: newCritters
        })
    }

    addPlayers(players) {
        this.setState({
            players: players
        })
    }

    addMonsters(monsters) {
        let newMonsters = _.cloneDeep(this.state.monsters);
        newMonsters = _.concat(newMonsters, monsters);

        this.setState({
            monsters: newMonsters
        })
    }

    render() {
        return (
            <div>
                <div style={style.divider}>
                    <PlayerManager addPlayers={this.addPlayers} />
                </div>
                <div style={style.divider}>
                    <AddMonster addMonsters={this.addMonsters} />
                </div>
                <RaisedButton onClick={this.startEncounter} label="Start Encounter"/>
                <RaisedButton onClick={this.resetEncounter} label="Reset Encounter"/>
                <div style={style.divider}>
                    {this.state.critters.map((monster, index) => {
                        return <MonsterEncounter key={index} index={index} monster={monster} changeHp={this.changeHp}/>
                    })}
                </div>
            </div>
        );
    }
}

export default EncounterView;