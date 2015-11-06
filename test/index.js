var expect = require("chai").expect;
var bufferToJSON = require('../lib');
describe("Buffer To JSON Converter", function () {
  // Test Ip Extraction
  describe("IP Extraction", function () {
    it("converts buffer to ip", function () {
      var testObj = bufferToJSON(new Buffer([192, 168, 0, 183]), 0, [{
        length: 4,
        attrName: 'ip',
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
        attrName: 'value',
        type: 'uInt32'
      }]);

      expect(testObj.value).to.equal(4294967295);
    });

    it("converts buffer to integer arr", function () {
      var testObj = bufferToJSON(new Buffer([255, 255, 0, 0, 1, 0, 0, 0]), 0, [{
        length: 8,
        attrName: 'value',
        type: 'uInt32'
      }]);
      expect(testObj.value[0]).to.equal(65535);
      expect(testObj.value[1]).to.equal(1);
    });
  });
  describe("Read String", function () {
    it('coverts buffer to ascii String', function () {
      var testObj = bufferToJSON(new Buffer([72,101,108,108,111,32,87,111,114,108,100]), 0, [{
        length: 8,
        attrName: 'value',
        type: 'string',
        encType: 'ascii'
      }]);
      expect(testObj.value).to.equal('Hello Wo');
    });
    it('coverts buffer to utf-8 String', function () {
      var testObj = bufferToJSON(new Buffer([72,101,108,108,111,32,87,111,114,108,100]), 0, [{
        length: 8,
        attrName: 'value',
        type: 'string',
        encType: 'utf8'
      }]);
      expect(testObj.value).to.equal('Hello Wo');
    });
  });
  // Test USHORT Integer Extraction
});
