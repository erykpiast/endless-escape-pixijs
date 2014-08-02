define([ '../lib/util' ], function(Util) {
    
    function draw(list) {
        var totalWeight = Util.sum(list);
        var randomNum = Util.random(0, totalWeight);
        var weightSum = 0;
        
        return Util.find(function(weight, el) {
            weightSum += weight;
             
            if (randomNum <= weightSum) {
                return el;
            } else {
                return false;
            }
        });
    }


    return {
        draw: draw
    };

});