import React from 'react';
import _ from 'lodash';
import {RaisedButton, TextField} from 'material-ui';

import PlayerTextField from './PlayerTextField.jsx';

const style = {
    flex: {
        display: 'flex',
        justifyContent: 'center',
        margin: '5px 0px'
    },
    center: {
        textAlign: 'center'
    }
};

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
    }

    render() {

        const playerElements = this.generatePlayerElements(this.state.numOfPlayers);

        return (
            <div style={this.props.style}>
                <div style={style.flex}>
                    <TextField value={this.state.numOfPlayers} floatingLabelText={'Number of Players'} onChange={this.handlePlayerChange}/>
                </div>
                <div style={style.center}>
                    {playerElements}
                </div>
                <div style={style.flex}>
                    {this.state.numOfPlayers ? <RaisedButton label="Add Players" primary onClick={this.addPlayers}/> : null}
                </div>
            </div>
        )
    };
}

export default PlayerManager;