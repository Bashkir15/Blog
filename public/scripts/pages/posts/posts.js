import { editor } from './editor'
import { single } from './single'
import { latest } from './latest'
import { checkAuthRoute } from '../../libs/auth'

export function posts() {
	let matches = window.location.pathname.split('/');
	if (window.location.href.indexOf('create-post') != -1) {
		editor();
	} else if (window.location.href.indexOf('latest') != -1) {
		latest();
	} else if (matches.length == 4) {
		single();
	}
}