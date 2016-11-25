import {loggedIn, getUser } from '../libs/auth' 


const defaultState = {
	appName: 'blog',
	isLoggedIn: null,
	currentUser: null
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'APP_LOAD':
			return {
				...state,
				currentUser: action.user,
				appLoaded: true,
			};
		case 'LOGIN':
		case 'REGISTER':
			return {
				...state,
				redirectTo: action.error ? null : '/',
				loggedIn: action.user.res.token ? action.user.res.token : null
			};
	}

	return state;
};