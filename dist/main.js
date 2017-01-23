/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(1);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	var _navShrink = __webpack_require__(2);

	var _navShrink2 = _interopRequireDefault(_navShrink);

	var _topics = __webpack_require__(4);

	var _topics2 = _interopRequireDefault(_topics);

	var _sections = __webpack_require__(32);

	var _posts = __webpack_require__(35);

	var _auth = __webpack_require__(41);

	var _auth2 = __webpack_require__(45);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function start() {
		var SidenavTrigger = document.getElementById('side-nav-trigger');
		var Sidenav = new _sidenav2.default();

		(0, _auth2.checkLinks)();
		(0, _navShrink2.default)();
		(0, _auth.auth)();
		(0, _topics2.default)();
		(0, _sections.sections)();
		(0, _posts.posts)();

		if (window.innerWidth || document.documentElement.clientWidth < 1300) {
			SidenavTrigger.addEventListener('click', Sidenav.toggleSidenav);
		}
	}

	HTMLDocument.prototype.ready = function () {
		return new Promise(function (resolve, reject) {
			var startTime = new Date().getTime();
			var endTime;

			if (document.readyState === 'complete') {
				endTime = new Date().getTime();
				resolve(document, startTime, endTime);
			} else {
				document.addEventListener('DOMContentLoaded', function () {
					endTime = new Date().getTime();
					resolve(document, startTime, endTime);
				});
			}
		});
	};

	document.ready().then(function (startTime, endTime) {
		if (endTime - startTime > 300) {
			document.body.classList.add('loaded');
			start();
		} else {
			setTimeout(function () {
				document.body.classList.add('loaded');
				start();
			}, 1000);
		}
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SideNav = function () {
		function SideNav() {
			_classCallCheck(this, SideNav);

			this.container = document.getElementById('side-nav-container');
			this.sidenav = document.getElementById('side-nav');
			this.closeButton = document.getElementById('side-nav-close');
			this.animatedClass = 'side-nav-container--animatable';
			this.openClass = 'side-nav-container--open';
			this.closeKeys = [27];

			this.toggleSidenav = this._toggle.bind(this);
			this.closeSidenav = this._close.bind(this);
		}

		_createClass(SideNav, [{
			key: '_toggle',
			value: function _toggle() {
				this.sidenav.style.willChange = 'transform';
				this.container.classList.add(this.animatedClass);

				var onCloseKey = this._closeKeyHandler.bind(this);

				if (this.container.classList.contains(this.animatedClass) && !this.container.classList.contains(this.openClass)) {
					this._addEvents();
					this.container.classList.add(this.openClass);
					this.closeButton.addEventListener('click', this.toggleSidenav);
					document.addEventListener('keydown', onCloseKey);
				} else {
					this.closeSidenav();
				}

				this.sidenav.style.willChange = 'auto';
			}
		}, {
			key: '_close',
			value: function _close() {
				this.sidenav.style.willChange = 'transform';
				this.container.classList.add(this.animatedClass);

				this._addEvents();
				this.container.classList.remove(this.openClass);
				this.closeButton.removeEventListener('click', this.toggleSidenav);
				document.removeEventListener('keydown');
			}
		}, {
			key: '_closeKeyHandler',
			value: function _closeKeyHandler(e) {
				if (this.closeKeys.indexOf(e.which) != -1) {
					e.preventDefault();
					this.closeSidenav();
				}
			}
		}, {
			key: '_onTransitionEnd',
			value: function _onTransitionEnd() {
				this.container.classList.remove(this.animatedClass);
			}
		}, {
			key: '_addEvents',
			value: function _addEvents() {
				var _onTransitionEnd = this._onTransitionEnd.bind(this);

				this.container.addEventListener('transitionend', _onTransitionEnd);
			}
		}]);

		return SideNav;
	}();

	exports.default = SideNav;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utils = __webpack_require__(3);

	function navShrink() {
		var cache = {};

		var lastKnownScrollY = 0;
		var nav = (0, _utils.cacheSingle)(cache, '.nav');
		var scrollContainer = (0, _utils.cacheSingle)(cache, '.index-page-view-content');
		var scrollTimeout = false;

		init();

		function getScrollY() {
			return scrollContainer.pageYOffset || scrollContainer.scrollTop;
		}

		function init() {
			scrollContainer.addEventListener('scroll', scrollThrottle);
		}

		function scrollThrottle() {
			if (!scrollTimeout) {
				window.requestAnimationFrame(function () {
					checkPin();
					scrollTimeout = false;
				});
			}

			scrollTimeout = true;
		}

		function checkPin() {
			var currentScrollY = getScrollY();

			if (currentScrollY < lastKnownScrollY) {
				pin();
			}

			if (currentScrollY > lastKnownScrollY) {
				unpin();
			}

			lastKnownScrollY = getScrollY();
		}

		function pin() {
			nav.style.willChange = "transform";

			if (nav.classList.contains('nav-unpinned')) {
				nav.classList.remove('nav-unpinned');
				nav.classList.add('nav-pinned');
			} else {
				nav.classList.add('nav-pinned');
			}

			nav.style.willChange = "auto";
		}

		function unpin() {
			nav.style.willChange = "transform";

			if (nav.classList.contains('nav-pinned')) {
				nav.classList.remove('nav-pinned');
				nav.classList.add('nav-unpinned');
			} else {
				nav.classList.add('nav-unpinned');
			}

			nav.style.willChange = "auto";
		}
	}

	exports.default = navShrink;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mergeObj = mergeObj;
	exports.cacheQuery = cacheQuery;
	exports.cacheId = cacheId;
	exports.cacheSingle = cacheSingle;
	function mergeObj() {
		var obj = {};

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		args.forEach(function (arg) {
			OBject.keys(arg).forEach(function (k) {
				obj[k] = arg[k];
			});
		});

		return obj;
	}

	function cacheQuery(cache, query) {
		cache = cache || {};

		if (!cache[query]) {
			cache[query] = document.querySelectorAll(query);
		}

		return cache[query];
	}

	function cacheId(cache, query) {
		cache = cache || {};

		if (!cache[query]) {
			cache[query] = document.getElementById(query);
		}

		return cache[query];
	}

	function cacheSingle(cache, query) {
		cache = cache || {};

		if (!cache[query]) {
			cache[query] = document.querySelector(query);
		}

		return cache[query];
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _create = __webpack_require__(5);

	function topics() {
		if (window.location.href.indexOf('create-topic') != -1) {
			(0, _create.create)();
		}
	}

	exports.default = topics;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.create = create;

	var _axios = __webpack_require__(6);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function create() {

		var submitButton = document.getElementById('topic-submit');

		function submit() {
			var data = {};

			submitButton.classList.add('show-loading');

			data.title = document.getElementById('topic-title').value;
			data.icon = document.getElementById('topic-icon').value;
			data.description = document.getElementById('topic-description').value;

			_axios2.default.post('http://localhost:3000/topics', {
				title: data.title,
				icon: data.icon,
				description: data.description,

				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				submitButton.classList.remove('show-loading');
				submitButton.classList.add('loading-finished');
			}).then(function () {
				submitButton.removeEventListener('click', submit);
				window.location.href = '/';
			});
		}

		submitButton.addEventListener('click', submit);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);
	var bind = __webpack_require__(9);
	var Axios = __webpack_require__(10);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance();

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return createInstance(defaultConfig);
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(29);
	axios.CancelToken = __webpack_require__(30);
	axios.isCancel = __webpack_require__(26);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(31);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(9);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(11);
	var utils = __webpack_require__(8);
	var InterceptorManager = __webpack_require__(23);
	var dispatchRequest = __webpack_require__(24);
	var isAbsoluteURL = __webpack_require__(27);
	var combineURLs = __webpack_require__(28);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 */
	function Axios(defaultConfig) {
	  this.defaults = utils.merge(defaults, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(8);
	var normalizeHeaderName = __webpack_require__(13);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(14);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(14);
	  }
	  return adapter;
	}

	module.exports = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(8);
	var settle = __webpack_require__(15);
	var buildURL = __webpack_require__(18);
	var parseHeaders = __webpack_require__(19);
	var isURLSameOrigin = __webpack_require__(20);
	var createError = __webpack_require__(16);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(21);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(22);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(16);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(17);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);
	var transformData = __webpack_require__(25);
	var isCancel = __webpack_require__(26);
	var defaults = __webpack_require__(11);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(8);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(29);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sections = sections;

	var _create = __webpack_require__(33);

	var _single = __webpack_require__(34);

	function sections() {
		if (window.location.href.indexOf('create-section') != -1) {
			(0, _create.create)();
		} else {
			(0, _single.single)();
		}
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.create = create;

	var _axios = __webpack_require__(6);

	var _axios2 = _interopRequireDefault(_axios);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function create() {
		var cache = {};

		var submitButton = (0, _utils.cacheId)(cache, 'section-submit');

		function submit() {
			var data = {};
			data.topic = (0, _utils.cacheId)(cache, 'section-topic-id');
			data.topicTitle = (0, _utils.cacheId)(cache, 'section-topic');
			data.title = (0, _utils.cacheId)(cache, 'section-title');
			data.description = (0, _utils.cacheId)(cache, 'section-description');

			submitButton.classList.add('show-loading');

			_axios2.default.post('http://localhost:3000/sections', {
				topic: data.topic.value,
				topicTitle: data.topicTitle.value,
				title: data.title.value,
				description: data.description.value,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				submitButton.classList.remove('show-loading');
				submitButton.classList.add('loading-finished');
			}).then(function () {
				submitButton.removeEventListener('click', submit);
				window.location.href = '/' + data.topicTitle;
			});
		}

		submitButton.addEventListener('click', submit);
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.single = single;

	var _utils = __webpack_require__(3);

	function single() {
		var accordians = document.querySelectorAll('.single-section-posts');
		var sectionTitles = document.querySelectorAll('.single-section-title');
		var postTitles = document.querySelectorAll('.single-post-title');

		function makeAccordian(accordian) {
			//accordian = accordian || document.querySelectorAll('.single-section-posts');
			var toggleButton = document.querySelectorAll('.close-section-button');
			var currentTarget = void 0;

			var _loop = function _loop() {
				var target = toggleButton[i];

				target.addEventListener('click', function () {
					currentTarget = this.parentNode;

					if (target.classList.contains('section-closed')) {
						target.classList.remove('section-closed');
						currentTarget.classList.remove('closed');
					} else {
						target.classList.add('section-closed');
						currentTarget.classList.add('closed');
					}
				}, false);
			};

			for (var i = 0; i < toggleButton.length; i++) {
				_loop();
			}
		}

		for (var i = 0; i < accordians.length; i++) {
			makeAccordian(accordians[i]);
		}

		for (var i = 0; i < sectionTitles.length; i++) {
			fixTitles(sectionTitles[i]);
		}

		for (var i = 0; i < postTitles.length; i++) {
			fixPost(postTitles[i]);
		}

		function fixTitles(title) {
			title.textContent = title.textContent.split("-").join(" ");
		}

		function fixPost(title) {
			title.textContent = title.textContent.split("-").join(" ");
		}

		/*init() {
	 	for (var i = 0; i < accordians.length; i++) {
	 		makeAccordian(accordians[i]);
	 	}
	 	//	for (var i = 0; i < titles.length; i++) {
	 //		fixTitles(title);
	 //	}
	 	} */

		//makeAccordian();
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.posts = posts;

	var _editor = __webpack_require__(36);

	var _single = __webpack_require__(39);

	var _latest = __webpack_require__(40);

	function posts() {
		var matches = window.location.pathname.split('/');
		if (window.location.href.indexOf('create-post') != -1) {
			(0, _editor.editor)();
		} else if (window.location.href.indexOf('latest') != -1) {
			(0, _latest.latest)();
		} else if (matches.length == 4) {
			(0, _single.single)();
		}
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.editor = editor;

	var _showdown = __webpack_require__(37);

	var _showdown2 = _interopRequireDefault(_showdown);

	var _axios = __webpack_require__(6);

	var _axios2 = _interopRequireDefault(_axios);

	var _jsParser = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function editor() {
		var converter = new _showdown2.default.Converter();
		var pad = document.getElementById('pad');
		var markdownSection = document.getElementById('markdown-section');
		var submitButton = document.getElementById('submit-post');
		var postTitle = document.getElementById('post-title');
		var sectionTitle = document.getElementById('post-section-title');
		var topicTitle = document.getElementById('post-topic-section');
		var section = document.getElementById('post-section');
		var codeElement = documet.querySelectorAll('.js-markup');

		function convertTextToMarkdown() {
			var markdownText = pad.value.split("\t").join("#").split('\n').join("~");
			markdownSection.innerHTML = markdownText;

			Array.prototype.forEach.call(codeElement, function (element) {
				element.innerHTML = (0, _jsParser.renderJs)(element);
			});

			markdownSection.innerHTML = markdownSection.innerHTML.split("~").join("<br />").split("#").join("<span class='indent'></span>");
		}

		function submit() {
			var data = {};
			data.title = postTitle.value;
			data.sectionTitle = sectionTitle.value;
			data.topicTitle = topicTitle.value;
			data.section = section.value;
			data.content = pad.value.split("\t").join("#").split('\n').join("~");
			_axios2.default.post('http://localhost:3000/posts', {
				title: data.title,
				section: data.section,
				sectionTitle: data.sectionTitle,
				content: data.content,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				window.location.href = '/' + data.topicTitle;
			});
		}

		pad.addEventListener('input', convertTextToMarkdown);
		pad.addEventListener('keydown', function (e) {

			if (e.which == 9) {
				e.preventDefault();
				var s = pad.selectionStart;
				pad.value = pad.value.substring(0, pad.selectionStart) + "\t" + pad.value.substring(pad.selectionEnd);
				pad.selectionEnd = s + 1;
			}
		});
		submitButton.addEventListener('click', submit);
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;/*! showdown 11-11-2016 */
	(function(){
	/**
	 * Created by Tivie on 13-07-2015.
	 */

	function getDefaultOpts(simple) {
	  'use strict';

	  var defaultOptions = {
	    omitExtraWLInCodeBlocks: {
	      defaultValue: false,
	      describe: 'Omit the default extra whiteline added to code blocks',
	      type: 'boolean'
	    },
	    noHeaderId: {
	      defaultValue: false,
	      describe: 'Turn on/off generated header id',
	      type: 'boolean'
	    },
	    prefixHeaderId: {
	      defaultValue: false,
	      describe: 'Specify a prefix to generated header ids',
	      type: 'string'
	    },
	    headerLevelStart: {
	      defaultValue: false,
	      describe: 'The header blocks level start',
	      type: 'integer'
	    },
	    parseImgDimensions: {
	      defaultValue: false,
	      describe: 'Turn on/off image dimension parsing',
	      type: 'boolean'
	    },
	    simplifiedAutoLink: {
	      defaultValue: false,
	      describe: 'Turn on/off GFM autolink style',
	      type: 'boolean'
	    },
	    literalMidWordUnderscores: {
	      defaultValue: false,
	      describe: 'Parse midword underscores as literal underscores',
	      type: 'boolean'
	    },
	    strikethrough: {
	      defaultValue: false,
	      describe: 'Turn on/off strikethrough support',
	      type: 'boolean'
	    },
	    tables: {
	      defaultValue: false,
	      describe: 'Turn on/off tables support',
	      type: 'boolean'
	    },
	    tablesHeaderId: {
	      defaultValue: false,
	      describe: 'Add an id to table headers',
	      type: 'boolean'
	    },
	    ghCodeBlocks: {
	      defaultValue: true,
	      describe: 'Turn on/off GFM fenced code blocks support',
	      type: 'boolean'
	    },
	    tasklists: {
	      defaultValue: false,
	      describe: 'Turn on/off GFM tasklist support',
	      type: 'boolean'
	    },
	    smoothLivePreview: {
	      defaultValue: false,
	      describe: 'Prevents weird effects in live previews due to incomplete input',
	      type: 'boolean'
	    },
	    smartIndentationFix: {
	      defaultValue: false,
	      description: 'Tries to smartly fix indentation in es6 strings',
	      type: 'boolean'
	    },
	    disableForced4SpacesIndentedSublists: {
	      defaultValue: false,
	      description: 'Disables the requirement of indenting nested sublists by 4 spaces',
	      type: 'boolean'
	    }
	  };
	  if (simple === false) {
	    return JSON.parse(JSON.stringify(defaultOptions));
	  }
	  var ret = {};
	  for (var opt in defaultOptions) {
	    if (defaultOptions.hasOwnProperty(opt)) {
	      ret[opt] = defaultOptions[opt].defaultValue;
	    }
	  }
	  return ret;
	}

	/**
	 * Created by Tivie on 06-01-2015.
	 */

	// Private properties
	var showdown = {},
	    parsers = {},
	    extensions = {},
	    globalOptions = getDefaultOpts(true),
	    flavor = {
	      github: {
	        omitExtraWLInCodeBlocks:              true,
	        prefixHeaderId:                       'user-content-',
	        simplifiedAutoLink:                   true,
	        literalMidWordUnderscores:            true,
	        strikethrough:                        true,
	        tables:                               true,
	        tablesHeaderId:                       true,
	        ghCodeBlocks:                         true,
	        tasklists:                            true,
	        disableForced4SpacesIndentedSublists: true
	      },
	      vanilla: getDefaultOpts(true)
	    };

	/**
	 * helper namespace
	 * @type {{}}
	 */
	showdown.helper = {};

	/**
	 * TODO LEGACY SUPPORT CODE
	 * @type {{}}
	 */
	showdown.extensions = {};

	/**
	 * Set a global option
	 * @static
	 * @param {string} key
	 * @param {*} value
	 * @returns {showdown}
	 */
	showdown.setOption = function (key, value) {
	  'use strict';
	  globalOptions[key] = value;
	  return this;
	};

	/**
	 * Get a global option
	 * @static
	 * @param {string} key
	 * @returns {*}
	 */
	showdown.getOption = function (key) {
	  'use strict';
	  return globalOptions[key];
	};

	/**
	 * Get the global options
	 * @static
	 * @returns {{}}
	 */
	showdown.getOptions = function () {
	  'use strict';
	  return globalOptions;
	};

	/**
	 * Reset global options to the default values
	 * @static
	 */
	showdown.resetOptions = function () {
	  'use strict';
	  globalOptions = getDefaultOpts(true);
	};

	/**
	 * Set the flavor showdown should use as default
	 * @param {string} name
	 */
	showdown.setFlavor = function (name) {
	  'use strict';
	  if (flavor.hasOwnProperty(name)) {
	    var preset = flavor[name];
	    for (var option in preset) {
	      if (preset.hasOwnProperty(option)) {
	        globalOptions[option] = preset[option];
	      }
	    }
	  }
	};

	/**
	 * Get the default options
	 * @static
	 * @param {boolean} [simple=true]
	 * @returns {{}}
	 */
	showdown.getDefaultOptions = function (simple) {
	  'use strict';
	  return getDefaultOpts(simple);
	};

	/**
	 * Get or set a subParser
	 *
	 * subParser(name)       - Get a registered subParser
	 * subParser(name, func) - Register a subParser
	 * @static
	 * @param {string} name
	 * @param {function} [func]
	 * @returns {*}
	 */
	showdown.subParser = function (name, func) {
	  'use strict';
	  if (showdown.helper.isString(name)) {
	    if (typeof func !== 'undefined') {
	      parsers[name] = func;
	    } else {
	      if (parsers.hasOwnProperty(name)) {
	        return parsers[name];
	      } else {
	        throw Error('SubParser named ' + name + ' not registered!');
	      }
	    }
	  }
	};

	/**
	 * Gets or registers an extension
	 * @static
	 * @param {string} name
	 * @param {object|function=} ext
	 * @returns {*}
	 */
	showdown.extension = function (name, ext) {
	  'use strict';

	  if (!showdown.helper.isString(name)) {
	    throw Error('Extension \'name\' must be a string');
	  }

	  name = showdown.helper.stdExtName(name);

	  // Getter
	  if (showdown.helper.isUndefined(ext)) {
	    if (!extensions.hasOwnProperty(name)) {
	      throw Error('Extension named ' + name + ' is not registered!');
	    }
	    return extensions[name];

	    // Setter
	  } else {
	    // Expand extension if it's wrapped in a function
	    if (typeof ext === 'function') {
	      ext = ext();
	    }

	    // Ensure extension is an array
	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }

	    var validExtension = validate(ext, name);

	    if (validExtension.valid) {
	      extensions[name] = ext;
	    } else {
	      throw Error(validExtension.error);
	    }
	  }
	};

	/**
	 * Gets all extensions registered
	 * @returns {{}}
	 */
	showdown.getAllExtensions = function () {
	  'use strict';
	  return extensions;
	};

	/**
	 * Remove an extension
	 * @param {string} name
	 */
	showdown.removeExtension = function (name) {
	  'use strict';
	  delete extensions[name];
	};

	/**
	 * Removes all extensions
	 */
	showdown.resetExtensions = function () {
	  'use strict';
	  extensions = {};
	};

	/**
	 * Validate extension
	 * @param {array} extension
	 * @param {string} name
	 * @returns {{valid: boolean, error: string}}
	 */
	function validate(extension, name) {
	  'use strict';

	  var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
	    ret = {
	      valid: true,
	      error: ''
	    };

	  if (!showdown.helper.isArray(extension)) {
	    extension = [extension];
	  }

	  for (var i = 0; i < extension.length; ++i) {
	    var baseMsg = errMsg + ' sub-extension ' + i + ': ',
	        ext = extension[i];
	    if (typeof ext !== 'object') {
	      ret.valid = false;
	      ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
	      return ret;
	    }

	    if (!showdown.helper.isString(ext.type)) {
	      ret.valid = false;
	      ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
	      return ret;
	    }

	    var type = ext.type = ext.type.toLowerCase();

	    // normalize extension type
	    if (type === 'language') {
	      type = ext.type = 'lang';
	    }

	    if (type === 'html') {
	      type = ext.type = 'output';
	    }

	    if (type !== 'lang' && type !== 'output' && type !== 'listener') {
	      ret.valid = false;
	      ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
	      return ret;
	    }

	    if (type === 'listener') {
	      if (showdown.helper.isUndefined(ext.listeners)) {
	        ret.valid = false;
	        ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
	        return ret;
	      }
	    } else {
	      if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
	        ret.valid = false;
	        ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
	        return ret;
	      }
	    }

	    if (ext.listeners) {
	      if (typeof ext.listeners !== 'object') {
	        ret.valid = false;
	        ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
	        return ret;
	      }
	      for (var ln in ext.listeners) {
	        if (ext.listeners.hasOwnProperty(ln)) {
	          if (typeof ext.listeners[ln] !== 'function') {
	            ret.valid = false;
	            ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
	              ' must be a function but ' + typeof ext.listeners[ln] + ' given';
	            return ret;
	          }
	        }
	      }
	    }

	    if (ext.filter) {
	      if (typeof ext.filter !== 'function') {
	        ret.valid = false;
	        ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
	        return ret;
	      }
	    } else if (ext.regex) {
	      if (showdown.helper.isString(ext.regex)) {
	        ext.regex = new RegExp(ext.regex, 'g');
	      }
	      if (!ext.regex instanceof RegExp) {
	        ret.valid = false;
	        ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
	        return ret;
	      }
	      if (showdown.helper.isUndefined(ext.replace)) {
	        ret.valid = false;
	        ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
	        return ret;
	      }
	    }
	  }
	  return ret;
	}

	/**
	 * Validate extension
	 * @param {object} ext
	 * @returns {boolean}
	 */
	showdown.validateExtension = function (ext) {
	  'use strict';

	  var validateExtension = validate(ext, null);
	  if (!validateExtension.valid) {
	    console.warn(validateExtension.error);
	    return false;
	  }
	  return true;
	};

	/**
	 * showdownjs helper functions
	 */

	if (!showdown.hasOwnProperty('helper')) {
	  showdown.helper = {};
	}

	/**
	 * Check if var is string
	 * @static
	 * @param {string} a
	 * @returns {boolean}
	 */
	showdown.helper.isString = function isString(a) {
	  'use strict';
	  return (typeof a === 'string' || a instanceof String);
	};

	/**
	 * Check if var is a function
	 * @static
	 * @param {string} a
	 * @returns {boolean}
	 */
	showdown.helper.isFunction = function isFunction(a) {
	  'use strict';
	  var getType = {};
	  return a && getType.toString.call(a) === '[object Function]';
	};

	/**
	 * ForEach helper function
	 * @static
	 * @param {*} obj
	 * @param {function} callback
	 */
	showdown.helper.forEach = function forEach(obj, callback) {
	  'use strict';
	  if (typeof obj.forEach === 'function') {
	    obj.forEach(callback);
	  } else {
	    for (var i = 0; i < obj.length; i++) {
	      callback(obj[i], i, obj);
	    }
	  }
	};

	/**
	 * isArray helper function
	 * @static
	 * @param {*} a
	 * @returns {boolean}
	 */
	showdown.helper.isArray = function isArray(a) {
	  'use strict';
	  return a.constructor === Array;
	};

	/**
	 * Check if value is undefined
	 * @static
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 */
	showdown.helper.isUndefined = function isUndefined(value) {
	  'use strict';
	  return typeof value === 'undefined';
	};

	/**
	 * Standardidize extension name
	 * @static
	 * @param {string} s extension name
	 * @returns {string}
	 */
	showdown.helper.stdExtName = function (s) {
	  'use strict';
	  return s.replace(/[_-]||\s/g, '').toLowerCase();
	};

	function escapeCharactersCallback(wholeMatch, m1) {
	  'use strict';
	  var charCodeToEscape = m1.charCodeAt(0);
	  return '~E' + charCodeToEscape + 'E';
	}

	/**
	 * Callback used to escape characters when passing through String.replace
	 * @static
	 * @param {string} wholeMatch
	 * @param {string} m1
	 * @returns {string}
	 */
	showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

	/**
	 * Escape characters in a string
	 * @static
	 * @param {string} text
	 * @param {string} charsToEscape
	 * @param {boolean} afterBackslash
	 * @returns {XML|string|void|*}
	 */
	showdown.helper.escapeCharacters = function escapeCharacters(text, charsToEscape, afterBackslash) {
	  'use strict';
	  // First we have to escape the escape characters so that
	  // we can build a character class out of them
	  var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

	  if (afterBackslash) {
	    regexString = '\\\\' + regexString;
	  }

	  var regex = new RegExp(regexString, 'g');
	  text = text.replace(regex, escapeCharactersCallback);

	  return text;
	};

	var rgxFindMatchPos = function (str, left, right, flags) {
	  'use strict';
	  var f = flags || '',
	    g = f.indexOf('g') > -1,
	    x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
	    l = new RegExp(left, f.replace(/g/g, '')),
	    pos = [],
	    t, s, m, start, end;

	  do {
	    t = 0;
	    while ((m = x.exec(str))) {
	      if (l.test(m[0])) {
	        if (!(t++)) {
	          s = x.lastIndex;
	          start = s - m[0].length;
	        }
	      } else if (t) {
	        if (!--t) {
	          end = m.index + m[0].length;
	          var obj = {
	            left: {start: start, end: s},
	            match: {start: s, end: m.index},
	            right: {start: m.index, end: end},
	            wholeMatch: {start: start, end: end}
	          };
	          pos.push(obj);
	          if (!g) {
	            return pos;
	          }
	        }
	      }
	    }
	  } while (t && (x.lastIndex = s));

	  return pos;
	};

	/**
	 * matchRecursiveRegExp
	 *
	 * (c) 2007 Steven Levithan <stevenlevithan.com>
	 * MIT License
	 *
	 * Accepts a string to search, a left and right format delimiter
	 * as regex patterns, and optional regex flags. Returns an array
	 * of matches, allowing nested instances of left/right delimiters.
	 * Use the "g" flag to return all matches, otherwise only the
	 * first is returned. Be careful to ensure that the left and
	 * right format delimiters produce mutually exclusive matches.
	 * Backreferences are not supported within the right delimiter
	 * due to how it is internally combined with the left delimiter.
	 * When matching strings whose format delimiters are unbalanced
	 * to the left or right, the output is intentionally as a
	 * conventional regex library with recursion support would
	 * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
	 * "<" and ">" as the delimiters (both strings contain a single,
	 * balanced instance of "<x>").
	 *
	 * examples:
	 * matchRecursiveRegExp("test", "\\(", "\\)")
	 * returns: []
	 * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
	 * returns: ["t<<e>><s>", ""]
	 * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
	 * returns: ["test"]
	 */
	showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
	  'use strict';

	  var matchPos = rgxFindMatchPos (str, left, right, flags),
	    results = [];

	  for (var i = 0; i < matchPos.length; ++i) {
	    results.push([
	      str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
	      str.slice(matchPos[i].match.start, matchPos[i].match.end),
	      str.slice(matchPos[i].left.start, matchPos[i].left.end),
	      str.slice(matchPos[i].right.start, matchPos[i].right.end)
	    ]);
	  }
	  return results;
	};

	/**
	 *
	 * @param {string} str
	 * @param {string|function} replacement
	 * @param {string} left
	 * @param {string} right
	 * @param {string} flags
	 * @returns {string}
	 */
	showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
	  'use strict';

	  if (!showdown.helper.isFunction(replacement)) {
	    var repStr = replacement;
	    replacement = function () {
	      return repStr;
	    };
	  }

	  var matchPos = rgxFindMatchPos(str, left, right, flags),
	      finalStr = str,
	      lng = matchPos.length;

	  if (lng > 0) {
	    var bits = [];
	    if (matchPos[0].wholeMatch.start !== 0) {
	      bits.push(str.slice(0, matchPos[0].wholeMatch.start));
	    }
	    for (var i = 0; i < lng; ++i) {
	      bits.push(
	        replacement(
	          str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
	          str.slice(matchPos[i].match.start, matchPos[i].match.end),
	          str.slice(matchPos[i].left.start, matchPos[i].left.end),
	          str.slice(matchPos[i].right.start, matchPos[i].right.end)
	        )
	      );
	      if (i < lng - 1) {
	        bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
	      }
	    }
	    if (matchPos[lng - 1].wholeMatch.end < str.length) {
	      bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
	    }
	    finalStr = bits.join('');
	  }
	  return finalStr;
	};

	/**
	 * POLYFILLS
	 */
	if (showdown.helper.isUndefined(console)) {
	  console = {
	    warn: function (msg) {
	      'use strict';
	      alert(msg);
	    },
	    log: function (msg) {
	      'use strict';
	      alert(msg);
	    },
	    error: function (msg) {
	      'use strict';
	      throw msg;
	    }
	  };
	}

	/**
	 * Created by Estevao on 31-05-2015.
	 */

	/**
	 * Showdown Converter class
	 * @class
	 * @param {object} [converterOptions]
	 * @returns {Converter}
	 */
	showdown.Converter = function (converterOptions) {
	  'use strict';

	  var
	      /**
	       * Options used by this converter
	       * @private
	       * @type {{}}
	       */
	      options = {},

	      /**
	       * Language extensions used by this converter
	       * @private
	       * @type {Array}
	       */
	      langExtensions = [],

	      /**
	       * Output modifiers extensions used by this converter
	       * @private
	       * @type {Array}
	       */
	      outputModifiers = [],

	      /**
	       * Event listeners
	       * @private
	       * @type {{}}
	       */
	      listeners = {};

	  _constructor();

	  /**
	   * Converter constructor
	   * @private
	   */
	  function _constructor() {
	    converterOptions = converterOptions || {};

	    for (var gOpt in globalOptions) {
	      if (globalOptions.hasOwnProperty(gOpt)) {
	        options[gOpt] = globalOptions[gOpt];
	      }
	    }

	    // Merge options
	    if (typeof converterOptions === 'object') {
	      for (var opt in converterOptions) {
	        if (converterOptions.hasOwnProperty(opt)) {
	          options[opt] = converterOptions[opt];
	        }
	      }
	    } else {
	      throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
	      ' was passed instead.');
	    }

	    if (options.extensions) {
	      showdown.helper.forEach(options.extensions, _parseExtension);
	    }
	  }

	  /**
	   * Parse extension
	   * @param {*} ext
	   * @param {string} [name='']
	   * @private
	   */
	  function _parseExtension(ext, name) {

	    name = name || null;
	    // If it's a string, the extension was previously loaded
	    if (showdown.helper.isString(ext)) {
	      ext = showdown.helper.stdExtName(ext);
	      name = ext;

	      // LEGACY_SUPPORT CODE
	      if (showdown.extensions[ext]) {
	        console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
	          'Please inform the developer that the extension should be updated!');
	        legacyExtensionLoading(showdown.extensions[ext], ext);
	        return;
	      // END LEGACY SUPPORT CODE

	      } else if (!showdown.helper.isUndefined(extensions[ext])) {
	        ext = extensions[ext];

	      } else {
	        throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
	      }
	    }

	    if (typeof ext === 'function') {
	      ext = ext();
	    }

	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }

	    var validExt = validate(ext, name);
	    if (!validExt.valid) {
	      throw Error(validExt.error);
	    }

	    for (var i = 0; i < ext.length; ++i) {
	      switch (ext[i].type) {

	        case 'lang':
	          langExtensions.push(ext[i]);
	          break;

	        case 'output':
	          outputModifiers.push(ext[i]);
	          break;
	      }
	      if (ext[i].hasOwnProperty(listeners)) {
	        for (var ln in ext[i].listeners) {
	          if (ext[i].listeners.hasOwnProperty(ln)) {
	            listen(ln, ext[i].listeners[ln]);
	          }
	        }
	      }
	    }

	  }

	  /**
	   * LEGACY_SUPPORT
	   * @param {*} ext
	   * @param {string} name
	   */
	  function legacyExtensionLoading(ext, name) {
	    if (typeof ext === 'function') {
	      ext = ext(new showdown.Converter());
	    }
	    if (!showdown.helper.isArray(ext)) {
	      ext = [ext];
	    }
	    var valid = validate(ext, name);

	    if (!valid.valid) {
	      throw Error(valid.error);
	    }

	    for (var i = 0; i < ext.length; ++i) {
	      switch (ext[i].type) {
	        case 'lang':
	          langExtensions.push(ext[i]);
	          break;
	        case 'output':
	          outputModifiers.push(ext[i]);
	          break;
	        default:// should never reach here
	          throw Error('Extension loader error: Type unrecognized!!!');
	      }
	    }
	  }

	  /**
	   * Listen to an event
	   * @param {string} name
	   * @param {function} callback
	   */
	  function listen(name, callback) {
	    if (!showdown.helper.isString(name)) {
	      throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
	    }

	    if (typeof callback !== 'function') {
	      throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
	    }

	    if (!listeners.hasOwnProperty(name)) {
	      listeners[name] = [];
	    }
	    listeners[name].push(callback);
	  }

	  function rTrimInputText(text) {
	    var rsp = text.match(/^\s*/)[0].length,
	        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
	    return text.replace(rgx, '');
	  }

	  /**
	   * Dispatch an event
	   * @private
	   * @param {string} evtName Event name
	   * @param {string} text Text
	   * @param {{}} options Converter Options
	   * @param {{}} globals
	   * @returns {string}
	   */
	  this._dispatch = function dispatch (evtName, text, options, globals) {
	    if (listeners.hasOwnProperty(evtName)) {
	      for (var ei = 0; ei < listeners[evtName].length; ++ei) {
	        var nText = listeners[evtName][ei](evtName, text, this, options, globals);
	        if (nText && typeof nText !== 'undefined') {
	          text = nText;
	        }
	      }
	    }
	    return text;
	  };

	  /**
	   * Listen to an event
	   * @param {string} name
	   * @param {function} callback
	   * @returns {showdown.Converter}
	   */
	  this.listen = function (name, callback) {
	    listen(name, callback);
	    return this;
	  };

	  /**
	   * Converts a markdown string into HTML
	   * @param {string} text
	   * @returns {*}
	   */
	  this.makeHtml = function (text) {
	    //check if text is not falsy
	    if (!text) {
	      return text;
	    }

	    var globals = {
	      gHtmlBlocks:     [],
	      gHtmlMdBlocks:   [],
	      gHtmlSpans:      [],
	      gUrls:           {},
	      gTitles:         {},
	      gDimensions:     {},
	      gListLevel:      0,
	      hashLinkCounts:  {},
	      langExtensions:  langExtensions,
	      outputModifiers: outputModifiers,
	      converter:       this,
	      ghCodeBlocks:    []
	    };

	    // attacklab: Replace ~ with ~T
	    // This lets us use tilde as an escape char to avoid md5 hashes
	    // The choice of character is arbitrary; anything that isn't
	    // magic in Markdown will work.
	    text = text.replace(/~/g, '~T');

	    // attacklab: Replace $ with ~D
	    // RegExp interprets $ as a special character
	    // when it's in a replacement string
	    text = text.replace(/\$/g, '~D');

	    // Standardize line endings
	    text = text.replace(/\r\n/g, '\n'); // DOS to Unix
	    text = text.replace(/\r/g, '\n'); // Mac to Unix

	    if (options.smartIndentationFix) {
	      text = rTrimInputText(text);
	    }

	    // Make sure text begins and ends with a couple of newlines:
	    text = '\n\n' + text + '\n\n';

	    // detab
	    text = showdown.subParser('detab')(text, options, globals);

	    // stripBlankLines
	    text = showdown.subParser('stripBlankLines')(text, options, globals);

	    //run languageExtensions
	    showdown.helper.forEach(langExtensions, function (ext) {
	      text = showdown.subParser('runExtension')(ext, text, options, globals);
	    });

	    // run the sub parsers
	    text = showdown.subParser('hashPreCodeTags')(text, options, globals);
	    text = showdown.subParser('githubCodeBlocks')(text, options, globals);
	    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
	    text = showdown.subParser('hashHTMLSpans')(text, options, globals);
	    text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
	    text = showdown.subParser('blockGamut')(text, options, globals);
	    text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
	    text = showdown.subParser('unescapeSpecialChars')(text, options, globals);

	    // attacklab: Restore dollar signs
	    text = text.replace(/~D/g, '$$');

	    // attacklab: Restore tildes
	    text = text.replace(/~T/g, '~');

	    // Run output modifiers
	    showdown.helper.forEach(outputModifiers, function (ext) {
	      text = showdown.subParser('runExtension')(ext, text, options, globals);
	    });

	    return text;
	  };

	  /**
	   * Set an option of this Converter instance
	   * @param {string} key
	   * @param {*} value
	   */
	  this.setOption = function (key, value) {
	    options[key] = value;
	  };

	  /**
	   * Get the option of this Converter instance
	   * @param {string} key
	   * @returns {*}
	   */
	  this.getOption = function (key) {
	    return options[key];
	  };

	  /**
	   * Get the options of this Converter instance
	   * @returns {{}}
	   */
	  this.getOptions = function () {
	    return options;
	  };

	  /**
	   * Add extension to THIS converter
	   * @param {{}} extension
	   * @param {string} [name=null]
	   */
	  this.addExtension = function (extension, name) {
	    name = name || null;
	    _parseExtension(extension, name);
	  };

	  /**
	   * Use a global registered extension with THIS converter
	   * @param {string} extensionName Name of the previously registered extension
	   */
	  this.useExtension = function (extensionName) {
	    _parseExtension(extensionName);
	  };

	  /**
	   * Set the flavor THIS converter should use
	   * @param {string} name
	   */
	  this.setFlavor = function (name) {
	    if (flavor.hasOwnProperty(name)) {
	      var preset = flavor[name];
	      for (var option in preset) {
	        if (preset.hasOwnProperty(option)) {
	          options[option] = preset[option];
	        }
	      }
	    }
	  };

	  /**
	   * Remove an extension from THIS converter.
	   * Note: This is a costly operation. It's better to initialize a new converter
	   * and specify the extensions you wish to use
	   * @param {Array} extension
	   */
	  this.removeExtension = function (extension) {
	    if (!showdown.helper.isArray(extension)) {
	      extension = [extension];
	    }
	    for (var a = 0; a < extension.length; ++a) {
	      var ext = extension[a];
	      for (var i = 0; i < langExtensions.length; ++i) {
	        if (langExtensions[i] === ext) {
	          langExtensions[i].splice(i, 1);
	        }
	      }
	      for (var ii = 0; ii < outputModifiers.length; ++i) {
	        if (outputModifiers[ii] === ext) {
	          outputModifiers[ii].splice(i, 1);
	        }
	      }
	    }
	  };

	  /**
	   * Get all extension of THIS converter
	   * @returns {{language: Array, output: Array}}
	   */
	  this.getAllExtensions = function () {
	    return {
	      language: langExtensions,
	      output: outputModifiers
	    };
	  };
	};

	/**
	 * Turn Markdown link shortcuts into XHTML <a> tags.
	 */
	showdown.subParser('anchors', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('anchors.before', text, options, globals);

	  var writeAnchorTag = function (wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
	    if (showdown.helper.isUndefined(m7)) {
	      m7 = '';
	    }
	    wholeMatch = m1;
	    var linkText = m2,
	        linkId = m3.toLowerCase(),
	        url = m4,
	        title = m7;

	    if (!url) {
	      if (!linkId) {
	        // lower-case and turn embedded newlines into spaces
	        linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
	      }
	      url = '#' + linkId;

	      if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
	        url = globals.gUrls[linkId];
	        if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
	          title = globals.gTitles[linkId];
	        }
	      } else {
	        if (wholeMatch.search(/\(\s*\)$/m) > -1) {
	          // Special case for explicit empty url
	          url = '';
	        } else {
	          return wholeMatch;
	        }
	      }
	    }

	    url = showdown.helper.escapeCharacters(url, '*_', false);
	    var result = '<a href="' + url + '"';

	    if (title !== '' && title !== null) {
	      title = title.replace(/"/g, '&quot;');
	      title = showdown.helper.escapeCharacters(title, '*_', false);
	      result += ' title="' + title + '"';
	    }

	    result += '>' + linkText + '</a>';

	    return result;
	  };

	  // First, handle reference-style links: [link text] [id]
	  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, writeAnchorTag);

	  // Next, inline-style links: [link text](url "optional title")
	  text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
	                      writeAnchorTag);

	  // Last, handle reference-style shortcuts: [link text]
	  // These must come last in case you've also got [link test][1]
	  // or [link test](/foo)
	  text = text.replace(/(\[([^\[\]]+)])()()()()()/g, writeAnchorTag);

	  text = globals.converter._dispatch('anchors.after', text, options, globals);
	  return text;
	});

	showdown.subParser('autoLinks', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('autoLinks.before', text, options, globals);

	  var simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,
	      delimUrlRegex   = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,
	      simpleMailRegex = /(?:^|\s)([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|\s)/gi,
	      delimMailRegex  = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;

	  text = text.replace(delimUrlRegex, replaceLink);
	  text = text.replace(delimMailRegex, replaceMail);
	  // simpleURLRegex  = /\b(((https?|ftp|dict):\/\/|www\.)[-.+~:?#@!$&'()*,;=[\]\w]+)\b/gi,
	  // Email addresses: <address@domain.foo>

	  if (options.simplifiedAutoLink) {
	    text = text.replace(simpleURLRegex, replaceLink);
	    text = text.replace(simpleMailRegex, replaceMail);
	  }

	  function replaceLink(wm, link) {
	    var lnkTxt = link;
	    if (/^www\./i.test(link)) {
	      link = link.replace(/^www\./i, 'http://www.');
	    }
	    return '<a href="' + link + '">' + lnkTxt + '</a>';
	  }

	  function replaceMail(wholeMatch, m1) {
	    var unescapedStr = showdown.subParser('unescapeSpecialChars')(m1);
	    return showdown.subParser('encodeEmailAddress')(unescapedStr);
	  }

	  text = globals.converter._dispatch('autoLinks.after', text, options, globals);

	  return text;
	});

	/**
	 * These are all the transformations that form block-level
	 * tags like paragraphs, headers, and list items.
	 */
	showdown.subParser('blockGamut', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('blockGamut.before', text, options, globals);

	  // we parse blockquotes first so that we can have headings and hrs
	  // inside blockquotes
	  text = showdown.subParser('blockQuotes')(text, options, globals);
	  text = showdown.subParser('headers')(text, options, globals);

	  // Do Horizontal Rules:
	  var key = showdown.subParser('hashBlock')('<hr />', options, globals);
	  text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key);
	  text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key);
	  text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, key);

	  text = showdown.subParser('lists')(text, options, globals);
	  text = showdown.subParser('codeBlocks')(text, options, globals);
	  text = showdown.subParser('tables')(text, options, globals);

	  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
	  // was to escape raw HTML in the original Markdown source. This time,
	  // we're escaping the markup we've just created, so that we don't wrap
	  // <p> tags around block-level tags.
	  text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
	  text = showdown.subParser('paragraphs')(text, options, globals);

	  text = globals.converter._dispatch('blockGamut.after', text, options, globals);

	  return text;
	});

	showdown.subParser('blockQuotes', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('blockQuotes.before', text, options, globals);

	  text = text.replace(/((^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (wholeMatch, m1) {
	    var bq = m1;

	    // attacklab: hack around Konqueror 3.5.4 bug:
	    // "----------bug".replace(/^-/g,"") == "bug"
	    bq = bq.replace(/^[ \t]*>[ \t]?/gm, '~0'); // trim one level of quoting

	    // attacklab: clean up hack
	    bq = bq.replace(/~0/g, '');

	    bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
	    bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
	    bq = showdown.subParser('blockGamut')(bq, options, globals); // recurse

	    bq = bq.replace(/(^|\n)/g, '$1  ');
	    // These leading spaces screw with <pre> content, so we need to fix that:
	    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
	      var pre = m1;
	      // attacklab: hack around Konqueror 3.5.4 bug:
	      pre = pre.replace(/^  /mg, '~0');
	      pre = pre.replace(/~0/g, '');
	      return pre;
	    });

	    return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
	  });

	  text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
	  return text;
	});

	/**
	 * Process Markdown `<pre><code>` blocks.
	 */
	showdown.subParser('codeBlocks', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('codeBlocks.before', text, options, globals);

	  // sentinel workarounds for lack of \A and \Z, safari\khtml bug
	  text += '~0';

	  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
	  text = text.replace(pattern, function (wholeMatch, m1, m2) {
	    var codeblock = m1,
	        nextChar = m2,
	        end = '\n';

	    codeblock = showdown.subParser('outdent')(codeblock);
	    codeblock = showdown.subParser('encodeCode')(codeblock);
	    codeblock = showdown.subParser('detab')(codeblock);
	    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
	    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

	    if (options.omitExtraWLInCodeBlocks) {
	      end = '';
	    }

	    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

	    return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
	  });

	  // strip sentinel
	  text = text.replace(/~0/, '');

	  text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
	  return text;
	});

	/**
	 *
	 *   *  Backtick quotes are used for <code></code> spans.
	 *
	 *   *  You can use multiple backticks as the delimiters if you want to
	 *     include literal backticks in the code span. So, this input:
	 *
	 *         Just type ``foo `bar` baz`` at the prompt.
	 *
	 *       Will translate to:
	 *
	 *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
	 *
	 *    There's no arbitrary limit to the number of backticks you
	 *    can use as delimters. If you need three consecutive backticks
	 *    in your code, use four for delimiters, etc.
	 *
	 *  *  You can use spaces to get literal backticks at the edges:
	 *
	 *         ... type `` `bar` `` ...
	 *
	 *       Turns to:
	 *
	 *         ... type <code>`bar`</code> ...
	 */
	showdown.subParser('codeSpans', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('codeSpans.before', text, options, globals);

	  /*
	   text = text.replace(/
	   (^|[^\\])					// Character before opening ` can't be a backslash
	   (`+)						// $2 = Opening run of `
	   (							// $3 = The code block
	   [^\r]*?
	   [^`]					// attacklab: work around lack of lookbehind
	   )
	   \2							// Matching closer
	   (?!`)
	   /gm, function(){...});
	   */

	  if (typeof(text) === 'undefined') {
	    text = '';
	  }
	  text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
	    function (wholeMatch, m1, m2, m3) {
	      var c = m3;
	      c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
	      c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
	      c = showdown.subParser('encodeCode')(c);
	      return m1 + '<code>' + c + '</code>';
	    }
	  );

	  text = globals.converter._dispatch('codeSpans.after', text, options, globals);
	  return text;
	});

	/**
	 * Convert all tabs to spaces
	 */
	showdown.subParser('detab', function (text) {
	  'use strict';

	  // expand first n-1 tabs
	  text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

	  // replace the nth with two sentinels
	  text = text.replace(/\t/g, '~A~B');

	  // use the sentinel to anchor our regex so it doesn't explode
	  text = text.replace(/~B(.+?)~A/g, function (wholeMatch, m1) {
	    var leadingText = m1,
	        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

	    // there *must* be a better way to do this:
	    for (var i = 0; i < numSpaces; i++) {
	      leadingText += ' ';
	    }

	    return leadingText;
	  });

	  // clean up sentinels
	  text = text.replace(/~A/g, '    ');  // g_tab_width
	  text = text.replace(/~B/g, '');

	  return text;

	});

	/**
	 * Smart processing for ampersands and angle brackets that need to be encoded.
	 */
	showdown.subParser('encodeAmpsAndAngles', function (text) {
	  'use strict';
	  // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
	  // http://bumppo.net/projects/amputator/
	  text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

	  // Encode naked <'s
	  text = text.replace(/<(?![a-z\/?\$!])/gi, '&lt;');

	  return text;
	});

	/**
	 * Returns the string, with after processing the following backslash escape sequences.
	 *
	 * attacklab: The polite way to do this is with the new escapeCharacters() function:
	 *
	 *    text = escapeCharacters(text,"\\",true);
	 *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
	 *
	 * ...but we're sidestepping its use of the (slow) RegExp constructor
	 * as an optimization for Firefox.  This function gets called a LOT.
	 */
	showdown.subParser('encodeBackslashEscapes', function (text) {
	  'use strict';
	  text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
	  text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, showdown.helper.escapeCharactersCallback);
	  return text;
	});

	/**
	 * Encode/escape certain characters inside Markdown code runs.
	 * The point is that in code, these characters are literals,
	 * and lose their special Markdown meanings.
	 */
	showdown.subParser('encodeCode', function (text) {
	  'use strict';

	  // Encode all ampersands; HTML entities are not
	  // entities within a Markdown code span.
	  text = text.replace(/&/g, '&amp;');

	  // Do the angle bracket song and dance:
	  text = text.replace(/</g, '&lt;');
	  text = text.replace(/>/g, '&gt;');

	  // Now, escape characters that are magic in Markdown:
	  text = showdown.helper.escapeCharacters(text, '*_{}[]\\', false);

	  // jj the line above breaks this:
	  //---
	  //* Item
	  //   1. Subitem
	  //            special char: *
	  // ---

	  return text;
	});

	/**
	 *  Input: an email address, e.g. "foo@example.com"
	 *
	 *  Output: the email address as a mailto link, with each character
	 *    of the address encoded as either a decimal or hex entity, in
	 *    the hopes of foiling most address harvesting spam bots. E.g.:
	 *
	 *    <a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;
	 *       x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;
	 *       &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>
	 *
	 *  Based on a filter by Matthew Wickline, posted to the BBEdit-Talk
	 *  mailing list: <http://tinyurl.com/yu7ue>
	 *
	 */
	showdown.subParser('encodeEmailAddress', function (addr) {
	  'use strict';

	  var encode = [
	    function (ch) {
	      return '&#' + ch.charCodeAt(0) + ';';
	    },
	    function (ch) {
	      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
	    },
	    function (ch) {
	      return ch;
	    }
	  ];

	  addr = 'mailto:' + addr;

	  addr = addr.replace(/./g, function (ch) {
	    if (ch === '@') {
	      // this *must* be encoded. I insist.
	      ch = encode[Math.floor(Math.random() * 2)](ch);
	    } else if (ch !== ':') {
	      // leave ':' alone (to spot mailto: later)
	      var r = Math.random();
	      // roughly 10% raw, 45% hex, 45% dec
	      ch = (
	        r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
	      );
	    }
	    return ch;
	  });

	  addr = '<a href="' + addr + '">' + addr + '</a>';
	  addr = addr.replace(/">.+:/g, '">'); // strip the mailto: from the visible part

	  return addr;
	});

	/**
	 * Within tags -- meaning between < and > -- encode [\ ` * _] so they
	 * don't conflict with their use in Markdown for code, italics and strong.
	 */
	showdown.subParser('escapeSpecialCharsWithinTagAttributes', function (text) {
	  'use strict';

	  // Build a regex to find HTML tags and comments.  See Friedl's
	  // "Mastering Regular Expressions", 2nd Ed., pp. 200-201.
	  var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;

	  text = text.replace(regex, function (wholeMatch) {
	    var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`');
	    tag = showdown.helper.escapeCharacters(tag, '\\`*_', false);
	    return tag;
	  });

	  return text;
	});

	/**
	 * Handle github codeblocks prior to running HashHTML so that
	 * HTML contained within the codeblock gets escaped properly
	 * Example:
	 * ```ruby
	 *     def hello_world(x)
	 *       puts "Hello, #{x}"
	 *     end
	 * ```
	 */
	showdown.subParser('githubCodeBlocks', function (text, options, globals) {
	  'use strict';

	  // early exit if option is not enabled
	  if (!options.ghCodeBlocks) {
	    return text;
	  }

	  text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);

	  text += '~0';

	  text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function (wholeMatch, language, codeblock) {
	    var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

	    // First parse the github code block
	    codeblock = showdown.subParser('encodeCode')(codeblock);
	    codeblock = showdown.subParser('detab')(codeblock);
	    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
	    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

	    codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

	    codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);

	    // Since GHCodeblocks can be false positives, we need to
	    // store the primitive text and the parsed text in a global var,
	    // and then return a token
	    return '\n\n~G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
	  });

	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');

	  return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
	});

	showdown.subParser('hashBlock', function (text, options, globals) {
	  'use strict';
	  text = text.replace(/(^\n+|\n+$)/g, '');
	  return '\n\n~K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
	});

	showdown.subParser('hashElement', function (text, options, globals) {
	  'use strict';

	  return function (wholeMatch, m1) {
	    var blockText = m1;

	    // Undo double lines
	    blockText = blockText.replace(/\n\n/g, '\n');
	    blockText = blockText.replace(/^\n/, '');

	    // strip trailing blank lines
	    blockText = blockText.replace(/\n+$/g, '');

	    // Replace the element text with a marker ("~KxK" where x is its key)
	    blockText = '\n\n~K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

	    return blockText;
	  };
	});

	showdown.subParser('hashHTMLBlocks', function (text, options, globals) {
	  'use strict';

	  var blockTags = [
	      'pre',
	      'div',
	      'h1',
	      'h2',
	      'h3',
	      'h4',
	      'h5',
	      'h6',
	      'blockquote',
	      'table',
	      'dl',
	      'ol',
	      'ul',
	      'script',
	      'noscript',
	      'form',
	      'fieldset',
	      'iframe',
	      'math',
	      'style',
	      'section',
	      'header',
	      'footer',
	      'nav',
	      'article',
	      'aside',
	      'address',
	      'audio',
	      'canvas',
	      'figure',
	      'hgroup',
	      'output',
	      'video',
	      'p'
	    ],
	    repFunc = function (wholeMatch, match, left, right) {
	      var txt = wholeMatch;
	      // check if this html element is marked as markdown
	      // if so, it's contents should be parsed as markdown
	      if (left.search(/\bmarkdown\b/) !== -1) {
	        txt = left + globals.converter.makeHtml(match) + right;
	      }
	      return '\n\n~K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
	    };

	  for (var i = 0; i < blockTags.length; ++i) {
	    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<' + blockTags[i] + '\\b[^>]*>', '</' + blockTags[i] + '>', 'gim');
	  }

	  // HR SPECIAL CASE
	  text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
	    showdown.subParser('hashElement')(text, options, globals));

	  // Special case for standalone HTML comments
	  text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
	    return '\n\n~K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
	  }, '^ {0,3}<!--', '-->', 'gm');

	  // PHP and ASP-style processor instructions (<?...?> and <%...%>)
	  text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
	    showdown.subParser('hashElement')(text, options, globals));

	  return text;
	});

	/**
	 * Hash span elements that should not be parsed as markdown
	 */
	showdown.subParser('hashHTMLSpans', function (text, config, globals) {
	  'use strict';

	  var matches = showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');

	  for (var i = 0; i < matches.length; ++i) {
	    text = text.replace(matches[i][0], '~L' + (globals.gHtmlSpans.push(matches[i][0]) - 1) + 'L');
	  }
	  return text;
	});

	/**
	 * Unhash HTML spans
	 */
	showdown.subParser('unhashHTMLSpans', function (text, config, globals) {
	  'use strict';

	  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
	    text = text.replace('~L' + i + 'L', globals.gHtmlSpans[i]);
	  }

	  return text;
	});

	/**
	 * Hash span elements that should not be parsed as markdown
	 */
	showdown.subParser('hashPreCodeTags', function (text, config, globals) {
	  'use strict';

	  var repFunc = function (wholeMatch, match, left, right) {
	    // encode html entities
	    var codeblock = left + showdown.subParser('encodeCode')(match) + right;
	    return '\n\n~G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
	  };

	  text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');
	  return text;
	});

	showdown.subParser('headers', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('headers.before', text, options, globals);

	  var prefixHeader = options.prefixHeaderId,
	      headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

	  // Set text-style headers:
	  //	Header 1
	  //	========
	  //
	  //	Header 2
	  //	--------
	  //
	      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
	      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

	  text = text.replace(setextRegexH1, function (wholeMatch, m1) {

	    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
	        hLevel = headerLevelStart,
	        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
	    return showdown.subParser('hashBlock')(hashBlock, options, globals);
	  });

	  text = text.replace(setextRegexH2, function (matchFound, m1) {
	    var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
	        hLevel = headerLevelStart + 1,
	      hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
	    return showdown.subParser('hashBlock')(hashBlock, options, globals);
	  });

	  // atx-style headers:
	  //  # Header 1
	  //  ## Header 2
	  //  ## Header 2 with closing hashes ##
	  //  ...
	  //  ###### Header 6
	  //
	  text = text.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function (wholeMatch, m1, m2) {
	    var span = showdown.subParser('spanGamut')(m2, options, globals),
	        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
	        hLevel = headerLevelStart - 1 + m1.length,
	        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

	    return showdown.subParser('hashBlock')(header, options, globals);
	  });

	  function headerId(m) {
	    var title, escapedId = m.replace(/[^\w]/g, '').toLowerCase();

	    if (globals.hashLinkCounts[escapedId]) {
	      title = escapedId + '-' + (globals.hashLinkCounts[escapedId]++);
	    } else {
	      title = escapedId;
	      globals.hashLinkCounts[escapedId] = 1;
	    }

	    // Prefix id to prevent causing inadvertent pre-existing style matches.
	    if (prefixHeader === true) {
	      prefixHeader = 'section';
	    }

	    if (showdown.helper.isString(prefixHeader)) {
	      return prefixHeader + title;
	    }
	    return title;
	  }

	  text = globals.converter._dispatch('headers.after', text, options, globals);
	  return text;
	});

	/**
	 * Turn Markdown image shortcuts into <img> tags.
	 */
	showdown.subParser('images', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('images.before', text, options, globals);

	  var inlineRegExp    = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,
	      referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;

	  function writeImageTag (wholeMatch, altText, linkId, url, width, height, m5, title) {

	    var gUrls   = globals.gUrls,
	        gTitles = globals.gTitles,
	        gDims   = globals.gDimensions;

	    linkId = linkId.toLowerCase();

	    if (!title) {
	      title = '';
	    }

	    if (url === '' || url === null) {
	      if (linkId === '' || linkId === null) {
	        // lower-case and turn embedded newlines into spaces
	        linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
	      }
	      url = '#' + linkId;

	      if (!showdown.helper.isUndefined(gUrls[linkId])) {
	        url = gUrls[linkId];
	        if (!showdown.helper.isUndefined(gTitles[linkId])) {
	          title = gTitles[linkId];
	        }
	        if (!showdown.helper.isUndefined(gDims[linkId])) {
	          width = gDims[linkId].width;
	          height = gDims[linkId].height;
	        }
	      } else {
	        return wholeMatch;
	      }
	    }

	    altText = altText.replace(/"/g, '&quot;');
	    altText = showdown.helper.escapeCharacters(altText, '*_', false);
	    url = showdown.helper.escapeCharacters(url, '*_', false);
	    var result = '<img src="' + url + '" alt="' + altText + '"';

	    if (title) {
	      title = title.replace(/"/g, '&quot;');
	      title = showdown.helper.escapeCharacters(title, '*_', false);
	      result += ' title="' + title + '"';
	    }

	    if (width && height) {
	      width  = (width === '*') ? 'auto' : width;
	      height = (height === '*') ? 'auto' : height;

	      result += ' width="' + width + '"';
	      result += ' height="' + height + '"';
	    }

	    result += ' />';

	    return result;
	  }

	  // First, handle reference-style labeled images: ![alt text][id]
	  text = text.replace(referenceRegExp, writeImageTag);

	  // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")
	  text = text.replace(inlineRegExp, writeImageTag);

	  text = globals.converter._dispatch('images.after', text, options, globals);
	  return text;
	});

	showdown.subParser('italicsAndBold', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);

	  if (options.literalMidWordUnderscores) {
	    //underscores
	    // Since we are consuming a \s character, we need to add it
	    text = text.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, '$1<strong>$2</strong>');
	    text = text.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, '$1<em>$2</em>');
	    //asterisks
	    text = text.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, '<strong>$2</strong>');
	    text = text.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');

	  } else {
	    // <strong> must go first:
	    text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, '<strong>$2</strong>');
	    text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
	  }

	  text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
	  return text;
	});

	/**
	 * Form HTML ordered (numbered) and unordered (bulleted) lists.
	 */
	showdown.subParser('lists', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('lists.before', text, options, globals);
	  /**
	   * Process the contents of a single ordered or unordered list, splitting it
	   * into individual list items.
	   * @param {string} listStr
	   * @param {boolean} trimTrailing
	   * @returns {string}
	   */
	  function processListItems (listStr, trimTrailing) {
	    // The $g_list_level global keeps track of when we're inside a list.
	    // Each time we enter a list, we increment it; when we leave a list,
	    // we decrement. If it's zero, we're not in a list anymore.
	    //
	    // We do this because when we're not inside a list, we want to treat
	    // something like this:
	    //
	    //    I recommend upgrading to version
	    //    8. Oops, now this line is treated
	    //    as a sub-list.
	    //
	    // As a single paragraph, despite the fact that the second line starts
	    // with a digit-period-space sequence.
	    //
	    // Whereas when we're inside a list (or sub-list), that line will be
	    // treated as the start of a sub-list. What a kludge, huh? This is
	    // an aspect of Markdown's syntax that's hard to parse perfectly
	    // without resorting to mind-reading. Perhaps the solution is to
	    // change the syntax rules such that sub-lists must start with a
	    // starting cardinal number; e.g. "1." or "a.".
	    globals.gListLevel++;

	    // trim trailing blank lines:
	    listStr = listStr.replace(/\n{2,}$/, '\n');

	    // attacklab: add sentinel to emulate \z
	    listStr += '~0';

	    var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
	        isParagraphed = (/\n[ \t]*\n(?!~0)/.test(listStr));

	    // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
	    // which is a syntax breaking change
	    // activating this option reverts to old behavior
	    if (options.disableForced4SpacesIndentedSublists) {
	      rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm;
	    }

	    listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
	      checked = (checked && checked.trim() !== '');

	      var item = showdown.subParser('outdent')(m4, options, globals),
	          bulletStyle = '';

	      // Support for github tasklists
	      if (taskbtn && options.tasklists) {
	        bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
	        item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
	          var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
	          if (checked) {
	            otp += ' checked';
	          }
	          otp += '>';
	          return otp;
	        });
	      }

	      // m1 - Leading line or
	      // Has a double return (multi paragraph) or
	      // Has sublist
	      if (m1 || (item.search(/\n{2,}/) > -1)) {
	        item = showdown.subParser('githubCodeBlocks')(item, options, globals);
	        item = showdown.subParser('blockGamut')(item, options, globals);
	      } else {
	        // Recursion for sub-lists:
	        item = showdown.subParser('lists')(item, options, globals);
	        item = item.replace(/\n$/, ''); // chomp(item)
	        if (isParagraphed) {
	          item = showdown.subParser('paragraphs')(item, options, globals);
	        } else {
	          item = showdown.subParser('spanGamut')(item, options, globals);
	        }
	      }
	      item =  '<li' + bulletStyle + '>' + item + '</li>\n';
	      return item;
	    });

	    // attacklab: strip sentinel
	    listStr = listStr.replace(/~0/g, '');

	    globals.gListLevel--;

	    if (trimTrailing) {
	      listStr = listStr.replace(/\s+$/, '');
	    }

	    return listStr;
	  }

	  /**
	   * Check and parse consecutive lists (better fix for issue #142)
	   * @param {string} list
	   * @param {string} listType
	   * @param {boolean} trimTrailing
	   * @returns {string}
	   */
	  function parseConsecutiveLists(list, listType, trimTrailing) {
	    // check if we caught 2 or more consecutive lists by mistake
	    // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
	    var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
	        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
	        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
	        result = '';

	    if (list.search(counterRxg) !== -1) {
	      (function parseCL(txt) {
	        var pos = txt.search(counterRxg);
	        if (pos !== -1) {
	          // slice
	          result += '\n<' + listType + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';

	          // invert counterType and listType
	          listType = (listType === 'ul') ? 'ol' : 'ul';
	          counterRxg = (listType === 'ul') ? olRgx : ulRgx;

	          //recurse
	          parseCL(txt.slice(pos));
	        } else {
	          result += '\n<' + listType + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
	        }
	      })(list);
	    } else {
	      result = '\n<' + listType + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
	    }

	    return result;
	  }

	  // add sentinel to hack around khtml/safari bug:
	  // http://bugs.webkit.org/show_bug.cgi?id=11231
	  text += '~0';

	  if (globals.gListLevel) {
	    text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
	      function (wholeMatch, list, m2) {
	        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
	        return parseConsecutiveLists(list, listType, true);
	      }
	    );
	  } else {
	    text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
	      function (wholeMatch, m1, list, m3) {
	        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
	        return parseConsecutiveLists(list, listType, false);
	      }
	    );
	  }

	  // strip sentinel
	  text = text.replace(/~0/, '');

	  text = globals.converter._dispatch('lists.after', text, options, globals);
	  return text;
	});

	/**
	 * Remove one level of line-leading tabs or spaces
	 */
	showdown.subParser('outdent', function (text) {
	  'use strict';

	  // attacklab: hack around Konqueror 3.5.4 bug:
	  // "----------bug".replace(/^-/g,"") == "bug"
	  text = text.replace(/^(\t|[ ]{1,4})/gm, '~0'); // attacklab: g_tab_width

	  // attacklab: clean up hack
	  text = text.replace(/~0/g, '');

	  return text;
	});

	/**
	 *
	 */
	showdown.subParser('paragraphs', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('paragraphs.before', text, options, globals);
	  // Strip leading and trailing lines:
	  text = text.replace(/^\n+/g, '');
	  text = text.replace(/\n+$/g, '');

	  var grafs = text.split(/\n{2,}/g),
	      grafsOut = [],
	      end = grafs.length; // Wrap <p> tags

	  for (var i = 0; i < end; i++) {
	    var str = grafs[i];
	    // if this is an HTML marker, copy it
	    if (str.search(/~(K|G)(\d+)\1/g) >= 0) {
	      grafsOut.push(str);
	    } else {
	      str = showdown.subParser('spanGamut')(str, options, globals);
	      str = str.replace(/^([ \t]*)/g, '<p>');
	      str += '</p>';
	      grafsOut.push(str);
	    }
	  }

	  /** Unhashify HTML blocks */
	  end = grafsOut.length;
	  for (i = 0; i < end; i++) {
	    var blockText = '',
	        grafsOutIt = grafsOut[i],
	        codeFlag = false;
	    // if this is a marker for an html block...
	    while (grafsOutIt.search(/~(K|G)(\d+)\1/) >= 0) {
	      var delim = RegExp.$1,
	          num   = RegExp.$2;

	      if (delim === 'K') {
	        blockText = globals.gHtmlBlocks[num];
	      } else {
	        // we need to check if ghBlock is a false positive
	        if (codeFlag) {
	          // use encoded version of all text
	          blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text);
	        } else {
	          blockText = globals.ghCodeBlocks[num].codeblock;
	        }
	      }
	      blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

	      grafsOutIt = grafsOutIt.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, blockText);
	      // Check if grafsOutIt is a pre->code
	      if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
	        codeFlag = true;
	      }
	    }
	    grafsOut[i] = grafsOutIt;
	  }
	  text = grafsOut.join('\n');
	  // Strip leading and trailing lines:
	  text = text.replace(/^\n+/g, '');
	  text = text.replace(/\n+$/g, '');
	  return globals.converter._dispatch('paragraphs.after', text, options, globals);
	});

	/**
	 * Run extension
	 */
	showdown.subParser('runExtension', function (ext, text, options, globals) {
	  'use strict';

	  if (ext.filter) {
	    text = ext.filter(text, globals.converter, options);

	  } else if (ext.regex) {
	    // TODO remove this when old extension loading mechanism is deprecated
	    var re = ext.regex;
	    if (!re instanceof RegExp) {
	      re = new RegExp(re, 'g');
	    }
	    text = text.replace(re, ext.replace);
	  }

	  return text;
	});

	/**
	 * These are all the transformations that occur *within* block-level
	 * tags like paragraphs, headers, and list items.
	 */
	showdown.subParser('spanGamut', function (text, options, globals) {
	  'use strict';

	  text = globals.converter._dispatch('spanGamut.before', text, options, globals);
	  text = showdown.subParser('codeSpans')(text, options, globals);
	  text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
	  text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);

	  // Process anchor and image tags. Images must come first,
	  // because ![foo][f] looks like an anchor.
	  text = showdown.subParser('images')(text, options, globals);
	  text = showdown.subParser('anchors')(text, options, globals);

	  // Make links out of things like `<http://example.com/>`
	  // Must come after _DoAnchors(), because you can use < and >
	  // delimiters in inline links like [this](<url>).
	  text = showdown.subParser('autoLinks')(text, options, globals);
	  text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);
	  text = showdown.subParser('italicsAndBold')(text, options, globals);
	  text = showdown.subParser('strikethrough')(text, options, globals);

	  // Do hard breaks:
	  text = text.replace(/  +\n/g, ' <br />\n');

	  text = globals.converter._dispatch('spanGamut.after', text, options, globals);
	  return text;
	});

	showdown.subParser('strikethrough', function (text, options, globals) {
	  'use strict';

	  if (options.strikethrough) {
	    text = globals.converter._dispatch('strikethrough.before', text, options, globals);
	    text = text.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, '<del>$1</del>');
	    text = globals.converter._dispatch('strikethrough.after', text, options, globals);
	  }

	  return text;
	});

	/**
	 * Strip any lines consisting only of spaces and tabs.
	 * This makes subsequent regexs easier to write, because we can
	 * match consecutive blank lines with /\n+/ instead of something
	 * contorted like /[ \t]*\n+/
	 */
	showdown.subParser('stripBlankLines', function (text) {
	  'use strict';
	  return text.replace(/^[ \t]+$/mg, '');
	});

	/**
	 * Strips link definitions from text, stores the URLs and titles in
	 * hash references.
	 * Link defs are in the form: ^[id]: url "optional title"
	 */
	showdown.subParser('stripLinkDefinitions', function (text, options, globals) {
	  'use strict';

	  var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;

	  // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
	  text += '~0';

	  text = text.replace(regex, function (wholeMatch, linkId, url, width, height, blankLines, title) {
	    linkId = linkId.toLowerCase();
	    globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url);  // Link IDs are case-insensitive

	    if (blankLines) {
	      // Oops, found blank lines, so it's not a title.
	      // Put back the parenthetical statement we stole.
	      return blankLines + title;

	    } else {
	      if (title) {
	        globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
	      }
	      if (options.parseImgDimensions && width && height) {
	        globals.gDimensions[linkId] = {
	          width:  width,
	          height: height
	        };
	      }
	    }
	    // Completely remove the definition from the text
	    return '';
	  });

	  // attacklab: strip sentinel
	  text = text.replace(/~0/, '');

	  return text;
	});

	showdown.subParser('tables', function (text, options, globals) {
	  'use strict';

	  if (!options.tables) {
	    return text;
	  }

	  var tableRgx = /^ {0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;

	  function parseStyles(sLine) {
	    if (/^:[ \t]*--*$/.test(sLine)) {
	      return ' style="text-align:left;"';
	    } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
	      return ' style="text-align:right;"';
	    } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
	      return ' style="text-align:center;"';
	    } else {
	      return '';
	    }
	  }

	  function parseHeaders(header, style) {
	    var id = '';
	    header = header.trim();
	    if (options.tableHeaderId) {
	      id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
	    }
	    header = showdown.subParser('spanGamut')(header, options, globals);

	    return '<th' + id + style + '>' + header + '</th>\n';
	  }

	  function parseCells(cell, style) {
	    var subText = showdown.subParser('spanGamut')(cell, options, globals);
	    return '<td' + style + '>' + subText + '</td>\n';
	  }

	  function buildTable(headers, cells) {
	    var tb = '<table>\n<thead>\n<tr>\n',
	        tblLgn = headers.length;

	    for (var i = 0; i < tblLgn; ++i) {
	      tb += headers[i];
	    }
	    tb += '</tr>\n</thead>\n<tbody>\n';

	    for (i = 0; i < cells.length; ++i) {
	      tb += '<tr>\n';
	      for (var ii = 0; ii < tblLgn; ++ii) {
	        tb += cells[i][ii];
	      }
	      tb += '</tr>\n';
	    }
	    tb += '</tbody>\n</table>\n';
	    return tb;
	  }

	  text = globals.converter._dispatch('tables.before', text, options, globals);

	  text = text.replace(tableRgx, function (rawTable) {

	    var i, tableLines = rawTable.split('\n');

	    // strip wrong first and last column if wrapped tables are used
	    for (i = 0; i < tableLines.length; ++i) {
	      if (/^ {0,3}\|/.test(tableLines[i])) {
	        tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
	      }
	      if (/\|[ \t]*$/.test(tableLines[i])) {
	        tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
	      }
	    }

	    var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim();}),
	        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim();}),
	        rawCells = [],
	        headers = [],
	        styles = [],
	        cells = [];

	    tableLines.shift();
	    tableLines.shift();

	    for (i = 0; i < tableLines.length; ++i) {
	      if (tableLines[i].trim() === '') {
	        continue;
	      }
	      rawCells.push(
	        tableLines[i]
	          .split('|')
	          .map(function (s) {
	            return s.trim();
	          })
	      );
	    }

	    if (rawHeaders.length < rawStyles.length) {
	      return rawTable;
	    }

	    for (i = 0; i < rawStyles.length; ++i) {
	      styles.push(parseStyles(rawStyles[i]));
	    }

	    for (i = 0; i < rawHeaders.length; ++i) {
	      if (showdown.helper.isUndefined(styles[i])) {
	        styles[i] = '';
	      }
	      headers.push(parseHeaders(rawHeaders[i], styles[i]));
	    }

	    for (i = 0; i < rawCells.length; ++i) {
	      var row = [];
	      for (var ii = 0; ii < headers.length; ++ii) {
	        if (showdown.helper.isUndefined(rawCells[i][ii])) {

	        }
	        row.push(parseCells(rawCells[i][ii], styles[ii]));
	      }
	      cells.push(row);
	    }

	    return buildTable(headers, cells);
	  });

	  text = globals.converter._dispatch('tables.after', text, options, globals);

	  return text;
	});

	/**
	 * Swap back in all the special characters we've hidden.
	 */
	showdown.subParser('unescapeSpecialChars', function (text) {
	  'use strict';

	  text = text.replace(/~E(\d+)E/g, function (wholeMatch, m1) {
	    var charCodeToReplace = parseInt(m1);
	    return String.fromCharCode(charCodeToReplace);
	  });
	  return text;
	});

	var root = this;

	// CommonJS/nodeJS Loader
	if (typeof module !== 'undefined' && module.exports) {
	  module.exports = showdown;

	// AMD Loader
	} else if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    'use strict';
	    return showdown;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	// Regular Browser loader
	} else {
	  root.showdown = showdown;
	}
	}).call(this);

	//# sourceMappingURL=showdown.js.map


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderJs = renderJs;
	var strReg1 = /"(.*?)"/g;
	var strReg2 = /'(.*?)'/g;
	var strReg3 = /`(.*?)`/g;

	var insideParen = /(.*?)/g;
	var methodReg = /\b(new|var|function|forEach|let|map|const|map|pop|push|split|join|replace|slice|filter|async|add|await|extends|document|window|Array|Object|String|Boolean|angular|React|indexOf|concat|match|toString|length|toObject|hasOwnProperty|includes|getElementsBy(TagName|ClassName|Name)|getElementById|typeof|instanceof|querySelector|querySelectorAll|\$)(?=[^\w])/g;
	var setReg = /\b(null|with|undefined)(?=[^\w])/g;
	var numberReg = /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/;
	var conditionReg = /\b(if|do|while|switch|for|in|break|case|return|export|default|import|from|delete|Throw|Error|try|yield|catch|as|implements|public)(?=[^\w])/g;
	var staticReg = /\b(get|continue|static|set|finally)(?=[^\w])/g;
	var otherReg = /\b(this|then)(?=[^\w])/g;
	var specialCommentReg = /(\/\*.*\*\/)/g;
	var inlineCommentReg = /(\/\/.*)/g;
	var htmlTagReg = /($lt;[^\&]*&gt;)/g;

	function renderJs(item) {
		var string = item.innerHTML || item.value;
		var parsed = string.replace(strReg1, '<span class="string">"$1"</span>');
		parsed = parsed.replace(strReg2, "<span class=\"string\">'$1'</span>");
		parsed = parsed.replace(strReg3, '<span class="string">`$1`</span>');
		parsed = parsed.replace(methodReg, '<span class="method">$1</span>');
		parsed = parsed.replace(setReg, '<span class="setter">$1</span>');
		parsed = parsed.replace(numberReg, '<span class="number">$1</span>');
		parsed = parsed.replace(conditionReg, '<span class="condition">$1</span>');
		parsed = parsed.replace(staticReg, '<span class="static">$1</span>');
		parsed = parsed.replace(otherReg, '<span class="other">$1</span>');

		return item.innerHTML = parsed;
	}

	// enum
	// number /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	//regex /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.single = single;

	var _jsParser = __webpack_require__(38);

	var _utils = __webpack_require__(3);

	function single() {

		var cache = {};

		var postContent = (0, _utils.cacheId)(cache, 'post-content');
		var ImageSrc = '../../../static/me.jpg';

		function renderPost() {
			document.body.addClass = 'is-loading';

			var newPostContent = postContent.innerText;
			postContent.innerHTML = newPostContent;

			var codeContent = (0, _utils.cacheQuery)(cache, '.js-markup');

			Array.prototype.forEach.call(codeContent, function (content) {
				content.innerHTML = (0, _jsParser.renderJs)(content);
			});

			postContent.innerHTML = postContent.innerHTML.split("~").join("<br />").split("#").join("<span class='indent'></span>");
		}

		function changeImage() {
			var sidenavImage = document.querySelectorAll('.sidenav-image');

			for (var i = 0; i < sidenavImage.length; i++) {
				var image = sidenavImage[i];

				image.src = "./../../static/me.jpg";
			}
		}

		renderPost();
		changeImage();
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.latest = latest;

	var _utils = __webpack_require__(3);

	function latest() {
		var postTitles = document.querySelectorAll('.latest-post-title');
		var postSections = document.querySelectorAll('.latest-post-section');

		function fixTitle(title) {
			title.textContent = title.textContent.split("-").join(" ");
		}

		for (var i = 0; i < postTitles.length; i++) {
			fixTitle(postTitles[i]);
		}

		for (var i = 0; i < postSections.length; i++) {
			fixTitle(postSections[i]);
		}
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.auth = auth;

	var _signup = __webpack_require__(42);

	var _login = __webpack_require__(44);

	function auth() {
		if (window.location.href.indexOf('signup') != -1) {
			(0, _signup.signup)();
		} else if (window.location.href.indexOf('login') != -1) {
			(0, _login.login)();
		}
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.signup = signup;

	var _axios = __webpack_require__(6);

	var _axios2 = _interopRequireDefault(_axios);

	var _utils = __webpack_require__(3);

	var _notifications = __webpack_require__(43);

	var _notifications2 = _interopRequireDefault(_notifications);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function signup() {
		var cache = {};

		var submitButton = (0, _utils.cacheId)(cache, 'signup-submit');
		var email = (0, _utils.cacheId)(cache, 'signup-email');
		var confirm = (0, _utils.cacheId)(cache, 'signup-confirm');
		var password = (0, _utils.cacheId)(cache, 'signup-password');
		var successContent = (0, _utils.cacheId)(cache, 'success-content');
		var failureContent = (0, _utils.cacheId)(cache, 'failure-content');

		var successNotify = new _notifications2.default({
			timeout: 1500,
			content: successContent,
			type: 'success'
		});

		var failureNotify = new _notifications2.default({
			timeout: 1500,
			content: failureContent,
			type: 'danger'
		});

		function validateEmail() {
			var input = email.value;
			var atpos = input.indexOf('@');
			var dotpos = input.lastIndexOf(".");

			if (atpos < 1 || dotpos - atpos < 2) {
				if (email.parentNode.classList.contains('email-valid')) {
					email.parentNode.classList.remove('email-valid');
				}

				email.parentNode.classList.add('email-invalid');
			} else {
				if (email.parentNode.classList.contains('email-invalid')) {
					email.parentNode.classList.remove('email-invalid');
				}

				email.parentNode.classList.add('email-valid');
			}
		}

		function validatePassword() {
			var confirmValue = confirm.value;
			var passwordValue = password.value;

			if (confirmValue != passwordValue) {
				if (confirm.parentNode.classList.contains('password-valid')) {
					confirm.parentNode.classList.remove('password-valid');
				}

				confirm.parentNode.classList.add('password-invalid');
			} else {
				if (confirm.parentNode.classList.contains('password-invalid')) {
					confirm.parentNode.classList.remove('password-invalid');
				}

				confirm.parentNode.classList.add('password-valid');
			}
		}

		function submit() {
			submitButton.classList.add('show-loading');

			var data = {};
			data.name = (0, _utils.cacheId)(cache, 'signup-name');
			data.username = (0, _utils.cacheId)(cache, 'signup-username');
			data.email = email;
			data.password = password;

			_axios2.default.post('http://localhost:3000/users', {
				name: data.name.value,
				username: data.username.value,
				email: data.email.value,
				password: data.password.value,

				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				submitButton.classList.remove("show-loading");

				if (response.data.success) {
					submitButton.classList.add('submit-success');
					var success = new Event('signed-up');
					window.dispatchEvent(success);
					removeEvents();
					window.localStorage.setItem('user', user);
					window.localStorage.setItem('blog-token', response.data.res.token);

					setTimeout(function () {
						window.location.href = '/';
					}, 500);
				} else {
					submitButton.classList.add('submit-failed');
					var failure = new Event('signup-fail');
					window.dispatchEvent(failure);
				}
			});
		}

		function removeEvents() {
			submitButton.removeEventListener('click', submit);
			email.removeEventListener('blur', validateEmail);
			email.removeEventListener('blur', validatePassword);
		}

		email.addEventListener('blur', validateEmail);
		confirm.addEventListener('blur', validatePassword);
		submitButton.addEventListener('click', submit);
		window.addEventListener('signed-up', successNotify.open);
		window.addEventListener('signup-fail', failureNotify.open);
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var notifications = function () {
		function notifications(options) {
			_classCallCheck(this, notifications);

			this.settings = {
				container: null,
				notification: null,
				timeout: 0,
				type: 'alert',
				content: "",
				posX: 'right',
				posY: 'bottom'
			};

			this.count = 0;
			this._applySettings(options);
			this.open = this._open.bind(this);
			this.close = this._close.bind(this);
		}

		_createClass(notifications, [{
			key: '_applySettings',
			value: function _applySettings(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					for (var i in options) {
						if (options.hasOwnProperty(i)) {
							this.settings[i] = options[i];
						}
					}
				}
			}
		}, {
			key: '_buildOut',
			value: function _buildOut() {
				var _container = document.createElement('div');
				var _contentHolder = document.createElement('div');
				var _content;

				_container.className = 'notification-container';
				_contentHolder.className = 'notification';

				this.settings.container = _container;
				this.settings.container.style.position = "fixed";

				if (this.settings.content === "string") {
					_content = this.settings.content;
				} else {
					_content = this.settings.content.innerHTML;
				}

				this._checkOptions(_contentHolder);

				_contentHolder.innerHTML = _content;
				this.settings.container.appendChild(_contentHolder);
				document.body.appendChild(this.settings.container);
			}
		}, {
			key: '_checkOptions',
			value: function _checkOptions(item) {
				switch (this.settings.type) {
					case "success":
						item.classList.add('success');
						break;
					case "danger":
						item.classList.add('danger');
						break;
					case "warning":
						item.classList.add('warning');
						break;
					default:
						item.classList.add('alert');
				}

				switch (this.settings.posX) {
					case "right":
						this.settings.container.style.right = 20 + "px";
						break;
					case "left":
						this.settings.container.style.left = 20 + "px";
						break;
					default:
						this.settings.container.style.right = 20 + "px";
				}

				switch (this.settings.posY) {
					case "top":
						this.settings.container.style.top = 20 + "px";
						break;
					case "bottom":
						this.settings.container.style.bottom = 20 + "px";
						break;
					default:
						this.settings.container.style.bottom = 20 + "px";
				}
			}
		}, {
			key: '_open',
			value: function _open() {
				var _this = this;

				var notifyId = "notification-" + this.count;
				this._buildOut.call(this);

				setTimeout(function () {
					_this.settings.container.classList.add('shown');
					_this.settings.container.setAttribute('id', notifyId);
				}, 100);

				if (this.settings.timeout > 0) {
					setTimeout(function () {
						_this.close(notifyId);
					}, this.settings.timeout);
				}

				this.count += 1;

				return notifyId;
			}
		}, {
			key: '_close',
			value: function _close(notificationId) {
				var notification = document.getElementById(notificationId);

				if (notification) {
					notification.classList.remove('shown');

					setTimeout(function () {
						notification.parentNode.removeChild(notification);
					}, 600);

					return true;
				} else {
					return false;
				}
			}
		}]);

		return notifications;
	}();

	exports.default = notifications;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.login = login;

	var _axios = __webpack_require__(6);

	var _axios2 = _interopRequireDefault(_axios);

	var _notifications = __webpack_require__(43);

	var _notifications2 = _interopRequireDefault(_notifications);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function login() {
		var loginEmail = document.getElementById('login-email');
		var loginPassword = document.getElementById('login-password');
		var loginButton = document.getElementById('login-submit');
		var successContent = document.getElementById('success-content');
		var failureContent = document.getElementById('failure-content');

		var successNotify = new _notifications2.default({
			content: successNotify,
			type: 'success',
			timeout: 1500
		});

		var failureNotify = new _notifications2.default({
			content: failureNotify,
			type: 'danger',
			timeout: 1500
		});

		function validateEmail() {
			var input = loginEmail.value;
			var atpos = input.indexOf('@');
			var dotpos = input.lastIndexOf('.');

			if (atpos < 1 || dotpos - atpos < 2) {
				if (loginEmail.parentNode.classList.contains('email-valid')) {
					loginEmail.parentNode.classList.remove('email-valid');
				}

				loginEmail.parentNode.classList.add('email-invalid');
			} else {
				if (loginEmail.parentNode.classList.contains('email-invalid')) {
					loginEmail.parentNode.classList.remove('email-invalid');
				}

				loginEmail.parentNode.classList.add('email-valid');
			}
		}

		function submit() {
			var data = {};
			data.email = loginEmail;
			data.password = loginPassword;

			loginButton.classList.add('show-loading');

			_axios2.default.post('http://localhost:3000/users/authenticate', {
				email: data.email.value,
				password: data.password.value,

				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				loginButton.classList.remove('show-loading');

				if (response.data.success) {
					loginButton.classList.add('loading-success');

					var success = new Event('login-success');
					var user = JSON.stringify(response.data.res.record);

					window.dispatchEvent(success);
					window.localStorage.setItem('user', user);
					window.localStorage.setItem('blog-token', response.data.res.token);

					removeEvents();

					window.location.href = '/admin';
				} else {
					loginButton.classList.add('loading-failed');

					var failure = new Event('login-failure');
					window.dispatchEvent(failure);
				}
			});
		}

		function removeEvents() {
			loginButton.removeEventListener('click', submit);
			loginEmail.removeEventListener('blur', validateEmail);
			window.removeEventListener('login-failure', failureNotify.open);
			window.removeEventListener('login-success', successNotify.open);
		}

		loginButton.addEventListener('click', submit);
		loginEmail.addEventListener('blur', validateEmail);
		window.addEventListener('login-failure', failureNotify);
		window.addEventListener('login-success', successNotify);
	}

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.authVisibility = authVisibility;
	exports.checkAuthRoute = checkAuthRoute;
	exports.checkLinks = checkLinks;
	exports.logout = logout;
	var unauthedLinks = document.querySelectorAll('.unauthed-link');
	var authedLinks = document.querySelectorAll('.authed-link');
	var logoutButton = document.getElementById('logout-button');

	function authVisibility(node) {
		;
		node.parentNode.removeChild(node);
	}

	function checkAuthRoute() {
		var token = checkToken();

		if (token) {
			return;
		} else {
			var notAuthorized = new Event('unauthorized');
			window.location.href = '/login';
			window.dispatchEvent(notAuthorized);
		}
	}

	function checkLinks() {
		var len = authedLinks.length;
		var len2 = unauthedLinks.length;

		if (loggedIn) {
			var i = void 0;
			var j = void 0;

			for (i = 0; i < len; i++) {
				authedLinks[i].classList.add('authed');
			}

			for (j = 0; j < len2; j++) {
				unauthedLinks[j].classList.add('authed');
			}

			logoutButton.addEventListener('click', logout, false);
		} else {
			var _i = void 0;
			var _j = void 0;

			for (_i = 0; _i < len; _i++) {
				authedLinks[_i].classList.remove('authed');
			}

			for (_j = 0; _j < len2; _j++) {
				unauthedLinks[_j].classList.remove('authed');
			}
		}
	}

	function checkToken() {
		var token = window.localStorage.getItem('blog-token');

		if (token) {
			return token;
		} else {
			return false;
		}
	}

	function logout() {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('blog-token');
	}

	var loggedIn = exports.loggedIn = checkToken();

/***/ }
/******/ ]);