import { cacheSingle } from '../libs/utils'

function navShrink() {
	var cache = {};

	let lastKnownScrollY = 0;
	let nav = cacheSingle(cache, '.nav');
	let scrollContainer = cacheSingle(cache, '.index-page-view-content');
	let scrollTimeout;

	init();

	function getScrollY() {
		return scrollContainer.pageYOffset || scrollContainer.scrollTop;
	}

	function init() {
		scrollContainer.addEventListener('scroll', scrollThrottle);
	}

	function scrollThrottle() {
		if (!scrollTimeout) {
			scrollTimeout = setTimeout(() => {
				scrollTimeout = null;
				checkPin();
			}, 250);
		}
	}

	function checkPin() {
		var currentScrollY = getScrollY();

		if (currentScrollY < lastKnownScrollY) {
			pin();
		}

		if (currentScrollY > lastKnownScrollY) {
			unpin();
		}

		lastKnownScrollY = getScrollY();
	}

	function pin() {
		nav.style.willChange = "transform";

		if (nav.classList.contains('nav-unpinned')) {
			nav.classList.remove('nav-unpinned');
			nav.classList.add('nav-pinned');
		} else {
			nav.classList.add('nav-pinned');
		}

		nav.style.willChange = "auto";
	}

	function unpin() {
		nav.style.willChange = "transform"

		if (nav.classList.contains('nav-pinned')) {
			nav.classList.remove('nav-pinned');
			nav.classList.add('nav-unpinned');
		} else {
			nav.classList.add('nav-unpinned');
		}

		nav.style.willChange = "auto"
	}
}

export default navShrink