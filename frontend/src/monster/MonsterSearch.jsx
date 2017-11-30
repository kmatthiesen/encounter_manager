import React from 'react';
import _ from 'lodash';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TextField} from "material-ui";
import * as MonsterActions from './redux/monsterActions';
import {connect} from "react-redux";

class MonsterSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
        this.props.dispatch(MonsterActions.getMonsters());
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
                            {this.props.monsters.map((monster, index) => {
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

MonsterSearch = connect((state)=>{
    return {
        monsters: state.monsters.data
    };
})(MonsterSearch);

export default MonsterSearch;