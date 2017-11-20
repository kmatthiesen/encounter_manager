import React from 'react';
import { TextField } from 'material-ui';

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
                initiative: Number(this.state.initiative)
            };

            this.props.onChange(this.props.playerNumber, player);
        }
    }

    render() {
        return (
            <div>
                <TextField value={this.state.name} floatingLabelText={'Player Name'} onChange={this.handleNameChange}/>
                <TextField value={this.state.initiative} floatingLabelText={'Initiative'} onChange={this.handleInitChange}/>
            </div>
        )
    };
}

export default PlayerManager;