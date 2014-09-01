define([
    'pixi',
    'underscore',

    './segment'
], function(
    Pixi,
    _,

    Segment
) {

    function WallSegment(frame, flipHorizontally, anchor) {
        Segment.call(this);

        this._sprite = Pixi.Sprite.fromFrame(frame);

        if(flipHorizontally) {
            this._sprite.scale.x = -1;
            this._sprite.anchor.x = 1;
        }

        if('undefined' !== typeof anchor) {
            this._sprite.anchor.y = anchor;
        }

        this.addChild(this._sprite);

        this.width = WallSegment.WIDTH;
        this.height = 0;
    }

    _.extend(WallSegment, Segment, {
        HEIGHTS : {
            '1': 64,
            '2': 128,
            '3': 192,
            '4': 256,
            '5': 320
        }
    });
    

    WallSegment.prototype = Object.create(Segment.prototype);
    
    WallSegment.prototype.setHeight = function(height) {
        if(WallSegment.HEIGHTS.hasOwnProperty(height)) {
            this.height = WallSegment.HEIGHTS[height];
            this._sprite.position.y = 320 - this.height;
        } else {
            throw new Error('no value for height ' + height);
        }
    };


    return WallSegment;

});