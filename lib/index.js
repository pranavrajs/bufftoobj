'use strict';
var ip = require('ip');
/**
 * [buffToObj converts buffer to an object loaded from json file]
 * @param  {[buffer]} buffer     [buffer]
 * @param  {[int]} offset     [offest to avoid headers]
 * @param  {[JSON array]} modelArray [array which describes the object]
 * @return {[object]}            [the object with attributes defined as in json file]
 */
function buffToObj(buffer, offset, modelArray) {
  var _offset = offset;
  var nestedModel;
  var _obj = {};
  // Iterate over all the attributes.
  modelArray.forEach(function (element) {
    var arr = [],
      iterationCount,
      i;
    if (element.type === 'ipv4') {
      _obj[element.attrName] = ip.toString(buffer, _offset, 4);
    } else if (element.type === 'uInt32') {
      iterationCount = element.length / 4;
      if (iterationCount === 1) {
        _obj[element.attrName] = buffer.readUInt32LE(_offset);
      } else {
        for (i = 0; i < iterationCount; i += 1) {
          arr.push(buffer.readUInt32LE(_offset + i * 4));
        }
        _obj[element.attrName] = arr;
      }

    } else if (element.type === 'uInt16') {
      iterationCount = element.length / 2;
      if (iterationCount === 1) {
        _obj[element.attrName] = buffer.readUInt16LE(_offset);
      } else {
        for (i = 0; i < iterationCount; i += 1) {
          arr.push(buffer.readUInt16LE(_offset + i * 2));
        }
        _obj[element.attrName] = arr;
      }

    } else if (element.type === 'Int16') {
      iterationCount = element.length / 2;
      if (iterationCount === 1) {
        _obj[element.attrName] = buffer.readInt16LE(_offset);
      } else {
        // Iterate over count
        for (i = 0; i < iterationCount; i += 1) {
          arr.push(buffer.readInt16LE(_offset + i * 2));
        }
        _obj[element.attrName] = arr;
      }
    } else if (element.type === "char") {
      if (element.length === 1) {
        _obj[element.attrName] = buffer[_offset];
      } else {
        for (i = 0; i < element.length; i += 1) {
          arr.push(buffer[_offset + i]);
        }
        _obj[element.attrName] = arr;
      }
    } else {

    }
    _offset += element.length;

  });

  return _obj;
}
module.exports = buffToObj;
