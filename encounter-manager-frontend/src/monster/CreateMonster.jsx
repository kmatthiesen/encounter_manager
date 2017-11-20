import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import axios from 'axios';

import Endpoints from '../config/endpoints';

const style = {
    base: {
        padding: '15px',
        textAlign: 'center'
    },
    text: {
        margin: '5px'
    },
};

class CreateMonster extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: '',
            hpDice: '',
            initiativeMod: '',
            url: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleHpDiceChange = this.handleHpDiceChange.bind(this);
        this.handleInitModChange = this.handleInitModChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleNameChange(event, value) {
        this.setState({
            type: value
        })
    }

    handleHpDiceChange(event, value) {
        this.setState({
            hpDice: value
        })
    }

    handleInitModChange(event, value) {
        this.setState({
            initiativeMod: value
        })
    }

    handleUrlChange(event, value) {
        this.setState({
            url: value
        })
    }

    handleCreate() {
        let monster = {
            type: this.state.type,
            hpDice: this.state.hpDice,
            initiativeMod: this.state.initiativeMod,
            url: this.state.url
        };

        let url = Endpoints.URL + ':' + Endpoints.PORT + Endpoints.MONSTER;
        axios.post(url, monster, {crossdomain: true}).then((response) => {
            this.setState({
                monsters: response.data,
                type: '',
                hpDice: '',
                initiativeMod: '',
                url: ''
            });
            alert("Created Successfully");
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div style={style.base}>
                <div>
                    <TextField name="name" style={style.text} floatingLabelText="Name" value={this.state.type} onChange={this.handleNameChange} autoFocus/>
                    <TextField name="hp-dice" style={style.text} floatingLabelText="Hp Dice (xdy + z)" value={this.state.hpDice} onChange={this.handleHpDiceChange}/>
                </div>
                <div>
                    <TextField name="init-mod" style={style.text} floatingLabelText="InitiativeMod" value={this.state.initiativeMod} onChange={this.handleInitModChange}/>
                    <TextField name="url" style={style.text} floatingLabelText="Dnd Beyond Url" value={this.state.url} onChange={this.handleUrlChange}/>
                </div>
                <RaisedButton label="Create" primary onClick={this.handleCreate}/>
            </div>
        )
    }
}

export default CreateMonster;