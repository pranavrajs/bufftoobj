# buffToObj
A small library that helps to create user defined objects from a buffer. 

## Usage
```javascript
var buffToObj = require('bufftoobj');

// eg: Model = {'ip' : '192.168.0.183', 'num1' : 65536}
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
```

## Testing
`npm test` to run mocha tests using mocha runner  

## License
This project is licensed under the MIT license.