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

	obj.authenticate = (req, res) => {
		User.findOne({email: req.body.email}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			if (user.secureLock) {
				return json.bad({message: 'Sorry, due to number of incorrect attempts you have been locked out of your account'}, res);
			}

			user.comparePassword(req.body.password, user.password, (err, isMatch) => {
				if (err) {
					return json.bad(err, res);
				}

				if (isMatch) {
					// handle updates to loginAttempts, lock, secureLock, and set those updates before issuing token.

					let token = generateToken(user);

					json.good({
						record: user,
						token: token
					}, res);
				}
			});
		});
	};

	return obj;
};