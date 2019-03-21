import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from './actionTypes';
import { LOCAL_STORAGE } from '../../Constants';
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

export const logout = () => {
	localStorage.removeItem(LOCAL_STORAGE.token);
	localStorage.removeItem(LOCAL_STORAGE.expirationDate);
	localStorage.removeItem(LOCAL_STORAGE.userId);
	return {
		type: LOGOUT
	};
};

export const checkAuthTimeout = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
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
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem(LOCAL_STORAGE.token, res.data.idToken);
				localStorage.setItem(
					LOCAL_STORAGE.expirationDate,
					expirationDate
				);
				localStorage.setItem(LOCAL_STORAGE.userId, res.data.localId);
				dispatch(authSuccess(res.data));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error));
			});
	};
};

export const checkAuthState = () => {
	return dispatch => {
		const token = localStorage.getItem(LOCAL_STORAGE.token);
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem(LOCAL_STORAGE.expirationDate)
			);
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem(LOCAL_STORAGE.userId);
				dispatch(authSuccess({ idToken: token, localId: userId }));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
