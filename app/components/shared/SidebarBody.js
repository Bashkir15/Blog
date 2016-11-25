import React from 'react'


class SidebarBody extends React.Component {
	render() {
		return (
			<ul className="app-side-bar-list">
				{this.props.options.map(option => 
					<li key={option.href}>
						<button>
							<span>{option.name}</span>
						</button>

						<div>
							<span className={option.icon}></span>
						</div>
					</li>
				)
			}</ul>
		);
	}
}

SidebarBody.propTypes = {
	options: React.PropTypes.array
};

export default SidebarBody