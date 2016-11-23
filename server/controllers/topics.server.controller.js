import mongoose from 'mongoose';
import json from '../helpers/json'


module.exports = () => {
	var Topic = mongoose.model('Topic');

	var obj = {};

	obj.create = (req, res) => {
		var topic = new Topic(req.body);
		topic.title = req.body.topic.title;
		topic.icon = req.body.topic.icon;
		topic.description = req.body.topic.description;

		console.log(topic);
		topic.save((err) => {
			if (err) {
				return json.bad(err, res);
			}

			json.good({
				record: topic
			}, res);
		});
	};

	return obj;
};