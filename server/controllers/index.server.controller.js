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
				} else {
					let postTags = [];

					data.posts = posts;

					for (let i = 0; i < posts.length; i++) {
						postTags = postTags.concat(posts[i].tags);
					}

					let uniqueTags = [...new Set(postTags)];

					let render = function() {
						console.log(uniqueTags);

						res.render('index', {
							categories: data.categories,
							posts: data.posts
						});
					};

					render();
				}
			});
		});
	};

	return obj;

};