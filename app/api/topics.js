class topicsApi {

	static getAllTopics() {
		const request = new Request('http://localhost:3000/topics', {
			method: 'GET'
		});

		return fetch(request).then(response => {
			return response.json();
		}).catach(error => {
			return error;
		});
	}

	static createTopic (topic) {
		const request = new Request('http://localhost:3000/topics', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),

			body: JSON.stringify({topic: topic})
		});

		return fetch(request).then(response => {
			return response.json();
		}).catch(error => {
			return error;
		});
	}
}

export default topicsApi