import { combineReducers } from 'redux';
import monsterReducer from './monster/redux/monsterReducer';

export function getReducers() {
    return {
        monsters: monsterReducer
    };
}

export const defaultReducers = combineReducers(getReducers());
