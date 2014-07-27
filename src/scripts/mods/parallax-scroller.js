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
					change: layer.change,
					width: config.width,
					height: config.height
				});
			}

			this.addChild(layer);
		}, this);
	}


	ParallaxScroller.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

	ParallaxScroller.prototype.moveTo = function(point) {
		Util.each(this._layers, function(layer) {
			layer.moveTo(point);
		}, this);
	};


	return ParallaxScroller;

});