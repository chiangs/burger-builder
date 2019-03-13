import * as actionTypes from '../actions/actionTypes';
import { INGREDIENT_PRICES } from '../../Constants';
import { updateStateObj } from './_utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	purchasable: false,
	loadError: false
};

const updatePurchaseState = updatedIngredients => {
	const ingredients = { ...updatedIngredients };
	const sumArray = Object.values(ingredients);
	const sum = sumArray.reduce((sum, el) => {
		return sum + el;
	}, 0);
	return sum > 0;
};

const burgerBuilder = (state = initialState, action) => {
	let updatedProperties = {};
	switch (action.type) {
		case actionTypes.SET_INGREDIENTS:
			updatedProperties = {
				ingredients: action.ingredients,
				totalPrice: initialState.totalPrice,
				loadError: false
			};
			return updateStateObj(state, updatedProperties);
		case actionTypes.LOAD_ERROR:
			updatedProperties = { loadError: action.loadError };
			return updateStateObj(state, updatedProperties);
		case actionTypes.ADD_INGREDIENT:
			const updatedIngredients = {
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] + 1
				}
			};
			const purchasable = {
				purchasable: updatePurchaseState({
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] + 1
				})
			};
			const updatedPrice = {
				totalPrice:
					state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
			updatedProperties = {
				...updatedIngredients,
				...updatedPrice,
				...purchasable
			};
			return updateStateObj(state, updatedProperties);
		case actionTypes.REMOVE_INGREDIENT:
			const updatedIng = {
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] - 1
				}
			};
			const updatedPri = {
				totalPrice:
					state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
			const purchaseble2 = {
				purchasable: updatePurchaseState({
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] - 1
				})
			};
			updatedProperties = {
				...updatedIng,
				...updatedPri,
				...purchaseble2
			};
			return updateStateObj(state, updatedProperties);
		default:
			return state;
	}
};

export default burgerBuilder;
