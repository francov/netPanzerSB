'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["www/"],

    requirejs: {
      compile: {
        options: {
          appDir: 'www-src',
          mainConfigFile: 'www-src/js/main.js',
          dir: 'www',
          modules: [
            {
                name: '../main',
                include: ['jquery', 'jquerymobile', 'jquery.loadTemplate-1.2.4']
            },
            {
                name: '../index',
                exclude: ['../main']
            }
          ]
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', ['clean', 'requirejs']);
  grunt.registerTask('default', ['build']);
};
