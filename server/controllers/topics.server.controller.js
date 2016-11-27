import mongoose from 'mongoose';


module.exports = () => {
	var Topic = mongoose.model('Topic');
	
	let obj = {};

	obj.create = (req, res) => {
		var topic = new Topic(req.body);
		console.log(req.body);

		topic.save((err) => {
			if (err) {
				res.json(err);
			}
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
		Topic.findOne({title: req.params.title})
		.exec((err, topic) => {
			if (err) {
				res.json(err);
			}

			res.render('./templates/topics/single/single', {
				topic: topic
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