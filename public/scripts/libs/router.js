import { signup } from '../pages/auth/signup'
import { login } from '../pages/auth/login'

export function startRouter() {
	if (window.location.href.indexOf('signup') != -1) {
		signup();
	} else if (window.location.href.indexOf('login') != -1) {
		login();
	}
}

