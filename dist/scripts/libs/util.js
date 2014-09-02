define([ 'underscore' ], function UtilModule(_) {

	var Util = Object.create(_);

	Util.mapValues = function(list, iterator, context) {
		var res = { };

		this.each(list, function(value, key) {
			res[key] = iterator.call(context || null, value, key, list);
		}, this);

		return res;
	};


	Util.setValues = function(list, iterator, context) {
		this.each(list, function(value, key, list) {
			list[key] = iterator.call(context || null, value, key, list);
		}, this);
	};


    Util.sum = function(list) {
        return this.reduce(list, function (prev, cur) {
            return prev + cur;
        });
    };

    Util.draw = function(list) {
        if(this.some(list, function(value) {
            return (value < 0);
        })) {
            throw new Error('weights have to be greater or equal 0');
        }

        var totalWeight = Util.sum(list);

        if(totalWeight <= 0) {
            throw new Error('weights sum have to be greater than 0');
        }

        var randomNum = this.random(0, totalWeight);
        var weightSum = 0;
        var drawn;

        var sorted = [ ];
        this.forEach(list, function(weight, el) {
            if(weight !== 0) {
                sorted.push({ weight: weight, el: el });
            }
        });

        this.sortBy(sorted, 'weight').every(function(obj) {
            weightSum += obj.weight;
             
            if (randomNum <= weightSum) {
                drawn = obj.el;

                return false;
            } else {
                return true;
            }
        });

        return drawn;
    };


	return Util;

});