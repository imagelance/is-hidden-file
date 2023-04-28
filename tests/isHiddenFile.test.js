const isHiddenFile = require('../src/index');
const mockOs = require('mock-os');

test('it should be a hidden file', () => {
	expect(isHiddenFile('/.DS_Store')).toBe(true);
});

test('it should not be a hidden file', () => {
	expect(isHiddenFile('/this-is-a-valid-file.js')).toBe(false);
});

test('it should normalize file path and not be a hidden file', () => {
	expect(isHiddenFile('cic/mic/zic.js')).toBe(false);
});

test('it should properly detect hidden file on windows', () => {
	mockOs({ 'platform': 'win32' });

	expect(isHiddenFile('C:\\Users\\Admin\\Projects\\test\\.git')).toBe(true);

	mockOs.restore();
});

test('it should not detect unix paths as hidden paths on windows', () => {
	mockOs({ 'platform': 'win32' });

	expect(isHiddenFile('/Users/Admin/Projects/test/.DS_Store')).toBe(false);

	mockOs.restore();
})

test('it should throw an error, if supplied argument is not a string', () => {
	expect(() => isHiddenFile({})).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isHiddenFile(undefined)).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isHiddenFile(NaN)).toThrowError(new Error('Supplied value must be a string.'));

	expect(() => isHiddenFile(300)).toThrowError(new Error('Supplied value must be a string.'));
});
