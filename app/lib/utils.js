function mergeObj(...args) {
	const obj = {};

	args.forEach(arg => {
		Object.key(arg).forEach(k => {
			obj[k] = arg[k];
		});
	});

	return obj;
}


module.exports = {
	mergeObj
};