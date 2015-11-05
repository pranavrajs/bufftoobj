var expect = require("chai").expect;
var bufferToJSON = require('../lib');
describe("Buffer To JSON Converter", function () {
  // Test Ip Extraction
  describe("IP Extraction", function () {
    it("converts buffer to ip", function () {
      var testObj = bufferToJSON(new Buffer([192, 168, 0, 183]), 0, [{
        length: 4,
        attr: 'ip',
        type: 'ipv4'
      }]);
      expect(testObj.ip).to.equal('192.168.0.183');
    });
  });
  // Test ULONG Integer Extraction
  describe("Read uInt32", function () {
    it("converts buffer to integer", function () {
      var testObj = bufferToJSON(new Buffer([255, 255, 255, 255]), 0, [{
        length: 4,
        attr: 'value',
        type: 'uInt32'
      }]);

      expect(testObj.value).to.equal(4294967295);
    });

    it("converts buffer to integer arr", function () {
      var testObj = bufferToJSON(new Buffer([255, 255, 0, 0, 1, 0, 0, 0]), 0, [{
        length: 8,
        attr: 'value',
        type: 'uInt32'
      }]);
      expect(testObj.value[0]).to.equal(65535);
      expect(testObj.value[1]).to.equal(1);
    });
  });
  // Test USHORT Integer Extraction
});
