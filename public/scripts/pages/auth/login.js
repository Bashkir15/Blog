import axios from 'axios'
import notify from '../../components/notifications'
import { cacheId } from '../../libs/utils'

export function login() {
	var cache = cache || {};

	let loginEmail = cacheId(cache, 'login-email');
	let loginPassword = cacheId(cache, 'login-password');
	let submitButton = cacheId(cache, 'login-submit');
	let successContent = cacheId(cache, 'success-content');
	let failureContent = cacheId(cache, 'failure-content');

	let successNotify = new notify({
		content: successNotify,
		type: 'success',
		timeout: 1500
	});

	let failureNotify = new notify({
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
		submitButton.classList.add('show-loading');

		let data = {};
		data.email = cacheId(cache, 'login-email');
		data.password = cacheId(cache, 'login-password');

		axios.post('http://localhost:3000/users/authenticate', {
			email: data.email.value,
			password: data.password.value,

			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			submitButton.classList.remove('show-loading');

			if (response.data.success) {
				submitButton.classList.add('loading-success');

				let success = new Event('login-success');
				let user = JSON.stringify(response.data.res.record);


				window.dispatchEvent(success); 
				window.localStorage.setItem('user', user);
				window.localStorage.setItem('blog-token', response.data.res.token);
				removeEvents();
				window.location.href = '/admin';

			} else {
				submitButton.classList.add('loading-failed');
				
				let failure = new Event('login-failure');
				window.dispatchEvent(failure);
			}
		}); 
	}

	function removeEvents() {
		submitButton.removeEventListener('click', submit);
		loginEmail.removeEventListener('blur', validateEmail);
		window.removeEventListener('login-failure', failureNotify.open);
		window.removeEventListener('login-success', successNotify.open);
	}

	submitButton.addEventListener('click', submit);
	loginEmail.addEventListener('blur', validateEmail);
	window.addEventListener('login-failure', failureNotify);
	window.addEventListener('login-success', successNotify);
}