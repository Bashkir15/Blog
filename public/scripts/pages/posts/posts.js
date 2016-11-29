import { editor } from './editor'
import { single } from './single'

export function posts() {
	if (window.location.href.indexOf('create-post') != -1) {
		editor();
	} else {
		single();
	}
}