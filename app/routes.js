import React from 'react'
import {Route, IndexRoute} from 'react-router'

import AppStore from './stores/AppStore'

import App from './components/App'
import Home from './components/home/Home'
import SingleTopic from './components/Topic/SingleTopic'
import CreateTopic from './components/Topic/createTopic'

export default (
	<Route path='/' data={AppStore.data} component={App}>
		<IndexRoute component={Home} />
		<Route path="/:title" component={SingleTopic} />
		<Route path='/create-topic' component={CreateTopic} />
	</Route>
);