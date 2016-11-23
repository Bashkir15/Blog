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
					name: 'Latest',
					icon: 'icon-stop-watch'
				},

				{
					href: '/popular',
					name: 'Popular',
					icon:'icon-award'
				},

				{
					href: '/categories',
					name: 'Categories',
					icon: 'icon-content_paste'
				},

				{
					href: '/about',
					name: 'About',
					icon: 'icon-home'
				},

				{
					href: '/contact',
					name: 'Contact',
					icon: 'icon-mode_edit'
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

