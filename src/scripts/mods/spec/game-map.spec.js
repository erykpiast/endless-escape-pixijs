define([ 'squire' ], function(Squire) {

    (new Squire())
    .mock('mods/wall-segments-pool', function() {
        return function() { };
    })
    .require([
        'mods/game-map'
    ], function(
        GameMap
    ) {

        describe('GameMap class test', function() {

            it('should be a function', function() {
                expect(typeof GameMap).toBe('function');
            });

            it('should be possible to create an instance', function() {
                expect(function() {
                    new GameMap();
                }).not.toThrow();
            });

        });


        describe('GameMap instance test', function() {
            var gameMap;


            beforeEach(function() {
                gameMap = new GameMap();
            });

            afterEach(function() {
                gameMap = null;
            });


            it('should be an object with some public methods', function() {
                expect(typeof gameMap).toBe('object');
                expect(gameMap instanceof GameMap).toBeTruthy();

                expect(gameMap.moveTo).toBeDefined();
                expect(typeof gameMap.moveTo).toBe('function');
            });
        });

        // describe('GameMap drawing segment type', function() {
        //     var gameMap;
        //     var segments;

        //     beforeEach(function() {
        //         gameMap = new GameMap();

        //         segments = [ ];
        //         for (var i = 0; i < 20; i++) {
        //             segments.push(gameMap._drawSegmentType());
        //         }
        //     });

        //     afterEach(function() {
        //         gameMap = null;

        //         segments = null;
        //     });


        //     it('should draw at most 10 consecutive walls', function() {
        //         var wallsCount = 0;

        //         console.log(segments);

        //         expect(segments.indexOf('gap')).not.toBe(-1);

        //         segments.forEach(function(segment) {
        //             if(segment !== 'wall') {
        //                 expect(wallsCount).not.toBeGreaterThan(10);

        //                 wallsCount = 0;
        //             } else {
        //                 wallsCount++;
        //             }
        //         });
        //     });

        //     it('should draw at most 3 consecutive gaps', function() {
        //         var gapsCount = 0;

        //         console.log(segments);

        //         expect(segments.indexOf('gap')).not.toBe(-1);

        //         segments.forEach(function(segment) {
        //             if(segment !== 'gap') {
        //                 expect(gapsCount).not.toBeGreaterThan(3);

        //                 gapsCount = 0;
        //             } else {
        //                 gapsCount++;
        //             }
        //         });
        //     });
        // });


        // describe('GameMap drawing heights', function() {
        //     var gameMap;
        //     var heights;

        //     beforeEach(function() {
        //         gameMap = new GameMap();

        //         heights = [ ];
        //         for (var i = 0; i < 20; i++) {
        //             heights.push(gameMap._drawHeight());
        //         }
        //     });

        //     afterEach(function() {
        //         gameMap = null;

        //         heights = null;
        //     });


        //     it('should draw heights differ from the next by 2 at most', function() {
        //         expect(heights.some(function(current, index, heights) {
        //             var next = heights[index + 1];

        //             if('undefined' === typeof next) {
        //                 return false;
        //             } else {
        //                 return ((next - current) > 2);
        //             }
        //         })).toBeFalsy();
        //     });

        // });


        describe('GameMap creating segments', function() {
            var gameMap;
            var segments;

            beforeEach(function() {
                gameMap = new GameMap();

                segments = [ ];
                for (var i = 0; i < 20; i++) {
                    segments.push(gameMap._createSegment());
                }
            });

            afterEach(function() {
                gameMap = null;

                segments = null;
            });


            it('should create 20 segments', function() {
                console.log(segments);

                expect(segments.length).toBe(20);
            });
            
        });

    });

});