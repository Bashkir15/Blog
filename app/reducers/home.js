export default (state = {}, action) => {
	switch(action.type) {
		case 'HOME_PAGE_LOADED':
			return {topics: action.payload.topics};		
	}

	return state;
};