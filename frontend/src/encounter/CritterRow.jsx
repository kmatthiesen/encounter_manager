import React from 'react';
import MonsterRow from '../monster/encounter/MonsterRow.jsx';
import PlayerRow from '../player/PlayerRow.jsx';

const style = {
    div: {
        borderBottom: '1px solid black',
        padding: '5px'
    },
    dead: {
        textDecoration: 'line-through'
    },
    bloody: {
        backgroundColor: '#ff9891'
    },
    alternateRow: {
        backgroundColor: '#d8dfe7'
    },
    activeTurn: {
        backgroundColor: '#c1ffc9'
    }
};

class CritterRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let critter = this.props.critter;

        let styles = (this.props.index % 2) ? style.alternateRow : {};
        styles = critter.isAlive ? {...styles, ...style.div} : {...styles, ...style.div, ...style.dead};
        styles = (critter.isAlive && critter.isBloody) ? {...styles, ...style.bloody} : styles;
        styles = this.props.activeTurn ? {...styles, ...style.activeTurn} : styles;

        return (
            <div>
                { this.props.critter.isPlayer ?
                    <PlayerRow player={this.props.critter} style={styles}/> :
                    <MonsterRow monster={critter} changeHp={this.props.changeHp} index={this.props.index} style={styles}/> }
            </div>
        );
    }
}

export default CritterRow;