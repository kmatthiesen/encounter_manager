import React from 'react';

const style = {
    div: {
        borderBottom: '1px solid black',
        margin: '5px'
    }
};

class MonsterEncounter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style.div}>
                {this.props.monster.name} | Intiative: {this.props.monster.initiative}
            </div>


        );
    }
}

export default MonsterEncounter;