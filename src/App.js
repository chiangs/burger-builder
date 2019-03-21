import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { ROUTES } from './Constants';
import { connect } from 'react-redux';
import { checkAuthState } from './store/actions/auth.action';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		const routes = this.props.isAuthenticated ? (
			<Switch>
				<Route path={ROUTES.CHECKOUT} component={Checkout} />
				<Route path={ROUTES.ORDERS} exact component={Orders} />
				<Route path={ROUTES.AUTH} component={Auth} />
				<Route path={ROUTES.LOGOUT} component={Logout} />
				<Route path={ROUTES.INDEX} exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		) : (
			<Switch>
				<Route path={ROUTES.AUTH} component={Auth} />
				<Route path={ROUTES.LOGOUT} component={Logout} />
				<Route path={ROUTES.INDEX} exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
	onTryAutoSignup: () => dispatch(checkAuthState())
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
