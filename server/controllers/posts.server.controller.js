import mongoose from 'mongoose'
import json from '../helpers/json'

const Post = mongoose.model('Post');
const Category = mongoose.model('Category');

module.exports = () => {
	const obj = {};

	obj.create = (req, res) => {
		const post = new Post(req.body);
		post.category = req.body.category;

		post.save((err) => {
			Category.findOne({_id: post.category}, (err, category) => {
				if (err) {
					return json.bad(err, res);
				}


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

	obj.single = (req, res) => {
		Post.findOne({title: req.params.title})
		.populate('category')
		.exec((err, post) => {
			if (err) {
				return json.bad(err, res);
			}

			res.render('./templates/posts/single/single', {
				post: post
			});
		});
	};


	obj.latest = (req, res) => {
		const criteria = {};

		Post.find({})
		.skip(parseInt(req.query.page) * global.config.perPage)
		.populate('category')
		.exec((err, posts) => {
			if (err) {
				return json.bad(err, res);
			} else {
				let morePages = global.config.morePages < posts.length;

				if (morePages) {
					posts.pop();
				}

				if (req.user) {
					posts.map((e) => {
						e = e.afterSave(req.user);
					});
				}

				json.good({
					records: posts,
					morePages: morePages
				}, res);
			}
		});
	};

	return obj;
};