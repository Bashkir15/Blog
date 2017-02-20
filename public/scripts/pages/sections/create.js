import axios from 'axios'
import { cacheId } from '../../libs/utils'

export function create() {
	const submitButton = document.getElementById('section-submit')
	const topic = document.getElementById('section-topic-id');
	const topicTitle = document.getElementById('section-topic');
	const title = document.getElementById('section-tite');
	const description = document.getElementById('section-description');

	function submit() {
		submitButton.classList.add('show-loading');

		axios.post('http://localhost:3000/sections', {
			topic: topic.value,
			topicTitle: topicTitle.value,
			title: title.value,
			description: description.value,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			submitButton.classList.remove('show-loading');
			submitButton.classList.add('loading-finished');
		}).then(() => {
			submitButton.removeEventListener('click', submit);
			window.location.href= `/${topicTitle.value}`;
		});
	}

	submitButton.addEventListener('click', submit);
}