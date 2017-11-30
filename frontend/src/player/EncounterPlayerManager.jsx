import React from 'react';
import _ from 'lodash';
import {RaisedButton, TextField} from 'material-ui';
import {connect} from 'react-redux';

import PlayerTextField from './PlayerTextField.jsx';
import PlayerGroupDropdown from "./PlayerGroupDrowdown";

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

class EncounterPlayerManager extends React.Component {

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

    addPlayers() {
        this.props.addPlayers(this.state.players);
    }

    render() {

        const playerElements = this.generatePlayerElements(this.state.numOfPlayers);

        return (
            <div style={this.props.style}>
                <div style={style.flex}>
                    <PlayerGroupDropdown/>
                </div>
                <div style={style.center}>
                    {this.props.activeGroup.players.map((player, index) => {
                        return <PlayerTextField key={index} player={player} onChange={this.handlePlayerFieldChange} />
                    })}
                </div>
                <div style={style.flex}>
                    {this.state.numOfPlayers ? <RaisedButton label="Add Players" primary onClick={this.addPlayers}/> : null}
                </div>
            </div>
        )
    };
}

EncounterPlayerManager = connect((state) => {
    return {
        activeGroup: state.players.activeGroup
    }
});

export default EncounterPlayerManager;