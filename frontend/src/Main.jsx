import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EncounterView from './encounter/view/EncounterView.jsx';
import CreateMonster from './monster/CreateMonster.jsx';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={EncounterView}/>
            <Route path='/monsters' component={CreateMonster}/>
            <Route path='/players' component={CreateMonster}/>
        </Switch>
    </div>
);

export default Main;