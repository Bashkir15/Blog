import React from 'react'
import {Link} from 'react-router'

export default class HomeHeader extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div className="home-header">
				<div>
					<header>
						<h1>Blog</h1>
					</header>

					<p>This a collection of my writings on code, science, and everything in between</p>


					<div className='home-header-latest'>
						<button>
							<span>See Latest</span>
						</button>
					</div>
				</div>

				<section className='home-header-section'>
					<div className="home-header-text-section">
						<div>
							<h3>Learn to Code</h3>
							<p>Hopefully! I write because these are things that interest me. If anyone can benefit from these than that is an even better 
							reason for me to keep writing</p>
						</div>

						<div>
							<h3>Help Me</h3>
							<p>With your feedback, not only with I become a better writer and developer, but I can better provide you all with quality content
							that you want to see</p>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

