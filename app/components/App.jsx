import React from 'react';

import Nav from './shared/Nav'
import Sidebar from './shared/Sidebar'

export default class App extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div className="app-body">
				<div className="app-body-left">
					<Sidebar />
				</div>
				<div className="app-body-right">
					<Nav />
				</div>
			</div>
		);
	}
}