import * as types from './actionTypes'
import topicsApi from '../api/topics'

export function loadTopicsSuccess(topics) {
	return {type: types.LOAD_TOPICS_SUCCESS, topics};
}


export function createTopicSuccess(topic) {
	return {type: types.CREATE_TOPIC_SUCCESS, topic};
}

export function loadTopics() {
	return function(dispatch) {
		return topicsApi.getAllTopics().then(topics => {
			dispatch(loadTopicsSuccess(topics));
		}).catch(error => {
			throw(error);
		})
	}
}

export function createTopic(topic) {
	return function (dispatch) {
		return topicsApi.createTopic(topic).then(responseTopic => {
			dispatch(createTopicSuccess(responseTopic));
			return responseTopic;
		}).catch(error => {
			throw(error);
		});
	};
}