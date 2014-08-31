var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return /\.spec\.js$/.test(file);
});

require.config({
    baseUrl: '/base/dist/scripts',
    paths: {
        text: '../../bower_components/requirejs-text/text',
        pixi: '../../bower_components/pixijs/pixi',
        Thenable: '../../bower_components/thenable/thenable',
        underscore: '../../bower_components/underscore/underscore',

        squire: '../../bower_components/squire/src/Squire'
    },
    shim: {
        pixi: {
            exports: 'PIXI'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(tests, function() {
    // wait for Squire injections
    setTimeout(window.__karma__.start, 100);
});