import React from 'react'

class TopicForm extends React.Component {
	render() {
		return (
			<div>
				<form>
					<label>Title</label>
					<input type='text' name='title' 
						value={this.props.topic.title}
						onChange={this.props.onChange} />

					<label>Icon</label>
					<input type='text' name='icon'
						value={this.props.topic.icon}
						onChange={this.props.onChange} />

					<label>Description</label>
					<textarea type='text' name='Description'
						value={this.props.topic.description}
						onChange={this.props.onChange}>
					</textarea>

					<button
						type='submit'
						onClick={this.props.onSave}>
						<span>Save</span>
					</button>
				</form>
			</div>
		);
	}
}

TopicForm.propTypes = {
	topic: React.PropTypes.object,
	onSave: React.PropTypes.func,
	onChange: React.PropTypes.func
};

export default TopicForm