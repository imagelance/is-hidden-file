const path = require('path');
// match any path that includes hidden file/directory starting with .
// https://regex101.com/r/xxtBUN/1
const hiddenPathRegex = /\/\..+/g;

function normalizeValue(value) {
	if (value[0] === path.sep) {
		return value;
	}

	return `${ path.sep }${ value }`;
}

module.exports = function isHiddenFile(value) {
	if (typeof value !== 'string') {
		throw new Error('Supplied value must be a string.');
	}

	return normalizeValue(value).match(hiddenPathRegex) !== null;
};
