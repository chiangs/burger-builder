import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1
};

export default class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	};

	addIngredientHandler = type => {
		const operation = 'add';
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		this.updateTotalPrice(type, operation);
		this.setState({ ingredients: updatedIngredients });
	};

	removeIngredientHandler = type => {
		const operation = 'remove';
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount > 0 ? oldCount - 1 : oldCount;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		this.updateTotalPrice(type, operation);
		this.setState({ ingredients: updatedIngredients });
	};

	updateTotalPrice = (type, operation) => {
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice =
			operation === 'add' && oldPrice > 0
				? oldPrice + priceAddition
				: oldPrice - priceAddition;
		this.setState({ totalPrice: newPrice });
	};

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BurgerControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
				/>
			</Aux>
		);
	}
}
