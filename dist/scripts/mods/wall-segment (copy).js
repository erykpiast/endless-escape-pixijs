define([
    'pixi',

    './segment'
], function(
    Pixi,

    Segment
) {

    function GapSegment(frame, flipHorizontally) {
        Segment.call(this);
    }
    
    GapSegment.prototype = Object.create(Segment.prototype);


    return GapSegment;

});