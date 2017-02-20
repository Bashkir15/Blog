import { create } from './create'
import { checkAuthRoute } from '../../libs/auth'

function topics() {
	if (window.location.href.indexOf('create-topic') != -1) {
		checkAuthRoute();
		create();
	}
}

export default topics