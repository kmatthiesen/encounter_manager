import axios from 'axios';
import _ from 'lodash';
import MonsterConstants from './monsterConstants';
import Endpoints from '../../config/endpoints';

export function updateMonsters(data) {
    return {
        type: MonsterConstants.UPDATE_MONSTERS,
        data: data
    }
}

export function getMonsters() {

    return (dispatch) => {

        let url = Endpoints.URL + ':' + Endpoints.PORT + Endpoints.MONSTER;
        return axios.get(url, {crossdomain: true}).then((response) => {
            let data = _.orderBy(response.data, ['type']);
            dispatch(updateMonsters(data));
        })
    };
}

export function addMonster(monster) {

    return (dispatch) => {
        let url = Endpoints.URL + ':' + Endpoints.PORT + Endpoints.MONSTER;
        axios.post(url, monster, {crossdomain: true}).then((response) => {
            dispatch(getMonsters());
        })
    }
}