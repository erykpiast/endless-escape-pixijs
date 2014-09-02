define([
	'pixi',
	'Thenable',
	'./logger',
	'./parallax-scroller',
	'./game-map'
], function GameModule(
	Pixi,
	Thenable,
	logger,
	ParallaxScroller,
	GameMap
) {
	
	function Game(container) {
		this._container = container;

		this._tileSize = 32;

		this._speed = this._tileSize * 2;  // px/s
		// this._speed = 0;

		this._texturesDir = '/dist/resources/textures';

		this._stageSize = {
			width: this._tileSize * 16,
			height: this._tileSize * 12
		};

		this._stage = new Pixi.Stage(0x00CC00);
		this._renderer = new Pixi.CanvasRenderer(this._stageSize.width, this._stageSize.height);

		this._container.appendChild(this._renderer.view);

		this._init = this._loadTextures(this._texturesDir).then(function texturesLoadHandler() {
			this._scroller = new ParallaxScroller({
				direction: 'toLeft',
				texturesDir: this._texturesDir,
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
						change: 1,
						sceneWidth: this._stageSize.width
					})
				}
			});

			this._stage.addChild(this._scroller);
		}.bind(this)).then(function() {
			console.log('game successfully initialized!');
		}, logger);
	}


	Game.prototype = {
		start: function() {
			var self = this;

			self._init.then(function() {
				(function drawFrame(currentFrameTime) {
					self._drawFrame(self._lastFrameTime, currentFrameTime);

					self._lastFrameTime = currentFrameTime;

					window.requestAnimationFrame(drawFrame);
				})(self._lastFrameTime = window.performance.now());

				setInterval(function increaseSpeed() {
					self._scroller.setSpeed(self._speed *= 1.001);
				}, 1000/30);
			});
		},
		_drawFrame: function(lastTime, currentTime) {
			this._scroller.update(currentTime - lastTime);

			this._renderer.render(this._stage);
		},
		_loadTextures: function(texturesDir) {
			return new Thenable(function(fullfil, reject) {
				var assetsToLoad = [
					texturesDir + '/wall.json',
					texturesDir + '/bg-mid.png',
					texturesDir + '/bg-far.png'
				];

				var loader = new Pixi.AssetLoader(assetsToLoad);
				loader.onComplete = fullfil;
				loader.onError = reject;
				loader.load();
			});
		}
	};


	return Game;

});