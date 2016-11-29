import axios from 'axios'
import { cacheId } from '../../libs/utils'

export function create() {
	var cache = {};

	let submitButton = cacheId(cache, 'section-submit');

	function submit() {
		let data = {};
		data.topic = cacheId(cache, 'section-topic-id')
		data.topicTitle = cacheId(cache, 'section-topic')
		data.title = cacheId(cache, 'section-title')
		data.description = cacheId(cache, 'section-description');

		submitButton.classList.add('show-loading');

		axios.post('http://localhost:3000/sections', {
			topic: data.topic.value,
			topicTitle: data.topicTitle.value,
			title: data.title.value,
			description: data.description.value,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			submitButton.classList.remove('show-loading');
			submitButton.classList.add('loading-finished');
		}).then(() => {
			submitButton.removeEventListener('click', submit);
			window.location.href= `/${data.topicTitle}`;
		});
	}

	submitButton.addEventListener('click', submit);
}