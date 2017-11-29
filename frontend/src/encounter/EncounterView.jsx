import React from 'react';
import _ from 'lodash';
import {RaisedButton, Snackbar} from 'material-ui';
import AddMonster from '../monster/encounter/AddMonster.jsx';
import EncounterPlayerManager from '../player/EncounterPlayerManager.jsx';

import {isAlive, isBloody} from "../util/numbers";
import {orderCritters, initMonsters} from '../util/critters';
import CurrentMonsters from "../monster/encounter/CurrentMonsters";
import CritterRow from "../critter/CritterRow";
import RollDice from "./RollDice.jsx";


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

        let encounter = sessionStorage.getItem('encounter');

        if (encounter) {
            this.state = JSON.parse(encounter);
        } else {
            this.state = {
                monsters: [],
                players: [],
                critters: [],
                openSnackBar: false,
                openRollDice: false,
                message: '',
                turnNumber: 0
            };
        }

        this.startEncounter = this.startEncounter.bind(this);
        this.changeHp = this.changeHp.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.addMonsters = this.addMonsters.bind(this);
        this.resetEncounter = this.resetEncounter.bind(this);
        this.addReinforcements = this.addReinforcements.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.handleRollDiceDialog = this.handleRollDiceDialog.bind(this);
    }

    componentDidUpdate(one, two) {
        sessionStorage.setItem('encounter', JSON.stringify(this.state));
    }

    startEncounter() {
        let newMonsters = initMonsters(this.state.monsters);

        let newCritters = _.concat(newMonsters, this.state.players);
        newCritters = orderCritters(newCritters);

        this.setState({
            critters: newCritters,
            turnNumber: 0
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
            openSnackBar: true,
            message: 'Players added/updated.'
        })
    }

    addMonsters(monsters) {
        let newMonsters = _.cloneDeep(this.state.monsters);
        newMonsters = _.concat(newMonsters, monsters);

        this.setState({
            monsters: newMonsters,
            openSnackBar: true,
            message: 'Monsters added.'
        })
    }

    addReinforcements(monsters) {
        let newMonsters = initMonsters(monsters);
        let newCritters = _.concat(this.state.critters, newMonsters);
        newCritters = orderCritters(newCritters, true);

        this.setState({
            critters: newCritters,
            openSnackBar: true,
            message: 'Reinforcements added.'
        })
    }

    handleRequestClose() {
        this.setState({
            openSnackBar: false
        });
    }

    handleRollDiceDialog() {
        this.setState({
            openRollDice: !this.state.openRollDice
        })
    }

    nextTurn() {
        let newTurnNumber = this.state.turnNumber + 1;
        let deadMonster = true;
        do {
            newTurnNumber = (this.state.critters.length > newTurnNumber) ? newTurnNumber : 0;
            if (!this.state.critters[newTurnNumber].isAlive) {
                newTurnNumber++;
            } else {
                deadMonster = false;
            }
        } while(deadMonster);

        this.setState({
            turnNumber: newTurnNumber
        })
    }

    render() {
        return (
            <div style={style.container}>
                <div style={{...style.flex, ...style.borderBottom}}>
                    <EncounterPlayerManager style={{...style.flexItem, ...style.borderRight}} addPlayers={this.addPlayers} />
                    <AddMonster style={style.flexItem} addMonsters={this.addMonsters} addReinforcements={this.addReinforcements} />
                </div>
                <div>
                    { !this.state.critters.length ?
                        <div style={{...style.flex, ...style.borderBottom}}>
                            <CurrentMonsters monsters={this.state.monsters}/>
                        </div> : null}
                </div>
                <div>
                    { this.state.critters.length ?
                        <div style={style.borderBottom}>
                            <RaisedButton onClick={this.nextTurn} primary style={style.margin} label="Next Turn"/>
                            <RaisedButton onClick={this.handleRollDiceDialog} secondary style={style.margin} label="Roll Dice"/>
                        </div>
                        : null}
                    {this.state.critters.map((critter, index) => {
                        return <CritterRow key={index} activeTurn={this.state.turnNumber === index} index={index} critter={critter} changeHp={this.changeHp}/>
                    })}
                </div>
                <div>
                    <RaisedButton onClick={this.startEncounter} primary style={style.margin} label="Start Encounter"/>
                    <RaisedButton onClick={this.resetEncounter} secondary style={style.margin} label="End Encounter"/>
                </div>
                <RollDice open={this.state.openRollDice} handleClose={this.handleRollDiceDialog}/>
                <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default EncounterView;