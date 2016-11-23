import React from 'react'

const SingleSection = React.createClass({
	propTypes: {
		section: React.PropTypes.object
	},


	render() {
		return (
			<div className="single-section">
				<div className="single-section-header">
					<h3>{this.props.section.title}</h3>
					<p>{this.props.section.description}</p>
				</div>

				<div className='single-section-posts'>{this.props.section.posts.map(post => 
					<div key={post.title}>
						<button>
							<span>{post.title}</span>
						</button>
					</div>
				)}</div>
			</div>
		);
	}	
});


export default SingleSection