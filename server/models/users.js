import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var UserSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	name: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return json.bad(err, res);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods = {
	comparePassword: function (candidatePassword, cb) {
		var user = this;

		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return cb(err);
			}

			cb(null, isMatch);
		});
	},

	toJSON: function() {
		var obj = this.toObject();
		delete obj.password;
		return obj;
	}
}

mongoose.model('User', UserSchema);