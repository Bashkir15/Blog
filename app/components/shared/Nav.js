import { Link } from 'react-router'
import {connect} from 'react-redux'
import React from 'react'

const mapStateToProps = state => ({
	currentUser: state.common.currentUser
});

class Nav extends React.Component {



	render() {
		return (
			<nav className="nav">
				<div className="nav-left">
					<div className="nav-item">
						<button>
							<span>{this.props.appName}</span>
						</button>
					</div>
				</div>

				<div className="nav-rest">
					<div className="nav-rest-left">
						<div className="nav-search">
							<div>
								<span className='icon-search'></span>
							</div>
							<div>
								<label>Search</label>
								<input type='text' name='search'/>
							</div>
						</div>
					</div>

					{this.props.currentUser ? <div></div>
						:
						<div className="nav-rest-right">
							<div className="nav-item">
								<Link to={"/register"}>
									<button>
										<span>Signup</span>
									</button>
								</Link>
							</div>

							<div className="nav-item">
								<button>
									<span>Login</span>
								</button>
							</div>
						</div>
					}
				</div>
			</nav>
		);
	}
}

Nav.propTypes = {
	appName: React.PropTypes.string
};

export default connect(mapStateToProps, () => ({}))(Nav);