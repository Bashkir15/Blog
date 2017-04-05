import mongoose from 'mongoose'

const seriesSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	name: {
		type: String,
		required: true
	},

	description: {
		type: String
	},

	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Post'
	}],

	lastUpdated: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Series', seriesSchema);