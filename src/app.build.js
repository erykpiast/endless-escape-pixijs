require.config({
    baseUrl: '/src/scripts',
    paths: {
        text: '../../bower_components/requirejs-text/text',
        pixi: '../../bower_components/pixijs/pixi',
        Thenable: '../../bower_components/thenable/thenable',
        underscore: '../../bower_components/underscore/underscore'
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
