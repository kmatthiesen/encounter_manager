import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui';
import {grey50} from 'material-ui/styles/colors';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            monsterOpen: false
        };
        this.handleMonsterClick = this.handleMonsterClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleMonsterClick(event) {
        this.setState({
            monsterOpen: !this.state.monsterOpen,
            anchorEl: event.currentTarget
        })
    }

    handleRequestClose() {
        this.setState({
            monsterOpen: false
        })
    }

    render() {
        const style = {
            base: {
                color: grey50
            },
            span: {
                margin: '5px',
                color: grey50
            },
            link: {
                textDecoration: 'none'
            },
            pointer: {
                cursor: 'pointer'
            }
        };

        return (
            <Toolbar>
                <ToolbarGroup firstChild>
                    <span style={style.span}><Link style={{...style.base, ...style.link}} to='/'>Encounter Manager</Link></span>
                </ToolbarGroup>
                <ToolbarGroup>
                    <span style={style.span}><Link style={{...style.base, ...style.link}} to='/'>Encounters</Link></span>
                    <span style={style.span}><Link style={{...style.base, ...style.link}} to='/monsters'>Monsters</Link></span>
                    {/*<span style={style.span}><Link style={{...style.base, ...style.link}} to='/players'>Players</Link></span>*/}
                    <span style={style.span}> | </span>
                    <span style={{...style.span, ...style.pointer}}>Roll Dice</span>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default muiThemeable()(Header);