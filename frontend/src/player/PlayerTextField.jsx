import React from 'react';
import {TextField} from 'material-ui';

const style = {
    margin: {
        margin: '0px 5px',
        width: '25%'
    }
};

class PlayerManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            initiative: '',
            initiativeMod: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInitChange = this.handleInitChange.bind(this);
        this.handleInitModChange = this.handleInitModChange.bind(this);
        this.handleFieldsChanged = this.handleFieldsChanged.bind(this);
    }

    handleNameChange(event, value) {
        this.setState({
            name: value
        }, this.handleFieldsChanged)
    }

    handleInitChange(event, value) {
        this.setState({
            initiative: value
        }, this.handleFieldsChanged)
    }

    handleInitModChange(event, value) {
        this.setState({
            initiativeMod: value
        }, this.handleFieldsChanged)
    }

    handleFieldsChanged() {
        if (this.state.name && this.state.initiative && this.state.initiativeMod) {
            let player = {
                name: this.state.name,
                initiative: Number(this.state.initiative),
                initiativeMod: Number(this.state.initiativeMod),
                isPlayer: true,
                isAlive: true
            };

            this.props.onChange(this.props.playerNumber, player);
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <TextField value={this.state.name} floatingLabelText={'Player Name'} style={style.margin} onChange={this.handleNameChange}/>
                <TextField value={this.state.initiative} floatingLabelText={'Initiative'} style={style.margin} onChange={this.handleInitChange}/>
                <TextField value={this.state.initiativeMod} floatingLabelText={'Initiative Modifier'} style={style.margin} onChange={this.handleInitModChange}/>
            </div>
        )
    };
}

export default PlayerManager;