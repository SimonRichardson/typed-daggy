var daggy = require('daggy'),
    helpers = require('fantasy-helpers'),

    isTypeOf = helpers.isTypeOf,
    isInstanceOf = helpers.isInstanceOf;

function base(x) {
    return x === Number ? 'number' :
            x === String ? 'string' :
            x === Boolean ? 'boolean' :
            x === Function ? 'function' :
            x === Object ? 'object' :
                '';
}

function tagged() {
    var x = [].slice.call(arguments);
    return function() {
        var y = [].slice.call(arguments),
            type = daggy.tagged.apply(this, y);
        return function() {
            var z = [].slice.call(arguments),
                b, i;
            
            for (i = 0; i < x.length; i++) {
                b = base(x[i]);
                if (!isTypeOf(b)(z[i]) && !isInstanceOf(x[i])(z[i])) {
                    throw new TypeError('Expected ' + (b || x[i]) + ', but got ' + (typeof z[i]));
                }
            }

            return type.apply(this, z);
        };
    };
}

// Export
if(typeof module != 'undefined')
    module.exports = {
        tagged: tagged
    };