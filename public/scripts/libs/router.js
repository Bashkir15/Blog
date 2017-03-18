import { checkAuthRoute, checkAdminPriv } from './validators/auth'

import landing from '../pages/landing/landing'

import { signup } from '../pages/auth/signup'
import { login } from '../pages/auth/login'

import { editor } from '../pages/posts/editor'
import single from '../pages/posts/single'

export function startRouter() {
	if (window.location.href.indexOf('signup') != -1) {
		signup();
	} else if (window.location.href.indexOf('login') != -1) {
		login();
	} else if (window.location.href.indexOf('create-post') != -1) {
		checkAdminPriv(editor);
	} else if (window.location.href.indexOf('posts') != -1 ) {
		single();
	} else {
		landing();
	}
}

