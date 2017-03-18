import moment from 'moment'

import navAppend from './nav'
import { fixTitle, fixDate } from '../posts/libs/events'

export default function landing() {
	const titles = document.querySelectorAll('.post-title');
	const created = document.querySelectorAll('.post-created');

	init();
	navAppend();

	function init() {
		let titleCount = titles.length;
		let createdCount = created.length;

		if (titleCount) {
			for (let i = 0; i < titleCount; i++) {
				fixTitle(titles[i]);
			}
		}

		if (createdCount) {
			for (let i = 0; i < createdCount; i++) {
				fixDate(created[i]);
			}
		}
	}
}