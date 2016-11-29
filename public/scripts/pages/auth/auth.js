import { signup } from './signup'

export function auth() {
	if (window.location.href.indexOf('signup') != -1) {
		signup();
	}
}
