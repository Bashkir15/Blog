import mongoose from 'mongoose';
import async from 'async'

module.exports = () => {
	const Topic = mongoose.model('Topic');
	const Section = mongoose.model('Section')
	
	let obj = {};

	obj.create = (req, res) => {
		let topic = new Topic(req.body);

		topic.save((err) => {
			if (err) {
				res.json(err);
			}

			res.json(topic);
		});
	};

	obj.list = (req, res) => {
		Topic.find({})
		.exec((err, topics) => {
			if (err) {
				res.json(err);
			}

			res.render('index', {
				topics: topics
			});
		});
	};

	obj.single = (req, res) => {
		let data = {};

		async.series([
			function(callback) {
				Topic.findOne({title: req.params.title}, (err, topic) => {
					if (err) {
						return callback(err);
					}
					
					if (topic) {
						data.topic = topic;
						callback();
					}
				});
			},

			function(callback) {
				Section.find({topic: data.topic})
				.populate('posts')
				.exec((err, sections) => {
					if (err) {
						return callback(err);
					}

					data.sections = sections;
					callback();
				});
			}
		], function(err) {
			if (err) {
				return next(err);
			}

			res.render('./templates/topics/single/single', {
				topic: data.topic,
				sections: data.sections
			});
		}); 
	};

	obj.createSection = (req, res) => {
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

	return obj;
};