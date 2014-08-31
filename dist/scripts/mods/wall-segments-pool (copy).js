define([ './wall-segment' ], function(WallSegment) {

	function WallSegmentPool(texture, amount, flipHorizontally) {
		this._segments = [ ];

		for(var i = 0; i < amount; i++) {
			this._segments.push(new WallSegment(texture, flipHorizontally));
		}
	}


	WallSegmentPool.prototype.take = function() {
		return this._segments.shift();
	};

	WallSegmentPool.prototype.giveBack = function(segment) {
		this._segments.push(segment);
	};


    return WallSegmentPool;

});