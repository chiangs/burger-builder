import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL } from './actionTypes';
import axios from 'axios';

const key = 'AIzaSyAPYs4H-CnJRORjOsd7q6u2-GZyeWsm5s4';
const uri = {
	signup:
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
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

export const auth = (email, password) => {
	return dispatch => {
		dispatch(authInit());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		const restURI = `${uri.signup}${key}`;
		axios
			.post(restURI, authData)
			.then(res => {
				console.log(res);
				dispatch(authSuccess(res.data));
			})
			.catch(error => {
				console.error(error);
				dispatch(authFail());
			});
	};
};
