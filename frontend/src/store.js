import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import {defaultReducers} from './reducers.js';

const store = createStore(
    defaultReducers,
    compose(
        applyMiddleware(
            thunkMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

export default store;
