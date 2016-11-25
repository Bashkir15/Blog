import React from 'react'
import auth from '../../api/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as courseActions from '../../actions/auth'

import CreateUser from './CreateUser'


class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				name: '',
				email: '',
				password: ''
			}
		};

		this.saveUser = this.saveUser.bind(this);
		this.updateUserState = this.updateUserState.bind(this);
	}

	updateUserState(event) {
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;
		return this.setState({user: user})
	}

	saveUser(e) {
		e.preventDefault();
		this.props.actions.createUser(this.state.user);
	}

	render() {
		return (
			<div>
				<CreateUser
					user={this.state.user}
					onSave={this.saveUser}
					onChange={this.updateUserState}
				/>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
		user: {
			name: '',
			email: '',
			password: ''
		}
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);