import mongoose from 'mongoose'
import json from '../helpers/json'

const Category = mongoose.model('Category');
const Post = mongoose.model('Post');

module.exports = () => {
	const obj = {};

	obj.home = (req, res) => {
		let data = {};

		Category.find({})
		.exec((err, categories) => {
			if (err) {
				return json.bad(err, res);
			}

			data.categories = categories;

			Post.find({})
			.exec((err, posts) => {
				if (err) {
					return json.bad(err, res);
				}

				data.posts = posts;

				let render = function() {
					res.render('index', {
						categories: data.categories,
						posts: data.posts
					});
				};

				render();
			});
		});
	};

	return obj;

};