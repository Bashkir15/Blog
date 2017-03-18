 import { scrollTimeout } from '../../libs/utils'

export default function navAppend() {
	const nav = document.getElementById('nav');
	const header = document.querySelector('.landing-header');

	let lastKnownScrollY = 0;
	let timeout = false;

	init();

	function init() {
		window.addEventListener('scroll', handleScroll);
	}

	function handleScroll() {

		if (!timeout) {
			 timeout = setTimeout(() => {
				checkPin();
				timeout = false;
			}, 150); 
		}

		timeout = true; 
	}

	function getScrollY() {
		return window.pageYOffset || window.scrollTop;
	}

	function checkPin() {
		let currentScrollY = getScrollY();

		if (currentScrollY >= header.scrollHeight) {
			pin();
		} else {
			unpin();
		}

		lastKnownScrollY = getScrollY();
	}

	function pin() {
		nav.style.willChange = 'transform';
		nav.classList.add('nav-pinned');
		nav.style.willChange = 'auto';
	}

	function unpin() {
		nav.style.willChange = 'transform';

		if (nav.classList.contains('nav-pinned')) {
			nav.classList.remove('nav-pinned');
		}

		nav.style.willChange = 'auto';
	}

} 
