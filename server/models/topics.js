import mongoose from 'mongoose'

var TopicSchema = new mongoose.Schema({
	created: {
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

	icon: {
		type: String,
		required: true
	},

	sections: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Section',
		required: true,
		unique: true
	}]
});

mongoose.model('Topic', TopicSchema);