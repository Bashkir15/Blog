import SideNav from './scripts/components/sidenav'

import navShrink from './scripts/components/nav-shrink'
import topics from './scripts/pages/topics/topics'
import { sections } from './scripts/pages/sections/sections'
import { posts } from './scripts/pages/posts/posts'
import { auth } from './scripts/pages/auth/auth'

import { authVisibility, loggedIn, checkLinks } from './scripts/libs/auth'
import { cacheQuery, cacheId } from './scripts/libs/utils' 

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

window.addEventListener('DOMContentLoaded', () => {
	document.body.classList.remove('loading');
	start();
});