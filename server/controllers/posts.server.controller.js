import mongoose from 'mongoose'

module.exports = () => {
	let obj = {};
	let Section = mongoose.model('Section');
	let Post = mongoose.model('Post');

	obj.create = (req, res) => {
		var post = new Post(req.body);
		post.section = req.body.section;

		console.log(req.body);
		
		post.save((err) => {
			Section.findOne({_id: post.section}, (err, section) => {
				if (err) {
					res.json(err);
				}

				section.posts.push(post);
				section.save((err) => {
					if (err) {
						res.json(err);
					}
				});
			});

			res.json(post);
		});
	};

	obj.single = (req, res) => {
		Post.findOne({title: req.params.title})
		.populate('section')
		.exec((err, post) => {
			if (err) {
				res.json(err);
			}

			if (post) {

				res.render('./templates/posts/single/post', {
					post: post
				});
			}
		});
	};

	obj.latest = (req, res) => {
		Post.find({}, null, {sort: {created: -1}})
		.populate('section')
		.exec((err, posts) => {
			if (err) {
				res.json(err);
			}
			res.render('./templates/posts/latest/latest', {
				posts: posts
			});
		});
	};

	return obj;
};