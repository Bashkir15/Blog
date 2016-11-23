import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import routes from './routes'
import {Provider} from 'react-redux'
import {replaceable} from './lib/replaceable-state'
import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import reduxThunk from 'redux-thunk'
import {routeReducer} from 'redux-simple-router'
import blogApp from './reducers'

const reducers = Object.assign({}, blogApp, {
	routing: routeReducer
});

const create = compose(
	applyMiddleware(
		reduxThunk,
		() => next => action => {
			return next(action);
		}
	)
)(createStore);

let store = create(replaceable(combineReducers(reducers)));


require('./static/main.css');

render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>,
	document.getElementById('app')
);