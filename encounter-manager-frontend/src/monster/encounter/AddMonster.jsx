import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { SelectField, MenuItem, RaisedButton, TextField } from 'material-ui';
import Endpoints from '../../config/endpoints';

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
            monsters: [],
            value: '',
            quantity: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handleAddReinforcements = this.handleAddReinforcements.bind(this);
    }

    componentDidMount() {
        let url = Endpoints.URL + ':' + Endpoints.PORT + Endpoints.MONSTER;
        axios.get(url, {crossdomain: true}).then((response) => {
            this.setState({
                monsters: _.orderBy(response.data, ['type'])
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    handleChange(event, value) {
        this.setState({
            value: value
        })
    }

    handleClick() {
        let monster = this.state.monsters[this.state.value];
        let monsters = [];
        for (let i = 0; i < Number(this.state.quantity); i++) {
            let newMonster = _.cloneDeep(monster);
            monsters.push(newMonster);
        }
        this.props.addMonsters(monsters);
    }

    handleAddReinforcements() {
        let monster = this.state.monsters[this.state.value];
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
                        dropDownMenuProps={{anchorOrigin:{vertical:"bottom", horizontal:"left"}}}
                        autoFocus
                    >
                        {this.state.monsters.map((monster, index) => {
                            return <MenuItem key={index} value={index} primaryText={monster.type}/>
                        })}
                    </SelectField>
                    <TextField name="quantity" floatingLabelText={"Quantity"} style={style.margin} onChange={this.handleQtyChange} value={this.state.quantity}/>
                </div>
                <div style={style.flex}>
                    <RaisedButton label="Add Monster" primary style={style.margin} onClick={this.handleClick}/>
                    <RaisedButton label="Add Reinforcements" secondary style={style.margin} onClick={this.handleAddReinforcements}/>
                </div>
            </div>
        )
    }
}

export default AddMonster;