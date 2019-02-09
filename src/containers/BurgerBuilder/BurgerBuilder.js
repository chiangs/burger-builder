import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { ADD, REMOVE, DB, ROUTES } from '../../Constants';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7,
	meat: 1
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		orderBtnClicked: false,
		loading: false
	};

	componentDidMount() {
		this.setState({ loading: true });
		Axios.get(DB.INGREDIENTS)
			.then(res =>
				this.setState({ ingredients: res.data, loading: false })
			)
			.catch(error => this.setState({ loading: false }));
	}

	addIngredientHandler = type => {
		const operation = ADD;
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		this.updateTotalPrice(type, operation);
		this.updatePurchaseState(updatedIngredients);
		this.setState({ ingredients: updatedIngredients });
	};

	removeIngredientHandler = type => {
		const operation = REMOVE;
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount > 0 ? oldCount - 1 : oldCount;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		this.updateTotalPrice(type, operation);
		this.updatePurchaseState(updatedIngredients);
		this.setState({ ingredients: updatedIngredients });
	};

	updateTotalPrice = (type, operation) => {
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice =
			operation === ADD && oldPrice > 0
				? oldPrice + priceAddition
				: oldPrice - priceAddition;
		this.setState({ totalPrice: newPrice });
	};

	updatePurchaseState = updatedIngredients => {
		const ingredients = { ...updatedIngredients };
		const sumArray = Object.values(ingredients);
		const sum = sumArray.reduce((sum, el) => {
			return sum + el;
		}, 0);
		this.setState({ purchasable: sum > 0 });
	};

	purchaseHandler = () => this.setState({ orderBtnClicked: true });

	purchaseCancelHandler = () => this.setState({ orderBtnClicked: false });

	purchaseContinueHandler = () => {
		this.props.history.push(ROUTES.CHECKOUT);
		// this.setState({ loading: true });
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.price,
		// 	deliveryMethod: 'fastest',
		// 	customer: {
		// 		name: 'Navn Navnesen',
		// 		email: 'email@email.email',
		// 		address: {
		// 			street: 'Gate',
		// 			city: 'By',
		// 			postal: '4025',
		// 			country: 'Norge'
		// 		}
		// 	}
		// };
		// Axios.post(DB.ORDERS, order)
		// 	.then(response => {
		// 		this.setState({ loading: false, orderBtnClicked: false });
		// 	})
		// 	.catch(error => {
		// 		this.setState({ loading: false, orderBtnClicked: false });
		// 		console.error(error);
		// 	});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary;
		let burgerBuilder;

		if (this.state.ingredients) {
			orderSummary = this.state.loading ? (
				<Spinner />
			) : (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinue={() => this.purchaseContinueHandler()}
					price={this.state.totalPrice}
				/>
			);

			burgerBuilder = (
				<Aux>
					<div style={{ width: '40%', margin: 'auto' }}>
						<Burger ingredients={this.state.ingredients} />
					</div>
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						order={this.purchaseHandler}
					/>
				</Aux>
			);
		}

		const burgerBuilderView = this.state.ingredients ? (
			burgerBuilder
		) : (
			<Spinner />
		);
		return (
			<Aux>
				<Modal
					show={this.state.orderBtnClicked}
					modalClose={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burgerBuilderView}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, Axios);
