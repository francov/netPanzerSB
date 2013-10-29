'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["www/"],

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'www-src/', src: ['**'], dest: 'www/'}
        ]
      }
    },

    watch: {
      files: ['www-src/**/*'],
      tasks: ['default'],
    },

    connect: {
      dev: {
        options: {
          hostname: "*",
          port: 8000,
          base: 'www-src'
        }
      },
      prod: {
        options: {
          hostname: "*",
          port: 8000,
          base: 'www'
        }
      }
    },

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
                exclude: ['../main', '../../cordova']
            }
          ]
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('serve:dev', ['connect:dev:keepalive']);
  grunt.registerTask('serve:prod', ['clean', 'requirejs', 'connect:prod:keepalive']);
  grunt.registerTask('build', ['clean', 'requirejs']);
  grunt.registerTask('default', ['build']);
};
