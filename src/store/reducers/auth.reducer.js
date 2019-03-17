import * as actionTypes from '../actions/actionTypes';
import { updateStateObj } from './_utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false
};

const authStart = (state, action) => {
	return updateStateObj(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	return updateStateObj(state, {
		token: action.payload.idToken,
		userId: action.payload.localId,
		error: null,
		loading: false
	});
};

const authFail = (state, action) => {
	return updateStateObj(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
	return updateStateObj(state, initialState);
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_INIT:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
};

export default authReducer;
