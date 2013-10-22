/*global chai, describe, it */

var expect = chai.expect;

describe("any", function () {
  it("should pass tests", function () {
    expect(true).to.be.truthy;
    expect(require("ag").version).to.be.truthy;
  });
});