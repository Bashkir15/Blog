import axios from 'axios'
import notify from '../../components/notifications'

export function signup() {
	const name = document.getElementById('signup-name');
	const email = document.getElementById('signup-email');
	const password = document.getElementById('signup-password');
	const confirm = document.getElementById('signup-password');
	const submitButton = document.querySelector('.auth-form-submit button');

	function submit() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('form-loading');

			axios.post('http://localhost:8000/signup', {
				name: name.value,
				email: email.value,
				password: password.value,

				headers: {
					'Content-Type': 'Application/JSON'
				}
			})
			.then((response) => {
				submitButton.classList.remove('form-loading');

				if (response.data.success) {
					submitButton.classList.add('form-success');

					const user = JSON.stringify(response.data.res.record);
					const success = new Event('signup-success');

					window.localStorage.setItem('user', user);
					window.localStorage.setItem('blog-token', response.data.res.token);

					window.dispatchEvent(success);
				} else {
					submitButton.classList.add('form-failure');

					const failure = new Event('signup-failure');

					window.dispatchEvent(failure);
				}
			})
		} else {
			const error = new Event('signup-error');

			window.dispatchEvent(error);
		}
	}
}
