import React from 'react';

class HpDisplay extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span> HP: {this.props.hp} / {this.props.maxHp} </span>
        );
    }
}

export default HpDisplay;