import { checkAuthRoute, checkAdminPriv } from './validators/auth'
import { signup } from '../pages/auth/signup'
import { login } from '../pages/auth/login'

export function startRouter() {
	if (window.location.href.indexOf('signup') != -1) {
		signup();
	} else if (window.location.href.indexOf('login') != -1) {
		login();
	} else if (window.location.href.indexOf('create-post') != -1) {
		checkAdminPriv(stuff);
	}
}

function stuff() {
	console.log('woot');
}

