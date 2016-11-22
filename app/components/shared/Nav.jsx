import React from 'react';
import {Link} from 'react-router'

export default class Nav extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<nav className="nav">
				<div className="nav-left">
					<div className="nav-item">
						<button>
							<span>Portfolio</span>
						</button>
					</div>
				</div>

				<div className="nav-rest">
					<div className="nav-rest-left">
						<div className="nav-search">
							<div>
								<span>Icon</span>
							</div>
							<input type='text' name='search' />
						</div>
					</div>

					<div className="nav-rest-right">
						<div className="nav-item">
							<button>
								<span>Signup</span>
							</button>
						</div>

						<div className="nav-item">
							<button>
								<span>Login</span>
							</button>
						</div>
					</div>
				</div>
			</nav>

		);
	}
}