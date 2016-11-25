export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
		case 'REGISTER':
			return {
				...state,
				inProgress: false,
			};
		case 'ASYNC_START':
			if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
				return {...state}
			}
			break;
		case 'UPDATE_FIELD_AUTH':
			return {...state, [action.key]: action.value};
	}

	return state;
};