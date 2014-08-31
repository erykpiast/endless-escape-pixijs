define([
	'./gap-segment'
], function(
	GapSegment
) {

	function GapSegmentPool(amount) {
		this._segments = [ ];

		for(var i = 0; i < amount; i++) {
			this._segments.push(new GapSegment());
		}
	}


	GapSegmentPool.prototype.take = function() {
		return this._segments.shift();
	};

	GapSegmentPool.prototype.giveBack = function(segment) {
		this._segments.push(segment);
	};


    return GapSegmentPool;

});