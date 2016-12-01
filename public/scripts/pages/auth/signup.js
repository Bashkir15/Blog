import axios from 'axios'
import { cacheId } from '../../libs/utils'
import notify from '../../components/notifications'

export function signup() {
	var cache = {};

	let submitButton = cacheId(cache, 'signup-submit');
	let email = cacheId(cache, 'signup-email');
	let confirm = cacheId(cache, 'signup-confirm');
	let password = cacheId(cache, 'signup-password');
	let successContent = cacheId(cache, 'success-content');
	let failureContent = cacheId(cache, 'failure-content');


	let successNotify = new notify({
		timeout: 1500,
		content: successContent,
		type: 'success'
	});

	let failureNotify = new notify({
		timeout: 1500,
		content: failureContent,
		type: 'danger'
	}); 

	function validateEmail() {
		let input = email.value;
		let atpos = input.indexOf('@');
		let dotpos = input.lastIndexOf(".");

		if (atpos < 1 || (dotpos - atpos < 2)) {
			if (email.parentNode.classList.contains('email-valid')) {
				email.parentNode.classList.remove('email-valid');
			}

			email.parentNode.classList.add('email-invalid');
		} else {
			if (email.parentNode.classList.contains('email-invalid')) {
				email.parentNode.classList.remove('email-invalid');
			}

			email.parentNode.classList.add('email-valid');
		}
	}

	function validatePassword() {
		let confirmValue = confirm.value;
		let passwordValue = password.value;

		if (confirmValue != passwordValue) {
			if (confirm.parentNode.classList.contains('password-valid')) {
				confirm.parentNode.classList.remove('password-valid')
			}

			confirm.parentNode.classList.add('password-invalid');
		} else {
			if (confirm.parentNode.classList.contains('password-invalid')) {
				confirm.parentNode.classList.remove('password-invalid');
			}

			confirm.parentNode.classList.add('password-valid');
		}
	}


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
				var success = new Event('signed-up');
				window.dispatchEvent(success);
				removeEvents();
				window.localStorage.setItem('user', user);
				window.localStorage.setItem('blog-token', response.data.res.token);
				
				setTimeout(() => {
					window.location.href = '/'
				}, 500);					

			} else {
				submitButton.classList.add('submit-failed');
				var failure = new Event('signup-fail');
				window.dispatchEvent(failure);
			}
		})			
	} 

	function removeEvents() {
		submitButton.removeEventListener('click', submit);
		email.removeEventListener('blur', validateEmail);
		email.removeEventListener('blur', validatePassword);
	} 

	email.addEventListener('blur', validateEmail);
	confirm.addEventListener('blur', validatePassword);
	submitButton.addEventListener('click', submit);
	window.addEventListener('signed-up', successNotify.open);
	window.addEventListener('signup-fail', failureNotify.open); 
}
