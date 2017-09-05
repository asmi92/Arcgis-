<<<<<<< HEAD
/**
 * String.prototype.trim Polyfill
 */

String.prototype.trim = (function() {

	var trimRegex = /(^\s+|\s+$)/g;

	return function() {
		return this.replace(trimRegex, '');
	};

}());

/* End of file trim.js */
=======
/**
 * String.prototype.trim Polyfill
 */

String.prototype.trim = (function() {

	var trimRegex = /(^\s+|\s+$)/g;

	return function() {
		return this.replace(trimRegex, '');
	};

}());

/* End of file trim.js */
>>>>>>> 2014f2a2f2a93a3c26c491b423f9b078d38216b1
