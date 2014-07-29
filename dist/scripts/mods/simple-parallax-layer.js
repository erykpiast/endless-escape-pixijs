define([
	'pixi'
], function SimpleParallaxLayerModule(
	Pixi
) {
	
	function SimpleParallaxLayer(config) {
		Pixi.DisplayObjectContainer.call(this);

		this._sprite = new Pixi.TilingSprite(
			Pixi.Texture.fromImage(config.texture),
			config.width,
			config.height
		);

		this._sprite.position.x = config.left || 0;
		this._sprite.position.y = config.top || 0;
		this._sprite.tilePosition.x = 0;
		this._sprite.tilePosition.y = 0;

		this.addChild(this._sprite);

		this._currentPoint = 0;
		this._change = config.change;
		this._axis = config.axis;
	}


	SimpleParallaxLayer.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

	SimpleParallaxLayer.prototype.moveTo = function(point) {
		var distance = point - this._currentPoint;

		this._currentPoint = point;

		var delta = (distance * this._change);

		this._sprite.tilePosition[this._axis] += delta;
	};


	return SimpleParallaxLayer;

});