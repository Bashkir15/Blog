import mongoose from 'mongoose'
import json from '../helpers/json'

module.exports = () => {
	var Topic = mongoose.model('Topic');
	var Section = mongoose.model('Section');

	var obj = {};

	obj.create = (req, res) => {
		console.log(req.body);
		var section = new Section(req.body);
		section.title = req.body.title;
		section.description = req.body.description;
		section.topic = req.body.topic;
		section.save((err) => {
			Topic.findOne({title: req.body.topic})
			.exec((err, topic) => {
				if (err) {
					return json.bad(err, res);
				}

				topic.sections.push(section);
				topic.save((err) => {
					if (err) {
						return json.bad(err, res);
					}
				});
			});

			json.good({
				record: section
			}, res);
		});
	};

	return obj; 
};