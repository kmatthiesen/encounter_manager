import {combineReducers} from 'redux';
import monsterReducer from './monster/redux/monsterReducer';
import playerReducer from './player/redux/playerReducer';

export function getReducers() {
    return {
        monsters: monsterReducer,
        players: playerReducer
    };
}

export const defaultReducers = combineReducers(getReducers());
