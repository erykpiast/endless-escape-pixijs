define([ 'squire' ], function(Squire) {

    (new Squire())
    .require([
        'libs/util'
    ], function(
        Util
    ) {

        describe('Util draw function test', function() {
        
            it('should not draw value with weight equal 0', function() {
                var list = {
                    'value1': 0,
                    'value2': 0.1,
                    'value3': 0
                };

                for(var i = 0; i < 10; i++) {
                    var n = Util.draw(list);

                    expect(n).not.toBe('value1');
                    expect(n).not.toBe('value3');
                }
            });


            it('should not draw value with weight equal 0 when edge numbers was drawn', function() {
                var list = {
                    'value1': 0,
                    'value2': 0.1,
                    'value3': 0
                };

                var i, n;
                var utilRandom = Util.random;
                Util.random = function() {
                    return arguments[0];
                };

                for(i = 0; i < 10; i++) {
                    n = Util.draw(list);

                    expect(n).toBe('value2');
                }


                Util.random = function() {
                    return arguments[1];
                };

                for(i = 0; i < 10; i++) {
                    n = Util.draw(list);

                    expect(n).toBe('value2');
                }


                Util.random = utilRandom;
            });

            it('should throw if any weight is less than 0', function() {
                expect(function() {
                    Util.draw({
                        'value1': -1,
                        'value2': 0,
                        'value3': 1
                    });
                }).toThrow();

                expect(function() {
                    Util.draw({
                        'value1': 1,
                        'value2': 0,
                        'value3': -Infinity
                    });
                }).toThrow();  

                expect(function() {
                    Util.draw({
                        'value1': 1,
                        'value2': -0.000000000001,
                        'value3': 0.000000000001
                    });
                }).toThrow();
            });

            it('should throw if weights sum is equal or less than 0', function() {
                expect(function() {
                    Util.draw({
                        'value1': 0,
                        'value2': 0,
                        'value3': 0
                    });
                }).toThrow();
            });
        });

    });
});