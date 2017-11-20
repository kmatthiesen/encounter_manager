import React from 'react';
import ChangeHp from './ChangeHp.jsx';

const style = {
    div: {
        borderBottom: '1px solid black'
    }
};

class MonsterEncounter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleHpChange = this.handleHpChange.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    handleHpChange(mod) {
        this.props.changeHp(this.props.index, Number(mod));
    }

    toggleDialog() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <div style={style.div}>
                <a href={this.props.monster.url} target="_blank">{this.props.monster.name}</a> |
                <span onClick={this.toggleDialog}> HP: {this.props.monster.hp} | Intiative: {this.props.monster.initiative}</span>
                <ChangeHp open={this.state.open} handleClose={this.toggleDialog} handleHpChange={this.handleHpChange} />
            </div>


        );
    }
}

export default MonsterEncounter;