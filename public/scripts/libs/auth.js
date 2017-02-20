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

export function checkLinks() {
	var len = authedLinks.length;
	var len2 = unauthedLinks.length;

	if (loggedIn) {
		let i;
		let j;

		for (i = 0; i < len; i++) {
			authedLinks[i].classList.add('authed');
		}

		for (j = 0; j < len2; j++) {
			unauthedLinks[j].classList.add('authed');
		}

		logoutButton.addEventListener('click', logout, false);
	} else {
		let i;
		let j;

		for (i = 0; i < len; i++) {
			authedLinks[i].classList.remove('authed');
		}

		for (j = 0; j < len2; j++) {
			unauthedLinks[j].classList.remove('authed');
		}
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

export const loggedIn = checkToken();

