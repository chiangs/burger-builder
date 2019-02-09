import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route } from 'react-router-dom';
import { ROUTES } from './Constants';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					{/* <BurgerBuilder />
					<Checkout /> */}
					<Route path={ROUTES.CHECKOUT} component={Checkout} />
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
