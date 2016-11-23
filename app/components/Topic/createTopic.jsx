import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/topics'

import TopicForm from './TopicForm'

class CreateTopic extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topic: {
				title: '',
				icon: '',
				description: ''
			},

			posting: false
		};

		this.redirect = this.redirect.bind(this);
		this.saveTopic = this.saveTopic.bind(this);
		this.updateTopicState = this.updateTopicState.bind(this);

	}

	updateTopicState(event) {
		const field = event.target.name;
		const topic = this.state.topic;
		topic[field] = event.target.value;
		return this.setState({topic: topic});
	}

	saveTopic(event) {
		event.preventDefault();
		this.props.actions.createTopic(this.state.topic);
	}

	render() {
		return (
			<div>
				<h3>Create a Topic</h3>
				<TopicForm
					topic={this.state.topic}
					onSave={this.saveTopic}
					onChange={this.updateTopicState} />
			</div>
		);
	}
}

CreateTopic.propTypes = {
	actions: React.PropTypes.object
};

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapDispatchToProps)(CreateTopic);