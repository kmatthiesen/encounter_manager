import React from 'react';
import _ from 'lodash';

class CurrentMonsters extends React.Component {

    render() {

        let monsterTypes = _.countBy(this.props.monsters, (monster) => {
            return monster.type;
        });

        return (
            <div style={this.props.style}>
                {Object.keys(monsterTypes).map(function(key, index) {
                    return (
                        <div key={index}>
                            {monsterTypes[key]}x {key}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default CurrentMonsters;