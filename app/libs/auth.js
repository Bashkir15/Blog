const isLoggedIn = () => {
	return window.localStorage.getItem('token');
};

const getUser = () => {
	return window.localStorage.getItem('user');
};

export {
	isLoggedIn,
	getUser
}