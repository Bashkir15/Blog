import axios from 'axios'

export function create() {
	let submitButton = document.getElementById('section-submit');

	function submit() {
		let data = {};
		data.topic = document.getElementById('section-topic-id').value;
		data.topicTitle = document.getElementById('section-topic').value;
		data.title = document.getElementById('section-title').value;
		data.description = document.getElementById('section-description').value;

		submitButton.classList.add('show-loading');

		axios.post('http://localhost:3000/sections', {
			topic: data.topic,
			topicTitle: data.topicTitle,
			title: data.title,
			description: data.description,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			submitButton.classList.remove('show-loading');
			submitButton.classList.add('loading-finished');
		}).then(() => {
			submitButton.removeEventListener('click');
			window.location.href(`/${data.topicTitle}`);
		});
	}

	submitButton.addEventListener('click', submit);
}