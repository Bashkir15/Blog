import mongoose from 'mongoose';


module.exports = () => {
	let Topic = mongoose.model('Topic');
	let Section = mongoose.model('Section')
	
	let obj = {};

	obj.create = (req, res) => {
		var topic = new Topic(req.body);
		console.log(req.body);

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

			console.log(topics);

			res.render('index', {
				topics: topics
			});
		});
	};

	obj.single = (req, res) => {
		Topic.findOne({title: req.params.title}, (err, topic) => {
			if (err) {
				res.json(err);
			}

			Section.find({topicTitle: topic.title})
			.exec((err, sections) => {
				if (err) {
					res.json(err);
				}

				res.render('./templates/topics/single/single', {
					topic: topic,
					sections: sections
				});
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