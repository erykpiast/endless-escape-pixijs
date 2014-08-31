define([
    'libs/util'
], function(
    Util
) {
    'use strict';

    function Chances(chances, min, max) {
        if(min > max) {
            throw 'max value have to be greater or equal min value';
        }

        Util.each(chances, function(value, key) {
            Object.defineProperty(this, key, {
                configurable: false,
                enumerable: true,
                set: function(val) {
                    if(val === Infinity) {
                        val = max;
                    } else if(val === -Infinity) {
                        val = min;
                    } else {
                        val = parseInt(val, 10);

                        if(!isNaN(val)) {
                            if(val > max) {
                                val = max;
                            }

                            if(val < min) {
                                val = min;
                            }
                        } else {
                            return;
                        }
                    }

                    value = val;
                },
                get: function() {
                    return value;
                }
            });
        }, this);
    }


    Chances.prototype = Object.create(Object.prototype);

    Chances.prototype.setValues = function(iterator, context) {
        return Util.setValues(this, iterator, context);
    };


    return Chances;

});