import React, { Component } from 'react';
import { connect } from 'react-redux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ROUTES } from '../../Constants';
import Aux from '../../hoc/Auxiliary';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
	addIngredient,
	removeIngredient,
	initIngredients
} from '../../store/actions/burgerBuilder.action';
import { purchaseInit } from '../../store/actions/order.action';

class BurgerBuilder extends Component {
	state = {
		orderBtnClicked: false
	};

	componentDidMount() {
		// this.setState({ loading: true });
		// Axios.get(DB.INGREDIENTS)
		// 	.then(res =>
		// 		this.setState({ ingredients: res.data, loading: false })
		// 	)
		// 	.catch(error => this.setState({ loading: false }));
		this.props.onInitIngredients();
	}

	// addIngredientHandler = type => {
	// 	const operation = ADD;
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	this.updateTotalPrice(type, operation);
	// 	this.updatePurchaseState(updatedIngredients);
	// 	this.setState({ ingredients: updatedIngredients });
	// };

	// removeIngredientHandler = type => {
	// 	const operation = REMOVE;
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount > 0 ? oldCount - 1 : oldCount;
	// 	const updatedIngredients = {
	// 		...this.props.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	this.updateTotalPrice(type, operation);
	// 	this.updatePurchaseState(updatedIngredients);
	// 	this.setState({ ingredients: updatedIngredients });
	// };

	// updateTotalPrice = (type, operation) => {
	// 	console.log(newPrice);
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.props.totalPrice;
	// 	const newPrice =
	// 		operation === ADD && oldPrice > 0
	// ? oldPrice + priceAddition
	// 			: oldPrice - priceAddition;
	// 	// this.setState({ totalPrice: newPrice });

	// 	this.props.updatePrice({
	// 		type: actionTypes.UPDATE_PRICE,
	// 		price: newPrice
	// 	});
	// };

	// updatePurchaseState = updatedIngredients => {
	// 	const ingredients = { ...updatedIngredients };
	// 	const sumArray = Object.values(ingredients);
	// 	const sum = sumArray.reduce((sum, el) => {
	// 		return sum + el;
	// 	}, 0);
	// 	this.setState({ purchasable: sum > 0 });
	// };

	purchaseHandler = () => {
		this.props.isAuthenticated
			? this.setState({ orderBtnClicked: true })
			: this.props.history.push('/auth');
	};

	purchaseCancelHandler = () => this.setState({ orderBtnClicked: false });

	purchaseContinueHandler = () => {
		// ! Commented out shows how to pass on queryParams
		// const queryParams = [];
		// for (const i in this.state.ingredients) {
		// 	queryParams.push(
		// 		encodeURI(i) + '=' + encodeURI(this.state.ingredients[i])
		// 	);
		// }
		// queryParams.push('price=' + this.state.totalPrice);
		// const queryString = queryParams.join('&');
		// this.props.history.push({
		// 	pathname: ROUTES.CHECKOUT,
		// 	search: '?' + queryString
		// });
		this.props.onInitPurchase();
		this.props.history.push(ROUTES.CHECKOUT);
	};

	render() {
		const disabledInfo = {
			...this.props.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary;
		let burgerBuilder;
		if (this.props.ingredients) {
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinue={() => this.purchaseContinueHandler()}
					price={this.props.totalPrice}
				/>
			);

			burgerBuilder = (
				<Aux>
					<div style={{ width: '40%', margin: 'auto' }}>
						<Burger ingredients={this.props.ingredients} />
					</div>
					<BuildControls
						ingredientAdded={this.props.onIngredientAdd}
						ingredientRemoved={this.props.onIngredientRemove}
						disabled={disabledInfo}
						price={this.props.totalPrice}
						purchasable={this.props.purchasable}
						order={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
					/>
				</Aux>
			);
		}

		const burgerBuilderView = this.props.ingredients ? (
			burgerBuilder
		) : this.props.error ? (
			<p>Ingredients cannot be loaded.</p>
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

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		totalPrice: state.burger.totalPrice,
		purchasable: state.burger.purchasable,
		loadError: state.burger.error,
		isAuthenticated: state.auth.token !== null
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdd: ingName => dispatch(addIngredient(ingName)),
		onIngredientRemove: ingName => dispatch(removeIngredient(ingName)),
		onInitIngredients: () => dispatch(initIngredients()),
		onInitPurchase: () => dispatch(purchaseInit())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, Axios));
