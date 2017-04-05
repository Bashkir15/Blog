import axios from 'axios'
import notify from '../../components/notifications'
import { onBlur } from '../../libs/validators/forms' 

export function login() {
	const loginEmail = document.getElementById('login-email');
	const loginPassword = document.getElementById('login-password');
	const submitButton = document.querySelector('.form-submit');
	const inputs = document.querySelectorAll('.form-input');

	const successContent = document.getElementById('success-content');
	const failureContent = document.getElementById('failure-content');
	const errorContent = document.getElementById('error-content');

	const successNotify = new notify({
		content: successNotify,
		type: 'success',
		timeout: 1500
	});

	const failureNotify = new notify({
		content: failureNotify,
		type: 'danger',
		timeout: 1500
	});

	const errorNotify = new notify({
		content: errorNotify,
		type: 'warning',
		timeout: 1500
	});



	function submit() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('form-loading');

			axios.post('/users/authenticate', {
				email: loginEmail.value,
				password: loginPassword.value,

				headers: {
					'Content-TYpe': 'Application/JSON'
				}
			})
			.then((response) => {
				submitButton.classList.remove('form-loading');

				if (response.data.success) {
					submitButton.classList.add('form-success');

					handleLogin(response);
				} else {
					submitButton.classList.add('form-failure');

					let failure = new Event('signup-failure');

					window.dispatchEvent(failure);
				}
			})
		} else {
			let error = new Event('login-error');

			window.dispatchEvent(error);
		}
	}

	function handleLogin(response) {
		let user = JSON.stringify(response.data.res.record);
		let success = new Event('login-success');

		window.localStorage.setItem('user', user);
		window.localStorage.setItem('blog-token', response.data.res.token);

		window.dispatchEvent(success);

		window.location.href = '/';
	}

	onBlur(inputs)

	submitButton.addEventListener('click', submit);
	window.addEventListener('login-failure', failureNotify);
	window.addEventListener('login-success', successNotify);
	window.addEventListener('login-error', errorNotify);
}