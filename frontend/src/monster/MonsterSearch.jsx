import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import Endpoints from "../config/endpoints";
import {Table, TableHeaderColumn, TableRowColumn, TableBody, TableHeader, TableRow, TextField} from "material-ui";

class MonsterSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            monsters: [],
            search: ''
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event, value) {
        this.setState({
            search: value
        })
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

    render() {
        return (
            <div>
                <div>
                    <TextField floatingLabelText={"Search"} onChange={this.handleSearchChange}/>
                </div>
                <div>
                    <Table height={'400px'}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>InitMod</TableHeaderColumn>
                                <TableHeaderColumn>HpDice</TableHeaderColumn>
                                <TableHeaderColumn>URL</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.monsters.map((monster, index) => {
                                return ( (_.includes(monster.type.toLowerCase(), this.state.search.toLocaleLowerCase()))
                                        ? <TableRow key={index}>
                                            <TableRowColumn>{monster.type}</TableRowColumn>
                                            <TableRowColumn>{monster.initiativeMod}</TableRowColumn>
                                            <TableRowColumn>{monster.hpDice}</TableRowColumn>
                                            <TableRowColumn>{monster.url}</TableRowColumn>
                                        </TableRow>
                                        : null
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default MonsterSearch;