const path = require('path');
const os = require('os');

// match any path that includes hidden file/directory starting with .
// https://regex101.com/r/xxtBUN/1
const unixHiddenPathRegex = /\/\..+/g;
// https://regex101.com/r/zhOcF2/1
const windowsHiddenPathRegex = /\\\..+/g;

const isWindows = function detectingIfPlatformIsWindows() {
	return os.platform() === 'win32';
}

const isHiddenFile = function detectingIfPathIsHiddenFile(value) {
	if (typeof value !== 'string') {
		throw new Error('Supplied value must be a string.');
	}

	const pattern = isWindows() ? windowsHiddenPathRegex : unixHiddenPathRegex;
	const normalizedValue = path.join(value);

	return normalizedValue.match(pattern) !== null;
};

module.exports = isHiddenFile;
