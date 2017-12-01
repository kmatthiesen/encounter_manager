import _ from 'lodash';
import PlayerConstants from './playerConstants';

const initState = {
    groups: [],
    activeGroup: {
        name: '',
        players: []
    }
};

export default function PlayerReducer(state = initState, action) {
    switch(action.type) {
        case PlayerConstants.GET_PLAYER_GROUPS:
            return {
                ...state,
                groups: action.data
            };
        case PlayerConstants.SET_ACTIVE_PLAYER_GROUP:
            return {
                ...state,
                activeGroup: _.cloneDeep(action.data)
            };
        default:
            return state;
    }
}
