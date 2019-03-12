import * as actionTypes from '../actions/actionTypes';
import { INGREDIENT_PRICES } from '../../Constants';

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4,
	purchasable: false
};

const updatePurchaseState = updatedIngredients => {
	const ingredients = { ...updatedIngredients };
	const sumArray = Object.values(ingredients);
	const sum = sumArray.reduce((sum, el) => {
		return sum + el;
	}, 0);
	return sum > 0;
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] + 1
				},
				totalPrice:
					state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				purchasable: updatePurchaseState({
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] + 1
				})
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] - 1
				},
				totalPrice:
					state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				purchasable: updatePurchaseState({
					...state.ingredients,
					[action.ingredientName]:
						state.ingredients[action.ingredientName] - 1
				})
			};
		default:
			return state;
	}
};

export default reducer;
