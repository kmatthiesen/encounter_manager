import React from 'react';
import _ from 'lodash';
import { TextField, RaisedButton } from 'material-ui';

import PlayerTextField from './PlayerTextField.jsx';

class PlayerManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfPlayers: '',
            players: []
        };

        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.generatePlayerElements = this.generatePlayerElements.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.handlePlayerFieldChange = this.handlePlayerFieldChange.bind(this);
    }

    handlePlayerChange(event, value) {
        this.setState({
            numOfPlayers: value
        })
    }

    handlePlayerFieldChange(index, player) {
        let newPlayers = _.cloneDeep(this.state.players);
        newPlayers[index] = player;

        this.setState({
            players: newPlayers
        })
    }

    generatePlayerElements(num) {
        let elements = [];
        for (let i = 0; i < num; i++) {
            let element = <PlayerTextField key={i} playerNumber={i} onChange={this.handlePlayerFieldChange} />;
            elements.push(element);
        }

        return elements;
    }

    addPlayers() {
        this.props.addPlayers(this.state.players);
        alert('Players added');
    }

    render() {

        const playerElements = this.generatePlayerElements(this.state.numOfPlayers);

        return (
            <div>
                <TextField value={this.state.numOfPlayers} floatingLabelText={'Number of Players'} onChange={this.handlePlayerChange}/>
                {playerElements}
                {this.state.numOfPlayers ? <RaisedButton label="Add Players" onClick={this.addPlayers}/> : null}
            </div>
        )
    };
}

export default PlayerManager;