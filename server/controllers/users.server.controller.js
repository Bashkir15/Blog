import mongoose from 'mongoose'
import json from '../helpers/json'
import { generateToken } from '../helpers/auth'


let User = mongoose.model('User');

module.exports = () => {
	let obj = {};

	obj.create = (req, res) => {
		let roles = ['authenticated'];

		User.count({}, (err, len) => {
			if (!len) {
				roles.push('admin');
			}

			let user = new User(req.body);
			user.provider = 'local';
			user.roles = roles;

			let token = generateToken(user);

			user.save((err) => {
				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: user,
					token: token
				}, res);
			});
		});
	};

	return obj;
};