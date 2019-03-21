import React, { Component } from 'react';
import { logout } from '../../../store/actions/auth.action';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROUTES } from '../../../Constants';

// * Just a page the redirects, alternatively, have NavigationItems.js use a button NavigationItemBtn that calls the Logout action
class Logout extends Component {
	componentDidMount() {
		this.props.onLogout();
	}

	render() {
		return <Redirect to={ROUTES.INDEX} />;
	}
}

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(logout())
});

export default connect(
	null,
	mapDispatchToProps
)(Logout);
