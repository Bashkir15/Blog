import { createStore, applyMiddleware, combineReducers } from 'redux'
import { promiseMiddleware } from './libs/redux'
import reduxThunk from 'redux-thunk'
import auth from './reducers/auth'
import common from './reducers/common'
import home from './reducers/home'

const reducer = combineReducers({
	auth,
	common,
	home
});

const middleware = applyMiddleware(reduxThunk, promiseMiddleware);

const store = createStore(reducer, middleware);

export default store