import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'

import store from './store'

import App from './components/App'
import Home from './components/shared/Home'
import Register from './components/auth/Register'

require('./static/main.css');




ReactDOM.render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path='/register' component={Register} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('main'));