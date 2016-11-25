import React from 'react'
import { connect } from 'react-redux'

import SidebarBody from './SidebarBody'

const mapStateToProps = state => ({
	options: state.options,
	currentUser: state.common.currentUser
});

class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		console.log(this.props);

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
				<div className='app-side-bar'>
						{ this.props.currentUser ?
							<div className="app-side-bar-header">
								<div></div>
								<p>{this.props.currentUser.name}</p>
								<p>{this.props.currentUser.email}</p>
							</div> :

							 <div className="app-side-bar-header">
								<div></div>
								<p>Welcome!</p>
							</div>
						}

					<div className="app-side-bar-body">
						<SidebarBody options={this.state.options} />
					</div>
				</div>
		);
	}
}



Sidebar.propTypes = {
	options: React.PropTypes.array
};

export default connect(mapStateToProps, () => ({}))(Sidebar);