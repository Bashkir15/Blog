import * as types from './actionTypes'
import authApi from '../api/auth'

export function createUser(user) {
	return function (dispatch) {
		return authApi.createUser(user).then(response => {
			window.localStorage.setItem('token', response.res.token);
			var user = JSON.stringify(response.res.record);
			window.localStorage.setItem('user', user);
			dispatch(registerUserSuccess(response));
		}).catch(error => {
			throw(error);
		});
	}
}


export function registerUserSuccess(user) {
	return {type: types.REGISTER, user};
}