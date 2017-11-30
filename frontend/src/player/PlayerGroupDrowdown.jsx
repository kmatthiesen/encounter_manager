import React from 'react';
import _ from 'lodash';
import {MenuItem, SelectField} from 'material-ui';
import {connect} from 'react-redux';
import * as PlayerActions from './redux/playerActions';

class PlayerGroupDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(PlayerActions.getPlayerGroups());
    }

    handleChange(event, newValue) {
        let activeGroup = this.props.players.groups[newValue];
        this.props.dispatch(PlayerActions.setActiveGroup(activeGroup));
    }

    render() {
        let groups = this.props.players.groups;
        let activeGroup = this.props.players.activeGroup;
        let value = _.findIndex(groups, {name: activeGroup.name});
        value = (value !== -1) ? value : '';
        return (
            <div>
                <SelectField
                    floatingLabelText={"Player Group"}
                    value={value}
                    onChange={this.handleChange}
                    // style={style.margin}
                    dropDownMenuProps={{anchorOrigin: {vertical: "bottom", horizontal: "left"}}}
                >
                    {this.props.players.groups.map((group, index) => {
                        return <MenuItem key={index} value={index} primaryText={group.name}/>
                    })}
                </SelectField>
            </div>
        );
    }
}

PlayerGroupDropdown = connect((state) => {
    return {
        players: state.players
    }
})(PlayerGroupDropdown);

export default PlayerGroupDropdown;