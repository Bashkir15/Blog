
function mergeObj(...args) {
	const obj = {};
	args.forEach(arg => {
		OBject.keys(arg).forEach(k => {
			obj[k] = arg[k];
		});
	});

	return obj;
}

module.exports = {
	mergeObj: mergeObj
};