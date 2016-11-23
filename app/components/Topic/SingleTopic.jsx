import React from 'react'
import {link} from 'react-router'

import SingleSection from './SingleSection'

export default class SingleTopic extends React.Component {
	constructor() {
		super();

		this.state = {
			sections: [
				{
					title: 'Getting started with React',
					description: 'Learn the basics of React and start building small applications',
					posts: [
						{
							title: 'What is React?',
							
						},

						{
							title: 'The basics of Data: Components and Props'
						},

						{
							title: 'Updating State: Events and Component Lifecycle'
						},

						{
							title: 'Putting it all together with a simple app'
						},

						{
							title: 'Building multi-page applications with React Router'
						},

						{
							title: 'Handling state better: An introduction to Flux'
						},

						{
							title: 'Wrapping up: A more complicated application'
						}
					]
				},

				{
					title: 'A more indepth look at React',
					description: 'Bump it up to the next level with Redux and some server-side rendering',
					posts: [
						{
							title: 'What is Redux, and when should I use it over Flux?'
						},

						{
							title: 'Reducers, Dispatchers, and Actions'
						},

						{
							title: 'Gotchas with React-Router and Redux: Redux-simple-router'
						},

						{
							title: 'Remember that app we built? Let\'s do it better'
						},

						{
							title: 'Rending on the server for SEO and more performance'
						},

						{
							title: 'Other state management solutions'
						},

						{
							title: 'The final frontier of Intermediate React'
						}
					]
				},

				{
					title: 'Advanced React and the future of Javascript',
					description: 'Use functional libraries, and features like async and generators for the most modern applications',
					posts: [
						{
							title: 'Your first steps past es6'
						},

						{
							title: 'Understanding generators'
						},

						{
							title: 'Using generators with async'
						},

						{
							title: 'Using tracuer for complex filter'	
						},

						{
							title: 'Let\'s built this blog'
						}
					]
				}
			]
		};
	}

	render() {
		return (
			<div className="single-topic-container">
				<header className='single-topic-header'>
					<h2>React Posts</h2>

					<p>React is a modular, component based view library to build applications with a focus on compositon and functional programming</p>
				</header>

				<div className="single-topic-sections">
					<div>{this.state.sections.map(section =>
						<div key={section.title}>
							<SingleSection section={section} />
						</div>
					)}</div>
				</div>
			</div>
		);
	}
}
