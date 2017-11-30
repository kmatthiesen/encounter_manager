import React from 'react';
import {Dialog, FlatButton, RaisedButton, TextField} from 'material-ui';
import * as Numbers from '../util/numbers';

const style = {
    base: {
        width: '25%',
        minWidth: '300px',
    }
};

class RollDice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dice: '',
            total: '',
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleClose() {
        this.setState({
            dice: ''
        });
        this.props.handleClose();
    }

    rollDice() {
        if (this.state.dice) {
            let total = Numbers.calculateDiceStatement(this.state.dice);
            this.setState({
                total: total
            });
        }
    }

    handleValueChange(event, newValue) {
        this.setState({
            dice: newValue
        })
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.rollDice();
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <div>
                <Dialog
                    contentStyle={style.base}
                    title={"Roll Dice"}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField name="roll-dice" floatingLabelText={"XdY+Z"} onChange={this.handleValueChange}
                               value={this.state.dice} autoFocus
                               onKeyPress={this.handleKeyPress}/>
                    <div>
                        {this.state.total}
                    </div>
                    <RaisedButton
                        label="Roll Dice"
                        primary
                        onClick={this.rollDice}
                    />
                </Dialog>
            </div>
        );
    }
}

export default RollDice;