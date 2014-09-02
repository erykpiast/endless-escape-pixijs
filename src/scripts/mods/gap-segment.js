define([
    'pixi',
    'underscore',

    './segment'
], function(
    Pixi,
    _,

    Segment
) {

    function GapSegment(frame, flipHorizontally) {
        Segment.call(this);

        // this._fill = new PIXI.Graphics();
        // this._fill.beginFill(0xFFFF00);
        // this._fill.lineStyle(0, 0xFF0000);
        // this._fill.drawRect(0, 0, Segment.WIDTH, Segment.WIDTH);

        // this.addChild(this._fill);
    }

    _.extend(GapSegment, Segment, { });
    
    GapSegment.prototype = Object.create(Segment.prototype);


    return GapSegment;

});