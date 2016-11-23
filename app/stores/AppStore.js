import {EventEmitter} from 'events'
import _ from 'lodash'

export default _.extend({}, EventEmitter.prototype, {
	data: {
		ready: false,
		globals: {},
		pages: [],
		item_num: 5
	},

	emitChange: function() {
		this.emit('change')
	},

	addChangeListener: function (callback) {
		this.on('change', callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback)
	},
})