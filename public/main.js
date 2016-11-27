import SideNav from './scripts/components/sidenav'

import topics from './scripts/pages/topics/topics'
import { sections } from './scripts/pages/sections/sections'

topics();
sections();

let SidenavTrigger = document.getElementById('side-nav-trigger');
var Sidenav = new SideNav();


SidenavTrigger.addEventListener('click', Sidenav.toggleSidenav);