var daggy = require('daggy'),
    helpers = require('fantasy-helpers'),

    create = helpers.create,
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
    var x = [].slice.call(arguments),
        names = x.map(prop('name')),
        types = x.map(prop('type')),

        type = daggy.tagged.apply(this, names);
    
    function prop(name) {
        return function(a) {
            return a[name];
        };
    }

    return function() {
        var z = [].slice.call(arguments),
            b, i;
        
        for (i = 0; i < types.length; i++) {
            b = base(types[i]);
            if (!isTypeOf(b)(z[i]) && !isInstanceOf(types[i])(z[i])) {
                throw new TypeError('Expected ' + (b || types[i]) + ', but got ' + (typeof z[i]));
            }
        }

        return type.apply(this, z);
    };
}

function taggedSum(constructors) {
    var names = [],
        types = [],
        key;

    function definitions() {
        throw new TypeError('Tagged sum was called instead of one of its properties.');
    }

    function makeCata(key) {
        return function(dispatches) {
            var fields = constructors[key],
                args = [],
                i;

            if(!dispatches[key])
                throw new TypeError("Constructors given to cata didn't include: " + key);

            for(i = 0; i < fields.length; i++)
                args.push(this[fields[i]]);

            return dispatches[key].apply(this, args);
        };
    }

    function makeProto(key) {
        var proto = create(definitions.prototype);
        proto.cata = makeCata(key);
        return proto;
    }

    for(key in constructors) {
        if(!constructors[key].length) {
            definitions[key] = makeProto(key);
            continue;
        }
        
        definitions[key] = tagged.apply(null, constructors[key]);
        definitions[key].prototype = makeProto(key);
    }

    return definitions;
}

taggedSum({
    Some: [{
        name:'x',
        type: Number
    }],
    None: []
});

// Export
if(typeof module != 'undefined')
    module.exports = {
        tagged: tagged,
        taggedSum: taggedSum
    };