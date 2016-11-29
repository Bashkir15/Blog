import { throttle } from '../libs/utils'
import { timeoutThrottle } from '../libs/utils'

function navShrink() {
	var lastKnownScrollY = 0;
	var nav = document.querySelector('.nav');
	var scrollContainer = document.querySelector('.index-page-view-content');
	var scrollTimeout;

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
		console.log(currentScrollY);

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