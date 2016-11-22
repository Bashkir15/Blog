import React from 'react'

const Topic = React.createClass({
	propTypes: {
		topic: React.PropTypes.object
	},

	render() {
		return (
			<div className="topic-card">
				<div className="topic-icon">
					<span></span>
				</div>
				<h2>{this.props.topic.title}</h2>
				<p>{this.props.topic.description}</p>
			</div>
		);
	}
});

export default Topic