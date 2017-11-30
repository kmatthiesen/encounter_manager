import React from 'react';
import {Dialog, FlatButton, RadioButton, RadioButtonGroup, TextField} from 'material-ui';

const style = {
    base: {
        width: '25%',
        minWidth: '300px',
    }
};

class ChangeHp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subtract: true,
            modifier: ''
        };

        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleHpChange = this.handleHpChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleClose() {
        this.setState({
            subtract: true,
            modifier: ''
        });
        this.props.handleClose();
    }

    handleHpChange() {
        let mod = Number(this.state.modifier);
        if (this.state.subtract) {
            mod = mod * -1;
        }
        this.props.handleHpChange(mod);
        this.handleClose()
    }

    handleModeChange() {
        this.setState({
            subtract: !this.state.subtract
        })
    }

    handleValueChange(event, newValue) {
        this.setState({
            modifier: newValue
        })
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleHpChange();
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleHpChange}
            />,
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <div>
                <Dialog
                    contentStyle={style.base}
                    title={this.props.monsterName}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField name="hp-change" onChange={this.handleValueChange} value={this.state.modifier} autoFocus onKeyPress={this.handleKeyPress}/>
                    <RadioButtonGroup name="changeHp" defaultSelected={this.state.subtract} onChange={this.handleModeChange}>
                        <RadioButton
                            value={true}
                            label="Subtract"
                        />
                        <RadioButton
                            value={false}
                            label="Add"
                        />
                    </RadioButtonGroup>
                </Dialog>
            </div>
        );
    }
}

export default ChangeHp;