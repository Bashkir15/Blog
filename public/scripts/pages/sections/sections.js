import { create } from './create'

export function sections() {
	if (window.location.href.indexOf('create-section') != -1) {
		create();
	}
}