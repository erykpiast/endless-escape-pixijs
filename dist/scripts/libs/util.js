define([ 'underscore' ], function UtilModule(_) {

	var Util = Object.create(_);

	Util.mapObject = function(list, iterator, context) {
		this.each(list, function(value, key) {
			list[key] = iterator.call(context || null, value, key, list);
		});

		return list;
	};



	return Util;

});