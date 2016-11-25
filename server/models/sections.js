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
		required: true
	},

	description: {
		type: String,
		required: true
	},

	topic: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Topic'
	}
});

mongoose.model('Section', SectionSchema);