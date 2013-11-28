# Typed daggy

Library for creating typed tagged constructors.

## Tagged

`daggy.tagged(types)(arguments)`

Creates a new constructor with the given field names as arguments and properties. Allows instanceof checks with returned constructor.

```javascript
var Tuple3 = daggy.tagged(Number, String, Number)('x', 'y', 'z');

var _123 = Tuple3(1, 'a', 3); // optional new keyword
_123.x == 1 && _123.y == 'a' && _123.z == 3; // true
_123 instanceof Tuple3; // true
```