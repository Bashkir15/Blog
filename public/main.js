import SideNav from './scripts/components/sidenav'

import navShrink from './scripts/components/nav-shrink'
import topics from './scripts/pages/topics/topics'
import { sections } from './scripts/pages/sections/sections'
import { posts } from './scripts/pages/posts/posts'
import { auth } from './scripts/pages/auth/auth'

import { authVisibility, loggedIn, checkLinks } from './scripts/libs/auth'

function start() {
	const SidenavTrigger = document.getElementById('side-nav-trigger');
	let Sidenav = new SideNav();


	checkLinks();
	navShrink();
	auth();
	topics();
	sections();
	posts();

	if (window.innerWidth || document.documentElement.clientWidth < 1300) {
		SidenavTrigger.addEventListener('click', Sidenav.toggleSidenav);
	}
}

HTMLDocument.prototype.ready = () => {
	return new Promise((resolve, reject) => {
		var startTime = new Date().getTime();
		var endTime;

		if (document.readyState === 'complete') {
			endTime = new Date().getTime();
			resolve(document, startTime, endTime);
		} else {
			document.addEventListener('DOMContentLoaded', () => {
				endTime = new Date().getTime();
				resolve(document, startTime, endTime);
			});
		}
	});
}

document.ready().then((startTime, endTime) => {
	if (endTime - startTime > 300) {
		document.body.classList.add('loaded');
		start();
	} else {
		setTimeout(() => {
			document.body.classList.add('loaded');
			start();
		}, 1000)
	}
});
