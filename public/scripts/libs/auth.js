import axios from 'axios'

const unauthedLinks = document.querySelectorAll('.unauthed-link');
const authedLinks = document.querySelectorAll('.authed-link');
const logoutButton = document.getElementById('logout-button');

export function authVisibility(node) {;
	node.parentNode.removeChild(node);
} 

export function checkAuthRoute() {
	let token = checkToken();

	if (token) {
		return;
	} else {
		window.location.href = '/login';
	}
}



 function checkToken() {
	var token = window.localStorage.getItem('blog-token');

	if (token) {
		return token;
	} else {
		return false;
	}
}

export function logout() {
	window.localStorage.removeItem('user');
	window.localStorage.removeItem('blog-token');
}

export function checkAdmin() {
	let token = checkToken();

	axios.post('/checkAdmin', {
		headers: {
			'Authorization': token
		}
	})
	.then((response) => {
		if (response.status == '403') {
			window.location.pathname = '/';
		} else {
			return;
		}
		
	})
}

export const loggedIn = checkToken();

