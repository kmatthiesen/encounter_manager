import React from 'react';
import { TextField } from 'material-ui';

const style = {
    margin: {
        margin: '0px 5px'
    }
};

class PlayerManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            initiative: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleInitChange = this.handleInitChange.bind(this);
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

    handleFieldsChanged() {
        if (this.state.name && this.state.initiative) {
            let player = {
                name: this.state.name,
                initiative: Number(this.state.initiative),
                isPlayer: true
            };

            this.props.onChange(this.props.playerNumber, player);
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <TextField value={this.state.name} floatingLabelText={'Player Name'} style={style.margin} onChange={this.handleNameChange}/>
                <TextField value={this.state.initiative} floatingLabelText={'Initiative'} style={style.margin} onChange={this.handleInitChange}/>
            </div>
        )
    };
}

export default PlayerManager;