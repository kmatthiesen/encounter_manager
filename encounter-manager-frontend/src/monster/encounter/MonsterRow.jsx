import React from 'react';
import ChangeHp from './ChangeHp.jsx';
import HpDisplay from '../HpDisplay.jsx';

const style = {
    div: {
        borderBottom: '1px solid black',
        margin: '5px'
    },
    dead: {
        textDecoration: 'line-through'
    },
    bloody: {
        backgroundColor: '#ff9891'
    }
};

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

    componentWillReceiveProps(nextProps) {
    }

    toggleDialog() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        let monster = this.props.monster;

        let styles = monster.isAlive ? style.div : {...style.div, ...style.dead};
        styles = (monster.isAlive && monster.isBloody) ? {...styles, ...style.bloody} : styles;

        return (
            <div style={styles}>
                <a href={monster.url} target="_blank">{monster.name}</a> |
                <span onClick={this.toggleDialog}>
                    <HpDisplay hp={monster.hp} maxHp={monster.maxHp} /> | Intiative: {monster.initiative}</span>
                <ChangeHp open={this.state.open} handleClose={this.toggleDialog} handleHpChange={this.handleHpChange} />
            </div>


        );
    }
}

export default MonsterEncounter;