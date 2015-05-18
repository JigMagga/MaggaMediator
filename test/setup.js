// Export modules to global scope as necessary (only for testing)
if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
  // We are in node. Require modules.
  isBrowser = false;
} else {
  // We are in the browser. Set up variables like above using served js files.
  // num and sinon already exported globally in the browser.
  isBrowser = true;
}

sinon = require('sinon');
chai = require('chai');
// expert some variables not to require them in all tests
assert = chai.assert;
expect = chai.expect;
should = chai.should();

