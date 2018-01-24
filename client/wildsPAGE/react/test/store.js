/**
 * Created by lei_sun on 2017/11/6.
 */

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger');
    const logger = createLogger()
    middlewares.push(logger)
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default createStoreWithMiddleware(rootReducer)