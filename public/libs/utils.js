
export function mergeObj(...args) {
	const obj = {};
	args.forEach(arg => {
		OBject.keys(arg).forEach(k => {
			obj[k] = arg[k];
		});
	});

	return obj;
}

export function throttle(type, name, obj) {
	obj = obj || window;
	let running = false;
	let func = () => {
		if (running) {
			return;
		}

		running = true;
		requestAnimationFrame(() => {
			obj.dispatchEvent(new CustomEvent(name));
			running = false;
		});
	};

	obj.addEventListener(type, func);
}