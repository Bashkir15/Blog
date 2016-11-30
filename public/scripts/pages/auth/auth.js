import { signup } from './signup'
import { login } from './login'

export function auth() {
	if (window.location.href.indexOf('signup') != -1) {
		signup();
	} else if (window.location.href.indexOf('login') != -1) {
		login();
	}
}
