import { create } from './create'

function topics() {
	if (window.location.href.indexOf('create-topic') != -1) {
		create();
	}
}

export default topics