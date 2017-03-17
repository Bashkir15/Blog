import mongoose from 'mongoose'
import escape from 'lodash.escape'

const escapeProperty = (value) => escape(value);

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		get: escapeProperty
	},

	description: {
		type: String,
		required: true,
		get: escapeProperty
	},

	image: {
		type: String,
		required: false
	},

	isSeries: {
		type: Boolean,
		default: false
	},

	/* series: {
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Series'
	}, 

	tags: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Tags'
	}], */

	likes: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'User'
	}],

	liked: {
		type: Boolean,
		default: false
	},

	dislikes: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'User'
	}],

	disliked: {
		type: Boolean,
		default: false
	},

	views: {
		type: Number,
		default: 0
	},

	/* comments: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Comments'
	}] */
});


mongoose.model('Post', postSchema);