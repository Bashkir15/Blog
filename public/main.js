import SideNav from './scripts/components/sidenav'

import navShrink from './scripts/components/nav-shrink'
import topics from './scripts/pages/topics/topics'
import { sections } from './scripts/pages/sections/sections'
import { posts } from './scripts/pages/posts/posts'
import { auth } from './scripts/pages/auth/auth'

import { authVisibility } from './scripts/libs/auth'
import { cacheQuery, cacheId } from './scripts/libs/utils' 

function start() {
	var cache = {};

	let SidenavTrigger = cacheId(cache, 'side-nav-trigger');
	let Sidenav = new SideNav();


	function checkLinks() {
		let token = window.localStorage.getItem('blog-token');
		let unauthedLinks = cacheQuery(cache, '.unauthed-link');
		let authedLinks = cacheQuery(cache, '.authed-link');
		var logoutButton = cacheId(cache, 'logout-button');

		if (token) {

			Array.prototype.forEach.call(unauthedLinks, (link) => {
				link.style.display = "none";
			});

			logoutButton.addEventListener('click', logout);
		} else {
			Array.prototype.forEach.call(authedLinks, (link) => {
				link.style.display = "none";
			});
		}
	}

	function logout(e) {
		e.preventDefault();

		window.localStorage.removeItem('user');
		window.localStorage.removeItem('blog-token');

		logoutButton.removeEventListener('click', logout);
	}

	checkLinks();
	navShrink();
	auth();
	topics();
	sections();
	//posts();

	if (window.innerWidth || document.documentElement.clientWidth < 1300) {
		SidenavTrigger.addEventListener('click', Sidenav.toggleSidenav);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	document.body.classList.remove('loading');
	start();
});