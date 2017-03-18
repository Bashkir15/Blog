import mongoose from 'mongoose'
import escape from 'lodash.escape'

let escapeProperty = (value) => {
	escape(value);
};

const postSchema = new mongoose.Schema({
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
		unique: true,
	},

	description: {
		type: String,
		required: false
	},

	image: {
		type: String,
		required: false
	},

	isSeries: {
		type: Boolean,
		default: false
	},

	category: {
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Category'
	},

	/* series: {
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Series'
	}, */

	tags: {
		type: Array,
		default: []
	},

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