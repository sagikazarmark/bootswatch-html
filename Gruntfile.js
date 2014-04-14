module.exports = function(grunt) {
  "use strict";

  grunt.util.linefeed = '\n';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Bootswatch HTML v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' */\n\n',

    clean: {
      dist: ['dist/']
    },

    copy: {
      js: {
        src: 'js/*',
        dest: 'dist/assets/'
      },
      vendor_js: {
        expand: true,
        flatten: true,
        src: [
          'bower_components/jquery/jquery.min.js',
          'bower_components/jquery-bootswatch/jquery.bootswatch.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
        ],
        dest: 'dist/assets/js/lib/'
      }
    },

    processhtml: {
      options: {
        recursive: true
      },
      dist: {
        files:[
          {
            expand: true,
            flatten: true,
            src: ['src/*.html'],
            dest: 'dist/'
          }
        ]
      }
    },

    jsbeautifier: {
      files : ["dist/*.html"],
    },

    watch: {
      options: { livereload: true },
      html: {
        files: 'src/**/*.html',
        tasks: ['html']
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4000,
          base: 'dist',
          hostname: '*',
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('html', ['processhtml', 'jsbeautifier']);

  grunt.registerTask('dist', ['clean','copy', 'html']);

  grunt.registerTask('default', ['connect', 'watch']);
};
