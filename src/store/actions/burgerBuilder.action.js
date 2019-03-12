import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';
import { DB } from '../../Constants';

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const setLoadError = status => {
	return {
		type: actionTypes.LOAD_ERROR,
		loadError: status
	};
};

export const initIngredients = () => {
	return dispatch => {
		Axios.get(DB.INGREDIENTS)
			.then(res => dispatch(setIngredients(res.data)))
			.catch(error => dispatch(setLoadError(true)));
	};
};
