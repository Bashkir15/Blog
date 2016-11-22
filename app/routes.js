import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import Home from './components/home/Home'

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Home}></IndexRoute>
	</Route>
);