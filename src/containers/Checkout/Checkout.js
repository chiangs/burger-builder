import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { ROUTES } from '../../Constants';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
	state = {
		ingredients: {},
		price: 0
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price;
		for (const param of query.entries()) {
			// * example output: ['salad'. '1']
			param[0] === 'price'
				? (price = param[1])
				: (ingredients[param[0]] = +param[1]);
		}
		this.setState({ ingredients: ingredients, totalPrice: price });
	}

	cancelCheckoutHandler = () => {
		this.props.history.goBack();
	};

	confirmCheckoutHandler = () => {
		this.props.history.replace(ROUTES.CHECKOUT + ROUTES.CONTACT_DATA);
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					onCheckoutCancel={this.cancelCheckoutHandler}
					onCheckoutContinue={this.confirmCheckoutHandler}
				/>
				<Route
					path={this.props.match.path + ROUTES.CONTACT_DATA}
					render={props => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}
