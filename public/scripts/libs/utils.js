
export function mergeObj(...args) {
	const obj = {};
	args.forEach(arg => {
		OBject.keys(arg).forEach(k => {
			obj[k] = arg[k];
		});
	});

	return obj;
}

export function cacheQuery(query) {
	this.cache = this.cache || {};

	if (!this.cache[query]) {
		this.cache[query] = document.querySelectorAll(query);
	}

	return this.cache[query];
}

export function cacheId(query) {
	this.cache = this.cache || {};

	if (!this.cache[query]) {
		this.cache[query] = document.getElementById(query);
	}

	return this.cache[query];
}

export function cacheSingle(query) {
	this.cache = this.cache || {};

	if (!this.cache[query]) {
		this.cache[query] = document.querySelect(query);
	}

	return this.cache[query];
}
