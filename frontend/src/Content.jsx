import React from 'react';
import {Route, Switch} from 'react-router-dom';
import EncounterView from './encounter/EncounterView.jsx';
import CreateMonster from './monster/CreateMonster.jsx';
import PlayerView from './player/PlayerView.jsx';

const Content = () => (
    <div>
        <Switch>
            <Route exact path='/' component={EncounterView}/>
            <Route path='/monsters' component={CreateMonster}/>
            <Route path='/players' component={PlayerView}/>
        </Switch>
    </div>
);

export default Content;