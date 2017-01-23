import axios from 'axios'
import notify from '../../components/notifications'
import { cacheId } from '../../libs/utils'

export function login() {
	const loginEmail = document.getElementById('login-email');
	const loginPassword = document.getElementById('login-password');
	const loginButton = document.getElementById('login-submit');
	const successContent = document.getElementById('success-content');
	const failureContent = document.getElementById('failure-content');

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


	function validateEmail() {
		let input = loginEmail.value;
		let atpos = input.indexOf('@');
		let dotpos = input.lastIndexOf('.')

		if (atpos < 1 || (dotpos - atpos) < 2) {
			if (loginEmail.parentNode.classList.contains('email-valid')) {
				loginEmail.parentNode.classList.remove('email-valid');
			}

			loginEmail.parentNode.classList.add('email-invalid');
		} else {
			if (loginEmail.parentNode.classList.contains('email-invalid')) {
				loginEmail.parentNode.classList.remove('email-invalid');
			}

			loginEmail.parentNode.classList.add('email-valid');
		}
	}


	function submit() {
		let data = {};
		data.email = loginEmail;
		data.password = loginPassword;

		loginButton.classList.add('show-loading');

		axios.post('http://localhost:3000/users/authenticate', {
			email: data.email.value,
			password: data.password.value,

			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			loginButton.classList.remove('show-loading');

			if (response.data.success) {
				loginButton.classList.add('loading-success');

				let success = new Event('login-success');
				let user = JSON.stringify(response.data.res.record);


				window.dispatchEvent(success); 
				window.localStorage.setItem('user', user);
				window.localStorage.setItem('blog-token', response.data.res.token);

				removeEvents();
				
				window.location.href = '/admin';

			} else {
				loginButton.classList.add('loading-failed');
				
				let failure = new Event('login-failure');
				window.dispatchEvent(failure);
			}
		}); 
	}

	function removeEvents() {
		loginButton.removeEventListener('click', submit);
		loginEmail.removeEventListener('blur', validateEmail);
		window.removeEventListener('login-failure', failureNotify.open);
		window.removeEventListener('login-success', successNotify.open);
	}

	loginButton.addEventListener('click', submit);
	loginEmail.addEventListener('blur', validateEmail);
	window.addEventListener('login-failure', failureNotify);
	window.addEventListener('login-success', successNotify);
}