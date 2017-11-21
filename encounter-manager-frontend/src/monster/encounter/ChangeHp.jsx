import React from 'react';
import { Dialog, FlatButton, TextField, RadioButtonGroup, RadioButton } from 'material-ui';

const style = {
    base: {
        maxWidth: '30%',
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

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleHpChange}
            />,
        ];

        return (
            <div>
                <Dialog
                    style={style.base}
                    title="Change Hp"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField name="hp-change" onChange={this.handleValueChange} value={this.state.modifier} autoFocus/>
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