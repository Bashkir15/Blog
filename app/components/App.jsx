import React from 'react';

import Nav from './shared/Nav'
import Sidebar from './shared/Sidebar'


const App = (props) => {

	return (
		<div className="app-body">
			<div className="app-body-left">
				<Sidebar />
			</div>
			<div className="app-body-right">
				<Nav />

				<div className="app-body-view-content">
					{props.children}
				</div>
			</div>
		</div>	
	);
};

App.propTypes = {
	children: React.PropTypes.node
};

export default App
