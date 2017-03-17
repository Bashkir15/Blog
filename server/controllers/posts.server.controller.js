import mongoose from 'mongoose'
import json from '../helpers/json'

const Post = mongoose.model('Post');
const Category = mongoose.model('Category');

module.exports = () => {
	const obj = {};

	obj.create = (req, res) => {
		const post = new Post(req.body);
		post.category = req.body.category;

		console.log(post);

		post.save((err) => {
			Category.findOne({_id: post.category}, (err, category) => {
				if (err) {
					return json.bad(err, res);
				}

				console.log(post);

				category.posts.push(post);
				category.save((err) => {
					if (err) {
						return json.bad(err, res);
					}

					json.good({
						post: post
					}, res);
				});
			});
		});
	};

	return obj;
};