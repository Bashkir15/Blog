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

	content: {
		type: String,
		required: true
	},

	category: {
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Category'
	},

	 series: {
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Series'
	}, 

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

postSchema.methods = {
	toJSON: function() {
		var obj = this.toObject();

		if (obj.creator) {
			obj.creator.password = '';
		}

		if (obj.likes || obj.dislikes) {
			obj.score = obj.likes.length - obj.dislikes.length;
		}

		return obj;
	},

	afterSave(user) {
		this.liked = this.likes.includes(user._id);
		this.disliked = this.dislikes.includes(user._id);
		this.saved = this.saves.includes(user._id);

		return this;
	}
}

mongoose.model('Post', postSchema);