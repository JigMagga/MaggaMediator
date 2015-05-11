
// Export modules to global scope as necessary (only for testing)
if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
    // We are in node. Require modules.
    chai = require('chai');
    isBrowser = false;
} else {
    // We are in the browser. Set up variables like above using served js files.

    // num and sinon already exported globally in the browser.
    isBrowser = true;
}

assert = chai.assert;
expect = chai.expect;
should = chai.should();