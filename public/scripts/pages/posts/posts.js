import { editor } from './editor'
import { single } from './single'

export function posts() {
	let matches = window.location.pathname.split('/');
	if (window.location.href.indexOf('create-post') != -1) {
		editor();
	} else if (matches.length == 4) {
		single();
	}
}