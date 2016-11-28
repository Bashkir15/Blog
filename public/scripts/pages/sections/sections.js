import { create } from './create'
import { single } from './single'


export function sections() {
	if (window.location.href.indexOf('create-section') != -1) {
		create();
	} else {
		single();
	}
}