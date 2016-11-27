import mongoose from 'mongoose';

var Section = mongoose.model('Section');
var Topic = mongoose.model('Topic');

module.exports = () => {
	let obj = {};

	obj.getCreate = (req, res) => {
		Topic.findOne({title: req.params.title})
		.exec((err, topic) => {
			if (err) {
				res.json(err);
			}

			res.render('./templates/sections/create/create', {
				topic: topic
			});
		});
	};

	obj.create = (req, res) => {
		let section = new Section(req.body);
		section.topic = req.body.topic;

		console.log(req.body);

		section.save((err) => {
			Topic.findOne({_id: req.body.topic}, (err, topic) => {
				if (err) {
					res.json(err);
				}

				topic.sections.push(section);
				topic.save((err) => {
					if (err) {
						res.json(err);
					}
				});
			});

			res.json(section);
		});
	};

	obj.createPost = (req, res) => {
		Section.findOne({title: req.params.title})
		.populate('topic')
		.exec((err, section) => {
			if (err) {
				res.json(err);
			}

			res.render('./templates/posts/editor/editor', {
				section: section
			});
		});
	};
	
	return obj;
};