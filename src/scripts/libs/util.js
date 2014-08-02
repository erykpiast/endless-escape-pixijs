define([ 'underscore' ], function UtilModule(_) {

	var Util = Object.create(_);

	Util.mapValues = function(list, iterator, context) {
		var res = { };

		this.each(list, function(value, key) {
			res[key] = iterator.call(context || null, value, key, list);
		});

		return res;
	};


    Util.sum = function(list) {
        return this.reduce(list, function (prev, cur) {
            return prev + cur;
        });
    };


	return Util;

});