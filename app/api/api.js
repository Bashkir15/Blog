import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000';

const requests = {
	get: url => 
		superagent.get(`${API_ROOT}${url}`).then(response => {
			console.log(response);
		}),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).then(response => {
			console.log(response);
		})
};

const Auth = {
	current: () => 
		request.get('/user'),
	login: (email, password) => 
		requests.post('/users/login', {user: {email, password}}),
	register: (name, email, password) => 
		requests.post('/users', {user: {name, email, password}})
};

export default {
	Auth
};

