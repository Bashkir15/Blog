import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import routes from './routes'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import blogApp from './reducers'

let store = createStore(blogApp)


require('./static/main.css');

render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>,
	document.getElementById('app')
);