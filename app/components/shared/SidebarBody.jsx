import React from 'react'
import {Link} from 'react-router'

var SidebarBody = React.createClass({

	propTypes: {
		options: React.PropTypes.array
	},
	
	render() {
		return (
			<ul className="app-side-bar-list">
				{this.props.options.map(option =>
					<li key={option.href}>
						<button>
							<span>{option.name}</span>
						</button>
					</li>
				)
			}</ul>
		);
	}
});

export default SidebarBody