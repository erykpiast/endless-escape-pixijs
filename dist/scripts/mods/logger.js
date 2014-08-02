define([ ], function loggerModule() {
	
	var errors = [ ];


	return function(err) {
		errors.push(err);

		setTimeout(function() {
			throw err;
		}, 0);
	};

});