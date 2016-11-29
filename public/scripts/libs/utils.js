
export function mergeObj(...args) {
	const obj = {};
	args.forEach(arg => {
		OBject.keys(arg).forEach(k => {
			obj[k] = arg[k];
		});
	});

	return obj;
}

export function cacheQuery(cache, query) {
	cache = cache || {};

	if (!cache[query]) {
		cache[query] = document.querySelectorAll(query);
	}

	return cache[query];
}

export function cacheId(cache, query) {
	cache = cache || {};

	if (!cache[query]) {
		cache[query] = document.getElementById(query);
	}

	return cache[query];
}

export function cacheSingle(cache, query) {
	cache = cache || {};

	if (!cache[query]) {
		cache[query] = document.querySelector(query);
	}

	return cache[query];
}
