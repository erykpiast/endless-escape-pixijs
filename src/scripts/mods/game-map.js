define([
    'pixi',
    'libs/util',
    './wall-segments-pool'
], function GameMapModule(
    Pixi,
    Util,
    WallSegmentsPool
) {
    
    function GameMap(config) {
        Pixi.DisplayObjectContainer.call(this);

        this._change = config.change;
        this._axis = 'x';

        this._currentPoint = 0;

        this._frontSegmentsPool = new WallSegmentsPool('edge_01', 4);
        this._backSegmentsPool = new WallSegmentsPool('edge_01', 4, 'flipHorizontally');

        this._stepsHtLSegmentsPool = new WallSegmentsPool('step_01', 4);
        this._stepsLtHSegmentsPool = new WallSegmentsPool('step_01', 4, 'flipHorizontally');

        this._litWindowSegmentsPool = new WallSegmentsPool('window_01', 4);
        this._unlitWindowSegmentsPool = new WallSegmentsPool('window_02', 4);

        this._decoration1WindowSegmentsPool = new WallSegmentsPool('decoration_01', 4);
        this._decoration2WindowSegmentsPool = new WallSegmentsPool('decoration_02', 4);

        this._segments = [ ];

        this._chances = {
            segment: {
                wall: 10,
                gap: 0  
            },
            height: {
                '1': 0,
                '2': 0,
                '3': 10,
                '4': 0,
                '5': 0
            },
            decoration: {
                '1': 10,
                '2': 10
            },
            window: {
                lit: 10,
                unlit: 10
            }
        };


        for (var i = 0; i < 20; i++) {
            var segment = this._draw(this._chances.segment);
            this._segments.push(segment);

            if(segment === 'wall') {
                this._chances.segment.wall--;
            } else if(this._chances.segment === 'gap') {
                this._chances.segment.gap--;
            }

            if((this._chances.segment.gap > 0) && (this._chances.segment.wall < 5)) {
                this._chances.segment.gap++;
            }
        }

        console.log(this._segments);
    }


    GameMap.prototype = Object.create(Pixi.DisplayObjectContainer.prototype);

    GameMap.prototype.moveTo = function(point) {
        var distance = point - this._currentPoint;

        this._currentPoint = point;

        var delta = (distance * this._change);

        this.position[this._axis] += delta;
    };

    GameMap.prototype._draw = function(list) {
        var totalWeight = Util.sum(list);
        var randomNum = Util.random(0, totalWeight);
        var weightSum = 0;
        var drawn;
        
        Util.every(list, function(weight, el) {
            weightSum += weight;
             
            if (randomNum <= weightSum) {
                drawn = el;

                return false;
            } else {
                return true;
            }
        });

        return drawn;
    };


    return GameMap;

});