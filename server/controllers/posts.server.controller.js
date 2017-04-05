import mongoose from 'mongoose'
import json from '../helpers/json'

const Post = mongoose.model('Post');
const Category = mongoose.model('Category');
const Series = mongoose.model('Series');

module.exports = () => {
	const obj = {};

	obj.create = (req, res, next) => {
		let post = new Post();
		post.title = req.body.title;
		post.description = req.body.description;
		post.tags = req.body.tags;
		post.content = req.body.content;

		console.log(req.body);

		return new Promise((resolve, reject) => {
			console.log('eh');

			Category.findOne({name: req.body.category}, (err, category) => {
				if (err) {
					return json.bad(err, res);
				}

				if (category) {
					console.log(category);
					post.category = category._id;

					category.posts.push(post);
					category.save((err) => {
						if (err) {
							return json.bad(err);
						}

						resolve();
					})
				}
			})
		})
		.then(() => {
			console.log('maybe');
			if (req.body.series) {
				console.log(req.body.series)
				Series.findOne({name: req.body.series}, (err, series) => {
					if (err) {
						console.log(err);
					}

					if (series) {
						series.posts.push(post);

						series.save((err) => {
							if (err) {
								return json.bad(err, res);
							}

							post.series = series;
							post.save((err) => {
								if (err) {
									return json.bad(err, res)
								}
							});
						});
					}

					if (!series) {
						let newSeries = new Series();
						newSeries.name = req.body.series;
						newSeries.posts.push(post);

						newSeries.save((err) => {
							if (err) {
								return json.bad(err, res);
							}

							post.series = newSeries;
							post.save((err) => {
								if (err) {
									return json.bad(err, res);
								}
							});
						});
					}
					
				});
			}
		})
		.then(() => {
			json.good({
				post: post
			}, res);
		})
		.catch((err) => {
			return json.bad(err, res)
		})
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

	obj.tag = (req, res) => {
		Post.find({tags: req.params.tag})
		.skip(parseInt(req.query.page) * global.config.perPage)
		.limit(global.config.perPage + 1)
		.populate('category')
		.exec((err, posts) => {
			if (err) {
				return json.bad(err, res);
			} else {
				let morePages = global.config.perPage < posts.length;

				if (morePages) {
					posts.pop();
				}

				if (req.user) {
					posts.map((e) => {
						e = e.afterSave(req.user);
					});
				}

				res.render('./templates/posts/tags/tags', {
					posts: posts
				});
			}
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