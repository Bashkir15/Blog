/*import {combineReducers} from 'redux'
import topics from './topics'

const blogApp = combineReducers({
	topics
})

export default blogApp */

const topics = require('./topics');

module.exports = {
	topics
};