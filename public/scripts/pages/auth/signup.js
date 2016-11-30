import axios from 'axios'
import { cacheId } from '../../libs/utils'

export function signup() {
	var cache = {};

	let submitButton = cacheId(cache, 'signup-submit');
	let email = cacheId(cache, 'signup-email');
	let confirm = cacheId(cache, 'signup-confirm');
	let password = cacheId(cache, 'signup-password')

	email.addEventListener('blur', validateEmail);
	confirm.addEventListener('blur', validatePassword);

	submitButton.addEventListener('click', submit);

	function submit() {
		submitButton.classList.add('show-loading');

		let data = {};
		data.name = cacheId(cache, 'signup-name');
		data.username = cacheId(cache, 'signup-username');
		data.email = email;
		data.password = password;

		axios.post('http://localhost:3000/users', {
			name: data.name.value,
			username: data.username.value,
			email: data.email.value,
			password: data.password.value,

			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			submitButton.classList.remove("show-loading");
			
			if (response.data.success) {
				submitButton.classList.add('submit-success');
				// send notify
				submitButton.removeEventListener('click', submit);
				email.removeEventListener('blur', validateEmail);
				password.removeEventListener('blur', validatePassword);
				let user = JSON.stringify(response.data.res.record);
				window.localStorage.setItem('user', user);
				window.localStorage.setItem('blog-token', response.data.res.token);
				window.location.href = '/';
			} else {
				submitButton.classList.add('submit-failed');
				// notify response.data.res.message
			}
		})
	}

	function validateEmail() {
		console.log('email');
		let input = email.value;
		let atpos = input.indexOf('@');
		let dotpos = input.lastIndexOf(".");

		if (atpos < 1 || (dotpos - atpos < 2)) {
			email.parentNode.classList.add('email-invalid');
		} else {
			if (email.parentNode.classList.contains('email-invalid')) {
				email.parentNode.classList.remove('email-invalid');
			}

			email.parentNode.classList.add('email-valid');
		}
	}

	function validatePassword() {
		console.log('password');
		let confirmValue = confirm.value;
		let passwordValue = password.value;

		if (confirmValue != passwordValue) {
			if (confirm.parentNode.classList.contains('password-valid')) {
				confirm.parentNode.classList.remove('password-valid')
			}

			confirm.parentNode.classList.add('password-invalid');
		} else {
			confirm.parentNode.classList.add('password-valid');
		}
	}
}
