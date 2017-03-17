import mongoose from 'mongoose'
import escape from 'lodash.escape'

const escapeProperty = (value) => escape(value);

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		get: escapeProperty
	},

	image: {
		type: String,
		default: '',
		required: false
	},

	posts: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Post'
	}],

	/* series: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Series'
	}], */

	subscribers: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'User'
	}],

	subscribed: {
		type: Boolean,
		default: false
	}
});

categorySchema.methods = {
	afterSave: (user) => {
		if (this.subscribers.includes(user._id)) this.subscribed = true;
	}
};

mongoose.model('Category', categorySchema);