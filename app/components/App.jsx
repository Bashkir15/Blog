import React from 'react';

import Nav from './shared/Nav'

export default class App extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div className="app-body">
				<div className="app-body-left">
				</div>
				<div className="app-body-right">
					<Nav />
				</div>
			</div>
		);
	}
}