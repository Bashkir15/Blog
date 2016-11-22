import React from 'react'
import {link} from 'react-router'

import HomeHeader from './Header'
import Topics from './Topics'

export default class Home extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<div className="home-header-container">
					<HomeHeader />
				</div>

				<div className="home-topics-container">
					<Topics />
				</div>
			</div>
		);
	}
}