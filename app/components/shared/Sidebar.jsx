import React from 'react'
import {Link} from 'react-router'

var Sidebar =  React.createClass({


	render: () => {
		return (
			<div className="app-side-bar">
				<div className="app-side-bar-header">
					<div></div>
					<p>This is the sidebar</p>
					<p>Stuff</p>
				</div>

				<div className="app-side-bar-body">
				</div>
			</div>
		);
	}
});

export default Sidebar