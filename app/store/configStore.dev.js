import {createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers'

export default function configureStore(initialState) {
	const middlewares = [
		thunkMiddleware
	];

	const store = createStore(rootReducer, initial, compose(
		applyMiddleware(...middlewares),
		window.devToolsExtension ? window.devToolsExtenson() : f => f
		)
	);

	if (module.hot) {
		modle.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default;
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}