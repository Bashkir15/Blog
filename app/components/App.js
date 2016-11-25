import React from 'react'
import { connect } from 'react-redux'
import api from '../api/api'
import {getUser} from '../libs/auth'

import Nav from './shared/Nav'
import Sidebar from './shared/Sidebar'

const mapStateToProps = state => ({
	appName: state.common.appName,
	currentUser: state.common.currentUser,
	redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
	onLoad: (user) =>
		dispatch({type: 'APP_LOAD', user}),
	onRedirect: () => 
		dispatch({type: 'REDIRECT'})
});

class App extends React.Component {
	componentWillMount() {
		const user = JSON.parse(window.localStorage.getItem('user'));

		this.props.onLoad(user);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.redirectTo) {
			this.context.router.replace(nextProps.redirectTo);
			this.props.onRedirect();
		}
	}

	render() {
		return (
			<div className="app-body">
				<div className='app-body-left'>
					<Sidebar currentUser={this.props.currentUser} />
				</div>
				<div className="app-body-right">
					<Nav appName={this.props.appName} currentUser={this.props.currentUser} />

					<div className="app-body-view-content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	appName: React.PropTypes.string,
	children: React.PropTypes.object.isRequired,
	onRedirect: React.PropTypes.func,
	onLoad: React.PropTypes.func,
	currentUser: React.PropTypes.object
};

App.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);