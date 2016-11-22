export const createTopic = (topic) => {
	return {
		type: 'CREATE_TOPIC',	
		topic: topic
	}
}