class authApi {
	static createUser(user) {
		const request = new Request('http://localhost:3000/users', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),

			body: JSON.stringify({user: user})
		});

		return fetch(request).then(response => {
			return response.json();
		}).catch(error => {
			return error;
		});
	}
}

export default authApi