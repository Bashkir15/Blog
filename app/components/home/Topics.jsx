import React from 'react'
import {Link} from 'react-router'

import Topic from './Topic'

export default class Topics extends React.Component {
	constructor() {
		super();

		this.state = {
			topics: [
				{
					title: 'Angular',
					icon: 'kjhshdf',
					description: 'Just hopping on the train with Angular 1? Looking to move your old app to Angular 2? I\'ve got something for you'
				},

				{
					title: 'React',
					icon: 'sdfhadf',
					description: 'Read all about the technology this site is built with'
				},

				{
					title: 'Node',
					icon: 'werwersdf',
					description: 'With all of these other topics you\'re going to need a backend somewhere'
				},

				{
					title: 'Javascript',
					icon: 'sdfjhsdfsd',
					description: 'Tips, quirks, performance, and latest language features'
				},

				{
					title: 'Automation',
					icon: 'asfjhsdfsd',
					description: 'Looking to dive in to webpack? Need more out of your gulp setup? Look no further'
				},

				{
					title: 'Personal',
					icon: 'sdfesdfsdfer',
					description: 'Wanna know a bit more about me and my ramblings about my life and current issues?'
				},

				{
					title: 'Science',
					icon: 'sdfheusjkdfe',
					description: 'I\'m a physicist turned programmer, so if you are a science nerd like me you will enjoy this'
				}
			]
		}
	}

	render() {
		return (
			<div className="topics-container">
				<div className="topics-list-container">
					<div>{this.state.topics.map(topic =>
						<Link to={'/' + topic.title} key={topic.title}>
							<Topic topic={topic} />
						</Link>
					)}</div>
				</div>
			</div>
		)
	}
}