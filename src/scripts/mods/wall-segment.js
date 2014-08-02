define([ 'pixi' ], function(Pixi) {

    function WallSegment(frame, flipHorizontally) {
        Pixi.DisplayObjectContainer.call(this);

        this._sprite = Pixi.Sprite.fromFrame(frame);

        if(flipHorizontally) {
            this._sprite.scale.x = -1;
        }

        this.addChild(this._sprite);

        this._height = 0;
    }

    WallSegment.HEIGHTS = {
        '1': 64,
        '2': 96,
        '3': 128,
        '4': 160,
        '5': 192
    };

    WallSegment.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

    WallSegment.prototype.width = 64;
    
    WallSegment.prototype.setHeight = function(height) {
        this._height = height;
        this._sprite.y = this._sprite.parent.height - this._height;
    };


    return WallSegment;

});