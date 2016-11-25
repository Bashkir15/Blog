import mongoose from 'mongoose'
import json from '../helpers/json'
import jwt from 'jsonwebtoken'

function generateToken(obj) {
	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 2);

	return jwt.sign({
		user: obj,
		exp: parseInt(exp.getTime() / 1000)
	}, global.config.secret);
}

module.exports = () => {
	var User = mongoose.model('User');

	var obj = {};

	obj.create = (req, res) => {
		var user = new User(req.body.user);
		var token = generateToken(user);
		user.save((err) => {
			if (err) {
				return json.bad(err, res);
			}

			console.log(user);
			
			json.good({
				record: user,
				token: token
			}, res);
		});
	};

	return obj;
};