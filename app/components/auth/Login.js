import { Link } from 'react-router'
import React from 'react'
import api from '../../api/api'
import { connect } from 'react-redux'

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = dispatch => ({
	onChangeEmail: value =>
		dispatch({type: 'UPDATE_FIELD_AUTH', key: 'email', value}),
	onChangePassword: value => 
		dispatch({type: 'UPDATE_FIELD_AUTH', key: 'password', value}),
	onSubmit: (email, password) =>
		dispatch({type: 'LOGIN', payload: api.Auth.login(email, password)})
});

class Login extends React.Component {
	constructor() {
		super();

		this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
		this.changePassword = ev => this.props.onChangePassword(ev.target.value);
		this.submitForm = (email, password) => ev => {
			ev.preventDefault();
			this.props.onSubmit(email, password);
		};
	}

	render() {
		const email = this.props.email;
		const password = this.props.password;

		return (
			<div className="auth-page">
				<div className="auth-form">
					<form onSubmit={this.submitForm(email,password)}>
						<div className="auth-form-wrapper">
							<input type='email'
								placeholder="email"
								value={email}
								onChange={this.changeEmail} />
						</div>

						<div className="auth-form-wrapper">
							<input type='password'
								placeholder="password"
								value={password}
								onChange={this.changePassword} />
						</div>

						<button type='submit'>
							Sign in
						</button>
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	changeEmail: React.PropTypes.func,
	changePassword: React.PropTypes.func,
	submitForm: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);