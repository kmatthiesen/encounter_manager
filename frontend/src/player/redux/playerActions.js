import axios from 'axios';
import _ from 'lodash';
import PlayerConstants from './playerConstants';
import Endpoints from '../../config/endpoints';

function setPlayerGroups(data) {
    return {
        type: PlayerConstants.GET_PLAYER_GROUPS,
        data
    }
}

export function setActiveGroup(data) {
    return {
        type: PlayerConstants.SET_ACTIVE_PLAYER_GROUP,
        data
    }
}

export function getPlayerGroups() {

    return (dispatch) => {

        let url = Endpoints.URL + ':' + Endpoints.PORT + Endpoints.PLAYER;
        return axios.get(url, {crossdomain: true}).then((response) => {
            let data = _.orderBy(response.data, ['name']);
            dispatch(setPlayerGroups(data));
        })
    };
}

export function addPlayer(player) {

    return (dispatch) => {
        let url = Endpoints.URL + ':' + Endpoints.PORT + Endpoints.PLAYER;
        axios.post(url, player, {crossdomain: true}).then((response) => {
            dispatch(getPlayerGroups());
        })
    }
}