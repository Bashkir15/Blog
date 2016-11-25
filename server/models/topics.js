import mongoose from 'mongoose';

var TopicsSchema = new mongoose.Schema({
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

	icon: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	},

	sections: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Section',
		required: false
	}]
});

mongoose.model('Topic', TopicsSchema);