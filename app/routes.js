import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import Home from './components/home/Home'
import SingleTopic from './components/Topic/SingleTopic'

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Home} />
		<Route path="/:title" component={SingleTopic} />
	</Route>
);