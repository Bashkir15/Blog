const {mergeObj} = require('../lib/utils');

export default (state = [], action) => {
	switch (action.type) {
		case 'CREATE_TOPIC':
			return [
				...state,
				Object.assign({}, action.book)
			];
		default:
			return state;
	}
}