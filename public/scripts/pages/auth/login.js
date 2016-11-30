import axios from 'axios'
import { cacheId } from '../../libs/utils'

export function login() {
	var cache = cache || {};

	let submitButton = cacheId(cache, 'login-submit');

	function submit() {
		submitButton.classList.add('show-loading');

		let data = {};
		data.email = cacheId(cache, 'login-email');
		data.password = cacheId(cache, 'login-password');

		axios.post('http://localhost:3000/users', {
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
				// show login notify
				let user = JSON.stringify(response.data.res.record);
				window.localStorage.setItem('user', user);
				window.localStorage.setItem('blog-token', response.data.res.token);
				submitButton.removeEventListener('click', submit);
				window.location.href = '/';
			} else {
				submitButton.classList.add('loading-failed');
				// show error notify
			}
		}); 
	}
}