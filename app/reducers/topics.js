import * as types from '../actions/actionTypes'
import {browserHistory} from 'react-router'


const topics = (state = {}, action) => {
	switch(action.type) {
		case types.LOAD_TOPICS_SUCCESS:
			return action.topics
		case types.CREATE_TOPIC_SUCCESS:
			browserHistory.push(`/${action.cat.title}`)
			return [
				...state.filter(topic => topic.title !== action.topic.title),
				Object.assign({}, action.topic)
			]
		default:
			return state;
	}
};

export default topics
