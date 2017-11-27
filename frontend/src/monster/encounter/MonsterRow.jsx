import React from 'react';
import ChangeHp from './ChangeHp.jsx';
import HpDisplay from '../HpDisplay.jsx';



class MonsterEncounter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
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
        let monster = this.props.monster;
        return (
            <div style={this.props.style}>
                <a href={monster.url} target="_blank">{monster.name}</a> |
                <span onClick={this.toggleDialog}>
                    <HpDisplay hp={monster.hp} maxHp={monster.maxHp} /> | Initiative: {monster.initiative}</span>
                <ChangeHp open={this.state.open} monsterName={this.props.monster.name} handleClose={this.toggleDialog} handleHpChange={this.handleHpChange} />
            </div>


        );
    }
}

export default MonsterEncounter;