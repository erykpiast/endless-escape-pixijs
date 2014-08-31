define([
    'pixi'
], function(
    Pixi
) {

    function Segment(frame, flipHorizontally) {
        Pixi.DisplayObjectContainer.call(this);
    }

    Segment.WIDTH = 64;


    Segment.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);
    
    
    return Segment;

});