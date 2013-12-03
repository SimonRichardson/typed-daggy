var daggy = require('./../typed-daggy');

exports.daggy = {

    // Manual tests
    'when testing typed tagged should return correct value': function(test) {
        var T = daggy.tagged({
            name:'x',
            type: Number
        });
        test.equal(T(1).x, 1);
        test.done();
    },
    'when testing typed tagged with incorrect value should throw error': function(test) {
        var T = daggy.tagged({
                name: 'x',
                type: String
            }),
            msg = '';

        try {
            T(1);
        } catch(e) {
            msg = e.message;
        }
        test.equal(msg, 'Expected string, but got number');
        test.done();
    },
    'when testing typed tagged sum should return correct value': function(test) {
        var T = daggy.taggedSum({
            Some: [{
                name: 'x',
                type: Number
            }],
            None: []
        });
        test.equal(T.Some(1).x, 1);
        test.done();
    },
    'when testing typed tagged sum with incorrect value should throw error': function(test) {
        var T = daggy.taggedSum({
                Some: [{
                    name: 'x',
                    type: String
                }],
                None: []
            }),
            msg = '';

        try {
            T.Some(1);
        } catch(e) {
            msg = e.message;
        }
        test.equal(msg, 'Expected string, but got number');
        test.done();
    }
};
