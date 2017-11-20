import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EncounterView from './encounter/view/EncounterView.jsx';
import CreateMonster from './monster/CreateMonster.jsx';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/encounter' component={EncounterView}/>
            <Route path='/monster' component={CreateMonster}/>
        </Switch>
    </div>
);

const Home = () => <div>Home</div>;

export default Main;