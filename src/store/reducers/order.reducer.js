import * as actionTypes from '../actions/actionTypes';
import { updateStateObj } from './_utility';

// * One way to further abstract the logic from the switch statement for easier reading

const initialState = {
	orders: [],
	loading: false,
	purchaseComplete: false
};

const purchaseStart = (state, action) => {
	const updatedProperties = { loading: true };
	return updateStateObj(state, updatedProperties);
};

const purchaseSuccess = (state, action) => {
	const newOrder = {
		...action.orderData,
		id: action.orderId
	};
	const updatedProperties = {
		...newOrder,
		loading: false,
		orders: state.orders.concat(newOrder),
		purchaseComplete: true
	};
	return updateStateObj(state, updatedProperties);
};

const purchaseFail = (state, action) => {
	const updatedProperties = { loading: false };
	return updateStateObj(state, updatedProperties);
};

const purchaseInit = (state, action) => {
	const updatedProperties = {
		purchaseComplete: false
	};
	return updateStateObj(state, updatedProperties);
};

const loadOrdersInit = (state, action) => {
	const updatedProperties = { loading: false };
	return updateStateObj(state, updatedProperties);
};

const loadOrdersSuccess = (state, action) => {
	const updatedProperties = { orders: action.orders, loading: false };
	return updateStateObj(state, updatedProperties);
};

const loadOrdersFail = (state, action) => {
	const updatedProperties = { loading: false };
	return updateStateObj(state, updatedProperties);
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_START:
			return purchaseStart(state, action);
		case actionTypes.PURCHASE_SUCCESS:
			return purchaseSuccess(state, action);
		case actionTypes.PURCHASE_FAIL:
			return purchaseFail(state, action);
		case actionTypes.PURCHASE_INIT:
			return purchaseInit(state, action);
		case actionTypes.LOAD_ORDERS_INIT:
			return loadOrdersInit(state, action);
		case actionTypes.LOAD_ORDERS_SUCCESS:
			return loadOrdersSuccess(state, action);
		case actionTypes.LOAD_ORDERS_FAIL:
			return loadOrdersFail(state, action);
		default:
			return state;
	}
};

export default orderReducer;
