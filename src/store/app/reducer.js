import actions from './actionType';

const defaultState = {
    lang: 'en-US'
}

export default (state=defaultState, action) => {
    switch (action.type) {
        case actions.SWITCH_LANG:
            state = {
                lang: action.lang
            };
            return state;
        default:
            return state;
    }
}