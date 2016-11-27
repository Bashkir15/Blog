import mongoose from 'mongoose'

var SectionSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	lastUpdated: {
		type: Date,
		default: Date.now
	},

	title: {
		type: String,
		required: true,
		unique: true
	},

	description: {
		type: String,
		required: true,
		unique: true
	},

	topicTitle: {
		type: String,
		required: true
	},

	topic: {
		type: mongoose.Schema.ObjectId,
		ref: 'Topic',
		required: true
	},

	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Post',
		required: true
	}]
});

mongoose.model('Section', SectionSchema);