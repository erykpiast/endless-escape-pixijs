define([
	'pixi'
], function SimpleParallaxLayerModule(
	Pixi
) {
	
	function SimpleParallaxLayer(config) {
		Pixi.DisplayObjectContainer.call(this);

		this._sprite = new Pixi.TilingSprite(
			new Pixi.Texture.fromImage(config.texture),
			config.width,
			config.height
		);
		this.addChild(this._sprite);

		this._change = config.change;

		this._sprite.position.x = 0;
		this._sprite.position.y = 0;
		this._sprite.tilePosition.x = 0;
		this._sprite.tilePosition.y = 0;

		this._currentPoint = 0;
	}


	SimpleParallaxLayer.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

	SimpleParallaxLayer.prototype.moveTo = function(point) {
		var distance = point - this._currentPoint;

		this._currentPoint = point;

		this._sprite.tilePosition[this._axis] += (distance * this._chage);
	};


	return SimpleParallaxLayer;

});