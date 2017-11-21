import React from 'react';
import _ from 'lodash';
import {RaisedButton, Snackbar} from 'material-ui';
import MonsterEncounter from '../../monster/encounter/MonsterRow.jsx';
import AddMonster from '../../monster/encounter/AddMonster.jsx';
import PlayerManager from './PlayerManager.jsx';

import {isAlive, isBloody} from "../../util/numbers";
import {orderCritters, initMonsters} from '../../util/critters';


const style = {
    borderBottom: {
        borderBottom: '1px solid #d8dfe7'
    },
    flex: {
        display: 'flex',
        justifyContent: 'center'
    },
    borderRight: {
        borderRight: '1px solid #d8dfe7'
    },
    flexItem: {
        minWidth: '50%',
    },
    margin: {
        margin: '5px'
    }
};

class EncounterView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            monsters: [],
            players: [],
            critters: [],
            open: false,
            message: '',
            turnNumber: 0
        };

        this.startEncounter = this.startEncounter.bind(this);
        this.changeHp = this.changeHp.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.addMonsters = this.addMonsters.bind(this);
        this.resetEncounter = this.resetEncounter.bind(this);
        this.addReinforcements = this.addReinforcements.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
    }

    startEncounter() {
        let newMonsters = initMonsters(this.state.monsters);

        let newCritters = _.concat(newMonsters, this.state.players);
        newCritters = orderCritters(newCritters);

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
            players: players,
            open: true,
            message: 'Players added/updated.'
        })
    }

    addMonsters(monsters) {
        let newMonsters = _.cloneDeep(this.state.monsters);
        newMonsters = _.concat(newMonsters, monsters);

        this.setState({
            monsters: newMonsters,
            open: true,
            message: 'Monsters added.'
        })
    }

    addReinforcements(monsters) {
        let newMonsters = initMonsters(monsters);
        let newCritters = _.concat(this.state.critters, newMonsters);
        newCritters = orderCritters(newCritters, true);

        this.setState({
            critters: newCritters,
            open: true,
            message: 'Reinforcements added.'
        })
    }

    handleRequestClose() {
        this.setState({
            open: false
        });
    }

    nextTurn() {
        let nextTurn = this.state.turnNumber + 1;
        let newTurnNumber = (this.state.critters.length > nextTurn) ? nextTurn : 0;

        this.setState({
            turnNumber: newTurnNumber
        })
    }

    render() {
        return (
            <div style={style.container}>
                <div style={{...style.flex, ...style.borderBottom}}>
                    <PlayerManager style={{...style.flexItem, ...style.borderRight}} addPlayers={this.addPlayers} />
                    <AddMonster style={style.flexItem} addMonsters={this.addMonsters} addReinforcements={this.addReinforcements} />
                </div>
                <div>
                    { this.state.critters.length ? <RaisedButton onClick={this.nextTurn} primary style={style.margin} label="Next Turn"/> : null}
                    {this.state.critters.map((monster, index) => {
                        return <MonsterEncounter key={index} activeTurn={this.state.turnNumber === index} index={index} monster={monster} changeHp={this.changeHp}/>
                    })}
                </div>
                <div>
                    <RaisedButton onClick={this.startEncounter} primary style={style.margin} label="Start Encounter"/>
                    <RaisedButton onClick={this.resetEncounter} secondary style={style.margin} label="Reset Encounter"/>
                </div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default EncounterView;