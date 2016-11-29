import SideNav from './scripts/components/sidenav'

import navShrink from './scripts/components/nav-shrink'
import topics from './scripts/pages/topics/topics'
import { sections } from './scripts/pages/sections/sections'
import { posts } from './scripts/pages/posts/posts'

navShrink();
topics();
sections();
posts();


let SidenavTrigger = document.getElementById('side-nav-trigger');
var Sidenav = new SideNav();


SidenavTrigger.addEventListener('click', Sidenav.toggleSidenav);