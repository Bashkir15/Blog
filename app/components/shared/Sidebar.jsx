import React from 'react'
import {Link} from 'react-router'

import SidebarBody from './SidebarBody'

export default class Sidebar extends React.Component {
	constructor() {
		super();

		this.state = {
			options: [
				{	
					href: '/latest',
					name: 'Latest'
				},

				{
					href: '/popular',
					name: 'Popular'
				},

				{
					href: '/categories',
					name: 'Categories'
				},

				{
					href: '/about',
					name: 'About'
				},

				{
					href: '/contact',
					name: 'Contact'
				}
			]
		}
	}

	render() {
		return (
			<div className="app-side-bar">
				<div className="app-side-bar-header">
					<div></div>
					<p>Name</p>
					<p>Username</p>
				</div>

				<div className="app-side-bar-body">
					<SidebarBody options={this.state.options} />
				</div>
			</div>
		);
	}	
}

