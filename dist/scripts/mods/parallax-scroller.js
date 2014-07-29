define([
	'pixi',
	'libs/util',
	'./simple-parallax-layer'
], function ParallaxScrollerModule(
	Pixi,
	Util,
	SimpleParallaxLayer
) {
	
	function ParallaxScroller(config) {
		Pixi.DisplayObjectContainer.call(this);

		this._layers = Util.mapObject(config.layers, function(layer) {
			if(!(layer instanceof SimpleParallaxLayer) && layer.texture) {
				layer = new SimpleParallaxLayer({
					texture: config.texturesDir.replace(/\/$/, '') + '/' + layer.texture,
					axis: config.axis,
					change: layer.change,
					width: layer.width,
					height: layer.height,
					left: layer.left,
					top: layer.top
				});
			}

			this.addChild(layer);

			return layer;
		}, this);

		this._currentPosition = 0;

		this.setSpeed(config.speed);
	}


	ParallaxScroller.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

	ParallaxScroller.prototype.update = function(timeDiff) {
		var delta = this._speed * (timeDiff / 1000);

		// console.log(delta);

		this._moveTo(this._currentPosition -= delta);
	};

	ParallaxScroller.prototype.setSpeed = function(speed) {
		this._speed = speed;
	};

	ParallaxScroller.prototype._moveTo = function(point) {
		Util.each(this._layers, function(layer) {
			layer.moveTo(point);
		}, this);
	};


	return ParallaxScroller;

});