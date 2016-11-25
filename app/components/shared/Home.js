import React from 'react'
import { connect } from 'react-redux'
import api from '../../api/api'
const Promise = global.Promise;

const mapStateToProps = state => ({
	appName: state.common.appName,
});

const mapDispatchToProps = dispatch => ({
	onLoad: (payload) =>
		dispatch({type: 'HOME_PAGE_LOADED', payload})
});

class Home extends React.Component {
	render() {
		return (
			<div className="home-container">
				<p>Stuff!</p>
			</div>
		);
	}
}

Home.propTypes = {
	appName: React.PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);