import { cacheQuery } from '../../libs/utils'

export function single() {
	var cache = {};

	function makeAccordian(accordian) {
		accordian = accordian || cacheQuery(cache, '.single-section-posts');
		let toggleButton = cacheQuery(cache, '.close-section-button');
		let currentTarget;

		for (var i = 0; i < toggleButton.length; i++) {
			let target = toggleButton[i];

			target.addEventListener('click', function() {
				currentTarget = this.parentNode;

				if (currentTarget.classList.contains('closed')) {
					target.classList.remove('section-closed');
					currentTarget.classList.remove('closed');
				} else {
					target.classList.add('section-closed');
					currentTarget.classList.add('closed');
				}
			}, false);
		}

		for (var i = 0; i < accordian.length; i++) {
			makeAccordian(accordian[i]);
		}
	}

	makeAccordian();
}