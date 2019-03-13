import * as actionTypes from '../actions/actionTypes';
import { updateStateObj } from './_utility';

const initialState = {
	orders: [],
	loading: false,
	purchaseComplete: false
};

const orderReducer = (state = initialState, action) => {
	let updatedProperties = {};
	switch (action.type) {
		case actionTypes.PURCHASE_START:
			updatedProperties = { loading: true };
			return updateStateObj(state, updatedProperties);
		case actionTypes.PURCHASE_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};
			updatedProperties = {
				...newOrder,
				loading: false,
				orders: state.orders.concat(newOrder),
				purchaseComplete: true
			};
			return updateStateObj(state, updatedProperties);
		case actionTypes.PURCHASE_FAIL:
			updatedProperties = { loading: false };
			return updateStateObj(state, updatedProperties);
		case actionTypes.PURCHASE_INIT:
			updatedProperties = {
				purchaseComplete: false
			};
			return updateStateObj(state, updatedProperties);
		case actionTypes.LOAD_ORDERS_INIT:
			updatedProperties = { loading: false };
			return updateStateObj(state, updatedProperties);
		case actionTypes.LOAD_ORDERS_SUCCESS:
			updatedProperties = { orders: action.orders, loading: false };
			return updateStateObj(state, updatedProperties);
		case actionTypes.LOAD_ORDERS_FAIL:
			updatedProperties = { loading: false };
			return updateStateObj(state, updatedProperties);
		default:
			return state;
	}
};

export default orderReducer;
