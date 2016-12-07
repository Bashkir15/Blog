import { fixTitles } from '../../libs/utils'

export function latest() {
	let postTitles = document.querySelectorAll('.latest-post-title');
	let postSections = document.querySelectorAll('.latest-post-section');

	function fixTitle(title) {
		title.textContent = title.textContent.split("-").join(" ");
	}

	for (var i = 0; i < postTitles.length; i++) {
		fixTitle(postTitles[i]);
	}

	for (var i = 0; i < postSections.length; i++) {
		fixTitle(postSections[i]);
	}
}