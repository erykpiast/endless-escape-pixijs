define([
	'pixi',
	'./parallax-scroller',
	'./game-map'
], function GameModule(
	Pixi,
	ParallaxScroller,
	GameMap
) {
	
	function Game(container) {
		this._container = container;

		this._tileSize = 32;

		this._speed = this._tileSize * 2;  // px/s

		this._stage = new Pixi.Stage(0x00CC00);
		this._renderer = new Pixi.autoDetectRenderer(this._tileSize * 16, this._tileSize * 12);

		this._container.appendChild(this._renderer.view);

		this._scroller = new ParallaxScroller({
			direction: 'toLeft',
			texturesDir: '../dist/resources/textures',
			axis: 'x',
			speed: this._speed,
			layers: {
				'far': {
					zIndex: 0,
					change: 0.1,
					texture: 'bg-far.png',
					width: this._tileSize * 16,
					height: this._tileSize * 8,
					top: 0
				},
				'mid': {
					zIndex: 1,
					change: 0.5,
					texture: 'bg-mid.png',
					width: this._tileSize * 16,
					height: this._tileSize * 8,
					top: this._tileSize * 4
				},
				'front': new GameMap({
					change: 1
				})
			}
		});

		this._stage.addChild(this._scroller);
	}


	Game.prototype = {
		start: function() {
			var that = this;

			(function drawFrame(currentFrameTime) {
				that._drawFrame(that._lastFrameTime, currentFrameTime);

				that._lastFrameTime = currentFrameTime;

				window.requestAnimationFrame(drawFrame);
			}).call(that, this._lastFrameTime = window.performance.now());

			setInterval(function() {
				that._scroller.setSpeed(that._speed *= 1.001);
			}, 1000/30);
		},
		_drawFrame: function(lastTime, currentTime) {
			this._scroller.update(currentTime - lastTime);

			this._renderer.render(this._stage);
		}
	};


	return Game;

});