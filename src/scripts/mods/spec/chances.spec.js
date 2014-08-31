define([ 'squire', 'libs/util' ], function(Squire, Util) {

    (new Squire())
    .require([
        'mods/chances'
    ], function(
        Chances
    ) {

        describe('Chances class test', function() {

            it('should be a function', function() {
                expect(typeof Chances).toBe('function');
            });

            it('should be possible to create an instance', function() {
                expect(function() {
                    new Chances();
                }).not.toThrow();
            });

        });


        describe('Chances instance test', function() {
            var chances;


            beforeEach(function() {
                chances = new Chances();
            });

            afterEach(function() {
                chances = null;
            });


            it('should be an object with some public methods', function() {
                expect(typeof chances).toBe('object');
                expect(chances instanceof Chances).toBeTruthy();

                expect(chances.setValues).toBeDefined();
                expect(typeof chances.setValues).toBe('function');
            });

        });

        describe('Setting values test', function() {
            var chances;
            var min = 0;
            var max = 10;


            beforeEach(function() {
                chances = new Chances({
                    prop1: 1,
                    prop2: 2,
                    prop3: 3
                }, min, max);
            });

            afterEach(function() {
                chances = null;
            });


            it('should allow to set value if it is between min and max', function() {
                var val1 = Util.random(min, max);
                chances.prop1 = val1;

                expect(chances.prop1).toEqual(val1);
            });

            it('should convert value to int if its float', function() {
                chances.prop1 = 4.67565;

                expect(chances.prop1).toEqual(4);
            });

            it('should set max value if try to set greater than max', function() {
                chances.prop2 = max + Util.random(1, 10);

                expect(chances.prop2).toEqual(max);
            });

            it('should set max value if try to set Infinity', function() {
                chances.prop3 = Infinity;

                expect(chances.prop3).toEqual(max);
            });

            it('should set min value if try to set lesser than min', function() {
                chances.prop3 = min - Util.random(1, 10);

                expect(chances.prop3).toEqual(min);
            });

            it('should set min value if try to set -Infinity', function() {
                chances.prop2 = -Infinity;

                expect(chances.prop2).toEqual(min);
            });

        });


        describe('setValues method test', function() {
            var chances;
            var setter;


            beforeEach(function() {
                chances = new Chances({
                    prop1: 1,
                    prop2: 2,
                    prop3: 3
                }, 0, 10);

                setter = jasmine.createSpy('setter').and.returnValue(Util.random(0, 10));
            });

            afterEach(function() {
                chances = null;

                setter = null;
            });


            it('should call function passed to setValues one for each property', function() {
                chances.setValues(setter);

                expect(setter.calls.count()).toBe(3);
            });

            it('should call function passed to setValues method with three arguments', function() {
                chances.setValues(setter);

                expect(setter.calls.allArgs().every(function(callArgs) {
                    return (callArgs.length === 3);
                })).toBeTruthy();
            });

            it('should call function passed to setValues method with property value as a first argument', function() {
                chances.setValues(setter);

                expect(setter.calls.allArgs().every(function(callArgs, index) {
                    return (callArgs[0] === (index + 1));
                })).toBeTruthy();
            });

            it('should call function passed to setValues method with property name as a second argument', function() {
                chances.setValues(setter);

                expect(setter.calls.allArgs().every(function(callArgs, index) {
                    return (callArgs[1] === ('prop' + (index + 1)));
                })).toBeTruthy();
            });

            it('should call function passed to setValues method with itself as a third argument', function() {
                chances.setValues(setter);

                expect(setter.calls.allArgs().every(function(callArgs) {
                    return (callArgs[2] === chances);
                })).toBeTruthy();
            });

            it('should set values to values returned by function passed to setValues method', function() {
                chances.setValues(function(value, key) {
                    return (parseInt(key.slice(4)) * 2);
                });

                expect(chances.prop1).toBe(2);
                expect(chances.prop2).toBe(4);
                expect(chances.prop3).toBe(6);
            }); 

        });

    });

});