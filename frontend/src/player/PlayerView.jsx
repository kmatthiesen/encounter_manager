import React from 'react';
import {connect} from 'react-redux';
import PlayerGroupDropdown from "./PlayerGroupDrowdown";

class PlayerView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PlayerGroupDropdown/>
            </div>
        );
    }
}

PlayerView = connect((state) => {
    return {
        players: state.players
    }
})(PlayerView);

export default PlayerView;