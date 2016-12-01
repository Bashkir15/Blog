export function authVisibility(node) {;
	console.log('shit');
	node.parentNode.removeChild(node);
} 

export function checkAuthRoute() {
	let token = checkToken();

	if (token) {
		return;
	} else {
		var notAuthorized = new Event('unauthorized');
		window.location.href = '/login';
		window.dispatchEvent(notAuthorized);
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