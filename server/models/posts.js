import mongoose from 'mongoose'
import escape from 'lodash.escape'

var escapeProperty = (value) => {
	escape(value);
};

var PostsSchema = new mongoose.Schema({
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
	},

	content: {
		type: String,
		required: true,
	},

	sectionTitle: {
		type: String,
		required: true
	},

	section: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Section'
	}
});

PostsSchema.pre('remove', (next) => {
	this.model('Section').update({posts: this._id}, {$pull: {posts: {$in: [this._id]}}}, next);
});

mongoose.model('Post', PostsSchema);