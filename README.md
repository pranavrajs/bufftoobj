# buffToObj
A small library that helps to create user defined objects from a buffer. 

## Usage
```javascript
var buffToObj = require('bufftoobj');

// eg: model = {'ip' => ipv4, num1 => ulong}
var modelArray = [{
	"attrName" : 'ipAddr',
	"type": 'ipv4',
	"length" : 4
}, {
	"attrName" : 'num1',
	"type" : 'uInt32',
	"length" : 4
}];

var object = buffToObj(new Buffer([192, 168, 0, 183,255, 255, 0, 0]), 0, modelArray);
console.log(object); // {'ip' : '192.168.0.183', 'num1' : 65536}
```

## Supported types
`ipv4`, 
`uInt32`, 
`uInt16`,
`Int16`,
`char`
`String` - to be done


## Testing
`npm test` to run mocha tests using mocha runner  

## License
This project is licensed under the MIT license.