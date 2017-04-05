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

				user.password = '';			

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

			if (user.isLocked) {
				return user.incorrectLoginAttempts((err) => {
					if (err) {
						return json.bad(err, res);
					}

					json.bad({message: `Sorry, you have reached the maximum number of logins. Your account is locked until: ${user.lockUntil}`}, res);
				});
			}

			if (user.secureLock) {
				return json.bad({message: 'Sorry, due to number of incorrect attempts you have been locked out of your account'}, res);
			}

			user.comparePassword(req.body.password, (err, isMatch) => {
				if (err) {
					return json.bad(err, res);
				}

				if (isMatch) {
					if (!user.loginAttempts && !user.lockUntil && !user.secureLock) {
						let token = generateToken(user);

						user.password = '';

						json.good({
							record: user,
							token: token
						}, res);
					} else {

						let updates = {
							$set: {
								loginAttempts: 0,
								limitReached: 0
							},

							$unset: {
								lockUntil: 1
							}
						};

						return user.update(updates, (err, item) => {
							if (err) {
								return json.bad(err, res);
							}

							let token = generateToken(user);

							user.token = '';
							
							json.good({
								record: user,
								token: token
							}, res);
						});
					}
				} else {

					user.incorrectLoginAttempts((err) => {
						let totalAttempts;

						if (err) {
							return json.bad(err, res);
						}

						if (User.limitReached >= 2) {
							totalAttempts = 3;
						} else {
							totalAttempts = 5
						}

						json.bad({message: `Sorry, either your email or password were incorrect. You have ${totalAttempts - user.loginAttempts} remaining until your account is locked`}, res);
					});
				}
			});
		});
	};

	return obj;
};