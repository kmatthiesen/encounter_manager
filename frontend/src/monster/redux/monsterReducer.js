import MonsterConstants from './monsterConstants';

const initState = {
    data: []
};

export default function MonsterReducer(state = initState, action) {
    switch(action.type) {
        case MonsterConstants.UPDATE_MONSTERS:
            return {
                data: [...action.data]
            };
        default:
            return state;
    }
}
