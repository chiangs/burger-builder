import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from './actionTypes';
import axios from 'axios';

const key = 'AIzaSyAPYs4H-CnJRORjOsd7q6u2-GZyeWsm5s4';
const uri = {
	signup:
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=',
	signin:
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
};

export const authInit = () => ({
	type: AUTH_INIT
});

export const authSuccess = authData => ({
	type: AUTH_SUCCESS,
	payload: authData
});

export const authFail = error => ({
	type: AUTH_FAIL,
	error: error
});

export const logout = () => ({
	type: LOGOUT
});

export const checkAuthTimeout = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	console.log(email, password, isSignup);

	return dispatch => {
		dispatch(authInit());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		const restURI = isSignup
			? `${uri.signup}${key}`
			: `${uri.signin}${key}`;
		axios
			.post(restURI, authData)
			.then(res => {
				dispatch(authSuccess(res.data));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error));
			});
	};
};
