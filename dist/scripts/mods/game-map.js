define([
	'pixi'
], function GameMapModule(
	Pixi
) {
	
	function GameMap(config) {
		Pixi.DisplayObjectContainer.call(this);

		this._change = config.change;

		this._currentPoint = 0;
	}


	GameMap.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

	GameMap.prototype.moveTo = function(point) {
		var distance = point - this._currentPoint;

		this._currentPoint = point;
	};


	return GameMap;

});