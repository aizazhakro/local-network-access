/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/backo2/index.js":
/*!**************************************!*\
  !*** ./node_modules/backo2/index.js ***!
  \**************************************/
/***/ ((module) => {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),

/***/ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");


/***/ }),

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	let m;

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/globalThis.browser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/globalThis.browser.js ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();


/***/ }),

/***/ "./node_modules/engine.io-client/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Socket = __webpack_require__(/*! ./socket */ "./node_modules/engine.io-client/lib/socket.js");

module.exports = (uri, opts) => new Socket(uri, opts);

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

module.exports.Socket = Socket;
module.exports.protocol = Socket.protocol; // this is an int
module.exports.Transport = __webpack_require__(/*! ./transport */ "./node_modules/engine.io-client/lib/transport.js");
module.exports.transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
module.exports.parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");


/***/ }),

/***/ "./node_modules/engine.io-client/lib/socket.js":
/*!*****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/socket.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:socket");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
const { installTimerFunctions } = __webpack_require__(/*! ./util */ "./node_modules/engine.io-client/lib/util.js");

class Socket extends Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} options
   * @api public
   */
  constructor(uri, opts = {}) {
    super();

    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri(opts.host).host;
    }

    installTimerFunctions(this, opts);

    this.secure =
      null != opts.secure
        ? opts.secure
        : typeof location !== "undefined" && "https:" === location.protocol;

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? "443" : "80";
    }

    this.hostname =
      opts.hostname ||
      (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port =
      opts.port ||
      (typeof location !== "undefined" && location.port
        ? location.port
        : this.secure
        ? 443
        : 80);

    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;

    this.opts = Object.assign(
      {
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        jsonp: true,
        timestampParam: "t",
        rememberUpgrade: false,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: true
      },
      opts
    );

    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";

    if (typeof this.opts.query === "string") {
      this.opts.query = parseqs.decode(this.opts.query);
    }

    // set on handshake
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;

    // set on heartbeat
    this.pingTimeoutTimer = null;

    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
        // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
        // closed/reloaded)
        addEventListener(
          "beforeunload",
          () => {
            if (this.transport) {
              // silently close the transport
              this.transport.removeAllListeners();
              this.transport.close();
            }
          },
          false
        );
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close");
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }

    this.open();
  }

  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */
  createTransport(name) {
    debug('creating transport "%s"', name);
    const query = clone(this.opts.query);

    // append engine.io protocol identifier
    query.EIO = parser.protocol;

    // transport name
    query.transport = name;

    // session id if we already have one
    if (this.id) query.sid = this.id;

    const opts = Object.assign(
      {},
      this.opts.transportOptions[name],
      this.opts,
      {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      }
    );

    debug("options: %j", opts);

    return new transports[name](opts);
  }

  /**
   * Initializes transport to use and starts probe.
   *
   * @api private
   */
  open() {
    let transport;
    if (
      this.opts.rememberUpgrade &&
      Socket.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
    ) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      this.setTimeoutFn(() => {
        this.emit("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";

    // Retry with the next transport if the transport is disabled (jsonp: false)
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      debug("error while creating transport: %s", e);
      this.transports.shift();
      this.open();
      return;
    }

    transport.open();
    this.setTransport(transport);
  }

  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @api private
   */
  setTransport(transport) {
    debug("setting transport %s", transport.name);

    if (this.transport) {
      debug("clearing existing transport %s", this.transport.name);
      this.transport.removeAllListeners();
    }

    // set up transport
    this.transport = transport;

    // set up transport listeners
    transport
      .on("drain", this.onDrain.bind(this))
      .on("packet", this.onPacket.bind(this))
      .on("error", this.onError.bind(this))
      .on("close", () => {
        this.onClose("transport close");
      });
  }

  /**
   * Probes a transport.
   *
   * @param {String} transport name
   * @api private
   */
  probe(name) {
    debug('probing transport "%s"', name);
    let transport = this.createTransport(name, { probe: 1 });
    let failed = false;

    Socket.priorWebsocketSuccess = false;

    const onTransportOpen = () => {
      if (failed) return;

      debug('probe transport "%s" opened', name);
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", msg => {
        if (failed) return;
        if ("pong" === msg.type && "probe" === msg.data) {
          debug('probe transport "%s" pong', name);
          this.upgrading = true;
          this.emit("upgrading", transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;

          debug('pausing current transport "%s"', this.transport.name);
          this.transport.pause(() => {
            if (failed) return;
            if ("closed" === this.readyState) return;
            debug("changing transport and sending upgrade packet");

            cleanup();

            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emit("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          debug('probe transport "%s" failed', name);
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emit("upgradeError", err);
        }
      });
    };

    function freezeTransport() {
      if (failed) return;

      // Any callback called by transport should be ignored since now
      failed = true;

      cleanup();

      transport.close();
      transport = null;
    }

    // Handle any error that happens while probing
    const onerror = err => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;

      freezeTransport();

      debug('probe transport "%s" failed because of error: %s', name, err);

      this.emit("upgradeError", error);
    };

    function onTransportClose() {
      onerror("transport closed");
    }

    // When the socket is closed while we're probing
    function onclose() {
      onerror("socket closed");
    }

    // When the socket is upgraded while we're probing
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        debug('"%s" works - aborting "%s"', to.name, transport.name);
        freezeTransport();
      }
    }

    // Remove all listeners on the transport and on self
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.removeListener("close", onclose);
      this.removeListener("upgrading", onupgrade);
    };

    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);

    this.once("close", onclose);
    this.once("upgrading", onupgrade);

    transport.open();
  }

  /**
   * Called when connection is deemed open.
   *
   * @api public
   */
  onOpen() {
    debug("socket open");
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emit("open");
    this.flush();

    // we check for `readyState` in case an `open`
    // listener already closed the socket
    if (
      "open" === this.readyState &&
      this.opts.upgrade &&
      this.transport.pause
    ) {
      debug("starting upgrade probes");
      let i = 0;
      const l = this.upgrades.length;
      for (; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  }

  /**
   * Handles a packet.
   *
   * @api private
   */
  onPacket(packet) {
    if (
      "opening" === this.readyState ||
      "open" === this.readyState ||
      "closing" === this.readyState
    ) {
      debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

      this.emit("packet", packet);

      // Socket is live - any packet counts
      this.emit("heartbeat");

      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;

        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emit("ping");
          this.emit("pong");
          break;

        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;

        case "message":
          this.emit("data", packet.data);
          this.emit("message", packet.data);
          break;
      }
    } else {
      debug('packet received with socket readyState "%s"', this.readyState);
    }
  }

  /**
   * Called upon handshake completion.
   *
   * @param {Object} handshake obj
   * @api private
   */
  onHandshake(data) {
    this.emit("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    // In case open handler closes socket
    if ("closed" === this.readyState) return;
    this.resetPingTimeout();
  }

  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @api private
   */
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }

  /**
   * Called on `drain` event
   *
   * @api private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);

    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this.prevBufferLen = 0;

    if (0 === this.writeBuffer.length) {
      this.emit("drain");
    } else {
      this.flush();
    }
  }

  /**
   * Flush write buffers.
   *
   * @api private
   */
  flush() {
    if (
      "closed" !== this.readyState &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      debug("flushing %d packets in socket", this.writeBuffer.length);
      this.transport.send(this.writeBuffer);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this.prevBufferLen = this.writeBuffer.length;
      this.emit("flush");
    }
  }

  /**
   * Sends a message.
   *
   * @param {String} message.
   * @param {Function} callback function.
   * @param {Object} options.
   * @return {Socket} for chaining.
   * @api public
   */
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }

  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }

  /**
   * Sends a packet.
   *
   * @param {String} packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} callback function.
   * @api private
   */
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = undefined;
    }

    if ("function" === typeof options) {
      fn = options;
      options = null;
    }

    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }

    options = options || {};
    options.compress = false !== options.compress;

    const packet = {
      type: type,
      data: data,
      options: options
    };
    this.emit("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }

  /**
   * Closes the connection.
   *
   * @api private
   */
  close() {
    const close = () => {
      this.onClose("forced close");
      debug("socket closing - telling transport to close");
      this.transport.close();
    };

    const cleanupAndClose = () => {
      this.removeListener("upgrade", cleanupAndClose);
      this.removeListener("upgradeError", cleanupAndClose);
      close();
    };

    const waitForUpgrade = () => {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };

    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";

      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }

    return this;
  }

  /**
   * Called upon transport error
   *
   * @api private
   */
  onError(err) {
    debug("socket error %j", err);
    Socket.priorWebsocketSuccess = false;
    this.emit("error", err);
    this.onClose("transport error", err);
  }

  /**
   * Called upon transport close.
   *
   * @api private
   */
  onClose(reason, desc) {
    if (
      "opening" === this.readyState ||
      "open" === this.readyState ||
      "closing" === this.readyState
    ) {
      debug('socket close with reason: "%s"', reason);

      // clear timers
      this.clearTimeoutFn(this.pingIntervalTimer);
      this.clearTimeoutFn(this.pingTimeoutTimer);

      // stop event from firing again for transport
      this.transport.removeAllListeners("close");

      // ensure transport won't stay open
      this.transport.close();

      // ignore further transport communication
      this.transport.removeAllListeners();

      if (typeof removeEventListener === "function") {
        removeEventListener("offline", this.offlineEventListener, false);
      }

      // set ready state
      this.readyState = "closed";

      // clear session id
      this.id = null;

      // emit close event
      this.emit("close", reason, desc);

      // clean buffers after, so users can still
      // grab the buffers on `close` event
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }

  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} server upgrades
   * @api private
   *
   */
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i = 0;
    const j = upgrades.length;
    for (; i < j; i++) {
      if (~this.transports.indexOf(upgrades[i]))
        filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  }
}

Socket.priorWebsocketSuccess = false;

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

function clone(obj) {
  const o = {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

module.exports = Socket;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transport.js":
/*!********************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transport.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const { installTimerFunctions } = __webpack_require__(/*! ./util */ "./node_modules/engine.io-client/lib/util.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:transport");

class Transport extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */
  constructor(opts) {
    super();
    installTimerFunctions(this, opts);

    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }

  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api public
   */
  onError(msg, desc) {
    const err = new Error(msg);
    err.type = "TransportError";
    err.description = desc;
    this.emit("error", err);
    return this;
  }

  /**
   * Opens the transport.
   *
   * @api public
   */
  open() {
    if ("closed" === this.readyState || "" === this.readyState) {
      this.readyState = "opening";
      this.doOpen();
    }

    return this;
  }

  /**
   * Closes the transport.
   *
   * @api private
   */
  close() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  }

  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   * @api private
   */
  send(packets) {
    if ("open" === this.readyState) {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
      debug("transport is not open, discarding packets");
    }
  }

  /**
   * Called upon open
   *
   * @api private
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    this.emit("open");
  }

  /**
   * Called with data.
   *
   * @param {String} data
   * @api private
   */
  onData(data) {
    const packet = parser.decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }

  /**
   * Called with a decoded packet.
   */
  onPacket(packet) {
    this.emit("packet", packet);
  }

  /**
   * Called upon close.
   *
   * @api private
   */
  onClose() {
    this.readyState = "closed";
    this.emit("close");
  }
}

module.exports = Transport;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
const XHR = __webpack_require__(/*! ./polling-xhr */ "./node_modules/engine.io-client/lib/transports/polling-xhr.js");
const JSONP = __webpack_require__(/*! ./polling-jsonp */ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js");
const websocket = __webpack_require__(/*! ./websocket */ "./node_modules/engine.io-client/lib/transports/websocket.js");

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts) {
  let xhr;
  let xd = false;
  let xs = false;
  const jsonp = false !== opts.jsonp;

  if (typeof location !== "undefined") {
    const isSSL = "https:" === location.protocol;
    let port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ("open" in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error("JSONP disabled");
    return new JSONP(opts);
  }
}


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-jsonp.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

const rNewline = /\n/g;
const rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

let callbacks;

class JSONPPolling extends Polling {
  /**
   * JSONP Polling constructor.
   *
   * @param {Object} opts.
   * @api public
   */
  constructor(opts) {
    super(opts);

    this.query = this.query || {};

    // define global callbacks array if not present
    // we do this here (lazily) to avoid unneeded global pollution
    if (!callbacks) {
      // we need to consider multiple engines in the same page
      callbacks = globalThis.___eio = globalThis.___eio || [];
    }

    // callback identifier
    this.index = callbacks.length;

    // add callback to jsonp global
    callbacks.push(this.onData.bind(this));

    // append to query string
    this.query.j = this.index;
  }

  /**
   * JSONP only supports binary as base64 encoded strings
   */
  get supportsBinary() {
    return false;
  }

  /**
   * Closes the socket.
   *
   * @api private
   */
  doClose() {
    if (this.script) {
      // prevent spurious errors from being emitted when the window is unloaded
      this.script.onerror = () => {};
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    if (this.form) {
      this.form.parentNode.removeChild(this.form);
      this.form = null;
      this.iframe = null;
    }

    super.doClose();
  }

  /**
   * Starts a poll cycle.
   *
   * @api private
   */
  doPoll() {
    const script = document.createElement("script");

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.uri();
    script.onerror = e => {
      this.onError("jsonp poll error", e);
    };

    const insertAt = document.getElementsByTagName("script")[0];
    if (insertAt) {
      insertAt.parentNode.insertBefore(script, insertAt);
    } else {
      (document.head || document.body).appendChild(script);
    }
    this.script = script;

    const isUAgecko =
      "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);

    if (isUAgecko) {
      this.setTimeoutFn(function() {
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  }

  /**
   * Writes with a hidden iframe.
   *
   * @param {String} data to send
   * @param {Function} called upon flush.
   * @api private
   */
  doWrite(data, fn) {
    let iframe;

    if (!this.form) {
      const form = document.createElement("form");
      const area = document.createElement("textarea");
      const id = (this.iframeId = "eio_iframe_" + this.index);

      form.className = "socketio";
      form.style.position = "absolute";
      form.style.top = "-1000px";
      form.style.left = "-1000px";
      form.target = id;
      form.method = "POST";
      form.setAttribute("accept-charset", "utf-8");
      area.name = "d";
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.uri();

    function complete() {
      initIframe();
      fn();
    }

    const initIframe = () => {
      if (this.iframe) {
        try {
          this.form.removeChild(this.iframe);
        } catch (e) {
          this.onError("jsonp polling iframe removal error", e);
        }
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        const html = '<iframe src="javascript:0" name="' + this.iframeId + '">';
        iframe = document.createElement(html);
      } catch (e) {
        iframe = document.createElement("iframe");
        iframe.name = this.iframeId;
        iframe.src = "javascript:0";
      }

      iframe.id = this.iframeId;

      this.form.appendChild(iframe);
      this.iframe = iframe;
    };

    initIframe();

    // escape \n to prevent it from being converted into \r\n by some UAs
    // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
    data = data.replace(rEscapedNewline, "\\\n");
    this.area.value = data.replace(rNewline, "\\n");

    try {
      this.form.submit();
    } catch (e) {}

    if (this.iframe.attachEvent) {
      this.iframe.onreadystatechange = () => {
        if (this.iframe.readyState === "complete") {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  }
}

module.exports = JSONPPolling;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-xhr.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-xhr.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global attachEvent */

const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
const Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const { pick, installTimerFunctions } = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js");
const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling-xhr");

/**
 * Empty function
 */

function empty() {}

const hasXHR2 = (function() {
  const xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

class XHR extends Polling {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */
  constructor(opts) {
    super(opts);

    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      this.xd =
        (typeof location !== "undefined" &&
          opts.hostname !== location.hostname) ||
        port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    /**
     * XHR supports binary
     */
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }

  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
    return new Request(this.uri(), opts);
  }

  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @api private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data: data
    });
    req.on("success", fn);
    req.on("error", err => {
      this.onError("xhr post error", err);
    });
  }

  /**
   * Starts a poll cycle.
   *
   * @api private
   */
  doPoll() {
    debug("xhr poll");
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", err => {
      this.onError("xhr poll error", err);
    });
    this.pollXhr = req;
  }
}

class Request extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */
  constructor(uri, opts) {
    super();
    installTimerFunctions(this, opts);
    this.opts = opts;

    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = false !== opts.async;
    this.data = undefined !== opts.data ? opts.data : null;

    this.create();
  }

  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */
  create() {
    const opts = pick(
      this.opts,
      "agent",
      "enablesXDR",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref"
    );
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;

    const xhr = (this.xhr = new XMLHttpRequest(opts));

    try {
      debug("xhr open %s: %s", this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}

      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }

      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {}

      // ie6 check
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }

      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }

      if (this.hasXDR()) {
        xhr.onload = () => {
          this.onLoad();
        };
        xhr.onerror = () => {
          this.onError(xhr.responseText);
        };
      } else {
        xhr.onreadystatechange = () => {
          if (4 !== xhr.readyState) return;
          if (200 === xhr.status || 1223 === xhr.status) {
            this.onLoad();
          } else {
            // make sure the `error` event handler that's user-set
            // does not throw in the same tick and gets caught here
            this.setTimeoutFn(() => {
              this.onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
      }

      debug("xhr data %s", this.data);
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly from the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }

    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }

  /**
   * Called upon successful response.
   *
   * @api private
   */
  onSuccess() {
    this.emit("success");
    this.cleanup();
  }

  /**
   * Called if we have data.
   *
   * @api private
   */
  onData(data) {
    this.emit("data", data);
    this.onSuccess();
  }

  /**
   * Called upon error.
   *
   * @api private
   */
  onError(err) {
    this.emit("error", err);
    this.cleanup(true);
  }

  /**
   * Cleans up house.
   *
   * @api private
   */
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    // xmlhttprequest
    if (this.hasXDR()) {
      this.xhr.onload = this.xhr.onerror = empty;
    } else {
      this.xhr.onreadystatechange = empty;
    }

    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }

    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }

    this.xhr = null;
  }

  /**
   * Called upon load.
   *
   * @api private
   */
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.onData(data);
    }
  }

  /**
   * Check if it has XDomainRequest.
   *
   * @api private
   */
  hasXDR() {
    return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
  }

  /**
   * Aborts the request.
   *
   * @api public
   */
  abort() {
    this.cleanup();
  }
}

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}

function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

module.exports = XHR;
module.exports.Request = Request;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling");

class Polling extends Transport {
  /**
   * Transport name.
   */
  get name() {
    return "polling";
  }

  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @api private
   */
  doOpen() {
    this.poll();
  }

  /**
   * Pauses polling.
   *
   * @param {Function} callback upon buffers are flushed and transport is paused
   * @api private
   */
  pause(onPause) {
    this.readyState = "pausing";

    const pause = () => {
      debug("paused");
      this.readyState = "paused";
      onPause();
    };

    if (this.polling || !this.writable) {
      let total = 0;

      if (this.polling) {
        debug("we are currently polling - waiting to pause");
        total++;
        this.once("pollComplete", function() {
          debug("pre-pause polling complete");
          --total || pause();
        });
      }

      if (!this.writable) {
        debug("we are currently writing - waiting to pause");
        total++;
        this.once("drain", function() {
          debug("pre-pause writing complete");
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }

  /**
   * Starts polling cycle.
   *
   * @api public
   */
  poll() {
    debug("polling");
    this.polling = true;
    this.doPoll();
    this.emit("poll");
  }

  /**
   * Overloads onData to detect payloads.
   *
   * @api private
   */
  onData(data) {
    debug("polling got data %s", data);
    const callback = packet => {
      // if its the first message we consider the transport open
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }

      // if its a close packet, we close the ongoing requests
      if ("close" === packet.type) {
        this.onClose();
        return false;
      }

      // otherwise bypass onData and handle the message
      this.onPacket(packet);
    };

    // decode payload
    parser.decodePayload(data, this.socket.binaryType).forEach(callback);

    // if an event did not trigger closing
    if ("closed" !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emit("pollComplete");

      if ("open" === this.readyState) {
        this.poll();
      } else {
        debug('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  }

  /**
   * For polling, send a close packet.
   *
   * @api private
   */
  doClose() {
    const close = () => {
      debug("writing close packet");
      this.write([{ type: "close" }]);
    };

    if ("open" === this.readyState) {
      debug("transport open - closing");
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      debug("transport not open - deferring close");
      this.once("open", close);
    }
  }

  /**
   * Writes a packets payload.
   *
   * @param {Array} data packets
   * @param {Function} drain callback
   * @api private
   */
  write(packets) {
    this.writable = false;

    parser.encodePayload(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emit("drain");
      });
    });
  }

  /**
   * Generates uri for connection.
   *
   * @api private
   */
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = "";

    // cache busting is forced
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // avoid port if default for schema
    if (
      this.opts.port &&
      (("https" === schema && Number(this.opts.port) !== 443) ||
        ("http" === schema && Number(this.opts.port) !== 80))
    ) {
      port = ":" + this.opts.port;
    }

    // prepend ? to query
    if (query.length) {
      query = "?" + query;
    }

    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return (
      schema +
      "://" +
      (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      port +
      this.opts.path +
      query
    );
  }
}

module.exports = Polling;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");
const nextTick = (() => {
  const isPromiseAvailable =
    typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return cb => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();

module.exports = {
  WebSocket: globalThis.WebSocket || globalThis.MozWebSocket,
  usingBrowserWebSocket: true,
  defaultBinaryType: "arraybuffer",
  nextTick
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/websocket.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
const yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");
const { pick } = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js");
const {
  WebSocket,
  usingBrowserWebSocket,
  defaultBinaryType,
  nextTick
} = __webpack_require__(/*! ./websocket-constructor */ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:websocket");

// detect ReactNative environment
const isReactNative =
  typeof navigator !== "undefined" &&
  typeof navigator.product === "string" &&
  navigator.product.toLowerCase() === "reactnative";

class WS extends Transport {
  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */
  constructor(opts) {
    super(opts);

    this.supportsBinary = !opts.forceBase64;
  }

  /**
   * Transport name.
   *
   * @api public
   */
  get name() {
    return "websocket";
  }

  /**
   * Opens socket.
   *
   * @api private
   */
  doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    const uri = this.uri();
    const protocols = this.opts.protocols;

    // React Native only supports the 'headers' option, and will print a warning if anything else is passed
    const opts = isReactNative
      ? {}
      : pick(
          this.opts,
          "agent",
          "perMessageDeflate",
          "pfx",
          "key",
          "passphrase",
          "cert",
          "ca",
          "ciphers",
          "rejectUnauthorized",
          "localAddress",
          "protocolVersion",
          "origin",
          "maxPayload",
          "family",
          "checkServerIdentity"
        );

    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }

    try {
      this.ws =
        usingBrowserWebSocket && !isReactNative
          ? protocols
            ? new WebSocket(uri, protocols)
            : new WebSocket(uri)
          : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emit("error", err);
    }

    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;

    this.addEventListeners();
  }

  /**
   * Adds event listeners to the socket
   *
   * @api private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = this.onClose.bind(this);
    this.ws.onmessage = ev => this.onData(ev.data);
    this.ws.onerror = e => this.onError("websocket error", e);
  }

  /**
   * Writes data to socket.
   *
   * @param {Array} array of packets.
   * @api private
   */
  write(packets) {
    this.writable = false;

    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;

      parser.encodePacket(packet, this.supportsBinary, data => {
        // always create a new object (GH-437)
        const opts = {};
        if (!usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (this.opts.perMessageDeflate) {
            const len =
              "string" === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {
          debug("websocket closed before onclose event");
        }

        if (lastPacket) {
          // fake drain
          // defer to next tick to allow Socket to clear writeBuffer
          nextTick(() => {
            this.writable = true;
            this.emit("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }

  /**
   * Called upon close
   *
   * @api private
   */
  onClose() {
    Transport.prototype.onClose.call(this);
  }

  /**
   * Closes socket.
   *
   * @api private
   */
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Generates uri for connection.
   *
   * @api private
   */
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = "";

    // avoid port if default for schema
    if (
      this.opts.port &&
      (("wss" === schema && Number(this.opts.port) !== 443) ||
        ("ws" === schema && Number(this.opts.port) !== 80))
    ) {
      port = ":" + this.opts.port;
    }

    // append timestamp to URI
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // prepend ? to query
    if (query.length) {
      query = "?" + query;
    }

    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return (
      schema +
      "://" +
      (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      port +
      this.opts.path +
      query
    );
  }

  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @api public
   */
  check() {
    return (
      !!WebSocket &&
      !("__initialize" in WebSocket && this.name === WS.prototype.name)
    );
  }
}

module.exports = WS;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/util.js":
/*!***************************************************!*\
  !*** ./node_modules/engine.io-client/lib/util.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const globalThis = __webpack_require__(/*! ./globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

module.exports.pick = (obj, ...attr) => {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
};

// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;

module.exports.installTimerFunctions = (obj, opts) => {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis);
  } else {
    obj.setTimeoutFn = setTimeout.bind(globalThis);
    obj.clearTimeoutFn = clearTimeout.bind(globalThis);
  }
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/xmlhttprequest.js":
/*!*************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/xmlhttprequest.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// browser shim for xmlhttprequest module

const hasCORS = __webpack_require__(/*! has-cors */ "./node_modules/has-cors/index.js");
const globalThis = __webpack_require__(/*! ./globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

module.exports = function(opts) {
  const xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  const xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  const enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ("undefined" !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new globalThis[["Active"].concat("Object").join("X")](
        "Microsoft.XMLHTTP"
      );
    } catch (e) {}
  }
};


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/commons.js":
/*!******************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/commons.js ***!
  \******************************************************/
/***/ ((module) => {

const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";

const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});

const ERROR_PACKET = { type: "error", data: "parser error" };

module.exports = {
  PACKET_TYPES,
  PACKET_TYPES_REVERSE,
  ERROR_PACKET
};


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/decodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/decodePacket.browser.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { PACKET_TYPES_REVERSE, ERROR_PACKET } = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js");

const withNativeArrayBuffer = typeof ArrayBuffer === "function";

let base64decoder;
if (withNativeArrayBuffer) {
  base64decoder = __webpack_require__(/*! base64-arraybuffer */ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js");
}

const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1
    ? {
        type: PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1)
      }
    : {
        type: PACKET_TYPES_REVERSE[type]
      };
};

const decodeBase64Packet = (data, binaryType) => {
  if (base64decoder) {
    const decoded = base64decoder.decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data }; // fallback for old browsers
  }
};

const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;
    case "arraybuffer":
    default:
      return data; // assuming the data is already an ArrayBuffer
  }
};

module.exports = decodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/encodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/encodePacket.browser.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { PACKET_TYPES } = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js");

const withNativeBlob =
  typeof Blob === "function" ||
  (typeof Blob !== "undefined" &&
    Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";

// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
  return typeof ArrayBuffer.isView === "function"
    ? ArrayBuffer.isView(obj)
    : obj && obj.buffer instanceof ArrayBuffer;
};

const encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (
    withNativeArrayBuffer &&
    (data instanceof ArrayBuffer || isView(data))
  ) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  // plain string
  return callback(PACKET_TYPES[type] + (data || ""));
};

const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + content);
  };
  return fileReader.readAsDataURL(data);
};

module.exports = encodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const encodePacket = __webpack_require__(/*! ./encodePacket */ "./node_modules/engine.io-parser/lib/encodePacket.browser.js");
const decodePacket = __webpack_require__(/*! ./decodePacket */ "./node_modules/engine.io-parser/lib/decodePacket.browser.js");

const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

const encodePayload = (packets, callback) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;

  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    encodePacket(packet, false, encodedPacket => {
      encodedPackets[i] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};

const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = decodePacket(encodedPackets[i], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};

module.exports = {
  protocol: 4,
  encodePacket,
  encodePayload,
  decodePacket,
  decodePayload
};


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/has-cors/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-cors/index.js ***!
  \****************************************/
/***/ ((module) => {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/parseqs/index.js":
/*!***************************************!*\
  !*** ./node_modules/parseqs/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),

/***/ "./node_modules/parseuri/index.js":
/*!****************************************!*\
  !*** ./node_modules/parseuri/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);

    return uri;
};

function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }

    return names;
}

function queryKey(uri, query) {
    var data = {};

    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });

    return data;
}


/***/ }),

/***/ "./node_modules/scv-connector-base/dist/scv-connector-base.js":
/*!********************************************************************!*\
  !*** ./node_modules/scv-connector-base/dist/scv-connector-base.js ***!
  \********************************************************************/
/***/ (function(module) {

/*! For license information please see scv-connector-base.js.LICENSE.txt */
!function(e,t){ true?module.exports=t():0}(this,(()=>(()=>{var e={633:(e,t,E)=>{var a=E(738).default;function n(){"use strict";e.exports=n=function(){return E},e.exports.__esModule=!0,e.exports.default=e.exports;var t,E={},r=Object.prototype,_=r.hasOwnProperty,T=Object.defineProperty||function(e,t,E){e[t]=E.value},i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",A=i.toStringTag||"@@toStringTag";function l(e,t,E){return Object.defineProperty(e,t,{value:E,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(t){l=function(e,t,E){return e[t]=E}}function c(e,t,E,a){var n=t&&t.prototype instanceof u?t:u,r=Object.create(n.prototype),_=new U(a||[]);return T(r,"_invoke",{value:f(e,E,_)}),r}function C(e,t,E){try{return{type:"normal",arg:e.call(t,E)}}catch(e){return{type:"throw",arg:e}}}E.wrap=c;var N="suspendedStart",O="suspendedYield",R="executing",S="completed",I={};function u(){}function P(){}function d(){}var L={};l(L,o,(function(){return this}));var p=Object.getPrototypeOf,D=p&&p(p(g([])));D&&D!==r&&_.call(D,o)&&(L=D);var h=d.prototype=u.prototype=Object.create(L);function V(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function v(e,t){function E(n,r,T,i){var o=C(e[n],e,r);if("throw"!==o.type){var s=o.arg,A=s.value;return A&&"object"==a(A)&&_.call(A,"__await")?t.resolve(A.__await).then((function(e){E("next",e,T,i)}),(function(e){E("throw",e,T,i)})):t.resolve(A).then((function(e){s.value=e,T(s)}),(function(e){return E("throw",e,T,i)}))}i(o.arg)}var n;T(this,"_invoke",{value:function(e,a){function r(){return new t((function(t,n){E(e,a,t,n)}))}return n=n?n.then(r,r):r()}})}function f(e,E,a){var n=N;return function(r,_){if(n===R)throw Error("Generator is already running");if(n===S){if("throw"===r)throw _;return{value:t,done:!0}}for(a.method=r,a.arg=_;;){var T=a.delegate;if(T){var i=G(T,a);if(i){if(i===I)continue;return i}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(n===N)throw n=S,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);n=R;var o=C(e,E,a);if("normal"===o.type){if(n=a.done?S:O,o.arg===I)continue;return{value:o.arg,done:a.done}}"throw"===o.type&&(n=S,a.method="throw",a.arg=o.arg)}}}function G(e,E){var a=E.method,n=e.iterator[a];if(n===t)return E.delegate=null,"throw"===a&&e.iterator.return&&(E.method="return",E.arg=t,G(e,E),"throw"===E.method)||"return"!==a&&(E.method="throw",E.arg=new TypeError("The iterator does not provide a '"+a+"' method")),I;var r=C(n,e.iterator,E.arg);if("throw"===r.type)return E.method="throw",E.arg=r.arg,E.delegate=null,I;var _=r.arg;return _?_.done?(E[e.resultName]=_.value,E.next=e.nextLoc,"return"!==E.method&&(E.method="next",E.arg=t),E.delegate=null,I):_:(E.method="throw",E.arg=new TypeError("iterator result is not an object"),E.delegate=null,I)}function b(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function Y(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function U(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(b,this),this.reset(!0)}function g(e){if(e||""===e){var E=e[o];if(E)return E.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function E(){for(;++n<e.length;)if(_.call(e,n))return E.value=e[n],E.done=!1,E;return E.value=t,E.done=!0,E};return r.next=r}}throw new TypeError(a(e)+" is not iterable")}return P.prototype=d,T(h,"constructor",{value:d,configurable:!0}),T(d,"constructor",{value:P,configurable:!0}),P.displayName=l(d,A,"GeneratorFunction"),E.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===P||"GeneratorFunction"===(t.displayName||t.name))},E.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,l(e,A,"GeneratorFunction")),e.prototype=Object.create(h),e},E.awrap=function(e){return{__await:e}},V(v.prototype),l(v.prototype,s,(function(){return this})),E.AsyncIterator=v,E.async=function(e,t,a,n,r){void 0===r&&(r=Promise);var _=new v(c(e,t,a,n),r);return E.isGeneratorFunction(t)?_:_.next().then((function(e){return e.done?e.value:_.next()}))},V(h),l(h,A,"Generator"),l(h,o,(function(){return this})),l(h,"toString",(function(){return"[object Generator]"})),E.keys=function(e){var t=Object(e),E=[];for(var a in t)E.push(a);return E.reverse(),function e(){for(;E.length;){var a=E.pop();if(a in t)return e.value=a,e.done=!1,e}return e.done=!0,e}},E.values=g,U.prototype={constructor:U,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(Y),!e)for(var E in this)"t"===E.charAt(0)&&_.call(this,E)&&!isNaN(+E.slice(1))&&(this[E]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var E=this;function a(a,n){return T.type="throw",T.arg=e,E.next=a,n&&(E.method="next",E.arg=t),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n],T=r.completion;if("root"===r.tryLoc)return a("end");if(r.tryLoc<=this.prev){var i=_.call(r,"catchLoc"),o=_.call(r,"finallyLoc");if(i&&o){if(this.prev<r.catchLoc)return a(r.catchLoc,!0);if(this.prev<r.finallyLoc)return a(r.finallyLoc)}else if(i){if(this.prev<r.catchLoc)return a(r.catchLoc,!0)}else{if(!o)throw Error("try statement without catch or finally");if(this.prev<r.finallyLoc)return a(r.finallyLoc)}}}},abrupt:function(e,t){for(var E=this.tryEntries.length-1;E>=0;--E){var a=this.tryEntries[E];if(a.tryLoc<=this.prev&&_.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var n=a;break}}n&&("break"===e||"continue"===e)&&n.tryLoc<=t&&t<=n.finallyLoc&&(n=null);var r=n?n.completion:{};return r.type=e,r.arg=t,n?(this.method="next",this.next=n.finallyLoc,I):this.complete(r)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),I},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var E=this.tryEntries[t];if(E.finallyLoc===e)return this.complete(E.completion,E.afterLoc),Y(E),I}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var E=this.tryEntries[t];if(E.tryLoc===e){var a=E.completion;if("throw"===a.type){var n=a.arg;Y(E)}return n}}throw Error("illegal catch attempt")},delegateYield:function(e,E,a){return this.delegate={iterator:g(e),resultName:E,nextLoc:a},"next"===this.method&&(this.arg=t),I}},E}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},738:e=>{function t(E){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(E)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},756:(e,t,E)=>{var a=E(633)();e.exports=a;try{regeneratorRuntime=a}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=a:Function("r","regeneratorRuntime = r")(a)}}},t={};function E(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,E),r.exports}E.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return E.d(t,{a:t}),t},E.d=(e,t)=>{for(var a in t)E.o(t,a)&&!E.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},E.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),E.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};return(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t){var E=function(t){if("object"!=e(t)||!t)return t;var E=t[Symbol.toPrimitive];if(void 0!==E){var a=E.call(t,"string");if("object"!=e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(E)?E:E+""}function n(e,E,a){return(E=t(E))in e?Object.defineProperty(e,E,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[E]=a,e}function r(e,t,E,a,n,r,_){try{var T=e[r](_),i=T.value}catch(e){return void E(e)}T.done?t(i):Promise.resolve(i).then(a,n)}function _(e){return function(){var t=this,E=arguments;return new Promise((function(a,n){var _=e.apply(t,E);function T(e){r(_,a,n,T,i,"next",e)}function i(e){r(_,a,n,T,i,"throw",e)}T(void 0)}))}}E.r(a),E.d(a,{ACWInfo:()=>he,ActiveCallsResult:()=>B,AgentConfig:()=>K,AgentConfigResult:()=>W,AgentStatusInfo:()=>Ne,AgentVendorStatusInfo:()=>Oe,AgentWork:()=>Ce,AudioDevicesResult:()=>x,AudioStats:()=>Ie,AudioStatsElement:()=>ue,CallInfo:()=>Te,CallResult:()=>$,Constants:()=>m,Contact:()=>ie,ContactsFilter:()=>De,ContactsResult:()=>X,CustomError:()=>H,DialOptions:()=>Ee,GenericResult:()=>ae,HangupResult:()=>z,HidDevice:()=>k,HoldToggleResult:()=>Z,InitResult:()=>te,LogoutResult:()=>_e,MuteToggleResult:()=>w,ParticipantResult:()=>Q,Phone:()=>M,PhoneCall:()=>se,PhoneCallAttributes:()=>oe,PhoneContactsResult:()=>J,RecordingToggleResult:()=>q,SetAgentConfigResult:()=>re,SetAgentStateResult:()=>ne,SharedCapabilitiesResult:()=>F,ShowStorageAccessResult:()=>pe,SignedRecordingUrlResult:()=>ee,StateChangeResult:()=>Re,StatsInfo:()=>Pe,SuperviseCallResult:()=>de,SupervisedCallInfo:()=>Se,SupervisorHangupResult:()=>Le,TelephonyConnector:()=>Ae,VendorConnector:()=>le,VoiceCapabilitiesResult:()=>j,initializeConnector:()=>qe,log:()=>D,publishError:()=>Xe,publishEvent:()=>Je,publishLog:()=>Qe});var T=E(756),i=E.n(T);const o={SHARED_MESSAGE_TYPE:{SETUP_CONNECTOR:"SETUP_CONNECTOR",CONNECTOR_READY:"CONNECTOR_READY",LOG:"LOG",TELEPHONY_EVENT_DISPATCHED:"TELEPHONY_EVENT_DISPATCHED",SET_AGENT_STATUS:"SET_AGENT_STATUS",GET_AGENT_STATUS:"GET_AGENT_STATUS",LOGOUT:"LOGOUT",MESSAGE:"MESSAGE",DOWNLOAD_VENDOR_LOGS:"DOWNLOAD_VENDOR_LOGS",AGENT_WORK_EVENT:"AGENT_WORK_EVENT",GET_CONTACTS:"GET_CONTACTS"},VOICE_MESSAGE_TYPE:{ACCEPT_CALL:"ACCEPT_CALL",DECLINE_CALL:"DECLINE_CALL",END_CALL:"END_CALL",MUTE:"MUTE",UNMUTE:"UNMUTE",HOLD:"HOLD",RESUME:"RESUME",DIAL:"DIAL",SEND_DIGITS:"SEND_DIGITS",GET_PHONE_CONTACTS:"GET_PHONE_CONTACTS",SWAP_PARTICIPANTS:"SWAP_PARTICIPANTS",ADD_PARTICIPANT:"ADD_PARTICIPANT",CONFERENCE:"CONFERENCE",PAUSE_RECORDING:"PAUSE_RECORDING",RESUME_RECORDING:"RESUME_RECORDING",SUPERVISE_CALL:"SUPERVISE_CALL",SUPERVISOR_BARGE_IN:"SUPERVISOR_BARGE_IN",SUPERVISOR_DISCONNECT:"SUPERVISOR_DISCONNECT",SET_AGENT_CONFIG:"SET_AGENT_CONFIG",GET_SIGNED_RECORDING_URL:"GET_SIGNED_RECORDING_URL",WRAP_UP_CALL:"WRAP_UP_CALL",AGENT_AVAILABLE:"AGENT_AVAILABLE",GET_AUDIO_DEVICES:"GET_AUDIO_DEVICES"},SHARED_EVENT_TYPE:{ERROR:"ERROR",WARNING:"WARNING",INFO:"INFO",LOGIN_STARTED:"LOGIN_STARTED",LOGIN_RESULT:"LOGIN_RESULT",LOGOUT_RESULT:"LOGOUT_RESULT",SHOW_LOGIN:"SHOW_LOGIN",SET_AGENT_STATUS_RESULT:"SET_AGENT_STATUS_RESULT",GET_AGENT_STATUS_RESULT:"GET_AGENT_STATUS_RESULT",MESSAGE:"MESSAGE",SET_AGENT_STATUS:"SET_AGENT_STATUS",GET_AGENT_STATUS:"GET_AGENT_STATUS",STATE_CHANGE:"STATE_CHANGE",REMOTE_CONTROLLER:"REMOTE_CONTROLLER",SHOW_STORAGE_ACCESS:"SHOW_STORAGE_ACCESS",STORAGE_ACCESS_RESULT:"STORAGE_ACCESS_RESULT",GET_CONTACTS_RESULT:"GET_CONTACTS_RESULT",AFTER_CONVERSATION_WORK_STARTED:"AFTER_CONVERSATION_WORK_STARTED",AFTER_CONVERSATION_WORK_ENDED:"AFTER_CONVERSATION_WORK_ENDED"},VOICE_EVENT_TYPE:{QUEUED_CALL_STARTED:"QUEUED_CALL_STARTED",CALL_STARTED:"CALL_STARTED",CALL_CONNECTED:"CALL_CONNECTED",CALL_FAILED:"CALL_FAILED",MUTE_TOGGLE:"MUTE_TOGGLE",HOLD_TOGGLE:"HOLD_TOGGLE",PHONE_CONTACTS:"PHONE_CONTACTS",PARTICIPANT_ADDED:"PARTICIPANT_ADDED",PARTICIPANT_CONNECTED:"PARTICIPANT_CONNECTED",PARTICIPANT_REMOVED:"PARTICIPANT_REMOVED",RECORDING_TOGGLE:"RECORDING_TOGGLE",PARTICIPANTS_SWAPPED:"PARTICIPANTS_SWAPPED",PARTICIPANTS_CONFERENCED:"PARTICIPANTS_CONFERENCED",SIGNED_RECORDING_URL:"SIGNED_RECORDING_URL",UPDATE_AUDIO_STATS:"UPDATE_AUDIO_STATS",UPDATE_AUDIO_STATS_COMPLETED:"UPDATE_AUDIO_STATS_COMPLETED",SUPERVISOR_BARGED_IN:"SUPERVISOR_BARGED_IN",SUPERVISOR_CALL_STARTED:"SUPERVISOR_CALL_STARTED",SUPERVISOR_CALL_CONNECTED:"SUPERVISOR_CALL_CONNECTED",SUPERVISOR_HANGUP:"SUPERVISOR_HANGUP",CALL_BARGED_IN:"CALL_BARGED_IN",WRAP_UP_ENDED:"WRAP_UP_ENDED",AFTER_CALL_WORK_STARTED:"AFTER_CALL_WORK_STARTED",AGENT_CONFIG_UPDATED:"AGENT_CONFIG_UPDATED",AGENT_ERROR:"AGENT_ERROR",HANGUP:"HANGUP",SOFTPHONE_ERROR:"SOFTPHONE_ERROR",SHOW_TRANSFER_VIEW:"SHOW_TRANSFER_VIEW",GET_AUDIO_DEVICES:"GET_AUDIO_DEVICES",AUDIO_STATS:"AUDIO_STATS",CALL_UPDATED:"CALL_UPDATED"},INFO_TYPE:{CAN_NOT_ACCEPT_THE_CALL:"CAN_NOT_ACCEPT_THE_CALL"},SHARED_ERROR_TYPE:{CUSTOM_ERROR:"CUSTOM_ERROR",GENERIC_ERROR:"GENERIC_ERROR",AUTHENTICATION_ERROR:"AUTHENTICATION_ERROR",INVALID_AGENT_STATUS:"INVALID_AGENT_STATUS",CAN_NOT_GET_AGENT_STATUS:"CAN_NOT_GET_AGENT_STATUS",CAN_NOT_SET_AGENT_STATUS:"CAN_NOT_SET_AGENT_STATUS",LOGIN_REQUIRED:"LOGIN_REQUIRED",CAN_NOT_LOG_IN:"CAN_NOT_LOG_IN",CAN_NOT_LOG_OUT:"CAN_NOT_LOG_OUT",INVALID_STATE_CHANGE_RESULT:"INVALID_STATE_CHANGE_RESULT",INVALID_STORAGE_ACCESS_RESULT:"INVALID_STORAGE_ACCESS_RESULT",INVALID_ACW_INFO:"INVALID_ACW_INFO"},VOICE_ERROR_TYPE:{CAN_NOT_DECLINE_THE_CALL:"CAN_NOT_DECLINE_THE_CALL",CAN_NOT_END_THE_CALL:"CAN_NOT_END_THE_CALL",CAN_NOT_HOLD_CALL:"CAN_NOT_HOLD_CALL",CAN_NOT_RESUME_CALL:"CAN_NOT_RESUME_CALL",CAN_NOT_MUTE_CALL:"CAN_NOT_MUTE_CALL",CAN_NOT_UNMUTE_CALL:"CAN_NOT_UNMUTE_CALL",CAN_NOT_TOGGLE_MUTE:"CAN_NOT_TOGGLE_MUTE",CAN_NOT_TOGGLE_HOLD:"CAN_NOT_TOGGLE_HOLD",CAN_NOT_TOGGLE_RECORD:"CAN_NOT_TOGGLE_RECORD",INVALID_PARTICIPANT:"INVALID_PARTICIPANT",INVALID_PARAMS:"INVALID_PARAMS",CAN_NOT_GET_PHONE_CONTACTS:"CAN_NOT_GET_PHONE_CONTACTS",CAN_NOT_SWAP_PARTICIPANTS:"CAN_NOT_SWAP_PARTICIPANTS",CAN_NOT_CONFERENCE:"CAN_NOT_CONFERENCE",INVALID_DESTINATION:"INVALID_DESTINATION",INVALID_PHONE_NUMBER:"INVALID_PHONE_NUMBER",CAN_NOT_HANGUP_PARTICIPANT:"CAN_NOT_HANGUP_PARTICIPANT",CAN_NOT_ADD_PARTICIPANT:"CAN_NOT_ADD_PARTICIPANT",CAN_NOT_CONNECT_PARTICIPANT:"CAN_NOT_CONNECT_PARTICIPANT",CAN_NOT_START_THE_CALL:"CAN_NOT_START_THE_CALL",CAN_NOT_PAUSE_RECORDING:"CAN_NOT_PAUSE_RECORDING",CAN_NOT_RESUME_RECORDING:"CAN_NOT_RESUME_RECORDING",CAN_NOT_SET_AGENT_CONFIG:"CAN_NOT_SET_AGENT_CONFIG",CAN_NOT_SET_CAPABILITIES:"CAN_NOT_SET_CAPABILITIES",CAN_NOT_UPDATE_PHONE_NUMBER:"CAN_NOT_UPDATE_PHONE_NUMBER",CAN_NOT_GET_SIGNED_RECORDING_URL:"CAN_NOT_GET_SIGNED_RECORDING_URL",CAN_NOT_SUPERVISE_CALL:"CAN_NOT_SUPERVISE_CALL",CAN_NOT_DISCONNECT_SUPERVISOR:"CAN_NOT_DISCONNECT_SUPERVISOR",CAN_NOT_BARGE_IN_SUPERVISOR:"CAN_NOT_BARGE_IN_SUPERVISOR",CAN_NOT_BARGE_IN_CALL:"CAN_NOT_BARGE_IN_CALL",AGENT_ERROR:"AGENT_ERROR",MICROPHONE_NOT_SHARED:"MICROPHONE_NOT_SHARED",UNSUPPORTED_BROWSER:"UNSUPPORTED_BROWSER",USER_BUSY_ERROR:"USER_BUSY_ERROR",WEBRTC_ERROR:"WEBRTC_ERROR",CAN_NOT_GET_AUDIO_DEVICES:"CAN_NOT_GET_AUDIO_DEVICES",CAN_NOT_UPDATE_CALL:"CAN_NOT_UPDATE_CALL"},AGENT_STATUS:{ONLINE:"Online",OFFLINE:"Offline",ACW:"AfterCallWork"},PARTICIPANT_TYPE:{AGENT:"Agent",INITIAL_CALLER:"Initial_Caller",THIRD_PARTY:"Third_Party",SUPERVISOR:"Supervisor"},CALL_TYPE:{INBOUND:"Inbound",OUTBOUND:"Outbound",CALLBACK:"Callback",ADD_PARTICIPANT:"AddParticipant",TRANSFER:"Transfer",INTERNAL_CALL:"InternalCall",DIALED_CALLBACK:"DialedCallback",CONSULT:"Consult"},CALL_SUBTYPE:{PSTN:"PSTN",WEB_RTC:"WebRTC"},DIALER_TYPE:{OUTBOUND_PREVIEW:"OutboundPreview",NONE:"None"},CONTACT_TYPE:{PHONEBOOK:"PhoneBook",QUEUE:"Queue",PHONENUMBER:"PhoneNumber",AGENT:"Agent",FLOW:"Flow"},CONTACT_LIST_TYPE:{TRANSFER:"Transfer",CONFERENCE:"Conference",ALL:"All"},AGENT_CONFIG_TYPE:{SHOW_AGENT_SETTINGS:"SHOW_AGENT_SETTINGS",PHONES:"PHONES",SELECTED_PHONE:"SELECTED_PHONE"},SHARED_CAPABILITIES_TYPE:{DEBUG_ENABLED:"DEBUG_ENABLED",CONTACT_SEARCH:"CONTACT_SEARCH",VENDOR_PROVIDED_AVAILABILITY:"VENDOR_PROVIDED_AVAILABILITY",VENDOR_PROVIDED_QUEUE_WAIT_TIME:"VENDOR_PROVIDED_QUEUE_WAIT_TIME",TRANSFER_TO_OMNI_FLOW:"TRANSFER_TO_OMNI_FLOW",PENDING_STATUS_CHANGE:"PENDING_STATUS_CHANGE",SFDC_PENDING_STATE:"SFDC_PENDING_STATE",AUTO_ACCEPT_ENABLED:"AUTO_ACCEPT_ENABLED"},VOICE_CAPABILITIES_TYPE:{MUTE:"MUTE",RECORD:"RECORD",MERGE:"MERGE",SWAP:"SWAP",BLIND_TRANSFER:"BLIND_TRANSFER",SIGNED_RECORDING_URL:"SIGNED_RECORDING_URL",SUPERVISOR_LISTEN_IN:"SUPERVISOR_LISTEN_IN",SUPERVISOR_BARGE_IN:"SUPERVISOR_BARGE_IN",MOS:"MOS",PHONEBOOK:"PHONEBOOK",HAS_GET_EXTERNAL_SPEAKER:"HAS_GET_EXTERNAL_SPEAKER",HAS_SET_EXTERNAL_SPEAKER:"HAS_SET_EXTERNAL_SPEAKER",HAS_GET_EXTERNAL_MICROPHONE:"HAS_GET_EXTERNAL_MICROPHONE",HAS_SET_EXTERNAL_MICROPHONE:"HAS_SET_EXTERNAL_MICROPHONE",CAN_CONSULT:"CAN_CONSULT",DIAL_PAD:"DIAL_PAD",HAS_HID_SUPPORT:"HAS_HID_SUPPORT",PHONEBOOK_DISABLE:"PHONEBOOK_DISABLE"},CALL_STATE:{RINGING:"ringing",CONNECTED:"connected",TRANSFERRING:"transferring",TRANSFERRED:"transferred",ENDED:"ended"},PHONE_TYPE:{DESK_PHONE:"DESK_PHONE",SOFT_PHONE:"SOFT_PHONE"},HANGUP_REASON:{PHONE_CALL_ERROR:"error",PHONE_CALL_ENDED:"ended"},AGENT_AVAILABILITY:{AVAILABLE:"AVAILABLE",BUSY:"BUSY",OFFLINE:"OFFLINE"},REMOVE_PARTICIPANT_VARIANT:{ALWAYS:"ALWAYS",NEVER:"NEVER",ALWAYS_EXCEPT_ON_HOLD:"ALWAYS_EXCEPT_ON_HOLD"},LOG_LEVEL:{ERROR:"ERROR",INFO:"INFO"},LOG_SOURCE:{SYSTEM:"SYSTEM",PARTNER:"PARTNER"},CONTACTS_FILTER_TYPES:{AGENT:"AGENT",QUEUE:"QUEUE",CONTACT:"CONTACT",DIRECTORY:"DIRECTORY",FLOW:"FLOW",AVAILABLE:"AVAILABLE"},WORK_EVENT:{ASSIGNED:"ASSIGNED",ACCEPTED:"ACCEPTED",DECLINED:"DECLINED",COMPLETED:"COMPLETED",CLOSED:"CLOSED",PAUSED:"PAUSED",UNPAUSED:"UNPAUSED"},DIAL_OPTIONS:{CALLBACK:"isCallback=true",CONSULT:"isConsultCall"},HANGUP_STATUS:{MISSED_AGENT:"MissedCallAgent",DECLINED:"DeclinedByAgent",FAILED_CONNECT_AGENT:"FailedConnectAgent",FAILED_CONNECT_CUSTOMER:"FailedConnectCustomer",CALLBACK_MISSED_OR_REJECTED:"CallbackMissedOrRejected"}};var s=["/internalNameLabel","/reqGeneralInfo/reqAdapterUrl","/reqGeneralInfo/reqVendorInfoApiName","isACWAllowed","isHVSEnabled","orgDomainName","phoneServiceChannelId","telephonySettingsComponentFqn"],A=["/reqHvcc"],l=["/reqHvcc/reqTelephonyIntegrationCertificate"];function c(e,E){for(var a=0;a<E.length;a++){var n=E[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,t(n.key),n)}}function C(e,t,E){return t&&c(e.prototype,t),E&&c(e,E),Object.defineProperty(e,"prototype",{writable:!1}),e}function N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}function R(e,t){return R=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},R(e,t)}function S(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&R(e,t)}function I(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(I=function(){return!!e})()}function u(e){var t="function"==typeof Map?new Map:void 0;return u=function(e){if(null===e||!function(e){try{return-1!==Function.toString.call(e).indexOf("[native code]")}catch(t){return"function"==typeof e}}(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,E)}function E(){return function(e,t,E){if(I())return Reflect.construct.apply(null,arguments);var a=[null];a.push.apply(a,t);var n=new(e.bind.apply(e,a));return E&&R(n,E.prototype),n}(e,arguments,O(this).constructor)}return E.prototype=Object.create(e.prototype,{constructor:{value:E,enumerable:!1,writable:!0,configurable:!0}}),R(E,e)},u(e)}var P=75e5,d=function(e){return"string"==typeof e?e:JSON.stringify(e)},L=0,p=[];function D(e,t,E){!function(e,t,E){if(!t)throw new Error("Log Message required");e=e||o.LOG_LEVEL.INFO,E=E||o.LOG_SOURCE.PARTNER;var a=[(new Date).toISOString(),d(e),d(E),"".concat(d(t),"\n")].join("|");L+a.length>=P&&(p=[],L=0),L+=a.length,p.push(a)}(t,e,E)}function h(){!function(e,t){if(document&&e){var E="string"==typeof e?e:JSON.stringify(e),a=new Blob([E],{type:"text/plain"}),n=document.createElement("a"),r=URL.createObjectURL(a);n.download=t,n.href=r,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)}}(p.join(""),"log-".concat((new Date).getTime(),".txt"))}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var E=0,a=Array(t);E<t;E++)a[E]=e[E];return a}function v(t,E,a){return E=O(E),function(t,E){if(E&&("object"==e(E)||"function"==typeof E))return E;if(void 0!==E)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)}(t,f()?Reflect.construct(E,a||[],O(t).constructor):E.apply(t,a))}function f(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(f=function(){return!!e})()}function G(e,t){var E=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),E.push.apply(E,a)}return E}function b(e){for(var t=1;t<arguments.length;t++){var E=null!=arguments[t]?arguments[t]:{};t%2?G(Object(E),!0).forEach((function(t){n(e,t,E[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(E)):G(Object(E)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(E,t))}))}return e}var Y,U,g,y,m={SHARED_EVENT_TYPE:{LOGIN_RESULT:o.SHARED_EVENT_TYPE.LOGIN_RESULT,LOGOUT_RESULT:o.SHARED_EVENT_TYPE.LOGOUT_RESULT,MESSAGE:o.SHARED_EVENT_TYPE.MESSAGE,SET_AGENT_STATUS:o.SHARED_EVENT_TYPE.SET_AGENT_STATUS,GET_AGENT_STATUS:o.SHARED_EVENT_TYPE.GET_AGENT_STATUS,STATE_CHANGE:o.SHARED_EVENT_TYPE.STATE_CHANGE,STORAGE_ACCESS_RESULT:o.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT,GET_CONTACTS_RESULT:o.SHARED_EVENT_TYPE.GET_CONTACTS_RESULT,AFTER_CONVERSATION_WORK_STARTED:o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED,AFTER_CONVERSATION_WORK_ENDED:o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED},VOICE_EVENT_TYPE:{CALL_STARTED:o.VOICE_EVENT_TYPE.CALL_STARTED,QUEUED_CALL_STARTED:o.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED,CALL_CONNECTED:o.VOICE_EVENT_TYPE.CALL_CONNECTED,HANGUP:o.VOICE_EVENT_TYPE.HANGUP,MUTE_TOGGLE:o.VOICE_EVENT_TYPE.MUTE_TOGGLE,HOLD_TOGGLE:o.VOICE_EVENT_TYPE.HOLD_TOGGLE,RECORDING_TOGGLE:o.VOICE_EVENT_TYPE.RECORDING_TOGGLE,PARTICIPANTS_SWAPPED:o.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED,PARTICIPANTS_CONFERENCED:o.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED,PARTICIPANT_ADDED:o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED,PARTICIPANT_CONNECTED:o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED,PARTICIPANT_REMOVED:o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED,AFTER_CALL_WORK_STARTED:o.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED,WRAP_UP_ENDED:o.VOICE_EVENT_TYPE.WRAP_UP_ENDED,AGENT_ERROR:o.VOICE_EVENT_TYPE.AGENT_ERROR,SOFTPHONE_ERROR:o.VOICE_EVENT_TYPE.SOFTPHONE_ERROR,UPDATE_AUDIO_STATS:o.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS,CALL_BARGED_IN:o.VOICE_EVENT_TYPE.CALL_BARGED_IN,SUPERVISOR_BARGED_IN:o.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN,SUPERVISOR_CALL_STARTED:o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED,SUPERVISOR_CALL_CONNECTED:o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,SUPERVISOR_HANGUP:o.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP,SHOW_TRANSFER_VIEW:o.VOICE_EVENT_TYPE.SHOW_TRANSFER_VIEW,AUDIO_STATS:o.VOICE_EVENT_TYPE.AUDIO_STATS,CALL_UPDATED:o.VOICE_EVENT_TYPE.CALL_UPDATED},SHARED_ERROR_TYPE:{GENERIC_ERROR:o.SHARED_ERROR_TYPE.GENERIC_ERROR,INVALID_AGENT_STATUS:o.SHARED_ERROR_TYPE.INVALID_AGENT_STATUS},VOICE_ERROR_TYPE:{INVALID_PARTICIPANT:o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT,INVALID_DESTINATION:o.VOICE_ERROR_TYPE.INVALID_DESTINATION,CAN_NOT_UPDATE_PHONE_NUMBER:o.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER,INVALID_PARAMS:o.VOICE_ERROR_TYPE.INVALID_PARAMS},AGENT_STATUS:b({},o.AGENT_STATUS),PARTICIPANT_TYPE:b({},o.PARTICIPANT_TYPE),CALL_TYPE:b({},o.CALL_TYPE),CALL_SUBTYPE:b({},o.CALL_SUBTYPE),DIALER_TYPE:b({},o.DIALER_TYPE),CONTACT_TYPE:b({},o.CONTACT_TYPE),CONTACT_LIST_TYPE:b({},o.CONTACT_LIST_TYPE),CALL_STATE:b({},o.CALL_STATE),HANGUP_REASON:b({},o.HANGUP_REASON),PHONE_TYPE:b({},o.PHONE_TYPE),AGENT_AVAILABILITY:b({},o.AGENT_AVAILABILITY),REMOVE_PARTICIPANT_VARIANT:b({},o.REMOVE_PARTICIPANT_VARIANT),LOG_LEVEL:b({},o.LOG_LEVEL),CONTACTS_FILTER_TYPES:b({},o.CONTACTS_FILTER_TYPES),WORK_EVENT:b({},o.WORK_EVENT),HANGUP_STATUS:b({},o.HANGUP_STATUS)},H=function(e){function t(e){var E,a=e.labelName,n=e.namespace,r=e.message;return N(this,t),E=v(this,t,[r]),ce.validateString(a),ce.validateString(n),r&&ce.validateString(r),E.labelName=a,E.namespace=n,E.message=r,E}return S(t,e),C(t)}(u(Error)),M=C((function e(t){var E=t.type,a=t.number;N(this,e),ce.validateEnum(E,Object.values(o.PHONE_TYPE)),a&&ce.validateString(a),this.type=E,this.number=a})),k=C((function e(t){var E=t.productId,a=t.vendorId;N(this,e),E&&ce.validateNumber(E),a&&ce.validateNumber(a),this.productId=E,this.vendorId=a})),w=C((function e(t){var E=t.isMuted,a=t.call,n=t.isGlobal;N(this,e),this.isMuted=E,this.call=a,this.isGlobal=n})),B=C((function e(t){var E=t.activeCalls,a=void 0===E?[]:E;N(this,e),a.length>0&&a.forEach((function(e){ce.validateClassObject(e,se)})),this.activeCalls=a})),x=C((function e(t){var E=t.audioDevices,a=void 0===E?[]:E;N(this,e),this.audioDevices=a})),F=C((function e(t){var E=t.debugEnabled,a=void 0===E||E,n=t.hasContactSearch,r=void 0!==n&&n,_=t.hasAgentAvailability,T=void 0!==_&&_,i=t.hasQueueWaitTime,o=void 0!==i&&i,s=t.hasTransferToOmniFlow,A=void 0!==s&&s,l=t.hasPendingStatusChange,c=void 0!==l&&l,C=t.hasSFDCPendingState,O=void 0!==C&&C,R=t.hasAutoAcceptEnabled,S=void 0!==R&&R;N(this,e),ce.validateBoolean(a),ce.validateBoolean(r),ce.validateBoolean(T),ce.validateBoolean(o),ce.validateBoolean(A),ce.validateBoolean(c),ce.validateBoolean(O),ce.validateBoolean(S),this.debugEnabled=a,this.hasContactSearch=r,this.hasAgentAvailability=T,this.hasQueueWaitTime=o,this.hasTransferToOmniFlow=A,this.hasPendingStatusChange=c,this.hasSFDCPendingState=O,this.hasAutoAcceptEnabled=S})),j=C((function e(t){var E=t.hasMute,a=void 0===E||E,n=t.hasRecord,r=void 0===n||n,_=t.hasMerge,T=void 0===_||_,i=t.hasSwap,o=void 0===i||i,s=t.hasBlindTransfer,A=void 0!==s&&s,l=t.hasSignedRecordingUrl,c=void 0!==l&&l,C=t.supportsMos,O=void 0!==C&&C,R=t.hasSupervisorListenIn,S=void 0!==R&&R,I=t.hasSupervisorBargeIn,u=void 0!==I&&I,P=t.hasPhoneBook,d=void 0!==P&&P,L=t.hasGetExternalSpeakerDeviceSetting,p=void 0!==L&&L,D=t.hasSetExternalSpeakerDeviceSetting,h=void 0!==D&&D,V=t.hasGetExternalMicrophoneDeviceSetting,v=void 0!==V&&V,f=t.hasSetExternalMicrophoneDeviceSetting,G=void 0!==f&&f,b=t.canConsult,Y=void 0!==b&&b,U=t.isDialPadDisabled,g=void 0!==U&&U,y=t.isHidSupported,m=void 0!==y&&y,H=t.isPhoneBookDisabled,M=void 0!==H&&H;N(this,e),ce.validateBoolean(a),ce.validateBoolean(r),ce.validateBoolean(T),ce.validateBoolean(o),ce.validateBoolean(A),ce.validateBoolean(c),ce.validateBoolean(O),ce.validateBoolean(S),ce.validateBoolean(u),ce.validateBoolean(d),ce.validateBoolean(p),ce.validateBoolean(h),ce.validateBoolean(v),ce.validateBoolean(G),ce.validateBoolean(Y),ce.validateBoolean(g),ce.validateBoolean(m),ce.validateBoolean(M),this.hasMute=a,this.hasRecord=r,this.hasMerge=T,this.hasSwap=o,this.hasBlindTransfer=A,this.hasSignedRecordingUrl=c,this.supportsMos=O,this.hasSupervisorListenIn=S,this.hasSupervisorBargeIn=u,this.hasPhoneBook=d,this.hasGetExternalSpeakerDeviceSetting=p,this.hasSetExternalSpeakerDeviceSetting=h,this.hasGetExternalMicrophoneDeviceSetting=v,this.hasSetExternalMicrophoneDeviceSetting=G,this.canConsult=Y,this.isDialPadDisabled=g,this.isHidSupported=m,this.isPhoneBookDisabled=M})),W=C((function e(t){var E=t.phones,a=void 0===E?[o.PHONE_TYPE.SOFT_PHONE]:E,n=t.selectedPhone,r=void 0===n?new M({type:o.PHONE_TYPE.SOFT_PHONE}):n,_=t.speakerDeviceId,T=void 0===_?"":_,i=t.microphoneDeviceId,s=void 0===i?"":i;N(this,e),ce.validateClassObject(a,Array),ce.validateClassObject(r,M),ce.validateString(T),ce.validateString(s),this.phones=a,this.selectedPhone=r,this.speakerDeviceId=T,this.microphoneDeviceId=s})),K=C((function e(t){var E=t.selectedPhone,a=t.speakerDeviceId,n=t.microphoneDeviceId,r=t.hidDeviceInfo;N(this,e),ce.validateClassObject(E,M),void 0!==r&&ce.validateClassObject(r,k),this.selectedPhone=E,this.speakerDeviceId=a,this.microphoneDeviceId=n,this.hidDeviceInfo=r})),q=C((function e(t){var E=t.isRecordingPaused,a=t.contactId,n=void 0===a?null:a,r=t.initialContactId,_=void 0===r?null:r,T=t.instanceId,i=void 0===T?null:T,o=t.region,s=void 0===o?null:o;N(this,e),this.isRecordingPaused=E,this.contactId=n,this.initialContactId=_,this.instanceId=i,this.region=s})),Q=C((function e(t){var E=t.initialCallHasEnded,a=t.callInfo,n=t.callAttributes,r=t.phoneNumber,_=t.callId,T=t.contact,i=void 0===T?null:T,o=t.connectionId;N(this,e),ce.validateClassObject(a,Te),this.initialCallHasEnded=E,this.callInfo=a,this.callAttributes=n,this.phoneNumber=r,this.callId=_,this.contact=i,this.connectionId=o||_})),X=C((function e(t){var E=t.contacts,a=void 0===E?[]:E,n=t.contactTypes,r=void 0===n?[]:n;N(this,e),a.length>0&&a.forEach((function(e){ce.validateClassObject(e,ie)})),r.length>0&&r.forEach((function(e){ce.validateEnum(e,Object.values(o.CONTACT_TYPE))})),this.contacts=a,this.contactTypes=r})),J=function(e){function t(e){var E=e.contacts,a=void 0===E?[]:E,n=e.contactTypes,r=void 0===n?[]:n;return N(this,t),v(this,t,[{contacts:a,contactTypes:r}])}return S(t,e),C(t)}(X),$=C((function e(t){var E=t.call;N(this,e),void 0!==E&&ce.validateClassObject(E,se),this.call=E})),z=C((function e(t){var E=t.calls;N(this,e),E instanceof Array?(E.forEach((function(e){return ce.validateClassObject(e,se)})),this.calls=E):(ce.validateClassObject(E,se),this.calls=[E])})),Z=C((function e(t){var E=t.isThirdPartyOnHold,a=t.isCustomerOnHold,n=t.calls,r=t.isCallMerged;N(this,e),n&&(Object.values(n).forEach((function(e){ce.validateClassObject(e,se)})),this.calls=n),this.isThirdPartyOnHold=E,this.isCustomerOnHold=a,this.isCallMerged=r})),ee=C((function e(t){var E=t.success,a=t.url,n=t.duration,r=t.callId;N(this,e),E&&(ce.validateString(a),ce.validateString(r),n&&ce.validateNumber(n)),this.success=E,this.url=a,this.duration=n,this.callId=r})),te=C((function e(t){var E=t.showLogin,a=void 0!==E&&E,n=t.loginFrameHeight,r=void 0===n?350:n,_=t.isSilentLogin,T=void 0!==_&&_,i=t.showStorageAccess,o=void 0!==i&&i;N(this,e),this.showLogin=a,this.loginFrameHeight=r,this.isSilentLogin=!this.showLogin&&T,this.showStorageAccess=o})),Ee=C((function e(t){var E=t.isCallback,a=void 0!==E&&E,n=t.isConsultCall,r=void 0!==n&&n;N(this,e),this.isCallback=a,this.isConsultCall=r})),ae=C((function e(t){var E=t.success;N(this,e),this.success=E})),ne=function(e){function t(e){var E,a=e.success,n=e.isStatusSyncNeeded,r=void 0===n||n;return N(this,t),(E=v(this,t,[{success:a}])).isStatusSyncNeeded=r,E}return S(t,e),C(t)}(ae),re=function(e){function t(e){var E,a=e.success,n=e.isSystemEvent,r=void 0!==n&&n;return N(this,t),(E=v(this,t,[{success:a}])).isSystemEvent=r,E}return S(t,e),C(t,[{key:"setIsSystemEvent",value:function(e){this.isSystemEvent=e}}])}(ae),_e=C((function e(t){var E=t.success,a=t.loginFrameHeight,n=void 0===a?350:a;N(this,e),this.success=E,this.loginFrameHeight=n})),Te=C((function e(t){var E=t.callStateTimestamp,a=void 0===E?null:E,n=t.isOnHold,r=t.isMuted,_=void 0!==r&&r,T=t.isRecordingPaused,i=void 0!==T&&T,s=t.initialCallId,A=t.queueId,l=void 0===A?null:A,c=t.queueName,C=void 0===c?null:c,O=t.queueTimestamp,R=void 0===O?null:O,S=t.isSoftphoneCall,I=void 0===S||S,u=t.acceptEnabled,P=void 0===u||u,d=t.declineEnabled,L=void 0===d||d,p=t.muteEnabled,D=void 0===p||p,h=t.swapEnabled,V=void 0===h||h,v=t.conferenceEnabled,f=void 0===v||v,G=t.holdEnabled,b=void 0===G||G,Y=t.recordEnabled,U=void 0===Y||Y,g=t.addCallerEnabled,y=void 0===g||g,H=t.extensionEnabled,M=void 0===H||H,k=t.isReplayable,w=void 0===k||k,B=t.isBargeable,x=void 0!==B&&B,F=t.isExternalTransfer,j=t.showMuteButton,W=void 0===j||j,K=t.showRecordButton,q=void 0===K||K,Q=t.showAddCallerButton,X=void 0===Q||Q,J=t.showAddBlindTransferButton,$=void 0===J||J,z=t.showMergeButton,Z=void 0===z||z,ee=t.showSwapButton,te=void 0===ee||ee,Ee=t.removeParticipantVariant,ae=void 0===Ee?m.REMOVE_PARTICIPANT_VARIANT.ALWAYS:Ee,ne=t.additionalFields,re=void 0===ne?null:ne,_e=t.isMultiParty,Te=void 0!==_e&&_e,ie=t.isHIDCall,oe=void 0!==ie&&ie,se=t.endCallDisabled,Ae=void 0!==se&&se,le=t.renderContactId,Ce=void 0===le?null:le;N(this,e),a&&ce.validateDate(a),R&&ce.validateDate(R),l&&ce.validateString(l),C&&ce.validateString(C),ce.validateBoolean(i),ce.validateBoolean(_),ce.validateBoolean(I),ce.validateBoolean(P),ce.validateBoolean(L),ce.validateBoolean(D),ce.validateBoolean(V),ce.validateBoolean(f),ce.validateBoolean(b),ce.validateBoolean(U),ce.validateBoolean(y),ce.validateBoolean(M),ce.validateBoolean(x),ce.validateBoolean(W),ce.validateBoolean(q),ce.validateBoolean(X),ce.validateBoolean($),ce.validateBoolean(Z),ce.validateBoolean(te),ce.validateBoolean(oe),ce.validateBoolean(Ae),void 0!==F&&ce.validateBoolean(F),ce.validateEnum(ae,Object.values(o.REMOVE_PARTICIPANT_VARIANT)),re&&ce.validateString(re),ce.validateBoolean(Te),Ce&&ce.validateString(Ce),this.callStateTimestamp=a,this.isRecordingPaused=i,this.isMuted=_,this.isOnHold=n,this.initialCallId=s,this.queueName=C,this.queueId=l,this.queueTimestamp=R,this.isSoftphoneCall=I,this.acceptEnabled=P,this.declineEnabled=L,this.muteEnabled=D,this.swapEnabled=V,this.conferenceEnabled=f,this.holdEnabled=b,this.recordEnabled=U,this.addCallerEnabled=y,this.extensionEnabled=M,this.isReplayable=w,this.isBargeable=x,this.isExternalTransfer=F,this.removeParticipantVariant=ae,this.showMuteButton=W,this.showRecordButton=q,this.showAddCallerButton=X,this.showAddBlindTransferButton=$,this.showMergeButton=Z,this.showSwapButton=te,this.additionalFields=re,this.isMultiParty=Te,this.isHIDCall=oe,this.endCallDisabled=Ae,this.renderContactId=Ce})),ie=C((function e(t){var E=t.phoneNumber,a=t.id,n=t.type,r=t.name,_=t.listType,T=t.prefix,i=t.extension,s=t.endpointARN,A=t.queue,l=t.availability,c=t.recordId,C=t.description,O=t.queueWaitTime;N(this,e),E&&ce.validateString(E),n&&ce.validateEnum(n,Object.values(o.CONTACT_TYPE)),a&&ce.validateString(a),r&&ce.validateString(r),_&&ce.validateEnum(_,Object.values(m.CONTACT_LIST_TYPE)),T&&ce.validateString(T),i&&ce.validateString(i),l&&ce.validateEnum(l,Object.values(o.AGENT_AVAILABILITY)),c&&ce.validateString(c),C&&ce.validateString(C),O&&ce.validateString(O),this.phoneNumber=E,this.id=a,this.type=n,this.name=r,this.listType=_,this.prefix=T,this.extension=i,this.endpointARN=s,this.queue=A,o.CONTACT_TYPE.AGENT===this.type?this.availability=l:this.availability=null,this.queueWaitTime=O,this.recordId=c,this.description=C})),oe=C((function e(t){var E=t.voiceCallId,a=t.participantType,n=t.dialerType,r=void 0===n?m.DIALER_TYPE.NONE:n,_=t.parentId,T=t.isOnHold,i=t.hasSupervisorBargedIn,s=void 0!==i&&i,A=t.isAutoMergeOn,l=void 0!==A&&A,c=t.isConsultCall,C=void 0!==c&&c;N(this,e),E&&ce.validateString(E),a&&ce.validateEnum(a,Object.values(o.PARTICIPANT_TYPE)),_&&ce.validateString(_),void 0!==T&&ce.validateBoolean(T),ce.validateBoolean(s),ce.validateEnum(r,Object.values(o.DIALER_TYPE)),ce.validateBoolean(l),ce.validateBoolean(C),this.voiceCallId=E,this.participantType=a,this.parentId=_,this.isOnHold=T,this.dialerType=r,this.hasSupervisorBargedIn=s,this.isAutoMergeOn=l,this.isConsultCall=C})),se=C((function e(t){var E=t.callId,a=t.callType,n=t.callSubtype,r=t.contact,_=t.state,T=t.callAttributes,i=t.phoneNumber,s=t.callInfo,A=t.reason,l=t.closeCallOnError,c=t.agentStatus,C=t.agentARN,O=t.fromContact,R=t.toContact,S=t.connectionId;N(this,e),E&&(ce.validateString(E),this.callId=E),S?(ce.validateString(S),this.connectionId=S):E&&(this.connectionId=E),a&&(ce.validateEnum(a,Object.values(o.CALL_TYPE)),this.callType=a),n&&(ce.validateEnum(n,Object.values(o.CALL_SUBTYPE)),this.callSubtype=n),i&&(ce.validateString(i),this.phoneNumber=i),s&&(ce.validateClassObject(s,Te),this.callInfo=s),r&&(ce.validateClassObject(r,ie),this.contact=r),O&&(ce.validateClassObject(O,ie),this.fromContact=O),R?(ce.validateClassObject(R,ie),this.toContact=R):r&&(this.toContact=r),A&&(this.reason=A),l&&(this.closeCallOnError=l),c&&(this.agentStatus=c),C&&(this.agentARN=C),this.state=_,this.callAttributes=T})),Ae=function(){return C((function e(){N(this,e)}),[{key:"getActiveCalls",value:function(){throw new Error("Not implemented")}},{key:"acceptCall",value:function(e){throw new Error("Not implemented")}},{key:"declineCall",value:function(e){throw new Error("Not implemented")}},{key:"endCall",value:function(e,t){throw new Error("Not implemented")}},{key:"mute",value:function(e){throw new Error("Not implemented")}},{key:"unmute",value:function(e){throw new Error("Not implemented")}},{key:"hold",value:function(e){throw new Error("Not implemented")}},{key:"resume",value:function(e){throw new Error("Not implemented")}},{key:"dial",value:function(e,t){throw new Error("Not implemented")}},{key:"sendDigits",value:function(e){throw new Error("Not implemented")}},{key:"getPhoneContacts",value:function(e){throw new Error("Not implemented")}},{key:"swap",value:function(e,t){throw new Error("Not implemented")}},{key:"conference",value:function(e){throw new Error("Not implemented")}},{key:"addParticipant",value:function(e,t,E){throw new Error("Not implemented")}},{key:"pauseRecording",value:function(){throw new Error("Not implemented")}},{key:"resumeRecording",value:function(){throw new Error("Not implemented")}},{key:"getAgentConfig",value:function(){throw new Error("Not implemented")}},{key:"setAgentConfig",value:function(e){throw new Error("Not implemented")}},{key:"getVoiceCapabilities",value:function(){throw new Error("Not implemented")}},{key:"wrapUpCall",value:function(e){throw new Error("Not implemented")}},{key:"getSignedRecordingUrl",value:function(e,t,E){throw new Error("Not implemented")}},{key:"superviseCall",value:function(e){throw new Error("Not implemented")}},{key:"supervisorDisconnect",value:function(e){throw new Error("Not implemented")}},{key:"supervisorBargeIn",value:function(e){throw new Error("Not implemented")}}])}(),le=function(){return C((function e(){N(this,e)}),[{key:"init",value:function(e){throw new Error("Not implemented")}},{key:"getTelephonyConnector",value:function(){throw new Error("Not implemented")}},{key:"onAgentWorkEvent",value:function(e){throw new Error("Not implemented")}},{key:"setAgentStatus",value:function(e,t,E){throw new Error("Not implemented")}},{key:"getAgentStatus",value:function(){this.logMessageToVendor(o.LOG_LEVEL.INFO,"getAgentStatus API is NOT Implemented")}},{key:"logout",value:function(){throw new Error("Not implemented")}},{key:"handleMessage",value:function(e){throw new Error("Not implemented")}},{key:"downloadLogs",value:function(e){h()}},{key:"logMessageToVendor",value:function(e,t,E){}},{key:"getContacts",value:function(e,t){throw new Error("Not implemented")}},{key:"getAudioDevices",value:function(){throw new Error("Not implemented")}},{key:"getSharedCapabilities",value:function(){throw new Error("Not implemented")}}])}(),ce=function(){return C((function e(){N(this,e)}),null,[{key:"validateString",value:function(t){if("string"!=typeof t)throw new Error("Invalid argument. Expecting a string but got ".concat(e(t)));return this}},{key:"validateNumber",value:function(t){if("number"!=typeof t)throw new Error("Invalid argument. Expecting a number but got ".concat(e(t)));return this}},{key:"validateBoolean",value:function(t){if("boolean"!=typeof t)throw new Error("Invalid argument. Expecting a boolean but got ".concat(e(t)));return this}},{key:"validateEnum",value:function(e,t){if(!new RegExp(t.join("|"),"i").test(e))throw new Error("Invalid argument. Expecting a value from ".concat(JSON.stringify(t)," but got ").concat(e));return this}},{key:"validateDate",value:function(t){if(!(t instanceof Date))throw new Error("Invalid argument. Expecting a Date object but got ".concat(e(t)));return this}},{key:"validateClassObject",value:function(t,E){if(!(t instanceof E))throw new Error("Invalid className. Expecting object of class ".concat(E," but got ").concat(e(t)));return this}},{key:"validateClassObjects",value:function(t){for(var E=!1,a=arguments.length,n=new Array(a>1?a-1:0),r=1;r<a;r++)n[r-1]=arguments[r];for(var _=0;_<n.length;_++)try{this.validateClassObject(t,n[_]),E=!0;break}catch(e){}if(!E)throw new Error("Invalid className. Expecting object matching a class name in ".concat(n," but got ").concat(e(t)));return this}}])}(),Ce=C((function e(t){var E=t.workItemId,a=t.workId,n=t.workEvent;N(this,e),ce.validateEnum(n,Object.values(o.WORK_EVENT)),this.workEvent=n,this.workItemId=E,this.workId=a})),Ne=C((function e(t){var E=t.statusId,a=t.statusApiName,n=t.statusName;N(this,e),ce.validateString(E),a&&ce.validateString(a),n&&ce.validateString(n),this.statusId=E,this.statusApiName=a,this.statusName=n})),Oe=C((function e(t){var E=t.statusId,a=t.statusType,n=t.statusName;N(this,e),E&&ce.validateString(E),a&&ce.validateString(a),n&&ce.validateString(n),this.statusId=E,this.statusType=a,this.statusName=n})),Re=C((function e(t){var E=t.newVendorStateInfo,a=t.oldVendorStateInfo;N(this,e),ce.validateClassObject(E,Oe),ce.validateString(E.statusName),a&&ce.validateClassObject(a,Oe),this.newVendorStateInfo=E,this.oldVendorStateInfo=a})),Se=C((function e(t){var E=t.callId,a=t.voiceCallId,n=t.callType,r=t.from,_=t.to,T=t.supervisorName,i=t.isBargedIn,o=t.connectionId;N(this,e),ce.validateString(E),this.callId=E,this.voiceCallId=a,this.callType=n,this.from=r,this.to=_,this.supervisorName=T,this.isBargedIn=i,this.connectionId=o||E})),Ie=C((function e(t){var E=t.callId,a=t.stats,n=t.isAudioStatsCompleted;N(this,e),E&&(ce.validateString(E),this.callId=E),a&&(ce.validateClassObject(a,Array),a.forEach((function(e){return ce.validateClassObject(e,ue)})),this.stats=a),n&&(ce.validateBoolean(n),this.isAudioStatsCompleted=n)})),ue=C((function e(t){var E=t.inputChannelStats,a=t.outputChannelStats;N(this,e),E&&ce.validateClassObject(E,Pe),a&&ce.validateClassObject(a,Pe),this.inputChannelStats=E,this.outputChannelStats=a})),Pe=C((function e(t){var E=t.packetsCount,a=t.packetsLost,n=t.jitterBufferMillis,r=t.roundTripTimeMillis;N(this,e),E=null==E||E<0?0:E,a=null==a||a<0?0:a,n=null==n||n<0?0:n,r=null==r||r<0?0:r,this.statsCount=0,this.packetsCount=E,this.packetsLost=a,this.jitterBufferMillis=n,this.roundTripTimeMillis=r})),de=C((function e(t){var E=t.call;N(this,e),ce.validateClassObject(E,se),this.call=E})),Le=function(e){function t(e){var E=e.calls;return N(this,t),v(this,t,[{calls:E}])}return S(t,e),C(t)}(z),pe=C((function e(t){var E=t.success,a=void 0!==E&&E,n=t.showLogin,r=void 0!==n&&n,_=t.loginFrameHeight,T=void 0===_?350:_;N(this,e),this.success=a,this.showLogin=r,this.loginFrameHeight=T})),De=C((function e(t){if(N(this,e),t){var E=t.contains,a=void 0===E?null:E,n=t.limit,r=void 0===n?50:n,_=t.offset,T=void 0===_?0:_,i=t.types,s=void 0===i?[]:i;a&&ce.validateString(a),ce.validateNumber(r),ce.validateNumber(T);var A,l=function(e,t){var E="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!E){if(Array.isArray(e)||(E=function(e,t){if(e){if("string"==typeof e)return V(e,t);var E={}.toString.call(e).slice(8,-1);return"Object"===E&&e.constructor&&(E=e.constructor.name),"Map"===E||"Set"===E?Array.from(e):"Arguments"===E||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(E)?V(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){E&&(e=E);var a=0,n=function(){};return{s:n,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,_=!0,T=!1;return{s:function(){E=E.call(e)},n:function(){var e=E.next();return _=e.done,e},e:function(e){T=!0,r=e},f:function(){try{_||null==E.return||E.return()}finally{if(T)throw r}}}}(s);try{for(l.s();!(A=l.n()).done;)A.value,ce.validateEnum(s,Object.values(o.CONTACTS_FILTER_TYPES))}catch(e){l.e(e)}finally{l.f()}this.contains=a,this.limit=r,this.offset=T,this.types=s}})),he=C((function e(t){var E=t.agentWorkId,a=t.workItemId;if(N(this,e),E&&(ce.validateString(E),this.agentWorkId=E),a&&(ce.validateString(a),this.workItemId=a),!E&&!a)throw new Error("You must pass at least one of agent work id or work item (voice call or messaging session) id")})),Ve=!1;function ve(e){var t=function(e){var t=Y[e];return{packetsCount:t.packetsCount/t.statsCount,packetsLost:t.packetsLost/t.statsCount,jitterBufferMillis:t.jitterBufferMillis/t.statsCount,roundTripTimeMillis:t.roundTripTimeMillis/t.statsCount}}(e),E=t.roundTripTimeMillis+2*t.jitterBufferMillis+10,a=0;return a=E<160?93.2-E/40:93.2-(E-120)/10,1+.035*(a-=t.packetsLost/t.packetsCount*2.5)+7e-6*a*(a-60)*(100-a)}function fe(){if(Ve&&Y){var e=ve("inputChannelStats"),t=ve("outputChannelStats");return Y=null,isNaN(t)&&isNaN(e)?0:isNaN(t)?e:isNaN(e)?t:Math.min(e,t)}}function Ge(){Y=new ue({inputChannelStats:new Pe({packetsCount:0,packetsLost:0,jitterBufferMillis:0,roundTripTimeMillis:0}),outputChannelStats:new Pe({packetsCount:0,packetsLost:0,jitterBufferMillis:0,roundTripTimeMillis:0})})}function be(e){return e&&e.type?e.type:e}function Ye(t){if(t){if("function"==typeof t)return;if("object"===e(t)){var E=Array.isArray(t),a=E?[]:{};if(E)t.forEach((function(e){a.push(Ye(e))}));else for(var n in t)"phoneNumber"!==n&&"number"!==n&&"name"!==n&&"callAttributes"!==n&&"/reqHvcc/reqTelephonyIntegrationCertificate"!==n&&(a[n]=Ye(t[n]));return a}}return t}function Ue(e){return e&&e.message?e.message:e}function ge(e,t,E){var a=Ye(t);D({eventType:e,payload:t},E?o.LOG_LEVEL.ERROR:o.LOG_LEVEL.INFO,o.LOG_SOURCE.SYSTEM),U.postMessage({type:o.SHARED_MESSAGE_TYPE.LOG,payload:{eventType:e,payload:a,isError:E}})}function ye(e,t){var E=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];U.postMessage({type:o.SHARED_MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,payload:{telephonyEventType:e,telephonyEventPayload:t}}),E&&ge(e,t,!1)}function me(e,t,E){console.error("SCV dispatched error ".concat(e," for eventType ").concat(E),t),ye(o.SHARED_EVENT_TYPE.ERROR,{message:e},!1),ge(E,{errorType:e,error:t},!0)}function He(e,t){var E={customError:{labelName:e.labelName,namespace:e.namespace,message:e.message}};console.error("SCV dispatched custom error for eventType ".concat(t),E),ye(o.SHARED_EVENT_TYPE.ERROR,E,!1),ge(t,{errorType:o.SHARED_ERROR_TYPE.CUSTOM_ERROR,error:e},!0)}function Me(e,t){console.info("SCV info message dispatched for eventType ".concat(e," with payload ").concat(JSON.stringify(t))),ye(o.SHARED_EVENT_TYPE.INFO,{message:e},!1),ge(e,t,!1)}function ke(){return we.apply(this,arguments)}function we(){return(we=_(i().mark((function e(){var t,E,a,r,_,T,s,A,l;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.getTelephonyConnector();case 3:return E=e.sent,e.next=6,E.getAgentConfig();case 6:return a=e.sent,e.next=9,g.getSharedCapabilities();case 9:return r=e.sent,e.next=12,E.getVoiceCapabilities();case 12:return _=e.sent,ce.validateClassObject(a,W),ce.validateClassObject(_,j),_.supportsMos&&(Ve=!0),e.next=18,E.getActiveCalls();case 18:T=e.sent,ce.validateClassObject(T,B),s=T.activeCalls,A=o.SHARED_MESSAGE_TYPE.CONNECTOR_READY,l={agentConfig:n(n({},o.AGENT_CONFIG_TYPE.PHONES,a.phones),o.AGENT_CONFIG_TYPE.SELECTED_PHONE,a.selectedPhone),capabilities:(t={},n(n(n(n(n(n(n(n(n(n(t,o.SHARED_CAPABILITIES_TYPE.DEBUG_ENABLED,r.debugEnabled),o.SHARED_CAPABILITIES_TYPE.CONTACT_SEARCH,r.hasContactSearch),o.SHARED_CAPABILITIES_TYPE.VENDOR_PROVIDED_AVAILABILITY,r.hasAgentAvailability),o.SHARED_CAPABILITIES_TYPE.VENDOR_PROVIDED_QUEUE_WAIT_TIME,r.hasQueueWaitTime),o.SHARED_CAPABILITIES_TYPE.TRANSFER_TO_OMNI_FLOW,r.hasTransferToOmniFlow),o.SHARED_CAPABILITIES_TYPE.PENDING_STATUS_CHANGE,r.hasPendingStatusChange),o.SHARED_CAPABILITIES_TYPE.SFDC_PENDING_STATE,r.hasSFDCPendingState),o.SHARED_CAPABILITIES_TYPE.AUTO_ACCEPT_ENABLED,r.hasAutoAcceptEnabled),o.VOICE_CAPABILITIES_TYPE.MUTE,_.hasMute),o.VOICE_CAPABILITIES_TYPE.RECORD,_.hasRecord),n(n(n(n(n(n(n(n(n(n(t,o.VOICE_CAPABILITIES_TYPE.MERGE,_.hasMerge),o.VOICE_CAPABILITIES_TYPE.SWAP,_.hasSwap),o.VOICE_CAPABILITIES_TYPE.BLIND_TRANSFER,_.hasBlindTransfer),o.VOICE_CAPABILITIES_TYPE.SIGNED_RECORDING_URL,_.hasSignedRecordingUrl),o.VOICE_CAPABILITIES_TYPE.SUPERVISOR_LISTEN_IN,_.hasSupervisorListenIn),o.VOICE_CAPABILITIES_TYPE.SUPERVISOR_BARGE_IN,_.hasSupervisorBargeIn),o.VOICE_CAPABILITIES_TYPE.MOS,_.supportsMos),o.VOICE_CAPABILITIES_TYPE.PHONEBOOK,_.hasPhoneBook),o.VOICE_CAPABILITIES_TYPE.HAS_GET_EXTERNAL_SPEAKER,_.hasGetExternalSpeakerDeviceSetting),o.VOICE_CAPABILITIES_TYPE.HAS_SET_EXTERNAL_SPEAKER,_.hasSetExternalSpeakerDeviceSetting),n(n(n(n(n(n(t,o.VOICE_CAPABILITIES_TYPE.HAS_GET_EXTERNAL_MICROPHONE,_.hasGetExternalMicrophoneDeviceSetting),o.VOICE_CAPABILITIES_TYPE.HAS_SET_EXTERNAL_MICROPHONE,_.hasSetExternalMicrophoneDeviceSetting),o.VOICE_CAPABILITIES_TYPE.CAN_CONSULT,_.canConsult),o.VOICE_CAPABILITIES_TYPE.DIAL_PAD,_.isDialPadDisabled),o.VOICE_CAPABILITIES_TYPE.HAS_HID_SUPPORT,_.isHidSupported),o.VOICE_CAPABILITIES_TYPE.PHONEBOOK_DISABLE,_.isPhoneBookDisabled)),callInProgress:s.length>0?s[0]:null},U.postMessage({type:A,payload:l}),ge(A,l,!1),e.next=31;break;case 27:e.prev=27,e.t0=e.catch(0),U.postMessage({type:o.SHARED_MESSAGE_TYPE.CONNECTOR_READY,payload:{}}),ge(o.SHARED_MESSAGE_TYPE.CONNECTOR_READY,{},!1);case 31:case"end":return e.stop()}}),e,null,[[0,27]])})))).apply(this,arguments)}function Be(e){return xe.apply(this,arguments)}function xe(){return(xe=_(i().mark((function e(t){var E,a,n,r,_,T,s,A,l,c,C,N,O,R,S,I,u,P,d,L,D,h,V,v,f,G,b,Y,U,m,M,k,w,F,j,W,K,q,Q,Z,te,Te,oe,se,Ae,le,Ce,Ne,Re,Se,Ie,ue,Pe,pe,De,he,Ve,ve,fe,Ye,ke,we,Be,xe,Fe,je,We,Ke,qe,Qe,Xe,$e,ze,Ze,et,tt,Et,at,nt,rt,_t,Tt,it,ot;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(E=t.data.type)!==o.SHARED_MESSAGE_TYPE.LOG&&ge(E,t.data,!1),e.t0=E,e.next=e.t0===o.VOICE_MESSAGE_TYPE.ACCEPT_CALL?5:e.t0===o.VOICE_MESSAGE_TYPE.DECLINE_CALL?32:e.t0===o.VOICE_MESSAGE_TYPE.END_CALL?48:e.t0===o.VOICE_MESSAGE_TYPE.MUTE?69:e.t0===o.VOICE_MESSAGE_TYPE.UNMUTE?83:e.t0===o.VOICE_MESSAGE_TYPE.HOLD?97:e.t0===o.VOICE_MESSAGE_TYPE.RESUME?121:e.t0===o.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS?145:e.t0===o.SHARED_MESSAGE_TYPE.GET_AGENT_STATUS?171:e.t0===o.VOICE_MESSAGE_TYPE.DIAL?183:e.t0===o.VOICE_MESSAGE_TYPE.SEND_DIGITS?214:e.t0===o.VOICE_MESSAGE_TYPE.GET_PHONE_CONTACTS?226:e.t0===o.SHARED_MESSAGE_TYPE.GET_CONTACTS?242:e.t0===o.VOICE_MESSAGE_TYPE.SWAP_PARTICIPANTS?255:e.t0===o.VOICE_MESSAGE_TYPE.CONFERENCE?269:e.t0===o.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT?283:e.t0===o.VOICE_MESSAGE_TYPE.PAUSE_RECORDING?309:e.t0===o.VOICE_MESSAGE_TYPE.RESUME_RECORDING?323:e.t0===o.SHARED_MESSAGE_TYPE.LOGOUT?337:e.t0===o.SHARED_MESSAGE_TYPE.MESSAGE?350:e.t0===o.VOICE_MESSAGE_TYPE.WRAP_UP_CALL?352:e.t0===o.VOICE_MESSAGE_TYPE.AGENT_AVAILABLE?357:e.t0===o.VOICE_MESSAGE_TYPE.SET_AGENT_CONFIG?399:e.t0===o.VOICE_MESSAGE_TYPE.GET_AUDIO_DEVICES?415:e.t0===o.VOICE_MESSAGE_TYPE.GET_SIGNED_RECORDING_URL?430:e.t0===o.SHARED_MESSAGE_TYPE.DOWNLOAD_VENDOR_LOGS?448:e.t0===o.SHARED_MESSAGE_TYPE.LOG?450:e.t0===o.VOICE_MESSAGE_TYPE.SUPERVISE_CALL?453:e.t0===o.VOICE_MESSAGE_TYPE.SUPERVISOR_DISCONNECT?473:e.t0===o.VOICE_MESSAGE_TYPE.SUPERVISOR_BARGE_IN?489:e.t0===o.SHARED_MESSAGE_TYPE.AGENT_WORK_EVENT?504:507;break;case 5:if(e.prev=5,!t.data.call||!t.data.call.callType||t.data.call.callType.toLowerCase()!==o.CALL_TYPE.OUTBOUND.toLowerCase()&&t.data.call.callType.toLowerCase()!==o.CALL_TYPE.DIALED_CALLBACK.toLowerCase()){e.next=8;break}return e.abrupt("return");case 8:return Ge(),e.next=11,g.getTelephonyConnector();case 11:if(a=e.sent,!y){e.next=19;break}return e.next=15,a.supervisorDisconnect();case 15:n=e.sent,ce.validateClassObject(n,Le),y=!1,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP,n.calls);case 19:return e.next=21,a.acceptCall(t.data.call);case 21:r=e.sent,ce.validateClassObject(r,$),ye((_=r.call).callType.toLowerCase()===o.CALL_TYPE.CALLBACK.toLowerCase()?o.VOICE_EVENT_TYPE.CALL_STARTED:o.VOICE_EVENT_TYPE.CALL_CONNECTED,_),e.next=31;break;case 27:e.prev=27,e.t1=e.catch(5),y=!1,e.t1 instanceof H?He(e.t1,o.VOICE_MESSAGE_TYPE.ACCEPT_CALL):Me(o.INFO_TYPE.CAN_NOT_ACCEPT_THE_CALL,{messagetype:o.VOICE_MESSAGE_TYPE.ACCEPT_CALL,additionalInfo:e.t1});case 31:return e.abrupt("break",508);case 32:return e.prev=32,e.next=35,g.getTelephonyConnector();case 35:return T=e.sent,e.next=38,T.declineCall(t.data.call);case 38:s=e.sent,ce.validateClassObject(s,$),A=s.call,ye(o.VOICE_EVENT_TYPE.HANGUP,A),e.next=47;break;case 44:e.prev=44,e.t2=e.catch(32),e.t2 instanceof H?He(e.t2,o.VOICE_MESSAGE_TYPE.DECLINE_CALL):me(o.VOICE_ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL,e.t2,o.VOICE_MESSAGE_TYPE.DECLINE_CALL);case 47:return e.abrupt("break",508);case 48:return e.prev=48,e.next=51,g.getTelephonyConnector();case 51:return l=e.sent,e.next=54,l.endCall(t.data.call,t.data.agentStatus);case 54:return c=e.sent,ce.validateClassObject(c,z),e.next=58,l.getActiveCalls();case 58:C=e.sent,ce.validateClassObject(C,B),N=C.activeCalls,O=c.calls,0===N.length?ye(o.VOICE_EVENT_TYPE.HANGUP,O):ye(o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED,O.length>0&&O[0]),e.next=68;break;case 65:e.prev=65,e.t3=e.catch(48),e.t3 instanceof H?He(e.t3,o.VOICE_MESSAGE_TYPE.END_CALL):me(o.VOICE_ERROR_TYPE.CAN_NOT_END_THE_CALL,e.t3,o.VOICE_MESSAGE_TYPE.END_CALL);case 68:return e.abrupt("break",508);case 69:return e.prev=69,e.next=72,g.getTelephonyConnector();case 72:return R=e.sent,e.next=75,R.mute(t.data.call);case 75:S=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.MUTE_TOGGLE,payload:S}),e.next=82;break;case 79:e.prev=79,e.t4=e.catch(69),e.t4 instanceof H?He(e.t4,o.VOICE_MESSAGE_TYPE.MUTE):me(o.VOICE_ERROR_TYPE.CAN_NOT_MUTE_CALL,e.t4,o.VOICE_MESSAGE_TYPE.MUTE);case 82:return e.abrupt("break",508);case 83:return e.prev=83,e.next=86,g.getTelephonyConnector();case 86:return I=e.sent,e.next=89,I.unmute(t.data.call);case 89:u=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.MUTE_TOGGLE,payload:u}),e.next=96;break;case 93:e.prev=93,e.t5=e.catch(83),e.t5 instanceof H?He(e.t5,o.VOICE_MESSAGE_TYPE.UNMUTE):me(o.VOICE_ERROR_TYPE.CAN_NOT_UNMUTE_CALL,e.t5,o.VOICE_MESSAGE_TYPE.UNMUTE);case 96:return e.abrupt("break",508);case 97:return e.prev=97,e.next=100,g.getTelephonyConnector();case 100:return P=e.sent,e.next=103,P.hold(t.data.call);case 103:d=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.HOLD_TOGGLE,payload:d}),e.next=120;break;case 107:if(e.prev=107,e.t6=e.catch(97),!(e.t6 instanceof H)){e.next=113;break}He(e.t6,o.VOICE_MESSAGE_TYPE.HOLD),e.next=120;break;case 113:e.t7=be(e.t6),e.next=e.t7===o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT?116:118;break;case 116:return me(o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT,Ue(e.t6),o.VOICE_MESSAGE_TYPE.HOLD),e.abrupt("break",120);case 118:return me(o.VOICE_ERROR_TYPE.CAN_NOT_HOLD_CALL,Ue(e.t6),o.VOICE_MESSAGE_TYPE.HOLD),e.abrupt("break",120);case 120:return e.abrupt("break",508);case 121:return e.prev=121,e.next=124,g.getTelephonyConnector();case 124:return L=e.sent,e.next=127,L.resume(t.data.call);case 127:D=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.HOLD_TOGGLE,payload:D}),e.next=144;break;case 131:if(e.prev=131,e.t8=e.catch(121),!(e.t8 instanceof H)){e.next=137;break}He(e.t8,o.VOICE_MESSAGE_TYPE.RESUME),e.next=144;break;case 137:e.t9=be(e.t8),e.next=e.t9===o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT?140:142;break;case 140:return me(o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT,Ue(e.t8),o.VOICE_MESSAGE_TYPE.RESUME),e.abrupt("break",144);case 142:return me(o.VOICE_ERROR_TYPE.CAN_NOT_RESUME_CALL,Ue(e.t8),o.VOICE_MESSAGE_TYPE.RESUME),e.abrupt("break",144);case 144:return e.abrupt("break",508);case 145:return e.prev=145,h=t.data.statusInfo||{},V=t.data.enqueueNextState||!1,e.next=150,g.setAgentStatus(t.data.agentStatus,h,V);case 150:v=e.sent,ce.validateClassObject(v,ae,ne),f=v.success,G=v.isStatusSyncNeeded,ye(o.SHARED_EVENT_TYPE.SET_AGENT_STATUS_RESULT,void 0!==G?{success:f,isStatusSyncNeeded:G}:{success:f}),e.next=170;break;case 156:if(e.prev=156,e.t10=e.catch(145),!(e.t10 instanceof H)){e.next=162;break}He(e.t10,o.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS),e.next=170;break;case 162:t.data.statusInfo&&ye(o.SHARED_EVENT_TYPE.SET_AGENT_STATUS_RESULT,{success:!1}),e.t11=be(e.t10),e.next=e.t11===o.SHARED_ERROR_TYPE.INVALID_AGENT_STATUS?166:168;break;case 166:return me(o.SHARED_ERROR_TYPE.INVALID_AGENT_STATUS,Ue(e.t10),o.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS),e.abrupt("break",170);case 168:return me(o.SHARED_ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS,Ue(e.t10),o.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS),e.abrupt("break",170);case 170:return e.abrupt("break",508);case 171:return e.prev=171,e.next=174,g.getAgentStatus();case 174:b=e.sent,ce.validateClassObject(b,Oe),ye(o.SHARED_EVENT_TYPE.GET_AGENT_STATUS_RESULT,b),e.next=182;break;case 179:e.prev=179,e.t12=e.catch(171),e.t12 instanceof H?He(e.t12,o.SHARED_MESSAGE_TYPE.GET_AGENT_STATUS):me(o.SHARED_ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS,Ue(e.t12),o.SHARED_MESSAGE_TYPE.GET_AGENT_STATUS);case 182:return e.abrupt("break",508);case 183:return e.prev=183,e.next=186,g.getTelephonyConnector();case 186:return Y=e.sent,U=t.data.params&&t.data.params.indexOf(o.DIAL_OPTIONS.CALLBACK)>=0,m=t.data.params&&t.data.params.indexOf(o.DIAL_OPTIONS.CONSULT)>=0,e.next=191,Y.dial(new ie(t.data.contact),new Ee({isCallback:U,isConsultCall:m}));case 191:M=e.sent,ce.validateClassObject(M,$),k=M.call,o.CALL_TYPE.DIALED_CALLBACK.toLowerCase()===k.callType.toLowerCase()&&U?ye(o.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED,k):ye(o.VOICE_EVENT_TYPE.CALL_STARTED,k),e.next=213;break;case 197:if(e.prev=197,e.t13=e.catch(183),ye(o.VOICE_EVENT_TYPE.CALL_FAILED),!(e.t13 instanceof H)){e.next=204;break}He(e.t13,o.VOICE_MESSAGE_TYPE.DIAL),e.next=213;break;case 204:e.t14=be(e.t13),e.next=e.t14===o.VOICE_ERROR_TYPE.INVALID_DESTINATION?207:e.t14===o.SHARED_ERROR_TYPE.GENERIC_ERROR?209:211;break;case 207:return me(o.VOICE_ERROR_TYPE.INVALID_DESTINATION,Ue(e.t13),o.VOICE_MESSAGE_TYPE.DIAL),e.abrupt("break",213);case 209:return me(o.SHARED_ERROR_TYPE.GENERIC_ERROR,Ue(e.t13),o.VOICE_MESSAGE_TYPE.DIAL),e.abrupt("break",213);case 211:return me(o.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL,Ue(e.t13),o.VOICE_MESSAGE_TYPE.DIAL),e.abrupt("break",213);case 213:return e.abrupt("break",508);case 214:return e.prev=214,e.next=217,g.getTelephonyConnector();case 217:return w=e.sent,e.next=220,w.sendDigits(t.data.digits);case 220:e.next=225;break;case 222:e.prev=222,e.t15=e.catch(214),ge(o.VOICE_MESSAGE_TYPE.SEND_DIGITS,t.data.digits,!0);case 225:return e.abrupt("break",508);case 226:return e.prev=226,e.next=229,g.getTelephonyConnector();case 229:return F=e.sent,e.next=232,F.getPhoneContacts(t.data.filter);case 232:j=e.sent,ce.validateClassObject(j,J),W=j.contacts.map((function(e){return{id:e.id,type:e.type,name:e.name,listType:e.listType,phoneNumber:e.phoneNumber,prefix:e.prefix,extension:e.extension,endpointARN:e.endpointARN,queue:e.queue,availability:e.availability,queueWaitTime:e.queueWaitTime,recordId:e.recordId,description:e.description}})),ye(o.VOICE_EVENT_TYPE.PHONE_CONTACTS,{contacts:W,contactTypes:j.contactTypes}),e.next=241;break;case 238:e.prev=238,e.t16=e.catch(226),e.t16 instanceof H?He(e.t16,o.VOICE_MESSAGE_TYPE.GET_PHONE_CONTACTS):me(o.VOICE_ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS,e.t16,o.VOICE_MESSAGE_TYPE.GET_PHONE_CONTACTS);case 241:return e.abrupt("break",508);case 242:return e.prev=242,e.next=245,g.getContacts(t.data.filter,t.data.workItemId);case 245:K=e.sent,ce.validateClassObject(K,X),q=K.contacts.map((function(e){return{id:e.id,type:e.type,name:e.name,listType:e.listType,phoneNumber:e.phoneNumber,prefix:e.prefix,extension:e.extension,endpointARN:e.endpointARN,queue:e.queue,availability:e.availability,queueWaitTime:e.queueWaitTime,recordId:e.recordId,description:e.description}})),ye(o.SHARED_EVENT_TYPE.GET_CONTACTS_RESULT,{contacts:q,contactTypes:K.contactTypes}),e.next=254;break;case 251:e.prev=251,e.t17=e.catch(242),He(e.t17,o.SHARED_MESSAGE_TYPE.GET_CONTACTS);case 254:return e.abrupt("break",508);case 255:return e.prev=255,e.next=258,g.getTelephonyConnector();case 258:return Q=e.sent,e.next=261,Q.swap(t.data.callToHold,t.data.callToResume);case 261:Z=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED,payload:Z}),e.next=268;break;case 265:e.prev=265,e.t18=e.catch(255),e.t18 instanceof H?He(e.t18,o.VOICE_MESSAGE_TYPE.SWAP_PARTICIPANTS):me(o.VOICE_ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS,e.t18,o.VOICE_MESSAGE_TYPE.SWAP_PARTICIPANTS);case 268:return e.abrupt("break",508);case 269:return e.prev=269,e.next=272,g.getTelephonyConnector();case 272:return te=e.sent,e.next=275,te.conference(t.data.calls);case 275:Te=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED,payload:Te}),e.next=282;break;case 279:e.prev=279,e.t19=e.catch(269),e.t19 instanceof H?He(e.t19,o.VOICE_MESSAGE_TYPE.CONFERENCE):me(o.VOICE_ERROR_TYPE.CAN_NOT_CONFERENCE,e.t19,o.VOICE_MESSAGE_TYPE.CONFERENCE);case 282:return e.abrupt("break",508);case 283:return e.prev=283,e.next=286,g.getTelephonyConnector();case 286:return oe=e.sent,e.next=289,oe.addParticipant(new ie(t.data.contact),t.data.call,t.data.isBlindTransfer);case 289:se=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED,payload:se}),t.data.isBlindTransfer&&ye(o.VOICE_EVENT_TYPE.HANGUP,t.data.call),e.next=308;break;case 294:if(e.prev=294,e.t20=e.catch(283),ye(o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED,{reason:o.SHARED_EVENT_TYPE.ERROR.toLowerCase()}),!(e.t20 instanceof H)){e.next=301;break}He(e.t20,o.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT),e.next=308;break;case 301:e.t21=be(e.t20),e.next=e.t21===o.VOICE_ERROR_TYPE.INVALID_DESTINATION?304:306;break;case 304:return me(o.VOICE_ERROR_TYPE.INVALID_DESTINATION,Ue(e.t20),o.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT),e.abrupt("break",308);case 306:return me(o.VOICE_ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,Ue(e.t20),o.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT),e.abrupt("break",308);case 308:return e.abrupt("break",508);case 309:return e.prev=309,e.next=312,g.getTelephonyConnector();case 312:return Ae=e.sent,e.next=315,Ae.pauseRecording(t.data.call);case 315:le=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.RECORDING_TOGGLE,payload:le}),e.next=322;break;case 319:e.prev=319,e.t22=e.catch(309),e.t22 instanceof H?He(e.t22,o.VOICE_MESSAGE_TYPE.PAUSE_RECORDING):me(o.VOICE_ERROR_TYPE.CAN_NOT_PAUSE_RECORDING,e.t22,o.VOICE_MESSAGE_TYPE.PAUSE_RECORDING);case 322:return e.abrupt("break",508);case 323:return e.prev=323,e.next=326,g.getTelephonyConnector();case 326:return Ce=e.sent,e.next=329,Ce.resumeRecording(t.data.call);case 329:Ne=e.sent,Je({eventType:o.VOICE_EVENT_TYPE.RECORDING_TOGGLE,payload:Ne}),e.next=336;break;case 333:e.prev=333,e.t23=e.catch(323),e.t23 instanceof H?He(e.t23,o.VOICE_MESSAGE_TYPE.RESUME_RECORDING):me(o.VOICE_ERROR_TYPE.CAN_NOT_RESUME_RECORDING,e.t23,o.VOICE_MESSAGE_TYPE.RESUME_RECORDING);case 336:return e.abrupt("break",508);case 337:return e.prev=337,e.next=340,g.logout();case 340:Re=e.sent,ce.validateClassObject(Re,_e),Se=Re.success,Ie=Re.loginFrameHeight,ye(o.SHARED_EVENT_TYPE.LOGOUT_RESULT,{success:Se,loginFrameHeight:Ie}),e.next=349;break;case 346:e.prev=346,e.t24=e.catch(337),e.t24 instanceof H?He(e.t24,o.SHARED_MESSAGE_TYPE.LOGOUT):me(o.SHARED_ERROR_TYPE.CAN_NOT_LOG_OUT,e.t24,o.SHARED_MESSAGE_TYPE.LOGOUT);case 349:return e.abrupt("break",508);case 350:return g.handleMessage(t.data.message),e.abrupt("break",508);case 352:return e.next=354,g.getTelephonyConnector();case 354:return e.sent.wrapUpCall(t.data.call),e.abrupt("break",508);case 357:if(!t.data||!t.data.isAvailable){e.next=398;break}return e.next=360,g.getTelephonyConnector();case 360:return ue=e.sent,e.next=363,ue.getActiveCalls();case 363:Pe=e.sent,ce.validateClassObject(Pe,B),pe=Pe.activeCalls,e.t25=i().keys(pe);case 367:if((e.t26=e.t25()).done){e.next=398;break}if(De=e.t26.value,he=pe[De],Ve=!he.callInfo||he.callInfo.isReplayable,ve=he.callAttributes&&he.callAttributes.participantType===o.PARTICIPANT_TYPE.SUPERVISOR,fe=ve&&he.callAttributes&&he.callAttributes.hasSupervisorBargedIn,!Ve){e.next=396;break}he.isReplayedCall=!0,e.t27=he.state,e.next=e.t27===o.CALL_STATE.CONNECTED?378:e.t27===o.CALL_STATE.RINGING?385:e.t27===o.CALL_STATE.TRANSFERRING?391:e.t27===o.CALL_STATE.TRANSFERRED?393:395;break;case 378:if(!ve){e.next=383;break}return y=!0,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,he),fe&&ye(o.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN,he),e.abrupt("break",396);case 383:return ye(o.VOICE_EVENT_TYPE.CALL_CONNECTED,he),e.abrupt("break",396);case 385:if(!ve){e.next=389;break}return y=!0,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED,he),e.abrupt("break",396);case 389:return ye(o.VOICE_EVENT_TYPE.CALL_STARTED,he),e.abrupt("break",396);case 391:return ye(o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED,{phoneNumber:he.contact.phoneNumber,contact:he.contact,callInfo:he.callInfo,callAttributes:he.callAttributes,initialCallHasEnded:he.callAttributes.initialCallHasEnded,callId:he.callId,connectionId:he.connectionId}),e.abrupt("break",396);case 393:return ye(o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED,{phoneNumber:he.contact.phoneNumber,contact:he.contact,callInfo:he.callInfo,callAttributes:he.callAttributes,initialCallHasEnded:he.callAttributes.initialCallHasEnded,callId:he.callId,connectionId:he.connectionId}),e.abrupt("break",396);case 395:return e.abrupt("break",396);case 396:e.next=367;break;case 398:return e.abrupt("break",508);case 399:return e.prev=399,e.next=402,g.getTelephonyConnector();case 402:return Ye=e.sent,e.next=405,Ye.setAgentConfig(t.data.config);case 405:ke=e.sent,ce.validateClassObjects(ke,ae,re),ke instanceof re&&ke.setIsSystemEvent(!!t.data.config.isSystemEvent),ye(o.VOICE_EVENT_TYPE.AGENT_CONFIG_UPDATED,ke),e.next=414;break;case 411:e.prev=411,e.t28=e.catch(399),e.t28 instanceof H?He(e.t28,o.VOICE_MESSAGE_TYPE.SET_AGENT_CONFIG):me(be(e.t28)===o.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER?o.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER:o.VOICE_ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG,Ue(e.t28),o.VOICE_MESSAGE_TYPE.SET_AGENT_CONFIG);case 414:return e.abrupt("break",508);case 415:return e.prev=415,e.next=418,g.getTelephonyConnector();case 418:return we=e.sent,e.next=421,we.getAudioDevices();case 421:Be=e.sent,ce.validateClassObject(Be,x),ye(o.VOICE_EVENT_TYPE.GET_AUDIO_DEVICES,Be),e.next=429;break;case 426:e.prev=426,e.t29=e.catch(415),me(o.VOICE_ERROR_TYPE.CAN_NOT_GET_AUDIO_DEVICES,Ue(e.t29),o.VOICE_MESSAGE_TYPE.GET_AUDIO_DEVICES);case 429:return e.abrupt("break",508);case 430:return e.prev=430,xe=t.data,Fe=xe.recordingUrl,je=xe.vendorCallKey,We=xe.callId,e.next=434,g.getTelephonyConnector();case 434:return Ke=e.sent,e.next=437,Ke.getSignedRecordingUrl(Fe,je,We);case 437:qe=e.sent,ce.validateClassObject(qe,ee),ye(o.VOICE_EVENT_TYPE.SIGNED_RECORDING_URL,qe),e.next=447;break;case 442:e.prev=442,e.t30=e.catch(430),Qe=new ee({success:!1}),ye(o.VOICE_EVENT_TYPE.SIGNED_RECORDING_URL,Qe,!1),ge(o.VOICE_MESSAGE_TYPE.GET_SIGNED_RECORDING_URL,Qe,!0);case 447:return e.abrupt("break",508);case 448:return g.downloadLogs(JSON.parse(JSON.stringify(p))),e.abrupt("break",508);case 450:return Xe=t.data,$e=Xe.logLevel,ze=Xe.logMessage,Ze=Xe.payload,g.logMessageToVendor($e,ze,Ze),e.abrupt("break",508);case 453:return e.prev=453,y=!0,e.next=457,g.getTelephonyConnector();case 457:return et=e.sent,e.next=460,et.superviseCall(t.data.call);case 460:return tt=e.sent,ce.validateClassObject(tt,de),e.next=464,et.getAgentConfig();case 464:e.sent.selectedPhone.type===o.PHONE_TYPE.SOFT_PHONE?ye(o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,tt.call):ye(o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED,tt.call),e.next=472;break;case 468:e.prev=468,e.t31=e.catch(453),y=!1,e.t31 instanceof H?He(e.t31,o.VOICE_MESSAGE_TYPE.SUPERVISE_CALL):me(o.VOICE_ERROR_TYPE.CAN_NOT_SUPERVISE_CALL,e.t31,o.VOICE_MESSAGE_TYPE.SUPERVISE_CALL);case 472:return e.abrupt("break",508);case 473:return e.prev=473,e.next=476,g.getTelephonyConnector();case 476:return Et=e.sent,e.next=479,Et.supervisorDisconnect(t.data.call);case 479:at=e.sent,ce.validateClassObject(at,Le),y=!1,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP,at.calls),e.next=488;break;case 485:e.prev=485,e.t32=e.catch(473),e.t32 instanceof H?He(e.t32,o.VOICE_MESSAGE_TYPE.SUPERVISOR_DISCONNECT):me(o.VOICE_ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR,e.t32,o.VOICE_MESSAGE_TYPE.SUPERVISOR_DISCONNECT);case 488:return e.abrupt("break",508);case 489:return e.prev=489,e.next=492,g.getTelephonyConnector();case 492:return nt=e.sent,e.next=495,nt.supervisorBargeIn(t.data.call);case 495:rt=e.sent,ce.validateClassObject(rt,de),ye(o.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN,rt.call),e.next=503;break;case 500:e.prev=500,e.t33=e.catch(489),e.t33 instanceof H?He(e.t33,o.VOICE_MESSAGE_TYPE.SUPERVISOR_BARGE_IN):me(o.VOICE_ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR,e.t33,o.VOICE_MESSAGE_TYPE.SUPERVISOR_BARGE_IN);case 503:return e.abrupt("break",508);case 504:return _t=t.data.agentWork,Tt=_t.workItemId,it=_t.workId,ot=_t.workEvent,g.onAgentWorkEvent({workItemId:Tt,workId:it,workEvent:ot}),e.abrupt("break",508);case 507:return e.abrupt("break",508);case 508:case"end":return e.stop()}}),e,null,[[5,27],[32,44],[48,65],[69,79],[83,93],[97,107],[121,131],[145,156],[171,179],[183,197],[214,222],[226,238],[242,251],[255,265],[269,279],[283,294],[309,319],[323,333],[337,346],[399,411],[415,426],[430,442],[453,468],[473,485],[489,500]])})))).apply(this,arguments)}function Fe(e){return je.apply(this,arguments)}function je(){return(je=_(i().mark((function e(t){var E,a,n,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t.data.type,e.next=e.t0===o.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR?3:33;break;case 3:if(E=/^https:\/\/[\w-.]+(lightning\.[\w]+\.soma\.force\.com|\.lightning\.force\.com|\.lightning\.pc-rnd\.force\.com|\.stm\.force\.com|\.vf\.force\.com|\.salesforce\.com|\.my\.salesforce-sites\.com|\.lightning\.localhost\.[\w]+\.force.com|\.lightning\.force-com\.[\w.-]+\.crm\.dev|\.pc-rnd\.(salesforce|crmforce)\.mil)$/,a=new URL(t.origin),n=a.protocol+"//"+a.hostname,!E.test(n)){e.next=31;break}return(U=t.ports[0]).onmessage=Be,ge(o.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR,We(t.data.connectorConfig),!1),e.prev=10,e.next=13,g.init(t.data.connectorConfig);case 13:r=e.sent,ce.validateClassObject(r,te),r.showStorageAccess?ye(o.SHARED_EVENT_TYPE.SHOW_STORAGE_ACCESS,{success:!0}):r.showLogin?ye(o.SHARED_EVENT_TYPE.SHOW_LOGIN,{loginFrameHeight:r.loginFrameHeight}):r.isSilentLogin?ye(o.SHARED_EVENT_TYPE.SHOW_LOGIN,{isSilentLogin:r.isSilentLogin}):ke(),e.next=31;break;case 18:if(e.prev=18,e.t1=e.catch(10),!(e.t1 instanceof H)){e.next=24;break}He(e.t1,o.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR),e.next=31;break;case 24:e.t2=be(e.t1),e.next=e.t2===o.VOICE_ERROR_TYPE.INVALID_PARAMS?27:29;break;case 27:return me(o.VOICE_ERROR_TYPE.INVALID_PARAMS,Ue(e.t1),o.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR),e.abrupt("break",31);case 29:return me(o.SHARED_ERROR_TYPE.CAN_NOT_LOG_IN,Ue(e.t1),o.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR),e.abrupt("break",31);case 31:return window.removeEventListener("message",Fe),e.abrupt("break",34);case 33:return e.abrupt("break",34);case 34:case"end":return e.stop()}}),e,null,[[10,18]])})))).apply(this,arguments)}function We(e){e=e||{};var t={};return s.forEach((function(E){e.hasOwnProperty(E)&&(t[E]=e[E])})),A.forEach((function(E){Object.keys(e).forEach((function(a){a.startsWith(E)&&!l.includes(a)&&(t[a]=e[a])}))})),t}function Ke(e,t,E,a){try{return ce.validateClassObject(e,t),!0}catch(e){return E&&me(E,e,a),!1}}function qe(e){g=e,window.addEventListener("message",Fe)}function Qe(e){ge(e.eventType,e.payload,e.isError)}function Xe(e){var t=e.eventType,E=e.error;if(E instanceof H)He(E,t);else switch(t){case o.SHARED_EVENT_TYPE.LOGIN_RESULT:me(o.SHARED_ERROR_TYPE.CAN_NOT_LOG_IN,E,o.SHARED_EVENT_TYPE.LOGIN_RESULT);break;case o.SHARED_EVENT_TYPE.LOGOUT_RESULT:me(o.SHARED_ERROR_TYPE.CAN_NOT_LOG_OUT,E,o.SHARED_EVENT_TYPE.LOGOUT_RESULT);break;case o.VOICE_EVENT_TYPE.CALL_STARTED:me(o.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL,E,o.VOICE_EVENT_TYPE.CALL_STARTED);break;case o.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED:me(o.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL,E,o.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED);break;case o.VOICE_EVENT_TYPE.CALL_CONNECTED:me(o.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL,E,o.VOICE_EVENT_TYPE.CALL_CONNECTED);break;case o.VOICE_EVENT_TYPE.HANGUP:me(o.VOICE_ERROR_TYPE.CAN_NOT_END_THE_CALL,E,o.VOICE_EVENT_TYPE.HANGUP);break;case o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED:me(be(E)===o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT?o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT:o.VOICE_ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,E,o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED);break;case o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED:me(o.VOICE_ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT,E,o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED);break;case o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED:me(o.VOICE_ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT,E,o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED);break;case o.VOICE_EVENT_TYPE.MUTE_TOGGLE:me(o.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_MUTE,E,o.VOICE_EVENT_TYPE.MUTE_TOGGLE);break;case o.VOICE_EVENT_TYPE.HOLD_TOGGLE:me(be(E)===o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT?o.VOICE_ERROR_TYPE.INVALID_PARTICIPANT:o.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_HOLD,E,o.VOICE_EVENT_TYPE.HOLD_TOGGLE);break;case o.VOICE_EVENT_TYPE.RECORDING_TOGGLE:me(o.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_RECORD,E,o.VOICE_EVENT_TYPE.RECORDING_TOGGLE);break;case o.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED:me(o.VOICE_ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS,E,o.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED);break;case o.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED:me(o.VOICE_ERROR_TYPE.CAN_NOT_CONFERENCE,E,o.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED);break;case o.VOICE_EVENT_TYPE.AGENT_ERROR:me(o.VOICE_ERROR_TYPE.AGENT_ERROR,E,o.VOICE_EVENT_TYPE.AGENT_ERROR);break;case o.VOICE_EVENT_TYPE.SOFTPHONE_ERROR:switch(be(E)){case o.VOICE_ERROR_TYPE.UNSUPPORTED_BROWSER:case o.VOICE_ERROR_TYPE.MICROPHONE_NOT_SHARED:case o.VOICE_ERROR_TYPE.USER_BUSY_ERROR:case o.VOICE_ERROR_TYPE.WEBRTC_ERROR:me(be(E),E,o.VOICE_EVENT_TYPE.SOFTPHONE_ERROR);break;default:me(o.SHARED_ERROR_TYPE.GENERIC_ERROR,E,o.VOICE_EVENT_TYPE.SOFTPHONE_ERROR)}break;case o.VOICE_EVENT_TYPE.CALL_UPDATED:me(o.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_CALL,E,o.VOICE_EVENT_TYPE.CALL_UPDATED);break;default:console.error("Unhandled error scenario with arguments ",arguments)}}function Je(e){return $e.apply(this,arguments)}function $e(){return($e=_(i().mark((function e(t){var E,a,n,r,_,T,s,A,l,c,C,N,O,R,S,I,u,P,d,L,p,D,h,V,v,f,G,b,U,m,H,M,k,x,F,j,W,K,X,J,ee,te,Ee;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:E=t.eventType,a=t.payload,n=t.registerLog,r=void 0===n||n,e.t0=E,e.next=e.t0===o.SHARED_EVENT_TYPE.LOGIN_RESULT?4:e.t0===o.SHARED_EVENT_TYPE.LOGOUT_RESULT?6:e.t0===o.VOICE_EVENT_TYPE.CALL_STARTED?8:e.t0===o.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED?10:e.t0===o.VOICE_EVENT_TYPE.CALL_CONNECTED?12:e.t0===o.VOICE_EVENT_TYPE.HANGUP?28:e.t0===o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED?30:e.t0===o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED?32:e.t0===o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED?34:e.t0===o.SHARED_EVENT_TYPE.MESSAGE?44:e.t0===o.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED?46:e.t0===o.VOICE_EVENT_TYPE.WRAP_UP_ENDED?48:e.t0===o.SHARED_EVENT_TYPE.REMOTE_CONTROLLER?50:e.t0===o.VOICE_EVENT_TYPE.MUTE_TOGGLE?52:e.t0===o.VOICE_EVENT_TYPE.HOLD_TOGGLE?54:e.t0===o.VOICE_EVENT_TYPE.RECORDING_TOGGLE?57:e.t0===o.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED?60:e.t0===o.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED?62:e.t0===o.VOICE_EVENT_TYPE.CALL_UPDATED?64:e.t0===o.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS?66:e.t0===o.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN?68:e.t0===o.VOICE_EVENT_TYPE.CALL_BARGED_IN?70:e.t0===o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED?72:e.t0===o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED?74:e.t0===o.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP?76:e.t0===o.SHARED_EVENT_TYPE.SET_AGENT_STATUS?78:e.t0===o.VOICE_EVENT_TYPE.SHOW_TRANSFER_VIEW?80:e.t0===o.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT?82:e.t0===o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED?84:e.t0===o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED?86:e.t0===o.SHARED_EVENT_TYPE.GET_AGENT_STATUS?88:e.t0===o.SHARED_EVENT_TYPE.STATE_CHANGE?90:92;break;case 4:return Ke(a,ae,o.SHARED_ERROR_TYPE.CAN_NOT_LOG_IN,o.SHARED_EVENT_TYPE.LOGIN_RESULT)&&(ye(o.SHARED_EVENT_TYPE.LOGIN_RESULT,a,r),a.success&&ke()),e.abrupt("break",92);case 6:return Ke(a,_e,o.SHARED_ERROR_TYPE.CAN_NOT_LOG_OUT,o.SHARED_EVENT_TYPE.LOGOUT_RESULT)&&ye(o.SHARED_EVENT_TYPE.LOGOUT_RESULT,{success:a.success,loginFrameHeight:a.loginFrameHeight},r),e.abrupt("break",92);case 8:return Ke(a,$,o.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL,o.VOICE_EVENT_TYPE.CALL_STARTED)&&ye(o.VOICE_EVENT_TYPE.CALL_STARTED,a.call,!0),e.abrupt("break",92);case 10:return Ke(a,$,o.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL,o.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED)&&ye(o.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED,a.call,!0),e.abrupt("break",92);case 12:if(!Ke(a,$,o.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL,o.VOICE_EVENT_TYPE.CALL_CONNECTED)){e.next=27;break}if(Ge(),!y){e.next=26;break}return e.next=17,g.getTelephonyConnector();case 17:return _=e.sent,e.next=20,_.supervisorDisconnect();case 20:return T=e.sent,ce.validateClassObject(T,Le),y=!1,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP,T,!0),ye(o.VOICE_EVENT_TYPE.CALL_CONNECTED,a.call,!0),e.abrupt("break",92);case 26:ye(o.VOICE_EVENT_TYPE.CALL_CONNECTED,a.call,!0);case 27:return e.abrupt("break",92);case 28:return Ke(a,z,o.VOICE_ERROR_TYPE.CAN_NOT_END_THE_CALL,o.VOICE_EVENT_TYPE.HANGUP)&&ye(o.VOICE_EVENT_TYPE.HANGUP,a.calls,!0),e.abrupt("break",92);case 30:return Ke(a,Q,o.VOICE_ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED)&&(s=a.contact,A=a.initialCallHasEnded,l=a.callInfo,c=a.callAttributes,C=a.phoneNumber,N=a.callId,O=a.connectionId,ye(o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED,{contact:s,initialCallHasEnded:A,callInfo:l,callAttributes:c,phoneNumber:C,callId:N,connectionId:O},!0)),e.abrupt("break",92);case 32:return Ke(a,Q,o.VOICE_ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT,o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED)&&(R=a.initialCallHasEnded,S=a.callInfo,I=a.callAttributes,u=a.phoneNumber,P=a.callId,d=a.contact,L=a.connectionId,ye(o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED,{initialCallHasEnded:R,callInfo:S,callAttributes:I,phoneNumber:u,callId:P,contact:d,connectionId:L},!0)),e.abrupt("break",92);case 34:if(!Ke(a,$,o.VOICE_ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT,o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED)){e.next=43;break}return p=a.call,e.next=38,g.getTelephonyConnector();case 38:return D=e.sent,e.next=41,D.getActiveCalls();case 41:Ke(h=e.sent,B)&&(0===(V=h.activeCalls).length?ye(o.VOICE_EVENT_TYPE.HANGUP,p,!0):p&&p.callAttributes&&p.callType!==o.CALL_TYPE.CONSULT&&p.callAttributes.participantType===o.PARTICIPANT_TYPE.INITIAL_CALLER?ye(Object.values(V).filter((function(e){return e.callType===o.CALL_TYPE.ADD_PARTICIPANT})).pop().state===o.CALL_STATE.TRANSFERRING?o.VOICE_EVENT_TYPE.PARTICIPANT_ADDED:o.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED,{initialCallHasEnded:!0},!0):ye(o.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED,{callId:p?p.callId:null,connectionId:p?p.connectionId:null,reason:p?p.reason:null},!0));case 43:return e.abrupt("break",92);case 44:return ye(o.SHARED_EVENT_TYPE.MESSAGE,a,r),e.abrupt("break",92);case 46:return ye(o.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED,a,r),e.abrupt("break",92);case 48:return ye(o.VOICE_EVENT_TYPE.WRAP_UP_ENDED,a,r),e.abrupt("break",92);case 50:return Be(a),e.abrupt("break",92);case 52:return Ke(a,w,o.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_MUTE,o.VOICE_EVENT_TYPE.MUTE_TOGGLE)&&ye(o.VOICE_EVENT_TYPE.MUTE_TOGGLE,a,r),e.abrupt("break",92);case 54:return v=a.isThirdPartyOnHold,f=a.isCustomerOnHold,G=a.calls,Ke(a,Z,o.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_HOLD,o.VOICE_EVENT_TYPE.HOLD_TOGGLE)&&ye(o.VOICE_EVENT_TYPE.HOLD_TOGGLE,{isThirdPartyOnHold:v,isCustomerOnHold:f,calls:G},r),e.abrupt("break",92);case 57:return b=a.isRecordingPaused,U=a.contactId,m=a.initialContactId,H=a.instanceId,M=a.region,Ke(a,q,o.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_RECORD,o.VOICE_EVENT_TYPE.RECORDING_TOGGLE)&&ye(o.VOICE_EVENT_TYPE.RECORDING_TOGGLE,{isRecordingPaused:b,contactId:U,initialContactId:m,instanceId:H,region:M},r),e.abrupt("break",92);case 60:return Ke(a,Z,o.VOICE_ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS,o.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED)&&(k=a.isThirdPartyOnHold,x=a.isCustomerOnHold,F=a.calls,ye(o.VOICE_EVENT_TYPE.HOLD_TOGGLE,{isThirdPartyOnHold:k,isCustomerOnHold:x,calls:F},!0)),e.abrupt("break",92);case 62:return Ke(a,Z,o.VOICE_ERROR_TYPE.CAN_NOT_CONFERENCE,o.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED)&&(j=a.isThirdPartyOnHold,W=a.isCustomerOnHold,K=a.calls,X=a.isCallMerged,ye(o.VOICE_EVENT_TYPE.HOLD_TOGGLE,{isThirdPartyOnHold:j,isCustomerOnHold:W,isCallMerged:X,calls:K},!0)),e.abrupt("break",92);case 64:return Ke(a,$,o.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_CALL,o.VOICE_EVENT_TYPE.CALL_UPDATED)&&ye(o.VOICE_EVENT_TYPE.CALL_UPDATED,a,r),e.abrupt("break",92);case 66:return Ke(a,Ie)&&(a.stats&&(i=a.stats,Y&&i.forEach((function(e){e.inputChannelStats&&(Y.inputChannelStats.statsCount++,Y.inputChannelStats.packetsCount+=0|e.inputChannelStats.packetsCount,Y.inputChannelStats.packetsLost+=0|e.inputChannelStats.packetsLost,Y.inputChannelStats.jitterBufferMillis+=0|e.inputChannelStats.jitterBufferMillis,Y.inputChannelStats.roundTripTimeMillis+=0|e.inputChannelStats.roundTripTimeMillis),e.outputChannelStats&&(Y.outputChannelStats.statsCount++,Y.outputChannelStats.packetsCount+=0|e.outputChannelStats.packetsCount,Y.outputChannelStats.packetsLost+=0|e.outputChannelStats.packetsLost,Y.outputChannelStats.jitterBufferMillis+=0|e.outputChannelStats.jitterBufferMillis,Y.outputChannelStats.roundTripTimeMillis+=0|e.outputChannelStats.roundTripTimeMillis)})),J=a.callId?{stats:a.stats,callId:a.callId}:{stats:a.stats},ye(o.VOICE_EVENT_TYPE.AUDIO_STATS,{audioStats:J},r)),a.isAudioStatsCompleted&&a.callId&&(ee=a.callId,te=fe(),ye(o.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED,{callId:ee,mos:te},r))),e.abrupt("break",92);case 68:return Ke(a,de,o.VOICE_ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR,o.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN)&&ye(o.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN,a.call,!0),e.abrupt("break",92);case 70:return Ke(a,Se,o.SHARED_ERROR_TYPE.GENERIC_ERROR,o.VOICE_EVENT_TYPE.CALL_BARGED_IN)&&ye(o.VOICE_EVENT_TYPE.CALL_BARGED_IN,a,!0),e.abrupt("break",92);case 72:return Ke(a,de,o.VOICE_ERROR_TYPE.CAN_NOT_SUPERVISE_CALL,o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED)&&(y=!0,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED,a.call,!0)),e.abrupt("break",92);case 74:return Ke(a,de,o.VOICE_ERROR_TYPE.CAN_NOT_SUPERVISE_CALL,o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED)&&(y=!0,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,a.call,!0)),e.abrupt("break",92);case 76:return Ke(a,Le,o.VOICE_ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR,o.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP)&&(y=!1,ye(o.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP,a.calls,!0)),e.abrupt("break",92);case 78:return Ke(a,Ne,o.SHARED_ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS,o.SHARED_EVENT_TYPE.SET_AGENT_STATUS)&&(Ee=a.statusId,ye(o.SHARED_EVENT_TYPE.SET_AGENT_STATUS,{statusId:Ee},r)),e.abrupt("break",92);case 80:return ye(o.VOICE_EVENT_TYPE.SHOW_TRANSFER_VIEW,a),e.abrupt("break",92);case 82:return Ke(a,pe,o.SHARED_ERROR_TYPE.INVALID_STORAGE_ACCESS_RESULT,o.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT)&&(ye(o.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT,a),a.success&&(a.showLogin?ye(o.SHARED_EVENT_TYPE.SHOW_LOGIN,{loginFrameHeight:a.loginFrameHeight},r):ke())),e.abrupt("break",92);case 84:return Ke(a,he,o.SHARED_ERROR_TYPE.INVALID_ACW_INFO,o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED)&&ye(o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED,a,r),e.abrupt("break",92);case 86:return Ke(a,he,o.SHARED_ERROR_TYPE.INVALID_ACW_INFO,o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED)&&ye(o.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED,a,r),e.abrupt("break",92);case 88:return Ke(a,Oe,o.SHARED_ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS,o.SHARED_EVENT_TYPE.GET_AGENT_STATUS)&&ye(o.SHARED_EVENT_TYPE.GET_AGENT_STATUS,a,r),e.abrupt("break",92);case 90:return Ke(a,Re,o.SHARED_ERROR_TYPE.INVALID_STATE_CHANGE_RESULT,o.SHARED_EVENT_TYPE.STATE_CHANGE)&&ye(o.SHARED_EVENT_TYPE.STATE_CHANGE,a),e.abrupt("break",92);case 92:case"end":return e.stop()}var i}),e)})))).apply(this,arguments)}})(),a})()));
//# sourceMappingURL=scv-connector-base.js.map

/***/ }),

/***/ "./node_modules/socket.io-parser/dist/binary.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/binary.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reconstructPacket = exports.deconstructPacket = void 0;
const is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
exports.deconstructPacket = deconstructPacket;
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (is_binary_1.isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
}
exports.reconstructPacket = reconstructPacket;
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" &&
            data.num >= 0 &&
            data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        }
        else {
            throw new Error("illegal attachments");
        }
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const binary_1 = __webpack_require__(/*! ./binary */ "./node_modules/socket.io-parser/dist/binary.js");
const is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-parser");
/**
 * Protocol version.
 *
 * @public
 */
exports.protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (is_binary_1.hasBinary(obj)) {
                obj.type =
                    obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj);
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = binary_1.deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
exports.Encoder = Encoder;
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends Emitter {
    constructor() {
        super();
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT ||
                packet.type === PacketType.BINARY_ACK) {
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emit("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emit("decoded", packet);
            }
        }
        else if (is_binary_1.isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emit("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
        }
    }
}
exports.Decoder = Decoder;
function tryParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/is-binary.js":
/*!*********************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/is-binary.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasBinary = exports.isBinary = void 0;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
exports.isBinary = isBinary;
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}
exports.hasBinary = hasBinary;


/***/ }),

/***/ "./node_modules/yeast/index.js":
/*!*************************************!*\
  !*** ./node_modules/yeast/index.js ***!
  \*************************************/
/***/ ((module) => {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),

/***/ "./src/byo-ott-app/index.js":
/*!**********************************!*\
  !*** ./src/byo-ott-app/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeBYOOTTAppController: () => (/* binding */ initializeBYOOTTAppController)
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/wrapper.mjs");
/* eslint-disable no-unused-vars */





class ConnectorEventEmitter extends events__WEBPACK_IMPORTED_MODULE_2__.EventEmitter {}
const eventEmitter = new ConnectorEventEmitter();

function initializeBYOOTTAppController(connector) {
    connector.sdk.eventEmitter.on('event', async (event) => {
        if (event && event.data) {
            try {
                switch (event.data.type) {
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].GET_AGENT_CONFIG: {
                        const { agentConfig, contactCenterChannels, agentId, userPresenceStatuses, isSCVMultipartyAllowed } = connector.sdk.state;
                        connector.sdk.messageUser(event.fromUsername, 
                                                  _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].AGENT_CONFIG,
                                                 {
                                                    type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].AGENT_CONFIG,
                                                    value: agentConfig,
                                                    userPresenceStatuses,
                                                    contactCenterChannels,
                                                    referrer: `${document.referrer}`,
                                                    agentId,
                                                    isSCVMultipartyAllowed
                                                 })
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_AGENT_CONFIG: {
                        connector.sdk.updateAgentConfig({
                            selectedPhone: event.data.value.selectedPhone
                         });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_AGENT_STATUS: {
                        connector.sdk.publishSetAgentStatus(event.data.statusId);
                    }
                    break;
                }
            } catch (error) {
                const eventType = event.data.eventType;
                connector.sdk.messageUser(event.fromUsername, _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].ERROR,
                {
                    type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].ERROR,
                    error: `${error.message} (Event: ${eventType || event.data.type})`
                })
                console.error(`Error occured when published event ${eventType} from the hardphone simulator: ${error.message}`);
                if (connector.sdk.state.publishHardphoneErrors) {
                    (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishError)({ eventType, error });
                }
            }
        }
    });
}




/***/ }),

/***/ "./src/common/constants.js":
/*!*********************************!*\
  !*** ./src/common/constants.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FILTER_TYPES_TO_CONTACT_TYPES: () => (/* binding */ FILTER_TYPES_TO_CONTACT_TYPES),
/* harmony export */   USER_MESSAGE: () => (/* binding */ USER_MESSAGE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    LOGIN_SUBMIT: 'LOGIN_SUBMIT',
    SHOW_LOGIN_PAGE: 'SHOW_LOGIN_PAGE',
    GET_SHOW_LOGIN_PAGE: 'GET_SHOW_LOGIN_PAGE',
    SET_SHOW_LOGIN_PAGE: 'SET_SHOW_LOGIN_PAGE',
    AGENT_CONFIG: 'AGENT_CONFIG',
    AGENT_WORK_EVENT:'AGENT_WORK_EVENT',
    CAPABILITIES: 'CAPABILITIES',
    GET_AGENT_CONFIG: 'GET_AGENT_CONFIG',
    SET_AGENT_CONFIG: 'SET_AGENT_CONFIG',
    GET_CAPABILITIES: 'GET_CAPABILITIES',
    SET_CAPABILITIES: 'SET_CAPABILITIES',
    SET_CONTACT_TYPES: 'SET_CONTACT_TYPES',
    START_OUTBOUND_CALL: 'START_OUTBOUND_CALL',
    START_INBOUND_CALL: 'START_INBOUND_CALL',
    CONNECT_PARTICIPANT: 'CONNECT_PARTICIPANT',
    REMOVE_PARTICIPANT: 'REMOVE_PARTICIPANT',
    REMOVE_SUPERVISOR: 'REMOVE_SUPERVISOR',
    CONNECT_SUPERVISOR: 'CONNECT_SUPERVISOR',
    CONNECT_CALL: 'CONNECT_CALL',
    AGENT_HANGUP: 'AGENT_HANGUP',
    END_CALL: 'END_CALL',
    CONSULT: 'CONSULT',
    HARDPHONE_EVENT: 'HARDPHONE_EVENT',
    SET_AGENT_STATUS: 'SET_AGENT_STATUS',
    GET_PHONE_CONTACTS: 'GET_PHONE_CONTACTS',
    GET_ACTIVE_CALLS: 'GET_ACTIVE_CALLS',
    CALL_INFO_UPDATED: 'CALL_INFO_UPDATED',
    ACTIVE_CALLS: 'ACTIVE_CALLS',
    SOFTPHONE_LOGOUT: 'SOFTPHONE_LOGOUT',
    CREATE_TRANSCRIPTION: 'SEND_TRANSCRIPTION',
    INBOUND_CALL_TYPE: 'inbound',
    MESSAGE_FROM_CONNECTOR:'MESSAGE_FROM_CONNECTOR',
    MESSAGE_TO_CONNECTOR:'MESSAGE_TO_CONNECTOR',
    SENDER_TYPE: {
        END_USER: 'END_USER',
        HUMAN_AGENT: 'HUMAN_AGENT',
        VIRTUAL_AGENT: 'VIRTUAL_AGENT',
        SUPERVISOR: 'SUPERVISOR',
        EXTERNAL_USER: 'EXTERNAL_USER'
    },
    PARTICIPANT_TYPE: {
        ...scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE
    },
    CALL_TYPE: {
        ...scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE
    },
    CALL_CONTROL: {
        ACCEPT_CALL: 'ACCEPT_CALL',
        DECLINE_CALL: 'DECLINE_CALL',
        MUTE: 'MUTE',
        HOLD: 'HOLD',
        SWAP_PARTICIPANTS: 'SWAP_PARTICIPANTS',
        ADD_PARTICIPANT: 'ADD_PARTICIPANT',
        CONFERENCE: 'CONFERENCE',
        RECORD: 'RECORD'
    },
    HANGUP_REASON: {
        PHONE_CALL_ERROR: "error",
        PHONE_CALL_ENDED: "ended"
    },
    SEND_RECORDING: 'SEND_RECORDING',
    SEND_VOICE_MAIL: 'SEND_VOICE_MAIL',
    SEND_REALTIME_CONVERSATION_EVENTS: 'SEND_REALTIME_CONVERSATION_EVENTS',
    LOGIN_RESULT: 'LOGIN_RESULT',
    LOGOUT_RESULT: 'LOGOUT_RESULT',
    CALL_CONNECTED: 'CALL_CONNECTED',
    THROW_ERROR: 'THROW_ERROR',
    CUSTOM_ERROR: 'CUSTOM_ERROR',
    ERROR: 'ERROR',
    PARTICIPANT_CONNECTED: 'PARTICIPANT_CONNECTED',
    PARTICIPANT_REMOVED: 'PARTICIPANT_REMOVED',
    MESSAGE: 'MESSAGE',
    REMOTE_CONTROLLER: 'REMOTE_CONTROLLER',
    SHARED_EVENT_TYPE: { 
        ...scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.SHARED_EVENT_TYPE 
    },
    VOICE_EVENT_TYPE: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE,
    AGENT_ERROR_STATUS: {
        DECLINED_BY_AGENT: "DeclinedByAgent",
        FAILED_TO_CONNECT_AGENT: "FailedToConnectAgent",
        MISSED_BY_AGENT: "MissedByAgent"
    },
    REQUEST_CALLBACK : 'REQUEST_CALLBACK',
    PUSH_DIALER : 'PUSH_DIALER',
    PROGRESSIVE_DIALER: 'PROGRESSIVE_DIALER',
    CTR_SYNC: 'CTR_SYNC',
    CTR_SYNC_RESULT: 'CTR_SYNC_RESULT',
    SEND_AUDIO_STATS: 'SEND_AUDIO_STATS',
    CONTACT_TYPE : {
        ...scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE
    },
    CALL_UPDATED: 'CALL_UPDATED'
});
const USER_MESSAGE = {
    CALL_STARTED: "CALL_STARTED",
    INTERNAL_CALL_STARTED: "INTERNAL_CALL_STARTED",
    PARTICIPANT_CONNECTED: "PARTICIPANT_CONNECTED",
    CALL_BARGED_IN: "CALL_BARGED_IN",
    CALL_DESTROYED: "CALL_DESTROYED",
    AGENT_WORK_NOTIFICATION: "AGENT_WORK_NOTIFICATION",
    MUTE: "MUTE",
    UNMUTE: "UNMUTE",
    MERGE: "MERGE"
}

const FILTER_TYPES_TO_CONTACT_TYPES = {
    [scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACTS_FILTER_TYPES.AGENT]: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.AGENT,
    [scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACTS_FILTER_TYPES.CONTACT]: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONENUMBER,
    [scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACTS_FILTER_TYPES.DIRECTORY]: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONEBOOK,
    [scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACTS_FILTER_TYPES.QUEUE]: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.QUEUE
};


/***/ }),

/***/ "./src/hid/hidDeviceHandler.js":
/*!*************************************!*\
  !*** ./src/hid/hidDeviceHandler.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hidDeviceHandler: () => (/* binding */ hidDeviceHandler)
/* harmony export */ });
/* harmony import */ var _hidDeviceParserFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hidDeviceParserFactory */ "./src/hid/hidDeviceParserFactory.js");
/*
    Save the hid information received from Salesforce via setAgentConfig
    Based on the device type, parse the data and call respective call actions
 */


async function hidDeviceHandler(config, sdk){
    const devices = await navigator.hid.getDevices();
    if(devices && devices.length > 0) {
        //Filter the device based on the config info passed
        const device = devices.find(d => d.vendorId === config?.hidDeviceInfo?.vendorId &&
            d.productId === config?.hidDeviceInfo?.productId);

        if (device) {
            //fetch hid device specific parser using factory
            const parser = (0,_hidDeviceParserFactory__WEBPACK_IMPORTED_MODULE_0__.getHIDParser)(device);
            //Open the device to receive the input report
            await device.open().then(() => {
                device.oninputreport = e => {
                    parser.parseInputReport(e, sdk);
                }
            });
        }
    }
}


/***/ }),

/***/ "./src/hid/hidDeviceParser.js":
/*!************************************!*\
  !*** ./src/hid/hidDeviceParser.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HIDParser: () => (/* binding */ HIDParser)
/* harmony export */ });
class HIDParser {
    parseInputReport(event, sdk) {
        throw new Error("This method should be overridden by subclasses.");
    }
}


/***/ }),

/***/ "./src/hid/hidDeviceParserFactory.js":
/*!*******************************************!*\
  !*** ./src/hid/hidDeviceParserFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHIDParser: () => (/* binding */ getHIDParser)
/* harmony export */ });
/* harmony import */ var _plantronicsHIDDeviceParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plantronicsHIDDeviceParser */ "./src/hid/plantronicsHIDDeviceParser.js");
/* harmony import */ var _jabraHIDDeviceParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jabraHIDDeviceParser */ "./src/hid/jabraHIDDeviceParser.js");



function getHIDParser(device) {
    switch(device.productName) {
        case "Plantronics Blackwire 5220 Series":
            return new _plantronicsHIDDeviceParser__WEBPACK_IMPORTED_MODULE_0__.PlantronicsHIDDeviceParser();
        case "Jabra EVOLVE LINK MS":
            return new _jabraHIDDeviceParser__WEBPACK_IMPORTED_MODULE_1__.JabraHIDDeviceParser();
        // Add more device types here
        default:
            throw new Error("Unsupported HID device");
    }
}


/***/ }),

/***/ "./src/hid/jabraHIDDeviceParser.js":
/*!*****************************************!*\
  !*** ./src/hid/jabraHIDDeviceParser.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JabraHIDDeviceParser: () => (/* binding */ JabraHIDDeviceParser)
/* harmony export */ });
/* harmony import */ var _hidDeviceParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hidDeviceParser */ "./src/hid/hidDeviceParser.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_1__);



let acceptHangupCalbuffer = [1, 0, 1, 0];
let buffer = [];
let activeCall = null;
let callInfo = null;
class JabraHIDDeviceParser extends _hidDeviceParser__WEBPACK_IMPORTED_MODULE_0__.HIDParser {
    async parseInputReport(event, sdk) {
        const {data} = event;

        //An integer received from the Jabra HID device
        const action = data.getUint8(0);
        const activeCalls = await sdk.getActiveCalls();

        if (activeCalls.activeCalls.length !== 0) {
            activeCall = activeCalls.activeCalls[0];
            callInfo = activeCall.callInfo;
            //set this to send signal to salesforce that the source of action is HID
            callInfo.isHIDCall = true;
            buffer.push(action);
            if (this.compareAcceptHangupCalbuffer(buffer)) {
                buffer = [];
                await this.performAction("acceptOrHangupCall", sdk);
            }
        }
    }

    //process action based on the action number received from HID device
    async performAction(action, sdk) {
        switch (action) {
            case "acceptOrHangupCall": //1,0,1,0
                if (activeCall.state === scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Constants.CALL_STATE.RINGING && activeCall.callType === "inbound") {
                    sdk.log("answer call triggered using HID: ", activeCall);
                    sdk.connectCall(callInfo);
                } else {
                    sdk.log("hangup call triggered using HID: ", activeCall);
                    sdk.hangup(scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Constants.HANGUP_REASON.PHONE_CALL_ENDED);
                }
                break;
        }
    }

    //Check if valid input signal [1,0,1,0] received from Jabra HID device
    compareAcceptHangupCalbuffer(buffer) {
        if (buffer.length === 4) {
            return buffer.every((val, index) => val === acceptHangupCalbuffer[index]);
        }
        return false;
    }
}

/***/ }),

/***/ "./src/hid/plantronicsHIDDeviceParser.js":
/*!***********************************************!*\
  !*** ./src/hid/plantronicsHIDDeviceParser.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlantronicsHIDDeviceParser: () => (/* binding */ PlantronicsHIDDeviceParser)
/* harmony export */ });
/* harmony import */ var _hidDeviceParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hidDeviceParser */ "./src/hid/hidDeviceParser.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_1__);



let buffer = [];
let muteToggleSignal = false;
let activeCall = null;
let callInfo = null;
class PlantronicsHIDDeviceParser extends _hidDeviceParser__WEBPACK_IMPORTED_MODULE_0__.HIDParser {
    async parseInputReport(event, sdk) {
        const {data} = event;

        //An integer received from the Plantronics HID device
        const action = data.getUint8(0);
        const activeCalls = await sdk.getActiveCalls();

        if (activeCalls.activeCalls.length !== 0) {
            activeCall = activeCalls.activeCalls[0];
            callInfo = activeCall.callInfo;
            //set this to send signal to salesforce that the source of action is HID
            callInfo.isHIDCall = true;

            /**
             * Mute/unmute - Action signal toggles between 1,0 and 3,2
             * accept/hangup - Action signal toggles between 2 and 0
             * Since 1,0 contains 0 and 3,2 contains 2, it will collide with accept/hangup signal of 0 or 2.
             * Hence, maintaining buffer and muteToggleSignal to differentiate 0 or 2 coming from mute/unmute(1,0 or 3,2)
             * and not accept/hangup
             */
            if (action === 1 || action === 3) {
                //set buffer and muteToggleSignal to club it with the second signal 0 or 2 that will come
                muteToggleSignal = true;
                buffer = [action];
            } else if (action === 2 || action === 0) {
                //mute action for signal 1,0 or 3,2 emitted through the device, here buffer was set when 1 or 3 received
                if (muteToggleSignal && buffer.length === 1) {
                    await this.performAction("muteToggle", sdk);
                    //reset buffer and muteToggleSignal if mute/unmute signal
                    buffer = [];
                    muteToggleSignal = false;
                } else {
                    //answer or hangup call action for signal 2 or 0 emitted through the device
                    await this.performAction("acceptOrHangupCall", sdk);
                }
            }
        }
    }

    //process action based on the action number received from HID device
    async performAction(action, sdk) {
        switch (action) {
            case "muteToggle": //1,0 or 3,2
                if(callInfo.isMuted) {
                    const payload = await sdk.unmute(activeCall);
                    sdk.log("unmute call triggered using HID: ", activeCall);
                    (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishEvent)({eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Constants.VOICE_EVENT_TYPE.MUTE_TOGGLE, payload});
                } else {
                    const payload = await sdk.mute(activeCall);
                    sdk.log("mute call triggered using HID: ", activeCall);
                    (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishEvent)({eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Constants.VOICE_EVENT_TYPE.MUTE_TOGGLE, payload});
                }
                break;
            case "acceptOrHangupCall": //2 or 0
                if (activeCall.state === scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Constants.CALL_STATE.RINGING && activeCall.callType === "inbound") {
                    sdk.log("answer call triggered using HID: ", activeCall);
                    sdk.connectCall(callInfo);
                } else {
                    sdk.log("hangup call triggered using HID: ", activeCall);
                    sdk.hangup(scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Constants.HANGUP_REASON.PHONE_CALL_ENDED);
                }
        }
    }
}

/***/ }),

/***/ "./src/main/connector.js":
/*!*******************************!*\
  !*** ./src/main/connector.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Connector: () => (/* binding */ Connector),
/* harmony export */   PhoneConnector: () => (/* binding */ PhoneConnector)
/* harmony export */ });
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vendor_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor-sdk */ "./src/main/vendor-sdk.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/** 
 * Salesforce Service Cloud Voice Demo Connector
 * @author dlouvton
 */

/** @module connector **/



/** 
 * Class representing a Service Cloud Voice Demo Telephony Connector
 */
class PhoneConnector extends scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.TelephonyConnector {
    /**
     * Create a Telephony Connector instance.
     * @param {object} sdk - Telephony SDK
     */
    constructor(sdk) {
        super();
        this.sdk = sdk;
    }
    /**
     * Called when the connector is loaded, to request the active calls
     */
    getActiveCalls() {
        return this.sdk.getActiveCalls();
    }
    /**
     * Called when call is accepted on the omni widget
     * @param {PhoneCall} call
     */
    acceptCall(call) {
        return this.sdk.acceptCall(call);
    }
    /**
     * Called when call is declined
     * @param {PhoneCall} call
     */
    declineCall(call) {
        // TODO: Update core to pass call on declineCall
        return this.sdk.declineCall(call ? call : { callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
    }
    /**
     * Called when agent hangs up or when a participant (customer or third party) is
     * removed by the agent.
     * @param {PhoneCall} call
     * @param {string} agentStatus
     */
    endCall(call, agentStatus) {
        return this.sdk.endCall(call, agentStatus);
    }
    /**
     * Called when call is muted from the sfdc call controls
     * @param {PhoneCall} call
     */
    mute(call) {
        return this.sdk.mute(call);
    }
    /**
     * Called when call is unmuted from the sfdc call controls
     * @param {PhoneCall} call
     */
    unmute(call) {
        return this.sdk.unmute(call)
    }
    /**
     * Called when customer/third party call is put on hold by the agent
     * @param {PhoneCall} call call
     */
    hold(call) {
        return this.sdk.hold(call)
    }
    /**
     * Called when call is resumed (off hold for either customer/third party) from
     * the sfdc call controls
     * @param {PhoneCall} call call
     */
    resume(call) {
        return this.sdk.resume(call);
    }
    /**
     * Called when recording is paused from the sfdc call controls
     * @param {PhoneCall} call
     */
    pauseRecording(call) {
        return this.sdk.pauseRecording(call);
    }
    /**
     * Called when recording is resumed from the sfdc call controls
     * @param {PhoneCall} call
     */
    resumeRecording(call) {
        return this.sdk.resumeRecording(call);
    }
    /**
     * Called when participants on a call are swapped
     * @param {PhoneCall} call1 first call to be swapped
     * @param {PhoneCall} call2 second call to be swapped
     */
    swap(call1, call2) {
        return this.sdk.swapCalls(call1, call2);
    }
    /**
     * Called when participants are joined for a conference
     * @param {PhoneCall[]} calls
     */
    conference(calls) {
        return this.sdk.conference(calls);
    }
    /**
     * Called when an outbound call is made 
     * @param {Contact} contact
     * @param {DialOptions} dialOptions
     */
    dial(contact, dialOptions) {
        return this.sdk.dial(contact, {}, false, dialOptions && dialOptions.isCallback, dialOptions && dialOptions.isConsultCall);
    }
    /**
     * Called when an agent sends digits on the existing call @digits: a string of
     * digits to send to the existing connected call.
     * @param {string} digits digits
     */
    sendDigits(digits) {
        return this.sdk.sendDigits(digits);
    }
    /**
     * Called when speed dial is clicked in order to request the vendor to get the agent phone contacts
     * @param {Object} filter
     */
    getPhoneContacts(filter) {
        return this.sdk.getPhoneContacts(filter);
    }
    /**
     * add participant to the call through either an address or a free form Phone Number.
     * @param {Contact} contact
     * @param {PhoneCall} call
     * @param {Boolean} isBlindTransfer
     */
    addParticipant(contact, call, isBlindTransfer) {
        return this.sdk.addParticipant(contact, call, isBlindTransfer);
    }
    /**
     * Called when connector is ready to get the agent configuration
     */
    getAgentConfig() {
        return this.sdk.getAgentConfig();
    }

    /**
    * Used to set the agent config, including the selected phone type and number
    */
    setAgentConfig(config) {
        return this.sdk.setAgentConfig(config);
    }
     /**
     * Called when connector is ready to get the voice vendor or agent capabilities
     */
    getVoiceCapabilities() {
        return this.sdk.getVoiceCapabilities();
    }
    /**
    * Used to set the vendor or agent capabilities
    */
    setCapabilities(capabilities) {
        return this.sdk.setCapabilities(capabilities);
    }

    /**
    * Used to finish wrap-up
    */
    wrapUpCall() {
        this.sdk.endWrapup();
    }

     /**
     * Get the signed recording url
     * @param {String} recordingUrl
     * @param {String} vendorCallKey
     * @param {String} callId
     * @returns {Promise<SignedRecordingUrlResult>} 
     */
    getSignedRecordingUrl(recordingUrl, vendorCallKey, callId) {
        return this.sdk.getSignedRecordingUrl(recordingUrl, vendorCallKey, callId);
    }

    superviseCall(parentCall){
        console.log("superviseCall", parentCall);
        return this.sdk.superviseCall(parentCall);  
    }

    supervisorDisconnect(parentCall){
        console.log("supervisorDisconnect", parentCall); 
        return this.sdk.supervisorDisconnect(parentCall);
    }

    supervisorBargeIn(parentCall){
        console.log("supervisorBargeIn", parentCall); 
        return this.sdk.supervisorBargeIn(parentCall);
    }
}


/** 
 * Class representing a Service Cloud Voice Demo Common Connector 
 */
class Connector extends scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.VendorConnector {
    /**
     * Create a Connector instance.
     * @param {object} state - Vendor SDK state
     */
    constructor(state) {
        super();
        this.sdk = new _vendor_sdk__WEBPACK_IMPORTED_MODULE_1__.Sdk(state);
        this.telephonyConnector = new PhoneConnector(this.sdk);
    }
    /**
     * Returns the Telephony Connector (if implemented)
     */
    getTelephonyConnector() {
        return this.telephonyConnector;
    }
    /**
     * Called by SFDC to initialize the connector
     * @param {object} callCenterConfig - SFDC Contact Center Settings
     */
    init(callCenterConfig) {
        return this.sdk.init(callCenterConfig);
    }

    /**
     * Called when agent sets their status/presence (i.e. when changing from
     * Available to Offline) 
     * @param {string} agentStatus agent status, Constants.AGENT_STATUS.ONLINE or Constants.AGENT_STATUS.OFFLINE
     * @param {AgentStatusInfo} agentStatusInfo object contains statusId, statusApiName and statusName
     * @param {boolean} enqueueNextState true if the state should be enqueued, which will update the agent's status after a call ends
     */
    setAgentStatus(agentStatus, agentStatusInfo, enqueueNextState) {
        return this.sdk.setAgentStatus(agentStatus, agentStatusInfo, enqueueNextState)
    }
    /**
     * Sends non-voice agent work events to vendor such as work accepted, declined, etc
     * @param {AgentWork} agentWork
     * 
     */
    onAgentWorkEvent(agentWork) {
        return this.sdk.onAgentWorkEvent(agentWork);
    }
    /**
     * logout from the telephony system.
     */
    logout() {
        return this.sdk.omniLogout();
    }
    
    /**
    * Delegate Message received from sfdc component to sdk
    * @param {object} message - Message
    */
    handleMessage(message) {
        return this.sdk.handleMessage(message);
    }
    /**
     * Called when transfer is clicked in order to request the vendor to get the agent contacts
     * @param {Object} filter
     * @param {string} workItemId
     */
    getContacts(filter, workItemId) {
        return this.sdk.getContacts(filter, workItemId);
    }
        /**
     * Called when connector is ready to get the shared vendor or agent capabilities
     */
    getSharedCapabilities() {
        return this.sdk.getSharedCapabilities();
    }
}


/***/ }),

/***/ "./src/main/vendor-sdk.js":
/*!********************************!*\
  !*** ./src/main/vendor-sdk.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sdk: () => (/* binding */ Sdk)
/* harmony export */ });
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/wrapper.mjs");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hid_hidDeviceHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hid/hidDeviceHandler */ "./src/hid/hidDeviceHandler.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

/* 
 * Sample Telephony Vendor SDK 
 * @author dlouvton
 */

/** @module vendor-sdk **/





/**
 * Class representing a Phone Call
 */
class Call extends scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall {

     /**
     * Create a Call.
     * @param {string} callType - Outbound, Inbound or Transfer
     * @param {Contact} contact - Contact associated with this Call
     * @param {string} callAttributes - call attributes 
     * @param {string} callInfo - call info 
     */
    constructor(callType, contact, callAttributes, callInfo, callId) {
        const state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.RINGING;
        callAttributes.initialCallHasEnded = false;
        callAttributes.isOnHold = callInfo && callInfo.isOnHold;
        callId = callId || Math.random().toString(36).substring(7);
        if (callAttributes.participantType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER) {
            callInfo.parentCallId = callId;
        }
        super({ callId, callType, contact, state, callAttributes, phoneNumber: contact && contact.phoneNumber, callInfo }); 
    }

    /**
     * set callId of parent call
     */
    set parentCallId(parentCallId) {
        this.callInfo.parentCallId = parentCallId;
    }
}

class ContactCenterAdditionalSettings {
    /**
     * Create an object that includes all the additional data retrieved from core and to be rendered dynamically
     */
    constructor() {
        this.userId;
        this.scrtUrl;
        this.orgId;
        this.instanceUrl;
        this.authorizationContext;
        this.customPlatformEvent;
        this.customEventPayloadField;
        this.customEventTypeField;
        this.routingOwner;
        this.channelAddressIdentifier;
    }
}

class ConnectorEventEmitter extends events__WEBPACK_IMPORTED_MODULE_3__.EventEmitter {}
const eventEmitter = new ConnectorEventEmitter();

/** 
 * Class representing a Softphone SDK
 */
class Sdk {
    /**
     * Create a Softphone SDK instance.
     * @param {object} state - SDK state
     */
    constructor(state = { 
        isLoginRequired: true, 
        agentConfig: JSON.parse(localStorage.getItem('agentConfig')) || {
            phones : [ "SOFT_PHONE", "DESK_PHONE"],
            selectedPhone : {type:"SOFT_PHONE"}
        },
        updateRemoveTransferCallParticipantVariant: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.REMOVE_PARTICIPANT_VARIANT.ALWAYS,
        capabilities: JSON.parse(localStorage.getItem('capabilities')) || {
            hasMute: true,
            hasRecord: true,
            hasMerge: true,
            hasSwap: true,
            hasSignedRecordingUrl: false,
            debugEnabled: true,
            signedRecordingUrl: '',
            signedRecordingDuration: null,
            hasContactSearch: true,
            hasAgentAvailability: true,
            hasQueueWaitTime: true,
            supportsMos : false,
            hasSupervisorListenIn: true,
            hasSupervisorBargeIn: true,
            hasBlindTransfer : true,
            hasTransferToOmniFlow : true,
            hasPendingStatusChange: true,
            hasPhoneBook : false,
            canConsult : true,
            isDialPadDisabled: false,
            isPhoneBookDisabled: false,
            isHidSupported: false,
            hasSetExternalMicrophoneDeviceSetting: false,
            hasSetExternalSpeakerDeviceSetting: false
        },
        agentId: null,
        userFullName: null,
        activeCalls: this.getActiveCallsObj(),
        destroyedCalls: [],
        agentStatus: "Available",
        publishHardphoneErrors: true,
        agentAvailable: false,
        messagingContacts: this.getAllMessagingContacts(20),
        phoneContacts: this.getAllPhoneContacts(20),
        onlineUsers: [],
        activeConferenceCalls: [],
        callInfoObj: {},
        userFullNames : {},
        userPresenceStatuses: null,
        isMultipartyAllowed: null,
        isConsultAllowed: null,
        contactCenterChannels: null,
        delayMs: 0, //Delay in milliseconds before resolving a promise
        contactTypes: JSON.parse(localStorage.getItem('contactTypes')) || 
            [ scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.AGENT, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.QUEUE, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONEBOOK, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONENUMBER ],
        contactCenterAdditionalSettings: new ContactCenterAdditionalSettings(),
        flowConfig : null
    }){
        this.state = {...state, 
            showLoginPage: !!JSON.parse(localStorage.getItem('showLoginPage')),
            throwError: !!JSON.parse(localStorage.getItem('throwError'))
        };
        this.eventEmitter = eventEmitter;
    }
    /**
     * Get a call from the active calls stored on localStorage)
     */
    getCall(call) {
        if (!this.hasActiveCalls()){
            throw new Error("Couldn't find an active call", call);
        }
        if (call.callId) {
            const callByCallId = this.state.activeCalls[call.callId];
            if (!callByCallId) {
                throw new Error("Couldn't find an active call for callId " + call.callId);
            }
            return callByCallId;
        }
        if (call.callAttributes && call.callAttributes.isConsultCall) {
            const consultCall = Object.values(this.state.activeCalls).filter((obj) => obj['callAttributes']['isConsultCall'] === true).pop();
            if (!consultCall) {
                throw new Error("Couldn't find an active consult call " + call.callAttributes.participantType);
            }
            return consultCall;
        } 
        if (call.callAttributes && call.callAttributes.participantType) {
            // During a consult call in list there can be 2 Initial callers, so we do shift() to get the first non-consult one
            const callByParticipant = Object.values(this.state.activeCalls).filter((obj) => obj['callAttributes']['participantType'] === call.callAttributes.participantType).shift();
            if (!callByParticipant) {
                throw new Error("Couldn't find an active call for participant " + call.callAttributes.participantType);
            }
            return callByParticipant;
        }
        if (call.contact && call.contact.id) {
            const callByContactId = Object.values(this.state.activeCalls).filter((obj) => obj['contact']['id'] === call.contact.id).pop();
            if (!callByContactId) {
                return null;
            }
            return callByContactId;
        }
        if (call.callInfo && call.callInfo.renderContactId) {
            const callByRenderContactId =  Object.values(this.state.activeCalls).filter((obj) => obj['callInfo']['renderContactId'] === call.callInfo.renderContactId).pop();
            if (!callByRenderContactId) {
                return null;
            }
            return callByRenderContactId;
        }
        throw new Error("Call is not defined or invalid.", call);
    }
    /**
     * Add a call to the active calls (persisted on localStorage)
     */
    addCall(call) {
        if (call instanceof Call || call instanceof  scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall) {
            this.state.activeCalls[call.callId] = call;
        } else {
            // Have noticed that `call` object comes in as an object instead of Call class OR PhoneCall class . So converting it into the PhoneCall class.
            let callObj = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall({});
            Object.assign(callObj, {callId : call.callId, callType : call.callType, contact : call.contact, state :  call.state,
                callAttributes : call.callAttributes, phoneNumber : call.contact && call.contact.phoneNumber, callInfo : call.callInfo});
            this.state.activeCalls[call.callId] = callObj;
        }
        localStorage.setItem('activeCalls', JSON.stringify(this.state.activeCalls));
    }

    /**
     * Message a user (via websocket)
     * if toUsername is null, the message is broadcasted to all users
     */
    messageUser(toUsername, messageType, data){
        const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__.io)();
        const fromUsername = this.state.agentId;
        socket.emit("message", { fromUsername, toUsername, messageType, data });
    }
    /**
     * Notify users about your presence (via websocket)
     */
    toggleAgentPresence(isAvailable){
        const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__.io)();
        const username = this.state.agentId;
        const fullName = this.state.userFullName;
        const userId = this.state.userId;
        socket.emit("presence", { isAvailable, username , fullName, userId});
    }
    
    /**
     * Get the primary call
     * @returns {Call} - The primary call
     */    
    getPrimaryCall() {
        let primaryCall;
        try {
            primaryCall = this.getCall({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
        } catch (e) {
            try {
                primaryCall = this.getCall({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR }});
            } catch (e) {
                try {
                    primaryCall = this.getCall({callAttributes: { isConsultCall: true }});
                } catch (e) {
                    return this.getActiveCallsList()[0];
                }
            }
        }
        return primaryCall;
    }

    /**
     * for multiparty - update a call with a value to callInfo. 
     * otherwise, Update the Main Call Info (with the initial caller or supervisor)
     * @param call - PhoneCall object if null use INITIAL_CALLER or SUPERVISOR
     * @param value - call.callInfo.value to update 
     */
    updateCallInfo(value, call) {
        let activeCall;
        try {
            activeCall = this.getCall({...(call || {}), callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
        } catch(e) {
            activeCall = this.getCall({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR }});
        }
        Object.assign(activeCall.callInfo, value);
        this.addCall(activeCall);
        return activeCall;
    }

    /*
    * This method is for demo purposes. Enables/disables the show login page for testing
    */
    showLoginPage(enable) {
        localStorage.setItem('showLoginPage', enable);
        this.state.showLoginPage = enable;
    }

    setAgentConfig(config) {
        if (!config) {
            return;
        }

        if (config.selectedPhone && Object.keys(config.selectedPhone).length > 0) {
            this.state.agentConfig.selectedPhone = config.selectedPhone;
        }
        if (config.hidDeviceInfo && Object.keys(config.hidDeviceInfo).length > 0) {
            this.state.agentConfig.hidDeviceInfo = config.hidDeviceInfo;
        }
        localStorage.setItem('agentConfig', JSON.stringify(this.state.agentConfig));
        if(config.hidDeviceInfo !== undefined) {
            (0,_hid_hidDeviceHandler__WEBPACK_IMPORTED_MODULE_4__.hidDeviceHandler)(config, this);
        }
        return this.executeAsync("setAgentConfig", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SetAgentConfigResult({
            success: true
        }));
    }

    /*
    * Update Agent Config used only for Voice call simulator
    */
   updateAgentConfig(agentConfig) {
       this.state.agentConfig.selectedPhone = agentConfig.selectedPhone;
       localStorage.setItem('agentConfig', JSON.stringify(this.state.agentConfig));
    }

    setCapabilities() {
        localStorage.setItem('capabilities', JSON.stringify(this.state.capabilities));
        return this.executeAsync("setCapabilities", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.GenericResult({ success: true }));
    }

    /*
    * Update Capabilities used only for Voice call simulator
    */
    updateCapabilities(capabilities) {
        this.state.capabilities.hasSignedRecordingUrl = capabilities.hasSignedRecordingUrl;
        this.state.capabilities.signedRecordingUrl = capabilities.signedRecordingUrl;
        this.state.capabilities.signedRecordingDuration = capabilities.signedRecordingDuration;
        this.state.capabilities.hasMute = capabilities.hasMute;
        this.state.capabilities.hasRecord = capabilities.hasRecord;
        this.state.capabilities.hasSwap = capabilities.hasSwap;
        this.state.capabilities.hasMerge = capabilities.hasMerge;
        this.state.capabilities.hasContactSearch = capabilities.hasContactSearch;
        this.state.capabilities.supportsMos = capabilities.supportsMos;
        this.state.capabilities.hasAgentAvailability = capabilities.hasAgentAvailability;
        this.state.capabilities.hasQueueWaitTime = capabilities.hasQueueWaitTime;
        this.state.capabilities.hasSupervisorListenIn = capabilities.hasSupervisorListenIn;
        this.state.capabilities.hasSupervisorBargeIn = capabilities.hasSupervisorBargeIn;
        this.state.capabilities.hasBlindTransfer = capabilities.hasBlindTransfer;
        this.state.capabilities.hasTransferToOmniFlow = capabilities.hasTransferToOmniFlow;
        this.state.capabilities.debugEnabled = capabilities.debugEnabled;
        this.state.capabilities.hasPendingStatusChange = capabilities.hasPendingStatusChange;
        this.state.capabilities.hasPhoneBook = capabilities.hasPhoneBook;
        this.state.capabilities.canConsult = capabilities.canConsult;
        this.state.capabilities.isDialPadDisabled = capabilities.isDialPadDisabled;
        this.state.capabilities.isPhoneBookDisabled = capabilities.isPhoneBookDisabled;
        this.state.capabilities.isHidSupported = capabilities.isHidSupported;
        this.state.capabilities.hasSetExternalMicrophoneDeviceSetting = capabilities.hasSetExternalMicrophoneDeviceSetting;
        this.state.capabilities.hasSetExternalSpeakerDeviceSetting = capabilities.hasSetExternalSpeakerDeviceSetting;
        localStorage.setItem('capabilities', JSON.stringify(this.state.capabilities));
    }

    /*
    * Update contact types for add participant for voice call simulator
    */
   updateContactTypes(contactTypes) {
       this.state.contactTypes = contactTypes;
       localStorage.setItem('contactTypes', JSON.stringify(this.state.contactTypes));
   }

    /*
    * This method is for demo purposes. Enables/disables throwing sdk errors for testing
    */
   throwError(enable) {
        localStorage.setItem('throwError', enable);
        this.state.throwError = enable;
    }

    /*
    * This method is for demo purposes. Enables throwing custom errors for testing
    */
    customErrorChanged(value) {
        localStorage.setItem('customError', value);
        this.state.customError = value;
    }

    /*
    * This method simulates the vendor sending a login result
    */
    subsystemLoginResult(success) {
        this.state.agentAvailable = success;
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.SHARED_EVENT_TYPE.LOGIN_RESULT, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.GenericResult({
            success: (this.state.showLoginPage && success)
        })});
    }

    /**
     * log a message
     */
    log(...args) {
        if(this.state.capabilities.debugEnabled) {
            const message = args.map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' ');
            (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.log)({ message }, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.LOG_LEVEL.INFO);
            return;
        }
        Function.apply.call(console.log, console, ["[sdk]", ...args]);
    }

    /** 
        filter contacts
    */
    filterContacts(contacts, filter) {
        if (!filter) {
            return contacts;
        }
        let result = contacts;
        if (filter.contains) {
            result = result.filter(obj => Object.keys(obj).some(key => obj[key] && obj[key].toLowerCase().includes(filter.contains.toLowerCase())));
        }
        let contactTypes = filter.types || [filter.type && filter.type.toUpperCase()] || 0;
        contactTypes.forEach(type => {
            const value = _common_constants__WEBPACK_IMPORTED_MODULE_2__.FILTER_TYPES_TO_CONTACT_TYPES[type] || type;
            const key = _common_constants__WEBPACK_IMPORTED_MODULE_2__.FILTER_TYPES_TO_CONTACT_TYPES[type] ? "type" : "availability";
            result = result.filter(obj =>  obj[key] === value);
        });
        const startIndex = filter.offset ? filter.offset : 0; 
        const endIndex = filter.limit ? startIndex + filter.limit : result.length;
        return result.slice(startIndex, endIndex);  
    }

    /**
     * @returns {unknown[]}
     */
    getActiveCallsList() {
        return Object.values(this.state.activeCalls);
    }

    /**
     * retrieve the call object from attributes. Logic is not perfect and breaks the Multiparty flow,
     * so separating it in order to not create regression.
     * @param call
     * @returns {*[]}
     */
    getCallsToDestroy(call) {
        let callsToDestroy = [];
        if (call.callAttributes && call.callAttributes.participantType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.AGENT) {
            //TODO: Revisit this logic.
            try {
                const customerCall = this.getCall({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
                callsToDestroy.push(customerCall);
            } catch(e) {
                //noop
            }
            try {
                const thirdPartyCall = this.getCall({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY }});
                callsToDestroy.push(thirdPartyCall);
            } catch(e) {
                //noop
            }
            if (callsToDestroy.length === 0) {
                callsToDestroy.push(this.getCall(call));
            }
        } else {
            callsToDestroy.push(this.getCall(call));
        }
        return callsToDestroy;
    }
    /**
     * destroy one or more calls
     * @param call
     * @param {string} reason - reason
     */
    destroyCalls(call, reason) {
        let callsToDestroy = [];
        if (this.state.isMultipartyAllowed) {
            if(call.callId) {
                callsToDestroy.push(call);
            } else {
                callsToDestroy.push(this.getCall(call));
            }
        } else {
            callsToDestroy = this.getCallsToDestroy(call);
        }
        return this.processCallsToDestroy(callsToDestroy, reason);
    }

    processCallsToDestroy(callsToDestroy, reason) {
        callsToDestroy.forEach((callToDestroy) => {
            const state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.ENDED;
            callToDestroy.state = state;
            callToDestroy.reason = reason;
            if (!this.state.isMultipartyAllowed && this.shouldMessageOtherUser(callToDestroy)) {
                this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_DESTROYED, {callId: callToDestroy.callId, reason: reason});
            }
            this.state.destroyedCalls.push(callToDestroy);
            delete this.state.activeCalls[callToDestroy.callId];
        })
        localStorage.setItem("activeCalls", JSON.stringify(this.state.activeCalls));
        this.state.agentAvailable = Object.keys(this.state.activeCalls).length === 0;
        return callsToDestroy;
    }

    shouldMessageOtherUser(callToDestroy) {
        return callToDestroy.callType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INTERNAL_CALL.toLocaleLowerCase();
    }

    /**
     * destroy specified call
     * @param {string} reason - reason
     */
    destroyCall(call, reason) {
        return this.destroyCalls(call, reason).pop();
    }
    /**
     * perform sso on a container element
     * @param {object} callCenterConfig - Call Center configuration
     */

    async init(callCenterConfig) {

        let url = "http://localhost:8000";
        let options = {
                "method": "get",
                "mode": "no-cors"
            };
          fetch(url, options)
            .then((response) => {
                console.log('Manish response', response);
            })
            .catch((error) => {
                console.log('Mansih error', error);
            });

        const username = this.state.agentId = callCenterConfig['userName'];
        this.state.userFullName = callCenterConfig['userFullName'];
        this.state.userId = callCenterConfig['userId'];
        this.state.userPresenceStatuses = callCenterConfig['userPresenceStatuses'];
        this.state.contactCenterChannels = callCenterConfig['contactCenterChannels'];
        this.state.isMultipartyAllowed = callCenterConfig['isSCVMultipartyAllowed'];
        this.state.isConsultAllowed = callCenterConfig['isSCVMultipartyConsultAllowed'];
        
        // Only fetch when there're messaging channels. Voice doesn't need these information
        if (callCenterConfig['messagingChannel'] && callCenterConfig['messagingChannel'].length !== 0) {
            let IS_LOCAL_CONFIG = await this.fetchServer("/is-local-config", 'GET');
            if(!IS_LOCAL_CONFIG){
                try {
                    this.readCallCenterConfigAndSetState(callCenterConfig);
                } catch (e) {
                    return Promise.reject("Failed to configure tenant information");
                }
            }
        }

        const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__.io)();

        socket.on('onlineUsers', onlineUsers => {
            this.state.onlineUsers = onlineUsers.users;
            this.state.userFullNames = new Map(JSON.parse(onlineUsers.userNames));
        });

        socket.on('connect', () => {
            socket.emit('join', { username, id: this.state.userId });
        });

        socket.on('message', message => {
            this.handleSocketMessage(message);
        });

        const tenantInfo = {
            scrtBaseUrl: callCenterConfig['scrtUrl'],
            orgId: callCenterConfig['organizationId'],
            callCenterName: callCenterConfig['/reqGeneralInfo/reqInternalName']
        };

        return fetch('/api/configureTenantInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tenantInfo)
        }).then(response => response.json())
          .then((data) => {
            if (data.success) {
                this.toggleAgentPresence(true);
                this.state.agentAvailable = !this.state.showLoginPage;
                return this.executeAsync('ssoLogin', this.state.showLoginPage ?
                new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.InitResult({ showLogin: true, loginFrameHeight: 350 }) :
                new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.InitResult({}));
            } else {
                return Promise.reject("Failed to configure tenant information");
            }
        });
    }

    fetchServer(endpoint, method, body) {
        return fetch(`/api/fetchServer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...body, method: method, endpoint: endpoint })
        }).then(response => response.json()).then((result) => {
            return result;
        })
    }
    /**
     * This function:
     * (1) retrieve setting from /getsettings,
     * (2) use setting.channelAddressIdentifier to select the conversationChannelDefinition we are looking for,
     * (3) update this.state data (ConversationDefinitionChannel, MessagingChannel, Domain)
     * (4) fetch back to current setting by calling /setcallcenterconfig endpoint.
     * @param {*} callCenterConfig 
     */

    readCallCenterConfigAndSetState(callCenterConfig) {
        this.fetchServer("/getsettings",'GET').then((setting) => {
            if (setting) {
                //HINT: setting.channelAddressIdentifier needs to be specified by user 
                this.state.channelAddressIdentifier = setting.channelAddressIdentifier;
                this.state.contactCenterAdditionalSettings.userId = callCenterConfig['userId'];
                this.state.contactCenterAdditionalSettings.scrtUrl = callCenterConfig['scrtUrl'];
                this.state.contactCenterAdditionalSettings.orgId = callCenterConfig['organizationId'];
                let domain = callCenterConfig['domain']
                this.state.contactCenterAdditionalSettings.instanceUrl = domain; 
                if (callCenterConfig['messagingChannel']){
                    Object.keys(callCenterConfig['messagingChannel']).forEach(mckey =>{
                        let mc = callCenterConfig['messagingChannel'][mckey];
                        if (mc['ChannelAddressIdentifier'] === this.state.channelAddressIdentifier) {
                            let cdId = mc['ChannelDefinitionId'];
                            Object.keys(callCenterConfig['conversationChannelDefinition']).forEach(ccdkey => {
                                let ccd = callCenterConfig['conversationChannelDefinition'][ccdkey];
                                if (ccd['Id'] === cdId) {
                                    this.state.contactCenterAdditionalSettings.authorizationContext = ccd['DeveloperName'];
                                    this.state.contactCenterAdditionalSettings.customPlatformEvent = ccd['CustomPlatformEvent'];
                                    this.state.contactCenterAdditionalSettings.customEventPayloadField = ccd['CustomEventPayloadField'];
                                    this.state.contactCenterAdditionalSettings.customEventTypeField = ccd['CustomEventTypeField'];
                                    this.state.contactCenterAdditionalSettings.routingOwner = ccd['RoutingOwner'];
                                }
                            })
                        }
                    })
                }
                this.fetchContactCenterConfigToEnv();
            } else {
            return new Error("Couldn't fetch settings from /getsettings");
            }
        });
    }
    /**
     * Fetch CCD and domain state data to process
     * @returns 
     */
    async fetchContactCenterConfigToEnv() {
        const formData = {
            "authorizationContext": this.state.contactCenterAdditionalSettings.authorizationContext,
            "userId": this.state.contactCenterAdditionalSettings.userId,
            "userName": this.state.agentId,
            "customEventPayloadField": this.state.contactCenterAdditionalSettings.customEventPayloadField,
            "customPlatformEvent": this.state.contactCenterAdditionalSettings.customPlatformEvent,
            "customEventTypeField": this.state.contactCenterAdditionalSettings.customEventTypeField,
            "routingOwner": this.state.contactCenterAdditionalSettings.routingOwner,
            "instanceUrl": this.state.contactCenterAdditionalSettings.instanceUrl,
            "scrtUrl": this.state.contactCenterAdditionalSettings.scrtUrl,
            "orgId": this.state.contactCenterAdditionalSettings.orgId,
        };

        return await this.fetchServer("/setcallcenterconfig", 'POST', formData)
            .then((data) => {
            if (data.status === 200) {
                console.log(data);
            } else {
                return new Error("Couldn't fetch settings to /setcallcenterconfig");
            }
        });
    }

    /**
     * handle socket message event
     */
    handleSocketMessage(message) {
        if (message.messageType) {
            switch(message.messageType){
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_STARTED:
                    this.startTransferOrConsultCall(message);
                    break;
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.INTERNAL_CALL_STARTED:
                    this.startInternalCall(message);
                    break;
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.PARTICIPANT_CONNECTED:
                    if (message.fromUsername !== this.state.agentId && !this.isSupervisorListeningIn()) {
                        this.connectParticipant(message.data.callInfo, message.data.callType, message.data.call);
                    }
                    break;
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_BARGED_IN:
                    this.publishCallBargedInEventToAgents(message.data);
                    break;
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_DESTROYED:
                    if (!this.isSupervisorListeningIn()) {
                        this.processCallDestroyed(message.data);
                    }
                    break;
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.MUTE:
                    if (message.fromUsername !== this.state.agentId) {
                        this.processBroadcastMute(message.data, true);
                    }
                    break;
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.UNMUTE:
                    if (message.fromUsername !== this.state.agentId) {
                        this.processBroadcastMute(message.data, false);
                    }
                    break;
                case _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.MERGE:
                    // Dont merge if there are no active calls
                    if (!this.hasActiveCalls()) {
                        return;
                    }

                    // Don't merge the supervisor if the supervisor is actively listening into a call
                    if (message.fromUsername !== this.state.agentId && message.data.consultCall && !this.isSupervisorListeningIn()) {
                        this.state.activeConferenceCalls = message.data.activeConferenceCalls;
                        let primaryCall;
                        let activeCallList = this.getActiveCallsList();

                        // goal is to find the primary call and change its participantType / receiverContact before merging
                        if (activeCallList.length === 1 && this.hasConsultCall(activeCallList)) {
                            // if we are merging activeCalls into consult user, then currently there is no primary call ID
                            // and the consult user will have only 1 call. and that is as good as a primary call
                            primaryCall = activeCallList[0];
                        } else {
                            // if we are merging consult call into multiparty group user, then they will have a primary call
                            primaryCall = this.getPrimaryCall();
                        }

                        // update the correct participanttype in the MPC
                        let elem = this.state.activeConferenceCalls.find(({callId}) => callId === primaryCall.callId);
                        if (elem) {
                            elem.callAttributes.participantType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER;
                            elem.receiverContact = elem.receiverContact || this.state.activeCalls[primaryCall.callId].receiverContact;
                        }
                        if (message.data.consultCall.callId === primaryCall.callId) {
                            message.data.consultCall.callAttributes.participantType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER;
                        }
                        message.data.consultCall.contact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({id: message.fromUsername});
                        message.data.consultCall.callInfo.renderContactId = message.fromUsername;

                        this.mergeConsultCall(message.data.consultCall);
                        this.updateConferenceUsers(true);
                    }
                    break;
                default:
                    this.log("Could not handle message "+message.messageType, message)
            }
        } else if (message.data && message.data.type) {
            // bubble event to the event emitter for remote event handling
            this.eventEmitter.emit('event', message);
        }
    }

    /**
     * This method updates the callInfo object for the connected Agent
     * on page load, config changes etc.
     * This callInfo object is then used by the agents when making the call.
     * @param message
     */
    updateCallInfoObj(message) {
        this.state.callInfoObj = message.data.callInfo;
        localStorage.setItem('callInfo', JSON.stringify(this.state.callInfoObj));
    }

    generateCallId() {
        return Math.random().toString(36).substring(7);
    }

    startTransferOrConsultCall(message) {
        const isConsultCall = message.data.isConsultCall;
        let flowConfig = message.data.flowConfig || { isUnifiedRoutingEnabled: false };
        flowConfig.isTransferFlow = true;
        const callInfo = message.data.callInfo || {};
        callInfo.callStateTimestamp = message.data.callInfo?.callStateTimestamp ? new Date(message.data.callInfo.callStateTimestamp) : new Date();
        const call = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall({
            callType: isConsultCall ? scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT : scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.TRANSFER,
            phoneNumber: message.data.phoneNumber,
            callId: message.data.callId || this.generateCallId(),
            callAttributes: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCallAttributes({
                participantType: isConsultCall ? scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY : scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER,
                voiceCallId: message.data.voiceCallId,
                parentId: message.data.callAttributes?.parentId,
                isConsultCall
            }),
            state: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.RINGING  // Explicitly set initial state to RINGING
        });
        
        const renderContact = callInfo.renderContact || message.data.renderContact;
        call.callInfo = Object.assign(callInfo, JSON.parse(localStorage.getItem('callInfo')));

        if (!this.state.isMultipartyAllowed) {
            call.callInfo.isOnHold = false;
        }
        if (renderContact) {
            call.contact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(renderContact);
            call.toContact = this.getCurrentUserContact();
        }
        call.callInfo.renderContactId = message.fromUsername;
        this.addCall(call);
        //When Unified Routing is enabled, we need to invoke OmniFlow, otherwise regular flow to publish CALL_STARTED event.
        if(flowConfig?.isUnifiedRoutingEnabled) {
            //this.executeOmniFlowForUnifiedRouting(message.data, flowConfig);
        } else {
            let callResult = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({call});
            (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.CALL_STARTED, payload: callResult});
        }
        if (this.state.isMultipartyAllowed && !isConsultCall) {
            this.state.activeConferenceCalls = message.data.activeConferenceCalls;
        }
    }

    startInternalCall(message) {
        const currContact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({
            phoneNumber : message.data.contact.phoneNumber,
            id : message.data.contact.id,
            type : message.data.contact.type,
            name : message.data.contact.name
        });
        const call = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall({
            callType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INTERNAL_CALL,
            phoneNumber: message.data.contact.phoneNumber,
            callId: message.data.callId,
            contact: currContact,
            callInfo: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo({isOnHold:false, renderContactId: message.data.renderContact.name}),
            callAttributes: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCallAttributes({participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.AGENT })
        });
        this.addCall(call);
        let callResult = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({call});
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.CALL_STARTED, payload: callResult});
    }


    updateConferenceUsers(updateActiveCallToo) {
        if (this.state.isMultipartyAllowed) {
            if (this.state.activeConferenceCalls.length > 0) {
                setTimeout(()=> {
                    this.state.activeConferenceCalls.forEach(call => {
                        const activeCall = this.state.activeCalls[call.callId];
                        if (updateActiveCallToo || !activeCall) {
                            const callAttributes = activeCall ? activeCall.callAttributes : { isAutoMergeOn: true };
                            let callInfo = this.state.isMultipartyAllowed
                                ? Object.assign(call.callInfo, JSON.parse(localStorage.getItem('callInfo')))
                                : call.callInfo || {};
                            callInfo.callStateTimestamp = callInfo.callStateTimestamp
                                ? new Date(callInfo.callStateTimestamp)
                                : new Date();
                            if (activeCall) {
                                call.contact = activeCall.contact;
                                callInfo.renderContactId = activeCall.callInfo.renderContactId;
                            }
                            const useContact = call.contact;
                            const newCall = new Call(
                                scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.ADD_PARTICIPANT,
                                new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(useContact),
                                new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCallAttributes({
                                    participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY,
                                    ...callAttributes
                                }),
                                new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(callInfo),
                                call.callId
                            );
                            newCall.fromContact = call.fromContact;
                            newCall.toContact = call.toContact;
                            this.addCall(newCall);
                            this.connectParticipant(null, null, newCall);
                        }
                    });
                    this.state.activeConferenceCalls = [];
                },1000);
            }
        }
    }

    processCallDestroyed(messageData) {
        if (messageData.callId) {
            let callToDestroy = null;
            try {
                callToDestroy = this.getCall({ callId : messageData.callId});
            } catch(e) {
                //noop
            }
            if (callToDestroy) {
                if (this.state.isMultipartyAllowed) {
                    if (messageData.target === this.state.agentId) {
                        if (callToDestroy.callType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT.toString()) {
                            let destroyedCall = this.destroyCalls(callToDestroy, messageData.reason);
                            let payload = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({call: destroyedCall.pop()});
                            (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED, payload });
                        } else {
                            this.hangupMultiParty(callToDestroy, messageData.reason, null);
                        }
                    } else {
                        let primaryCall;
                        try {
                            primaryCall = this.getPrimaryCall();
                        } catch (e) {
                            //noop
                        }
                        let destroyedCall = this.processEndCall(callToDestroy, null, messageData.reason, false);
                        let payload = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({call: destroyedCall.pop()});
                        // If the ending call is the agent's primary call, update the callInfo to it's parent node
                        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED, payload });
                        // this.destroyCalls(callToDestroy, messageData.reason);
                        if (primaryCall && primaryCall.callInfo && primaryCall.callInfo.renderContactId && messageData.target === primaryCall.callInfo.renderContactId) {
                            (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED, 
                                            payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.ParticipantResult({
                                                callId: primaryCall.callId,
                                                contact: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(payload.call.contact),
                                                phoneNumber: payload.call.contact && payload.call.contact.phoneNumber,
                                                callInfo: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(payload.call.callInfo),
                                                initialCallHasEnded: payload.call.callAttributes && payload.call.callAttributes.initialCallHasEnded
                                            })})
                        }
                    }
                } else {
                    this.hangup(messageData.reason);
                }
            }
        }
    }
    /**
     * simulate logout from the telephony sub system
     */
    subsystemLogout() {
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.SHARED_EVENT_TYPE.LOGOUT_RESULT, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.LogoutResult({
            success: !this.state.throwError,
            loginFrameHeight: 350
        })});
    }

    /**
     * perform logout from Omni
     */
    omniLogout() {
        return this.executeAsync("SubsystemLogout", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.LogoutResult({
            success: true,
            loginFrameHeight: 350
        }));
    }

    /**
     * request the agent contacts when transfer is clicked 
     * @param {Object} filter
     * @param {string} workItemId
     */
    getContacts(filter, workItemId) {
        let contacts = this.filterContacts(this.state.messagingContacts, filter) ;
        return this.executeAsync("getContacts", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.ContactsResult({
            contacts
        }));
    }

    /**
     * execute an async action and return a promise
     * @param {string} action
     * @param {object} payload
     * @param {number} delay Delay in milliseconds before resolving the promise
     * @return {Promise}
     */
    executeAsync(action, payload) {
        this.log(`Executing action - ${action}`, payload);
        if (this.state.throwError) {
            if (this.state.customError) {
                const obj = this.state.customError.split('.');
                return Promise.reject(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CustomError({ namespace: obj[0], labelName: obj[1]  }));
            } else {
                return Promise.reject('demo error');
            }
        }
        switch (action) {
            case "mute":
            case "unmute":
                if (!this.state.capabilities.hasMute) {
                    return Promise.reject(new Error('Mute is not supported'));
                }
            break;
            case "conference":
                if (!this.state.capabilities.hasMerge) {
                    return Promise.reject(new Error('Conference is not supported'));
                }
            break;
            case "swapCalls":
                if (!this.state.capabilities.hasSwap) {
                    return Promise.reject(new Error('Swap Calls is not supported'));
                }
            break;
            case "pauseRecording":
            case "resumeRecording":
                if (!this.state.capabilities.hasRecord) {
                    return Promise.reject(new Error('Recording is not supported'));
                }
            break;
            case "getSignedRecordingUrl":
                if (!this.state.capabilities.hasSignedRecordingUrl || !this.state.capabilities.signedRecordingUrl) {
                    return Promise.reject(new Error('Signed recording url is not supported'));
                }
            break;
            case "onAgentWorkEvent":
                /* Pause and unpause work will be received here but nothing yet implemented */
                switch (payload.workEvent) {
                    case scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.WORK_EVENT.PAUSED:
                        /* implementation for pause work */
                        return Promise.resolve(payload);
                    case scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.WORK_EVENT.UNPAUSED:
                        /* implementation for unpause work */
                        return Promise.resolve(payload);
                    case scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.WORK_EVENT.ACCEPTED:
                        console.log('Agent accepted the work', payload);
                        return Promise.resolve(payload);
                    case scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.WORK_EVENT.DECLINED:
                        console.log('Agent declined the work', payload);
                        return Promise.resolve(payload);
                }
            break;
        }

        if (this.state.delayMs === 0) {
            return Promise.resolve(payload)
        }

        return this.delay(this.state.delayMs).then(() => {
            return Promise.resolve(payload)
        });
    }

    delay(t, v) {
        return new Promise(resolve => {
            setTimeout(resolve.bind(null, v), t)
        });
    }

    getCurrentUserContact() {
        return new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({
            phoneNumber: this.state.agentId,
            id: this.state.agentId,
            type: this.state.type,
            name: this.state.userFullName
        });
    }

    /**
     * start a call
     * @param {Contact} contact ToContact
     * @param {Object} callInfo (callInfo.isSoftphoneCall is false if dialing from a desk phone)
     * @param {Boolean} fireCallStarted boolean to indicate whether to fire the call started event
     * @param {Boolean} isCallback boolean providing hint from click-to-dial whether this is a callback.
     * @param {Boolean} isConsultCall boolean to check if it is a consult call
     */
    dial(contact, callInfo, fireCallStarted, isCallback, isConsultCall) {
        if (!isConsultCall && this.hasActiveCalls(scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER)) {
            return Promise.reject(new Error(`Agent is not available for an outbound call`));
        }
        
        callInfo = {
            ...callInfo,
            isOnHold: callInfo?.isOnHold ?? false,
            callStateTimestamp: new Date(),
            renderContactId: contact.id,
        };
        
        const callAttributes = {
            participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER,
            parentId: isConsultCall
                ? this.getPrimaryCall().callId // send primary callId to createConsultConversation
                : null,
            ...(isConsultCall && { isConsultCall }),
        };

        let callType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.OUTBOUND.toLowerCase();
        if (isConsultCall) {
            callType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT;
        } else if (isCallback) {
            callType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.DIALED_CALLBACK;
        } else if (contact.type === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.AGENT) {
            callType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INTERNAL_CALL.toLowerCase();
        } 

        const call = new Call(callType, contact, callAttributes, new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(callInfo));
        call.fromContact = this.getCurrentUserContact();
        this.addCall(call);
        const callResult = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({ call });

        if (!callInfo.isSoftphoneCall && fireCallStarted ) {
            (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.CALL_STARTED, payload: callResult });
        }
        
        this.state.agentAvailable = false;
        if (this.state.onlineUsers.includes(contact.id) && contact.type === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.AGENT) {
            const renderContact = this.getCurrentUserContact();
            const fromContact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(renderContact);
            const toContact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(contact);
            this.messageUser(contact.id, isConsultCall ? _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_STARTED : _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.INTERNAL_CALL_STARTED, {phoneNumber: contact.phoneNumber, callId: call.callId, contact, renderContact: renderContact, fromContact, toContact, isConsultCall, callAttributes});
        }
        
        return this.executeAsync('dial', callResult);
    }
    /**
     * start a call
     * @param {string} phoneNumber - The phone number associcated with this contact
     * @param {string} callInfo
     */
    startInboundCall(phoneNumber, callInfo, flowConfig) {
        callInfo = callInfo || { isOnHold: false };
        flowConfig = flowConfig || { isUnifiedRoutingEnabled: false };
        callInfo.callStateTimestamp = new Date();
        if (!this.state.agentAvailable) {
            const message = `Agent is not available for a inbound call from phoneNumber - ${phoneNumber}`;
            this.log(message);
            return Promise.reject(new Error(message));
        }
        let callAttributes = { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER };
        const id = Math.random().toString(36).substring(5);
        let contact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({ phoneNumber, id, name: 'Customer '+ id });
        return this.createVoiceCall(undefined, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INBOUND, phoneNumber, callInfo && callInfo.additionalFields).then((data) => {
            callAttributes.voiceCallId = data.voiceCallId;
            const call = new Call(scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INBOUND.toLowerCase(), contact, callAttributes, new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(callInfo), data.vendorCallKey || this.generateCallId());
            call.fromContact = contact;
            call.toContact = this.getCurrentUserContact();
            //delete call.toContact;
            this.addCall(call);
            const callResult = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({
                call
            });
            //When Unified Routing is enabled, we need to invoke OmniFlow, otherwise regular flow to publish CALL_STARTED event.
            if(flowConfig?.isUnifiedRoutingEnabled) {
                if (this.state.flowConfig == null) {
                    this.state.flowConfig = { ...flowConfig };
                } else {
                    Object.assign(this.state.flowConfig, flowConfig);
                }
                console.log('Inside isUnifiedRoutingEnabled ' + flowConfig.isUnifiedRoutingEnabled);
                var response = this.executeOmniFlowForUnifiedRouting(data, flowConfig);
                console.log('response From execute onmi flow' + response);
            } else {
                console.log('Non UnifiedRouting flow');
                (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.CALL_STARTED, payload: callResult });
            }
            return this.executeAsync('startInboundCall', callResult);
        });
    }

    getAllPhoneContacts(numOfContactsPerType) {
        let contacts = [];
        for (let i=1; i<=numOfContactsPerType; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                id: 'id'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.AGENT,
                name : ["Agent Name "]+i,
                phoneNumber: "555555444"+i,
                availability: this.getRandomAvailability()
            }))
        }
        for (let i=numOfContactsPerType+1; i<=numOfContactsPerType*2; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                id: 'id'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.QUEUE,
                name : "Queue Name "+i,
                queue: "Queue"+i,
                queueWaitTime: (Math.random() * 400).toString()
            }))
        }
        for (let i=numOfContactsPerType*2+1; i<=numOfContactsPerType*3; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                id: 'id'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONEBOOK,
                name : "Phonebook Entry "+i,
                phoneNumber: "55566644"+i
            }))
        }
        for (let i=numOfContactsPerType*3+1; i<=numOfContactsPerType*4; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                id: 'id'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONENUMBER,
                name : "Phone Number "+i,
                phoneNumber: "5557774"+i
            }))
        }
        for (let i=numOfContactsPerType*4+1; i<=numOfContactsPerType*5; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                endpointARN: 'arn'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONENUMBER,
                name : ["ARN "]+i,
                phoneNumber: "5555554"+i
            }))
        }
        return contacts;
    }

    getAllMessagingContacts(numOfContactsPerType) {
        let contacts = [];
        let contactListTypeMap = {
            0: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_LIST_TYPE.ALL,
            1: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_LIST_TYPE.CONFERENCE,
            2: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_LIST_TYPE.TRANSFER
        };
        for (let i=1; i<=numOfContactsPerType; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                id: 'id'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.AGENT,
                name : ["Agent Name "]+i,
                availability: this.getRandomAvailability(),
                listType: contactListTypeMap[i%3]
            }))
        }
        for (let i=numOfContactsPerType+1; i<=numOfContactsPerType*2; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                id: 'id'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.QUEUE,
                name : "Queue Name "+i,
                queue: "Queue"+i,
                queueWaitTime: (Math.random() * 400).toString(),
                listType: contactListTypeMap[i%3]
            }))
        }
        for (let i=numOfContactsPerType*2+1; i<=numOfContactsPerType*3; i++) {
            contacts = contacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact ({
                id: 'id'+i,
                type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.PHONENUMBER,
                name : "External Contact "+i,
                phoneNumber: "55566644"+i,
                listType: contactListTypeMap[i%3]
            }))
        }
        return contacts;
    }

    getRandomAvailability() {
        const randomAvailabilityMap = {
            0: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.AGENT_AVAILABILITY.AVAILABLE,
            1: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.AGENT_AVAILABILITY.BUSY,
            2: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.AGENT_AVAILABILITY.OFFLINE,
        }
        return randomAvailabilityMap[Math.floor(Math.random()*3)];
    }

    getActiveCallsObj() {
        const activeCalls = JSON.parse(localStorage.getItem('activeCalls')) || {};
        Object.keys(activeCalls).forEach(callId => {
            if (activeCalls[callId].contact) {
                activeCalls[callId].contact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(activeCalls[callId].contact);
            } 
            if (activeCalls[callId].toContact) {
                activeCalls[callId].toContact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(activeCalls[callId].toContact);
            }
            if (activeCalls[callId].fromContact) {
                activeCalls[callId].fromContact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact(activeCalls[callId].fromContact);
            }
            activeCalls[callId].callInfo.callStateTimestamp = activeCalls[callId].callInfo.callStateTimestamp ? new Date(activeCalls[callId].callInfo.callStateTimestamp) : new Date();
            activeCalls[callId].callInfo = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(activeCalls[callId].callInfo);
            activeCalls[callId].callAttributes = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCallAttributes(activeCalls[callId].callAttributes);
            activeCalls[callId] = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall(activeCalls[callId]);
        });
        return activeCalls;
    }

    hasActiveCalls(participantType) {
        if (!participantType) {
            return this.state.activeCalls && Object.keys(this.state.activeCalls).length > 0;
        }
        return Object.values(this.state.activeCalls).filter((obj) => obj['callAttributes']['participantType'] === participantType).length > 0;
    }

    /**
     * get agent  configs, for example if mute or recording is supported, phones supported for agent
     */
    getAgentConfig() {
        return this.executeAsync("getAgentConfig", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.AgentConfigResult({
            phones: this.state.agentConfig.phones,
            selectedPhone: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Phone (this.state.agentConfig.selectedPhone)
        }));
    }

    /**
     * get agent  configs, for example if mute or recording is supported, phones supported for agent
     */
    getSharedCapabilities() {
        return this.executeAsync("getSharedCapabilities", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SharedCapabilitiesResult({
            hasContactSearch: this.state.capabilities.hasContactSearch,
            hasAgentAvailability: this.state.capabilities.hasAgentAvailability,
            hasQueueWaitTime: this.state.capabilities.hasQueueWaitTime,
            debugEnabled: this.state.capabilities.debugEnabled,
            hasTransferToOmniFlow: this.state.capabilities.hasTransferToOmniFlow,
            hasPendingStatusChange: this.state.capabilities.hasPendingStatusChange,
            hasSFDCPendingState: this.state.capabilities.hasSFDCPendingState
        }));
    }

    /**
     * get agent  configs, for example if mute or recording is supported, phones supported for agent
     */
    getVoiceCapabilities() {
        return this.executeAsync("getVoiceCapabilities", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.VoiceCapabilitiesResult({
            hasMute: this.state.capabilities.hasMute,
            hasMerge: this.state.capabilities.hasMerge,
            hasRecord: this.state.capabilities.hasRecord,
            hasSwap:  this.state.capabilities.hasSwap,
            hasSignedRecordingUrl: this.state.capabilities.hasSignedRecordingUrl,
            supportsMos: this.state.capabilities.supportsMos,
            hasSupervisorListenIn: this.state.capabilities.hasSupervisorListenIn,
            hasSupervisorBargeIn: this.state.capabilities.hasSupervisorBargeIn,
            hasBlindTransfer: this.state.capabilities.hasBlindTransfer,
            hasPhoneBook : this.state.capabilities.hasPhoneBook,
            canConsult : this.state.capabilities.canConsult,
            signedRecordingUrl: '',
            signedRecordingDuration: null,
            isDialPadDisabled: this.state.capabilities.isDialPadDisabled,
            isPhoneBookDisabled: this.state.capabilities.isPhoneBookDisabled,
            isHidSupported: this.state.capabilities.isHidSupported,
            hasSetExternalMicrophoneDeviceSetting: this.state.capabilities.hasSetExternalMicrophoneDeviceSetting,
            hasSetExternalSpeakerDeviceSetting: this.state.capabilities.hasSetExternalSpeakerDeviceSetting
        }));
    }

     /**
     * get all active calls
     */
    getActiveCalls() {
        try {
            const activeCalls = this.getActiveCallsObj();
            const result = Object.values(activeCalls);
            return this.executeAsync('getActiveCalls', new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.ActiveCallsResult({ activeCalls: result }));
        } catch (e) {
            return Promise.reject('Error getting active calls. '+ e); 
        }
        
    }

    /**
     * accept the  call
     * @param {PhoneCall} call
     */
    acceptCall(call){
        let callResult = null;
        if (!this.state.throwError) {
            let callToAccept = this.getCall(call);
            const receiverContact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({
                phoneNumber: this.state.agentId, 
                id: this.state.agentId, 
                name: this.state.userFullName
            })
            callToAccept.receiverContact = receiverContact;
            callToAccept.toContact = this.getCurrentUserContact();
            /* If it's not internal call , contact is the source of truth of which participant we are rendering*/
            if (callToAccept.callType === 'internalcall') {
                /* If it's an internal call, contact will be ourself. We render the initiator's name passed from startInternalCall */
                callToAccept.contact.name = callToAccept.callInfo.renderContactId;
            }
            const currType = callToAccept.callType.toLowerCase();
            const state = ((
                currType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CALLBACK.toLowerCase() ||
                currType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INTERNAL_CALL.toLowerCase()) &&
            callToAccept.state !== scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.CONNECTED) ?
            scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.RINGING : scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.CONNECTED;
            
            callToAccept.state = state;
            // callToAccept.callAttributes.state = state;
            this.log("acceptCall", callToAccept);
            this.addCall(callToAccept);
            this.state.agentAvailable = false;
            if (currType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.TRANSFER.toLowerCase() || 
                currType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT.toLowerCase()) {
                this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.PARTICIPANT_CONNECTED, { 
                    callInfo: callToAccept.callInfo, 
                    callType: currType, 
                    call: callToAccept
                });
            }
            callResult = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({ call: callToAccept });
            this.updateConferenceUsers(false);
        }
        return this.executeAsync("acceptCall", callResult);
    }

    /**
     * decline call
     * @param {PhoneCall} call
     */
    declineCall(call) {
        this.log("declineCall", call);
        const destroyedCall = this.destroyCall(this.getCall(call), scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.HANGUP_REASON.PHONE_CALL_ENDED);
        this.state.activeConferenceCalls = [];
        this.state.agentAvailable = true;
        return this.executeAsync("declineCall", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({ call: destroyedCall }));
    }
    /**
     * end call
     * @param {PhoneCall} call
     * @param {string} agentErrorStatus
     */
    endCall(call, agentErrorStatus) {
        this.log("endCall", call, agentErrorStatus);
        let destroyedCalls = this.processEndCall(call, agentErrorStatus, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.HANGUP_REASON.PHONE_CALL_ENDED, true);
        return this.executeAsync("endCall", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.HangupResult({ calls: destroyedCalls }));
    }

    /**
     *
     * @param call
     * @param agentErrorStatus
     * @param reason
     * @param messageUsers
     */
    processEndCall(call, agentErrorStatus, reason, messageUsers) {
        let destroyedCalls = [];
        if (!this.state.throwError) {
            if (this.state.isMultipartyAllowed) {
                let callObj = {};
                if (call.callId) {
                    callObj = this.getCall(call);
                    if (callObj.callAttributes &&
                        callObj.callAttributes?.participantType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER &&
                        (!callObj.contact || (this.state.agentId === callObj.contact.id))) {
                        destroyedCalls = this.hangupMultiParty(callObj, reason, agentErrorStatus);
                    } else if (callObj.callType?.toLowerCase() === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT.toString().toLowerCase() &&
                        callObj.callAttributes?.participantType.toLowerCase() === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY.toString().toLowerCase()) {
                        destroyedCalls = this.hangupMultiParty(callObj, reason, agentErrorStatus);
                    } else {
                        destroyedCalls = this.destroyCalls(callObj, reason);
                        this.beginWrapup(destroyedCalls[0]);
                    }
                } else {
                    const consultCall = Object.values(this.state.activeCalls).filter((obj) => obj.callAttributes?.isConsultCall === true)[0];
                    if (consultCall) {
                        callObj = consultCall;
                    } else {
                        callObj = this.getCall({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
                    }
                    destroyedCalls = this.hangupMultiParty(callObj, reason, agentErrorStatus);
                }

                if(messageUsers) {
                    this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_DESTROYED, {callId: callObj.callId, reason: reason, target: call.callId ? callObj.callInfo.renderContactId : this.state.agentId});
                }
             } else {
                destroyedCalls = this.destroyCalls(call, reason);
                this.beginWrapup(destroyedCalls[0]);
            }
        }
        this.state.agentAvailable = Object.keys(this.state.activeCalls).length === 0;
        return destroyedCalls;
    }
    /**
     * Mute
     */
    mute(call) {
        const isMuted = true;
        return this.processMute(call, isMuted)
    }

    /**
     * Unmute
     */
    unmute(call) {
        const isMuted = false;
        return this.processMute(call, isMuted)
    }

    /**
     * Process mute and unmute initiated my myself
     * @param {*} call 
     * @param {*} isMuted 
     * @returns 
     */
    processMute(call, isMuted) {
        const isGlobal = call ? call.isGlobal : false;
        const isSupervisor = call && call.isSupervisor;
        call = this.updateCallInfo({ isMuted }, call);
        const targetIsPrimaryCaller = this.getPrimaryCall().callId === call.callId;
        /* Find the muting target
         * (1) Muting myself? Check call.isGlobal passed from core. True while clicking on global action, false while clicking on entry mute.
         * (2) Muting my primary call (but not me)? Check call.contact.id for primary call initiator's info
         * (3) Muting someone else: Read the renderContactId
        */
        const target = isGlobal ? this.state.agentId : (targetIsPrimaryCaller && call.contact) ? (call.contact.id ? call.contact.id : call.contact.phoneNumber) : call.callInfo.renderContactId;
        /* Setting target in call.callAttribute and it will be broadcasted to other agents */
        call.callAttributes.target = target;
        /* Broadcast the mute message to all the users */
        const userMessage = isMuted ? _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.MUTE : _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.UNMUTE;
        if (this.state.isMultipartyAllowed && isSupervisor === false) {
            this.messageUser(null, userMessage, call, isMuted);
        }
        return this.executeAsync("mute", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.MuteToggleResult({ isMuted,  call, isGlobal }));
    }
    /**
     * Process broadcast mute and unmute
     */
    async processBroadcastMute(call, isMuted) {
        /* Read the target param passed in call attribute by the mute initiator */
        const target = call.callAttributes.target;
        /* Find the target call to mute
         * (1) Muting myself? Check isGlobal
         * (2) Muting my primary call (but not me)? Check if the target is primary call contact id
         * (3) Muting someone else? Find that call through renderContactId
         * In (1) (2) we return the same call, only difference is isGlobal
         */
        const isGlobal = this.state.agentId === target;
        const callForTarget = this.getCall({callInfo: {renderContactId: target}})
        const targetIsPrimaryCaller = this.getPrimaryCall().contact.id === target;
        let targetCall = ( isGlobal || targetIsPrimaryCaller ) ? this.getPrimaryCall() : callForTarget;
        targetCall = this.updateCallInfo({ isMuted }, targetCall);
        let payload = await this.executeAsync("mute", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.MuteToggleResult({ isMuted, call:targetCall, isGlobal }));
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.MUTE_TOGGLE, payload });
    }

    /**
     * hold the call
     * @param {PhoneCall} call
     */
    hold(call) {
        // TODO - send HOLD_TOGGLE to all participants in MP
        this.updateHoldState(call, true);
        return this.executeAsync("hold", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.HoldToggleResult({
            isThirdPartyOnHold: this.isOnHold({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY }}),
            isCustomerOnHold: this.isOnHold({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }}),
            calls: this.state.activeCalls
        }));
    }

    /**
     * resume the call
     * @param {PhoneCall} call
     */
    resume(call) {
        this.updateHoldState(call, false);
        return this.executeAsync("resume", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.HoldToggleResult({
            isThirdPartyOnHold: this.isOnHold({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY }}),
            isCustomerOnHold: this.isOnHold({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }}),
            calls: this.state.activeCalls
        }));
    }
    /**
     * pause recording for the call
     * @param {PhoneCall} call
     */
    pauseRecording(call) {
        const isRecordingPaused = true;
        call = call || this.getCall({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
        if (this.isConsultCall(call)) {
            call = this.getCall({ callAttributes: { isConsultCall : true }});
        } 
        return this.executeAsync("pauseRecording", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.RecordingToggleResult({ isRecordingPaused, contactId : call.callId }, this.updateCallInfo({ isRecordingPaused }, call)));
    }
    /**
     * resume recording for the call
     * @param {PhoneCall} call
     */
    resumeRecording(call) {
        const isRecordingPaused = false;
        call = call || this.getCall({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
        if (this.isConsultCall(call)) {
            call = this.getCall({ callAttributes: { isConsultCall : true }});
        }
        return this.executeAsync("resumeRecording", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.RecordingToggleResult({ isRecordingPaused, contactId : call.callId }, this.updateCallInfo({ isRecordingPaused }, call)));
    }
    /**
    * Supervise a call
    * @param {SuperviseCallResult} SuperviseCallResult
    */
    superviseCall(parentCall) {
        if (this.hasActiveCalls()) {
            return Promise.reject(new Error(`Agent is not available to supervise a call`));
        }
        const call = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall({
            callType: parentCall.callType,
            contact: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({ phoneNumber: parentCall.callType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INBOUND ? parentCall.from : parentCall.to }),
            callId: parentCall.callId,
            callInfo: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo({ initialCallId : parentCall.callId, callStateTimestamp: new Date() }),
            callAttributes: { voiceCallId: parentCall.voiceCallId, participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR },
            state: this.state.agentConfig.selectedPhone.type === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PHONE_TYPE.SOFT_PHONE ? scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.CONNECTED : scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.RINGING
        })
        this.addCall(call);
        return this.executeAsync("superviseCall", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SuperviseCallResult({ call }));
    }
    /**
    * Disconnect from a Supervised call
    * @param {SupervisorHangupResult} SupervisorHangupResult
    */
    supervisorDisconnect(supervisedCall) {
        let calls;
        if (!this.state.throwError) {
            calls = this.destroyCalls({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR }});
        }
        return this.executeAsync("supervisorDisconnect", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SupervisorHangupResult({ calls }));
    }

    /**
    * Barge in into a call as a supervisor
    * @param {SuperviseCallResult} SuperviseCallResult
    */
    supervisorBargeIn(supervisedCall) {
        const call = this.getCall({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR }});
        call.callAttributes.hasSupervisorBargedIn = supervisedCall.isBargedIn = true;
        supervisedCall.supervisorName = this.state.userFullName;
        this.addCall(call);
        this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_BARGED_IN, supervisedCall);
        return this.executeAsync("supervisorBargeIn", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SuperviseCallResult({ call }));
    }

    /**
     * Return true if a call is on hold. If the call does not exist return undefined
     * @param {PhoneCall} call
     * @return true if a call is on hold
     */
    isOnHold(call) {
        try {
            return this.getCall(call).callAttributes.isOnHold;
        } catch(e) {
            return undefined;
        }
    }
    /**
     * @param {PhoneCall} activeCall call object or call index
     * @param {boolean} onHold
     */
    updateHoldState(activeCall, onHold) {
        const call = this.getCall(activeCall);
        call.callAttributes.isOnHold = onHold;
        call.callInfo.isOnHold = onHold;
        this.addCall(call);
    }
    /**
     * swap calls
     * @param {PhoneCall} call1 first call to be swapped
     * @param {PhoneCall} call2 second call to be swapped
     */
    swapCalls(call1, call2) {
        const activeCall1 = this.getCall(call1);
        const activeCall2 = this.getCall(call2);
        this.updateHoldState(call1, !activeCall1.callAttributes.isOnHold);
        this.updateHoldState(call2, !activeCall2.callAttributes.isOnHold);
        return this.executeAsync("swapCalls", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.HoldToggleResult({
            isThirdPartyOnHold: this.isOnHold(call1),
            isCustomerOnHold: this.isOnHold(call2),
            calls: this.state.activeCalls
        }));
    }
    
    /**
     * join calls
     * @param {PhoneCall[]} calls to be joined
     */
    conference(callArray) {
        const calls = callArray || Object.values(this.state.activeCalls);
        let holdToggleResult;
        // there is a transfer call to merge or consult call to merge
        if (this.state.isMultipartyAllowed && (this.hasConsultCall(calls) || Object.keys(this.state.activeCalls).length === 2)) {
            let callToMerge;
            try {
                callToMerge = this.getCall({ callAttributes: { isConsultCall : true }});
            } catch(error) {
                callToMerge = this.getCall({ callAttributes: { participantType : scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY }});
            }

            if (callToMerge) {
                this.mergeConsultCall(callToMerge);
                // change consult call participantType
                callToMerge.callAttributes.participantType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY;
                this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.MERGE, { consultCall: callToMerge, activeConferenceCalls: Object.values(this.state.activeCalls) });
            }
            // When call is merged and primary call is on Hold, we should resume the primary call
            let primaryCall = this.getPrimaryCall();
            this.updateHoldState(primaryCall, false);
        } else {
            calls.forEach((call) => {
                this.updateHoldState(call, false);
            });
        }

        //TODO: update HoldToggleResult for Consult
        holdToggleResult = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.HoldToggleResult({
            isThirdPartyOnHold: false,
            isCustomerOnHold: false
        });

        if (this.state.isMultipartyAllowed) {
            holdToggleResult.calls = this.state.activeCalls;
            holdToggleResult.isCallMerged = true;
        }

        return this.executeAsync("conference", holdToggleResult);
    }

    hasConsultCall(calls) {
        return (
            this.state.isConsultAllowed &&
            this.state.capabilities.canConsult &&
            calls?.some(call => call?.callAttributes?.isConsultCall === true)
        );
    }

    mergeConsultCall(consultCall) {
        consultCall.callAttributes.isConsultCall = false;
        consultCall.callType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.ADD_PARTICIPANT;
        consultCall.callAttributes.isAutoMergeOn = true;
        consultCall.reason = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.HANGUP_REASON.PHONE_CALL_ENDED;
        let callToUpdate = this.state.activeCalls[consultCall.callId];
        if (callToUpdate) {
            let params = {
                callAttributes: {
                    isConsultCall: false,
                    isAutoMergeOn: true,
                    isOnHold: false,
                    participantType: consultCall.callAttributes.participantType
                },
                callInfo: {
                    isOnHold: false
                },
                callType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.ADD_PARTICIPANT,
                reason: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.HANGUP_REASON.PHONE_CALL_ENDED,
            }
            for (const key in params) {
                callToUpdate[key] = typeof params[key] === 'object' ? Object.assign({}, callToUpdate[key], params[key]) : params[key];
            }
        } else {
            this.addCall(consultCall);
            this.updateHoldState(consultCall, false);
        }
    }

    /**
     * set agent status
     * @param {string} agentStatus agent status, Constants.AGENT_STATUS.ONLINE or Constants.AGENT_STATUS.OFFLINE
     * @param {AgentStatusInfo} agentStatusInfo object contains statusId, statusApiName and statusName
     * @param {boolean} enqueueNextState true if the state should be enqueued, which will update the agent's status after a call ends
     */
    setAgentStatus(agentStatus, agentStatusInfo, enqueueNextState) {
        this.agentStatus = agentStatus;
        this.toggleAgentPresence(!(agentStatus === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.AGENT_STATUS.OFFLINE));
        return this.executeAsync("setAgentStatus", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.GenericResult({
            success: true
        }));
    }
    /**
     * send digits to the active call
     * @param {string} digits - digits to be sent (i.e. 123#)
     */
    sendDigits(digits) {
        return this.executeAsync("sendDigits");
    }
    /**
     * Get Agent Phone Book Contacts
     */
    getPhoneContacts(filter) {
        let onlineContacts = [];
        this.state.onlineUsers.forEach((user) => {
            if (this.state.agentId !== user) {
                onlineContacts = onlineContacts.concat(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({
                    id: user,
                    type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.AGENT,
                    name : this.state.userFullNames.get(user),
                    availability: "AVAILABLE",
                    phoneNumber: user
                }))
            }
        })
        let contacts = this.filterContacts(onlineContacts.concat(this.state.phoneContacts), filter) ;
        return this.executeAsync("getPhoneContacts", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneContactsResult({
            contacts, contactTypes: this.state.contactTypes
        }));
    }
    /**
     * add participant to call through a new contact
     * @param {Contact} contact - new contact
     * @param {PhoneCall} call - call to be transferred
     * @param {boolean} isBlindTransfer - True if blind transfering a call and hanging up upon transfer
     */
    async addParticipant(contact, call, isBlindTransfer) {
        const parentCall = this.getCall(call);
        const isAutoMergeOn = call.callAttributes?.isAutoMergeOn;
        const callAttributes = {
            ...parentCall.callAttributes,
            isAutoMergeOn,
            isBlindTransfer,
        };
        const initiatorContact = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({
            phoneNumber: this.state.agentId, 
            id: this.state.agentId, 
            type: this.state.type,
            name: this.state.userFullName
        })
        let isExternalTransfer;
        let callInfo = { ...(parentCall.callInfo ? new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(parentCall.callInfo) : {}), 
            renderContact: initiatorContact, renderContactId: contact.id};
        if (callInfo.isExternalTransfer !== undefined) {
            isExternalTransfer = callInfo.isExternalTransfer;
        } else if(contact) {
            isExternalTransfer = !!contact.phoneNumber;
        }
        callInfo.isExternalTransfer = isExternalTransfer;
        callInfo.callStateTimestamp = new Date();
        callInfo.initialCallId = parentCall.callId;
        let additionalFields = callInfo.additionalFields ? callInfo.additionalFields : parentCall.callInfo && parentCall.callInfo.additionalFields;
        let transferCall = await this.createVoiceCall(parentCall.callId, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.TRANSFER, parentCall.phoneNumber, additionalFields);
        let transferTo = contact.id;
        if(contact.type === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CONTACT_TYPE.FLOW) {
            let routingInstruction = await this.executeOmniFlow(transferCall, contact.id);
            transferTo = routingInstruction.agent || routingInstruction.queue;
        }
        if (!contact.id) {
            contact.id = Math.random().toString(36).substring(5);
        }

        //newTransferVendorkey is created so that we dont have generate vendor key for transfer call everytime.
        let newTransferVendorkey = transferCall.vendorCallKey || this.generateCallId();

        /*
         executeOmniFlow API is required for Unified routing. Adding it here will take care of warm & Blind transfer.
         */
        if(this.state?.flowConfig?.isUnifiedRoutingEnabled) {
            let callInfoData = {
                transferTo,
                voiceCallId : newTransferVendorkey
            };
            let flowConfigData = {
                dialedNumber : this.state.flowConfig.dialedNumber
            };
            await this.executeOmniFlowForUnifiedRouting(callInfoData,flowConfigData);
        }
        
        if (isBlindTransfer) {
            if (this.state.onlineUsers.includes(transferTo)) {
                this.messageUser(transferTo, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_STARTED, {phoneNumber: parentCall.phoneNumber, callId: newTransferVendorkey, voiceCallId: transferCall.voiceCallId});
            } else{
                //Only for unified routing - Transfer to queue use case is supported in demo connector
                if(this.state?.flowConfig?.isUnifiedRoutingEnabled) {
                    // to handle Transfer to queue use case
                    this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_STARTED, {
                        phoneNumber: parentCall.phoneNumber,
                        callId: newTransferVendorkey,
                        voiceCallId: transferCall.voiceCallId,
                        flowConfig: this.state.flowConfig
                    });
                }
            }
            const destroyedCall = this.destroyCall(call, scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.HANGUP_REASON.PHONE_CALL_ENDED);
            this.log("addParticipant - cold transfer (destroyed call)", destroyedCall);
            this.beginWrapup(destroyedCall);
            return this.executeAsync("addParticipant", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.ParticipantResult({
                contact: contact,
                phoneNumber: contact.phoneNumber,
                callInfo: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(callInfo),
                callAttributes,
                initialCallHasEnded: true,
                callId: call.callId
            }));
        }

        callAttributes.isOnHold = parentCall.callInfo.isOnHold = !this.state.isMultipartyAllowed && !isAutoMergeOn; //FIXME: remove callAttributes.isOnHold in core, we don't need isOnHold in two places
        callInfo.isOnHold = false;

        const parentVoiceCallId = callAttributes.voiceCallId;
        if (this.state.isMultipartyAllowed) {
            callInfo = Object.assign(
                callInfo,
                JSON.parse(localStorage.getItem('callInfo')),
                {
                    isRecordingPaused : parentCall.callInfo ? parentCall.callInfo.isRecordingPaused : false
                }
            );
        }
        const newCall = new Call(scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.ADD_PARTICIPANT, contact, { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY, voiceCallId: parentVoiceCallId, isAutoMergeOn }, new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(callInfo), transferCall.vendorCallKey || this.generateCallId());
        newCall.parentCallId = parentCall.callId;
        newCall.callAttributes.isOnHold = false; // same FIXME
        newCall.state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.TRANSFERRING;
        newCall.fromContact = initiatorContact;

        this.log("addParticipant to parent voiceCall " + parentVoiceCallId, newCall);
        this.addCall(parentCall);
        if (this.state.onlineUsers.includes(transferTo)) {
            this.messageUser(transferTo, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_STARTED, {phoneNumber: this.state.userFullName, callInfo, contact, initiatorContact, callId: newCall.callId, voiceCallId: transferCall.voiceCallId, activeConferenceCalls: isAutoMergeOn ? Object.values(this.state.activeCalls) : [], flowConfig: this.state.flowConfig });
        }else{
            if(this.state?.flowConfig?.isUnifiedRoutingEnabled) {
                // to handle Transfer to queue use case
                this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_STARTED, {
                    phoneNumber: this.state.userFullName,
                    callInfo,
                    contact,
                    initiatorContact,
                    callId: newCall.callId,
                    voiceCallId: transferCall.voiceCallId,
                    activeConferenceCalls: isAutoMergeOn ? Object.values(this.state.activeCalls) : [],
                    flowConfig: this.state.flowConfig
                });
            }
        }
        this.addCall(newCall);
        return this.executeAsync("addParticipant", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.ParticipantResult({
            contact: contact,
            phoneNumber: contact.phoneNumber,
            callInfo: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(callInfo),
            callAttributes,
            initialCallHasEnded: callAttributes.initialCallHasEnded,
            callId: newCall.callId
        }));
    }

    onAgentWorkEvent(agentWork) {
        this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.AGENT_WORK_NOTIFICATION, agentWork);
        return this.executeAsync("onAgentWorkEvent", agentWork);
    }

    executeOmniFlow(call, flowName) {
        return  fetch('/api/executeOmniFlow', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flowName:flowName, voiceCallId:call.vendorCallKey || this.generateCallId()})
        }).then(response => response.json()).then((payload) => {
            return payload;
        }).catch((err) => {
            return Promise.reject(err);
        });
    }

    //This is a new method where we are passing all the flowInput parameters.
    executeOmniFlowForUnifiedRouting(call, flowConfig) {
        var dialedNumber = flowConfig.dialedNumber;
        var flowDevName = flowConfig.flowDevName;
        var fallbackQueue = flowConfig.fallbackQueue;
        let requestObject = {
            dialedNumber: dialedNumber,
            voiceCallId:call.voiceCallId,
            fallbackQueue: fallbackQueue
        };
        if(call?.transferTo){
            requestObject.transferTarget = call.transferTo;
        }
        if (flowConfig?.isTransferFlow) {
            requestObject.flowDevName = flowDevName;
        } else {
            requestObject.flowName = flowDevName;
        }

        return  fetch('/api/executeOmniFlow', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObject)
        }).then(response => response.json()).then((payload) => {
            return payload;
        }).catch((err) => {
            console.log('ERR ',err);
            return Promise.reject(err);
        });
    }
/*



*/ 
    /**
     * Create a Voice call
     */
     createVoiceCall(parentCallId, callType, caller, additionalFields) {
        let url = '/api/createVoiceCall?caller=' + caller + '&type=' +  callType  + (parentCallId ? '&parentCallId=' + parentCallId : '') + (additionalFields  ? '&additionalFields=' + additionalFields : ''); // Consider passing the call attributes through the body if there are issues with special characters in the string 
        return  fetch(url, {
            headers: {
                'Strict-Transport-Security': 'max-age=31536000'
            }
        }).then(response => response.json())
        .then((data) => {
            if (!data.voiceCallId){
                this.log("Could not contact Service Cloud Real ,Time. VoiceCall will be created by Salesforce Service Degradation Service.")
            }
            return data;
        }).catch((err) => {
            return Promise.reject(err);
        });
    }
    /**
     * connect a participant
     */
    connectParticipant(callInfo, callType, call) {
        // Verify if this participant is newly joined.
        if (!this.hasActiveCalls()) {
            return; //need to have at least an initial call to connect a participant
        }

        // avoid connecting consult call to an agent who did not initiate the conversation
        if (call?.callType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT &&
            Object.keys(this.state.activeCalls).indexOf(call.callId) === -1) {
            return;
        }

        let receiverContact;
        if (call) {
            if (call.receiverContact) {
                call.callInfo.renderContactId = call.receiverContact.id;
                receiverContact = call.receiverContact;
            } else {
                if (call.contact && call.contact.id) {
                    call.callInfo.renderContactId = call.contact.id;
                } else if (call.contact && call.contact.phoneNumber) {
                    call.callInfo.renderContactId = call.contact.phoneNumber;
                }
            }
        }

        if (this.state.isMultipartyAllowed && call && !this.state.activeCalls[call.callId]) {
            call.callType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.ADD_PARTICIPANT;
            call.callAttributes.participantType = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY;
            this.addCall(call);
        }
        if (callType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INTERNAL_CALL.toLowerCase()) {
            call = this.getCall({...(call || {}), callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
            call.state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.CONNECTED;
        } else if (callType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT.toLowerCase()) {
            call = this.getCall({...(call || {}),callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY }});
            call.state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.CONNECTED;
        } else {
            call = this.getCall({...(call || {}),callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY }});
            call.state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.TRANSFERRED;
        }      
        this.log("connectParticipant", call);
        this.addCall(call);
        if (!callType) {
            callType = call.callType.toLowerCase();
        }
        if (callType !==  scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.INTERNAL_CALL.toLowerCase() && callType !==  scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT.toLowerCase()) {
            let publishedCallInfo = call.callInfo || {};
            publishedCallInfo.callStateTimestamp = publishedCallInfo.callStateTimestamp ? new Date(publishedCallInfo.callStateTimestamp) : new Date();
            (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.ParticipantResult({
                contact: receiverContact ? receiverContact : call.contact,
                phoneNumber: call.contact && call.contact.phoneNumber,
                callAttributes: call.callAttributes,
                callInfo: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo(publishedCallInfo),
                initialCallHasEnded: call.callAttributes && call.callAttributes.initialCallHasEnded,
                callId: call.callId
            })});
        } else {
            (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.CALL_CONNECTED, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({call})});
        }
    }
    /**
     * connect the last added supervisor
     */
    connectSupervisor() {
        const call = this.getCall({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR }});
        call.state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.CONNECTED;
        this.log("connectSupervisor", call);
        this.addCall(call);
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SuperviseCallResult({ call })});
    }

    /**
     * Simulate removing the participantType from the conversation
     * @param {PARTICIPANT_TYPE} participantType need to be removed
     * @param call
     */
    removeParticipant(participantType, call) {
        call = this.getCall({...(call || {}), callAttributes: { participantType: participantType }});
        const reason = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.HANGUP_REASON.PHONE_CALL_ENDED;
        const destroyedCall = this.destroyCall(call, reason);
        this.log("removeParticipant", call);
        if (this.state.isMultipartyAllowed) {
            this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_DESTROYED, {callId: call.callId, reason: reason});
        }
        this.state.agentAvailable = Object.keys(this.state.activeCalls).length === 0;
        this.beginWrapup(destroyedCall);
        
        const payload = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({ call: destroyedCall });
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED, payload });
        return this.executeAsync("removeParticipant", payload);
    }

    removeSupervisor() {
        const call = this.getCall({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR }});
        const destroyedCall = this.destroyCall(call);
        this.log("removeSupervisor", call);
        const payload = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SupervisorHangupResult({ calls: destroyedCall });
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP, payload });
        return this.executeAsync("removeSupervisor", payload);
    }

    /**
     * Simulate connecting caller
     */
    connectCall(callInfo, callToConnect) {
        const call = callToConnect || this.getCall({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
        call.state = scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_STATE.CONNECTED;
        call.callInfo = Object.assign(call.callInfo, callInfo);
        // call.callAttributes.state = Constants.CALL_STATE.CONNECTED;
        this.addCall(call);
        this.log("connectCall", call);
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.CALL_CONNECTED, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({ call })});
    }
    /**
     * Simulate hanging up the phone from the agent (either decline or end the call from hardphone)
     */
    hangup(reason, agentErrorStatus) {
        let destroyedCalls = this.destroyCalls({callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.AGENT }}, reason);
        destroyedCalls.map((call) => {
            call.callInfo.isSoftphoneCall = false;
            call.agentStatus = agentErrorStatus;
            call.reason = reason;
            return call;
        });
        this.state.agentAvailable = Object.keys(this.state.activeCalls).length === 0;
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.HANGUP, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.HangupResult({ calls: destroyedCalls })});
        this.beginWrapup(destroyedCalls[0]);
        return this.executeAsync("hangup", destroyedCalls);
    }

    /**
     * Hang up user's call in a multiparty
     * @param call
     * @param reason
     * @param agentErrorStatus
     * @returns {?[]}
     */
    hangupMultiParty(call, reason, agentErrorStatus) {
        let destroyedCalls = this.getActiveCallsList();
        this.processCallsToDestroy(destroyedCalls, reason);
        destroyedCalls.map((call) => {
            call.callInfo.isSoftphoneCall = false;
            call.agentStatus = agentErrorStatus;
            call.reason = reason;
            return call;
        });
        this.state.agentAvailable = Object.keys(this.state.activeCalls).length === 0;
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.HANGUP, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.HangupResult({ calls: [call] })});
        this.beginWrapup(call);
        return destroyedCalls;
    }

    isConsultCall(call) {
        return this.state.isConsultAllowed && this.state.capabilities.canConsult &&
            (call?.callAttributes?.isConsultCall === true || call?.callType?.toLowerCase() === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CONSULT.toLowerCase()) ;
    }

    initiateHangupMultiParty(reason, agentErrorStatus) {
        let call;
        try {
            call = this.getCall({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER }});
        } catch (e) {
            call = this.getCall({ callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.THIRD_PARTY }});
        } 
        this.hangupMultiParty(call, reason, agentErrorStatus);
        this.messageUser(null, _common_constants__WEBPACK_IMPORTED_MODULE_2__.USER_MESSAGE.CALL_DESTROYED, {callId: call.callId, reason: reason});
    }

    /**
     * begin after call wrap-up
     * @param {PhoneCall} call - call to begin wrap-up
     * 
     * The implementation publishes AFTER_CALL_WORK_STARTED inside a setTimeout to 
     * give demo connector enough time to finish executing HANGUP/END_CALL code/events. 
     */
    beginWrapup(call) {
        setTimeout(()=> {
            if (this.state.agentAvailable) {
                (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload: { callId: call.callId }});
            }
        },0);
    }

    /**
     * 
     * end after call wrap-up
     */
    endWrapup() {
        this.log("endWrapup");
    }

    /**
     * send  message to Voice Call Record Home
     * @param {object} message - Message
     */
    publishMessage(message) {
        this.log("publishMessage", message);
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.SHARED_EVENT_TYPE.MESSAGE, payload: message });
    }
    /**
     * Handle  message received from sfdc component
     * @param {object} message - Message
     */
    handleMessage(message) {
        const requestBroadcastChannel = new BroadcastChannel('rc-request');
        requestBroadcastChannel.postMessage({type: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.SHARED_EVENT_TYPE.MESSAGE, payload: message});
        this.log("handleMessage", message);
    }

    getSignedRecordingUrl(recordingUrl, vendorCallKey, callId) {
        return this.executeAsync("getSignedRecordingUrl", new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SignedRecordingUrlResult({
            success: this.state.capabilities.hasSignedRecordingUrl,
            url: this.state.capabilities.signedRecordingUrl,
            duration: parseInt(this.state.capabilities.signedRecordingDuration),
            callId
        }));
    }

    /**
     * Simulate callback
     */
    requestCallback(payload) {
        const { phoneNumber } = payload;
        const callInfo = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo({ callStateTimestamp: new Date() });
        const call = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall({ callId: this.generateCallId(),
            phoneNumber,
            callInfo,
            callType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.CALLBACK.toLowerCase(),
            contact: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({ phoneNumber }),
            callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER } });
        this.addCall(call);
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({ call })});
    }

    /**
     * Simulate preview call
     */
    previewCall(payload) {
        const { phoneNumber } = payload;
        const callInfo = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallInfo({ callStateTimestamp: new Date() });
        const call = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.PhoneCall({ callId: this.generateCallId(),
            phoneNumber,
            callInfo,
            callType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.CALL_TYPE.OUTBOUND.toLowerCase(),
            contact: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Contact({ phoneNumber }),
            callAttributes: { participantType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.INITIAL_CALLER, dialerType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.DIALER_TYPE.OUTBOUND_PREVIEW } });
        this.addCall(call);
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.PREVIEW_CALL_STARTED, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.CallResult({ call })});
    }

    /**
     * Simulate update Audio Stats for MOS
     */
    updateAudioStats(audioStats) {
        this.log("updateAudioStats", audioStats);
        let statsArray = [];
        audioStats.stats.forEach(stats => {
            let inputChannelStats;
            let outputChannelStats;
            if (stats.inputChannelStats) {
                inputChannelStats = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.StatsInfo(stats.inputChannelStats);
            }
            if (stats.outputChannelStats) {
                outputChannelStats = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.StatsInfo(stats.outputChannelStats);
            }
            statsArray.push(new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.AudioStatsElement({inputChannelStats, outputChannelStats}));
        });
        const payload = new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.AudioStats({stats: statsArray, callId: audioStats.callId, isAudioStatsCompleted: audioStats.isAudioStatsCompleted});
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS, payload: payload });
    }

    /**
     * cache the value of remove participant variant for the third party transfer participant
     * This allows disabling the remove participant button during the dialing phase of a transfer call. 
     */
    updateRemoveTransferCallParticipantVariant(variant) {
        this.state.updateRemoveTransferCallParticipantVariant = variant;
    }

    publishSetAgentStatus(statusId) {
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: "SET_AGENT_STATUS", payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.AgentStatusInfo({statusId}) });
    }

    publishCallBargedInEventToAgents(parentCall) {
        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.publishEvent)({ eventType: "CALL_BARGED_IN", payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.SupervisedCallInfo(parentCall)});
    }

    isSupervisorListeningIn() {
        return this.state.capabilities.hasSupervisorListenIn && Object.values(this.state.activeCalls || {}).some(
            (obj) => obj?.callAttributes?.participantType === scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.Constants.PARTICIPANT_TYPE.SUPERVISOR
        );
    }

    /**
     * CTR Sync functionality to update VoiceCall record to completed state
     */
    async ctrSync(voiceCallId) {
        if (!voiceCallId) {
            return { success: false, message: "Voice Call ID is required" };
        }

        try {
            // First, verify that all participants have hung up
            const callState = await this.verifyCallState();
            if (!callState.allParticipantsHungUp) {
                return { 
                    success: false, 
                    message: "Cannot sync CTR: Not all participants have hung up" 
                };
            }

            // Use the existing voice call update API from the API documentation
            const response = await fetch('/api/updateVoiceCall', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    voiceCallId: voiceCallId,
                    endTime: new Date().toISOString(),
                    isActiveCall: false
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    return { success: true, message: "Voice call updated successfully" };
                } else {
                    return { success: false, message: "Voice call update failed" };
                }
            } else {
                return { success: false, message: `Voice call update failed with status ${response.status}` };
            }
        } catch (error) {
            return { success: false, message: `Voice call update failed: ${error.message}` };
        }
    }

    /**
     * Verify that all participants associated with a call have hung up
     */
    async verifyCallState() {
        // Simple check: if there are no active calls, then all participants have hung up
        const hasActiveCalls = Object.keys(this.state.activeCalls).length > 0;
        
        if (hasActiveCalls) {
            return { allParticipantsHungUp: false };
        }
        
        return { allParticipantsHungUp: true };
    }
}


/***/ }),

/***/ "./src/remote-control/index.js":
/*!*************************************!*\
  !*** ./src/remote-control/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeRemoteController: () => (/* binding */ initializeRemoteController)
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */




function  initializeRemoteController(connector) {
    connector.sdk.eventEmitter.on('event', async (event) => {
        if (event && event.data) {
            try {
                let call;
                let callResult;
                switch (event.data.type) {
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].LOGIN_SUBMIT: {
                        connector.sdk.subsystemLoginResult(event.data.success);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].GET_SHOW_LOGIN_PAGE: {
                        const { showLoginPage } = connector.sdk.state;
                        connector.sdk.messageUser(event.fromUsername, 
                                                  _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SHOW_LOGIN_PAGE, 
                                                  {
                                                        type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SHOW_LOGIN_PAGE,
                                                        value: showLoginPage
                                                  })
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].GET_AGENT_CONFIG: {
                        const { agentConfig, contactCenterChannels, agentId, userPresenceStatuses, isMultipartyAllowed, isConsultAllowed } = connector.sdk.state;
                        connector.sdk.messageUser(event.fromUsername, 
                                                  _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].AGENT_CONFIG,
                                                 {
                                                    type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].AGENT_CONFIG,
                                                    value: agentConfig,
                                                    userPresenceStatuses,
                                                    contactCenterChannels,
                                                    referrer: `${document.referrer}`,
                                                    agentId,
                                                    isMultipartyAllowed,
                                                    isConsultAllowed
                                                 })
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].GET_CAPABILITIES: {
                        const { capabilities, agentId } = connector.sdk.state;
                        connector.sdk.messageUser(event.fromUsername, 
                                                  _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CAPABILITIES,
                                                 {
                                                    type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CAPABILITIES,
                                                    value: capabilities,
                                                    referrer: `${document.referrer}`,
                                                    agentId: agentId
                                                 })
                    }
                        break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CALL_INFO_UPDATED:
                        connector.sdk.updateCallInfoObj(event);
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].GET_ACTIVE_CALLS: {
                        connector.sdk.messageUser(event.fromUsername,
                                                 _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].ACTIVE_CALLS,
                                                 {
                                                    type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].ACTIVE_CALLS,
                                                    value: Object.values(connector.sdk.getActiveCallsObj())
                                                 })
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].THROW_ERROR: {
                        connector.sdk.throwError(event.data.value)
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CUSTOM_ERROR: {
                        connector.sdk.customErrorChanged(event.data.value)
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_SHOW_LOGIN_PAGE: {
                        connector.sdk.showLoginPage(event.data.value);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_AGENT_CONFIG: {
                        connector.sdk.updateAgentConfig({
                            selectedPhone: event.data.value.selectedPhone
                         });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_CAPABILITIES: {
                        connector.sdk.updateCapabilities({
                            hasMute: event.data.value.hasMute,
                            hasRecord: event.data.value.hasRecord,
                            hasSwap: event.data.value.hasSwap,
                            hasMerge: event.data.value.hasMerge,
                            hasContactSearch: event.data.value.hasContactSearch,
                            hasSignedRecordingUrl: event.data.value.hasSignedRecordingUrl,
                            signedRecordingUrl: event.data.value.signedRecordingUrl,
                            signedRecordingDuration: event.data.value.signedRecordingDuration,
                            supportsMos: event.data.value.supportsMos,
                            hasSupervisorListenIn: event.data.value.hasSupervisorListenIn,
                            hasSupervisorBargeIn: event.data.value.hasSupervisorBargeIn,
                            hasBlindTransfer: event.data.value.hasBlindTransfer,
                            hasPhoneBook: event.data.value.hasPhoneBook,
                            debugEnabled: event.data.value.debugEnabled,
                            hasAgentAvailability: event.data.value.hasAgentAvailability,
                            hasQueueWaitTime: event.data.value.hasQueueWaitTime,
                            hasTransferToOmniFlow: event.data.value.hasTransferToOmniFlow,
                            hasPendingStatusChange: event.data.value.hasPendingStatusChange,
                            canConsult: event.data.value.canConsult,
                            isDialPadDisabled: event.data.value.isDialPadDisabled,
                            isPhoneBookDisabled: event.data.value.isPhoneBookDisabled,
                            isHidSupported: event.data.value.isHidSupported,
                            hasSetExternalMicrophoneDeviceSetting: event.data.value.hasSetExternalMicrophoneDeviceSetting,
                            hasSetExternalSpeakerDeviceSetting: event.data.value.hasSetExternalSpeakerDeviceSetting
                        });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_CONTACT_TYPES: {
                        connector.sdk.updateContactTypes(event.data.contactTypes);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].START_OUTBOUND_CALL: {
                        await connector.sdk.dial(new scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Contact({ phoneNumber: event.data.phoneNumber}), event.data.callInfo, true);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CONSULT: {
                        await connector.sdk.dial(new scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Contact(event.data.contact), event.data.callInfo, true, false, true);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].START_INBOUND_CALL:
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].PROGRESSIVE_DIALER:
                        await connector.sdk.startInboundCall(event.data.phoneNumber, event.data.callInfo, event.data.flowConfig);
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CONNECT_PARTICIPANT: {
                        connector.sdk.connectParticipant(null, null, event.data.call);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SET_AGENT_STATUS: {
                        connector.sdk.publishSetAgentStatus(event.data.statusId);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CONNECT_SUPERVISOR: {
                        connector.sdk.connectSupervisor();
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].REMOVE_PARTICIPANT:
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].END_CALL: {
                        connector.sdk.removeParticipant(event.data.participantType, event.data.call);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].REMOVE_SUPERVISOR: {
                        connector.sdk.removeSupervisor();
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CONNECT_CALL: {
                        connector.sdk.connectCall(event.data.callInfo);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].AGENT_HANGUP: {
                        const { isMultipartyAllowed } = connector.sdk.state;
                        if ( isMultipartyAllowed ) {
                            connector.sdk.initiateHangupMultiParty(event.data.reason, event.data.agentErrorStatus);
                        } else {
                            connector.sdk.hangup(event.data.reason, event.data.agentErrorStatus);
                        }
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SOFTPHONE_LOGOUT: {
                        connector.sdk.subsystemLogout();
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CREATE_TRANSCRIPTION: {
                        fetch('/api/createTranscription', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(event.data)
                        }).then((payload) => {
                            connector.sdk.log(`Create transcript returned with ${payload.success}`);
                        }).catch((err) => {
                            connector.sdk.log(`Create transcript failed - ${err}`);
                        });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SEND_VOICE_MAIL: {
                        fetch('/api/sendVoiceMail', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(event.data.voiceMailDetails)
                        }).then((payload) => {
                            connector.sdk.log(`Store recording link returned with ${payload.success}`);
                        }).catch((err) => {
                            connector.sdk.log(`Store recording link failed - ${err}`);
                        });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SEND_REALTIME_CONVERSATION_EVENTS: {
                        fetch('/api/sendRealtimeConversationEvents', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(event.data.sendRealtimeConversationEventsDetails)
                        }).then((payload) => {
                            connector.sdk.log(`sendRealtimeConversationEvents returned with ${payload.success}`);
                        }).catch((err) => {
                            connector.sdk.log(`sendRealtimeConversationEvents failed - ${err}`);
                        });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SEND_RECORDING: {
                        fetch('/api/updateVoiceCall', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(event.data.recordingInfo)
                        }).then((payload) => {
                            connector.sdk.log(`Store recording link returned with ${payload.success}`);
                        }).catch((err) => {
                            connector.sdk.log(`Store recording link failed - ${err}`);
                        });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].MESSAGE_FROM_CONNECTOR:{
                        await connector.sdk.publishMessage(event.data.message);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].REQUEST_CALLBACK: {
                        connector.sdk.requestCallback(event.data.payload);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].PUSH_DIALER: {
                        connector.sdk.previewCall(event.data.payload);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SEND_AUDIO_STATS: {
                        await connector.sdk.updateAudioStats(event.data.audioStats);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CTR_SYNC: {
                        try {
                            const result = await connector.sdk.ctrSync(event.data.voiceCallId);
                            connector.sdk.messageUser(event.fromUsername, 
                                                      _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CTR_SYNC_RESULT, 
                                                      {
                                                        type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CTR_SYNC_RESULT,
                                                        success: result.success,
                                                        message: result.message
                                                      });
                        } catch (error) {
                            connector.sdk.messageUser(event.fromUsername, 
                                                      _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CTR_SYNC_RESULT, 
                                                      {
                                                        type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CTR_SYNC_RESULT,
                                                        success: false,
                                                        message: error.message
                                                      });
                        }
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].REMOVE_TRANSFER_PARTICIPANT_VARIANT: {
                        connector.sdk.updateRemoveTransferCallParticipantVariant(event.data.variant);
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].HARDPHONE_EVENT: {
                        const eventType = event.data.eventType;
                        const payload = event.data.payload;
                        let result;
                        switch (eventType) {
                            case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].VOICE_EVENT_TYPE.MUTE_TOGGLE: {
                                if (payload.isMuted) {
                                    result = await connector.sdk.mute(payload.call);
                                } else {
                                    result = await connector.sdk.unmute(payload.call);
                                }
                            }
                            break;
                            case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].VOICE_EVENT_TYPE.HOLD_TOGGLE: {
                                if (payload.isCustomerOnHold) {
                                    result = await connector.sdk.hold(payload.call);
                                } else {
                                    result = await connector.sdk.resume(payload.call);
                                }
                            }
                            break;
                            case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].VOICE_EVENT_TYPE.RECORDING_TOGGLE: {
                                //TODO: pass call to pauseRecording/resumeRecording
                                if (payload.isRecordingPaused) {
                                    result = await connector.sdk.pauseRecording(payload.call);
                                } else {
                                    result = await connector.sdk.resumeRecording(payload.call);
                                }
                            }
                            break;
                            case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].VOICE_EVENT_TYPE.PARTICIPANT_ADDED: {
                                result = await connector.sdk.addParticipant(new scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.Contact(payload.contact), payload.call);
                            }
                            break;
                            case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED: {
                                result = await connector.sdk.swapCalls(payload.call, payload.thirdPartyCall);
                            }
                            break;
                            case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED: {
                                result = await connector.sdk.conference(payload);
                            }
                            break;
                        }
                        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishEvent)({ eventType, payload: result });
                    }
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED:
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED:
                        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishEvent)({eventType: event.data.type, payload: new scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.ACWInfo(event.data.acwInfo)});
                    break;
                    case _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].CALL_UPDATED:
                        call = new scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.PhoneCall({
                            callInfo: new scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.CallInfo(event.data.payload)
                        })
                        callResult = new scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.CallResult({call});
                        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishEvent)({
                            eventType: event.data.eventType, payload: callResult
                        });
                        break;
                    default:
                        (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishEvent)({eventType: event.data.type});
                    break;
                }
            } catch (error) {
                const eventType = event.data.eventType;
                connector.sdk.messageUser(event.fromUsername, 
                                          _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].ERROR, 
                                         {
                                            type: _common_constants__WEBPACK_IMPORTED_MODULE_0__["default"].ERROR,
                                            error: `${error.message} (Event: ${eventType || event.data.type})`
                                         })
                console.error(`Error occured when published event ${eventType} from the hardphone simulator: ${error.message}`);
                if (connector.sdk && connector.sdk.state.publishHardphoneErrors) {
                    (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_1__.publishError)({ eventType, error });
                }
            }
        }
    });
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/index.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-client/build/index.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
const url_1 = __webpack_require__(/*! ./url */ "./node_modules/socket.io-client/build/url.js");
const manager_1 = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/build/manager.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client");
/**
 * Module exports.
 */
module.exports = exports = lookup;
/**
 * Managers cache.
 */
const cache = (exports.managers = {});
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0, url_1.url)(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new manager_1.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new manager_1.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
exports.io = lookup;
/**
 * Protocol version.
 *
 * @public
 */
var socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
Object.defineProperty(exports, "protocol", ({ enumerable: true, get: function () { return socket_io_parser_1.protocol; } }));
/**
 * `connect`.
 *
 * @param {String} uri
 * @public
 */
exports.connect = lookup;
/**
 * Expose constructors for standalone build.
 *
 * @public
 */
var manager_2 = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/build/manager.js");
Object.defineProperty(exports, "Manager", ({ enumerable: true, get: function () { return manager_2.Manager; } }));
var socket_1 = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/build/socket.js");
Object.defineProperty(exports, "Socket", ({ enumerable: true, get: function () { return socket_1.Socket; } }));
exports["default"] = lookup;


/***/ }),

/***/ "./node_modules/socket.io-client/build/manager.js":
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/manager.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Manager = void 0;
const eio = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/lib/index.js");
const util_1 = __webpack_require__(/*! engine.io-client/lib/util */ "./node_modules/engine.io-client/lib/util.js");
const socket_1 = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/build/socket.js");
const parser = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
const on_1 = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/build/on.js");
const Backoff = __webpack_require__(/*! backo2 */ "./node_modules/backo2/index.js");
const typed_events_1 = __webpack_require__(/*! ./typed-events */ "./node_modules/socket.io-client/build/typed-events.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:manager");
class Manager extends typed_events_1.StrictEventEmitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0, util_1.installTimerFunctions)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
            return this;
        debug("opening %s", this.uri);
        this.engine = eio(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0, on_1.on)(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = (0, on_1.on)(socket, "error", (err) => {
            debug("error");
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = this.setTimeoutFn(() => {
                debug("connect attempt timed out after %d", timeout);
                openSubDestroy();
                socket.close();
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        debug("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0, on_1.on)(socket, "ping", this.onping.bind(this)), (0, on_1.on)(socket, "data", this.ondata.bind(this)), (0, on_1.on)(socket, "error", this.onerror.bind(this)), (0, on_1.on)(socket, "close", this.onclose.bind(this)), (0, on_1.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        this.emitReserved("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        debug("error", err);
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new socket_1.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        if ("opening" === this._readyState) {
            // `onclose` will not fire because
            // an open event never happened
            this.cleanup();
        }
        this.backoff.reset();
        this._readyState = "closed";
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason) {
        debug("onclose");
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                debug("attempting reconnect");
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        debug("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        debug("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}
exports.Manager = Manager;


/***/ }),

/***/ "./node_modules/socket.io-client/build/on.js":
/*!***************************************************!*\
  !*** ./node_modules/socket.io-client/build/on.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.on = void 0;
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
exports.on = on;


/***/ }),

/***/ "./node_modules/socket.io-client/build/socket.js":
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/socket.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Socket = void 0;
const socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
const on_1 = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/build/on.js");
const typed_events_1 = __webpack_require__(/*! ./typed-events */ "./node_modules/socket.io-client/build/typed-events.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:socket");
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends typed_events_1.StrictEventEmitter {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.connected = false;
        this.disconnected = true;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            (0, on_1.on)(io, "open", this.onopen.bind(this)),
            (0, on_1.on)(io, "packet", this.onpacket.bind(this)),
            (0, on_1.on)(io, "error", this.onerror.bind(this)),
            (0, on_1.on)(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            debug("emitting packet with ack id %d", this.ids);
            this.acks[this.ids] = args.pop();
            packet.id = this.ids++;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
        }
        else if (this.connected) {
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
            });
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @private
     */
    onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emitReserved("disconnect", reason);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser_1.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser_1.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            debug("sending ack %j", args);
            self.packet({
                type: socket_io_parser_1.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
            debug("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        this.emitBuffered();
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => this.packet(packet));
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
}
exports.Socket = Socket;


/***/ }),

/***/ "./node_modules/socket.io-client/build/typed-events.js":
/*!*************************************************************!*\
  !*** ./node_modules/socket.io-client/build/typed-events.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrictEventEmitter = void 0;
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
/**
 * Strictly typed version of an `EventEmitter`. A `TypedEventEmitter` takes type
 * parameters for mappings of event names to event data types, and strictly
 * types method calls to the `EventEmitter` according to these event maps.
 *
 * @typeParam ListenEvents - `EventsMap` of user-defined events that can be
 * listened to with `on` or `once`
 * @typeParam EmitEvents - `EventsMap` of user-defined events that can be
 * emitted with `emit`
 * @typeParam ReservedEvents - `EventsMap` of reserved events, that can be
 * emitted by socket.io with `emitReserved`, and can be listened to with
 * `listen`.
 */
class StrictEventEmitter extends Emitter {
    /**
     * Adds the `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    on(ev, listener) {
        super.on(ev, listener);
        return this;
    }
    /**
     * Adds a one-time `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    once(ev, listener) {
        super.once(ev, listener);
        return this;
    }
    /**
     * Emits an event.
     *
     * @param ev Name of the event
     * @param args Values to send to listeners of this event
     */
    emit(ev, ...args) {
        super.emit(ev, ...args);
        return this;
    }
    /**
     * Emits a reserved event.
     *
     * This method is `protected`, so that only a class extending
     * `StrictEventEmitter` can emit its own reserved events.
     *
     * @param ev Reserved event name
     * @param args Arguments to emit along with the event
     */
    emitReserved(ev, ...args) {
        super.emit(ev, ...args);
        return this;
    }
    /**
     * Returns the listeners listening to an event.
     *
     * @param event Event name
     * @returns Array of listeners subscribed to `event`
     */
    listeners(event) {
        return super.listeners(event);
    }
}
exports.StrictEventEmitter = StrictEventEmitter;


/***/ }),

/***/ "./node_modules/socket.io-client/build/url.js":
/*!****************************************************!*\
  !*** ./node_modules/socket.io-client/build/url.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.url = void 0;
const parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:url");
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug("parse %s", uri);
        obj = parseuri(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
exports.url = url;


/***/ }),

/***/ "./node_modules/socket.io-client/wrapper.mjs":
/*!***************************************************!*\
  !*** ./node_modules/socket.io-client/wrapper.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Manager: () => (/* binding */ Manager),
/* harmony export */   Socket: () => (/* binding */ Socket),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   io: () => (/* reexport default export from named module */ _build_index_js__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _build_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build/index.js */ "./node_modules/socket.io-client/build/index.js");


const Manager = _build_index_js__WEBPACK_IMPORTED_MODULE_0__.Manager;
const Socket = _build_index_js__WEBPACK_IMPORTED_MODULE_0__.Socket;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_build_index_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scv-connector-base */ "./node_modules/scv-connector-base/dist/scv-connector-base.js");
/* harmony import */ var scv_connector_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scv_connector_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connector */ "./src/main/connector.js");
/* harmony import */ var _remote_control_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../remote-control/index */ "./src/remote-control/index.js");
/* harmony import */ var _byo_ott_app_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../byo-ott-app/index */ "./src/byo-ott-app/index.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const connector = new _connector__WEBPACK_IMPORTED_MODULE_1__.Connector();
window.addEventListener('load', () => {
    (0,scv_connector_base__WEBPACK_IMPORTED_MODULE_0__.initializeConnector)(connector);
    (0,_remote_control_index__WEBPACK_IMPORTED_MODULE_2__.initializeRemoteController)(connector);
    (0,_byo_ott_app_index__WEBPACK_IMPORTED_MODULE_3__.initializeBYOOTTAppController)(connector);
});

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map