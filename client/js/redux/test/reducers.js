/**
 * Created by lei_sun on 2017/11/6.
 */

import { combineReducers } from 'redux';

import {
    INIT_PAGE, ADD_PAGE_NUM, SUBTRACT_PAGE_NUM
} from './actions';

const pageNum = (state = 1, action) => {
    switch (action.type) {
        case INIT_PAGE:
            return 1;
        case ADD_PAGE_NUM:
            return state + 1;
        case SUBTRACT_PAGE_NUM:
            return state - 1;
        default:
            return state
    }
};

const rootReducer = combineReducers({
    pageNum
});

export default rootReducer;