var daggy = require('./../typed-daggy');

exports.daggy = {

    // Manual tests
    'when testing typed tagged should return correct value': function(test) {
        var T = daggy.tagged(Number)('x');
        test.equal(T(1).x, 1);
        test.done();
    },
    'when testing typed tagged with incorrect value should throw error': function(test) {
        var T = daggy.tagged(String)('x'),
            msg = '';

        try {
            T(1);
        } catch(e) {
            msg = e.message;
        }
        test.equal(msg, 'Expected string, but got number');
        test.done();
    }
};
