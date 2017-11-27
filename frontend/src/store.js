import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { defaultReducers } from './reducers.js';

const store = createStore(
    defaultReducers,
    compose(
        applyMiddleware(
            thunkMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

export default store;
