import mongoose from 'mongoose'
import json from '../helpers/json'

const Category = mongoose.model('Category');

module.exports = () => {
	const obj = {};

	obj.home = (req, res) => {
		Category.find({})
		.exec((err, categories) => {
			if (err) {
				return json.bad(err, res);
			}

			res.render('index', {
				categories: categories
			});
		});
	};

	return obj;

};