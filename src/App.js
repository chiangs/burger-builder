import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route } from 'react-router-dom';
import { ROUTES } from './Constants';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Route path={ROUTES.CHECKOUT} component={Checkout} />
					<Route path={ROUTES.ORDERS} exact component={Orders} />
					<Route path={ROUTES.AUTH} component={Auth} />
					<Route path={ROUTES.LOGOUT} component={Logout} />
					<Route
						path={ROUTES.INDEX}
						exact
						component={BurgerBuilder}
					/>
				</Layout>
			</div>
		);
	}
}

export default App;
