export default (state = [], action) => {
	switch (action.type) {
		case 'CREATE_TOPIC':
			state.push(action.topic);
		default:
			return state;
	}
}