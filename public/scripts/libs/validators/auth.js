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

	if (user.roles.indexOf('admin') != -1) {
		callback();
	} else {
		window.location.href = '/';
	}
}

export const isLoggedIn = checkToken();