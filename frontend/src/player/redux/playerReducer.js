import _ from 'lodash';
import PlayerConstants from './playerConstants';

const initState = {
    groups: [],
    players: [],
    activePlayers: []
};

export default function PlayerReducer(state = initState, action) {
    switch(action.type) {
        case PlayerConstants.GET_PLAYER_GROUPS:
            return {
                ...state,
                data: [...action.data]
            };
        default:
            return state;
    }
}
