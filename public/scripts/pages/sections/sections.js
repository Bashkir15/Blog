import { create } from './create'
import { single } from './single'
import { checkAuthRoute } from '../../libs/auth'


export function sections() {
	if (window.location.href.indexOf('create-section') != -1) {
		checkAuthRoute();
		create();
	} else {
		single();
	}
}