
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


export function debounce(func, wait, immediate) {
	let timeout;

	return function() {
		var args = arguments;
		var context = this;
		var later = function() {
			timeout = null;

			if (!immediate) {
				func.apply(context, args);
			}
		};

		var callNow = immediate && !timeout;
		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args)
		}
	}
}