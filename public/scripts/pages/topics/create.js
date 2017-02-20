import axios from 'axios'

export function create() {

	const submitButton = document.getElementById('topic-submit');

	function submit() {
		let data = {};

		submitButton.classList.add('show-loading');

		data.title = document.getElementById('topic-title').value;
		data.icon = document.getElementById('topic-icon').value;
		data.description = document.getElementById('topic-description').value;

		axios.post('http://localhost:8000/topics', {
			title: data.title,
			icon: data.icon,
			description: data.description,

			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			submitButton.classList.remove('show-loading');
			submitButton.classList.add('loading-finished');
		})
		.then(() => {
			submitButton.removeEventListener('click', submit);
			window.location.href = '/';
		});
	}

	submitButton.addEventListener('click', submit);
}