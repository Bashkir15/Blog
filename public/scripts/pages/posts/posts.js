import { editor } from './editor'

export function posts() {
	if (window.location.href.indexOf('create-post') != -1) {
		editor();
	}
}