define([
    'pixi',
    'libs/util',

    'mods/segment',
    'mods/wall-segments-pool',
    'mods/gap-segments-pool',
    'mods/chances'
], function GameMapModule(
    Pixi,
    Util,

    Segment,
    WallSegmentsPool,
    GapSegmentsPool,
    Chances
) {
    'use strict';
    
    function GameMap(config) {
        Pixi.DisplayObjectContainer.call(this);

        config = Util.extend({
            change: 1
        }, config);

        this._change = config.change;
        this._axis = 'x';
        this._sceneWidth = config.sceneWidth;

        this._currentPoint = 0;

        this._segmentsPools = {
            front: new WallSegmentsPool(8, {
                texture: 'edge_01'
            }),
            back: new WallSegmentsPool(8, {
                texture: 'edge_01', 
                flipHorizontally: true
            }),
            htl: new WallSegmentsPool(8, {
                texture: 'step_01',
                anchor: 0.25
            }),
            lth: new WallSegmentsPool(8, {
                texture: 'step_01',
                flipHorizontally: true
            }),
            litWindow: new WallSegmentsPool(8, {
                texture: 'window_01'
            }),
            unlitWindow: new WallSegmentsPool(8, {
                texture: 'window_02'
            }),
            decoration1: new WallSegmentsPool(8, {
                texture: 'decoration_01'
            }),
            decoration2: new WallSegmentsPool(8, {
                texture: 'decoration_02'
            }),
            gap: new GapSegmentsPool(8)
        };

        this._chances = {
            segment: new Chances({
                wall: 10,
                gap: 0  
            }, 0, 10),
            height: new Chances({
                '1': 0,
                '2': 0,
                '3': 1,
                '4': 0,
                '5': 0
            }, 0, 10),
            decoration: new Chances({
                'decoration1': 10,
                'decoration2': 10,
                'litWindow': 10,
                'unlitWindow': 10
            }, 0, 10)
        };

        this._minHeight = 1;
        this._maxHeight = 5;
        this._currentHeight = 3;

        this._lastSegmentX = -Segment.WIDTH;

        this._segments = [ ];

        for(var i = 0, maxi = Math.floor(this._sceneWidth / Segment.WIDTH) + 2; i < maxi; i++) {
            this._createSegment({
                type: 'wall',
                height: this._currentHeight
            });
        }

        this._accumulatedOffset = 0;
    }


    GameMap.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

    GameMap.prototype.moveTo = function(point) {
        var distance = point - this._currentPoint;

        this._currentPoint = point;

        var delta = (distance * this._change);

        this.position[this._axis] += delta;

        if(this._accumulatedOffset >= Segment.WIDTH) {
            var segment = this._segments.shift();
            if(segment.type === 'wall') {
                this._segmentsPools[segment.variant].giveBack(segment.element);
            } else if(segment.type === 'gap') {
                segment.element = this._segmentsPools[segment.type].giveBack(segment.element);
            }
            delete segment.element;

            this._createSegment();

            this._accumulatedOffset -= Segment.WIDTH;
        }

        this._accumulatedOffset += Math.abs(delta);
    };

    GameMap.prototype._draw = function(list) {
        var el = Util.draw(list);

        return el;
    };

    GameMap.prototype._drawHeight = function() {
        return parseInt(this._draw(this._chances.height), 10);
    };


    GameMap.prototype._countLast = function(segmentType) {
        var i = this._segments.length;
        var count = 0;

        while(i) {
            i--;

            if(this._segments[i].type !== segmentType) {
                break;
            } else {
                count++;
            }
        }

        return count;
    };

    GameMap.prototype._drawSegmentType = function() {
        return this._draw(this._chances.segment);
    };

    GameMap.prototype._drawDecoration = function() {
        var decoration = this._draw(this._chances.decoration);

        this._chances.decoration.setValues(function(value, key) {
            if(key === decoration) {
                return (value - 1);
            } else {
                return (value + 1);
            }
        });

        return decoration;
    };

    GameMap.prototype._adjustHeightChances = function(segment, prevSegment) {
        var precedingWalls = this._countLast('wall');
        var precedingGaps = this._countLast('gap');

        if(segment.type === 'wall') {
            if(precedingGaps > 0) {
            // don't allow drawing great height if a lot of gaps is before the wall
                var currentHeight = Math.max(1, this._currentHeight - precedingGaps);
                this._chances.height.setValues(function(value, key) {
                    var parsedKey = parseInt(key, 10);

                    if(parsedKey > currentHeight) {
                        return -Infinity;
                    } else {
                        // let to draw any height
                        return Math.max(1, value);
                    }
                }, this);
            }

            if(segment.height !== prevSegment.height) {
            // don't allow drawing height different than current directly after height change
                this._chances.height.setValues(function(value, key) {
                    var parsedKey = parseInt(key, 10);

                    if(parsedKey !== this._currentHeight) {
                        return -Infinity;
                    } else {
                        return Math.max(1, value);
                    }
                }, this);
            } else {
            // don't allow to draw height differ from current more than one
                this._chances.height.setValues(function(value, key) {
                    var parsedKey = parseInt(key, 10);
                    var diff = Math.abs(this._currentHeight - parsedKey);

                    var greaterMod = 0;
                    var lesserMod = 0;

                    // if drawn height is closer to max height, increase chances of lesser heights, otherwise - greater ones
                    if((this._maxHeight - this._currentHeight) > (this._currentHeight - this._minHeight)) {
                        greaterMod = +2;
                        lesserMod = -1;
                    } else {
                        greaterMod = -1;
                        lesserMod = +1;
                    }

                    if(diff > 1) {
                        return -Infinity;
                    } else if(parsedKey > this._currentHeight) {
                        return (value + greaterMod);
                    } else if(parsedKey < this._currentHeight) {
                        return (value + lesserMod);
                    } else {
                        return value;
                    }
                }, this);
            }
        } else if(segment.type === 'gap') {
            this._chances.height.setValues(function(value, key) {
                var parsedKey = parseInt(key, 10);

                if(parsedKey > this._currentHeight) {
                    return -Infinity;
                } else if(parsedKey < this._currentHeight) {
                    return (value + 1);
                } else {
                    return value;
                }
            }, this);
        }
    };

    GameMap.prototype._adjustSegmentChances = function(segment, prevSegment) {
        var precedingWalls = this._countLast('wall');
        var precedingGaps = this._countLast('gap');

        // if segment is transition between different heights, it can't be the last segment before gap
        if((segment.variant === 'lth') || (segment.variant === 'htl')) {
            this._chances.segment.gap = -Infinity;
            this._chances.segment.wall = Infinity;
        } else if(segment.variant === 'front') {
            this._chances.segment.gap = -Infinity;
            this._chances.segment.wall = Infinity;
        } else if(prevSegment.height !== segment.height) {
            this._chances.segment.gap = -Infinity;
            this._chances.segment.wall = Infinity;
        } else if(segment.type === 'wall') {
            this._chances.segment.wall = (20 - precedingWalls);

            this._chances.segment.gap = Math.round(precedingWalls / 2);
        } else if(segment.type === 'gap') {
            if((precedingGaps + 1) >= this._currentHeight) {
                this._chances.segment.gap = -Infinity;
                this._chances.segment.wall = Infinity;
            } else {
                this._chances.segment.gap++;
            }
        }

    };

    GameMap.prototype._createSegment = function(settings) {
        settings = settings || { };

        var segment = {
            type: settings.type || this._drawSegmentType(),
            height: this._currentHeight
        };
        var prevSegment = this._segments[this._segments.length - 1] || {
            height: this._currentHeight
        };

        if(segment.type === 'wall') {
            if('undefined' !== typeof settings.height) {
                segment.height = settings.height;
            } else {
                segment.height = this._drawHeight();
            }

            this._currentHeight = segment.height;
        }

        if(segment.height !== prevSegment.height) {
            if((segment.type === 'wall') && (prevSegment.type === 'wall')) {
                    // set visual style for transition
                if(segment.height > prevSegment.height) {
                    segment.variant = 'lth';
                } else if(segment.height < prevSegment.height) {
                    segment.variant = 'htl';
                }
            }
        }

        
        if((segment.type === 'wall') && (prevSegment.type === 'gap')) {
            segment.variant = 'front';
        } else if((segment.type === 'gap') && (prevSegment.type === 'wall')) {
            var prevSegmentX = prevSegment.element.position.x;
            this._segmentsPools[prevSegment.variant].giveBack(prevSegment.element);

            prevSegment.variant = 'back';

            prevSegment.element = this._segmentsPools[prevSegment.variant].take();
            prevSegment.element.setHeight(prevSegment.height);
            this.addChild(prevSegment.element);
            prevSegment.element.position.x = prevSegmentX;
        } else if((segment.type === 'wall') && !segment.variant) {
            segment.variant = this._drawDecoration();
        }

        if(segment.type === 'wall') {
            segment.element = this._segmentsPools[segment.variant].take();

            segment.element.setHeight(segment.height);
        } else if(segment.type === 'gap') {
            segment.element = this._segmentsPools[segment.type].take();
        }

        segment.element.position.x = this._lastSegmentX = Segment.WIDTH + this._lastSegmentX;
        this.addChild(segment.element);

        this._segments.push(segment);


        this._adjustHeightChances(segment, prevSegment);
        this._adjustSegmentChances(segment, prevSegment);


        return segment;
    };


    return GameMap;

});