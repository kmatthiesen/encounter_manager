import React from 'react';
import _ from 'lodash';
import {MenuItem, RaisedButton, SelectField, TextField} from 'material-ui';
import {connect} from 'react-redux';

import * as MonsterActions from "../redux/monsterActions";

const style = {
    flex: {
        display: 'flex',
        justifyContent: 'center'
    },
    margin: {
        margin: '5px'
    }
};

class AddMonster extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            quantity: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handleAddReinforcements = this.handleAddReinforcements.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(MonsterActions.getMonsters());
    }

    handleChange(event, value) {
        this.setState({
            value: value
        })
    }

    handleClick() {
        let monster = this.props.monsters[this.state.value];
        let monsters = [];
        for (let i = 0; i < Number(this.state.quantity); i++) {
            let newMonster = _.cloneDeep(monster);
            monsters.push(newMonster);
        }
        this.props.addMonsters(monsters);
    }

    handleAddReinforcements() {
        let monster = this.props.monsters[this.state.value];
        let monsters = [];
        for (let i = 0; i < Number(this.state.quantity); i++) {
            let newMonster = _.cloneDeep(monster);
            monsters.push(newMonster);
        }
        this.props.addReinforcements(monsters);
    }

    handleQtyChange(event, value) {
        this.setState({
            quantity: value
        })
    }

    render() {
        return (
            <div style={this.props.style}>
                <div style={style.flex}>
                    <SelectField
                        floatingLabelText={"Monster"}
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={style.margin}
                        dropDownMenuProps={{anchorOrigin: {vertical: "bottom", horizontal: "left"}}}
                        autoFocus
                    >
                        {this.props.monsters.map((monster, index) => {
                            return <MenuItem key={index} value={index} primaryText={monster.type}/>
                        })}
                    </SelectField>
                    <TextField name="quantity" floatingLabelText={"Quantity"} style={style.margin}
                               onChange={this.handleQtyChange} value={this.state.quantity}/>
                </div>
                <div style={style.flex}>
                    <RaisedButton label="Add Monster" primary style={style.margin} onClick={this.handleClick}/>
                    <RaisedButton label="Add Reinforcements" secondary style={style.margin}
                                  onClick={this.handleAddReinforcements}/>
                </div>
            </div>
        )
    }
}

AddMonster = connect((state)=>{
    return {
        monsters: state.monsters.data
    };
})(AddMonster);

export default AddMonster;