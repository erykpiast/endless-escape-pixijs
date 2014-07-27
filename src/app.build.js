require.config({
    baseUrl: '/src/scripts',
    paths: {
        text: '../../bower_components/requirejs-text/text',
        pixi: '../../bower_components/pixijs/pixi',
        underscore: '../../bower_components/underscore/underscore'
    },
    shim: {
        pixi: {
            exports: 'PIXI'
        }
    }
});