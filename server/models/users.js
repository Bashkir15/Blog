import mongoose from 'mongoose'
import escape from 'lodash.escape'
import bcrypt from 'bcrypt'

var escapeProperty = function (value) {
	return escape(value);
};

var userSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	name: {
		type: String,
		required: true,
		get: escapeProperty
	},

	username: {
		type: String,
		required: true,
		unique: true,
		get: escapeProperty
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true,
		get: escapeProperty
	},

	roles: {
		type: Array,
		default: ['authenticated']
	},

	provider: {
		type: String,
		default: 'local'
	},

	image: {
		type: String
	},

	commentScore: {
		type: Number,
		default: 0
	},

	socketId: {
		type: String,
		default: false
	},

	loggedIn: {
		type: Boolean,
		default: false
	},

	loginAttempts: {
		type: Number,
		default: 0,
		required: true
	},

	lockUntil: {
		type: Number
	},

	limitReached: {
		type: Number,
		required: true,
		default: 0
	},

	secureLock: {
		type: Boolean,
		default: false
	},

	resetPasswordToken: String,
	resetPasswordExpires: Date
});

userSchema.set('toJSON', {
	virtuals: true,
	getters: true
});

userSchema.virtual('isLocked').get(function() {
	return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
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

userSchema.methods = {
	hasRole: function(role) {
		let roles = this.roles;
		roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
	} ,

	isAdmin: function() {
		return this.roles.indexOf('admin') !== -1;
	},

	comparePassword: function (candidate, cb) {
		let user = this;

		bcrypt.compare(candidate, user.password, (err, isMatch) => {
			if (err) {
				return cb(err);
			}

			cb(null, isMatch);
		});
	},

	incorrectLoginAttempts: function(cb) {
		if (this.lockUntil && this.lockUntil < Date.now()) {
			return this.update({
				$set: {
					loginAttempts: 1,
					limitReached: 0
				},

				$unset: {lockUntil: 1}
			}, cb);
		}

		let updates = {
			$inc: {
				loginAttempts: 1
			}
		};

		if (this.loginAttempts + 1 > 5 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 2 * 60 * 60 * 1000,
				limitReached: 1
			}
		}

		if (this.loginAttempts + 1 > 5 && this.limitReached == 1 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 4 * 60 * 60 * 1000,
				limitReached: 2
			}
		}

		if (this.loginAttempts + 1 > 3 && this.limitReached == 2 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 8 * 60 * 60 * 1000,
				limitReached: 3
			}
		}

		if (this.loginAttempts + 1 > 3 && this.limitReached == 3 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 10000 * 60 * 60 * 1000,
				limitReached: 4,
				secureLock: true
			}
		}

		return this.update(updates, cb);
	},

	toJSON: function() {
		let obj = this.toObject();
		delete obj.pasword;
		return obj;
	}
};

mongoose.model('User', userSchema);