import { cacheQuery } from '../../libs/utils'

export function single() {
	var accordians = document.querySelectorAll('.single-section-posts');
	var sectionTitles = document.querySelectorAll('.single-section-title');
	var postTitles = document.querySelectorAll('.single-post-title');



	function makeAccordian(accordian) {
		//accordian = accordian || document.querySelectorAll('.single-section-posts');
		let toggleButton = document.querySelectorAll('.close-section-button');
		let currentTarget;

		for (var i = 0; i < toggleButton.length; i++) {
			let target = toggleButton[i];

			target.addEventListener('click', function() {
				currentTarget = this.parentNode;

				if (target.classList.contains('section-closed')) {
					target.classList.remove('section-closed');
					currentTarget.classList.remove('closed');
				} else {
					target.classList.add('section-closed');
					currentTarget.classList.add('closed');
				}
			}, false);
		}
	}

	for (var i = 0; i < accordians.length; i++) {
		makeAccordian(accordians[i]);
	}

	for (var i = 0; i < sectionTitles.length; i++) {
		fixTitles(sectionTitles[i]);
	}

	for (var i = 0; i < postTitles.length; i++) {
		fixPost(postTitles[i]);
	}

	function fixTitles(title) {
		title.textContent = title.textContent.split("-").join(" ");
	}

	function fixPost(title) {
		title.textContent = title.textContent.split("-").join(" ");
	}


	/*init() {
		for (var i = 0; i < accordians.length; i++) {
			makeAccordian(accordians[i]);
		}

	//	for (var i = 0; i < titles.length; i++) {
	//		fixTitles(title);
	//	}

	} */

	//makeAccordian();
}