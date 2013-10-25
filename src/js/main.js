require.config({
    baseUrl: 'js/vendor',
    paths: {
        jquery: 'jquery-2.0.3'
    },

    shim: {
        "jquery.mobile-1.3.2": ["jquery"],
        "jquery.loadTemplate-1.2.4": ["jquery"]
    }
});

requirejs(["../index"]);
