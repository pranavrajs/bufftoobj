'use strict';
var ip = require('ip');
var StringDecoder = require('string_decoder').StringDecoder;
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
  modelArray.forEach(function(element) {
    var arr = [];
    var iterationCount;
    var i;

    switch (element.type) {
      case 'ipv4':
        _obj[element.attrName] = ip.toString(buffer, _offset, 4);
        break;
      case 'uInt32':
        iterationCount = element.length / 4;
        if (iterationCount === 1) {
          _obj[element.attrName] = buffer.readUInt32LE(_offset);
        } else {
          for (i = 0; i < iterationCount; i += 1) {
            arr.push(buffer.readUInt32LE(_offset + i * 4));
          }
          _obj[element.attrName] = arr;
        }
        break;
      case 'uInt16':
        iterationCount = element.length / 2;
        if (iterationCount === 1) {
          _obj[element.attrName] = buffer.readUInt16LE(_offset);
        } else {
          for (i = 0; i < iterationCount; i += 1) {
            arr.push(buffer.readUInt16LE(_offset + i * 2));
          }
          _obj[element.attrName] = arr;
        }
        break;
      case 'Int16':
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
        break;

      case 'char':
        if (element.length === 1) {
          _obj[element.attrName] = buffer[_offset];
        } else {
          for (i = 0; i < element.length; i += 1) {
            arr.push(buffer[_offset + i]);
          }
          _obj[element.attrName] = arr;
        }
        break;

      case 'string':
        // var encType = element.encType || 'utf8';
        // var decoder = new StringDecoder(encType);
        _obj[element.attrName] = buffer.toString(element.encType, _offset, _offset + element.length);
        break;
    }
    _offset += element.length;
  });

  return _obj;
}
module.exports = buffToObj;
