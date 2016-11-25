import React from 'react'

class CreateUser extends React.Component {
	render() {
		return (
			<div>
				<form>
					<input type='text' name='name'
						value={this.props.user.name}
						onChange={this.props.onChange}
					/>

					<input type='email' name='email'
						value={this.props.user.email}
						onChange={this.props.onChange}
					/>

					<input type='password' name='password'
						value={this.props.user.password}
						onChange={this.props.onChange}
					/>

					<button onClick={this.props.onSave}>
						Submit
					</button>
				</form>
			</div>
		)
	}
}

export default CreateUser