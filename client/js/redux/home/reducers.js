import { combineReducers } from 'redux';

import {
    INIT_PAGE
} from './actions';

const user = (state = {}, action) => {
    switch (action.type) {
        case INIT_PAGE:
            return {};
        default:
            return state
    }
};

const rootReducer = combineReducers({
    user
});

export default rootReducer;