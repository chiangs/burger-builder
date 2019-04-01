import Axios from '../../axios-orders';
import { DB } from '../../Constants';
import * as actionTypes from '../actions/actionTypes';

export const purchaseSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_SUCCESS,
		orderId: id,
		orderData: orderData,
		purchaseComplete: false
	};
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const purchaseFail = error => {
	return {
		type: actionTypes.PURCHASE_FAIL,
		error: error
	};
};

export const purchaseStart = () => ({ type: actionTypes.PURCHASE_START });

export const loadOrdersSuccess = fetchedOrders => {
	return {
		type: actionTypes.LOAD_ORDERS_SUCCESS,
		orders: fetchedOrders
	};
};

export const loadOrdersFail = error => ({
	type: actionTypes.LOAD_ORDERS_FAIL,
	error: error
});

export const loadOrdersInit = () => ({ type: actionTypes.LOAD_ORDERS_INIT });

export const loadOrders = (token, userId) => {
	return dispatch => {
		dispatch(loadOrdersInit());
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
		Axios.get(`${DB.ORDERS}` + queryParams)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}
				dispatch(loadOrdersSuccess(fetchedOrders));
			})
			.catch(error => {
				dispatch(loadOrdersFail(error));
			});
	};
};

export const purchase = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseStart());
		Axios.post(`${DB.ORDERS}?auth=` + token, orderData)
			.then(response =>
				dispatch(purchaseSuccess(response.data.name, orderData))
			)
			.catch(error => dispatch(purchaseFail(error)));
	};
};
