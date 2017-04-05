import axios from 'axios'

function checkToken() {
	let token = window.localStorage.getItem('blog-token');

	if (token) {
		return token;
	} else {
		return false;
	}
}

export function checkAuthRoute(callback) {
	let token = checkToken();

	if (token) {
		callback();
	} else {
		window.location.href = '/login';
	}
}

export function checkAdminPriv(callback) {
	let user = JSON.parse(window.localStorage.getItem('user'));

	if (user) {
		if (user.roles.indexOf('admin') != -1) {
			postAdmin(callback);
		} else {
			window.location.href = '/';
		}
	} else {
		window.location.href = '/';
	}
}

function postAdmin(callback) {

	axios.post('/checkAdmin', {
		token: `Bearer ${window.localStorage.getItem('blog-token')}`,

		headers: {
			'Content-Type': 'Application/JSON'
		}
	})
	.then((response) => {
		if (response.status == '403') {
			window.location.href = '/';
		} else if (response.status == '200') {
			return callback();
		}
	})
}

export const isLoggedIn = checkToken();