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

		this._stage = new Pixi.Stage(0x00CC00);
		this._renderer = new Pixi.autoDetectRenderer(this._tileSize * 16, this._tileSize * 12);

		this._container.appendChild(this._renderer.view);

		this._scroller = new ParallaxScroller({
			direction: 'toLeft',
			texturesDir: '../dist/resources/textures',
			layers: {
				'far': {
					zIndex: 0,
					change: 0.1,
					texture: 'bg-far.png'
				},
				'mid': {
					zIndex: 1,
					change: 0.2,
					texture: 'bg-far.png'
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

			(function drawFrame() {
				that._drawFrame();

				window.requestAnimationFrame(drawFrame);
			}).call(that);
		},
		_drawFrame: function() {
			this._renderer.render(this._stage);
		}
	};


	return Game;

});