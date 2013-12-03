# Typed daggy

Library for creating typed tagged constructors.

## Tagged

`daggy.tagged(types)(arguments)`

Creates a new constructor with the given field names as arguments
and properties. Allows instanceof checks with returned constructor.

## Tagged Sum

```javascript
daggy.taggedSum({
    Some: [{
        name: 'x',
        type: Number
    }],
    None: []
})
```

Creates a constructor for each key in `constructors`. Returns a
function with each constructor as a property. Allows
`instanceof` checks for each constructor and the returned
function.

```javascript
var Tuple3 = daggy.tagged({
        name: 'x',
        type: Number
    }, {
        name: 'y',
        type: String
    }, {
        name: 'z',
        type: Number
    });

var _123 = Tuple3(1, 'a', 3); // optional new keyword
_123.x == 1 && _123.y == 'a' && _123.z == 3; // true
_123 instanceof Tuple3; // true
```